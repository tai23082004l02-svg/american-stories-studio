import {fresh,scene,uid,copy,total,locate,startOf,clamp,validate,parseSRT} from './model.js';
import {Renderer} from './renderer.js';
import * as store from './storage.js';
const $=id=>document.getElementById(id), renderer=new Renderer($('preview'));
let project=fresh(), selected=0,time=0,playing=false,exporting=false,ready=false,history=[],future=[],timer,saveChain=Promise.resolve(),drawing=Promise.resolve();
let narration=new Audio(),audioContext,audioNode,destination,recorder,cancelExport=false;
const note=s=>{$('message').textContent=s;};
const protect=fn=>async(...args)=>{try{await fn(...args);}catch(e){note(e.message);console.error(e);}};
const download=(blob,name)=>{const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),30000);};
const filename=()=>project.name.replace(/[^a-zA-Z0-9_-]/g,'_').slice(0,80)||'american-stories';
const clock=t=>`${String(Math.floor(t/60)).padStart(2,'0')}:${String(Math.floor(t%60)).padStart(2,'0')}`;
function stop(){playing=false;narration.pause();for(const m of renderer.media.values())if(m instanceof HTMLVideoElement)m.pause();$('play').textContent='▶ Phát';}
function historyPush(){history.push(copy(project));if(history.length>15)history.shift();future=[];}
async function persist(){clearTimeout(timer);$('save-status').textContent='Đang lưu…';const snapshot=copy(project);saveChain=saveChain.catch(()=>{}).then(()=>store.save(snapshot));try{await saveChain;$('save-status').textContent='Đã lưu trên trình duyệt';}catch(e){$('save-status').textContent='Chưa lưu — hãy sao lưu tệp';throw e;}}
function scheduleSave(){clearTimeout(timer);timer=setTimeout(()=>protect(persist)(),350);$('save-status').textContent='Có thay đổi chưa lưu';}
let assetSignature='';
function option(select,value,text){const o=document.createElement('option');o.value=value;o.textContent=text;select.append(o);}
async function projectList(){const rows=await store.all();$('projects').replaceChildren();for(const p of rows)option($('projects'),p.id,p.name);$('projects').value=project.id;}
function syncAudio(){narration.pause();const asset=project.assets[project.audio.asset];narration.src=asset?.src||'';narration.volume=project.audio.volume;}
function displayTime(){const duration=total(project);$('seek').max=duration;$('seek').value=time;$('clock').textContent=`${clock(time)} / ${clock(duration)}`;}
function draw(){const snapshot=project,t=time;drawing=drawing.catch(()=>{}).then(()=>renderer.at(snapshot,t));return drawing;}
function controls(){const s=project.scenes[selected];$('name').value=project.name;$('scene-title').textContent=s.name;$('scene-name').value=s.name;
  for(const k of ['duration','trim','layout','fit','motion','text','subtitle','fontSize','textColor','textX','textY','textWidth','background','source','license'])$(k).value=s[k];$('textPanel').checked=s.textPanel;$('diagram').value=s.diagram||'none';
  $('audio-trim').value=project.audio.trim;$('volume').value=project.audio.volume;
  const signature=JSON.stringify(Object.entries(project.assets).map(([id,a])=>[id,a.name]));
  const assetsChanged=signature!==assetSignature;assetSignature=signature;
  if(assetsChanged){$('scene-asset').replaceChildren();option($('scene-asset'),'','Không có tư liệu');$('narration').replaceChildren();option($('narration'),'','Chưa có giọng đọc');
  for(const [id,a] of Object.entries(project.assets))option($(a.type==='audio'?'narration':'scene-asset'),id,a.name);}
  $('scene-asset').value=s.asset||'';$('narration').value=project.audio.asset||'';
  $('trim').disabled=project.assets[s.asset]?.type!=='video';$('caption-info').textContent=`${project.captions.length} đoạn phụ đề`;
  $('undo').disabled=!history.length;$('redo').disabled=!future.length;$('left').disabled=selected===0;$('right').disabled=selected===project.scenes.length-1;$('delete').disabled=project.scenes.length===1;
  const activeIds=new Set(project.scenes.map(s=>s.id));
  for(const el of [...$('timeline').children])if(!activeIds.has(el.dataset.id))el.remove();
  project.scenes.forEach((s,i)=>{let b=[...$('timeline').children].find(b=>b.dataset.id===s.id);if(!b){b=document.createElement('button');b.dataset.id=s.id;const top=document.createElement('small'),title=document.createElement('strong'),sub=document.createElement('small'),bar=document.createElement('span');bar.className='bar';b.append(top,title,sub,bar);}
    b.className='clip'+(i===selected?' active':'');b.setAttribute('aria-label',`Cảnh ${i+1}: ${s.name}`);const [top,title,sub,bar]=b.children;top.textContent=`${String(i+1).padStart(2,'0')} • ${s.duration.toFixed(1)} giây`;title.textContent=s.name;sub.textContent=s.asset?project.assets[s.asset].type==='video'?'VIDEO TƯ LIỆU':'ẢNH TƯ LIỆU':'ĐỒ HỌA';bar.style.width=`${clamp(s.duration/30*100,8,100)}%`;b.onclick=protect(async()=>{stop();selected=i;time=startOf(project,i);controls();await draw();});if($('timeline').children[i]!==b)$('timeline').insertBefore(b,$('timeline').children[i]||null);});
  if(assetsChanged){$('assets').replaceChildren();for(const [id,a] of Object.entries(project.assets)){const row=document.createElement('div');row.className='asset';const badge=document.createElement('span');badge.className='badge';badge.textContent={image:'ẢNH',video:'VIDEO',audio:'AUDIO'}[a.type];const info=document.createElement('div');const b=document.createElement('b');b.textContent=a.name;const small=document.createElement('small');small.textContent=a.duration?`${a.duration.toFixed(1)} giây`:'Ảnh tĩnh';info.append(b,small);const add=document.createElement('button');add.textContent='Dùng';add.onclick=protect(()=>useAsset(id));row.append(badge,info,add);$('assets').append(row);}}
  displayTime();
}
async function change(fn,{media=false}={}){stop();const next=copy(project);fn(next);validate(next);historyPush();project=next;selected=Math.min(selected,project.scenes.length-1);time=clamp(time,0,total(project));if(media)await renderer.load(project);syncAudio();controls();await draw();scheduleSave();}
async function openProject(p,{duplicate=false}={}){stop();validate(p);const next=copy(p);if(duplicate){next.id=uid();next.name=next.name.slice(0,130)+' (khôi phục)';}await drawing.catch(()=>{});await renderer.load(next);project=next;selected=0;time=0;history=[];future=[];syncAudio();controls();await draw();await persist();await projectList();}
async function useAsset(id){const a=project.assets[id];await change(p=>{if(a.type==='audio'){p.audio.asset=id;p.audio.trim=0;}else{const s=p.scenes[selected];s.asset=id;s.trim=0;if(a.type==='video')s.duration=Math.min(s.duration,a.duration);if(s.layout==='title'){s.layout='media';s.text='';}}});}
function readData(file){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=()=>rej(Error('Không đọc được tệp.'));r.readAsDataURL(file);});}
async function metadata(file,type,src){if(type==='image'){const im=new Image();im.src=src;await im.decode();return 0;}const el=document.createElement(type);const url=URL.createObjectURL(file);try{return await new Promise((res,rej)=>{el.onloadedmetadata=()=>Number.isFinite(el.duration)&&el.duration>0?res(el.duration):rej(Error('Không đọc được độ dài tệp.'));el.onerror=()=>rej(Error('Trình duyệt không hỗ trợ tệp '+file.name));el.src=url;});}finally{el.removeAttribute('src');el.load();URL.revokeObjectURL(url);}}
const bind=(id,fn)=>{$(id).onclick=protect(fn);};
bind('upload',()=>$('media-input').click());bind('open',()=>$('project-input').click());bind('srt',()=>$('srt-input').click());
$('media-input').onchange=protect(async e=>{const files=[...e.target.files];e.target.value='';if(!files.length)return;stop();note('Đang nhập tư liệu…');const assets={};for(const file of files){if(file.size>100*1024*1024)throw Error('Bản đầu giới hạn 100 MiB mỗi tệp.');const type=file.type.split('/')[0];if(!['image','video','audio'].includes(type))throw Error('Tệp không được hỗ trợ: '+file.name);const src=await readData(file);assets[uid()]={type,name:file.name.slice(0,250),src,duration:await metadata(file,type,src)};}await change(p=>Object.assign(p.assets,assets),{media:true});note(`Đã nhập ${files.length} tệp. Bấm Dùng để đưa vào cảnh hoặc làm giọng đọc.`);});
$('project-input').onchange=protect(async e=>{const file=e.target.files[0];e.target.value='';if(!file)return;if(file.size>500*1024*1024)throw Error('Bản sao lưu vượt 500 MiB.');const p=JSON.parse(await file.text());await openProject(p,{duplicate:true});note('Đã khôi phục thành dự án riêng, giữ nguyên bản trước.');});
$('srt-input').onchange=protect(async e=>{const file=e.target.files[0];e.target.value='';if(!file)return;if(file.size>2*1024*1024)throw Error('SRT quá lớn.');const cues=parseSRT(await file.text());await change(p=>{p.captions=cues;});note('Đã nhập phụ đề.');});
bind('clear-captions',()=>change(p=>{p.captions=[];}));
bind('backup',async()=>{validate(project);download(new Blob([JSON.stringify(project)],{type:'application/json'}),filename()+'.stories.json');await persist();note('Đã tạo bản sao lưu gồm cả tư liệu và âm thanh.');});
bind('new',async()=>{await persist();await openProject(fresh());note('Đã tạo dự án riêng.');});
$('projects').onchange=protect(async e=>{const id=e.target.value;await persist();const p=(await store.all()).find(p=>p.id===id);if(p)await openProject(p);});
$('name').onchange=protect(async()=>{await change(p=>{p.name=$('name').value;});await persist();await projectList();});
for(const key of ['diagram','duration','trim','fit','motion','text','subtitle','fontSize','textColor','textX','textY','textWidth','background','source','license','textPanel'])$(key).onchange=protect(async()=>{const el=$(key),value=el.type==='checkbox'?el.checked:el.type==='number'?Number(el.value):el.value;try{await change(p=>{p.scenes[selected][key]=value;});}finally{controls();}});
$('scene-name').onchange=protect(()=>change(p=>{p.scenes[selected].name=$('scene-name').value;}));
$('layout').onchange=protect(()=>change(p=>{const s=p.scenes[selected];s.layout=$('layout').value;s.textX=100;s.textWidth=1700;s.textY=s.layout==='title'?380:820;s.fontSize=s.layout==='title'?100:64;if(s.layout==='media')s.text='';else if(!s.text)s.text='Your headline';}));
$('scene-asset').onchange=protect(async()=>{const id=$('scene-asset').value;if(id)await useAsset(id);else await change(p=>{p.scenes[selected].asset=null;p.scenes[selected].trim=0;});});
$('narration').onchange=protect(()=>change(p=>{p.audio.asset=$('narration').value||null;p.audio.trim=0;}));
for(const [id,key] of [['audio-trim','trim'],['volume','volume']])$(id).onchange=protect(async()=>{try{await change(p=>{p.audio[key]=Number($(id).value);});}finally{controls();}});
bind('add',async()=>{await change(p=>p.scenes.splice(selected+1,0,scene('media')));selected++;time=startOf(project,selected);controls();await draw();});
bind('duplicate',async()=>{const index=selected;await change(p=>{const s=copy(p.scenes[index]);s.id=uid();s.name=s.name.slice(0,180)+' (bản sao)';p.scenes.splice(index+1,0,s);});selected=index+1;time=startOf(project,selected);controls();await draw();});
bind('delete',()=>change(p=>{if(p.scenes.length>1)p.scenes.splice(selected,1);}));
for(const [id,delta] of [['left',-1],['right',1]])bind(id,async()=>{const dest=selected+delta;if(dest<0||dest>=project.scenes.length)return;await change(p=>{[p.scenes[selected],p.scenes[dest]]=[p.scenes[dest],p.scenes[selected]];});selected=dest;time=startOf(project,selected);controls();await draw();});
async function restoreHistory(from,to){if(!from.length)return;stop();to.push(copy(project));project=from.pop();selected=Math.min(selected,project.scenes.length-1);time=clamp(time,0,total(project));await renderer.load(project);syncAudio();controls();await draw();scheduleSave();}
bind('undo',()=>restoreHistory(history,future));bind('redo',()=>restoreHistory(future,history));
$('seek').oninput=protect(async()=>{stop();time=Number($('seek').value);selected=locate(project,time).index;displayTime();await draw();});
$('seek').onchange=()=>controls();
async function audioStart(){if(!project.audio.asset)return;if(audioContext?.state==='suspended')await audioContext.resume();if(narration.readyState<1)await new Promise((res,rej)=>{const ok=()=>{cleanup();res();},bad=()=>{cleanup();rej(Error('Không đọc được giọng đọc.'));},cleanup=()=>{narration.removeEventListener('loadedmetadata',ok);narration.removeEventListener('error',bad);};narration.addEventListener('loadedmetadata',ok,{once:true});narration.addEventListener('error',bad,{once:true});});narration.currentTime=Math.min(time+project.audio.trim,project.assets[project.audio.asset].duration);if(narration.currentTime<project.assets[project.audio.asset].duration)await narration.play();}
bind('play',async()=>{if(exporting)return;if(playing){stop();return;}if(time>=total(project)-.01)time=0;await audioStart();playing=true;$('play').textContent='Ⅱ Tạm dừng';const origin=performance.now()-time*1000;const tick=async()=>{if(!playing)return;time=Math.min((performance.now()-origin)/1000,total(project));displayTime();try{await draw();}catch(e){stop();note(e.message);return;}if(time>=total(project)){stop();selected=locate(project,time).index;controls();return;}requestAnimationFrame(tick);};requestAnimationFrame(tick);});
bind('snapshot',async()=>{stop();await draw();$('preview').toBlob(b=>{if(b)download(b,filename()+'.png');});});
bind('export',async()=>{
  if(exporting){cancelExport=true;note('Đang hủy xuất…');return;}
  validate(project);if(!window.MediaRecorder||!$('preview').captureStream)throw Error('Trình duyệt không hỗ trợ xuất WebM. Hãy dùng Chrome hoặc Edge.');
  const mime=['video/webm;codecs=vp9,opus','video/webm;codecs=vp8,opus','video/webm'].find(x=>MediaRecorder.isTypeSupported(x));if(!mime)throw Error('Không hỗ trợ mã hóa WebM.');
  stop();await persist();const old=time;let stream,tracks=[];exporting=true;cancelExport=false;document.body.classList.add('busy');$('export').textContent='Hủy xuất';note('Đang xuất theo thời gian thực. Giữ tab ở phía trước.');
  try{
    time=0;await draw();stream=$('preview').captureStream(30);tracks=[...stream.getTracks()];
    if(project.audio.asset){if(!audioContext){audioContext=new AudioContext();audioNode=audioContext.createMediaElementSource(narration);audioNode.connect(audioContext.destination);destination=audioContext.createMediaStreamDestination();audioNode.connect(destination);}await audioContext.resume();for(const track of destination.stream.getAudioTracks())stream.addTrack(track);}
    const chunks=[];recorder=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:8000000});let finished=new Promise((res,rej)=>{recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};recorder.onstop=res;recorder.onerror=()=>rej(Error('Bộ mã hóa WebM gặp lỗi.'));});
    recorder.start(1000);await audioStart();const origin=performance.now();
    while(time<total(project)&&!cancelExport){if(document.hidden)throw Error('Tab bị ẩn. Bản xuất đã hủy để tránh mất khung hình; hãy giữ tab ở phía trước.');time=Math.min((performance.now()-origin)/1000,total(project));await draw();displayTime();$('export').textContent=`Hủy xuất (${Math.floor(time/total(project)*100)}%)`;await new Promise(res=>setTimeout(res,10));}
    recorder.stop();await finished;if(!cancelExport){download(new Blob(chunks,{type:'video/webm'}),filename()+'.webm');note('Đã xuất WebM. Dùng công cụ MP4 trong repo nếu cần thời lượng và tua chính xác.');}else note('Đã hủy xuất.');
  }finally{if(recorder?.state!=='inactive')recorder?.stop();tracks.forEach(t=>t.stop());stop();time=old;exporting=false;document.body.classList.remove('busy');$('export').textContent='Xuất WebM';await draw();displayTime();}
});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&!exporting)stop();});
window.addEventListener('beforeunload',e=>{if(exporting||$('save-status').textContent.includes('chưa lưu')){e.preventDefault();e.returnValue='';}});
window.storiesStudio={get ready(){return ready;},get project(){return copy(project);},load:p=>openProject(p),renderAt:async t=>{stop();time=t;await draw();},canvas:$('preview')};
await protect(async()=>{const projects=await store.all();await openProject(projects.at(-1)||project);ready=true;note('Nhập tư liệu và giọng đọc để bắt đầu.');if(new URLSearchParams(location.search).get('sample')==='wood-intro-v01'){const r=await fetch('../review/001-intro-v01.stories.json');if(!r.ok)throw Error('Bản mẫu không có trên địa chỉ này. Hãy mở tệp sao lưu được bàn giao.');await openProject(await r.json(),{duplicate:true});note('Đã mở mẫu tập 001 thành dự án riêng; giữ nguyên các dự án trước.');}})();
