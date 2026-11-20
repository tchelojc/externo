(()=>{'use strict';const K='almafluxo_instalador',g=()=>{try{return JSON.parse(localStorage.getItem(K)||'{}')}catch(e){return{}}};
window.AFEstado={get:g,set(p){const s=Object.assign(g(),p);try{localStorage.setItem(K,JSON.stringify(s))}catch(e){}return s},
usuario(){try{return JSON.parse(localStorage.getItem('almafluxo_usuario')||'null')}catch(e){return null}},
// guarda só o token de sessão (nunca a senha), no mesmo formato lido por eletrica/mecanica
async login(email,senha){const r=await fetch('/proxy/central',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'login',email,senha})}).then(x=>x.json()),u=r.usuario||r,tk=r.token||r.sessionToken||u.sessionToken;
 if(!(r.ok===true||r.autenticado===true||r.status==='success')||!tk)throw new Error(r.error||r.message||'E-mail ou senha incorretos');
 const U={nome:u.nome||'Usuário',email,balance:u.balance??u.saldo??0,sessionToken:tk,master:!!(u.master||u.admin)};localStorage.setItem('almafluxo_usuario',JSON.stringify(U));return U},
async persistir(){try{return navigator.storage&&navigator.storage.persist?await navigator.storage.persist():false}catch(e){return false}}}})();
