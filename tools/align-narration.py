"""Offline word timing for the approved narration, not a transcription service.

Usage: python3 tools/align-narration.py original.wav narration.txt new-output-dir
Requires FFmpeg and PocketSphinx 5.0.4. Review timings against the actual recording.
The source is read only; existing alignment outputs are never overwritten.
"""
import json,re,subprocess,sys
from pathlib import Path
from pocketsphinx import Decoder
if len(sys.argv)!=4:raise SystemExit(__doc__)
source,transcript,out=map(Path,sys.argv[1:]);out.mkdir(parents=True,exist_ok=True)
if any((out/f).exists() for f in ['alignment-full.json','paragraphs.json']):raise SystemExit('Choose a fresh output directory.')
text=transcript.read_text(encoding='utf-8').replace('’',"'")
normalize=lambda s:re.findall(r"[a-z]+(?:'[a-z]+)?",s.lower())
words=normalize(text)
dec=Decoder(samprate=16000,loglevel='ERROR')
for w,pron in {'combustible':'K AH M B AH S T AH B AH L','counterintuitive':'K AW N T ER IH N T UW IH T IH V'}.items():dec.add_word(w,pron,False)
missing=sorted({w for w in words if not dec.lookup_word(w)})
if missing:raise SystemExit('Missing pronunciations: '+', '.join(missing))
raw=subprocess.check_output(['ffmpeg','-v','error','-i',str(source),'-ar','16000','-ac','1','-f','s16le','-'])
dec.set_align_text(' '.join(words));dec.start_utt();dec.process_raw(raw,False,True);dec.end_utt()
segments=[dict(word=re.sub(r'\(\d+\)$','',s.word),start=s.start_frame/100,end=(s.end_frame+1)/100) for s in dec.seg()]
spoken=[s for s in segments if not s['word'].startswith('<')]
if [s['word'] for s in spoken]!=words:raise SystemExit('Alignment word sequence mismatch.')
idx=0;paragraphs=[]
for p in text.strip().split('\n\n'):
 n=len(normalize(p));paragraphs.append(dict(text=p,start=spoken[idx]['start'],end=spoken[idx+n-1]['end']));idx+=n
(out/'alignment-full.json').write_text(json.dumps(segments,indent=2),encoding='utf-8')
(out/'paragraphs.json').write_text(json.dumps(paragraphs,indent=2),encoding='utf-8')
print(f'Aligned {len(spoken)} spoken tokens / {len(paragraphs)} paragraphs. Review before use.')
