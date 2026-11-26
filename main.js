/* Portafolio · Jorman Bravo — animaciones de entrada y formulario de contacto.
   Sin dependencias. Nada se envía a ningún servidor salvo que configures ENDPOINT. */
(function () {
  'use strict';

  /* ---------- Configuración del formulario ---------- */
  var CFG = {
    ENDPOINT: ''             // opcional: URL tipo Formspree. Si la usas, añádela a connect-src en la CSP.
  };

  var LANG = ((document.documentElement.lang || 'es') + '').toLowerCase().slice(0, 2);
  if (LANG !== 'en') LANG = 'es';
  var MSG = {
    es: {
      nameCharset: 'Usa solo letras, espacios, apóstrofes y guiones (sin símbolos como < > / ; =).',
      nameNoDigits: 'El nombre no puede llevar números.',
      namePattern: 'Usa solo letras, espacios, apóstrofes y guiones.',
      nameMin: function (n) { return 'Escribe al menos ' + n + ' letras.'; },
      nameMax: function (n) { return 'Máximo ' + n + ' caracteres.'; },
      nameEmpty: 'Escribe tu nombre.',
      phoneCharset: 'El teléfono solo lleva números (y + al inicio para el código de país).',
      phoneShort: 'Escribe el número con el código de país, por ejemplo +34600000000.',
      phoneLong: 'Sobran dígitos: revisa el número.',
      textAngles: 'Sin los signos < y >, por favor.',
      textMax: function (n) { return 'Máximo ' + n + ' caracteres.'; },
      filterName: 'Este campo solo acepta letras, espacios, apóstrofes y guiones.',
      filterDigits: 'Este campo solo acepta números.',
      filterPhone: 'El teléfono solo acepta números (y + al inicio para el código de país).',
      filterUser: 'El usuario solo lleva letras sin acentos, números, puntos y guiones.',
      filterText: 'Los signos < y > no están permitidos.',
      emailBad: 'Revisa el correo: falta la @ o el dominio.',
      emailPh: 'tucorreo@ejemplo.com',
      waPh: '+34600000000',
      flPh: 'tu usuario de Freelancer',
      wkPh: 'tu usuario de Workana',
      flBad: 'El usuario de Freelancer solo lleva letras, números, puntos, guiones y guiones bajos.',
      wkBad: 'El usuario de Workana solo lleva letras, números, puntos, guiones y guiones bajos.',
      bizEmpty: 'Cuéntame qué negocio tienes.',
      bizMin: 'Escribe al menos 2 caracteres.',
      tipoEmpty: 'Elige qué necesitas.',
      canalEmpty: 'Elige cómo te contacto.',
      contactEmpty: 'Escribe tu correo, usuario o número.',
      formBad: function (list) { return 'Revisa: ' + list + '.'; },
      copied: 'Copiado',
      copyAgain: 'Copiar de nuevo',
      summary: function (data) {
        return [
          'Hola Jorman, te escribo por el formulario de tu portafolio.',
          'Nombre: ' + data.nombre,
          'Negocio: ' + data.negocio,
          'Necesito: ' + data.tipo,
          'Contacto: ' + data.canal + ' · ' + data.contacto
        ].concat(data.nota ? ['Nota: ' + data.nota] : []).join('\n');
      }
    },
    en: {
      nameCharset: 'Use only letters, spaces, apostrophes, and hyphens (no symbols such as < > / ; =).',
      nameNoDigits: 'The name can’t include numbers.',
      namePattern: 'Use only letters, spaces, apostrophes, and hyphens.',
      nameMin: function (n) { return 'Please enter at least ' + n + ' letters.'; },
      nameMax: function (n) { return 'Please keep this to ' + n + ' characters.'; },
      nameEmpty: 'Please enter your name.',
      phoneCharset: 'The phone number can only include digits (and a leading + for the country code).',
      phoneShort: 'Enter the number with a country code, for example +12025550100.',
      phoneLong: 'That’s too many digits. Please check the number.',
      textAngles: 'Please leave out the < and > characters.',
      textMax: function (n) { return 'Please keep this to ' + n + ' characters.'; },
      filterName: 'This field only accepts letters, spaces, apostrophes, and hyphens.',
      filterDigits: 'This field only accepts numbers.',
      filterPhone: 'The phone field only accepts numbers (and a leading + for the country code).',
      filterUser: 'The username can only include unaccented letters, numbers, periods, and hyphens.',
      filterText: 'The < and > characters aren’t allowed.',
      emailBad: 'Please check the email: it’s missing the @ or the domain.',
      emailPh: 'you@example.com',
      waPh: '+12025550100',
      flPh: 'your Freelancer username',
      wkPh: 'your Workana username',
      flBad: 'A Freelancer username can only include letters, numbers, periods, hyphens, and underscores.',
      wkBad: 'A Workana username can only include letters, numbers, periods, hyphens, and underscores.',
      bizEmpty: 'Tell me what kind of business you have.',
      bizMin: 'Please enter at least 2 characters.',
      tipoEmpty: 'Please choose what you need.',
      canalEmpty: 'Please choose how I should reach you.',
      contactEmpty: 'Enter your email, username, or number.',
      formBad: function (list) { return 'Please check: ' + list + '.'; },
      copied: 'Copied',
      copyAgain: 'Copy again',
      summary: function (data) {
        return [
          'Hi Jorman, I’m writing from the contact form on your portfolio.',
          'Name: ' + data.nombre,
          'Business: ' + data.negocio,
          'I need: ' + data.tipo,
          'Contact: ' + data.canal + ' · ' + data.contacto
        ].concat(data.nota ? ['Note: ' + data.nota] : []).join('\n');
      }
    }
  };
  var m = MSG[LANG];

  // Validación de campos: ayuda a quien escribe y evita datos raros. La protección de verdad es que
  // todo lo que escribe el usuario se muestra con textContent, nunca como HTML.
  var NAME_RE = /^\p{L}(?:[\p{L}\p{M}]|['’ -](?=\p{L}))*$/u;
  function clean(v) { return String(v || '').normalize('NFC').replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200F\u2028\u2029\uFEFF]/g, ' ').replace(/\s+/g, ' ').trim(); }
  function cleanLong(v) { return String(v || '').normalize('NFC').replace(/[\u0000-\u0009\u000B-\u001F\u007F-\u009F\u200B-\u200F\u2028\u2029\uFEFF]/g, '').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim(); }
  function nameMsg(v, min, max, empty) {
    if (!v) return empty;
    if (/[^\p{L}\p{M}\d '’-]/u.test(v)) return m.nameCharset;
    if (/\d/.test(v)) return m.nameNoDigits;
    if (!NAME_RE.test(v)) return m.namePattern;
    if (v.length < min) return m.nameMin(min);
    if (v.length > max) return m.nameMax(max);
    return '';
  }
  function phoneMsg(v, min, short) {
    if (/(?!^\+)\D/.test(v)) return m.phoneCharset;
    var d = v.replace(/\D/g, '');
    if (d.length < min) return short;
    if (d.length > 15) return m.phoneLong;
    return '';
  }
  function textMsg(v, max) {
    if (/[<>]/.test(v)) return m.textAngles;
    if (max && v.length > max) return m.textMax(max);
    return '';
  }
  function isCharMsg(msg) { return /números|numbers|Usa solo|Use only|solo lleva|only (takes|include)|solo acepta|only accepts|signos|characters < and >|aren’t allowed/.test(msg); }
  // Valida al escribir solo si hay un carácter no permitido (o si el campo ya estaba marcado), y siempre al salir del campo
  function live(input, rule, show) {
    input.addEventListener('input', function () { var msg = rule(input.value); if (input.getAttribute('aria-invalid') === 'true' || isCharMsg(msg)) show(msg); });
    input.addEventListener('blur', function () { if (input.value) show(rule(input.value)); });
  }
  // Filtro al escribir o pegar: quita lo que no corresponde al tipo de campo y lo avisa.
  var FILTERS = {
    name: [/[^\p{L}\p{M} '’-]/gu, m.filterName],
    digits: [/\D/g, m.filterDigits],
    phone: [/(?!^\+)\D/g, m.filterPhone],
    user: [/[^A-Za-z0-9._-]/g, m.filterUser],
    text: [/[<>]/g, m.filterText]
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
    input.addEventListener('paste', function (e) { var txt = (e.clipboardData || window.clipboardData).getData('text'); if (/\D/.test(txt)) e.preventDefault(); });
  }

  var idle = window.requestIdleCallback || function (fn) { return setTimeout(fn, 200); };

  /* Aviso de cookies (Aceptar todas / Rechazar todas / Configurar). Se carga desde aquí porque index.html se genera con una plantilla. */
  var thisScript = document.currentScript || document.querySelector('script[src*="main.js"]');
  var assetBase = thisScript ? thisScript.src.replace(/main\.js(\?.*)?$/, '') : '';
  if (!document.querySelector('script[src*="cookies.js"]')) {
    var ck = document.createElement('script');
    ck.src = assetBase + 'cookies.js?v=2'; ck.defer = true;
    ck.dataset.key = 'raiz'; ck.dataset.owner = 'Jorman Bravo'; ck.dataset.accent = '#1E33A8';
    ck.dataset.lang = LANG;
    ck.dataset.policy = LANG === 'en' ? '/en/cookies.html' : '/cookies.html';
    document.head.appendChild(ck);
  }

  /* El conmutador ES/EN conserva el ancla (#contacto, #servicios, …). */
  Array.prototype.forEach.call(document.querySelectorAll('.lang a[href]'), function (a) {
    var href = a.getAttribute('href') || '';
    if (!location.hash || href.indexOf('cookies') !== -1 || href.indexOf('#') !== -1) return;
    a.setAttribute('href', href + location.hash);
  });

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

  function selectedText(name) {
    var field = form.elements[name];
    if (!field) return '';
    if (field.selectedIndex >= 0 && field.options) return field.options[field.selectedIndex].text;
    return field.value;
  }

  function summary(data) { return m.summary(data); }

  /* Reglas de cada campo. maxlength y pattern se ponen aquí para no depender del HTML generado.
     Los values de canal son estables (email, whatsapp, freelancer, workana). */
  var CONTACT = {
    email: { ph: m.emailPh, ac: 'email', im: 'email', test: function (v) { return v.length <= 120 && /^[^\s@<>()"',;:]+@[^\s@<>()"',;:]+\.[^\s@<>()"',;:]{2,}$/.test(v) ? '' : m.emailBad; } },
    Correo: null,
    whatsapp: { ph: m.waPh, ac: 'tel', im: 'tel', test: function (v) { return phoneMsg(v, 8, m.phoneShort); } },
    WhatsApp: null,
    freelancer: { ph: m.flPh, ac: 'username', im: 'text', test: function (v) { return /^[A-Za-z0-9_.-]{3,32}$/.test(v) ? '' : m.flBad; } },
    Freelancer: null,
    workana: { ph: m.wkPh, ac: 'username', im: 'text', test: function (v) { return /^[A-Za-z0-9_.-]{3,32}$/.test(v) ? '' : m.wkBad; } },
    Workana: null
  };
  CONTACT.Correo = CONTACT.email;
  CONTACT.WhatsApp = CONTACT.whatsapp;
  CONTACT.Freelancer = CONTACT.freelancer;
  CONTACT.Workana = CONTACT.workana;
  var RULES = {
    nombre: function (v) { return nameMsg(clean(v), 2, 80, m.nameEmpty); },
    negocio: function (v) { v = clean(v); return !v ? m.bizEmpty : textMsg(v, 100) || (v.length < 2 ? m.bizMin : ''); },
    tipo: function (v) { return v ? '' : m.tipoEmpty; },
    canal: function (v) { return v ? '' : m.canalEmpty; },
    contacto: function (v) { v = clean(v); var c = CONTACT[form.elements.canal.value]; return !v ? m.contactEmpty : textMsg(v, 120) || (c ? c.test(v) : ''); },
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
  ['nombre', 'negocio', 'contacto', 'nota'].forEach(function (n) { live(f[n], RULES[n], function (msg) { show(n, msg); }); });
  var KIND = { nombre: 'name', negocio: 'text', nota: 'text', contacto: function () { return { whatsapp: 'phone', WhatsApp: 'phone', freelancer: 'user', Freelancer: 'user', workana: 'user', Workana: 'user' }[f.canal.value] || 'text'; } };
  Object.keys(KIND).forEach(function (n) { filter(f[n], KIND[n], function (msg) { show(n, msg); }); });
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
      errEl.textContent = m.formBad(bad.join(', ')); errEl.hidden = false;
      if (first) first.focus(); return;
    }
    errEl.hidden = true;
    var data = {}; ['nombre', 'negocio', 'tipo', 'canal', 'contacto', 'nota'].forEach(function (n) { data[n] = f[n].value; });
    data.tipo = selectedText('tipo');
    data.canal = selectedText('canal');
    var text = summary(data);
    summaryEl.textContent = text; copy(text);
    if (CFG.ENDPOINT) {
      fetch(CFG.ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({ mensaje: text }) }).catch(function () {});
    }
    form.hidden = true; sent.hidden = false; sent.focus();
  });
  document.getElementById('copy').addEventListener('click', function () {
    copy(summaryEl.textContent);
    this.textContent = m.copied;
  });
})();
