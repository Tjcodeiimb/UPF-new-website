(function () {
  var KEY = 'upf-consent-v1';
  var root = document.currentScript && document.currentScript.dataset.root || '/';
  var POLICY = root + 'legal/cookie-policy.html';
  var PRIVACY = root + 'legal/privacy-policy.html';

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; }
  }

  function save(prefs) {
    var data = { essential: true, analytics: !!prefs.analytics, marketing: !!prefs.marketing, date: new Date().toISOString() };
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {}
    document.dispatchEvent(new CustomEvent('upf:consent', { detail: data }));
    return data;
  }

  var css = '' +
    '.upf-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:5000;max-width:560px;margin-left:auto;' +
    'background:#171514;color:#efe4d2;border:1px solid rgba(239,228,210,.12);border-radius:18px;padding:20px 20px 18px;' +
    'box-shadow:0 30px 60px -20px rgba(0,0,0,.7);font:14px/1.55 "Plus Jakarta Sans",system-ui,sans-serif;' +
    'transform:translateY(24px);opacity:0;transition:transform .6s cubic-bezier(.16,1,.3,1),opacity .4s ease}' +
    '.upf-consent.is-open{transform:none;opacity:1}' +
    '.upf-consent::before{content:"";position:absolute;left:12%;right:12%;top:0;height:1px;background:linear-gradient(90deg,transparent,#9db0ff,transparent)}' +
    '.upf-consent h2{font:400 22px/1.1 "Instrument Serif",Georgia,serif;margin:0 0 6px;color:#efe4d2}' +
    '.upf-consent p{margin:0 0 14px;color:rgba(239,228,210,.72)}' +
    '.upf-consent a{color:#9db0ff}' +
    '.upf-consent .upf-row{display:flex;flex-wrap:wrap;gap:8px}' +
    '.upf-consent button{font:600 13px "Plus Jakarta Sans",system-ui,sans-serif;border-radius:999px;padding:10px 16px;cursor:pointer;border:1px solid rgba(239,228,210,.2);background:transparent;color:#efe4d2}' +
    '.upf-consent button.upf-primary{background:#2f4fd1;border-color:#2f4fd1;color:#fff}' +
    '.upf-consent button:hover{border-color:#9db0ff}' +
    '.upf-consent button:focus-visible{outline:2px solid #9db0ff;outline-offset:2px}' +
    '.upf-prefs{display:none;margin:0 0 14px;border-top:1px solid rgba(239,228,210,.1);padding-top:12px}' +
    '.upf-consent.show-prefs .upf-prefs{display:block}' +
    '.upf-pref{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;padding:8px 0}' +
    '.upf-pref strong{display:block;font-weight:600}' +
    '.upf-pref span{color:rgba(239,228,210,.6);font-size:12.5px}' +
    '.upf-pref input{margin-top:4px;width:18px;height:18px;accent-color:#2f4fd1}' +
    '@media (max-width:520px){.upf-consent{left:10px;right:10px;bottom:10px;padding:16px}.upf-consent button{flex:1 1 auto}}';

  function build(existing) {
    if (document.querySelector('.upf-consent')) return document.querySelector('.upf-consent');
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    var box = document.createElement('div');
    box.className = 'upf-consent';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-live', 'polite');
    box.setAttribute('aria-label', 'Cookie preferences');
    var a = existing && existing.analytics ? ' checked' : '';
    var m = existing && existing.marketing ? ' checked' : '';
    box.innerHTML =
      '<h2>Your privacy, your call.</h2>' +
      '<p>We use only essential browser storage to run this site and remember this choice. We do not run advertising trackers. ' +
      'Some content (fonts, scripts, our scheduling partner Calendly when you book) is served by third parties who may see your IP address. ' +
      'Read our <a href="' + POLICY + '">Cookie Policy</a> and <a href="' + PRIVACY + '">Privacy Policy</a>.</p>' +
      '<div class="upf-prefs">' +
      '<label class="upf-pref"><span><strong>Essential</strong><span>Needed for the site to work and to store your consent. Always on.</span></span><input type="checkbox" checked disabled></label>' +
      '<label class="upf-pref"><span><strong>Analytics</strong><span>Anonymous usage measurement. Not in use today; only enabled with your consent.</span></span><input type="checkbox" data-pref="analytics"' + a + '></label>' +
      '<label class="upf-pref"><span><strong>Marketing</strong><span>Advertising or retargeting. Not in use today; only enabled with your consent.</span></span><input type="checkbox" data-pref="marketing"' + m + '></label>' +
      '</div>' +
      '<div class="upf-row">' +
      '<button type="button" class="upf-primary" data-act="all">Accept all</button>' +
      '<button type="button" data-act="essential">Essential only</button>' +
      '<button type="button" data-act="prefs">Preferences</button>' +
      '</div>';
    document.body.appendChild(box);
    box.addEventListener('click', function (e) {
      var act = e.target.closest('[data-act]');
      if (!act) return;
      var kind = act.getAttribute('data-act');
      if (kind === 'prefs') {
        if (box.classList.contains('show-prefs')) {
          save({ analytics: box.querySelector('[data-pref=analytics]').checked, marketing: box.querySelector('[data-pref=marketing]').checked });
          close(box);
        } else {
          box.classList.add('show-prefs');
          act.textContent = 'Save preferences';
        }
        return;
      }
      save(kind === 'all' ? { analytics: true, marketing: true } : {});
      close(box);
    });
    return box;
  }

  function open(existing) {
    var box = build(existing);
    requestAnimationFrame(function () { requestAnimationFrame(function () { box.classList.add('is-open'); }); });
  }

  function close(box) {
    box.classList.remove('is-open');
    setTimeout(function () { box.remove(); }, 600);
  }

  window.upfConsent = { get: read, open: function () { open(read()); } };

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-cookie-settings]')) { e.preventDefault(); open(read()); }
  });

  function init() {
    if (read()) return;
    if (navigator.globalPrivacyControl) { save({}); return; }
    var html = document.documentElement;
    if (html.classList.contains('intro-lock')) {
      new MutationObserver(function (m, obs) {
        if (!html.classList.contains('intro-lock')) { obs.disconnect(); setTimeout(function () { open(null); }, 1400); }
      }).observe(html, { attributes: true, attributeFilter: ['class'] });
    } else {
      setTimeout(function () { open(null); }, 900);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
