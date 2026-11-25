/* Portafolio · Jorman Bravo — animaciones de entrada y formulario de contacto.
   Sin dependencias. Nada se envía a ningún servidor salvo que configures ENDPOINT. */
(function () {
  'use strict';

  /* ---------- Configuración del formulario ---------- */
  var CFG = {
    ENDPOINT: ''             // opcional: URL tipo Formspree. Si la usas, añádela a connect-src en la CSP.
  };

  // Validación de campos: ayuda a quien escribe y evita datos raros. La protección de verdad es que
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

  /* Enlaces viejos a #agenda caen en el formulario de contacto. */
  function fixLegacyHash() {
    if (location.hash !== '#agenda') return;
    var el = document.getElementById('contacto');
    if (history.replaceState) history.replaceState(null, '', '#contacto');
    if (el) el.scrollIntoView();
  }
  fixLegacyHash();
  window.addEventListener('hashchange', fixLegacyHash);

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

  /* ---------- Formulario de contacto ---------- */
  var form = document.getElementById('contacto-form');
  if (!form) return;

  var errEl = document.getElementById('form-error'), sent = document.getElementById('enviado');
  var summaryEl = document.getElementById('summary');

  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    for (var k in attrs) { if (k === 'text') n.textContent = attrs[k]; else n.setAttribute(k, attrs[k]); }
    (kids || []).forEach(function (c) { n.appendChild(c); });
    return n;
  }

  function summary(data) {
    return [
      'Hola Jorman, te escribo por el formulario de tu portafolio.',
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
    Freelancer: { ph: 'tu usuario de Freelancer', ac: 'username', im: 'text', test: function (v) { return /^[A-Za-z0-9_.-]{3,32}$/.test(v) ? '' : 'El usuario de Freelancer solo lleva letras, números, puntos, guiones y guiones bajos.'; } },
    Workana: { ph: 'tu usuario de Workana', ac: 'username', im: 'text', test: function (v) { return /^[A-Za-z0-9_.-]{3,32}$/.test(v) ? '' : 'El usuario de Workana solo lleva letras, números, puntos, guiones y guiones bajos.'; } }
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
  var KIND = { nombre: 'name', negocio: 'text', nota: 'text', contacto: function () { return { WhatsApp: 'phone', Instagram: 'user', Freelancer: 'user', Workana: 'user' }[f.canal.value] || 'text'; } };
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
    form.hidden = true; sent.hidden = false; sent.focus();
  });
  document.getElementById('copy').addEventListener('click', function () { copy(summaryEl.textContent); this.textContent = 'Copiado'; });
})();
