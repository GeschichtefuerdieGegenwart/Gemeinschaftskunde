/* Politik-Werkstatt · Muster AH »Parteikarten mit Ansichtswechsel« (v9)
   Bewegung als Lernmittel (Form »Ansichtswechsel«): dasselbe Ding von der Übersicht ins Detail verfolgen.
   Karte antippen → wächst über document.startViewTransition() mit gleichem view-transition-name zur Detailansicht (300 ms, ease-out);
   Schließen schrumpft zurück, der Fokus kehrt auf die Karte zurück. Ohne Unterstützung oder bei »weniger Bewegung«: sofortiger Wechsel
   (Static Grid Rule, über PW.ansicht). Inhalte nur aus daten.js (PW.zeitBahnen, PW.zeitEreignisse); Parteifarbe nur als Kante
   neben dem Namen (Ballot-Colour Rule). */
(function () {
  'use strict';
  var PW = window.PW = window.PW || {};
  PW.parteiKarten = function (box) {
    if (!box || !PW.zeitBahnen || !PW.zeitEreignisse) return;
    box.textContent = '';
    var raster = PW.el('ul', { 'class': 'pk-raster', 'aria-label': 'Parteien nach Gründungsjahr' });
    var detail = PW.el('div', { 'class': 'pk-detail-platz', hidden: 'hidden' });
    var karten = {};
    var bahnen = PW.zeitBahnen.slice().sort(function (a, b) { return a.von[0][0] - b.von[0][0]; });
    function ereignisse(id) { return PW.zeitEreignisse.filter(function (e) { return e.bahn === id; }); }
    bahnen.forEach(function (b) {
      var ev = ereignisse(b.id);
      var k = PW.el('button', { type: 'button', 'class': 'pk-karte', 'aria-haspopup': 'dialog', 'aria-label': b.name + ', ' + b.seit + ': Details öffnen' }, [
        PW.el('span', { 'class': 'pk-jahr', text: String(b.von[0][0]) }),
        PW.el('span', { 'class': 'pk-name', style: '--pk-kante:' + b.farbe, text: b.name }),
        PW.el('span', { 'class': 'pk-kurz', text: ev.length ? ev[0].t : b.seit })
      ]);
      k.addEventListener('click', function () { oeffne(b, k); });
      karten[b.id] = k;
      raster.appendChild(PW.el('li', {}, [k]));
    });
    box.appendChild(raster); box.appendChild(detail);
    var offen = null;
    function baueDetail(b) {
      detail.textContent = '';
      var d = PW.el('section', { 'class': 'pk-detail', role: 'dialog', 'aria-modal': 'false', 'aria-labelledby': 'pk-titel' });
      var kopf = PW.el('div', { 'class': 'pk-detail-kopf' }, [
        PW.el('span', { 'class': 'pk-jahr pk-jahr--gross', text: String(b.von[0][0]) }),
        PW.el('h3', { id: 'pk-titel', 'class': 'pk-name', style: '--pk-kante:' + b.farbe, tabindex: '-1', text: b.name })
      ]);
      d.appendChild(kopf);
      d.appendChild(PW.el('p', { 'class': 'pk-seit', text: b.seit.charAt(0).toUpperCase() + b.seit.slice(1) + (b.von.length > 1 ? ' · nicht erlaubt ' + b.von[0][1] + '–' + b.von[1][0] : '') }));
      var ol = PW.el('ol', { 'class': 'pk-ereignisse' });
      ereignisse(b.id).forEach(function (e) { ol.appendChild(PW.el('li', {}, [PW.el('b', { text: e.j + ' · ' + e.t }), PW.el('span', { text: e.d })])); });
      d.appendChild(ol);
      d.appendChild(PW.el('p', { 'class': 'pk-sitze', html: '<strong>Bundestag 2025:</strong> ' + b.sitze + (b.sitze === 1 ? ' Sitz' : ' Sitze') + (b.sitze === 0 ? ' – an der 5-%-Hürde gescheitert' : '') }));
      d.appendChild(PW.el('p', { 'class': 'pk-impuls', text: 'Denkanstoß: Welche Ereignisse im Zeitstrahl darunter gehören zu dieser Partei? Was war damals in Deutschland los?' }));
      d.appendChild(PW.el('p', { 'class': 'klein pk-quelle', text: 'Quellen: Bundeszentrale für politische Bildung, LeMO (Deutsches Historisches Museum), Bundeswahlleiterin (Sitze 2025).' }));
      var zu = PW.el('button', { type: 'button', 'class': 'knopf', text: 'Zurück zur Übersicht' });
      zu.addEventListener('click', schliesse);
      d.appendChild(zu);
      detail.appendChild(d);
      return d;
    }
    function oeffne(b, k) {
      if (offen) return;
      offen = { b: b, k: k };
      PW.ansicht(k, function () { return detail.querySelector('.pk-detail'); }, function () {
        baueDetail(b); detail.hidden = false; raster.classList.add('ist-zu'); k.classList.add('ist-weg');
        var h = document.getElementById('pk-titel'); if (h) h.focus({ preventScroll: true });
      });
    }
    function schliesse() {
      if (!offen) return;
      var k = offen.k; offen = null;
      PW.ansicht(detail.querySelector('.pk-detail'), function () { return k; }, function () {
        detail.hidden = true; detail.textContent = ''; raster.classList.remove('ist-zu'); k.classList.remove('ist-weg');
        k.focus({ preventScroll: true });
      });
    }
    box.addEventListener('keydown', function (e) { if (e.key === 'Escape' && offen) { e.preventDefault(); schliesse(); } });
  };
})();
