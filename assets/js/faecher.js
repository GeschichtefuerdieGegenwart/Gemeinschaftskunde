/* Politik-Werkstatt · Fächer (Muster I): horizontales Wischen mit Scroll-Snap.
   <div class="faecher" data-label="…"><ul class="faecher-spur"><li>…</li>…</ul></div>
   Ohne JavaScript stehen die Karten untereinander. Kein Autoplay. Tastatur: Pfeile links/rechts, Pos1/Ende.
   Bei »Weniger Bewegung« springt die Spur ohne Gleiten. */
(function () {
  'use strict';
  var PW = window.PW = window.PW || {};
  document.documentElement.classList.add('js'); document.documentElement.classList.remove('no-js');
  function weniger() { return PW.wenigerBewegung ? PW.wenigerBewegung() : false; }

  PW.faecher = function (wurzel) {
    var spur = wurzel.querySelector('.faecher-spur'); if (!spur) return null;
    var karten = Array.prototype.slice.call(spur.children);
    if (karten.length < 2) return null;
    var steuer = PW.el('div', { 'class': 'faecher-steuer' });
    var zurueck = PW.el('button', { type: 'button', 'class': 'faecher-pfeil', 'aria-label': 'Vorherige Karte', html: '&#8592;' });
    var weiter = PW.el('button', { type: 'button', 'class': 'faecher-pfeil', 'aria-label': 'Nächste Karte', html: '&#8594;' });
    var punkte = PW.el('ol', { 'class': 'faecher-punkte', 'aria-hidden': 'true' });
    var stand = PW.el('span', { 'class': 'faecher-stand', 'aria-live': 'polite' });
    karten.forEach(function () { punkte.appendChild(PW.el('li')); });
    steuer.appendChild(zurueck); steuer.appendChild(punkte); steuer.appendChild(stand); steuer.appendChild(weiter);
    wurzel.insertBefore(steuer, spur);
    spur.setAttribute('tabindex', '0'); spur.setAttribute('role', 'group'); spur.setAttribute('aria-roledescription', 'Fächer');
    if (wurzel.getAttribute('data-label')) spur.setAttribute('aria-label', wurzel.getAttribute('data-label'));
    var aktuell = 0, api = {};
    function zeige(i, sofort) {
      i = Math.max(0, Math.min(karten.length - 1, i)); aktuell = i;
      karten.forEach(function (k, j) { k.classList.toggle('ist-mitte', j === i); });
      punkte.querySelectorAll('li').forEach(function (p, j) { p.classList.toggle('ist-mitte', j === i); });
      stand.textContent = (i + 1) + ' / ' + karten.length;
      zurueck.disabled = i === 0; weiter.disabled = i === karten.length - 1;
      var k = karten[i]; var ziel = k.offsetLeft - (spur.clientWidth - k.offsetWidth) / 2;
      try { spur.scrollTo({ left: ziel, behavior: (sofort || weniger()) ? 'auto' : 'smooth' }); } catch (e) { spur.scrollLeft = ziel; }
      wurzel.dispatchEvent(new CustomEvent('faecher:wechsel', { detail: { index: i, karte: k } }));
    }
    zurueck.addEventListener('click', function () { zeige(aktuell - 1); });
    weiter.addEventListener('click', function () { zeige(aktuell + 1); });
    spur.addEventListener('keydown', function (e) {
      if (e.target !== spur && e.target.matches('input,textarea,select')) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); zeige(aktuell + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); zeige(aktuell - 1); }
      else if (e.key === 'Home') { e.preventDefault(); zeige(0); }
      else if (e.key === 'End') { e.preventDefault(); zeige(karten.length - 1); }
    });
    /* Beim Wischen die Mitte bestimmen */
    var timer = null;
    spur.addEventListener('scroll', function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        var mitte = spur.scrollLeft + spur.clientWidth / 2, best = 0, abstand = Infinity;
        karten.forEach(function (k, j) { var d = Math.abs(k.offsetLeft + k.offsetWidth / 2 - mitte); if (d < abstand) { abstand = d; best = j; } });
        if (best !== aktuell) { aktuell = best; karten.forEach(function (k, j) { k.classList.toggle('ist-mitte', j === best); }); punkte.querySelectorAll('li').forEach(function (p, j) { p.classList.toggle('ist-mitte', j === best); }); stand.textContent = (best + 1) + ' / ' + karten.length; zurueck.disabled = best === 0; weiter.disabled = best === karten.length - 1; wurzel.dispatchEvent(new CustomEvent('faecher:wechsel', { detail: { index: best, karte: karten[best] } })); }
      }, 80);
    }, { passive: true });
    /* Tippen auf eine Randkarte holt sie in die Mitte */
    karten.forEach(function (k, j) { k.addEventListener('click', function (e) { if (j !== aktuell && !e.target.closest('input,button,a,label,summary')) zeige(j); }); });
    api.zeige = zeige; api.karten = karten; api.aktuell = function () { return aktuell; };
    zeige(0, true);
    window.addEventListener('resize', function () { zeige(aktuell, true); });
    wurzel.faecher = api;
    return api;
  };
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.faecher:not([data-manuell])').forEach(function (f) { PW.faecher(f); });
  });
})();
