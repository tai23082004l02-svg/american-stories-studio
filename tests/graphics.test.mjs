import test from 'node:test';
import assert from 'node:assert/strict';
import {fresh,validate} from '../editor/model.js';
import {GRAPHICS,drawGraphic} from '../editor/graphics.js';
// Canvas command log tests seek determinism and data-scope labels without a browser.
function logFrame(type,t){const log=[];const ctx=new Proxy({}, {get:(o,k)=>o[k]??((...args)=>log.push([k,...args])),set:(o,k,v)=>{log.push(['set',k,v]);o[k]=v;return true;}});drawGraphic(ctx,type,t);return log;}
test('all illustration presets render deterministic commands when seeking',()=>{for(const type of GRAPHICS){const first=logFrame(type,.8);logFrame(type,2);assert.deepEqual(logFrame(type,.8),first);}});
test('data diagram retains scope and shows exactly 94 of 100 tiles at rest',()=>{const commands=logFrame('share',2);assert(commands.some(c=>c[0]==='fillText'&&c[1]==='94%'));let color,orange=0,tiles=0;for(const c of commands){if(c[0]==='set'&&c[1]==='fillStyle')color=c[2];if(c[0]==='roundRect'&&c[3]===52&&c[4]===42){tiles++;if(color==='#E87932')orange++;}}assert.equal(tiles,100);assert.equal(orange,94);assert(commands.some(c=>c[0]==='fillText'&&c[1]==='completed in 2024'));assert(commands.some(c=>c[0]==='fillText'&&c[1].includes('NOT ALL EXISTING HOMES')));});
test('legacy projects without a diagram remain valid, unknown presets fail',()=>{const p=fresh();delete p.scenes[0].diagram;validate(p);p.scenes[0].diagram='unknown';assert.throws(()=>validate(p));});
