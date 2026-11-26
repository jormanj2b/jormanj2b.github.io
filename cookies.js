/* Cookie notice · Jorman Bravo · no dependencies.
   Three equal-weight options (Accept all, Reject all, Choose by category), plus a category dialog.
   Usage: <script src="cookies.js" defer data-owner="Business" data-policy="cookies.html" data-key="my-site" data-lang="en"></script>
   Optional scripts: <script type="text/plain" data-cookie-category="analitica" data-src="..."></script>
   API: window.CookieConsent.get() · .open() · .set({analitica, marketing}) · .onChange(fn) */
(function () {
  'use strict';
  var me = document.currentScript || document.querySelector('script[src*="cookies.js"]');
  var ds = (me && me.dataset) || {};
  var base = me ? me.src.replace(/cookies\.js(\?.*)?$/, '') : '';
  var KEY = 'ck-' + (ds.key || location.pathname.split('/')[1] || 'raiz');
  var VERSION = 1, MAX_AGE = 365 * 24 * 3600e3; // ask again after 12 months
  var LANG = ((ds.lang || document.documentElement.lang || 'es') + '').toLowerCase().slice(0, 2);
  if (LANG !== 'en') LANG = 'es';
  var I18N = {
    es: {
      accept: 'Aceptar todas',
      reject: 'Rechazar todas',
      configure: 'Configurar',
      bannerAria: 'Aviso de cookies',
      bannerLead: 'Cookies. ',
      bannerMid: ' solo usa lo necesario para que el sitio funcione. Lo opcional (analítica y marketing) se activa únicamente si lo aceptas. Puedes cambiarlo cuando quieras. Más en la ',
      policyLink: 'política de cookies',
      bannerEnd: '.',
      title: 'Preferencias de cookies',
      intro: 'Elige qué permites. Las necesarias no se pueden desactivar porque sin ellas el sitio no funciona. Tu elección se guarda en este navegador con la fecha, durante 12 meses.',
      save: 'Guardar mi selección',
      close: 'Cerrar sin cambiar',
      policy: 'Ver la política de cookies',
      prefs: 'Preferencias de cookies',
      policyFoot: 'Política de cookies',
      locked: ' (siempre activas)',
      cats: [
        { id: 'necesarias', name: 'Necesarias', desc: 'Hacen que el sitio funcione: guardan tu elección de cookies y, si existen, el carrito o el pedido en tu navegador. Siempre activas.', locked: true },
        { id: 'analitica', name: 'Analítica', desc: 'Medirían visitas de forma agregada para mejorar el sitio. Ahora mismo no usamos ninguna herramienta de analítica.' },
        { id: 'marketing', name: 'Marketing', desc: 'Contenido de terceros o publicidad que puede usar cookies propias. Ahora mismo no usamos ninguna.' }
      ]
    },
    en: {
      accept: 'Accept all',
      reject: 'Reject all',
      configure: 'Choose by category',
      bannerAria: 'Cookie notice',
      bannerLead: 'Cookies. ',
      bannerMid: ' only uses what the site needs to work. Optional tools (analytics and marketing) stay off unless you accept them. You can change this later. More in the ',
      policyLink: 'cookie policy',
      bannerEnd: '.',
      title: 'Cookie preferences',
      intro: 'Choose what you allow. Necessary items can’t be turned off, because the site needs them to work. Your choice is saved in this browser, with the date, for 12 months.',
      save: 'Save my choices',
      close: 'Close without changing',
      policy: 'Read the cookie policy',
      prefs: 'Cookie preferences',
      policyFoot: 'Cookie policy',
      locked: ' (always on)',
      cats: [
        { id: 'necesarias', name: 'Necessary', desc: 'These make the site work: they store your cookie choice and, if there is one, a cart or order in your browser. Always on.', locked: true },
        { id: 'analitica', name: 'Analytics', desc: 'These would measure visits in aggregate to improve the site. We don’t use any analytics cookies right now.' },
        { id: 'marketing', name: 'Marketing', desc: 'Third-party content or ads that may set their own cookies. We don’t use any right now.' }
      ]
    }
  };
  var t = I18N[LANG];
  var POLICY = ds.policy || base + 'cookies.html';
  var OWNER = ds.owner || document.title.split(/[·|]/).pop().trim();
  var CATS = t.cats.map(function (cat) {
    var copy = { id: cat.id, name: cat.name, desc: cat.desc, locked: !!cat.locked };
    if (cat.id === 'analitica' && ds.analitica) copy.desc = ds.analitica;
    if (cat.id === 'marketing') {
      if (ds.marketingName) copy.name = ds.marketingName;
      if (ds.marketing) copy.desc = ds.marketing;
    }
    return copy;
  });
  var listeners = [], banner = null, dlg = null, lastFocus = null;
  if (ds.accent) document.documentElement.style.setProperty('--ck-accent', ds.accent);

  function read() {
    try {
      var c = JSON.parse(localStorage.getItem(KEY));
      if (c && c.v === VERSION && Date.now() - Date.parse(c.date) < MAX_AGE) return c;
    } catch (e) {}
    return null;
  }
  function write(choice) {
    var c = { v: VERSION, date: new Date().toISOString(), necesarias: true, analitica: !!choice.analitica, marketing: !!choice.marketing };
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {}
    apply(c); return c;
  }
  function apply(c) {
    document.documentElement.classList.remove('has-cookie-banner');
    Array.prototype.forEach.call(document.querySelectorAll('script[type="text/plain"][data-cookie-category]'), function (s) {
      if (!c || !c[s.dataset.cookieCategory] || s.dataset.done) return;
      var n = document.createElement('script');
      if (s.dataset.src) n.src = s.dataset.src; else n.textContent = s.textContent;
      s.dataset.done = '1'; s.parentNode.insertBefore(n, s.nextSibling);
    });
    listeners.forEach(function (fn) { try { fn(c); } catch (e) {} });
    try { document.dispatchEvent(new CustomEvent('cookieconsent', { detail: c })); } catch (e) {}
  }

  function h(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { if (k === 'text') n.textContent = attrs[k]; else n.setAttribute(k, attrs[k]); });
    (kids || []).forEach(function (k) { n.appendChild(typeof k === 'string' ? document.createTextNode(k) : k); });
    return n;
  }
  function buttons(onConfig) {
    var acc = h('button', { type: 'button', 'class': 'ck-btn', text: t.accept });
    var rej = h('button', { type: 'button', 'class': 'ck-btn', text: t.reject });
    acc.addEventListener('click', function () { write({ analitica: true, marketing: true }); close(); });
    rej.addEventListener('click', function () { write({ analitica: false, marketing: false }); close(); });
    var kids = [acc, rej];
    if (onConfig) { var cfg = h('button', { type: 'button', 'class': 'ck-btn', text: t.configure }); cfg.addEventListener('click', onConfig); kids.push(cfg); }
    return h('div', { 'class': 'ck-actions' }, kids);
  }
  function buildBanner() {
    var policy = h('a', { href: POLICY, text: t.policyLink });
    banner = h('section', { 'class': 'ck-banner', role: 'region', 'aria-label': t.bannerAria, id: 'ck-banner' }, [
      h('p', { 'class': 'ck-text' }, [h('strong', { text: t.bannerLead }), OWNER + t.bannerMid, policy, t.bannerEnd]),
      buttons(function () { openConfig(); })
    ]);
    banner.hidden = true;
    document.body.appendChild(banner);
  }
  function buildDialog() {
    var c = read() || { analitica: false, marketing: false };
    var title = h('h2', { id: 'ck-title', text: t.title });
    var list = h('div', { 'class': 'ck-cats' });
    CATS.forEach(function (cat) {
      var id = 'ck-' + cat.id;
      var input = h('input', { type: 'checkbox', id: id, role: 'switch', 'aria-describedby': id + '-d' });
      input.checked = cat.locked ? true : !!c[cat.id]; if (cat.locked) input.disabled = true;
      list.appendChild(h('div', { 'class': 'ck-cat' }, [
        h('div', { 'class': 'ck-cat-head' }, [h('label', { 'for': id, text: cat.name + (cat.locked ? t.locked : '') }), input]),
        h('p', { id: id + '-d', text: cat.desc })
      ]));
    });
    var save = h('button', { type: 'button', 'class': 'ck-btn', text: t.save });
    save.addEventListener('click', function () { write({ analitica: dlg.querySelector('#ck-analitica').checked, marketing: dlg.querySelector('#ck-marketing').checked }); close(); });
    var x = h('button', { type: 'button', 'class': 'ck-x', 'aria-label': t.close, text: '×' });
    x.addEventListener('click', function () { dlg.close(); });
    var acts = buttons(null); acts.appendChild(save);
    dlg = h('dialog', { 'class': 'ck-dialog', 'aria-labelledby': 'ck-title' }, [x, title,
      h('p', { text: t.intro }),
      list, acts, h('p', { 'class': 'ck-small' }, [h('a', { href: POLICY, text: t.policy })])]);
    dlg.addEventListener('close', function () { if (!read()) showBanner(); if (lastFocus && lastFocus.focus) lastFocus.focus(); });
    document.body.appendChild(dlg);
  }
  function showBanner() { if (!banner) buildBanner(); banner.hidden = false; document.documentElement.classList.add('has-cookie-banner'); }
  function close() {
    if (banner) banner.hidden = true;
    if (dlg && dlg.open) dlg.close();
  }
  function openConfig() {
    lastFocus = document.activeElement;
    if (dlg) dlg.remove(); buildDialog();
    if (banner) banner.hidden = true;
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
    var first = dlg.querySelector('#ck-analitica'); if (first) first.focus();
  }

  function footerLink() {
    if (!document.querySelector('[data-cookie-prefs]')) {
      var foot = document.querySelector('footer') || document.querySelector('main');
      if (foot) {
        var p = h('p', { 'class': 'ck-foot' }, [h('button', { type: 'button', 'class': 'ck-link', 'data-cookie-prefs': '', text: t.prefs })]);
        if (!document.querySelector('a[href*="cookies.html"]')) { p.appendChild(document.createTextNode(' · ')); p.appendChild(h('a', { href: POLICY, text: t.policyFoot })); }
        foot.appendChild(p);
      }
    }
    document.addEventListener('click', function (e) {
      var tgt = e.target.closest && e.target.closest('[data-cookie-prefs], [data-reset-consent]');
      if (tgt) { e.preventDefault(); openConfig(); }
    });
  }

  window.CookieConsent = {
    get: read,
    open: openConfig,
    set: function (choice) { var c = read() || {}; return write({ analitica: 'analitica' in choice ? choice.analitica : c.analitica, marketing: 'marketing' in choice ? choice.marketing : c.marketing }); },
    onChange: function (fn) { listeners.push(fn); var c = read(); if (c) fn(c); }
  };

  function start() {
    footerLink();
    var c = read();
    if (c) apply(c);
    var css = document.querySelector('link[href*="cookies.css"]');
    if (!css) {
      css = h('link', { rel: 'stylesheet', href: base + 'cookies.css?v=1' });
      if (!c) { css.addEventListener('load', showBanner); css.addEventListener('error', showBanner); }
      document.head.appendChild(css);
    } else if (!c) showBanner();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
