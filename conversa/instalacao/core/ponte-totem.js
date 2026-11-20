(()=>{'use strict';/* Injetada pelo Worker no totem (sem editar o arquivo dele). */
try{const K='almafluxo_instalador',s=JSON.parse(localStorage.getItem(K)||'{}'),ms=(s.esperaTotem||45)*1e3;
 // a "conversa" conta como vista depois de rodar o tempo mínimo: libera os canais externos nesta sessão
 setTimeout(()=>{try{sessionStorage.setItem('af_conversa_vista','1')}catch(e){}},ms);
 if(!s.proximo||!s.ultimaAbertura||Date.now()-s.ultimaAbertura>6e5||!/^\/[\w\/.-]*$/.test(s.proximo)||s.proximo.startsWith('//'))return;
 setTimeout(()=>{try{const t=JSON.parse(localStorage.getItem(K)||'{}'),d=t.proximo;delete t.proximo;localStorage.setItem(K,JSON.stringify(t));if(d)location.href=d}catch(e){}},ms)}catch(e){}})();
