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


def download_checked(repo, tag, directory):
    """Download and checksum a release's site.tar.gz; returns the archive path, or None if the
    release has no site assets left (e.g. pruned) or fails its checksum."""
    try:
        gh('release', 'download', tag, '--repo', repo, '--dir', str(directory),
           '--pattern', 'site.tar.gz', '--pattern', 'site.tar.gz.sha256')
    except subprocess.CalledProcessError:
        return None
    archive = directory / 'site.tar.gz'
    checksum_file = directory / 'site.tar.gz.sha256'
    if not archive.is_file() or not checksum_file.is_file():
        return None
    expected = checksum_file.read_text().split()[0]
    digest = hashlib.sha256()
    with archive.open('rb') as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b''):
            digest.update(chunk)
    if digest.hexdigest() != expected:
        return None
    return archive


def merge_previous_assets(destination, event, repo, latest_tag, cache):
    """A long-open tab can still be running a previous build; its lazy-loaded chunks must keep
    resolving after this deploy. Pull the hashed asset files (never colliding by name) out of the
    last few published releases and add any this build doesn't already have, additively."""
    retain = event.get('retainPreviousAssets')
    if not retain:
        return 0
    keep, dirs = retain.get('count', 10), retain['dirs']
    listing = json.loads(gh('release', 'list', '--repo', repo, '--limit', str(keep * 3),
                             '--json', 'tagName,isDraft,isPrerelease,createdAt'))
    previous_tags = [item['tagName'] for item in sorted(listing, key=lambda item: item['createdAt'], reverse=True)
                      if not item['isDraft'] and not item['isPrerelease']
                      and item['tagName'].startswith('site-') and item['tagName'] != latest_tag][:keep - 1]
    added = 0
    for tag in previous_tags:
        with tempfile.TemporaryDirectory(prefix='prev-release-', dir=cache) as temp:
            temp = Path(temp)
            archive = download_checked(repo, tag, temp)
            if archive is None:
                print(f'Skipping {repo} {tag}: release assets unavailable or checksum mismatch')
                continue
            extracted = temp / 'extracted'
            extracted.mkdir()
            unpack(archive, extracted)
            for rel_dir in dirs:
                source_dir = extracted / rel_dir
                if not source_dir.is_dir():
                    continue
                target_dir = destination / rel_dir
                target_dir.mkdir(parents=True, exist_ok=True)
                for file in source_dir.iterdir():
                    if file.is_file() and not (target_dir / file.name).exists():
                        shutil.copy2(file, target_dir / file.name)
                        added += 1
    return added


def validate(directory, event):
    manifest = json.loads((directory / 'site-manifest.json').read_text())
    if (manifest.get('schemaVersion') != 1 or manifest.get('slug') != event['slug']
            or manifest.get('repository') not in [event['repository'], *event.get('previousRepositories', [])]
            or manifest.get('basePath') != '/' + event['slug'] + '/'
            or not re.fullmatch(r'[a-f0-9]{40}', manifest.get('revision', ''))):
        raise ValueError(f"Unexpected release identity for {event['slug']}")
    for file in event['requiredFiles']:
        if not (directory / file).is_file():
            raise ValueError(f"Incomplete release: {event['slug']}/{file}")
    return {**manifest, 'artifactRepository': manifest['repository'], 'repository': event['repository']}


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
            added = merge_previous_assets(destination, event, repo, tag, cache)
            print(f"Prepared {repo} {tag}" + (f" (+{added} asset(s) kept from earlier builds)" if added else ""), flush=True)
        (staging / 'versions.json').write_text(json.dumps(versions, indent=2) + '\n')
        target = cache / 'event-sites'
        if target.exists():
            shutil.rmtree(target)
        shutil.copytree(staging, target)
    return versions


if __name__ == '__main__':
    prepare()
