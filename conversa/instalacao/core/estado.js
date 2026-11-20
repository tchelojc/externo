
(()=>{'use strict';

const K='almafluxo_instalador';
const U='almafluxo_usuario';
const LOGIN_URL='/proxy/central';

// Lê o estado persistido do instalador.
const g=()=>{
 try{
  const s=JSON.parse(localStorage.getItem(K)||'{}');

  return s&&typeof s==='object'&&!Array.isArray(s)
   ?s
   :{};

 }catch(e){
  return {};
 }
};

// Mantém o estado anterior e altera somente os campos recebidos.
function set(p){
 const atual=g();
 const dados=p&&typeof p==='object'&&!Array.isArray(p)?p:{};
 const s=Object.assign({},atual,dados);

 try{
  localStorage.setItem(K,JSON.stringify(s));
 }catch(e){
  console.warn('[AFEstado] Não foi possível persistir o estado:',e);
 }

 return s;
}

// Recupera os dados do usuário sem expor ou armazenar senha.
function usuario(){
 try{
  const u=JSON.parse(localStorage.getItem(U)||'null');

  return u&&typeof u==='object'&&!Array.isArray(u)
   ?u
   :null;

 }catch(e){
  return null;
 }
}

// Autentica pelo Worker e guarda somente os dados de sessão.
async function login(email,senha){

 if(typeof email!=='string'||!email.trim()){
  throw new Error('Informe o e-mail.');
 }

 if(typeof senha!=='string'||!senha){
  throw new Error('Informe a senha.');
 }

 let resposta;

 try{
  const r=await fetch(LOGIN_URL,{
   method:'POST',
   headers:{
    'Content-Type':'application/json'
   },
   credentials:'same-origin',
   cache:'no-store',
   body:JSON.stringify({
    action:'login',
    email:email.trim(),
    senha
   })
  });

  if(!r.ok){
   throw new Error('Falha na autenticação (HTTP '+r.status+').');
  }

  resposta=await r.json();

 }catch(e){

  if(e instanceof SyntaxError){
   throw new Error('O servidor retornou uma resposta inválida.');
  }

  if(e.name==='TypeError'){
   throw new Error('Não foi possível conectar ao servidor de autenticação.');
  }

  throw e;
 }

 if(!resposta||typeof resposta!=='object'){
  throw new Error('Resposta de autenticação inválida.');
 }

 const u=resposta.usuario||resposta;

 const tk=
  resposta.token||
  resposta.sessionToken||
  u.sessionToken;

 const autenticado=
  resposta.ok===true||
  resposta.autenticado===true||
  resposta.status==='success';

 if(!autenticado||!tk){
  throw new Error(
   resposta.error||
   resposta.message||
   'E-mail ou senha incorretos.'
  );
 }

 // Mantém o formato esperado pelos módulos do ecossistema.
 const UDATA={
  nome:u.nome||'Usuário',
  email:email.trim(),
  balance:u.balance??u.saldo??0,
  sessionToken:tk,
  master:!!(u.master||u.admin)
 };

 try{
  localStorage.setItem(U,JSON.stringify(UDATA));
 }catch(e){
  throw new Error('Autenticação realizada, mas não foi possível salvar a sessão neste dispositivo.');
 }

 return UDATA;
}

// Solicita ao navegador a persistência do armazenamento.
async function persistir(){
 try{
  if(
   navigator.storage&&
   typeof navigator.storage.persist==='function'
  ){
   return await navigator.storage.persist();
  }

  return false;

 }catch(e){
  return false;
 }
}

window.AFEstado={
 get:g,
 set,
 usuario,
 login,
 persistir
};

})();
