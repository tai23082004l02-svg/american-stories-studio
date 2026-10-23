import {GRAPHICS} from './graphics.js';
export const copy = x => structuredClone(x);
export const uid = () => crypto.randomUUID();
export const total = p => p.scenes.reduce((n,s)=>n+s.duration,0);
export const clamp = (x,a,b)=>Math.max(a,Math.min(b,x));
export function scene(preset='title') {
  return {id:uid(),name:'Cảnh mới',duration:5,asset:null,trim:0,background:'#F5F1E8',fit:'cover',motion:'none',layout:preset,diagram:'none',
    text:preset==='title'?'Your story starts here':'',subtitle:'',source:'',license:'',
    textX:100,textY:preset==='title'?380:820,textWidth:1700,fontSize:preset==='title'?100:64,textColor:'#172A3A',textPanel:true};
}
export function fresh(){return {kind:'american-stories-project',version:1,id:uid(),name:'Dự án chưa đặt tên',width:1920,height:1080,fps:30,assets:{},scenes:[scene()],audio:{asset:null,trim:0,volume:1},captions:[]};}
export function locate(p,time){let start=0;for(let i=0;i<p.scenes.length;i++){const s=p.scenes[i];if(time<start+s.duration||i===p.scenes.length-1)return {scene:s,index:i,start,local:clamp(time-start,0,s.duration)};start+=s.duration;}}
export function startOf(p,i){return p.scenes.slice(0,i).reduce((n,s)=>n+s.duration,0);}
export function validate(p){
  const fail = m=>{throw Error(m);};
  const num=(v,min,max)=>typeof v==='number'&&Number.isFinite(v)&&v>=min&&v<=max;
  const str=(v,max)=>typeof v==='string'&&v.length<=max;
  const color=v=>typeof v==='string'&&/^#[0-9a-f]{6}$/i.test(v);
  if(!p||p.kind!=='american-stories-project'||p.version!==1||p.width!==1920||p.height!==1080||p.fps!==30||!str(p.id,100)||!str(p.name,150))fail('Định dạng dự án không được hỗ trợ.');
  if(!p.assets||typeof p.assets!=='object'||Array.isArray(p.assets)||Object.keys(p.assets).length>300)fail('Kho tài nguyên không hợp lệ.');
  for(const a of Object.values(p.assets)){
    if(!a||!['image','video','audio'].includes(a.type)||!str(a.name,250)||!num(a.duration,0,86400)||typeof a.src!=='string'||!new RegExp('^data:'+a.type+'/[a-zA-Z0-9.+-]+;base64,[A-Za-z0-9+/=]+$').test(a.src))fail('Tài nguyên phải là tệp nhúng hợp lệ.');
  }
  if(!Array.isArray(p.scenes)||!p.scenes.length||p.scenes.length>500)fail('Cần từ 1 đến 500 cảnh.');
  const ids=new Set();
  for(const s of p.scenes){
    if(!s||!str(s.id,100)||ids.has(s.id)||!str(s.name,200)||!num(s.duration,.1,600)||!num(s.trim,0,86400)||!color(s.background)||!['cover','contain'].includes(s.fit)||!['none','zoom-in','zoom-out'].includes(s.motion)||!['title','media','lower-third'].includes(s.layout)||!str(s.text,2000)||!str(s.subtitle,2000)||!str(s.source,3000)||!str(s.license,1000)||!num(s.textX,0,1920)||!num(s.textY,0,1080)||!num(s.textWidth,100,1920)||!num(s.fontSize,20,200)||!color(s.textColor)||typeof s.textPanel!=='boolean')fail('Thông số cảnh không hợp lệ.');
    if(s.diagram!==undefined&&!GRAPHICS.includes(s.diagram))fail('Đồ họa minh họa không hợp lệ.');
    for(const key of ['diagramKicker','diagramFooter'])if(s[key]!==undefined&&!str(s[key],200))fail('Nhãn đồ họa không hợp lệ.');
    ids.add(s.id);if(s.asset!==null){const a=p.assets[s.asset];if(!a||a.type==='audio')fail('Cảnh thiếu ảnh hoặc video.');if(a.type==='video'&&s.trim+s.duration>a.duration+.05)fail('Điểm cắt cảnh vượt độ dài video.');}
  }
  if(total(p)>3600)fail('Bản đầu hỗ trợ tối đa 60 phút.');
  if(!p.audio||!num(p.audio.trim,0,86400)||!num(p.audio.volume,0,1)||(p.audio.asset!==null&&p.assets[p.audio.asset]?.type!=='audio'))fail('Giọng đọc không hợp lệ.');
  if(p.audio.asset&&p.audio.trim>=p.assets[p.audio.asset].duration)fail('Điểm cắt giọng đọc vượt độ dài tệp.');
  if(!Array.isArray(p.captions)||p.captions.length>5000||p.captions.some(c=>!num(c.start,0,3600)||!num(c.end,0,3600)||c.end<=c.start||!str(c.text,2000)))fail('Phụ đề không hợp lệ.');
  return p;
}
export function parseSRT(input){
  const stamp=s=>{const m=s.trim().match(/^(\d{1,2}):(\d{2}):(\d{2})[,.](\d{3})$/);if(!m)throw Error('Mốc thời gian SRT không hợp lệ.');return +m[1]*3600+ +m[2]*60+ +m[3]+ +m[4]/1000;};
  const blocks=input.replace(/^\uFEFF/,'').replace(/\r/g,'').trim().split(/\n\s*\n/);
  if(!input.trim())return [];
  return blocks.map(block=>{const lines=block.split('\n');const idx=lines.findIndex(l=>l.includes('-->'));if(idx<0||!lines[idx+1])throw Error('Thiếu thời gian hoặc chữ trong SRT.');const [a,b]=lines[idx].split('-->');const start=stamp(a),end=stamp(b);if(end<=start)throw Error('Thời gian kết thúc phải lớn hơn bắt đầu.');return {start,end,text:lines.slice(idx+1).join('\n')};});
}
