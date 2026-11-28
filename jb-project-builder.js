/* JB Studio / editorial proposal builder */
(function builder(){
'use strict';
const root=document.getElementById('projectBuilder'),c=window.JBProjectCatalog;
if(!root||!c||typeof data==='undefined')return;
const en=document.documentElement.lang==='en',tr=(a,b)=>en?b:a,d=data[en?'en':'es'],q=s=>root.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,v=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[v]));
const money=n=>'$'+Number(n).toLocaleString('en-US')+' USD',name=m=>m[en?3:2],typeName=t=>t[en?2:1],byId=id=>c.modules.find(m=>m[0]===id);
const prices={web:d.plans.web.map(x=>x[1]),automation:d.plans.automation.map(x=>x[1]),maintenance:d.maintenance.map(x=>x[1])};
const state={type:'corporate',web:0,auto:0,sector:-1,modules:[],care:-1};
const type=()=>c.types.find(t=>t[0]===state.type),profile=()=>c.selectedProfile(state);
const option=(val,label)=>'<option value="'+val+'">'+esc(label)+'</option>';
const planOptions=rows=>rows.map((r,i)=>option(i,r[0]+' · '+money(r[1]))).join('');
const list=rows=>'<ul>'+rows.map(s=>'<li>'+esc(s)+'</li>').join('')+'</ul>';
root.innerHTML='<div class="jb-proposal-workspace">'+
 '<div class="jb-proposal-brief"><div class="jb-proposal-controls"><p class="jb-pb-kicker">JB / PROJECT BRIEF</p><h3>'+tr('Tu negocio, tu solución.','Your business, your solution.')+'</h3><p>'+tr('Partimos de lo que realmente necesitas y dejamos los extras para después.','Start with what you actually need; add extras only if useful.')+'</p>'+
 '<label for="jb-pb-preset">'+tr('¿A qué se dedica tu negocio?','What does your business do?')+'</label><select id="jb-pb-preset">'+option(-1,tr('Otro / proyecto personalizado','Other / custom project'))+c.presets.map((p,i)=>option(i,p[en?1:0])).join('')+'</select>'+
 '<label for="jb-pb-type">'+tr('¿Qué quieres construir?','What would you like to build?')+'</label><select id="jb-pb-type"></select>'+
 '<div id="jb-pb-web-card"><label for="jb-pb-web">'+tr('Tu plan web','Your web plan')+'</label><select id="jb-pb-web">'+planOptions(d.plans.web)+'</select></div>'+
 '<div id="jb-pb-auto-card" hidden><label for="jb-pb-auto">'+tr('Tu plan de automatización','Your automation plan')+'</label><select id="jb-pb-auto">'+planOptions(d.plans.automation)+'</select></div>'+
 '<p id="jb-pb-context" class="jb-proposal-context"></p></div>'+
 '<div class="jb-proposal-scope"><p class="jb-pb-kicker">'+tr('LO ESENCIAL, INCLUIDO','THE ESSENTIALS, INCLUDED')+'</p><h3 id="jb-pb-scope-title"></h3><div id="jb-pb-scope"></div><div id="jb-pb-included"></div><p class="jb-proposal-scope-note">'+tr('Incluido en el alcance indicado, no supone servicios de terceros ni funcionalidades ilimitadas.','Included within the stated scope; third-party services and unlimited functionality are not included.')+'</p></div></div>'+
 '<div class="jb-proposal-options"><div class="jb-proposal-options-head"><div><p class="jb-pb-kicker">JB / EXTENSIONS</p><h3>'+tr('¿Quieres ir un paso más allá?','Want to go a step further?')+'</h3><p>'+tr('Solo mostramos extras compatibles que aún no están incluidos. Abre el grupo que te interesa.','Only compatible extras not already included are shown. Open the group that interests you.')+'</p></div><span id="jb-pb-selected" role="status"></span></div><div id="jb-pb-modules"></div><p id="jb-pb-filter-note" role="status"></p></div>'+
 '<div id="jb-pb-ai" class="jb-proposal-ai" hidden><div><p class="jb-pb-kicker">JB / AI OPERATIONS</p><h3>'+tr('¿Cuántas conversaciones esperas?','How many conversations do you expect?')+'</h3><p>'+tr('La implementación es un pago único. El uso de IA se paga según consumo; alojamiento, mantenimiento y otros servicios se cotizan aparte.','Implementation is a one-time payment. AI usage is billed by consumption; hosting, maintenance and other services are quoted separately.')+'</p><label for="jb-pb-volume">'+tr('Conversaciones mensuales aproximadas','Approximate monthly conversations')+'</label><input type="number" id="jb-pb-volume" min="1" max="10000000" step="1" value="500"><input type="range" id="jb-pb-volume-slider" min="100" max="5000" step="100" value="500" aria-label="'+tr('Volumen mensual aproximado','Approximate monthly volume')+'"><p class="jb-proposal-context">'+tr('Ejemplo de cálculo, no tarifa de un proveedor ni límite garantizado.','Illustrative calculation, not a provider rate or guaranteed limit.')+'</p></div><div class="jb-proposal-ai-estimate"><p class="jb-pb-kicker">'+tr('CONSUMO ILUSTRATIVO','ILLUSTRATIVE USAGE')+'</p><strong id="jb-pb-ai-result" aria-live="polite"></strong><p>'+tr('Supuestos editables: 1.000 tokens de entrada y 300 de salida por conversación; tarifas de ejemplo de $0,50 y $2 por millón de tokens.','Editable assumptions: 1,000 input and 300 output tokens per conversation; example rates of $0.50 and $2 per million tokens.')+'</p><details><summary>'+tr('Ajustar supuestos técnicos','Adjust technical assumptions')+'</summary><div class="jb-proposal-ai-fields"><label>'+tr('Tokens de entrada','Input tokens')+'<input id="jb-pb-input-tokens" type="number" min="0" max="10000000" value="1000"></label><label>'+tr('Tokens de salida','Output tokens')+'<input id="jb-pb-output-tokens" type="number" min="0" max="10000000" value="300"></label><label>'+tr('USD / millón entrada','USD / million input')+'<input id="jb-pb-input-rate" type="number" min="0" step="any" value="0.50"></label><label>'+tr('USD / millón salida','USD / million output')+'<input id="jb-pb-output-rate" type="number" min="0" step="any" value="2"></label></div></details></div></div>'+
 '<div id="jb-pb-care-card" class="jb-proposal-care"><div><p class="jb-pb-kicker">'+tr('DESPUÉS DE LA ENTREGA','AFTER DELIVERY')+'</p><h3>'+tr('Acompañamiento opcional.','Optional ongoing support.')+'</h3><p>'+tr('Primer mes de mantenimiento incluido en los planes web completos; después puedes continuar sin permanencia.','First month included in full website plans; continue afterwards without a commitment.')+'</p></div><label for="jb-pb-care">'+tr('Mantenimiento web','Website maintenance')+'<select id="jb-pb-care">'+option(-1,tr('Sin plan adicional','No additional plan'))+d.maintenance.map((r,i)=>option(i,r[0]+' · '+money(r[1])+tr('/mes','/mo'))).join('')+'</select></label></div>'+
 '<div class="jb-proposal-total"><div class="jb-proposal-breakdown"><p class="jb-pb-kicker">JB / YOUR PROPOSAL</p><h3>'+tr('Lo que hemos acordado configurar.','What you have chosen to configure.')+'</h3><div id="jb-pb-lines"></div><p id="jb-pb-custom-note"></p><p id="jb-pb-ai-note"></p></div><div class="jb-proposal-investment"><span>'+tr('Estimado inicial de implementación','Starting implementation estimate')+'</span><strong id="jb-pb-total" aria-live="polite"></strong><p id="jb-pb-monthly"></p><p>'+tr('Sin compromiso. Alcance final por escrito; impuestos, licencias y costes externos aparte.','No obligation. Final scope agreed in writing; taxes, licenses and external costs separate.')+'</p><button type="button" class="btn" id="jb-pb-request">'+tr('Solicitar mi propuesta →','Request my proposal →')+'</button><button type="button" class="btn ghost" id="jb-pb-copy">'+tr('Copiar resumen','Copy summary')+'</button><p id="jb-pb-status" role="status"></p></div></div></div>';
const typeSelect=q('#jb-pb-type'),web=q('#jb-pb-web'),auto=q('#jb-pb-auto'),care=q('#jb-pb-care'),preset=q('#jb-pb-preset');
const isAI=()=>state.type==='chatbot'||state.modules.some(id=>byId(id)?.[1]==='ai');
const typesForSector=()=>state.sector<0?c.types:c.types.filter(t=>c.profiles[state.sector].types.includes(t[0]));
function applicable(){const included=new Set(c.includedModules(state,c));return c.availableModules(state.type,c).filter(m=>!included.has(m[0]));}
function normalize(){const allowed=new Set(applicable().map(m=>m[0])),n=state.modules.length;state.modules=state.modules.filter(id=>allowed.has(id));return n-state.modules.length;}
function modulePrice(m){return m[6]==='flow'?tr('Según plan de flujos','Workflow plan'):m[6]==='custom'?tr('Por cotizar','To be quoted'):tr('Desde ','From ')+money(m[7]);}
function renderExtras(){
 const open=new Set(Array.from(root.querySelectorAll('#jb-pb-modules details[open]')).map(el=>el.dataset.category));
 const rows=applicable(),cats=c.availableCategories(state.type,c).filter(cat=>rows.some(m=>m[1]===cat[0]));
 q('#jb-pb-modules').innerHTML=cats.map(cat=>{
 const items=rows.filter(m=>m[1]===cat[0]),n=items.filter(m=>state.modules.includes(m[0])).length;
 return '<details class="jb-extension-group" data-category="'+cat[0]+'" '+(open.has(cat[0])?'open':'')+'><summary><span>'+esc(cat[en?2:1])+'</span><small>'+n+'/'+items.length+' '+tr('seleccionados','selected')+'</small></summary><div>'+items.map(m=>{const active=state.modules.includes(m[0]);return '<div class="jb-extension-row"><div><strong>'+esc(name(m))+'</strong><p>'+esc(m[en?5:4])+'</p></div><span class="jb-extension-price">'+esc(modulePrice(m))+'</span><button type="button" class="jb-extension-add" data-pb-module="'+m[0]+'" aria-pressed="'+active+'" aria-label="'+esc((active?tr('Quitar ','Remove '):tr('Añadir ','Add '))+name(m))+'">'+(active?tr('✓ Añadido','✓ Added'):tr('+ Añadir','+ Add'))+'</button></div>';}).join('')+'</div></details>';
 }).join('')||'<p>'+tr('El alcance básico ya cubre esta solución.','The basic scope already covers this solution.')+'</p>';
}
function aiCost(){
 const ai=q('#jb-pb-ai');ai.hidden=!isAI();if(ai.hidden)return null;
 const fields=['volume','input-tokens','output-tokens','input-rate','output-rate'].map(id=>q('#jb-pb-'+id));
 if(fields.some(el=>el.value===''||!el.checkValidity())){q('#jb-pb-ai-result').textContent=tr('Por calcular','To calculate');return null;}
 const [n,a,b,ir,or]=fields.map(el=>Number(el.value)),cost=n*(a*ir+b*or)/1000000;
 if(!Number.isFinite(cost))return null;
 const result='$'+cost.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:4})+' USD'+tr('/mes','/mo');
 q('#jb-pb-ai-result').textContent=result;return result;
}
let last;
function refresh(redraw=false){
 normalize();const t=type(),p=profile(),r=c.calculate(state,c,prices),wp=d.plans.web[r.webIndex],ap=d.plans.automation[r.tier];
 preset.value=String(state.sector);typeSelect.innerHTML=typesForSector().map(t=>option(t[0],typeName(t))).join('');typeSelect.value=state.type;
 web.value=String(state.web);auto.value=String(state.type==='automation'?r.tier:state.auto);care.value=String(state.care);
 q('#jb-pb-web-card').hidden=t[3]<0;q('#jb-pb-auto-card').hidden=t[0]!=='automation';q('#jb-pb-care-card').hidden=t[3]<0;
 q('#jb-pb-context').textContent=c.hints[state.type][en?1:0];
 q('#jb-pb-scope-title').textContent=p?c.presets[state.sector][en?1:0]+' · '+(wp?wp[0]:typeName(t)):wp?wp[0]:t[0]==='automation'?ap[0]:typeName(t);
 const scope=wp?wp[2]:t[0]==='automation'?ap[2]:t[5]?[t[en?7:6]]:[tr('Revisión de compatibilidad del sitio existente.','Existing website compatibility review.')];
 q('#jb-pb-scope').innerHTML=list([...scope,...(p?p[en?'en':'es']:[])]);
 q('#jb-pb-included').innerHTML=r.included.length?'<div class="jb-included-chips">'+r.included.map(id=>'<span>✓ '+esc(name(byId(id)))+'</span>').join('')+'</div>':'';
 if(redraw)renderExtras();
 q('#jb-pb-selected').textContent=state.modules.length+' '+tr('extras elegidos','extras selected');
 const line=(a,b)=>'<div class="jb-breakdown-line"><span>'+esc(a)+'</span><b>'+esc(b)+'</b></div>';
 q('#jb-pb-lines').innerHTML=(wp?line(typeName(t)+' · '+wp[0],money(r.base)):r.base?line(typeName(t),money(r.base)):'')+(ap?line(tr('Automatización','Automation')+' · '+ap[0],money(r.automation)):'')+r.lines.map(l=>line(name(byId(l.id)),money(l.price))).join('')+(r.included.length?line(tr('Funcionalidades incluidas','Included features'),tr('Sin coste adicional','No extra cost')):'');
 q('#jb-pb-total').textContent=r.total?tr('Desde ','From ')+money(r.total):tr('Por cotizar','To be quoted');
 q('#jb-pb-monthly').textContent=t[3]>=0&&r.recurring?tr('Después del mes incluido: ','After the included month: ')+money(r.recurring)+tr('/mes','/mo'):'';
 q('#jb-pb-custom-note').textContent=r.pending.length?tr('Pendiente de cotizar: ','To be quoted: ')+r.pending.map(id=>id.startsWith('base:')?typeName(t):name(byId(id))).join(', '):'';
 const ai=aiCost();q('#jb-pb-ai-note').textContent=isAI()?tr('IA: consumo separado y variable. ','AI: separate, variable usage. ')+(ai?tr('Ejemplo: ','Example: ')+ai:''):'';
 q('#jb-pb-request').disabled=q('#jb-pb-copy').disabled=!(r.total>0||r.pending.length>0);
 last={r,wp,ap,ai};
}
function clearOpen(){q('#jb-pb-modules').querySelectorAll('details').forEach(el=>el.open=false);}
function setType(id){state.type=id;state.web=Math.max(0,type()[3]);state.auto=0;state.care=-1;clearOpen();const removed=normalize();q('#jb-pb-filter-note').textContent=removed?tr('Ajustamos los extras al nuevo alcance.','Extras adjusted to the new scope.'):'';refresh(true);}
function applyPreset(i){const p=c.presets[i];if(!p)return;state.sector=i;state.modules=[];state.type=c.profiles[i].preferred;state.web=0;state.auto=0;state.care=-1;clearOpen();q('#jb-pb-filter-note').textContent='';refresh(true);}
root.addEventListener('change',e=>{
 const el=e.target;
 if(el===preset){const i=Number(el.value);if(i>=0)applyPreset(i);else{state.sector=-1;state.modules=[];setType('corporate');}return;}
 if(el===typeSelect){if(typesForSector().some(t=>t[0]===el.value))setType(el.value);return;}
 if(el===web){state.web=Number(web.value);const n=normalize();q('#jb-pb-filter-note').textContent=n?tr('El nuevo plan ya incluye '+n+' de tus extras; retiramos ese coste.','The new plan includes '+n+' of your extras; we removed those charges.'):'';refresh(true);return;}
 if(el===auto){state.auto=Number(auto.value);refresh(true);return;}
 if(el===care){state.care=Number(care.value);refresh();return;}
});
root.addEventListener('click',e=>{const b=e.target.closest('[data-pb-module]');if(!b)return;const id=b.dataset.pbModule;if(!applicable().some(m=>m[0]===id))return;state.modules=state.modules.includes(id)?state.modules.filter(x=>x!==id):[...state.modules,id];q('#jb-pb-filter-note').textContent='';refresh(true);q('[data-pb-module="'+id+'"]')?.focus({preventScroll:true});});
root.addEventListener('input',e=>{if(!e.target.closest('#jb-pb-ai'))return;if(e.target.id==='jb-pb-volume-slider')q('#jb-pb-volume').value=e.target.value;if(e.target.id==='jb-pb-volume')q('#jb-pb-volume-slider').value=e.target.value;aiCost();const cost=aiCost();if(last)last.ai=cost;q('#jb-pb-ai-note').textContent=tr('IA: consumo separado y variable. ','AI: separate, variable usage. ')+(cost?tr('Ejemplo: ','Example: ')+cost:'');});
function summary(){
 const {r,wp,ap,ai}=last,p=profile();
 return ['JB / PROJECT PROPOSAL',tr('Proyecto: ','Project: ')+typeName(type()),p?tr('Sector: ','Industry: ')+c.presets[state.sector][en?1:0]:'',wp?tr('Plan web: ','Web plan: ')+wp[0]+' · '+money(r.base):r.base?typeName(type())+' · '+money(r.base):'',p?tr('Alcance sectorial: ','Industry scope: ')+p[en?'en':'es'].join('; '):'',ap?tr('Automatización: ','Automation: ')+ap[0]+' · '+money(r.automation)+(r.flow.length?' ('+r.flow.map(id=>name(byId(id))).join(', ')+')':''):'',...r.lines.map(l=>name(byId(l.id))+' · '+money(l.price)),r.included.length?tr('Incluido: ','Included: ')+r.included.map(id=>name(byId(id))).join(', '):'',r.pending.length?tr('Por cotizar: ','To be quoted: ')+r.pending.map(id=>id.startsWith('base:')?typeName(type()):name(byId(id))).join(', '):'',tr('Implementación estimada: ','Estimated implementation: ')+(r.total?money(r.total):tr('Por cotizar','To be quoted')),r.recurring?tr('Mantenimiento: ','Maintenance: ')+money(r.recurring)+tr('/mes','/mo'):'',isAI()?tr('IA: consumo separado, ilustrativo: ','AI: separate illustrative usage: ')+(ai||tr('Variable','Variable')):'',tr('Propuesta no contractual; alcance confirmado por escrito.','Non-binding proposal; scope confirmed in writing.')].filter(Boolean).join('\n');
}
q('#jb-pb-request').addEventListener('click',()=>{
 const service=document.getElementById('select'),plan=document.getElementById('planSelect'),estimate=document.getElementById('jb-quote-summary'),area=document.getElementById('jb-quote-area'),notes=document.querySelector('#form [name=notes]');
 if(!service||!plan||!estimate||!area||!notes)return;
 const {r,wp,ap}=last;service.value=wp||['landing','catalog','store','system'].includes(state.type)?'web':state.modules.length===1&&state.modules[0]==='seo'?'audit':state.modules.length===1&&state.modules[0]==='research'?'lead':'automation';
 service.dispatchEvent(new Event('change',{bubbles:true}));plan.value=wp?String(r.webIndex):service.value==='automation'&&ap?String(r.tier):['audit','lead'].includes(service.value)?'0':'';
 estimate.value=summary();area.hidden=false;q('#jb-pb-status').textContent=tr('Propuesta adjunta. Revisa antes de enviar.','Proposal attached. Review before sending.');document.getElementById('contacto').scrollIntoView();notes.focus({preventScroll:true});
});
q('#jb-pb-copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(summary());q('#jb-pb-status').textContent=tr('Resumen copiado.','Summary copied.');}catch(e){q('#jb-pb-status').textContent=tr('No se pudo copiar. Puedes adjuntarlo a la solicitud.','Copy unavailable. Attach it to your inquiry instead.');}});
const form=document.getElementById('form'),estimate=document.getElementById('jb-quote-summary'),area=document.getElementById('jb-quote-area');
if(form&&estimate&&area){const clear=()=>{estimate.value='';area.hidden=true;};form.addEventListener('reset',clear);document.getElementById('jb-quote-clear')?.addEventListener('click',clear);form.addEventListener('change',e=>{if(['select','planSelect'].includes(e.target.id))clear();});}
function openBrief(){document.getElementById('configurar').scrollIntoView();preset.focus({preventScroll:true});}
window.JBOpenPlan=function(service,index){if(!['web','automation'].includes(service)||!Number.isInteger(index)||index<0||index>2)return false;
 if(service==='automation'){state.sector=-1;state.type='automation';state.auto=index;state.care=-1;}else{if(state.sector>=0&&!c.profiles[state.sector].types.includes('corporate'))state.sector=-1;state.type='corporate';state.web=index;state.care=-1;}
 normalize();clearOpen();q('#jb-pb-filter-note').textContent='';refresh(true);openBrief();return true;
};
function decorateProjects(){for(const card of document.querySelectorAll('#projects .project')){const anchor=card.querySelector('a[href]'),info=card.querySelector('.project-info');if(!anchor||!info||info.querySelector('.jb-pb-demo'))continue;const idx=['laborathorno-demo','demo-barberia','demo-cafe','demo-tienda','demo-asesoria','demo-gimnasio'].findIndex(p=>new URL(anchor.href,location.href).pathname.split('/').includes(p));if(idx<0)continue;const b=document.createElement('button');b.type='button';b.className='jb-pb-demo';b.textContent=tr('Personalizar esta solución →','Customize this solution →');b.addEventListener('click',()=>{applyPreset(idx);openBrief();});info.append(b);}}
refresh(true);decorateProjects();if('MutationObserver' in window){const el=document.getElementById('projects');if(el)new MutationObserver(decorateProjects).observe(el,{childList:true});}
})();
