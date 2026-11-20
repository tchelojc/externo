
(()=>{'use strict';

const AG='http://127.0.0.1:8090';
const SITE='https://almafluxo.uk';
const URL_TESTE=SITE+'/conversa/instalacao/manifest.json';

const t=async(f,ms=3500)=>{
 const c=new AbortController();
 const i=setTimeout(()=>c.abort(),ms);

 try{
  return await f(c.signal);
 }finally{
  clearTimeout(i);
 }
};

async function respostaJSON(url,ms=3500){
 return t(async signal=>{
  const r=await fetch(url,{
   cache:'no-store',
   signal,
   mode:'cors'
  });

  if(!r.ok){
   throw new Error('HTTP '+r.status);
  }

  return r.json();
 },ms);
}

window.AFDiag={

 AG,

 async agente(){
  try{
   const a=await respostaJSON(AG+'/ping');

   if(!a||typeof a!=='object'){
    throw new Error('Resposta inválida');
   }

   return a;

  }catch(e){
   return null;
  }
 },

 // Etapas: placa → porta → computador → rede → internet.
 async rota(c){

  c=c||{};

  const R=[];

  const add=(n,ok,m,d,status)=>{
   R.push({
    n,
    ok:!!ok,
    m,
    d:d||'',
    status:status||(ok?'ok':'falha')
   });
  };

  // 1. Porta/conexão física.
  add(
   'Porta local',
   !!c.via,
   c.via
    ?'Conexão '+c.via+' aberta'
    :'Nenhuma conexão aberta',
   'Conecte o cabo, faça o pareamento ou informe o IP.'
  );

  // 2. Identificação da placa/motor.
  add(
   'Leitura da placa/motor',
   !!c.id,
   c.id
    ?'Respondeu: '+(c.id.nome||'dispositivo identificado')
    :'Sem resposta ao identificar',
   'Confira o cabo (alguns só carregam), a velocidade baud e reinicie a placa.'
  );

  // 3. Agente local.
  const ag=await this.agente();

  add(
   'Agente local (127.0.0.1:8090)',
   !!ag,
   ag
    ?'Ativo'+(ag.versao?' v'+ag.versao:'')
    :'Não encontrado ou sem resposta válida',
   'Inicie scripts/agente/almafluxo_agente.py e verifique a permissão de acesso local no navegador.'
  );

  // 4. Rede interna.
  if(c.ip){

   if(ag){

    try{
     const url=AG+'/probe?ip='+encodeURIComponent(c.ip);

     const p=await respostaJSON(url,9000);

     const portas=Array.isArray(p.abertas)
      ?p.abertas
      :[];

     const encontrou=portas.length>0;

     add(
      'Rede interna ('+c.ip+')',
      encontrou,
      encontrou
       ?'Portas abertas: '+portas.map(x=>x.porta).join(', ')
       :'Nenhuma porta respondeu',
      'Confira se o aparelho e o computador estão na mesma rede, se o IP está correto e se o firewall permite a comunicação.'
     );

    }catch(e){

     add(
      'Rede interna ('+c.ip+')',
      false,
      'Falha no teste: '+(e.name==='AbortError'?'tempo esgotado':e.message),
      'Verifique o IP, o agente local e as permissões de rede.'
     );

    }

   }else{

    add(
     'Rede interna ('+c.ip+')',
     false,
     'Não testada: agente local indisponível',
     'Inicie o agente local para realizar o teste.',
     'nao_testado'
    );

   }

  }else{

   add(
    'Rede interna',
    false,
    'Não testada: nenhum IP informado',
    'Informe o IP do dispositivo para testar a rede.',
    'nao_testado'
   );

  }

  // 5. Internet e disponibilidade do portal.
  try{

   const r=await t(signal=>fetch(URL_TESTE,{
    method:'GET',
    cache:'no-store',
    signal,
    mode:'cors'
   }),7000);

   if(!r.ok){
    throw new Error('HTTP '+r.status);
   }

   const manifesto=await r.json();

   if(!manifesto||typeof manifesto!=='object'){
    throw new Error('Manifesto inválido');
   }

   add(
    'Internet → almafluxo.uk',
    true,
    'Domínio e manifesto acessíveis',
    'Conexão HTTPS confirmada.'
   );

  }catch(e){

   add(
    'Internet → almafluxo.uk',
    false,
    'Sem resposta válida: '+(e.name==='AbortError'?'tempo esgotado':e.message),
    'Verifique internet, DNS, certificado HTTPS, firewall e disponibilidade do portal.'
   );

  }

  return R;
 }

};

})();
