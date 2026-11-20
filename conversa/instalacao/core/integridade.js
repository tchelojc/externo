(()=>{'use strict';const hex=b=>[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('');
window.AFIntegridade={async verificar(base='/'){const out=[];try{const m=await fetch(base+'distribuicao/manifest.json',{cache:'no-store'}).then(r=>r.json());
 if(!(window.crypto&&crypto.subtle))return[{arq:'(crypto)',ok:false,msg:'SHA-256 indisponível neste navegador'}];
 for(const [a,h] of Object.entries(m.arquivos||{})){try{const b=await fetch(base+a,{cache:'no-store'}).then(r=>r.arrayBuffer());const x=hex(await crypto.subtle.digest('SHA-256',b));out.push({arq:a,ok:x===h,msg:x===h?'íntegro':'hash diferente do manifesto'})}catch(e){out.push({arq:a,ok:false,msg:'não carregou'})}}}
 catch(e){out.push({arq:'manifest.json',ok:false,msg:'manifesto indisponível'})}return out}}})();
