/* Compila fonte/ (JavaScript moderno) para a pasta do instalador em ES5,
   para rodar em TVs antigas (Chromium 38+ / WebKit de TV).
   Uso:  cd build && npm install && node compilar.js
   Edite SEMPRE os arquivos em fonte/ e rode de novo. */
const fs=require('fs'),path=require('path');
const babel=require('@babel/core');
const RAIZ=path.resolve(__dirname,'..'),FONTE=path.join(RAIZ,'fonte');

function es5(codigo,nome){
  return babel.transformSync(codigo,{
    filename:nome,sourceType:'script',comments:false,compact:false,babelrc:false,configFile:false,
    presets:[['@babel/preset-env',{targets:{chrome:'38'},modules:false}]]
  }).code;
}
function gravar(destino,texto){fs.mkdirSync(path.dirname(destino),{recursive:true});fs.writeFileSync(destino,texto)}

let n=0;
// 1) scripts do núcleo
const core=path.join(FONTE,'core');
for(const f of fs.readdirSync(core).filter(x=>x.endsWith('.js'))){
  gravar(path.join(RAIZ,'core',f),es5(fs.readFileSync(path.join(core,f),'utf8'),f));n++;
}
// 2) páginas HTML: compila só os <script> embutidos (sem src)
function paginas(dir,rel){
  for(const e of fs.readdirSync(dir,{withFileTypes:true})){
    const p=path.join(dir,e.name),r=path.join(rel,e.name);
    if(e.isDirectory()){if(e.name!=='core')paginas(p,r);continue}
    if(!e.name.endsWith('.html'))continue;
    const html=fs.readFileSync(p,'utf8').replace(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g,
      (m,attrs,cod)=>/type\s*=\s*["'](?!text\/javascript)/.test(attrs)||!cod.trim()?m:'<script'+attrs+'>\n'+es5(cod,r)+'\n</script>');
    gravar(path.join(RAIZ,r),html);n++;
  }
}
paginas(FONTE,'');
// 3) polyfills (carregados só quando o aparelho não tem o recurso)
const nm=p=>path.join(__dirname,'node_modules',p);
const pol=[nm('core-js-bundle/minified.js'),nm('whatwg-fetch/dist/fetch.umd.js'),nm('abortcontroller-polyfill/dist/abortcontroller-polyfill-only.js')]
  .map(f=>fs.readFileSync(f,'utf8')).join('\n;\n');
gravar(path.join(RAIZ,'core','polifill.js'),pol);
console.log('Compilados:',n,'arquivos + polifill.js');
