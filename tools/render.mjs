#!/usr/bin/env node
// Render with the same canvas as the editor, then mux narration with FFmpeg.
import {createRequire} from 'node:module';
const {chromium}=createRequire(import.meta.url)('playwright');
import {readFile,writeFile,mkdtemp,mkdir,rm,access,copyFile} from 'node:fs/promises';
import {constants} from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {validate,total} from '../editor/model.js';
const [input,output,base='http://127.0.0.1:8000']=process.argv.slice(2);
if(!input||!output){console.error('Usage: node tools/render.mjs input.stories.json output.mp4 [http://127.0.0.1:8000]');process.exit(1);}
let browser,encoder,tmp;
try{
  const p=validate(JSON.parse(await readFile(input,'utf8')));
  if(path.extname(output).toLowerCase()!=='.mp4')throw Error('Output must use .mp4');
  try{await access(output);throw Error('Output exists. Choose a new filename.');}catch(e){if(e.code!=='ENOENT')throw e;}
  tmp=await mkdtemp(path.join(os.tmpdir(),'american-stories-'));
  let audio;
  if(p.audio.asset){audio=path.join(tmp,'narration');await writeFile(audio,Buffer.from(p.assets[p.audio.asset].src.split(',')[1],'base64'));}
  browser=await chromium.launch({headless:true,...(process.env.STORIES_CHROMIUM?{executablePath:process.env.STORIES_CHROMIUM}:{})});
  const page=await browser.newPage();await page.goto(new URL('editor/',base.endsWith('/')?base:base+'/').href);await page.waitForFunction(()=>window.storiesStudio?.ready);await page.evaluate(p=>window.storiesStudio.load(p),p);
  await mkdir(path.dirname(path.resolve(output)),{recursive:true});
  const args=['-v','error','-n','-threads','2','-f','image2pipe','-vcodec','mjpeg','-framerate',String(p.fps),'-i','pipe:0'];
  if(audio)args.push('-ss',String(p.audio.trim),'-i',audio);
  args.push('-map','0:v:0','-t',String(total(p)),'-c:v','libx264','-threads','2','-preset','veryfast','-crf','20','-pix_fmt','yuv420p');
  if(audio)args.push('-map','1:a:0','-af',`volume=${p.audio.volume},apad`,'-c:a','aac','-ar','48000','-b:a','160k');else args.push('-an');
  const tempOutput=path.join(tmp,'render.mp4');args.push('-movflags','+faststart',tempOutput);
  encoder=spawn('ffmpeg',args,{stdio:['pipe','ignore','pipe']});let error='';encoder.stderr.on('data',d=>{error=(error+d).slice(-6000);});
  const completed=once(encoder,'close');completed.catch(()=>{});encoder.stdin.on('error',()=>{});
  const count=Math.ceil(total(p)*p.fps);
  for(let frame=0;frame<count;frame++){
    if(encoder.exitCode!==null)throw Error('FFmpeg stopped: '+error);
    const jpg=await page.evaluate(async t=>{await window.storiesStudio.renderAt(t);return window.storiesStudio.canvas.toDataURL('image/jpeg',.95).split(',')[1];},frame/p.fps);
    if(!encoder.stdin.write(Buffer.from(jpg,'base64')))await Promise.race([once(encoder.stdin,'drain'),completed.then(()=>{throw Error('FFmpeg stopped: '+error);})]);
    if(frame%150===0)console.log(`Render ${frame}/${count}`);
  }
  encoder.stdin.end();const [code]=await completed;if(code!==0)throw Error('FFmpeg failed: '+error);
  await copyFile(tempOutput,output,constants.COPYFILE_EXCL);
  console.log(`MP4 ready: ${output} (${total(p)} seconds)`);
}catch(e){console.error(e.message);process.exitCode=1;}
finally{
  if(encoder&&encoder.exitCode===null)encoder.kill('SIGTERM');if(browser)await browser.close();if(tmp)await rm(tmp,{recursive:true,force:true});
}
