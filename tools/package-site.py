"""Create static hosting output from tracked application sources (no user media)."""
from pathlib import Path
import shutil
root = Path(__file__).resolve().parent.parent
dist = root / 'dist'
dist.mkdir(exist_ok=True)
shutil.copy2(root / 'index.html', dist / 'index.html')
shutil.copytree(root / 'editor', dist / 'editor', dirs_exist_ok=True)
(dist / 'docs').mkdir(exist_ok=True)
shutil.copy2(root / 'docs' / 'EDITOR.md', dist / 'docs' / 'EDITOR.md')
print('Static editor packaged; user projects and media excluded.')
