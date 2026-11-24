/* Portafolio · Jorman Bravo — animaciones de entrada y agenda de consultas.
   Sin dependencias. Nada se envía a ningún servidor salvo que configures ENDPOINT. */
(function () {
  'use strict';

  /* ---------- Configuración de la agenda ---------- */
  var CFG = {
    tzOffset: -4,            // Venezuela (UTC-4, sin horario de verano)
    days: [1, 2, 3, 4, 5],   // lunes a viernes
    start: 9, end: 18,       // de 9:00 a 18:00, hora de Venezuela
    step: 30,                // minutos entre horarios
    show: 10,                // días hábiles que se muestran
    minLeadHours: 3,         // no ofrecer horarios con menos de 3 h de anticipación
    ENDPOINT: ''             // opcional: URL tipo Formspree. Si la usas, añádela a connect-src en la CSP.
  };

  var idle = window.requestIdleCallback || function (fn) { return setTimeout(fn, 200); };

  /* ---------- Reveal al hacer scroll ---------- */
  idle(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll('.sec-head, .project, .checklist li, .svc, .tiers > div, .plans article, .steps li, .booking, .faq details, .contact > *');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    var vh = window.innerHeight;
    // Primero se leen todas las posiciones y luego se escribe, para no forzar layouts en cadena.
    var below = Array.prototype.filter.call(targets, function (el) { return el.getBoundingClientRect().top >= vh; });
    requestAnimationFrame(function () {
      below.forEach(function (el, i) {
        el.classList.add('rv');
        el.style.transitionDelay = (i % 3) * 70 + 'ms';
        io.observe(el);
      });
    });
  }
  });

  /* ---------- Agenda (se prepara cuando se acerca a la pantalla) ---------- */
  var form = document.getElementById('booking');
  if (!form) return;
  var started = false;
  function startAgenda() { if (started) return; started = true; agenda(); }
  if ('IntersectionObserver' in window) {
    var aio = new IntersectionObserver(function (en) { if (en.some(function (x) { return x.isIntersecting; })) { aio.disconnect(); startAgenda(); } }, { rootMargin: '900px 0px' });
    aio.observe(form);
    window.addEventListener('hashchange', function () { if (location.hash === '#agenda') startAgenda(); });
  } else startAgenda();

  function agenda() {
  var daysEl = document.getElementById('days'), slotsEl = document.getElementById('slots');
  var errEl = document.getElementById('form-error'), booked = document.getElementById('booked');
  var summaryEl = document.getElementById('summary');
  var lang = 'es';
  var userTz = '';
  try { userTz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
  document.getElementById('tz').textContent = userTz ? '· tu hora (' + userTz.replace(/_/g, ' ') + ')' : '· tu hora local';

  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    for (var k in attrs) { if (k === 'text') n.textContent = attrs[k]; else n.setAttribute(k, attrs[k]); }
    (kids || []).forEach(function (c) { n.appendChild(c); });
    return n;
  }
  // Fecha (UTC) de un horario en Venezuela
  function vetToUtc(y, m, d, h, min) { return new Date(Date.UTC(y, m, d, h - CFG.tzOffset, min)); }
  function vetParts(date) { var t = new Date(date.getTime() + CFG.tzOffset * 3600e3); return { y: t.getUTCFullYear(), m: t.getUTCMonth(), d: t.getUTCDate(), wd: t.getUTCDay() }; }
  var fmtDayShort = new Intl.DateTimeFormat(lang, { weekday: 'short', timeZone: 'UTC' });
  var fmtTime = new Intl.DateTimeFormat(lang, { hour: '2-digit', minute: '2-digit' });
  var fmtLong = new Intl.DateTimeFormat(lang, { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
  var fmtVet = new Intl.DateTimeFormat(lang, { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', timeZone: 'America/Caracas' });

  function buildDays() {
    var now = new Date(), out = [], p = vetParts(now), i = 0;
    while (out.length < CFG.show && i < 30) {
      var base = new Date(Date.UTC(p.y, p.m, p.d + i)); i++;
      var y = base.getUTCFullYear(), m = base.getUTCMonth(), d = base.getUTCDate(), wd = base.getUTCDay();
      if (CFG.days.indexOf(wd) < 0) continue;
      var slots = [];
      for (var t = CFG.start * 60; t < CFG.end * 60; t += CFG.step) {
        var at = vetToUtc(y, m, d, Math.floor(t / 60), t % 60);
        if (at.getTime() - now.getTime() >= CFG.minLeadHours * 3600e3) slots.push(at);
      }
      if (slots.length) out.push({ label: base, slots: slots });
    }
    return out;
  }
  var DAYS = buildDays(), chosenDay = null, chosenSlot = null;

  function radio(group, btn) {
    group.querySelectorAll('[role=radio]').forEach(function (b) { b.setAttribute('aria-checked', 'false'); b.tabIndex = -1; });
    btn.setAttribute('aria-checked', 'true'); btn.tabIndex = 0;
  }
  function arrows(group) {
    group.addEventListener('keydown', function (e) {
      if (['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].indexOf(e.key) < 0) return;
      var items = Array.prototype.slice.call(group.querySelectorAll('[role=radio]'));
      var i = items.indexOf(document.activeElement); if (i < 0) return;
      e.preventDefault();
      var n = items[(i + (e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length];
      n.focus(); n.click();
    });
  }
  daysEl.textContent = '';
  DAYS.forEach(function (day, idx) {
    var b = el('button', { type: 'button', 'class': 'day', role: 'radio', 'aria-checked': 'false', tabindex: idx === 0 ? '0' : '-1',
      'aria-label': new Intl.DateTimeFormat(lang, { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' }).format(day.label) },
      [el('small', { text: fmtDayShort.format(day.label).replace('.', '') }), el('b', { text: String(day.label.getUTCDate()) })]);
    b.addEventListener('click', function () { radio(daysEl, b); chosenDay = day; chosenSlot = null; renderSlots(); });
    daysEl.appendChild(b);
  });
  arrows(daysEl); arrows(slotsEl);

  function renderSlots() {
    slotsEl.textContent = '';
    chosenDay.slots.forEach(function (s, idx) {
      var b = el('button', { type: 'button', 'class': 'slot', role: 'radio', 'aria-checked': 'false', tabindex: idx === 0 ? '0' : '-1', text: fmtTime.format(s) });
      b.addEventListener('click', function () { radio(slotsEl, b); chosenSlot = s; errEl.hidden = true; });
      slotsEl.appendChild(b);
    });
  }

  function summary(data) {
    return [
      'Hola Jorman, quiero agendar la consulta gratis de 15 minutos.',
      'Horario: ' + fmtLong.format(chosenSlot) + (userTz ? ' (' + userTz + ')' : ''),
      'En Venezuela: ' + fmtVet.format(chosenSlot),
      'Nombre: ' + data.nombre,
      'Negocio: ' + data.negocio,
      'Necesito: ' + data.tipo,
      'Contacto: ' + data.canal + ' · ' + data.contacto
    ].concat(data.nota ? ['Nota: ' + data.nota] : []).join('\n');
  }
  function copy(text) { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).catch(function () {}); }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var bad = [], first = null;
    ['nombre', 'negocio', 'tipo', 'canal', 'contacto'].forEach(function (n) {
      var f = form.elements[n], ok = f.value.trim() !== '';
      f.setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (!ok) { bad.push(f.closest('label').firstChild.textContent.trim()); first = first || f; }
    });
    if (!chosenSlot) { bad.unshift('día y hora'); first = first || daysEl.querySelector('[role=radio]'); }
    if (bad.length) {
      errEl.textContent = 'Falta: ' + bad.join(', ') + '.'; errEl.hidden = false;
      if (first) first.focus(); return;
    }
    errEl.hidden = true;
    var data = {}; ['nombre', 'negocio', 'tipo', 'canal', 'contacto', 'nota'].forEach(function (n) { data[n] = form.elements[n].value.trim(); });
    var text = summary(data);
    summaryEl.textContent = text; copy(text);
    if (CFG.ENDPOINT) {
      fetch(CFG.ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({ mensaje: text }) }).catch(function () {});
    }
    form.hidden = true; booked.hidden = false; booked.focus();
  });
  document.getElementById('copy').addEventListener('click', function () { copy(summaryEl.textContent); this.textContent = 'Copiado'; });
  }
})();
