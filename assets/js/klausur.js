/* Politik-Werkstatt · Muster AD »Klausurtraining je Ziel« (v7)
   Je Ziel eine materialgestützte Aufgabe mit Operator. Der Erwartungshorizont öffnet sich erst, wenn ein eigener Text
   von mindestens 40 Wörtern dasteht (Denken vor Klicken). Danach: Haken an den erfüllten Punkten setzen und sich selbst
   einschätzen – Grundlegend, Sicher oder Souverän. Keine Note, keine Punkte; gespeichert nur auf dem Gerät (pw:klausur).
   Material wörtlich aus der Einheit (daten.js), mit Quelle. */
(function () {
  'use strict';
  var PW = window.PW = window.PW || {};
  var MIN = 40;
  var NIVEAU = {
    grundlegend: { name: 'Grundlegend', text: 'Ich gebe die wichtigsten Inhalte richtig wieder und nutze die Fachbegriffe. Begründungen fehlen noch oder bleiben allgemein.' },
    sicher: { name: 'Sicher', text: 'Ich gehe so vor, wie der Operator es verlangt, belege mit dem Material und erkläre die Zusammenhänge.' },
    souveraen: { name: 'Souverän', text: 'Wie »sicher«, dazu wäge ich ab, nenne Grenzen des Materials oder Gegenargumente und komme zu einem eigenen, klar begründeten Ergebnis.' }
  };
  PW.klausurNiveaus = NIVEAU;

  function zitat(id, partei) { var f = (PW.fragen || []).filter(function (x) { return x.id === id; })[0]; return f && f.pos[partei] ? f.pos[partei] : null; }
  function tabelleAlter() {
    var h = '<div class="tab-roll"><table class="raster-tab"><caption>Zweitstimmen nach Alter, Bundestagswahl 2025, in %</caption><thead><tr><th>Partei</th>';
    PW.alter.gruppen.forEach(function (g) { h += '<th class="zahl">' + g + '</th>'; });
    h += '</tr></thead><tbody>';
    Object.keys(PW.alter.werte).forEach(function (n) { h += '<tr><th scope="row">' + n + '</th>'; PW.alter.werte[n].forEach(function (x) { h += '<td class="zahl">' + PW.fmt(x) + '</td>'; }); h += '</tr>'; });
    return h + '</tbody></table></div>';
  }
  function tabelleGeschlecht() {
    var h = '<div class="tab-roll"><table class="raster-tab"><caption>Zweitstimmen nach Geschlecht, alle Altersgruppen, 2025, in %</caption><thead><tr><th>Partei</th><th class="zahl">Frauen</th><th class="zahl">Männer</th></tr></thead><tbody>';
    Object.keys(PW.geschlechtAlle).forEach(function (n) { var w = PW.geschlechtAlle[n]; h += '<tr><th scope="row">' + n + '</th><td class="zahl">' + PW.fmt(w[0]) + '</td><td class="zahl">' + PW.fmt(w[1]) + '</td></tr>'; });
    return h + '</tbody></table></div>';
  }
  function tabelleErgebnis() {
    var namen = { cdu: 'CDU', csu: 'CSU', spd: 'SPD', gruene: 'Grüne', fdp: 'FDP', afd: 'AfD', linke: 'Linke', bsw: 'BSW' };
    var w = PW.ergebnisse.bund.werte, h = '<div class="tab-roll"><table class="raster-tab"><caption>Bundestagswahl 2025: Zweitstimmen und Sitze (630)</caption><thead><tr><th>Partei</th><th class="zahl">Zweitstimmen %</th><th class="zahl">Sitze</th></tr></thead><tbody>';
    ['cdu', 'csu', 'afd', 'spd', 'gruene', 'linke', 'bsw', 'fdp'].forEach(function (id) { var p = PW.partei(id); h += '<tr><th scope="row">' + namen[id] + '</th><td class="zahl">' + PW.fmt(w[id]) + '</td><td class="zahl">' + (p ? p.sitze : '–') + '</td></tr>'; });
    h += '<tr><th scope="row">Sonstige</th><td class="zahl">4,5</td><td class="zahl">1 (SSW)</td></tr>';
    return h + '</tbody></table></div>';
  }

  function aufgaben() {
    var cdu = zitat('mindestlohn', 'cdu'), spd = zitat('mindestlohn', 'spd');
    return [
      { ziel: 1, id: 'ziel1', operator: 'erläutern', afb: 'AFB II',
        opText: 'Einen Sachverhalt mit Beispielen und Fachbegriffen so darstellen, dass Zusammenhänge verständlich werden.',
        aufgabe: 'Erläutern Sie anhand von M1 und M2 zwei Funktionen, die Parteien in der Demokratie erfüllen.',
        material: '<p><strong>M1 · Art. 21 Abs. 1 GG</strong></p><blockquote>»Die Parteien wirken bei der politischen Willensbildung des Volkes mit. Ihre Gründung ist frei. Ihre innere Ordnung muß demokratischen Grundsätzen entsprechen. Sie müssen über die Herkunft und Verwendung ihrer Mittel sowie über ihr Vermögen öffentlich Rechenschaft geben.«</blockquote><p><strong>M2 · Zwei Fälle aus dem Wahljahr 2025</strong></p><ul><li>' + PW.beispiele[0].text + '</li><li>' + PW.beispiele[1].text + '</li></ul>',
        punkte: [
          ['grundlegend', 'Zwei Funktionen richtig benannt, z. B. Interessenartikulation und Interessenaggregation.'],
          ['grundlegend', 'M1 aufgegriffen: Parteien »wirken mit« – sie haben kein Monopol auf die Willensbildung.'],
          ['sicher', 'Jede Funktion an einem Fall aus M2 erklärt: wer was wozu tut (SPD schreibt ein Interesse ins Programm; Union und SPD bündeln in der Koalition unterschiedliche Vorstellungen).'],
          ['sicher', 'Fachbegriffe begründet, nicht nur genannt (»Das ist Aggregation, weil …«).'],
          ['souveraen', 'Grenze benannt: Oft passen zwei Funktionen (z. B. Artikulation und Mobilisierung); beim Mindestlohn schlägt in der Praxis meist die Mindestlohnkommission die Höhe vor.'],
          ['souveraen', 'Bezug zur Demokratie hergestellt: Warum braucht es Parteien, die Interessen bündeln?']
        ], station: 'parteien-wahlen/station1.html' },
      { ziel: 2, id: 'ziel2', operator: 'vergleichen', afb: 'AFB III',
        opText: 'Gemeinsamkeiten und Unterschiede nach Gesichtspunkten herausarbeiten und die dahinterliegenden Grundwerte benennen.',
        aufgabe: 'Vergleichen Sie die Positionen von CDU/CSU und SPD zum gesetzlichen Mindestlohn (M1).',
        material: '<p><strong>M1 · Wahlprogramme 2025 zur Frage »Soll der Mindestlohn per Gesetz auf 15 Euro steigen?«</strong></p><blockquote><strong>CDU/CSU</strong> (' + (cdu ? cdu[2] : '') + '): ' + (cdu ? cdu[1] : '') + '</blockquote><blockquote><strong>SPD</strong> (' + (spd ? spd[2] : '') + '): ' + (spd ? spd[1] : '') + '</blockquote><p class="klein">Quelle: Wahlprogramme 2025 (PDF-Fassungen der Parteien; Seitenzahl der PDF).</p>',
        punkte: [
          ['grundlegend', 'Beide Positionen richtig wiedergegeben: SPD für 15 Euro spätestens 2026, CDU/CSU gegen einen »politischen Mindestlohn«.'],
          ['grundlegend', 'Mit Zitat und Seitenzahl belegt.'],
          ['sicher', 'Gesichtspunkt benannt: Wer soll den Lohn festlegen – Politik oder Sozialpartner (Gewerkschaften und Arbeitgeber)?'],
          ['sicher', 'Gemeinsamkeit herausgearbeitet: Beide setzen einen Mindestlohn voraus; strittig ist, wer über die Höhe entscheidet.'],
          ['souveraen', 'Grundwerte benannt: Gleichheit und soziale Sicherheit (SPD) gegen Tarifautonomie und Freiheit des Marktes (CDU/CSU).'],
          ['souveraen', 'Ohne eigene Wertung verglichen; eine eigene Meinung höchstens deutlich getrennt am Schluss.']
        ], station: 'parteien-wahlen/station3.html' },
      { ziel: 3, id: 'ziel3', operator: 'analysieren', afb: 'AFB II',
        opText: 'Material nach Gesichtspunkten erschließen: Aussagen herausarbeiten, Zusammenhänge erklären, Zahlen richtig lesen.',
        aufgabe: 'Analysieren Sie mithilfe von M1, wie sich die 5-%-Hürde auf die Zusammensetzung des Bundestages 2025 ausgewirkt hat.',
        material: '<p><strong>M1 · Ergebnis der Bundestagswahl 2025</strong></p>' + tabelleErgebnis() + '<p class="klein">Quelle: Bundeswahlleiterin, endgültiges Ergebnis. Der SSW ist als Partei einer nationalen Minderheit von der Hürde befreit. Mehrheit ab 316 Sitzen.</p>',
        punkte: [
          ['grundlegend', 'Erkannt: BSW (4,98 %) und FDP (4,3 %) bekommen keinen Sitz, weil sie unter 5 % liegen.'],
          ['grundlegend', 'Fachbegriffe richtig: Zweitstimme, 5-%-Hürde, Sitzverteilung.'],
          ['sicher', 'Folge erklärt: Die Stimmen unter der Hürde fallen weg; die übrigen Parteien erhalten anteilig mehr Sitze, als ihr Stimmenanteil allein ergäbe.'],
          ['sicher', 'Mehrheit gerechnet: Union (208) und SPD (120) haben zusammen 328 Sitze – mehr als 316.'],
          ['souveraen', 'Gezeigt, dass der Ausgang knapp war: Mit 0,02 Prozentpunkten mehr wäre das BSW eingezogen; die Mehrheit von Union und SPD hätte dann womöglich nicht gereicht (im Sitzrechner prüfbar).'],
          ['souveraen', 'Ausnahmen genannt: SSW befreit; Grundmandatsklausel (drei Direktmandate).']
        ], station: 'parteien-wahlen/station4.html' },
      { ziel: 4, id: 'ziel4', operator: 'beurteilen', afb: 'AFB III',
        opText: 'Den Stellenwert eines Sachverhalts kriterienorientiert prüfen und zu einem begründeten Sachurteil kommen.',
        aufgabe: 'Beurteilen Sie auf Grundlage von M1 und M2 die These: »Bei der Bundestagswahl 2025 hat das Alter die Wahlentscheidung stärker geprägt als das Geschlecht.«',
        material: '<p><strong>M1 · Wahlverhalten nach Alter</strong></p>' + tabelleAlter() + '<p><strong>M2 · Wahlverhalten nach Geschlecht</strong></p>' + tabelleGeschlecht() + '<p class="klein">Quelle: Bundeswahlleiterin, Repräsentative Wahlstatistik 2025. »Männer« schließt in der amtlichen Statistik »divers« und »ohne Angabe« ein.</p>',
        punkte: [
          ['grundlegend', 'Zentrale Befunde richtig gelesen: Linke 27,3 % bei 18–24, 4,5 % bei 70+; CDU/CSU 13,0 % gegenüber 41,4 %.'],
          ['grundlegend', 'Unterschiede nach Geschlecht benannt: AfD Frauen 16,7 %, Männer 25,1 %.'],
          ['sicher', 'Kriterium gewählt und angewandt, z. B. Größe der Unterschiede in Prozentpunkten: nach Alter bis zu 28 Punkte (CDU/CSU), nach Geschlecht bis zu 8 Punkte (AfD).'],
          ['sicher', 'Zu einem Sachurteil gekommen, das aus den Zahlen folgt: Die These trifft für 2025 eher zu.'],
          ['souveraen', 'Einschränkung erkannt: Bei den 18- bis 24-Jährigen ist der Unterschied nach Geschlecht sehr groß (Linke 37,1 % zu 17,6 %); Alter und Geschlecht wirken zusammen.'],
          ['souveraen', 'Grenzen des Materials benannt: Statistik zeigt Zusammenhänge, keine Ursachen; eine Wahl ist eine Momentaufnahme.']
        ], station: 'parteien-wahlen/station5.html' }
    ];
  }
  PW.klausurAufgaben = aufgaben;

  function woerter(t) { return (String(t).trim().match(/\S+/g) || []).length; }

  PW.klausurtraining = function (box) {
    if (!box) return;
    var st = PW.lies('klausur', null) || {};
    function sichern() { PW.merke('klausur', st); }
    aufgaben().forEach(function (a) {
      var s = st[a.id] = st[a.id] || { text: '', offen: false, haken: [], niveau: '' };
      var sec = PW.el('section', { 'class': 'klausur', id: a.id, 'aria-labelledby': a.id + '-t' });
      sec.appendChild(PW.el('p', { 'class': 'klausur-kopf', html: 'Ziel ' + a.ziel + ' · Operator <strong>' + a.operator + '</strong> · ' + a.afb }));
      sec.appendChild(PW.el('h2', { id: a.id + '-t', text: a.aufgabe }));
      sec.appendChild(PW.el('p', { 'class': 'klausur-op', html: '<strong>' + a.operator.charAt(0).toUpperCase() + a.operator.slice(1) + ' heißt:</strong> ' + a.opText }));
      sec.appendChild(PW.el('div', { 'class': 'klausur-material', html: a.material }));
      var feldId = a.id + '-text';
      var t = PW.el('textarea', { id: feldId, 'class': 'schreibfeld klausur-text', rows: '9' }); t.value = s.text;
      var zaehl = PW.el('p', { 'class': 'klausur-zaehl', 'aria-live': 'polite' });
      var knopf = PW.el('button', { type: 'button', 'class': 'knopf knopf--akzent', text: 'Erwartungshorizont zeigen' });
      sec.appendChild(PW.el('label', { 'for': feldId, 'class': 'klausur-label', text: 'Dein Text' }));
      sec.appendChild(t); sec.appendChild(zaehl);
      sec.appendChild(PW.el('p', { 'class': 'knopfzeile' }, [knopf, PW.el('a', { 'class': 'knopf knopf--leise', href: a.station, text: 'Zur passenden Station' })]));

      var eh = PW.el('div', { 'class': 'klausur-eh', hidden: 'hidden' });
      eh.appendChild(PW.el('h3', { text: 'Erwartungshorizont' }));
      eh.appendChild(PW.el('p', { 'class': 'klein', text: 'Lies deinen Text Punkt für Punkt gegen. Setze einen Haken nur, wenn der Punkt wirklich in deinem Text steht – sinngemäß reicht.' }));
      ['grundlegend', 'sicher', 'souveraen'].forEach(function (nv) {
        var g = PW.el('fieldset', { 'class': 'klausur-gruppe klausur-gruppe--' + nv }, [PW.el('legend', { text: NIVEAU[nv].name })]);
        a.punkte.forEach(function (p, i) {
          if (p[0] !== nv) return;
          var cb = PW.el('input', { type: 'checkbox' }); cb.checked = s.haken.indexOf(i) >= 0;
          cb.addEventListener('change', function () { var k = s.haken.indexOf(i); if (cb.checked && k < 0) s.haken.push(i); if (!cb.checked && k >= 0) s.haken.splice(k, 1); sichern(); vorschlag(); });
          g.appendChild(PW.el('label', { 'class': 'klausur-punkt' }, [cb, PW.el('span', { text: p[1] })]));
        });
        eh.appendChild(g);
      });
      var hinweis = PW.el('p', { 'class': 'klausur-vorschlag', 'aria-live': 'polite' });
      eh.appendChild(PW.el('h3', { text: 'Wo stehst du?' }));
      eh.appendChild(hinweis);
      var wahl = PW.el('div', { 'class': 'klausur-niveau', role: 'radiogroup', 'aria-label': 'Selbsteinschätzung' });
      Object.keys(NIVEAU).forEach(function (k) {
        var inp = PW.el('input', { type: 'radio', name: a.id + '-niveau', value: k, 'class': 'sr-only' }); inp.checked = s.niveau === k;
        inp.addEventListener('change', function () { s.niveau = k; sichern(); });
        wahl.appendChild(PW.el('label', {}, [inp, PW.el('span', { html: '<b>' + NIVEAU[k].name + '</b>' + NIVEAU[k].text })]));
      });
      eh.appendChild(wahl);
      eh.appendChild(PW.el('p', { 'class': 'klein', style: 'color:var(--leise)', text: 'Das ist deine eigene Einschätzung, keine Note. Verbessere den Text oben und schätze dich danach noch einmal ein.' }));
      sec.appendChild(eh);

      function vorschlag() {
        var hat = { grundlegend: 0, sicher: 0, souveraen: 0 }, alle = { grundlegend: 0, sicher: 0, souveraen: 0 };
        a.punkte.forEach(function (p, i) { alle[p[0]]++; if (s.haken.indexOf(i) >= 0) hat[p[0]]++; });
        var nv = hat.grundlegend < alle.grundlegend ? '' : hat.sicher < alle.sicher ? 'Grundlegend' : hat.souveraen < alle.souveraen ? 'Sicher' : 'Souverän';
        hinweis.textContent = nv ? 'Nach deinen Haken spricht viel für »' + nv + '«. Du entscheidest selbst.' : 'Noch nicht alle grundlegenden Punkte erfüllt. Ergänze sie zuerst – sie tragen alles Weitere.';
      }
      function pruefe() {
        var n = woerter(t.value);
        var frei = n >= MIN || s.offen;
        knopf.disabled = !frei; knopf.setAttribute('aria-disabled', frei ? 'false' : 'true');
        zaehl.textContent = s.offen ? n + ' Wörter.' : (n >= MIN ? n + ' Wörter. Jetzt kannst du vergleichen.' : n + ' von mindestens ' + MIN + ' Wörtern. Erst schreiben, dann vergleichen.');
      }
      t.addEventListener('input', function () { s.text = t.value; sichern(); pruefe(); });
      knopf.addEventListener('click', function () {
        if (woerter(t.value) < MIN && !s.offen) return;
        s.offen = true; sichern(); eh.hidden = false; knopf.hidden = true; pruefe(); vorschlag();
        eh.querySelector('h3').setAttribute('tabindex', '-1'); eh.querySelector('h3').focus();
      });
      if (s.offen) { eh.hidden = false; knopf.hidden = true; vorschlag(); }
      pruefe();
      box.appendChild(sec);
    });
    sichern();
  };
})();
