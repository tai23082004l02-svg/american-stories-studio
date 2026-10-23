"""Build the approved episode's 41.7s illustration preview from its original WAV.

Uses measured speech boundaries from PocketSphinx forced alignment of the approved
opening. This is not a general-purpose automatic aligner or a full-episode edit.
The original is read only. Requires FFmpeg. Output embeds a normalized derivative.
"""
import base64, hashlib, json, subprocess, sys, uuid
from pathlib import Path

if len(sys.argv)!=4:
    raise SystemExit('Usage: python3 tools/build-wooden-houses-intro.py original.wav output-directory audio-manifest.json')
source=Path(sys.argv[1]);out=Path(sys.argv[2])
EXPECTED=json.loads(Path(sys.argv[3]).read_text())['source_sha256']
if hashlib.sha256(source.read_bytes()).hexdigest()!=EXPECTED:
    raise SystemExit('This timeline is aligned to a different recording. Re-align before building.')
out.mkdir(parents=True,exist_ok=True)
project_file=out/'wooden-houses-intro-v01.stories.json'
audio=out/'intro-narration.mp3'
if project_file.exists() or audio.exists():
    raise SystemExit('Output exists; choose a new directory.')
subprocess.run(['ffmpeg','-v','error','-n','-t','41.7','-i',str(source),'-af',
    'loudnorm=I=-18:TP=-1.5:LRA=11:measured_I=-27.47:measured_TP=-5.02:measured_LRA=4.10:measured_thresh=-37.98:offset=0.58:linear=false',
    '-ar','48000','-ac','1','-c:a','libmp3lame','-b:a','160k',str(audio)],check=True)
cuts=[
 (0,4.18,'house-exterior','01 · Brick outside, wood inside?'),
 (4.18,10.46,'house-reveal','02 · Look past the brick'),
 (10.46,16.71,'wall-assembly','03 · Cladding and structure'),
 (16.71,18.98,'question','04 · A different question'),
 (18.98,22.99,'houses','05 · Behind the finish'),
 (22.99,27.56,'skeleton','06 · The skeleton underneath'),
 (27.56,34.52,'source','07 · NAHB / Census source'),
 (34.52,41.7,'share','08 · 94% of 2024 completions'),
]
scenes=[]
for i,(start,end,graphic,name) in enumerate(cuts):
    scenes.append(dict(id=f'wood-intro-{i+1:02}',name=name,duration=round(end-start,3),asset=None,trim=0,
        background='#F5F1E8',fit='contain',motion='none',layout='media',diagram=graphic,text='',subtitle='',
        source='Original explanatory illustration; NAHB analysis of 2024 Census data for the statistic',
        license='Original vector diagrams; not archival photography or construction drawings',
        textX=100,textY=820,textWidth=1700,fontSize=64,textColor='#172A3A',textPanel=True))
p=dict(kind='american-stories-project',version=1,id=str(uuid.uuid4()),name='001 · Wooden Houses · Intro v01',
    width=1920,height=1080,fps=30,assets={'intro-voice':dict(type='audio',name='intro-narration.mp3',duration=41.7,
    src='data:audio/mpeg;base64,'+base64.b64encode(audio.read_bytes()).decode())},scenes=scenes,
    audio=dict(asset='intro-voice',trim=0,volume=1),captions=[],
    production=dict(status='style-review',source_audio_sha256=EXPECTED,source_audio_duration=515.55,
    excerpt=[0,41.7],alignment='PocketSphinx word alignment to approved script; first 60 seconds only',
    notes='Original diagrams only; real-photo source could not be downloaded. No background music.'))
project_file.write_text(json.dumps(p,ensure_ascii=False),encoding='utf-8')
(out/'shot-plan.json').write_text(json.dumps([dict(start=s,end=e,diagram=d,title=n) for s,e,d,n in cuts],indent=2),encoding='utf-8')
print(str(project_file))
