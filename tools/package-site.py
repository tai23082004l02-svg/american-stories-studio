"""Package the editor and linked private review files; never original recordings.

Production review assets are supplied in the private hosting checkout only. A
public checkout packages the editor without requiring those private deliveries.
"""
from html.parser import HTMLParser
from pathlib import Path
import shutil
root=Path(__file__).resolve().parent.parent
dist=root/'dist';dist.mkdir(exist_ok=True)
shutil.copy2(root/'index.html',dist/'index.html')
shutil.copytree(root/'editor',dist/'editor',dirs_exist_ok=True)
(dist/'docs').mkdir(exist_ok=True)
shutil.copy2(root/'docs'/'EDITOR.md',dist/'docs'/'EDITOR.md')
review=root/'review'
if review.exists():
    target=dist/'review'
    if target.exists():shutil.rmtree(target)
    target.mkdir()
    class Links(HTMLParser):
        def handle_starttag(self,tag,attrs):
            for key,value in attrs:
                if key in ('src','href','poster') and value and '/' not in value and not value.startswith('#'):
                    needed.add(value)
    needed={p.name for p in review.glob('*.html')}
    for page in review.glob('*.html'):Links().feed(page.read_text())
    # Retain the first released intro for old editor sample links. Full first-pass
    # renders without review links stay in the private source, outside deployment.
    needed.update(p.name for p in review.glob('001-intro-v01.*'))
    if (review/'poster.png').exists():needed.add('poster.png')
    for name in sorted(needed):
        p=review/name
        if p.is_file():shutil.copy2(p,target/name)
        elif any(review.glob('*.stories.json')):raise SystemExit('Missing review delivery: '+name)
print('Static editor and linked review files packaged; original recordings excluded.')
