
(()=>{'use strict';

/*
 * ALMAFLUXO — MOTOR DE DIAGNÓSTICO
 * Versão: 2.0
 *
 * Compatibilidade:
 *   AFDiag.AG
 *   AFDiag.agente()
 *   AFDiag.rota(contexto)
 *
 * Novos recursos:
 *   AFDiag.executar(contexto)
 *   AFDiag.testarAgente()
 *   AFDiag.testarInternet()
 *   AFDiag.testarRede(ip)
 *   AFDiag.resumo(etapas)
 *
 * Não instala, grava ou altera equipamentos.
 * Esta camada realiza somente diagnósticos.
 */

const AG='http://127.0.0.1:8090';
const SITE='https://almafluxo.uk';
const BASE=SITE+'/conversa/instalacao/';
const URL_TESTE=BASE+'manifest.json';

const VERSAO='2.0';

const LIMITES={
 agente:3500,
 rede:9000,
 internet:7000
};

const agora=()=>Date.now();

const erroTexto=e=>{
 if(!e)return 'Erro desconhecido';
 if(e.name==='AbortError')return 'Tempo esgotado';
 if(e instanceof TypeError)return 'Falha de comunicação, rede ou política de acesso do navegador';
 return String(e.message||e);
};

const tempo=(fn,ms)=>{
 const c=new AbortController();
 const id=setTimeout(()=>c.abort(),ms);

 return Promise.resolve()
  .then(()=>fn(c.signal))
  .finally(()=>clearTimeout(id));
};

const objeto=v=>!!v&&typeof v==='object'&&!Array.isArray(v);

const texto=(v,max=500)=>{
 return String(v==null?'':v).slice(0,max);
};

const criarEtapa=(dados)=>{
 const status=dados.status||(
  dados.ok?'ok':'falha'
 );

 return {
  codigo:texto(dados.codigo||'TESTE',80),
  etapa:texto(dados.etapa||'diagnostico',80),
  n:texto(dados.n||'Teste',120),
  ok:status==='ok',
  status,
  gravidade:dados.gravidade||(
   status==='falha'?'erro':
   status==='bloqueado'?'bloqueio':
   status==='aviso'?'aviso':
   status==='nao_testado'?'informativo':'nenhuma'
  ),
  m:texto(dados.m||'',500),
  d:texto(dados.d||'',500),
  proximaAcao:texto(dados.proximaAcao||'',500),
  duracao_ms:Math.max(0,Number(dados.duracao_ms)||0),
  evidencia:objeto(dados.evidencia)?dados.evidencia:{}
 };
};

const sucesso=(codigo,etapa,n,m,d,extra={})=>
 criarEtapa({
  codigo,etapa,n,m,d,status:'ok',...extra
 });

const aviso=(codigo,etapa,n,m,d,extra={})=>
 criarEtapa({
  codigo,etapa,n,m,d,status:'aviso',...extra
 });

const falha=(codigo,etapa,n,m,d,extra={})=>
 criarEtapa({
  codigo,etapa,n,m,d,status:'falha',...extra
 });

const naoTestado=(codigo,etapa,n,m,d,extra={})=>
 criarEtapa({
  codigo,etapa,n,m,d,status:'nao_testado',...extra
 });

const bloqueado=(codigo,etapa,n,m,d,extra={})=>
 criarEtapa({
  codigo,etapa,n,m,d,status:'bloqueado',...extra
 });

async function fetchJSON(url,ms=3500,opcoes={}){
 return tempo(async signal=>{
  const r=await fetch(url,{
   cache:'no-store',
   signal,
   mode:'cors',
   credentials:'omit',
   ...opcoes
  });

  if(!r.ok)throw new Error('HTTP '+r.status);

  const tipo=r.headers.get('content-type')||'';

  if(!/json/i.test(tipo)){
   throw new Error('Resposta não é JSON');
  }

  return r.json();
 },ms);
}

function validarIP(ip){
 if(typeof ip!=='string')return false;

 ip=ip.trim();

 if(!ip||ip.length>45)return false;

 // IPv4.
 const partes=ip.split('.');

 if(partes.length===4){
  return partes.every(x=>
   /^\d{1,3}$/.test(x)&&Number(x)>=0&&Number(x)<=255
  );
 }

 // IPv6: validação sintática básica.
 return ip.includes(':')&&
  /^[0-9a-f:]+$/i.test(ip)&&
  ip.length<=45;
}

function identificarTipo(c){
 const via=texto(c&&c.via,30).toLowerCase();

 if(via==='usb')return 'usb';
 if(via==='bluetooth')return 'bluetooth';
 if(via==='wifi')return 'wifi';

 return via||'desconhecida';
}

function avaliarIdentificacao(id){
 if(!objeto(id))return {
  status:'nao_testado',
  nome:'Nenhum equipamento informado'
 };

 const nome=texto(id.nome,200);
 const desconhecido=
  !nome||
  /não identificado|nao identificado|desconhecido|falha ao identificar/i.test(nome);

 if(desconhecido){
  return {
   status:'aviso',
   nome:nome||'Dispositivo não identificado'
  };
 }

 const certeza=texto(id.certeza,40).toLowerCase();

 if(certeza==='confirmada'){
  return {status:'ok',nome};
 }

 return {status:'aviso',nome};
}

const AFDiag={

 AG,
 SITE,
 BASE,
 VERSAO,

 /*
  * Testa o agente local.
  * Só considera ativo quando a resposta confirma ok:true.
  */

 async testarAgente(){

  const inicio=agora();

  try{
   const a=await fetchJSON(
    AG+'/ping',
    LIMITES.agente
   );

   if(!objeto(a)||a.ok!==true){
    throw new Error('O agente não confirmou funcionamento');
   }

   return {
    ok:true,
    dados:a,
    duracao_ms:agora()-inicio,
    erro:null
   };

  }catch(e){

   return {
    ok:false,
    dados:null,
    duracao_ms:agora()-inicio,
    erro:erroTexto(e)
   };
  }
 },

 async agente(){
  const r=await this.testarAgente();
  return r.ok?r.dados:null;
 },

 /*
  * Testa um IP por meio do agente.
  *
  * Não considera ausência de portas abertas
  * como prova de que o aparelho está desligado.
  */

 async testarRede(ip){

  const inicio=agora();

  if(!validarIP(ip)){
   return {
    ok:false,
    testado:false,
    portas:[],
    erro:'Endereço IP inválido',
    duracao_ms:agora()-inicio
   };
  }

  try{

   const p=await fetchJSON(
    AG+'/probe?ip='+encodeURIComponent(ip),
    LIMITES.rede
   );

   if(!objeto(p)||p.ok!==true){
    throw new Error(p.erro||'O agente não confirmou a sondagem');
   }

   const portas=Array.isArray(p.abertas)
    ?p.abertas.filter(x=>objeto(x))
    :[];

   return {
    ok:true,
    testado:true,
    ip:p.ip||ip,
    portas,
    sistema:p.sistema||null,
    pacote:p.pacote||null,
    duracao_ms:agora()-inicio,
    erro:null
   };

  }catch(e){

   return {
    ok:false,
    testado:false,
    portas:[],
    erro:erroTexto(e),
    duracao_ms:agora()-inicio
   };
  }
 },

 /*
  * Testa portal e manifesto de instalação.
  */

 async testarInternet(){

  const inicio=agora();

  try{

   const manifesto=await fetchJSON(
    URL_TESTE,
    LIMITES.internet
   );

   if(!objeto(manifesto)){
    throw new Error('Manifesto inválido');
   }

   if(!manifesto.versao){
    throw new Error('Manifesto sem identificação de versão');
   }

   return {
    ok:true,
    duracao_ms:agora()-inicio,
    versao:texto(manifesto.versao,40),
    erro:null
   };

  }catch(e){

   return {
    ok:false,
    duracao_ms:agora()-inicio,
    versao:null,
    erro:erroTexto(e)
   };
  }
 },

 /*
  * Motor principal.
  * Executa as etapas e constrói relatório padronizado.
  */

 async executar(c){

  c=objeto(c)?c:{};

  const inicio=agora();
  const etapas=[];
  const via=identificarTipo(c);

  const adicionar=e=>etapas.push(e);

  // 1. Verificar tipo de conexão.

  if(via==='desconhecida'){

   adicionar(aviso(
    'CONEXAO_NAO_INFORMADA',
    'conexao',
    'Tipo de conexão',
    'Não foi informado como o equipamento está conectado.',
    'Informe USB, Bluetooth ou Wi-Fi.',
    {proximaAcao:'Selecionar o tipo de conexão.'}
   ));

  }else{

   adicionar(sucesso(
    'CONEXAO_INFORMADA',
    'conexao',
    'Tipo de conexão',
    'Conexão selecionada: '+via,
    'O tipo de conexão foi informado pelo módulo de hardware.',
    {evidencia:{via}}
   ));

  }

  // 2. Identificação.

  const avaliacao=avaliarIdentificacao(c.id);

  if(avaliacao.status==='ok'){

   adicionar(sucesso(
    'EQUIPAMENTO_IDENTIFICADO',
    'identificacao',
    'Identificação do equipamento',
    'Equipamento reconhecido: '+avaliacao.nome,
    'A identificação foi marcada como confirmada pelo módulo de hardware.',
    {
     evidencia:{
      nome:avaliacao.nome,
      certeza:c.id.certeza||null,
      alvo:c.id.alvo||null,
      placa:c.id.placa||null
     }
    }
   ));

  }else if(avaliacao.status==='aviso'){

   adicionar(aviso(
    'IDENTIFICACAO_PARCIAL',
    'identificacao',
    'Identificação do equipamento',
    avaliacao.nome,
    'O dispositivo foi descrito, mas sua identificação ainda não foi confirmada.',
    {
     proximaAcao:'Verificar VID/PID, nome BLE e resposta do protocolo.'
    }
   ));

  }else{

   adicionar(naoTestado(
    'IDENTIFICACAO_AUSENTE',
    'identificacao',
    'Identificação do equipamento',
    'Nenhum resultado de identificação foi fornecido.',
    'A identificação precisa ser executada pelo hardware.js.'
   ));

  }

  // 3. Agente local.
  // USB e Bluetooth não dependem obrigatoriamente do agente.

  const precisaAgente=via==='wifi'||
   c.exigirAgente===true||
   c.instalacao===true;

  const agente=await this.testarAgente();

  if(agente.ok){

   adicionar(sucesso(
    'AGENTE_ATIVO',
    'computador',
    'Agente local',
    'Agente ativo'+(
     agente.dados.versao?' — versão '+agente.dados.versao:''
    ),
    'O agente respondeu ao teste /ping.',
    {
     duracao_ms:agente.duracao_ms,
     evidencia:{
      versao:agente.dados.versao||null
     }
    }
   ));

  }else if(precisaAgente){

   adicionar(falha(
    'AGENTE_INDISPONIVEL',
    'computador',
    'Agente local',
    'O agente não respondeu ou não confirmou funcionamento.',
    agente.erro,
    {
     duracao_ms:agente.duracao_ms,
     proximaAcao:'Iniciar o agente ALMAFLUXO e verificar as permissões de acesso local.'
    }
   ));

  }else{

   adicionar(aviso(
    'AGENTE_OPCIONAL',
    'computador',
    'Agente local',
    'Agente indisponível. Não é obrigatório para esta conexão.',
    agente.erro,
    {
     duracao_ms:agente.duracao_ms,
     proximaAcao:'Nenhuma ação necessária, salvo se a operação exigir o agente.'
    }
   ));

  }

  // 4. Rede interna.

  if(c.ip){

   if(!validarIP(c.ip)){

    adicionar(falha(
     'IP_INVALIDO',
     'rede',
     'Rede interna',
     'O endereço IP informado não é válido.',
     'Confira o endereço do equipamento.',
     {proximaAcao:'Corrigir o endereço IP.'}
    ));

   }else if(!agente.ok){

    adicionar(naoTestado(
     'REDE_SEM_AGENTE',
     'rede',
     'Rede interna',
     'A sondagem não foi realizada porque o agente local não está disponível.',
     'O navegador não realiza diretamente a varredura de portas por este mecanismo.',
     {proximaAcao:'Iniciar o agente local e repetir o teste.'}
    ));

   }else{

    const rede=await this.testarRede(c.ip);

    if(rede.ok&&rede.portas.length){

     adicionar(sucesso(
      'REDE_SERVICOS_ENCONTRADOS',
      'rede',
      'Rede interna',
      'Serviços encontrados: '+rede.portas.map(x=>x.porta).join(', '),
      'O agente identificou portas abertas no endereço informado.',
      {
       duracao_ms:rede.duracao_ms,
       evidencia:{
        ip:rede.ip,
        portas:rede.portas,
        sistema:rede.sistema
       }
      }
     ));

    }else if(rede.ok){

     adicionar(aviso(
      'REDE_SEM_PORTAS_DETECTADAS',
      'rede',
      'Rede interna',
      'O endereço foi consultado, mas nenhuma das portas monitoradas respondeu.',
      'Isso não prova que o equipamento esteja desligado. Pode haver firewall, serviços desativados ou portas diferentes.',
      {
       duracao_ms:rede.duracao_ms,
       proximaAcao:'Conferir o IP, os serviços habilitados e as portas utilizadas pelo equipamento.',
       evidencia:{ip:rede.ip,portas:[]}
      }
     ));

    }else{

     adicionar(falha(
      'REDE_TESTE_FALHOU',
      'rede',
      'Rede interna',
      'Não foi possível concluir a sondagem.',
      rede.erro,
      {
       duracao_ms:rede.duracao_ms,
       proximaAcao:'Verificar agente, IP, firewall e permissões de rede.'
      }
     ));

    }

   }

  }else{

   adicionar(naoTestado(
    'IP_NAO_INFORMADO',
    'rede',
    'Rede interna',
    'Não foi informado um IP para a sondagem.',
    'Este teste é opcional para USB e Bluetooth.'
   ));

  }

  // 5. Portal e manifesto.

  const internet=await this.testarInternet();

  if(internet.ok){

   adicionar(sucesso(
    'PORTAL_ACESSIVEL',
    'internet',
    'Portal ALMAFLUXO',
    'Portal e manifesto acessíveis — versão '+internet.versao,
    'A requisição HTTPS ao manifesto foi concluída.',
    {
     duracao_ms:internet.duracao_ms,
     evidencia:{versao:internet.versao}
    }
   ));

  }else{

   adicionar(falha(
    'PORTAL_INDISPONIVEL',
    'internet',
    'Portal ALMAFLUXO',
    'Não foi possível validar o manifesto de instalação.',
    internet.erro,
    {
     duracao_ms:internet.duracao_ms,
     proximaAcao:'Verificar DNS, internet, HTTPS e publicação do manifesto.'
    }
   ));

  }

  return this.resumo(etapas,{
   inicio,
   via,
   equipamento:avaliacao.nome
  });

 },

 /*
  * Consolida o relatório sem apagar os resultados individuais.
  */

 resumo(etapas,contexto={}){

  const lista=Array.isArray(etapas)?etapas:[];

  const contagem={
   total:lista.length,
   ok:0,
   aviso:0,
   falha:0,
   bloqueado:0,
   nao_testado:0
  };

  lista.forEach(e=>{
   if(Object.prototype.hasOwnProperty.call(contagem,e.status)){
    contagem[e.status]++;
   }
  });

  const criticas=contagem.falha+contagem.bloqueado;

  let status='ok';

  if(criticas)status='falha';
  else if(contagem.aviso)status='aviso';
  else if(!contagem.ok)status='nao_testado';

  return {
   versao:VERSAO,
   data:new Date().toISOString(),
   status,
   aprovado:status==='ok',
   contexto:{
    via:contexto.via||null,
    equipamento:contexto.equipamento||null
   },
   contagem,
   etapas:lista,
   duracao_ms:Math.max(0,agora()-(contexto.inicio||agora()))
  };

 },

 /*
  * Compatibilidade com o hardware.js atual.
  *
  * AFDiag.rota(c) continua devolvendo uma lista.
  * Mantém n, ok, m, d e status.
  */

 async rota(c){

  const relatorio=await this.executar(c);

  return relatorio.etapas.map(e=>({
   n:e.n,
   ok:e.ok,
   m:e.m,
   d:e.d,
   status:e.status,
   codigo:e.codigo,
   etapa:e.etapa,
   gravidade:e.gravidade,
   proximaAcao:e.proximaAcao,
   duracao_ms:e.duracao_ms,
   evidencia:e.evidencia
  }));

 }

};

window.AFDiag=AFDiag;

})();
