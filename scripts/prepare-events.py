"""Download complete, successful event releases; never execute event source code."""
import hashlib
import json
from pathlib import Path, PurePosixPath
import re
import shutil
import subprocess
import tarfile
import tempfile

ROOT = Path(__file__).resolve().parent.parent


def gh(*args):
    return subprocess.check_output(['gh', *args], text=True)


def unpack(archive, destination):
    with tarfile.open(archive, 'r:gz') as tar:
        for member in tar.getmembers():
            path = PurePosixPath(member.name)
            if path.is_absolute() or '..' in path.parts or not (member.isfile() or member.isdir()):
                raise ValueError(f'Unsafe release archive entry: {member.name}')
        # Copy only validated file contents; ignore ownership, permissions and links.
        for member in tar.getmembers():
            target = destination / member.name
            if member.isdir():
                target.mkdir(parents=True, exist_ok=True)
            else:
                target.parent.mkdir(parents=True, exist_ok=True)
                with tar.extractfile(member) as source, target.open('wb') as output:
                    shutil.copyfileobj(source, output)


def validate(directory, event):
    manifest = json.loads((directory / 'site-manifest.json').read_text())
    if (manifest.get('schemaVersion') != 1 or manifest.get('slug') != event['slug']
            or manifest.get('repository') != event['repository']
            or manifest.get('basePath') != '/' + event['slug'] + '/'
            or not re.fullmatch(r'[a-f0-9]{40}', manifest.get('revision', ''))):
        raise ValueError(f"Unexpected release identity for {event['slug']}")
    for file in event['requiredFiles']:
        if not (directory / file).is_file():
            raise ValueError(f"Incomplete release: {event['slug']}/{file}")
    return manifest


def prepare(root=ROOT):
    events = json.loads((root / 'config/event-sites.json').read_text())
    cache = root / '.cache'
    cache.mkdir(exist_ok=True)
    # Stage all three before replacing the local cache. A download/validation
    # failure aborts the build and leaves the currently deployed Pages site intact.
    with tempfile.TemporaryDirectory(prefix='event-sites-', dir=cache) as temp:
        staging = Path(temp)
        versions = {}
        for event in events:
            slug, repo = event['slug'], event['repository']
            selection = [] if event['release'] == 'latest' else [event['release']]
            info = json.loads(gh('release', 'view', *selection, '--repo', repo,
                                 '--json', 'tagName,isDraft,isPrerelease,targetCommitish'))
            tag = info['tagName']
            if info['isDraft'] or info['isPrerelease'] or not tag.startswith('site-'):
                raise ValueError(f'{repo}: expected a published site release')
            downloads = staging / (slug + '-download')
            downloads.mkdir()
            gh('release', 'download', tag, '--repo', repo, '--dir', str(downloads),
               '--pattern', 'site.tar.gz', '--pattern', 'site.tar.gz.sha256')
            archive = downloads / 'site.tar.gz'
            expected = (downloads / 'site.tar.gz.sha256').read_text().split()[0]
            digest = hashlib.sha256()
            with archive.open('rb') as stream:
                for chunk in iter(lambda: stream.read(1024 * 1024), b''):
                    digest.update(chunk)
            actual = digest.hexdigest()
            if expected != actual:
                raise ValueError(f'{repo}: release checksum mismatch')
            destination = staging / slug
            destination.mkdir()
            unpack(archive, destination)
            manifest = validate(destination, event)
            if not tag.startswith('site-' + manifest['revision'] + '-'):
                raise ValueError(f'{repo}: release tag and source revision disagree')
            versions[slug] = {**manifest, 'release': tag, 'sha256': actual}
            shutil.rmtree(downloads)
            print(f"Prepared {repo} {tag}", flush=True)
        (staging / 'versions.json').write_text(json.dumps(versions, indent=2) + '\n')
        target = cache / 'event-sites'
        if target.exists():
            shutil.rmtree(target)
        shutil.copytree(staging, target)
    return versions


if __name__ == '__main__':
    prepare()
