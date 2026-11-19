/* Politik-Werkstatt · Muster AJ »Verhandlungstisch« (v11)
   Nach dem Koalitionsrechner: Für ein gewähltes Bündnis verhandeln die Lernenden die strittigen Streitfragen aus Station 3.
   Je Frage: wessen Position kommt in den Vertrag – oder ein Kompromiss in eigenen Worten – oder ein Prüfauftrag.
   Am Ende steht ein Vertragsentwurf mit Bilanz in Worten (wer sich wo durchsetzt), als Datei zu sichern.
   Die Seite bewertet nicht, ob das Bündnis gut ist (Überwältigungsverbot); Positionen nur mit wörtlichem Beleg aus daten.js. */
(function () {
  'use strict';
  var PW = window.PW = window.PW || {};

  function schluessel(ids) { return 'verhandlung-' + ids.slice().sort().join('-'); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  PW.koalVerhandeln = function (box, ids, sitze) {
    if (!box) return;
    box.textContent = '';
    if (!ids || ids.length < 2) { box.appendChild(PW.el('p', { 'class': 'klein', text: 'Wähle oben ein Bündnis aus mindestens zwei Parteien. Dann verhandelst du hier die strittigen Punkte.' })); return; }
    var summe = 0; ids.forEach(function (id) { summe += sitze[id] || 0; });
    var namen = ids.map(function (id) { return PW.partei(id).name; });
    var n = PW.koalNaehe(ids);
    var key = schluessel(ids), st = PW.lies(key, {}) || {};
    function sichern() { PW.merke(key, st); }

    if (summe < PW.mehrheit) box.appendChild(PW.el('p', { 'class': 'rueck rueck--nein', html: '<strong>Ohne Mehrheit.</strong> ' + esc(namen.join(' + ')) + ' haben nur ' + summe + ' Sitze. Ihr könnt trotzdem üben – eine Regierung entstünde so aber nicht (oder nur als Minderheitsregierung).' }));
    box.appendChild(PW.el('p', { html: 'Ihr verhandelt für <strong>' + esc(namen.join(' + ')) + '</strong>. Worin sich die Partner einig sind, steht schon im Vertrag. Bei jedem strittigen Punkt entscheidet ihr: Wessen Position setzt sich durch – oder findet ihr einen Kompromiss? Begründet jede Entscheidung kurz.' }));

    /* Einig: steht fest */
    var fest = PW.el('div', { 'class': 'vh-fest' }, [PW.el('h4', { text: 'Steht schon im Vertrag (einig)' })]);
    if (n.einig.length) { var ul = PW.el('ul'); n.einig.forEach(function (e) { ul.appendChild(PW.el('li', { text: e.q.frage.replace(/\?$/, '') + ' – ' + e.wert })); }); fest.appendChild(ul); }
    else fest.appendChild(PW.el('p', { 'class': 'klein', text: 'In keiner der vergleichbaren Fragen dieselbe Position.' }));
    box.appendChild(fest);

    /* Strittig: verhandeln */
    var liste = PW.el('ol', { 'class': 'vh-liste' });
    n.strittig.forEach(function (e, i) {
      var q = e.q, wert = st[q.id] || {};
      var li = PW.el('li', { 'class': 'vh-punkt' });
      li.appendChild(PW.el('h4', { text: q.frage }));
      var pos = PW.el('div', { 'class': 'vh-positionen' });
      ids.forEach(function (id) {
        var p = q.pos[id];
        pos.appendChild(PW.el('div', { 'class': 'vh-position' }, [
          PW.el('p', { 'class': 'vh-wer', html: '<span class="vh-kante" style="--vh-kante:' + PW.partei(id).farbe + '"></span><strong>' + esc(PW.partei(id).name) + ':</strong> ' + esc(p[0]) }),
          PW.el('p', { 'class': 'vh-zitat', text: p[1] + (p[2] && p[2] !== '–' ? ' (' + p[2] + ')' : '') })
        ]));
      });
      li.appendChild(pos);
      /* Optionen: je unterschiedliche Position eine, dazu Kompromiss und Prüfauftrag */
      var lager = {}; ids.forEach(function (id) { var w = q.pos[id][0]; (lager[w] = lager[w] || []).push(PW.partei(id).name); });
      var optionen = Object.keys(lager).map(function (w) { return { v: 'pos:' + w, t: '»' + w + '« setzt sich durch (' + lager[w].join(', ') + ')' }; });
      optionen.push({ v: 'kompromiss', t: 'Kompromiss – in eigenen Worten' });
      optionen.push({ v: 'pruefauftrag', t: 'Prüfauftrag: später entscheiden' });
      var gruppe = PW.el('div', { 'class': 'vh-wahl', role: 'radiogroup', 'aria-label': 'Ergebnis der Verhandlung: ' + q.frage });
      var text = PW.el('textarea', { 'class': 'schreibfeld', rows: '2', id: 'vh-' + q.id, 'aria-label': 'Formulierung für den Vertrag und Begründung' });
      text.value = wert.text || '';
      var textLabel = PW.el('label', { 'for': 'vh-' + q.id, 'class': 'klein vh-label' });
      function beschrifte() { textLabel.textContent = wert.v === 'kompromiss' ? 'So steht der Kompromiss im Vertrag (und warum alle zustimmen können):' : 'Kurze Begründung (wer gibt nach, was bekommt diese Partei dafür?):'; }
      optionen.forEach(function (o) {
        var inp = PW.el('input', { type: 'radio', name: 'vh-r-' + q.id, value: o.v, 'class': 'sr-only' });
        if (wert.v === o.v) inp.checked = true;
        inp.addEventListener('change', function () { wert.v = o.v; st[q.id] = wert; sichern(); beschrifte(); bilanz(); });
        gruppe.appendChild(PW.el('label', {}, [inp, PW.el('span', { text: o.t })]));
      });
      text.addEventListener('input', function () { wert.text = text.value; st[q.id] = wert; sichern(); bilanz(); });
      beschrifte();
      li.appendChild(gruppe); li.appendChild(textLabel); li.appendChild(text);
      liste.appendChild(li);
    });
    if (n.strittig.length) { box.appendChild(PW.el('h4', { text: 'Strittig – jetzt verhandeln' })); box.appendChild(liste); }
    else box.appendChild(PW.el('p', { 'class': 'klein', text: 'In den vergleichbaren Fragen gibt es keine Gegensätze. Prüft die Fragen, zu denen ein Programm nichts sagt.' }));

    /* Bilanz */
    var bil = PW.el('div', { 'class': 'vh-bilanz', 'aria-live': 'polite' });
    box.appendChild(bil);
    var knopf = PW.el('button', { type: 'button', 'class': 'knopf', text: 'Vertragsentwurf als Datei sichern' });
    box.appendChild(PW.el('p', { 'class': 'knopfzeile' }, [knopf]));
    box.appendChild(PW.el('p', { 'class': 'klein', style: 'color:var(--leise)', text: 'Die Positionen stammen aus den Wahlprogrammen 2025 (Station 3). Die Seite bewertet nicht, ob euer Vertrag gut ist – das besprecht ihr im Plenum. Vergleicht danach mit dem echten Koalitionsvertrag von Union und SPD (2025).' }));

    function bilanz() {
      var offen = 0, kompr = 0, pruef = 0, durch = {};
      ids.forEach(function (id) { durch[id] = 0; });
      n.strittig.forEach(function (e) {
        var w = st[e.q.id]; if (!w || !w.v) { offen++; return; }
        if (w.v === 'kompromiss') kompr++;
        else if (w.v === 'pruefauftrag') pruef++;
        else { var p = w.v.slice(4); ids.forEach(function (id) { if (e.q.pos[id][0] === p) durch[id]++; }); }
      });
      var teile = ids.map(function (id) { var k = durch[id]; return esc(PW.partei(id).name) + ' setzt sich ' + (k === 0 ? 'in keiner' : k === 1 ? 'in einer' : 'in ' + k) + (k > 1 ? ' strittigen Fragen' : ' strittigen Frage') + ' durch'; });
      bil.innerHTML = n.strittig.length ? (offen ? '<p><strong>Noch offen: ' + offen + ' von ' + n.strittig.length + ' Punkten.</strong></p>' : '<p><strong>Alle Punkte verhandelt.</strong></p>') +
        '<p>' + teile.join(' · ') + (kompr ? ' · ' + kompr + (kompr === 1 ? ' Kompromiss' : ' Kompromisse') : '') + (pruef ? ' · ' + pruef + (pruef === 1 ? ' Prüfauftrag' : ' Prüfaufträge') : '') + '.</p>' +
        (offen ? '' : '<p class="vh-impuls"><strong>Zum Gespräch:</strong> Ist euer Vertrag ausgewogen? Könnten die Mitglieder jeder Partei ihm zustimmen? Was würden ihre Wählerinnen und Wähler sagen – und wer könnte sich verraten fühlen?</p>') : '';
    }
    function alsText() {
      var z = ['Koalitionsvertrag (Entwurf) · ' + namen.join(' + ') + ' · ' + summe + ' von 630 Sitzen', ''];
      z.push('Einig:'); n.einig.forEach(function (e) { z.push('- ' + e.q.frage.replace(/\?$/, '') + ': ' + e.wert); });
      z.push(''); z.push('Verhandelt:');
      n.strittig.forEach(function (e) {
        var w = st[e.q.id] || {};
        var erg = !w.v ? 'noch offen' : w.v === 'kompromiss' ? 'Kompromiss' : w.v === 'pruefauftrag' ? 'Prüfauftrag' : '»' + w.v.slice(4) + '« setzt sich durch';
        z.push('- ' + e.q.frage + ' → ' + erg + (w.text ? ': ' + w.text : ''));
      });
      z.push(''); z.push('Quelle der Positionen: Wahlprogramme 2025 (Politik-Werkstatt, Station 3). Entwurf aus dem Unterricht, keine echte Vereinbarung.');
      return z.join('\n');
    }
    knopf.addEventListener('click', function () {
      try {
        var blob = new Blob([alsText()], { type: 'text/plain;charset=utf-8' });
        var a = PW.el('a', { href: URL.createObjectURL(blob), download: 'Koalitionsvertrag_' + ids.join('-') + '.txt' });
        document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
      } catch (x) { bil.insertAdjacentHTML('beforeend', '<p>Download gesperrt – kopiere den Text: </p><pre class="vh-text"></pre>'); bil.querySelector('.vh-text').textContent = alsText(); }
    });
    bilanz();
  };
})();
