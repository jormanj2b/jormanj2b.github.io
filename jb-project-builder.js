
/* JB / PROJECT BUILDER — uses the published bilingual plan catalogue. */
(function(){
'use strict';
const root=document.getElementById('projectBuilder');
if(!root||typeof data==='undefined')return;
const en=document.documentElement.lang==='en',tr=(es,eng)=>en?eng:es,d=data[en?'en':'es'];
const q=s=>root.querySelector(s), money=n=>'$'+Number(n).toLocaleString('en-US')+' USD';
function estimate(webPrice,count,automationPrices,maintenancePrice){
  const tier=count===0?-1:count===1?0:count<=3?1:2;
  const automation=tier<0?0:automationPrices[tier];
  return {tier,automation,total:webPrice+automation,monthly:maintenancePrice};
}
const flows=[
 ['Formularios → Google Sheets','Forms → Google Sheets','Registra consultas o pedidos en una hoja.','Record inquiries or orders in a sheet.','Sheets'],
 ['Confirmaciones por correo','Email confirmations','Envía un aviso al recibir una solicitud.','Send a notice when a request arrives.','Email'],
 ['Recordatorios de citas','Appointment reminders','Programa avisos antes de una cita.','Schedule notices before an appointment.','Email / Calendar'],
 ['Sincronización de calendario','Calendar sync','Registra eventos en un calendario compatible.','Record events in a compatible calendar.','Google Calendar'],
 ['Avisos internos y reportes','Internal alerts and reports','Notifica al equipo o genera un resumen.','Notify staff or generate a summary.','Sheets / Email']
];
const custom=[
 ['WhatsApp API','WhatsApp API','Mensajes automáticos con cuenta y permisos compatibles.','Automated messages with a compatible account and permissions.'],
 ['Pagos online','Online payments','Pasarela según el país, la cuenta y las condiciones del proveedor.','Gateway subject to country, account and provider requirements.'],
 ['Asistente con IA','AI assistant','Asistencia con límites, datos y revisión definidos.','Assistance with agreed limits, data and review.'],
 ['Inventario o CRM avanzado','Advanced inventory or CRM','Conexión a sistemas existentes o lógica personalizada.','Connection to existing systems or custom logic.']
];
const presets=[
 ['Panadería','Bakery',0,[0,1],[]],
 ['Barbería','Barbershop',2,[1,2,3],[]],
 ['Cafetería','Coffee shop',2,[0,4],[]],
 ['Tienda','Shop',1,[0,1],[1,3]],
 ['Servicios profesionales','Professional services',1,[0,1,3],[]],
 ['Gimnasio','Gym',1,[1,2,4],[]]
];
const E=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const options=(rows)=>rows.map((r,i)=>'<option value="'+i+'">'+E(r[0])+' — '+money(r[1])+'</option>').join('');
const choice=(r,i,type)=>'<label class="jb-pb-choice"><input type="checkbox" data-'+type+'="'+i+'"><span><strong>'+E(r[en?1:0])+'</strong><small>'+E(r[en?3:2])+'</small>'+(r[4]?'<span class="jb-pb-tool">'+E(r[4])+'</span>':'')+'</span></label>';
root.innerHTML='<div class="jb-pb-layout"><div class="jb-pb-main">'+
 '<div class="jb-pb-card"><span class="jb-pb-kicker">01 / '+tr('PUNTO DE PARTIDA','STARTING POINT')+'</span><label for="jb-pb-preset">'+tr('¿Qué tipo de negocio tienes?','What kind of business do you run?')+'</label><select id="jb-pb-preset"><option value="">'+tr('Personalizar desde cero','Start from scratch')+'</option>'+presets.map((p,i)=>'<option value="'+i+'">'+E(p[en?1:0])+'</option>').join('')+'</select>'+
 '<label for="jb-pb-web">'+tr('Plan de desarrollo web','Web development plan')+'</label><select id="jb-pb-web"><option value="-1">'+tr('Ya tengo web / solo automatización','I already have a website / automation only')+'</option>'+options(d.plans.web)+'</select><div id="jb-pb-scope" class="jb-pb-scope"></div></div>'+
 '<fieldset class="jb-pb-card"><legend><span class="jb-pb-kicker">02 / '+tr('AUTOMATIZACIONES','AUTOMATION')+'</span></legend><h3>'+tr('¿Qué tareas quieres simplificar?','Which tasks would you like to simplify?')+'</h3><p>'+tr('Selecciona flujos sencillos. Se recomienda automáticamente el plan que cubre hasta 1, 3 o 5 flujos.','Select simple workflows. The builder recommends the plan covering up to 1, 3 or 5 workflows.')+'</p><div class="jb-pb-choices">'+flows.map((r,i)=>choice(r,i,'flow')).join('')+'</div></fieldset>'+
 '<fieldset class="jb-pb-card"><legend><span class="jb-pb-kicker">03 / '+tr('INTEGRACIONES A MEDIDA','CUSTOM INTEGRATIONS')+'</span></legend><h3>'+tr('Conecta las herramientas de tu negocio.','Connect your business tools.')+'</h3><p>'+tr('Estas opciones requieren revisión técnica y no se suman al estimado todavía.','These options require technical review and are not included in the estimate yet.')+'</p><div class="jb-pb-choices">'+custom.map((r,i)=>choice(r,i,'custom')).join('')+'</div></fieldset>'+
 '<div class="jb-pb-card" id="jb-pb-care-card"><span class="jb-pb-kicker">04 / '+tr('MANTENIMIENTO WEB','WEBSITE MAINTENANCE')+'</span><label for="jb-pb-care">'+tr('Después del primer mes incluido','After the included first month')+'</label><select id="jb-pb-care"><option value="-1">'+tr('Sin plan mensual por ahora','No monthly plan for now')+'</option>'+d.maintenance.map((r,i)=>'<option value="'+i+'">'+E(r[0])+' — '+money(r[1])+tr('/mes','/mo')+'</option>').join('')+'</select><p>'+tr('Opcional y sin permanencia obligatoria.','Optional, with no mandatory commitment.')+'</p></div></div>'+
 '<aside class="jb-pb-summary" aria-labelledby="jb-pb-summary-title"><span class="jb-pb-kicker">JB / ESTIMATE</span><h3 id="jb-pb-summary-title">'+tr('Tu proyecto','Your project')+'</h3><div id="jb-pb-lines"></div><div class="jb-pb-total" aria-live="polite" aria-atomic="true"><span>'+tr('Estimado de desarrollo','Development estimate')+'</span><strong id="jb-pb-total"></strong><span>'+tr('Mantenimiento web opcional','Optional website maintenance')+'</span><b id="jb-pb-monthly"></b></div><p id="jb-pb-custom-note"></p><p>'+tr('Estimado sin compromiso. No incluye licencias, comisiones de pago ni costes de terceros. Si un módulo ya está incluido, se ajustará el alcance antes de confirmar el precio.','Non-binding estimate. Excludes licenses, payment fees and third-party costs. If a module is already included, scope will be adjusted before pricing is confirmed.')+'</p><button type="button" class="btn lime" id="jb-pb-request">'+tr('Preparar mi solicitud →','Prepare my inquiry →')+'</button><p id="jb-pb-status" role="status"></p></aside></div>';
const web=q('#jb-pb-web'),care=q('#jb-pb-care'),preset=q('#jb-pb-preset');
web.value='0';
const checked=type=>Array.from(root.querySelectorAll('[data-'+type+']:checked')).map(e=>Number(e.dataset[type]));
const label=(r)=>r[en?1:0];
let current,previousBlock='';
function refresh(){
 const w=Number(web.value),f=checked('flow'),x=checked('custom');
 q('#jb-pb-care-card').hidden=w<0;if(w<0)care.value='-1';
 const m=Number(care.value),wp=d.plans.web[w],mp=d.maintenance[m];
 const e=estimate(wp?wp[1]:0,f.length,d.plans.automation.map(p=>p[1]),mp?mp[1]:0);
 const ap=d.plans.automation[e.tier];
 current={w,f,x,m,wp,mp,e,ap};
 q('#jb-pb-scope').innerHTML=wp?'<ul>'+wp[2].map(s=>'<li>'+E(s)+'</li>').join('')+'</ul>':'<p>'+tr('El trabajo sobre un sitio existente requiere comprobar su compatibilidad.','Work on an existing website requires a compatibility review.')+'</p>';
 q('#jb-pb-lines').innerHTML=(wp?'<p>'+E(tr('Web','Website')+' · '+wp[0])+'<b>'+money(wp[1])+'</b></p>':'')+(ap?'<p>'+E(tr('Automatización','Automation')+' · '+ap[0])+'<b>'+money(ap[1])+'</b></p>':'');
 q('#jb-pb-total').textContent=e.total?tr('Desde ','From ')+money(e.total):tr('Por cotizar','To be quoted');
 q('#jb-pb-monthly').textContent=money(e.monthly)+tr('/mes','/mo');
 q('#jb-pb-custom-note').textContent=x.length?tr('Pendiente de cotizar: ','To be quoted: ')+x.map(i=>label(custom[i])).join(', '):'';
 q('#jb-pb-request').disabled=!wp&&!ap&&!x.length;
}
function applyPreset(i){
 const p=presets[i];if(!p)return;
 preset.value=String(i);web.value=String(p[2]);care.value='-1';
 for(const el of root.querySelectorAll('[data-flow]'))el.checked=p[3].includes(Number(el.dataset.flow));
 for(const el of root.querySelectorAll('[data-custom]'))el.checked=p[4].includes(Number(el.dataset.custom));
 refresh();
}
root.addEventListener('change',e=>{
 if(e.target===preset&&preset.value!==''){applyPreset(Number(preset.value));return;}
 if(e.target===preset&&preset.value===''){web.value='0';care.value='-1';root.querySelectorAll('input[type=checkbox]').forEach(el=>el.checked=false);}
 refresh();q('#jb-pb-status').textContent='';
});
q('#jb-pb-request').addEventListener('click',()=>{
 const {w,f,x,wp,mp,e,ap}=current;
 const notes=document.querySelector('#form [name=notes]'),service=document.getElementById('select'),plan=document.getElementById('planSelect');
 if(!notes||!service||!plan)return;
 const parts=['JB / PROJECT BUILDER',wp?tr('Web: ','Website: ')+wp[0]:'',ap?tr('Automatización: ','Automation: ')+ap[0]+' ('+f.map(i=>label(flows[i])).join(', ')+')':'',x.length?tr('Por cotizar: ','To be quoted: ')+x.map(i=>label(custom[i])).join(', '):'',tr('Estimado: ','Estimate: ')+(e.total?money(e.total):tr('por cotizar','to be quoted')),mp?tr('Mantenimiento después del mes incluido: ','Maintenance after included month: ')+mp[0]+' '+money(e.monthly)+tr('/mes','/mo'):''].filter(Boolean);
 const block=parts.join('\n');
 let prior=notes.value;
 if(previousBlock&&prior.includes(previousBlock))prior=prior.replace(previousBlock,'').trim();
 const combined=[prior,block].filter(Boolean).join('\n\n');
 if(notes.maxLength>0&&combined.length>notes.maxLength){q('#jb-pb-status').textContent=tr('Tu descripción y el presupuesto superan el límite del formulario. Acorta la descripción antes de añadirlo.','Your description and estimate exceed the form limit. Shorten your description before adding it.');return;}
 service.value=wp?'web':'automation';service.dispatchEvent(new Event('change',{bubbles:true}));plan.value=wp?String(w):ap?String(e.tier):'';
 notes.value=combined;previousBlock=block;
 document.getElementById('contacto').scrollIntoView();
 notes.focus({preventScroll:true});
 q('#jb-pb-status').textContent=tr('Presupuesto añadido. Revisa los datos antes de enviar.','Estimate added. Review your details before sending.');
});
function decorateProjects(){
 const cards=document.querySelectorAll('#projects .project');
 for(const card of cards){
   const anchor=card.querySelector('a[href]'),info=card.querySelector('.project-info');
   if(!anchor||!info||info.querySelector('.jb-pb-demo'))continue;
   const idx=['laborathorno-demo','demo-barberia','demo-cafe','demo-tienda','demo-asesoria','demo-gimnasio'].findIndex(p=>new URL(anchor.href,location.href).pathname.split('/').includes(p));
   if(idx<0)continue;
   const b=document.createElement('button');b.type='button';b.className='jb-pb-demo';b.textContent=tr('Configurar algo similar →','Build something similar →');
   b.addEventListener('click',()=>{applyPreset(idx);document.getElementById('configurar').scrollIntoView();preset.focus({preventScroll:true});});info.append(b);
 }
}
refresh();decorateProjects();
if('MutationObserver' in window){const container=document.getElementById('projects');if(container)new MutationObserver(decorateProjects).observe(container,{childList:true});}
})();
