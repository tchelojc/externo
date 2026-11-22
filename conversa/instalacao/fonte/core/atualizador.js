
(()=>{'use strict';

const BASE_INSTALACAO='https://almafluxo.uk/conversa/instalacao/';
const URL_VERSAO='https://almafluxo.uk/distribuicao/versao.json';
const PREFIXO_CACHE='af-instalador-';

window.AFAtualizador={

 async checar(){
  const local=window.AFEstado?AFEstado.get().versao:null;

  try{
   const resposta=await fetch(URL_VERSAO,{
    cache:'no-store',
    credentials:'same-origin'
   });

   if(!resposta.ok)throw new Error('HTTP '+resposta.status);

   const v=await resposta.json();

   if(!v||typeof v.versao!=='string'||!v.versao.trim()){
    throw new Error('Versão inválida');
   }

   return{
    local,
    remota:v.versao,
    nova:!local||local!==v.versao,
    notas:v.notas||''
   };

  }catch(e){
   return{
    local,
    remota:null,
    nova:false,
    erro:'versao.json inacessível ou inválido'
   };
  }
 },

 async aplicar(v){
  const etapas=[];

  try{

   // 1. Validar a versão solicitada.
   if(typeof v!=='string'||! /^[\w.-]+$/.test(v)){
    return{
     ok:false,
     msg:'Versão informada inválida.',
     etapas
    };
   }

   // 2. Confirmar que a versão ainda é a publicada.
   const c=await window.AFAtualizador.checar();

   if(c.erro||c.remota!==v){
    return{
     ok:false,
     msg:'Atualização não aplicada: a versão remota mudou ou não respondeu.',
     etapas
    };
   }

   etapas.push('Versão remota confirmada: '+v);

   // 3. Verificar os arquivos pelo manifesto da instalação.
   if(!window.AFIntegridade||typeof AFIntegridade.verificar!=='function'){
    return{
     ok:false,
     msg:'Atualização não confirmada: módulo de integridade indisponível.',
     etapas
    };
   }

   const integridade=await AFIntegridade.verificar(BASE_INSTALACAO);
   const falhas=integridade.filter(x=>!x.ok);

   if(!integridade.length||falhas.length){
    return{
     ok:false,
     msg:'Atualização NÃO confirmada: '+
      (falhas.length
       ?falhas.map(x=>x.arq).join(', ')+' não confere com o manifesto'
       :'manifesto vazio ou sem arquivos verificáveis')+
      '. Versão anterior mantida.',
     etapas,
     falhas
    };
   }

   etapas.push(
    'Integridade confirmada: '+integridade.length+'/'+integridade.length+' arquivos.'
   );

   // 4. Conferir novamente se a versão não mudou durante a verificação.
   const confirmacao=await window.AFAtualizador.checar();

   if(confirmacao.erro||confirmacao.remota!==v){
    return{
     ok:false,
     msg:'A versão remota mudou durante a verificação. Atualização cancelada.',
     etapas
    };
   }

   // 5. Consultar os Service Workers registrados.
   try{
    const registros=navigator.serviceWorker
     ?await navigator.serviceWorker.getRegistrations()
     :[];

    await Promise.all(registros.map(r=>r.update()));

    etapas.push('Service Workers consultados: '+registros.length);

   }catch(e){
    etapas.push('Aviso no Service Worker: '+e.message);
   }

   // 6. Limpar somente caches antigos do instalador.
   // Não apaga caches do totem nem de outros módulos.
   try{
    if(window.caches){
     const nomes=await caches.keys();

     for(const nome of nomes){
      if(
       nome.startsWith(PREFIXO_CACHE)&&
       nome!==PREFIXO_CACHE+v
      ){
       await caches.delete(nome);
      }
     }
    }

    etapas.push('Caches antigos do instalador verificados.');

   }catch(e){
    etapas.push('Aviso na limpeza de cache: '+e.message);
   }

   // 7. Gravar a versão somente após a integridade confirmada.
   if(window.AFEstado){
    AFEstado.set({
     versao:v,
     atualizadoEm:Date.now()
    });
   }

   return{
    ok:true,
    msg:'Atualização para '+v+' confirmada. Integridade: '+
     integridade.length+'/'+integridade.length+' arquivos.',
    etapas
   };

  }catch(e){
   return{
    ok:false,
    msg:'Falha durante a atualização: '+e.message,
    etapas
   };
  }
 }

};

})();
