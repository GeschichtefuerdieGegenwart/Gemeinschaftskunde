/* Politik-Werkstatt · Bewegung · Muster nach Buchstaben (siehe musterbuch.html). Nur transform und opacity, nie ease-in.
   Schalter »Weniger Bewegung«: html[data-bewegung=weniger]; folgt der Systemeinstellung prefers-reduced-motion. */
(function () {
  'use strict';
  var PW = window.PW = window.PW || {};
  var html = document.documentElement;
  function weniger() { return html.getAttribute('data-bewegung') === 'weniger' || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }
  PW.wenigerBewegung = weniger;
  try { if (PW.lies && PW.lies('bewegung', '') === 'weniger') html.setAttribute('data-bewegung', 'weniger'); } catch (e) {}
  PW.schalteBewegung = function (an) { if (an) html.removeAttribute('data-bewegung'); else html.setAttribute('data-bewegung', 'weniger'); if (PW.merke) PW.merke('bewegung', an ? 'mehr' : 'weniger'); };


  /* R · Aufbauen (aus »Gegenwart«): die eine Leitfrage oder das eine Zitat einer Ansicht erscheint Wort für Wort,
     höchstens 2,4 s, dann steht es. Eine verborgene Kopie steht für Hilfstechnik sofort bereit. Nie Fließtext, nie Bedienelemente. */
  PW.aufbauen = function (el, opt) {
    opt = opt || {};
    if (!el || el.getAttribute('data-aufgebaut')) return;
    el.setAttribute('data-aufgebaut', '1');
    if (weniger() || opt.sofort) return;
    var voll = el.textContent.replace(/\s+/g, ' ').trim();
    if (!voll) return;
    var n = 0;
    function wickeln(knoten) {
      Array.prototype.slice.call(knoten.childNodes).forEach(function (k) {
        if (k.nodeType === 3) {
          var teile = k.nodeValue.split(/(\s+)/), frag = document.createDocumentFragment();
          teile.forEach(function (t) {
            if (!t) return;
            if (/^\s+$/.test(t)) { frag.appendChild(document.createTextNode(t)); return; }
            var w = document.createElement('span'); w.className = 'wort'; w.textContent = t; w.setAttribute('data-i', n++); frag.appendChild(w);
          });
          knoten.replaceChild(frag, k);
        } else if (k.nodeType === 1 && k.childNodes.length) wickeln(k);
      });
    }
    var huelle = document.createElement('span'); huelle.className = 'aufbau-sicht'; huelle.setAttribute('aria-hidden', 'true');
    while (el.firstChild) huelle.appendChild(el.firstChild);
    wickeln(huelle);
    var sr = document.createElement('span'); sr.className = 'sr-only'; sr.textContent = voll;
    el.appendChild(sr); el.appendChild(huelle); el.classList.add('aufbau');
    var gesamt = Math.min(opt.dauer || 2400, 2400), schritt = Math.min(220, Math.max(40, (gesamt - 220) / Math.max(1, n - 1)));
    huelle.querySelectorAll('.wort').forEach(function (w) { w.style.setProperty('--d', Math.round(parseInt(w.getAttribute('data-i'), 10) * schritt) + 'ms'); });
    requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add('ist-da'); }); });
    setTimeout(function () { el.classList.add('ist-fertig'); }, Math.round(n * schritt) + 400);
  };


  /* S · Ansichtswechsel (aus »Gegenwart«): dasselbe Ding von der Karte ins Detail, über View Transitions.
     von: Element vor dem Wechsel · nach: Funktion, die das Gegenstück nach dem Wechsel liefert · tun: der eigentliche Wechsel. */
  PW.ansicht = function (von, nach, tun) {
    if (!document.startViewTransition || weniger()) { tun(); return; }
    var name = 'pw-wechsel';
    if (von) von.style.viewTransitionName = name;
    var t;
    try { t = document.startViewTransition(function () { if (von) von.style.viewTransitionName = ''; tun(); var z = nach && nach(); if (z) z.style.viewTransitionName = name; }); }
    catch (e) { if (von) von.style.viewTransitionName = ''; tun(); return; }
    t.finished.then(function () { var z = nach && nach(); if (z) z.style.viewTransitionName = ''; }).catch(function () {});
  };

  /* A · Kreuz: zeichnet sich beim Tippen (CSS, scaleY). Tastatur: kein Unterschied nötig, 160 ms. */

  /* B · Druckrückmeldung: Knopf rutscht 2 px auf die Platte (CSS :active, 100 ms). */

  /* C · Aufdecken: Deckblatt klappt nach oben weg, einmal je Frage, 360 ms. */
  PW.aufdecken = function (deck, ev) {
    if (deck.classList.contains('ist-offen')) return;
    if (weniger() || (ev && ev.detail === 0)) { deck.style.setProperty('--dauer-aufdecken', '150ms'); }
    deck.classList.add('ist-offen');
    var decke = deck.querySelector('.decke'); if (decke) decke.setAttribute('aria-hidden', 'true');
  };

  /* D · Halbrund füllt sich: Punkte färben sich von links nach rechts, 440 ms, einmal je Ergebnis (in PW.halbrund). */

  /* E · Balken wachsen: scaleX von 0 auf Wert, 440 ms, bei Ergebnis (CSS transition auf transform). */
  PW.balkenWachsen = function (container) {
    var f = container.querySelectorAll('.fuellung');
    if (weniger()) { f.forEach(function (x) { x.style.transform = 'scaleX(' + x.getAttribute('data-wert') + ')'; }); return; }
    f.forEach(function (x) { x.style.transform = 'scaleX(0)'; });
    requestAnimationFrame(function () { requestAnimationFrame(function () { f.forEach(function (x, i) { x.style.transitionDelay = Math.min(i, 8) * 30 + 'ms'; x.style.transform = 'scaleX(' + x.getAttribute('data-wert') + ')'; }); }); });
  };

  /* F · Stempel »Station erledigt«: Kreis im Fortschritt füllt sich mit kurzem Nachdruck (scale 1.15 → 1), 220 ms. */
  PW.stempel = function (li) {
    li.classList.add('ist-fertig');
    if (weniger()) return;
    li.style.transition = 'transform 220ms cubic-bezier(.23,1,.32,1)'; li.style.transform = 'scale(1.12)';
    setTimeout(function () { li.style.transform = ''; }, 230);
  };

  /* G · Zettel wandert in die Urne: der Stimmzettel schrumpft nach unten weg (translateY + scale), 300 ms, einmal je Wahl. */
  PW.inDieUrne = function (zettel, danach) {
    if (weniger()) { zettel.style.opacity = '0'; setTimeout(danach, 150); return; }
    zettel.style.transition = 'transform 300ms cubic-bezier(.77,0,.175,1), opacity 300ms cubic-bezier(.23,1,.32,1)';
    zettel.style.transformOrigin = 'bottom center';
    zettel.style.transform = 'translateY(40px) scale(.92)'; zettel.style.opacity = '0';
    setTimeout(danach, 310);
  };

  /* H · Hürde hebt sich: Balken unter der Hürde werden grau, die Linie rückt, 220 ms (CSS transition auf background/transform). */
})();
