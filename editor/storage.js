const dbp=new Promise((resolve,reject)=>{const r=indexedDB.open('american-stories-studio',1);r.onupgradeneeded=()=>r.result.createObjectStore('projects',{keyPath:'id'});r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});
async function tx(mode,run){const db=await dbp;return new Promise((resolve,reject)=>{const t=db.transaction('projects',mode);const r=run(t.objectStore('projects'));let result;r.onsuccess=()=>{result=r.result;};t.oncomplete=()=>resolve(result);t.onerror=()=>reject(t.error);t.onabort=()=>reject(t.error||Error('Không lưu được dự án.'));});}
export const save=p=>tx('readwrite',s=>s.put(p));
export const all=()=>tx('readonly',s=>s.getAll());
