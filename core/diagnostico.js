(()=>{'use strict';const AG='http://127.0.0.1:8090';
const t=async(f,ms=3500)=>{const c=new AbortController(),i=setTimeout(()=>c.abort(),ms);try{return await f(c.signal)}finally{clearTimeout(i)}};
window.AFDiag={AG,async agente(){try{return await t(s=>fetch(AG+'/ping',{signal:s}).then(r=>r.json()))}catch(e){return null}},
 // etapas da rota placa → porta → computador → rede → internet; cada falha traz a dica do trecho
 async rota(c){const R=[],add=(n,ok,m,d)=>R.push({n,ok,m,d});
  add('Porta local',!!c.via,c.via?'Conexão '+c.via+' aberta':'Nenhuma conexão aberta','Conecte o cabo/pareie ou informe o IP.');
  add('Leitura da placa/motor',!!c.id,c.id?'Respondeu: '+c.id.nome:'Sem resposta ao identificar','Troque o cabo (alguns só carregam), a velocidade (baud) ou reinicie a placa.');
  const ag=await this.agente();add('Agente local (127.0.0.1:8090)',!!ag,ag?'Ativo v'+ag.versao:'Não encontrado','Necessário para Wi-Fi/rede. Inicie scripts/agente/almafluxo_agente.py e permita acesso local no navegador.');
  if(c.ip){if(ag){try{const p=await t(s=>fetch(AG+'/probe?ip='+encodeURIComponent(c.ip),{signal:s}).then(r=>r.json()),9000);add('Rede interna ('+c.ip+')',p.abertas&&p.abertas.length>0,p.abertas&&p.abertas.length?'Portas: '+p.abertas.map(x=>x.porta).join(', '):'Nenhuma porta respondeu','Confira se o aparelho e o computador estão na mesma rede e se o IP está correto.')}catch(e){add('Rede interna',false,'Falha no teste','Verifique o IP.')}}else add('Rede interna',false,'Não testada (sem agente)','Inicie o agente local.')}
  try{await t(s=>fetch('https://almafluxo.uk/manifest.webmanifest',{cache:'no-store',signal:s}).then(r=>{if(!r.ok)throw new Error('HTTP '+r.status)}));add('Internet → almafluxo.uk',true,'Alcançável')}catch(e){add('Internet → almafluxo.uk',false,'Sem resposta','Sem internet, DNS ou bloqueio de rede/firewall.')}
  return R}}})();
