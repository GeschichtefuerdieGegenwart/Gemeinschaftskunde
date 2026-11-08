/* Politik-Werkstatt · Muster AF »Erst erinnern« (v8)
   Zu Beginn jeder Station drei Fragen zur vorigen – zuerst ohne Gerät: im Kopf, auf dem Zettel oder zu zweit.
   Die Antwort deckt man erst auf, wenn man es versucht hat; danach schätzt man sich in Worten ein.
   Hintergrund: Abrufübungen festigen Wissen (Papierprobe: »Was bleibt ohne Gerät?«). Keine Punkte, nur auf diesem Gerät. */
(function () {
  'use strict';
  var PW = window.PW = window.PW || {};
  var WORTE = { ja: 'gewusst', teils: 'zum Teil', nein: 'noch nicht' };
  PW.abrufZeigen = function (box, station) {
    if (!box || !PW.abruf || !PW.abruf[station]) return;
    var key = 'abruf-st' + station, st = PW.lies(key, {}) || {};
    box.textContent = '';
    box.appendChild(PW.el('h2', { text: 'Erst erinnern' }));
    box.appendChild(PW.el('p', { html: 'Drei Fragen zur letzten Station. <strong>Leg das Tablet kurz weg</strong> und beantworte sie im Kopf, auf einem Zettel oder zu zweit. Erst dann deckst du auf.' }));
    var ol = PW.el('ol', { 'class': 'abruf-liste' });
    PW.abruf[station].forEach(function (f, i) {
      var li = PW.el('li', { 'class': 'abruf-frage' });
      li.appendChild(PW.el('p', { 'class': 'abruf-text', text: f[0] }));
      var auf = PW.el('button', { type: 'button', 'class': 'knopf knopf--leise', 'aria-expanded': 'false', text: 'Antwort aufdecken' });
      var antwort = PW.el('div', { 'class': 'abruf-antwort', hidden: 'hidden' });
      antwort.appendChild(PW.el('p', { text: f[1] }));
      var wahl = PW.el('div', { 'class': 'abruf-wahl', role: 'group', 'aria-label': 'Wie gut wusstest du es?' });
      var stand = PW.el('p', { 'class': 'klein abruf-stand', 'aria-live': 'polite' });
      Object.keys(WORTE).forEach(function (k) {
        var b = PW.el('button', { type: 'button', 'class': 'knopf knopf--leise', 'aria-pressed': st[i] === k ? 'true' : 'false', text: WORTE[k] });
        b.addEventListener('click', function () { st[i] = k; PW.merke(key, st); wahl.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); }); stand.textContent = k === 'ja' ? 'Gut – das sitzt.' : 'Merk dir die Frage: Sie lohnt sich zur Wiederholung, zum Beispiel mit den Wendekarten.'; });
        wahl.appendChild(b);
      });
      antwort.appendChild(PW.el('p', { 'class': 'klein abruf-label', text: 'Wie gut wusstest du es?' }));
      antwort.appendChild(wahl); antwort.appendChild(stand);
      auf.addEventListener('click', function () { antwort.hidden = false; auf.hidden = true; auf.setAttribute('aria-expanded', 'true'); });
      if (st[i]) { antwort.hidden = false; auf.hidden = true; }
      li.appendChild(auf); li.appendChild(antwort); ol.appendChild(li);
    });
    box.appendChild(ol);
  };
})();
