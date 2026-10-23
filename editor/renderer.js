import {locate,clamp,total} from './model.js';
import {drawGraphic} from './graphics.js';
export class Renderer {
  constructor(canvas){this.canvas=canvas;this.ctx=canvas.getContext('2d');this.media=new Map();}
  clear(){for(const m of this.media.values())if(m instanceof HTMLVideoElement){m.pause();m.removeAttribute('src');m.load();}this.media.clear();}
  async load(p){this.clear();await Promise.all(Object.entries(p.assets).filter(([,a])=>a.type!=='audio').map(async([id,a])=>{
    if(a.type==='image'){const im=new Image();im.src=a.src;await im.decode();this.media.set(id,im);}
    else {const v=document.createElement('video');v.preload='auto';v.muted=true;v.playsInline=true;await new Promise((res,rej)=>{v.onloadeddata=res;v.onerror=()=>rej(Error('Không đọc được video '+a.name));v.src=a.src;});this.media.set(id,v);}
  }));}
  async at(p,t){const at=locate(p,t);const m=this.media.get(at.scene.asset);if(m instanceof HTMLVideoElement){const target=Math.min(at.scene.trim+at.local,Math.max(0,m.duration-.001));if(Math.abs(m.currentTime-target)>.001)await new Promise((res,rej)=>{const timeout=setTimeout(()=>{m.onseeked=null;rej(Error('Video không tua được.'));},10000);m.onseeked=()=>{clearTimeout(timeout);m.onseeked=null;res();};m.currentTime=target;});}this.draw(p,t);}
  lines(text,width,size){const ctx=this.ctx;ctx.font=`700 ${size}px Arial, sans-serif`;const out=[];for(const para of text.split('\n')){let line='';for(const word of para.split(' ')){const next=line?line+' '+word:word;if(line&&ctx.measureText(next).width>width){out.push(line);line=word;}else line=next;}out.push(line);}return out;}
  draw(p,t){const {scene:s,local}=locate(p,t),ctx=this.ctx;ctx.clearRect(0,0,1920,1080);ctx.fillStyle=s.background;ctx.fillRect(0,0,1920,1080);
    drawGraphic(ctx,s.diagram,local);
    const m=this.media.get(s.asset);if(m){const w=m.videoWidth||m.naturalWidth,h=m.videoHeight||m.naturalHeight;const progress=clamp(local/s.duration,0,1);const zoom=s.motion==='zoom-in'?1+.08*progress:s.motion==='zoom-out'?1.08-.08*progress:1;const scale=(s.fit==='cover'?Math.max(1920/w,1080/h):Math.min(1920/w,1080/h))*zoom;ctx.drawImage(m,(1920-w*scale)/2,(1080-h*scale)/2,w*scale,h*scale);}
    if(s.text){const lines=this.lines(s.text,s.textWidth,s.fontSize),lineH=s.fontSize*1.15;ctx.save();ctx.globalAlpha=clamp(local/.25,0,1);if(s.textPanel){ctx.fillStyle=s.background;ctx.globalAlpha*=.94;ctx.fillRect(s.textX-28,s.textY-22,Math.min(s.textWidth+56,1920-s.textX+28),lines.length*lineH+44);ctx.globalAlpha=clamp(local/.25,0,1);}ctx.fillStyle='#E87932';ctx.fillRect(s.textX,s.textY-42,100,8);ctx.fillStyle=s.textColor;ctx.font=`700 ${s.fontSize}px Arial, sans-serif`;ctx.textBaseline='top';lines.forEach((l,i)=>ctx.fillText(l,s.textX,s.textY+i*lineH));if(s.subtitle){ctx.font='32px Arial, sans-serif';ctx.fillText(s.subtitle,s.textX,s.textY+lines.length*lineH+20);}ctx.restore();}
    const cue=p.captions.find(c=>t>=c.start&&t<c.end);if(cue){const lines=this.lines(cue.text,1640,40);ctx.fillStyle='#172A3A';ctx.fillRect(100,1040-lines.length*50-24,1720,lines.length*50+24);ctx.fillStyle='#ffffff';ctx.font='40px Arial, sans-serif';ctx.textAlign='center';ctx.textBaseline='top';lines.forEach((l,i)=>ctx.fillText(l,960,1040-lines.length*50-12+i*50));ctx.textAlign='left';}
    return {duration:total(p)};
  }
}
