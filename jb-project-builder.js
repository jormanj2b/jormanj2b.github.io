/* JB Studio modular configurator. */
(function builder(){
'use strict';
const root=document.getElementById('projectBuilder'),c=window.JBProjectCatalog;
if(!root||!c||typeof data==='undefined')return;
const en=document.documentElement.lang==='en',tr=(a,b)=>en?b:a,d=data[en?'en':'es'],q=s=>root.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,v=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[v]));
const money=n=>'$'+Number(n).toLocaleString('en-US')+' USD';
const name=m=>m[en?3:2], typeName=t=>t[en?2:1], byId=id=>c.modules.find(m=>m[0]===id);
const prices={web:d.plans.web.map(x=>x[1]),automation:d.plans.automation.map(x=>x[1]),maintenance:d.maintenance.map(x=>x[1])};
const state={type:'landing',web:0,modules:[],care:-1,category:'sales'};
const opts=arr=>arr.map((x,i)=>'<option value="'+i+'">'+esc(x[0])+' · '+money(x[1])+'</option>').join('');
const option=(val,label)=>'<option value="'+val+'">'+esc(label)+'</option>';
root.innerHTML='<div class="jb-pb-layout"><div class="jb-pb-main">'+
'<fieldset class="jb-pb-card"><legend><span class="jb-pb-kicker">01 / '+tr('TIPO DE PROYECTO','PROJECT TYPE')+'</span></legend><label for="jb-pb-preset">'+tr('Comienza con una propuesta por sector (opcional)','Start with an industry preset (optional)')+'</label><select id="jb-pb-preset">'+option('',tr('Personalizar desde cero','Start from scratch'))+c.presets.map((p,i)=>option(i,p[en?1:0])).join('')+'</select><div class="jb-pb-types">'+c.types.map(t=>'<label class="jb-pb-choice jb-pb-type"><input type="radio" name="jb-pb-type" value="'+t[0]+'"><span><strong>'+esc(typeName(t))+'</strong><small>'+(t[3]>=0?tr('Desde ','From ')+money(prices.web[t[3]]):t[5]?tr('Desde ','From ')+money(t[5]):t[4]?tr('Base por cotizar','Base to be quoted'):t[0]==='automation'?tr('Desde $200 por flujo sencillo','From $200 for a simple workflow'):tr('Sin nueva web','No new website'))+'</small></span></label>').join('')+'</div><div id="jb-pb-web-card"><label for="jb-pb-web">'+tr('Nivel del plan web','Web plan level')+'</label><select id="jb-pb-web">'+opts(d.plans.web)+'</select><div id="jb-pb-scope" class="jb-pb-scope"></div></div><p id="jb-pb-base-note"></p></fieldset>'+
'<div class="jb-pb-card"><span class="jb-pb-kicker">02 / '+tr('MÓDULOS','MODULES')+'</span><h3>'+tr('Personaliza las funcionalidades.','Customize the functionality.')+'</h3><p>'+tr('Tarifas iniciales en USD para Latinoamérica, con alcance básico. Los flujos simples se agrupan en los planes de automatización existentes.','LATAM starting rates in USD for basic scope. Simple workflows are grouped under the existing automation plans.')+'</p><div id="jb-pb-categories" role="group" aria-label="'+tr('Categorías de módulos','Module categories')+'" class="jb-pb-tabs">'+c.categories.map(cat=>'<button type="button" data-pb-category="'+cat[0]+'" aria-pressed="false">'+esc(cat[en?2:1])+' <span data-pb-count="'+cat[0]+'"></span></button>').join('')+'</div><div id="jb-pb-modules" class="jb-pb-choices"></div><p id="jb-pb-selected" role="status"></p></div>'+
'<div id="jb-pb-ai" class="jb-pb-card" hidden><span class="jb-pb-kicker">03 / AI USAGE</span><h3>'+tr('Estima el consumo mensual de IA.','Estimate monthly AI usage.')+'</h3><p>'+tr('El cálculo solo representa el consumo de tokens del modelo, no la implementación, hosting, mantenimiento ni integraciones. Introduce las tarifas reales de tu proveedor; no se consultan automáticamente.','This calculation covers model token usage only, not implementation, hosting, maintenance or integrations. Enter your provider’s actual rates; they are not fetched automatically.')+'</p><label for="jb-pb-volume">'+tr('Conversaciones al mes','Conversations per month')+'</label><select id="jb-pb-volume">'+option(100,tr('Bajo · 100','Low · 100'))+option(500,tr('Medio · 500','Medium · 500'))+option(2000,tr('Alto · 2.000','High · 2,000'))+option('custom',tr('Personalizado','Custom'))+'</select><label id="jb-pb-volume-custom-label" hidden>'+tr('Cantidad mensual','Monthly quantity')+'<input id="jb-pb-volume-custom" type="number" min="1" max="10000000" value="500"></label><div class="jb-pb-choices"><label>'+tr('Tokens de entrada por conversación','Input tokens per conversation')+'<input id="jb-pb-input-tokens" type="number" min="0" max="10000000" value="1000"></label><label>'+tr('Tokens de salida por conversación','Output tokens per conversation')+'<input id="jb-pb-output-tokens" type="number" min="0" max="10000000" value="300"></label><label>'+tr('USD por millón de tokens de entrada','USD per million input tokens')+'<input id="jb-pb-input-rate" type="number" min="0" step="any" placeholder="'+tr('Tarifa del proveedor','Provider rate')+'"></label><label>'+tr('USD por millón de tokens de salida','USD per million output tokens')+'<input id="jb-pb-output-rate" type="number" min="0" step="any" placeholder="'+tr('Tarifa del proveedor','Provider rate')+'"></label></div><p class="jb-pb-ai-result" id="jb-pb-ai-result" aria-live="polite"></p></div>'+
'<div class="jb-pb-card" id="jb-pb-care-card"><span class="jb-pb-kicker">04 / '+tr('MANTENIMIENTO','MAINTENANCE')+'</span><label for="jb-pb-care">'+tr('Después del primer mes web incluido','After the included first website month')+'</label><select id="jb-pb-care">'+option(-1,tr('Sin mantenimiento adicional','No additional maintenance'))+d.maintenance.map((r,i)=>option(i,r[0]+' · '+money(r[1])+tr('/mes','/mo'))).join('')+'</select><p>'+tr('Opcional y sin permanencia. El mantenimiento de sistemas o IA se cotiza por separado.','Optional, no commitment. System or AI maintenance is quoted separately.')+'</p></div></div>'+
'<aside class="jb-pb-summary" aria-labelledby="jb-pb-summary-title"><span class="jb-pb-kicker">JB / ESTIMATE</span><h3 id="jb-pb-summary-title">'+tr('Tu proyecto','Your project')+'</h3><div id="jb-pb-lines"></div><div class="jb-pb-total" aria-live="polite" aria-atomic="true"><span>'+tr('Subtotal estimado de implementación','Estimated implementation subtotal')+'</span><strong id="jb-pb-total"></strong><span>'+tr('Mantenimiento web opcional','Optional website maintenance')+'</span><b id="jb-pb-monthly"></b></div><p id="jb-pb-custom-note"></p><p id="jb-pb-ai-note"></p><p>'+tr('Estimado sin compromiso. No incluye servicios de terceros, impuestos aplicables ni partidas pendientes. Las funcionalidades dependen del alcance y compatibilidad. Si algún módulo ya está cubierto por otro, ajustaremos el presupuesto antes de contratar.','Non-binding estimate. Excludes third-party services, applicable taxes and unquoted items. Features depend on scope and compatibility. Overlapping modules will be adjusted before contracting.')+'</p><button type="button" class="btn lime" id="jb-pb-request">'+tr('Preparar mi solicitud →','Prepare my inquiry →')+'</button><button type="button" class="btn darkghost" id="jb-pb-copy">'+tr('Copiar presupuesto','Copy estimate')+'</button><p id="jb-pb-status" role="status"></p></aside></div>';
const web=q('#jb-pb-web'),care=q('#jb-pb-care'),preset=q('#jb-pb-preset'),type=()=>c.types.find(t=>t[0]===state.type);
const isAI=()=>state.type==='chatbot'||state.modules.some(id=>byId(id)?.[1]==='ai');
function renderModules(){
 const result=c.calculate(state,c,prices);
 q('#jb-pb-modules').innerHTML=c.modules.filter(m=>m[1]===state.category).map(m=>{
  const checked=state.modules.includes(m[0]),included=result.included.includes(m[0])||(state.web===2&&type()[3]>=0&&['dashboard','booking'].includes(m[0]))||(state.type==='chatbot'&&m[0]==='chatbot')||(state.type==='store'&&m[0]==='cart')||(type()[3]>=0&&m[0]==='domain');
  const price=included?tr('Incluido según alcance','Included subject to scope'):m[6]==='flow'?tr('Plan de automatización','Automation plan'):m[6]==='custom'?tr('Por cotizar','To be quoted'):tr('Desde ','From ')+money(m[7])+(m[6]==='addon'?' · '+tr('orientativo','indicative'):'');
  return '<label class="jb-pb-choice"><input type="checkbox" data-pb-module="'+m[0]+'" '+(checked?'checked':'')+'><span><strong>'+esc(name(m))+'</strong><small>'+esc(m[en?5:4])+'</small><span class="jb-pb-tool">'+esc(price)+'</span></span></label>';
 }).join('');
}
function aiCost(){
 const ai=q('#jb-pb-ai');ai.hidden=!isAI();
 if(ai.hidden)return null;
 const volume=q('#jb-pb-volume').value,custom=q('#jb-pb-volume-custom');q('#jb-pb-volume-custom-label').hidden=volume!=='custom';
 const fields=[volume==='custom'?custom:null,q('#jb-pb-input-tokens'),q('#jb-pb-output-tokens'),q('#jb-pb-input-rate'),q('#jb-pb-output-rate')].filter(Boolean);
 if(fields.some(el=>el.value===''||!el.checkValidity())){q('#jb-pb-ai-result').textContent=tr('Introduce valores válidos y ambas tarifas para calcular el consumo.','Enter valid values and both rates to calculate usage.');return null;}
 const n=Number(volume==='custom'?custom.value:volume),a=Number(q('#jb-pb-input-tokens').value),b=Number(q('#jb-pb-output-tokens').value),ir=Number(q('#jb-pb-input-rate').value),or=Number(q('#jb-pb-output-rate').value);
 const cost=n*(a*ir+b*or)/1000000;
 if(!Number.isFinite(cost))return null;
 const display='$'+cost.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:4})+' USD'+tr('/mes','/mo');
 q('#jb-pb-ai-result').textContent=tr('Consumo orientativo: ','Illustrative usage: ')+display;
 return display;
}
const pendingName=id=>id.startsWith('base:')?typeName(c.types.find(t=>t[0]===id.slice(5))):name(byId(id));
let last;
function refresh(redraw=false){
 const t=type(),r=c.calculate(state,c,prices),wp=d.plans.web[r.webIndex],ap=d.plans.automation[r.tier];
 root.querySelectorAll('[name=jb-pb-type]').forEach(el=>el.checked=el.value===state.type);
 q('#jb-pb-web-card').hidden=t[3]<0;q('#jb-pb-care-card').hidden=t[3]<0;web.value=String(state.web);care.value=String(state.care);
 q('#jb-pb-scope').innerHTML=wp?'<ul>'+wp[2].map(s=>'<li>'+esc(s)+'</li>').join('')+'</ul>':'';
 q('#jb-pb-base-note').textContent=t[5]?t[en?7:6]:t[4]?tr('La implementación base necesita una propuesta a medida; el subtotal no incluye esa partida.','Base implementation requires a custom proposal; the subtotal excludes it.'):t[3]<0?tr('Puedes contratar módulos sin una nueva página web.','You can purchase modules without a new website.'):'';
 for(const cat of c.categories){q('[data-pb-category="'+cat[0]+'"]').setAttribute('aria-pressed',String(state.category===cat[0]));const n=state.modules.filter(id=>byId(id)[1]===cat[0]).length;q('[data-pb-count="'+cat[0]+'"]').textContent=n?'('+n+')':'';}
 if(redraw)renderModules();
 q('#jb-pb-selected').textContent=state.modules.length+' '+tr('módulos seleccionados en todas las categorías.','modules selected across all categories.');
 const line=(a,b)=>'<p>'+esc(a)+'<b>'+esc(b)+'</b></p>';
 q('#jb-pb-lines').innerHTML=(wp?line(tr('Web','Website')+' · '+wp[0],money(r.base)):r.base?line(typeName(t),money(r.base)):'')+(ap?line(tr('Automatización','Automation')+' · '+ap[0]+' ('+r.flow.length+')',money(r.automation)):'')+r.lines.map(l=>line(name(byId(l.id)),money(l.price))).join('')+r.included.map(id=>line(name(byId(id)),tr('Incluido*','Included*'))).join('');
 q('#jb-pb-total').textContent=r.total?tr('Desde ','From ')+money(r.total):tr('Por cotizar','To be quoted');
 q('#jb-pb-monthly').textContent=money(r.recurring)+tr('/mes','/mo');
 q('#jb-pb-custom-note').textContent=r.pending.length?tr('No incluido · por cotizar: ','Excluded · to be quoted: ')+r.pending.map(pendingName).join(', '):'';
 const ai=aiCost();q('#jb-pb-ai-note').textContent=isAI()?tr('IA: consumo variable, aparte. ','AI: variable usage, separate. ')+(ai||''):'';
 const enabled=r.total>0||r.pending.length>0;
 q('#jb-pb-request').disabled=q('#jb-pb-copy').disabled=!enabled;
 last={r,wp,ap,ai};
}
function applyPreset(i){
 const p=c.presets[i];if(!p)return;
 state.type=p[2];state.web=Math.max(0,type()[3]);state.modules=p[3].slice();state.care=-1;state.category='sales';preset.value=String(i);refresh(true);
}
root.addEventListener('change',e=>{
 const el=e.target;
 if(el===preset){if(el.value!=='')applyPreset(Number(el.value));else{Object.assign(state,{type:'landing',web:0,modules:[],care:-1,category:'sales'});refresh(true);}return;}
 if(el.name==='jb-pb-type'){state.type=el.value;state.web=Math.max(0,type()[3]);state.care=-1;preset.value='';refresh(true);return;}
 if(el===web){state.web=Number(web.value);refresh(true);return;}
 if(el===care)state.care=Number(care.value);
 if(el.dataset.pbModule){const id=el.dataset.pbModule;state.modules=el.checked?[...new Set([...state.modules,id])]:state.modules.filter(x=>x!==id);preset.value='';}
 refresh();
});
root.addEventListener('input',e=>{if(e.target.closest('#jb-pb-ai'))refresh();});
q('#jb-pb-categories').addEventListener('click',e=>{const b=e.target.closest('[data-pb-category]');if(!b)return;state.category=b.dataset.pbCategory;refresh(true);});
function summary(){
 const {r,wp,ap,ai}=last;
 return ['JB / PROJECT BUILDER',tr('Proyecto: ','Project: ')+typeName(type()),wp?tr('Web: ','Website: ')+wp[0]+' · '+money(r.base):r.base?typeName(type())+' · '+money(r.base):'',ap?tr('Automatización: ','Automation: ')+ap[0]+' · '+money(r.automation)+' ('+r.flow.map(id=>name(byId(id))).join(', ')+')':'',...r.lines.map(l=>name(byId(l.id))+' · '+money(l.price)),r.included.length?tr('Incluido según alcance: ','Included subject to scope: ')+r.included.map(id=>name(byId(id))).join(', '):'',r.pending.length?tr('Pendiente de cotizar: ','To be quoted: ')+r.pending.map(pendingName).join(', '):'',tr('Subtotal de implementación: ','Implementation subtotal: ')+(r.total?money(r.total):tr('Por cotizar','To be quoted')),tr('Mantenimiento web: ','Website maintenance: ')+money(r.recurring)+tr('/mes','/mo'),isAI()?tr('Consumo IA aparte: ','Separate AI usage: ')+(ai||tr('Variable','Variable')):'',tr('Estimado orientativo, no contractual.','Indicative, non-binding estimate.')].filter(Boolean).join('\n');
}
q('#jb-pb-request').addEventListener('click',()=>{
 const service=document.getElementById('select'),plan=document.getElementById('planSelect'),estimate=document.getElementById('jb-quote-summary'),area=document.getElementById('jb-quote-area'),notes=document.querySelector('#form [name=notes]');
 if(!service||!plan||!estimate||!area||!notes)return;
 const {r,wp,ap}=last;service.value=wp||['landing','catalog','store','system'].includes(state.type)?'web':state.modules.length===1&&state.modules[0]==='seo'?'audit':state.modules.length===1&&state.modules[0]==='research'?'lead':'automation';
 service.dispatchEvent(new Event('change',{bubbles:true}));plan.value=wp?String(r.webIndex):service.value==='automation'&&ap?String(r.tier):['audit','lead'].includes(service.value)?'0':'';
 estimate.value=summary();area.hidden=false;
 q('#jb-pb-status').textContent=tr('Presupuesto añadido al formulario; revisa y envía cuando quieras.','Estimate attached to the form; review and send when ready.');
 document.getElementById('contacto').scrollIntoView();notes.focus({preventScroll:true});
});
q('#jb-pb-copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(summary());q('#jb-pb-status').textContent=tr('Presupuesto copiado.','Estimate copied.');}catch(e){q('#jb-pb-status').textContent=tr('No se pudo copiar. Puedes adjuntarlo a la solicitud.','Copy unavailable. You can attach it to the inquiry.');}});
const form=document.getElementById('form'),estimate=document.getElementById('jb-quote-summary'),area=document.getElementById('jb-quote-area');
if(form&&estimate&&area){const clear=()=>{estimate.value='';area.hidden=true;};form.addEventListener('reset',clear);document.getElementById('jb-quote-clear')?.addEventListener('click',clear);form.addEventListener('change',e=>{if(['select','planSelect'].includes(e.target.id))clear();});}
function decorateProjects(){
 for(const card of document.querySelectorAll('#projects .project')){
 const anchor=card.querySelector('a[href]'),info=card.querySelector('.project-info');if(!anchor||!info||info.querySelector('.jb-pb-demo'))continue;
 const idx=['laborathorno-demo','demo-barberia','demo-cafe','demo-tienda','demo-asesoria','demo-gimnasio'].findIndex(p=>new URL(anchor.href,location.href).pathname.split('/').includes(p));
 if(idx<0)continue;const b=document.createElement('button');b.type='button';b.className='jb-pb-demo';b.textContent=tr('Configurar algo similar →','Build something similar →');b.addEventListener('click',()=>{applyPreset(idx);document.getElementById('configurar').scrollIntoView();preset.focus({preventScroll:true});});info.append(b);
 }
}
refresh(true);decorateProjects();
if('MutationObserver' in window){const el=document.getElementById('projects');if(el)new MutationObserver(decorateProjects).observe(el,{childList:true});}
})();
