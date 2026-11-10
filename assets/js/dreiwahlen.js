/* Politik-Werkstatt · Muster AK »Drei Menschen, drei Wahlen?« (v11) – induktiver Einstieg zum Political Gender Gap
   Drei Personen: Caja (Frau, 18–24), ein Mitschüler (Mann, 18–24), Cajas Großeltern (70 und älter, Frauen und Männer zusammen).
   Teil 1 (Einstieg, vor Abschnitt 1): tippen, welche Partei vorn lag, und eine Vermutung schreiben – nichts wird aufgedeckt.
   Teil 2 (nach Abschnitt 2): Auflösung mit Balken je Person, eigener Tipp und Vermutung daneben, Vergleichsaufgabe, Streitfrage.
   So nimmt der Einstieg die Datenarbeit in Abschnitt 1 und 2 nicht vorweg.
   Daten: Repräsentative Wahlstatistik 2025 (PW.geschlecht1824, PW.alter). Für Männer bzw. Frauen über 70 getrennt
   liegen in der Werkstatt keine geprüften Zahlen vor – deshalb die Großeltern zusammen, und das steht auch so da.
   Bewegung: Balken wachsen beim Aufdecken (PW.balkenWachsen, scaleX), bei »weniger Bewegung« sofort. */
(function () {
  'use strict';
  var PW = window.PW = window.PW || {};
  var NAMEN = ['CDU/CSU', 'AfD', 'SPD', 'Grüne', 'Linke', 'FDP'];
  var FARBE = { 'CDU/CSU': 'cdu', 'AfD': 'afd', 'SPD': 'spd', 'Grüne': 'gruene', 'Linke': 'linke', 'FDP': 'fdp' };

  function werte(gruppe) {
    var w = {};
    NAMEN.forEach(function (n) {
      if (gruppe === 'frau') w[n] = PW.geschlecht1824.werte[n][0];
      else if (gruppe === 'mann') w[n] = PW.geschlecht1824.werte[n][1];
      else { var a = PW.alter.werte[n]; w[n] = a ? a[a.length - 1] : null; }
    });
    return w;
  }
  /* Figuren im Stil von PW.cajaBild: Karton-Grund, flache Formen, nur Tokens (Hell, Dunkel, Beamer). */
  function kopf(x, y, r, haar, kurz, grau) {
    var h = kurz
      ? '<path d="M' + (x - r) + ' ' + (y - 2) + 'c0-' + (r * .9).toFixed(0) + ' ' + (r * .5).toFixed(0) + '-' + (r * 1.1).toFixed(0) + ' ' + r + '-' + (r * 1.1).toFixed(0) + 's' + r + ' ' + (r * .2).toFixed(0) + ' ' + r + ' ' + (r * 1.1).toFixed(0) + 'z" style="fill:' + haar + '"/>'
      : '<path d="M' + (x - r - 4) + ' ' + (y + 2) + 'c0-' + (r * 1.2).toFixed(0) + ' ' + (r * .6).toFixed(0) + '-' + (r * 1.8).toFixed(0) + ' ' + (r + 4) + '-' + (r * 1.8).toFixed(0) + 's' + (r + 4) + ' ' + (r * .6).toFixed(0) + ' ' + (r + 4) + ' ' + (r * 1.8).toFixed(0) + 'c0 ' + (r * .5).toFixed(0) + '-1 ' + r + '-3 ' + (r * 1.3).toFixed(0) + 'H' + (x - r - 1) + 'c-2-' + (r * .3).toFixed(0) + '-3-' + (r * .8).toFixed(0) + '-3-' + (r * 1.3).toFixed(0) + 'z" style="fill:' + haar + '"/>';
    return h + '<ellipse cx="' + x + '" cy="' + (y + 2) + '" rx="' + (r - 1) + '" ry="' + (r + 2) + '" style="fill:var(--flaeche);stroke:var(--text);stroke-width:2"/>' +
      '<circle cx="' + (x - r / 3).toFixed(1) + '" cy="' + (y + 2) + '" r="1.8" style="fill:var(--text)"/><circle cx="' + (x + r / 3).toFixed(1) + '" cy="' + (y + 2) + '" r="1.8" style="fill:var(--text)"/>' +
      '<path d="M' + (x - 4) + ' ' + (y + r * .65).toFixed(1) + 'c3 2 5 2 8 0" style="fill:none;stroke:var(--text);stroke-width:2;stroke-linecap:round"/>' +
      (grau ? '<path d="M' + (x - r + 2) + ' ' + (y + 1) + 'h' + (r * 2 - 4) + '" style="fill:none;stroke:var(--text);stroke-width:1.5"/>' : '');
  }
  function figur(art) {
    if (art === 'frau' && PW.cajaBild) return PW.cajaBild().replace('class="caja-bild"', 'class="caja-bild dw-bild"');
    var grund = '<rect x="6" y="8" width="84" height="100" style="fill:var(--karton)"/>';
    if (art === 'mann') return '<svg class="dw-bild" viewBox="0 0 96 112" aria-hidden="true">' + grund +
      '<path d="M18 112c2-26 14-38 30-38s28 12 30 38z" style="fill:var(--ton-blau-tief)"/>' +
      '<path d="M40 74h16l-8 10z" style="fill:var(--flaeche)"/>' + kopf(48, 44, 16, 'var(--text)', true) + '</svg>';
    return '<svg class="dw-bild" viewBox="0 0 96 112" aria-hidden="true">' + grund +
      '<path d="M8 112c1-20 9-30 22-30s21 10 22 30z" style="fill:var(--ton-warm-tief)"/>' +
      '<path d="M44 112c1-22 10-32 24-32s23 10 24 32z" style="fill:var(--ton-gruen-tief)"/>' +
      kopf(30, 58, 12, 'var(--stahl)', false, true) + kopf(68, 54, 13, 'var(--stahl)', true, true) + '</svg>';
  }

  var PERSONEN = [
    { id: 'frau', name: 'Caja, 19', wer: 'Frauen von 18 bis 24' },
    { id: 'mann', name: 'Ihr Mitschüler, 19', wer: 'Männer von 18 bis 24' },
    { id: 'alt', name: 'Cajas Großeltern, 74 und 77', wer: '70 Jahre und älter (Frauen und Männer zusammen)' }
  ];
  function lies() { return PW.lies('dreiwahlen', {}) || {}; }

  /* Teil 1 · Einstieg: vermuten, nichts aufdecken. Die Auflösung kommt nach den Daten (Abschnitt 1 und 2), damit der Einstieg nichts vorwegnimmt. */
  PW.dreiWahlen = function (box) {
    if (!box || !PW.geschlecht1824 || !PW.alter) return;
    var st = lies();
    box.textContent = '';
    var raster = PW.el('div', { 'class': 'dw-raster' });
    PERSONEN.forEach(function (p) {
      var k = PW.el('div', { 'class': 'dw-person dw-person--' + p.id });
      k.insertAdjacentHTML('beforeend', figur(p.id));
      k.appendChild(PW.el('h3', { text: p.name }));
      k.appendChild(PW.el('p', { 'class': 'klein dw-wer', text: 'steht für: ' + p.wer }));
      var g = PW.el('div', { 'class': 'dw-tipp', role: 'radiogroup', 'aria-label': 'Welche Partei lag bei ' + p.wer + ' vorn?' });
      g.appendChild(PW.el('p', { 'class': 'klein dw-frage', text: 'Welche Partei lag in dieser Gruppe 2025 vorn?' }));
      NAMEN.forEach(function (n) {
        var inp = PW.el('input', { type: 'radio', name: 'dw-' + p.id, value: n, 'class': 'sr-only' });
        if (st[p.id] === n) inp.checked = true;
        inp.addEventListener('change', function () { var s2 = lies(); s2[p.id] = n; PW.merke('dreiwahlen', s2); stand(); });
        g.appendChild(PW.el('label', {}, [inp, PW.el('span', { text: n })]));
      });
      k.appendChild(g);
      raster.appendChild(k);
    });
    box.appendChild(raster);
    var lab = PW.el('label', { 'for': 'dw-warum', 'class': 'klein vh-label', text: 'Deine Vermutung in einem Satz: Wer von den dreien wählt am stärksten anders – und warum könnte das so sein?' });
    var ta = PW.el('textarea', { id: 'dw-warum', 'class': 'schreibfeld', rows: '2' });
    ta.value = st.warum || '';
    ta.addEventListener('input', function () { var s2 = lies(); s2.warum = ta.value; PW.merke('dreiwahlen', s2); });
    box.appendChild(lab); box.appendChild(ta);
    var hinweis = PW.el('p', { 'class': 'klein', 'aria-live': 'polite', style: 'margin:8px 0 0' });
    box.appendChild(hinweis);
    function stand() {
      var s2 = lies(), n = PERSONEN.filter(function (p) { return s2[p.id]; }).length;
      hinweis.textContent = n < 3 ? 'Noch ' + (3 - n) + ' Tipp' + (3 - n === 1 ? '' : 's') + ' offen. Ein Bauchgefühl reicht.' : 'Alle drei getippt. Aufgelöst wird nach Abschnitt 2 – erst kommen die Zahlen.';
    }
    stand();
  };

  /* Teil 2 · Auflösung nach den Daten: Balken je Person, eigener Tipp daneben, Befund und Streitfrage. */
  PW.dreiWahlenAufloesen = function (box) {
    if (!box || !PW.geschlecht1824 || !PW.alter) return;
    box.textContent = '';
    var knopf = PW.el('button', { type: 'button', 'class': 'knopf knopf--akzent', text: 'Drei Menschen auflösen' });
    var leer = PW.el('p', { 'class': 'klein', 'aria-live': 'polite' });
    box.appendChild(PW.el('p', { 'class': 'knopfzeile' }, [knopf])); box.appendChild(leer);
    var raster = PW.el('div', { 'class': 'dw-raster', hidden: 'hidden' });
    var befund = PW.el('div', { 'class': 'dw-befund', hidden: 'hidden' });
    box.appendChild(raster); box.appendChild(befund);
    function zeige(animiert) {
      var st = lies();
      raster.textContent = ''; raster.hidden = false;
      PERSONEN.forEach(function (p) {
        var w = werte(p.id), max = 0, top = null;
        NAMEN.forEach(function (n) { if (w[n] > max) { max = w[n]; top = n; } });
        var k = PW.el('div', { 'class': 'dw-person dw-person--' + p.id });
        k.insertAdjacentHTML('beforeend', figur(p.id));
        k.appendChild(PW.el('h3', { text: p.name }));
        var tipp = st[p.id];
        k.appendChild(PW.el('p', { 'class': 'klein dw-ergebnis', html: '<strong>Vorn: ' + top + ' mit ' + PW.fmt(max) + ' %.</strong> ' + (!tipp ? 'Du hattest nicht getippt.' : tipp === top ? 'Dein Tipp ' + tipp + ': Passt.' : 'Dein Tipp ' + tipp + ': Passt nicht.') }));
        var b = PW.el('div', { 'class': 'dw-balken' });
        NAMEN.slice().sort(function (a, c) { return w[c] - w[a]; }).forEach(function (n) {
          var pa = PW.partei(FARBE[n]);
          b.appendChild(PW.el('div', { 'class': 'balken dw-zeile' }, [PW.el('span', { text: n }), PW.el('div', { 'class': 'spur' }, [PW.el('div', { 'class': 'fuellung', 'data-wert': (w[n] / 45).toFixed(3), style: 'background:' + (pa ? pa.farbe : 'var(--stahl)') })]), PW.el('span', { 'class': 'zahl', text: PW.fmt(w[n]) + ' %' })]));
        });
        k.appendChild(b);
        raster.appendChild(k);
        if (tipp && PW.notiere) PW.notiere(5, 'dw-' + p.id, tipp === top, 'Wahlverhalten nach Alter und Geschlecht');
        if (animiert && PW.balkenWachsen) PW.balkenWachsen(b); else b.querySelectorAll('.fuellung').forEach(function (f) { f.style.transform = 'scaleX(' + f.getAttribute('data-wert') + ')'; });
      });
      befund.hidden = false;
      befund.innerHTML = (st.warum ? '<p class="dw-eigen"><strong>Deine Vermutung vom Anfang:</strong> <span></span></p>' : '') +
        '<h3>Vergleichen</h3><p><strong>Aufgabe (vergleichen, AFB II):</strong> Liegen die beiden Jungen weiter auseinander – oder die Jungen und die Großeltern? Belege mit zwei Zahlenpaaren. Prüfe dann deine Vermutung vom Anfang.</p>' +
        '<details><summary>Ein Befund zum Vergleichen</summary><p>Zwischen Caja und ihrem Mitschüler liegen bei der Linken fast 20 Punkte (37,1 % zu 17,6 %), bei der AfD rund 13 Punkte (12,6 % zu 25,2 %). Über alle Altersgruppen hinweg sind die Unterschiede zwischen Frauen und Männern viel kleiner (Linke 10,2 % zu 7,3 %, AfD 16,7 % zu 25,1 %). Der größte Abstand zwischen Jung und Alt liegt bei der Union: 41,4 % bei den über 70-Jährigen, 10,4 % bei den jungen Frauen. Kurz: Bei den Jungen trennt das Geschlecht, über alle Wählenden trennt vor allem das Alter.</p></details>' +
        '<div class="dw-welt"><h3>Political Gender Gap: Trend oder Momentaufnahme?</h3>' +
        '<p><strong>Position A:</strong> Die Financial Times (Januar 2024) sah eine »neue globale Kluft«: In Südkorea, den USA, Großbritannien und Deutschland sind junge Frauen in Umfragen deutlich progressiver geworden, junge Männer nicht.</p>' +
        '<p><strong>Position B:</strong> Eine Auswertung der Konrad-Adenauer-Stiftung (Mai 2026) ist vorsichtiger: Bei den Einstellungen junger Frauen und Männer seien die Unterschiede eher moderat; eine wachsende Kluft sei aber nicht auszuschließen.</p>' +
        '<p class="dw-frage-gross"><strong>Streitfrage:</strong> Reicht eine Wahl, um von einem Trend zu sprechen? Was müsste man zusätzlich wissen?</p></div>' +
        '<p class="klein" style="color:var(--leise)">Quellen: Die Bundeswahlleiterin, Repräsentative Wahlstatistik zur Bundestagswahl 2025 (Zweitstimmen nach Geschlecht und Alter); J. Burn-Murdoch, »A new global gender divide is emerging«, Financial Times, 26.01.2024; D. Hirndorf, »Wahlverhalten nach Alter und Geschlecht«, Konrad-Adenauer-Stiftung, Mai 2026. Caja und ihre Familie sind erfunden; sie stehen für ihre Gruppe, nicht für echte Personen. Getrennte Zahlen für Männer und Frauen über 70 nennt die Werkstatt nicht – deshalb stehen die Großeltern für alle über 70-Jährigen.</p>';
      if (st.warum) befund.querySelector('.dw-eigen span').textContent = st.warum;
    }
    knopf.addEventListener('click', function () {
      var st = lies(); st.offen = true; PW.merke('dreiwahlen', st); knopf.hidden = true; leer.textContent = ''; zeige(true);
    });
    if (lies().offen) { knopf.hidden = true; zeige(false); }
  };
})();
