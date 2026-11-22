const ok=(c,m)=>{if(!c){console.error('FALHOU:',m);process.exit(1)}};
(async()=>{
// ---- atualizador: não apaga caches alheios; só grava versão se a integridade conferir
global.window=global;global.navigator={serviceWorker:{getRegistrations:async()=>[{update:async()=>{}}]}};
const apagados=[];window.caches=global.caches={keys:async()=>['ecossistema-v3','af-instalador-0.9','af-instalador-2.0'],delete:async k=>{apagados.push(k)}};
let est={};window.AFEstado={get:()=>est,set:p=>{est={...est,...p}}};let integ=[{arq:'a',ok:true}];window.AFIntegridade={verificar:async()=>integ};
global.fetch=async()=>({ok:true,json:async()=>({versao:'2.0'})});require('../core/atualizador.js');
let r=await window.AFAtualizador.aplicar('2.0');
ok(r.ok&&est.versao==='2.0','atualiza quando íntegro');ok(JSON.stringify(apagados)==='["af-instalador-0.9"]','só apaga cache próprio antigo: '+apagados);
est={versao:'1.0'};integ=[{arq:'core/x.js',ok:false}];r=await window.AFAtualizador.aplicar('2.0');
ok(!r.ok&&est.versao==='1.0','não grava versão se hash falhar');integ=[];r=await window.AFAtualizador.aplicar('2.0');ok(!r.ok,'manifesto vazio não vale como sucesso');
// ---- ponte do totem
const KL='almafluxo_instalador';let store={},timers=[];global.localStorage={getItem:k=>store[k]??null,setItem:(k,v)=>{store[k]=v}};
global.setTimeout=(f,ms)=>{timers.push({f,ms})};global.location={href:''};
const run=s=>{store[KL]=JSON.stringify(s);timers=[];location.href='';delete require.cache[require.resolve('../core/ponte-totem.js')];require('../core/ponte-totem.js')};
global.sessionStorage={_d:{},getItem(k){return this._d[k]??null},setItem(k,v){this._d[k]=v}};
const dispara=()=>{timers.forEach(t=>t.f())};
run({});dispara();ok(location.href==='','totem direto não redireciona');ok(sessionStorage.getItem('af_conversa_vista')==='1','conversa vista após o tempo mínimo');
sessionStorage._d={};run({proximo:'//evil.com',ultimaAbertura:Date.now()});dispara();ok(location.href==='','rejeita destino externo');
run({proximo:'/',ultimaAbertura:Date.now()-7e5});dispara();ok(location.href==='','pedido expirado é ignorado');
run({proximo:'/',ultimaAbertura:Date.now(),esperaTotem:45});ok(timers.every(t=>t.ms===45000),'agenda 45 s');dispara();
ok(location.href==='/'&&!JSON.parse(store[KL]).proximo,'redireciona uma vez e limpa o destino');
// ---- hardware: alvos reconhecidos
global.window=global;global.navigator={};delete require.cache[require.resolve('../core/hardware.js')];require('../core/hardware.js');
const id=(c)=>window.AFHW.identificar(null,c);
ok((await id({via:'usb',usb:{usbVendorId:0x2E8A,usbProductId:0x0005}})).alvo==='pico','Pico → alvo pico');
ok((await id({via:'usb',usb:{usbVendorId:0x10C4,usbProductId:0xEA60}})).alvo==='esp32','CP210x → esp32');
ok((await id({via:'usb',usb:{usbVendorId:0x2341,usbProductId:0x0043}})).alvo==='avr','Uno → avr');
ok((await id({via:'wifi',sonda:{sistema:'Tizen',abertas:[{porta:8001}]}})).alvo==='tizen','Tizen reconhecido pela rede');
ok((await id({via:'wifi',sonda:{sistema:'Android',pacote:'.apk',abertas:[]}})).alvo==='android','Android pela rede');
console.log('integração ok')})();
(async()=>{global.window=global;delete global.AFCanais;require('../core/canais.js');const {decidir,vizinho}=window.AFCanais,J=JSON.parse(require('fs').readFileSync(__dirname+'/../distribuicao/canais.json','utf8')),L=J.canais;
ok(L.length===7&&new Set(L.map(c=>c.numero)).size===7&&new Set(L.map(c=>c.rota)).size===7,'canais: números e rotas únicos');
const ig=L.find(c=>c.id==='instagram'),yt=L.find(c=>c.id==='youtube'),tt=L.find(c=>c.id==='totem1');
ok(decidir(ig,{logado:false,vista:true}).tipo==='login','canal com login sem conta → cadastro');
ok(decidir(ig,{logado:true,vista:false}).tipo==='conversa'&&decidir(ig,{logado:true,vista:false}).proximo===ig.rota,'conversa passa primeiro');
ok(decidir(yt,{logado:false,vista:false}).tipo==='conversa','YouTube também passa pela conversa');
ok(decidir(tt,{logado:false,vista:false}).tipo==='ir','totem abre direto');ok(decidir(ig,{logado:true,vista:true}).tipo==='ir','depois da conversa, vai ao canal');
ok(vizinho(L,6,1).id==='totem1'&&vizinho(L,0,-1).id==='twitter'&&vizinho(L,-1,1).id==='totem1','navegação circular e canal fora da lista');
console.log('canais ok')})();
