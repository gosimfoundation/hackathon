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
        event = {'slug': 'survey26', 'repository': 'gosimfoundation/agent-observer',
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
            manifest['basePath'] = '/factory26/'
            (path / 'site-manifest.json').write_text(json.dumps(manifest))
            with self.assertRaises(ValueError):
                module.validate(path, event)

class CollectionTests(unittest.TestCase):
    def test_failed_download_preserves_previous_local_cache(self):
        from unittest.mock import patch
        event = {'slug': 'factory26', 'repository': 'gosimfoundation/factory26',
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
        event = {'slug': 'factory26', 'repository': 'gosimfoundation/factory26',
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


if __name__ == '__main__':
    unittest.main()
