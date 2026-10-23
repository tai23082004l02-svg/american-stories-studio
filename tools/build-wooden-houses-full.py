"""Build episode 001 from its unchanged original recording and verified word alignment.

Usage: original.wav output-dir audio-manifest.json paragraphs.json alignment-full.json
Alignment must refer to the approved narration.txt, not an arbitrary new recording.
No recording or embedded project backup belongs in the public source repository.
"""
import base64,hashlib,json,re,subprocess,sys,uuid
from pathlib import Path
if len(sys.argv)!=6:raise SystemExit(__doc__)
source,out,manifest,paragraph_file,alignment_file=map(Path,sys.argv[1:])
m=json.loads(manifest.read_text());digest=hashlib.sha256(source.read_bytes()).hexdigest()
if digest!=m['source_sha256']:raise SystemExit('Recording hash mismatch; align the actual recording first.')
paras=json.loads(paragraph_file.read_text());words=[s for s in json.loads(alignment_file.read_text()) if not s['word'].startswith('<')]
script=(Path(__file__).resolve().parent.parent/'episodes/001-wooden-houses/narration.txt').read_text()
for w in words:w['word']=re.sub(r'\(\d+\)$','',w['word'])
expected=re.findall(r"[a-z]+(?:'[a-z]+)?",script.lower())
if expected!=[w['word'] for w in words]:raise SystemExit('Word alignment does not match approved narration.')
if len(paras)!=60 or abs(m['duration']-515.55)>.02:raise SystemExit('This edit is for episode 001, approved recording only.')
out.mkdir(parents=True,exist_ok=True)
audio=out/'full-narration-v02.mp3';project=out/'001-full-v02.stories.json'
if audio.exists() or project.exists():raise SystemExit('Choose a fresh output directory; existing versions are preserved.')
subprocess.run(['ffmpeg','-v','error','-n','-i',str(source),'-af','loudnorm=I=-18:TP=-1.5:LRA=11:measured_I=-27.23:measured_TP=-3.46:measured_LRA=3.20:measured_thresh=-37.70:offset=0.51:linear=false','-ar','48000','-ac','1','-c:a','libmp3lame','-b:a','160k',str(audio)],check=True)
# Paragraph-indexed editorial plan. The approved opening keeps its exact cuts.
# Title text is concise interpretation, never presented as a quotation from a source.
plan=[
 (5,'share','','NEW SINGLE-FAMILY HOMES · 2024',''),
 (6,'history-line','How did boards become the default?','01 · THE HISTORICAL SHIFT','From materials to a building method.'),
 (7,'history-joinery','Two ways to build a frame.','01 · THE HISTORICAL SHIFT','A change in how parts fit together.'),
 (8,'history-joinery','Large timbers. Shaped joints.','01 · THE HISTORICAL SHIFT','Carpentry at the connection.'),
 (9,'standard-parts','Standard lumber. Machine-made nails.','01 · THE HISTORICAL SHIFT','A repeatable kit of parts.'),
 (10,'history-line','Balloon framing helped the transition.','01 · THE HISTORICAL SHIFT','Its exact origins remain debated.'),
 (11,'standard-parts','Repeatable pieces changed the process.','01 · THE HISTORICAL SHIFT','The practical shift.'),
 (12,'platform-stack','Build a floor. Then the next level.','01 · MODERN PLATFORM FRAMING','Each floor becomes a platform.'),
 (13,'history-line','An evolving building method.','01 · FROM TIMBER TO LIGHT FRAMING','More than an unfinished log cabin.'),
 (14,'supply-chain','A system around the material.','02 · WHY THE METHOD PERSISTS',''),
 (15,'standard-parts','Manageable components.','02 · WHY THE METHOD PERSISTS','Standard pieces crews can handle.'),
 (16,'supply-chain','The advantages reinforce each other.','02 · WHY THE METHOD PERSISTS','Materials, people and tools.'),
 (17,'supply-chain','Familiar methods simplify decisions.','02 · WHY THE METHOD PERSISTS','No universal price advantage.'),
 (18,'cost-factors','Cost depends on the project.','02 · WHY THE METHOD PERSISTS','Design, labor, prices and place.'),
 (19,'supply-chain','Choose an assembly process.','02 · WHY THE METHOD PERSISTS','Think beyond a material label.'),
 (20,'wall-section','Look inside the wall.','03 · THE COMPLETE WALL ASSEMBLY',''),
 (21,'wall-section','Structure. Insulation. Weather protection.','03 · THE COMPLETE WALL ASSEMBLY','Different layers do different jobs.'),
 (22,'veneer-support','Brick veneer has its own role.','03 · FINISH AND STRUCTURE','Support and anchors matter.'),
 (23,'veneer-support','The outside is only one layer.','03 · FINISH AND STRUCTURE','A facade cannot reveal every detail.'),
 (24,'wall-section','Comfort depends on the assembly.','03 · THE COMPLETE WALL ASSEMBLY','The frame is one part of the answer.'),
 (25,'heat-bridge','Heat can travel through the studs.','03 · THERMAL BRIDGES','Insulation and framing behave differently.'),
 (26,'continuous-insulation','A continuous insulating layer.','03 · REDUCING THERMAL BRIDGES','One way to reduce the effect.'),
 (27,'wall-section','Compare the complete wall.','03 · THE COMPLETE WALL ASSEMBLY','The whole assembly matters.'),
 (28,'advanced-frame','More lumber is not always better.','04 · ADVANCED FRAMING','Layout matters as much as quantity.'),
 (29,'advanced-frame','Use structure where it is needed.','04 · ADVANCED FRAMING','Leave room for insulation.'),
 (30,'advanced-frame','Plan the layout for the building.','04 · ADVANCED FRAMING','Corners, openings and spacing.'),
 (31,'standard-parts','Less unnecessary cutting.','04 · ADVANCED FRAMING','A design can also reduce material use.'),
 (32,'design-check','Design first. Check before changes.','04 · ADVANCED FRAMING','Do not remove studs on this basis.'),
 (33,'context','Quality is more than material.','04 · ADVANCED FRAMING',''),
 (34,'advanced-frame','More. Heavier. Better.','04 · THREE DIFFERENT IDEAS','Those are not interchangeable.'),
 (35,'load-path','A frame must handle forces.','05 · THE CONTINUOUS LOAD PATH','Follow the force through the building.'),
 (36,'load-path','Roof → walls → foundation.','05 · THE CONTINUOUS LOAD PATH','Loads must pass between the parts.'),
 (37,'load-path','A continuous load path.','05 · THE CONTINUOUS LOAD PATH','An interconnected chain.'),
 (38,'connection-detail','The connection can be critical.','05 · THE CONTINUOUS LOAD PATH','A weak link interrupts the chain.'),
 (39,'load-path','Connect each part to the next.','05 · BUILDING AMERICA GUIDANCE','Roof, walls and foundation.'),
 (40,'whole-system','No storm-proof promise.','05 · JUDGE THE WHOLE SYSTEM','Hazards, design, workmanship, upkeep.'),
 (41,'whole-system','An interconnected structure.','05 · JUDGE THE WHOLE SYSTEM','Weight alone is not the measure.'),
 (42,'moisture','Wood is not indestructible.','06 · THE REAL TRADE-OFFS',''),
 (43,'moisture','Moisture creates conditions for decay.','06 · WATER AND WOOD','Protect the structure from exposure.'),
 (44,'moisture','A hidden leak is still a problem.','06 · WATER AND WOOD','Protection needs maintenance.'),
 (45,'fire-exposure','Wood is combustible.','06 · FIRE IS A REAL CONCERN',''),
 (46,'fire-exposure','Exposure involves the whole home.','06 · WILDFIRE EXPOSURE','Roof, vents, windows and nearby fuels.'),
 (47,'fire-exposure','Address vulnerable entry points.','06 · CAL FIRE HOME-HARDENING GUIDANCE','Embers can reach vulnerable spaces.'),
 (48,'context','A material label is not enough.','06 · UNDERSTAND THE COMPLETE PICTURE',''),
 (49,'context','Real trade-offs need context.','06 · UNDERSTAND THE COMPLETE PICTURE','One dramatic clip cannot explain all.'),
 (50,'three-reasons','Why is wood so common?','07 · PUTTING THE ANSWER TOGETHER',''),
 (51,'standard-parts','History: repeatable pieces.','07 · PUTTING THE ANSWER TOGETHER','Standardization changed assembly.'),
 (52,'supply-chain','Practicality: a familiar method.','07 · PUTTING THE ANSWER TOGETHER','Manageable parts and experienced crews.'),
 (53,'wall-section','Architecture: layers working together.','07 · PUTTING THE ANSWER TOGETHER','Structure, weather, insulation, finish.'),
 (54,'regional-choice','The right choice depends on place.','07 · NO SINGLE ANSWER FOR EVERY SITE','Other framing systems remain in use.'),
 (55,'project-cost','The frame is one project decision.','07 · THE COST OF A FINISHED HOME','Convenient framing ≠ affordable housing.'),
 (56,'whole-system','Look behind the finish.','08 · THE MORE USEFUL QUESTION','Connections, assembly and local fit.'),
 (57,'house-exterior','','THE OUTSIDE OF THE STORY',''),
 (58,'house-reveal','','THE STRUCTURE BEHIND THE FINISH',''),
 (59,'end-card','Stories behind everyday things.','AMERICAN STORIES','Subscribe for the next story.'),
]
intro=[(0,4.18,'house-exterior'),(4.18,10.46,'house-reveal'),(10.46,16.71,'wall-assembly'),(16.71,18.98,'question'),(18.98,22.99,'houses'),(22.99,27.56,'skeleton'),(27.56,34.52,'source'),(34.52,41.7,'share')]
cuts=[dict(start=a,diagram=d,title='',kicker='',subtitle='',paragraph=0) for a,b,d in intro]
for i,d,title,kicker,subtitle in plan:
 cuts.append(dict(start=41.7 if i==5 else paras[i]['start'],diagram=d,title=title,kicker=kicker,subtitle=subtitle,paragraph=i))
# Extra cuts at exact aligned words keep long explanations moving.
def word_start(paragraph,phrase):
 p=paras[paragraph];near=[w for w in words if w['start']>=p['start'] and w['end']<=p['end']+.01];needle=phrase.split()
 for n in range(len(near)-len(needle)+1):
  if [v['word'] for v in near[n:n+len(needle)]]==needle:return near[n]['start']
 raise ValueError(phrase)
extra=[(8,'the other uses','standard-parts','Smaller lumber. Fastened with nails.','01 · THE HISTORICAL SHIFT',''),(15,'builders know','supply-chain','People and tools already fit.','02 · WHY THE METHOD PERSISTS','Knowledge is part of the system.'),(17,'that is an explanation','cost-factors','Familiar does not mean always cheaper.','02 · WHY THE METHOD PERSISTS','The actual project determines cost.'),(21,'insulation slows','wall-section','Each layer has a job.','03 · THE COMPLETE WALL ASSEMBLY','Heat, weather and the enclosure.'),(36,'forces have to move','load-path','Follow the force all the way down.','05 · THE CONTINUOUS LOAD PATH','From roof to foundation.')]
for i,phrase,d,title,kicker,sub in extra:cuts.append(dict(start=word_start(i,phrase),diagram=d,title=title,kicker=kicker,subtitle=sub,paragraph=i))
cuts.sort(key=lambda s:s['start']);scenes=[]
for n,c in enumerate(cuts):
 end=cuts[n+1]['start'] if n+1<len(cuts) else 515.55
 i=c['paragraph'];src='Original illustration'
 if i in [5,54]:src='NAHB analysis of 2024 U.S. Census Bureau data'
 elif 7<=i<=13:src='Chicago Public Library; Jellen & Memari, timber construction history'
 elif 20<=i<=27:src='Brick Industry Association TN28; DOE / Building America wall assembly guidance'
 elif 28<=i<=34:src='Building America Solution Center: Advanced Framing — Minimum Wall Studs'
 elif 35<=i<=41:src='Building America Solution Center: Continuous Load Path'
 elif 42<=i<=44:src='USDA Forest Service: Wood Handbook, biodeterioration'
 elif 45<=i<=49:src='CAL FIRE: Home Hardening'
 footer='SIMPLIFIED ILLUSTRATION · '+src.upper()
 scenes.append(dict(id=f'wood-full-{n+1:03}',name=f'{n+1:02} · '+(c['title'] or c['diagram']),duration=round(end-c['start'],3),asset=None,trim=0,background='#F5F1E8',fit='contain',motion='none',layout='media',diagram=c['diagram'],diagramKicker=c['kicker'],diagramFooter=footer,text=c['title'],subtitle=c['subtitle'],source=src,license='Original explanatory diagrams, not documentary photographs or construction drawings',textX=96,textY=285,textWidth=740,fontSize=78,textColor='#172A3A',textPanel=False))
p=dict(kind='american-stories-project',version=1,id=str(uuid.uuid4()),name='001 · Wooden Houses · Full v02 · Times New Roman',width=1920,height=1080,fps=30,assets={'full-voice':dict(type='audio',name=audio.name,duration=515.55,src='data:audio/mpeg;base64,'+base64.b64encode(audio.read_bytes()).decode())},scenes=scenes,audio=dict(asset='full-voice',trim=0,volume=1),captions=[],production=dict(status='full-review',font='Times New Roman',source_audio_sha256=digest,source_audio_duration=515.55,alignment='PocketSphinx forced word alignment to approved narration, entire recording',notes='Original diagrams only; no documentary photographs or background music. Optional English subtitles in companion VTT/SRT.'))
project.write_text(json.dumps(p,ensure_ascii=False))
(out/'shot-plan.json').write_text(json.dumps(cuts,ensure_ascii=False,indent=2))
# Optional, switchable subtitles preserve punctuation and hyphenated words.
cues=[];idx=0
for paragraph in script.strip().split('\n\n'):
 tokens=paragraph.split();chunk=[];begin=idx;first_cue=len(cues)
 for token in tokens:
  count=len(re.findall(r"[a-z]+(?:'[a-z]+)?",token.lower()));chunk.append(token);idx+=count
  if len(chunk)>=9 or token.endswith(('.', '?', '!')):
   cues.append((words[begin]['start'],words[idx-1]['end'],' '.join(chunk)));chunk=[];begin=idx
 if chunk:cues.append((words[begin]['start'],words[idx-1]['end'],' '.join(chunk)))
 if len(cues)-first_cue>=2 and len(cues[-1][2].split())<4:
  a,b,text=cues.pop();pa,pb,pt=cues.pop();cues.append((pa,b,pt+' '+text))
def stamp(t,sep='.'):
 ms=round(t*1000);return f'{ms//3600000:02}:{ms//60000%60:02}:{ms//1000%60:02}{sep}{ms%1000:03}'
(out/'001-full-v02.vtt').write_text('WEBVTT\n\n'+'\n\n'.join(f'{stamp(a)} --> {stamp(b)}\n{s}' for a,b,s in cues)+'\n')
(out/'001-full-v02.srt').write_text('\n\n'.join(f'{i+1}\n{stamp(a,",")} --> {stamp(b,",")}\n{s}' for i,(a,b,s) in enumerate(cues))+'\n')
print(json.dumps(dict(project=str(project),scenes=len(scenes),duration=sum(s['duration'] for s in scenes),cues=len(cues))))
