/* Portafolio · Jorman Bravo — animaciones de entrada y agenda de consultas.
   Sin dependencias. Nada se envía a ningún servidor salvo que configures ENDPOINT. */
(function () {
  'use strict';

  /* ---------- Configuración de la agenda ---------- */
  var CFG = {
    tzOffset: -4,            // Venezuela (UTC-4, sin horario de verano)
    days: [1, 2, 3, 4, 5, 6], // lunes a sábado
    start: 4, end: 21,       // de 4:00 a 21:00, hora de Venezuela (cubre la mañana en España y todo el día en EE. UU.)
    step: 30,                // minutos entre horarios
    show: 10,                // días hábiles que se muestran
    minLeadHours: 3,         // no ofrecer horarios con menos de 3 h de anticipación
    ENDPOINT: ''             // opcional: URL tipo Formspree. Si la usas, añádela a connect-src en la CSP.
  };

  // Validación de campos de la agenda: ayuda a quien escribe y evita datos raros. La protección de verdad es que
  // todo lo que escribe el usuario se muestra con textContent, nunca como HTML.
  var NAME_RE = /^\p{L}(?:[\p{L}\p{M}]|['’ -](?=\p{L}))*$/u;
  function clean(v) { return String(v || '').normalize('NFC').replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200F\u2028\u2029\uFEFF]/g, ' ').replace(/\s+/g, ' ').trim(); }
  function cleanLong(v) { return String(v || '').normalize('NFC').replace(/[\u0000-\u0009\u000B-\u001F\u007F-\u009F\u200B-\u200F\u2028\u2029\uFEFF]/g, '').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim(); }
  function nameMsg(v, min, max, empty) {
    if (!v) return empty;
    if (/[^\p{L}\p{M}\d '’-]/u.test(v)) return 'Usa solo letras, espacios, apóstrofes y guiones (sin símbolos como < > / ; =).';
    if (/\d/.test(v)) return 'El nombre no puede llevar números.';
    if (!NAME_RE.test(v)) return 'Usa solo letras, espacios, apóstrofes y guiones.';
    if (v.length < min) return 'Escribe al menos ' + min + ' letras.';
    if (v.length > max) return 'Máximo ' + max + ' caracteres.';
    return '';
  }
  function phoneMsg(v, min, short) {
    if (/(?!^\+)\D/.test(v)) return 'El teléfono solo lleva números (y + al inicio para el código de país).';
    var d = v.replace(/\D/g, '');
    if (d.length < min) return short;
    if (d.length > 15) return 'Sobran dígitos: revisa el número.';
    return '';
  }
  function textMsg(v, max) {
    if (/[<>]/.test(v)) return 'Sin los signos < y >, por favor.';
    if (max && v.length > max) return 'Máximo ' + max + ' caracteres.';
    return '';
  }
  function isCharMsg(m) { return /números|Usa solo|solo lleva|solo acepta|signos/.test(m); }
  // Valida al escribir solo si hay un carácter no permitido (o si el campo ya estaba marcado), y siempre al salir del campo
  function live(input, rule, show) {
    input.addEventListener('input', function () { var m = rule(input.value); if (input.getAttribute('aria-invalid') === 'true' || isCharMsg(m)) show(m); });
    input.addEventListener('blur', function () { if (input.value) show(rule(input.value)); });
  }
  // Filtro al escribir o pegar: quita lo que no corresponde al tipo de campo y lo avisa.
  var FILTERS = {
    name: [/[^\p{L}\p{M} '’-]/gu, 'Este campo solo acepta letras, espacios, apóstrofes y guiones.'],
    digits: [/\D/g, 'Este campo solo acepta números.'],
    phone: [/(?!^\+)\D/g, 'El teléfono solo acepta números (y + al inicio para el código de país).'],
    user: [/[^A-Za-z0-9._-]/g, 'El usuario solo lleva letras sin acentos, números, puntos y guiones.'],
    text: [/[<>]/g, 'Los signos < y > no están permitidos.']
  };
  function filter(input, kind, show) {
    input.addEventListener('input', function () {
      var k = typeof kind === 'function' ? kind() : kind, f = FILTERS[k];
      if (!f) return;
      var v = input.value, c = v.replace(f[0], '');
      if (c === v) return;
      var pos = Math.max(0, (input.selectionStart || c.length) - (v.length - c.length));
      input.value = c;
      try { input.setSelectionRange(pos, pos); } catch (e) {}
      if (show) show(f[1]);
    });
  }
  // Campos type=number: bloquea e, E, +, -, punto y coma (el navegador sí los deja escribir)
  function digitsOnlyNumber(input) {
    input.addEventListener('keydown', function (e) { if (['e', 'E', '+', '-', '.', ','].indexOf(e.key) > -1) e.preventDefault(); });
    input.addEventListener('paste', function (e) { var t = (e.clipboardData || window.clipboardData).getData('text'); if (/\D/.test(t)) e.preventDefault(); });
  }

  var idle = window.requestIdleCallback || function (fn) { return setTimeout(fn, 200); };

  /* Aviso de cookies (Aceptar todas / Rechazar todas / Configurar). Se carga desde aquí porque index.html se genera con una plantilla. */
  if (!document.querySelector('script[src*="cookies.js"]')) {
    var ck = document.createElement('script');
    ck.src = 'cookies.js?v=1'; ck.defer = true;
    ck.dataset.key = 'raiz'; ck.dataset.owner = 'Jorman Bravo'; ck.dataset.accent = '#1E33A8';
    document.head.appendChild(ck);
  }

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
  /* Reglas de cada campo. maxlength y pattern se ponen aquí para no depender del HTML generado. */
  var CONTACT = {
    Correo: { ph: 'tucorreo@ejemplo.com', ac: 'email', im: 'email', test: function (v) { return v.length <= 120 && /^[^\s@<>()"',;:]+@[^\s@<>()"',;:]+\.[^\s@<>()"',;:]{2,}$/.test(v) ? '' : 'Revisa el correo: falta la @ o el dominio.'; } },
    Instagram: { ph: 'tuusuario', ac: 'username', im: 'text', test: function (v) { return /^[A-Za-z0-9._]{1,30}$/.test(v) ? '' : 'Un usuario de Instagram solo lleva letras, números, puntos y guiones bajos.'; } },
    WhatsApp: { ph: '+34600000000', ac: 'tel', im: 'tel', test: function (v) { return phoneMsg(v, 8, 'Escribe el número con el código de país, por ejemplo +34600000000.'); } },
    Freelancer: { ph: 'tu usuario de Freelancer', ac: 'username', im: 'text', test: function (v) { return /^[A-Za-z0-9_.-]{3,32}$/.test(v) ? '' : 'El usuario de Freelancer solo lleva letras, números, puntos, guiones y guiones bajos.'; } }
  };
  var RULES = {
    nombre: function (v) { return nameMsg(clean(v), 2, 80, 'Escribe tu nombre.'); },
    negocio: function (v) { v = clean(v); return !v ? 'Cuéntame qué negocio tienes.' : textMsg(v, 100) || (v.length < 2 ? 'Escribe al menos 2 caracteres.' : ''); },
    tipo: function (v) { return v ? '' : 'Elige qué necesitas.'; },
    canal: function (v) { return v ? '' : 'Elige cómo te contacto.'; },
    contacto: function (v) { v = clean(v); var c = CONTACT[form.elements.canal.value]; return !v ? 'Escribe tu correo, usuario o número.' : textMsg(v, 120) || (c ? c.test(v) : ''); },
    nota: function (v) { return textMsg(cleanLong(v), 600); }
  };
  var f = form.elements;
  f.nombre.setAttribute('pattern', "\\p{L}(?:[\\p{L}\\p{M}]|[' ’\\-](?=\\p{L}))*"); f.nombre.setAttribute('minlength', '2'); f.nombre.setAttribute('spellcheck', 'false');
  f.negocio.setAttribute('minlength', '2');
  function fieldErr(name) {
    var id = 'err-' + name, e = document.getElementById(id);
    if (!e) {
      e = el('span', { 'class': 'form-error', id: id, 'aria-live': 'polite' }); e.hidden = true;
      e.style.display = 'block'; e.style.fontSize = '.85em'; e.style.marginTop = '.3em';
      f[name].insertAdjacentElement('afterend', e);
    }
    return e;
  }
  function show(name, msg) {
    var e = fieldErr(name), input = f[name];
    e.textContent = msg; e.hidden = !msg; input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (msg) input.setAttribute('aria-describedby', e.id); else input.removeAttribute('aria-describedby');
    return !msg;
  }
  ['nombre', 'negocio', 'contacto', 'nota'].forEach(function (n) { live(f[n], RULES[n], function (m) { show(n, m); }); });
  var KIND = { nombre: 'name', negocio: 'text', nota: 'text', contacto: function () { return { WhatsApp: 'phone', Instagram: 'user', Freelancer: 'user' }[f.canal.value] || 'text'; } };
  Object.keys(KIND).forEach(function (n) { filter(f[n], KIND[n], function (m) { show(n, m); }); });
  f.canal.addEventListener('change', function () {
    var c = CONTACT[f.canal.value];
    if (c) { f.contacto.placeholder = c.ph; f.contacto.setAttribute('autocomplete', c.ac); f.contacto.setAttribute('inputmode', c.im); }
    show('canal', RULES.canal(f.canal.value));
    if (f.contacto.value) show('contacto', RULES.contacto(f.contacto.value));
  });
  f.tipo.addEventListener('change', function () { show('tipo', RULES.tipo(f.tipo.value)); });

  function copy(text) { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).catch(function () {}); }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var bad = [], first = null;
    ['nombre', 'negocio', 'contacto'].forEach(function (n) { f[n].value = clean(f[n].value); });
    f.nota.value = cleanLong(f.nota.value);
    ['nombre', 'negocio', 'tipo', 'canal', 'contacto', 'nota'].forEach(function (n) {
      var ok = show(n, RULES[n](f[n].value));
      if (!ok) { bad.push(f[n].closest('label').firstChild.textContent.trim().toLowerCase()); first = first || f[n]; }
    });
    if (!chosenSlot) { bad.unshift('día y hora'); first = first || daysEl.querySelector('[role=radio]'); }
    if (bad.length) {
      errEl.textContent = 'Revisa: ' + bad.join(', ') + '.'; errEl.hidden = false;
      if (first) first.focus(); return;
    }
    errEl.hidden = true;
    var data = {}; ['nombre', 'negocio', 'tipo', 'canal', 'contacto', 'nota'].forEach(function (n) { data[n] = f[n].value; });
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
