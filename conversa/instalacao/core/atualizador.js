(()=>{'use strict';
// Não apaga NENHUM cache do ecossistema: só caches próprios do instalador (prefixo "af-instalador-").
// A versão só é gravada depois que o SHA-256 dos arquivos servidos agora confere com o manifesto.
window.AFAtualizador={async checar(){const l=window.AFEstado?AFEstado.get().versao:null;
 try{const v=await fetch('/distribuicao/versao.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw 0;return r.json()});return{local:l,remota:v.versao,nova:!l||l!==v.versao,notas:v.notas||''}}catch(e){return{local:l,remota:null,nova:false,erro:'versao.json inacessível'}}},
 async aplicar(v){const et=[];
  try{const rs=navigator.serviceWorker?await navigator.serviceWorker.getRegistrations():[];await Promise.all(rs.map(x=>x.update()));et.push('Service Workers consultados: '+rs.length)}catch(e){et.push('Service Worker: '+e.message)}
  try{if(window.caches)for(const k of await caches.keys())if(k.startsWith('af-instalador-')&&k!=='af-instalador-'+v)await caches.delete(k)}catch(e){et.push('cache próprio: '+e.message)}
  const c=await this.checar();if(c.erro||c.remota!==v)return{ok:false,msg:'Atualização não aplicada: a versão remota mudou ou não respondeu.',etapas:et};
  const i=window.AFIntegridade?await AFIntegridade.verificar('/'):[],f=i.filter(x=>!x.ok);
  if(!i.length||f.length)return{ok:false,msg:'Atualização NÃO confirmada: '+(f.length?f.map(x=>x.arq).join(', ')+' não confere com o manifesto':'manifesto vazio')+'. Versão anterior mantida.',etapas:et,falhas:f};
  if(window.AFEstado)AFEstado.set({versao:v,atualizadoEm:Date.now()});return{ok:true,msg:'Atualizado para '+v+'. Integridade: '+i.length+'/'+i.length+' arquivos conferem.',etapas:et}}}})();
