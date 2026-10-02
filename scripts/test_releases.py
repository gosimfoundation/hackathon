import importlib.util
import io
import json
from pathlib import Path
import tarfile
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('prepare_events', Path(__file__).with_name('prepare-events.py'))
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class ReleaseValidationTests(unittest.TestCase):
    def test_rejects_unsafe_archives(self):
        for name, kind in [('../outside', tarfile.REGTYPE), ('/absolute', tarfile.REGTYPE),
                           ('link', tarfile.SYMTYPE), ('hardlink', tarfile.LNKTYPE)]:
            with self.subTest(name=name), tempfile.TemporaryDirectory() as temp:
                path = Path(temp)
                archive = path / 'site.tar.gz'
                with tarfile.open(archive, 'w:gz') as tar:
                    entry = tarfile.TarInfo(name)
                    entry.type = kind
                    entry.linkname = '../outside'
                    tar.addfile(entry, io.BytesIO())
                with self.assertRaises(ValueError):
                    module.unpack(archive, path / 'output')

    def test_rejects_wrong_event_and_incomplete_platform(self):
        event = {'slug': 'survey26', 'repository': 'gosimfoundation/hackathon-survey26',
                 'requiredFiles': ['index.html', 'platform/index.html']}
        manifest = {'schemaVersion': 1, 'slug': 'survey26',
                    'repository': event['repository'], 'basePath': '/survey26/', 'revision': 'a' * 40}
        with tempfile.TemporaryDirectory() as temp:
            path = Path(temp)
            (path / 'index.html').write_text('root')
            (path / 'site-manifest.json').write_text(json.dumps(manifest))
            with self.assertRaises(ValueError):
                module.validate(path, event)
            (path / 'platform').mkdir()
            (path / 'platform/index.html').write_text('platform')
            self.assertEqual(module.validate(path, event)['revision'], 'a' * 40)
            event['previousRepositories'] = ['gosimfoundation/agent-observer']
            manifest['repository'] = 'gosimfoundation/agent-observer'
            (path / 'site-manifest.json').write_text(json.dumps(manifest))
            renamed = module.validate(path, event)
            self.assertEqual(renamed['repository'], 'gosimfoundation/hackathon-survey26')
            self.assertEqual(renamed['artifactRepository'], 'gosimfoundation/agent-observer')
            manifest['repository'] = 'another-owner/survey26'
            (path / 'site-manifest.json').write_text(json.dumps(manifest))
            with self.assertRaises(ValueError):
                module.validate(path, event)
            manifest['repository'] = event['repository']
            manifest['basePath'] = '/factory26/'
            (path / 'site-manifest.json').write_text(json.dumps(manifest))
            with self.assertRaises(ValueError):
                module.validate(path, event)

class CollectionTests(unittest.TestCase):
    def test_failed_download_preserves_previous_local_cache(self):
        from unittest.mock import patch
        event = {'slug': 'factory26', 'repository': 'gosimfoundation/hackathon-factory26',
                 'release': 'latest', 'requiredFiles': ['index.html']}
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            (root / 'config').mkdir()
            (root / 'config/event-sites.json').write_text(json.dumps([event]))
            old = root / '.cache/event-sites/factory26'
            old.mkdir(parents=True)
            (old / 'index.html').write_text('previous successful site')
            with patch.object(module, 'gh', side_effect=RuntimeError('network unavailable')):
                with self.assertRaises(RuntimeError):
                    module.prepare(root)
            self.assertEqual((old / 'index.html').read_text(), 'previous successful site')

    def test_pinned_release_download_and_checksum(self):
        import hashlib
        import shutil
        from unittest.mock import patch
        revision = 'a' * 40
        tag = 'site-' + revision + '-123-1'
        event = {'slug': 'factory26', 'repository': 'gosimfoundation/hackathon-factory26',
                 'release': tag, 'requiredFiles': ['index.html']}
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            (root / 'config').mkdir()
            (root / 'config/event-sites.json').write_text(json.dumps([event]))
            source = root / 'source'
            source.mkdir()
            (source / 'index.html').write_text('new site')
            manifest = {'schemaVersion': 1, 'slug': 'factory26', 'repository': event['repository'],
                        'revision': revision, 'basePath': '/factory26/'}
            (source / 'site-manifest.json').write_text(json.dumps(manifest))
            archive = root / 'site.tar.gz'
            with tarfile.open(archive, 'w:gz') as tar:
                tar.add(source, arcname='.')
            digest = hashlib.sha256(archive.read_bytes()).hexdigest()
            def fake_gh(*args):
                self.assertIn(tag, args)
                if args[:2] == ('release', 'view'):
                    return json.dumps({'tagName': tag, 'isDraft': False, 'isPrerelease': False})
                directory = Path(args[args.index('--dir') + 1])
                shutil.copyfile(archive, directory / 'site.tar.gz')
                (directory / 'site.tar.gz.sha256').write_text(digest + '  site.tar.gz\n')
                return ''
            with patch.object(module, 'gh', side_effect=fake_gh):
                result = module.prepare(root)
            self.assertEqual(result['factory26']['release'], tag)
            self.assertEqual((root / '.cache/event-sites/factory26/index.html').read_text(), 'new site')
            # A corrupt new download must not replace the valid cached site.
            digest = '0' * 64
            with patch.object(module, 'gh', side_effect=fake_gh):
                with self.assertRaisesRegex(ValueError, 'checksum mismatch'):
                    module.prepare(root)
            self.assertEqual((root / '.cache/event-sites/factory26/index.html').read_text(), 'new site')


class RetainPreviousAssetsTests(unittest.TestCase):
    def test_merges_additively_from_recent_releases_only(self):
        import hashlib
        from unittest.mock import patch

        releases = {
            'site-bbb-2-1': {'isDraft': False, 'isPrerelease': False, 'createdAt': '2026-10-02T02:00:00Z',
                              'files': {'assets/old-2.js': 'old-2', 'assets/shared.js': 'stale-should-not-win'}},
            'site-ccc-3-1': {'isDraft': False, 'isPrerelease': False, 'createdAt': '2026-10-02T01:00:00Z',
                              'files': {'assets/old-3.js': 'old-3'}},
            'draft-skip': {'isDraft': True, 'isPrerelease': False, 'createdAt': '2026-10-02T03:30:00Z',
                            'files': {'assets/draft.js': 'draft'}},
            'examples-2026-10-02': {'isDraft': False, 'isPrerelease': False, 'createdAt': '2026-10-02T03:40:00Z',
                                     'files': {'assets/not-a-site-release.js': 'nope'}},
            'site-ddd-4-1': {'isDraft': False, 'isPrerelease': False, 'createdAt': '2026-10-01T00:00:00Z',
                              'files': {'assets/too-old-given-count.js': 'excluded-by-count'}},
        }

        def make_archive(path, files):
            with tempfile.TemporaryDirectory() as src_temp:
                src = Path(src_temp)
                for rel, content in files.items():
                    full = src / rel
                    full.parent.mkdir(parents=True, exist_ok=True)
                    full.write_text(content)
                with tarfile.open(path, 'w:gz') as tar:
                    tar.add(src, arcname='.')

        def fake_gh(*args):
            if args[:2] == ('release', 'list'):
                return json.dumps([{'tagName': tag, **{k: v for k, v in info.items() if k != 'files'}}
                                    for tag, info in releases.items()])
            self.assertEqual(args[0], 'release')
            self.assertEqual(args[1], 'download')
            tag = args[2]
            directory = Path(args[args.index('--dir') + 1])
            archive = directory / 'site.tar.gz'
            make_archive(archive, releases[tag]['files'])
            digest = hashlib.sha256(archive.read_bytes()).hexdigest()
            (directory / 'site.tar.gz.sha256').write_text(digest + '  site.tar.gz\n')
            return ''

        event = {'slug': 'survey26', 'repository': 'gosimfoundation/hackathon-survey26',
                  'retainPreviousAssets': {'count': 3, 'dirs': ['assets']}}
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            destination = root / 'destination'
            destination.mkdir()
            (destination / 'assets').mkdir()
            (destination / 'assets/shared.js').write_text('current-build-wins')
            cache = root / 'cache'
            cache.mkdir()
            with patch.object(module, 'gh', side_effect=fake_gh):
                added = module.merge_previous_assets(destination, event, event['repository'], 'site-aaa-1-1', cache)
            # count=3 keeps the latest (already in place) plus 2 previous releases: bbb and ccc,
            # newest-first; ddd is excluded by count, and the draft/non-"site-" tags are never tags.
            self.assertEqual(added, 2)
            self.assertEqual((destination / 'assets/old-2.js').read_text(), 'old-2')
            self.assertEqual((destination / 'assets/old-3.js').read_text(), 'old-3')
            self.assertFalse((destination / 'assets/too-old-given-count.js').exists())
            self.assertFalse((destination / 'assets/draft.js').exists())
            self.assertFalse((destination / 'assets/not-a-site-release.js').exists())
            # A same-named file from an older release never overwrites the current build's own file.
            self.assertEqual((destination / 'assets/shared.js').read_text(), 'current-build-wins')

    def test_no_config_means_no_extra_gh_calls(self):
        from unittest.mock import patch
        event = {'slug': 'factory26', 'repository': 'gosimfoundation/hackathon-factory26'}
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            destination = root / 'destination'
            destination.mkdir()
            with patch.object(module, 'gh', side_effect=AssertionError('gh must not be called')):
                added = module.merge_previous_assets(destination, event, event['repository'], 'site-aaa-1-1', root)
        self.assertEqual(added, 0)


if __name__ == '__main__':
    unittest.main()
