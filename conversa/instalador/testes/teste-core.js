global.window={};global.navigator={};require('../core/hardware.js');
const {pid,dtc}=window.AFHW._t,ok=(c,m)=>{if(!c){console.error('FALHOU:',m);process.exit(1)}};
let r=pid('41 0C 1A F8','010C',2);ok(r&&(r[0]*256+r[1])/4===1726,'RPM');
r=pid('41 05 7B','0105',1);ok(r[0]-40===83,'temperatura');ok(pid('NO DATA','010C',2)===null,'sem dado');
ok(JSON.stringify(dtc('43 01 33 00 00'))==='["P0133"]','DTC P0133');ok(dtc('43 00 00 00 00').length===0,'sem DTC');
console.log('testes ok')
global.crypto=require('crypto').webcrypto;require('../core/gravador.js');
const L=window.AFGravador.filtrar([{alvo:'esp32',arquivo:'a',sha256:'a'.repeat(64)},{alvo:'esp32',arquivo:'b',sha256:'x'},{alvo:'android',arquivo:'c',sha256:'b'.repeat(64)}],'esp32');
ok(L.length===1,'filtro de pacotes exige hash SHA-256 válido');console.log('gravador ok')
const J=JSON.parse(require('fs').readFileSync(__dirname+'/../distribuicao/pacotes.json','utf8'));
ok(J.comunicacao.serial.bauds.length>=1&&J.comunicacao.elm327.porta_padrao===35000&&Object.keys(J.comunicacao.usb).length>5,'config de comunicação');
ok(J.alvos.esp32.implementado&&!J.alvos.tizen.implementado&&Array.isArray(J.pacotes),'alvos e pacotes');console.log('config ok')
const need=['android','ios','mac','windows','linux','debian-offline','tizen','webos','android-tv','esp32','pico','avr','outras'];
for(const k of need){const g=J.guias[k];ok(g&&g.passos.length>=2&&g.passos.every(p=>p.t&&p.d),'guia '+k)}
ok(J.guias['debian-offline'].implementado===false&&J.guias.tizen.implementado===false,'honestidade');console.log('guias ok')
