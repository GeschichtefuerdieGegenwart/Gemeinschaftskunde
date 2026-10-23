/* Politik-Werkstatt · Klassenwahl ohne Medienbruch (Muster P).
   Zwei Wege, beide ohne Server, ohne Anmeldung, ohne Daten an Dritte:
   1) Urnen-Modus: Ein Gerät wird zur Wahlurne. Die Lernenden geben nacheinander ab, die Seite zählt aus.
      Gespeichert werden nur Summen je Partei – keine Namen, keine Reihenfolge, kein Zeitstempel.
   2) Einfüge-Import: Ergebnisse aus Menti, einer Moodle-Abstimmung oder einer Strichliste werden als Text eingefügt
      und erkannt (»CDU 7«, »CDU;7«, »CDU: 7 Stimmen«).
   Eine Live-Übernahme aus Menti ist in einer statischen Seite nicht möglich: Menti bietet dafür keine offene Schnittstelle,
   und ohne Server kann eine Seite keine Eingaben mehrerer Geräte zusammenführen. Das steht so auch auf der Seite. */
(function () {
  'use strict';
  var PW = window.PW = window.PW || {};
  var IDS = ['cdu', 'csu', 'spd', 'gruene', 'fdp', 'afd', 'linke', 'bsw'];

  PW.urneIds = IDS;
  PW.urneLies = function () { return PW.lies('urne', null); };
  PW.urneSumme = function (z) { var s = 0; IDS.forEach(function (id) { s += (z && z[id]) || 0; }); return s; };
  /* Alle Stimmen inklusive der kleinen Listen; sonst = Stimmen für Listen außerhalb der acht Profile */
  PW.urneSummeAlle = function (z) {
    var gesamt = 0, sonst = 0;
    Object.keys(z || {}).forEach(function (k) { gesamt += z[k]; if (IDS.indexOf(k) < 0) sonst += z[k]; });
    return { gesamt: gesamt, sonst: sonst };
  };
  PW.listenName = function (pid) {
    var l = (PW.wahlkreis.listen || []).filter(function (x) { return x.pid === pid; })[0];
    if (l) return l.name;
    var p = PW.partei(pid); return p ? p.name : pid;
  };

  /* Stimmen in Prozent umrechnen und als Klassenergebnis ablegen */
  PW.urneUebernehmen = function (zweit) {
    var alle = PW.urneSummeAlle(zweit);
    if (!alle.gesamt) return null;
    var proz = {};
    IDS.forEach(function (id) { proz[id] = Math.round((zweit[id] || 0) / alle.gesamt * 1000) / 10; });
    PW.merke('klasse', proz);
    return proz;
  };

  /* Text aus Menti, Moodle oder Strichliste erkennen: Zeilen mit Parteiname und Zahl */
  PW.urneAusText = function (text) {
    var muster = [
      ['cdu', /\b(cdu|union|cdu\/csu)\b/i], ['csu', /\bcsu\b/i], ['spd', /\bspd\b/i],
      ['gruene', /(gr(ü|ue)ne|b(ü|ue)ndnis\s*90)/i], ['fdp', /\bfdp\b/i], ['afd', /\bafd\b/i],
      ['linke', /(die\s*linke|^linke|\blinke\b)/i], ['bsw', /\bbsw\b/i]
    ];
    var gefunden = {}, zeilen = String(text || '').split(/[\n\r;]+/);
    zeilen.forEach(function (z) {
      var zahl = z.match(/(\d+(?:[.,]\d+)?)/);
      if (!zahl) return;
      var wert = parseFloat(zahl[1].replace(',', '.'));
      for (var i = 0; i < muster.length; i++) {
        if (muster[i][1].test(z)) {
          var id = muster[i][0];
          if (id === 'cdu' && /csu/i.test(z) && !/cdu/i.test(z)) id = 'csu';
          if (gefunden[id] === undefined) gefunden[id] = wert;
          break;
        }
      }
    });
    return Object.keys(gefunden).length ? gefunden : null;
  };

  /* Urnen-Modus: der amtliche Stimmzettel des Wahlkreises 260 auf dem Lehrkraftgerät.
     Die Lernenden kommen nach vorn, kreuzen Erst- und Zweitstimme an und werfen den Zettel ein.
     Gezählt werden nur Summen je Kandidat und je Liste – keine Namen, keine Reihenfolge, keine Uhrzeit. */
  PW.urne = function (container, fertig) {
    var erst = {}, zweit = {}, abgegeben = 0;
    var alt = PW.lies('klasse-stimmen', null);
    if (alt && alt.zweit) { erst = alt.erst || {}; zweit = alt.zweit; abgegeben = alt.summe || 0; }
    else if (alt && alt.zaehler) { zweit = alt.zaehler; abgegeben = alt.summe || PW.urneSumme(alt.zaehler); }

    var stand = PW.el('p', { 'class': 'urne-stand', 'aria-live': 'polite' });
    var hinweis = PW.el('p', { 'class': 'klein', style: 'color:var(--leise)' });

    /* Stimmzettel aufbauen – gleiche Form wie im Reiter »Stimmzettel« */
    var zettel = PW.el('div', { 'class': 'zettel urne-zettel' });
    zettel.appendChild(PW.el('div', { 'class': 'zettel-kopf', html: '<h3 style="margin:0">Stimmzettel</h3><p class="klein" style="margin:0">für die Wahl zum Deutschen Bundestag im Wahlkreis 260 Böblingen · <strong>Sie haben 2 Stimmen</strong></p>' }));
    var spalten = PW.el('div', { 'class': 'spalten' });
    var sErst = PW.el('div', { 'class': 'spalte spalte--erst' }, [PW.el('h4', { text: 'Erststimme · eine Person' })]);
    var ulErst = PW.el('ul', { 'class': 'optionen' });
    PW.wahlkreis.kandidierende.forEach(function (k) {
      var inp = PW.el('input', { type: 'radio', name: 'urne-erst', value: String(k.nr) });
      ulErst.appendChild(PW.el('label', { 'class': 'opt' }, [inp, PW.el('span', { 'class': 'kreis', 'aria-hidden': 'true' }),
        PW.el('span', { html: '<span class="nr">' + k.nr + '</span><strong>' + k.name + '</strong><span class="klein">' + k.partei + '</span>' })]));
    });
    sErst.appendChild(ulErst);
    var sZweit = PW.el('div', { 'class': 'spalte spalte--zweit' }, [PW.el('h4', { text: 'Zweitstimme · eine Landesliste' })]);
    var ulZweit = PW.el('ul', { 'class': 'optionen' });
    PW.wahlkreis.listen.forEach(function (l) {
      var inp = PW.el('input', { type: 'radio', name: 'urne-zweit', value: l.pid });
      ulZweit.appendChild(PW.el('label', { 'class': 'opt' }, [inp, PW.el('span', { 'class': 'kreis', 'aria-hidden': 'true' }),
        PW.el('span', { html: '<span class="nr">' + l.nr + '</span><strong>' + l.name + '</strong>' })]));
    });
    sZweit.appendChild(ulZweit);
    spalten.appendChild(sErst); spalten.appendChild(sZweit);
    zettel.appendChild(spalten);

    var einwerfen = PW.el('button', { type: 'button', 'class': 'knopf knopf--akzent knopf--gross', text: 'Stimmzettel einwerfen' });
    var fehler = PW.el('div', { 'class': 'rueck', 'aria-live': 'polite' });
    var wahlteil = PW.el('div', {}, [zettel, PW.el('p', { 'class': 'knopfzeile knopfzeile--mitte' }, [einwerfen]), fehler]);

    var danke = PW.el('div', { 'class': 'urne-danke', hidden: 'hidden' }, [
      PW.el('p', { 'class': 'gross', text: 'Stimmzettel in der Urne.' }),
      PW.el('p', { 'class': 'klein', text: 'Niemand sieht, wer was gewählt hat: Gezählt werden nur Summen. Bitte die nächste Person nach vorn bitten.' })
    ]);
    var weiter = PW.el('button', { type: 'button', 'class': 'knopf knopf--akzent knopf--gross', text: 'Nächste Person' });
    danke.appendChild(weiter);

    function zeige() {
      stand.textContent = abgegeben + ' Stimmzettel in der Urne';
      hinweis.textContent = 'Gezählt werden nur Summen je Kandidatin, Kandidat und Liste. Es wird nicht gespeichert, wer wann gewählt hat.';
    }
    function leeren() {
      zettel.querySelectorAll('input').forEach(function (i) { i.checked = false; });
      fehler.className = 'rueck'; fehler.textContent = '';
    }
    einwerfen.addEventListener('click', function () {
      var e = zettel.querySelector('input[name=urne-erst]:checked');
      var z = zettel.querySelector('input[name=urne-zweit]:checked');
      if (!e && !z) { fehler.className = 'rueck rueck--nein'; fehler.textContent = 'Der Zettel ist leer. Ein leerer Stimmzettel wäre ungültig – kreuze mindestens eine Stimme an.'; return; }
      if (e) erst[e.value] = (erst[e.value] || 0) + 1;
      if (z) zweit[z.value] = (zweit[z.value] || 0) + 1;
      abgegeben++;
      PW.merke('klasse-stimmen', { erst: erst, zweit: zweit, summe: abgegeben });
      var fertigMachen = function () { wahlteil.hidden = true; danke.hidden = false; leeren(); zeige(); weiter.focus(); };
      if (PW.inDieUrne) PW.inDieUrne(zettel, function () { zettel.style.cssText = ''; fertigMachen(); });
      else fertigMachen();
    });
    weiter.addEventListener('click', function () { danke.hidden = true; wahlteil.hidden = false; zettel.scrollIntoView({ block: 'start', behavior: PW.wenigerBewegung && PW.wenigerBewegung() ? 'auto' : 'smooth' }); });

    var auswerten = PW.el('button', { type: 'button', 'class': 'knopf knopf--voll', text: 'Auszählen und übernehmen' });
    var zuruecksetzen = PW.el('button', { type: 'button', 'class': 'knopf knopf--leise', text: 'Urne leeren' });
    var ergebnis = PW.el('div', { 'class': 'rueck', 'aria-live': 'polite' });
    auswerten.addEventListener('click', function () {
      var proz = PW.urneUebernehmen(zweit);
      if (!proz) { ergebnis.className = 'rueck rueck--nein'; ergebnis.textContent = 'In der Urne liegt noch keine Zweitstimme.'; return; }
      var zSumme = PW.urneSummeAlle(zweit);
      var text = '<strong>Ausgezählt: ' + abgegeben + ' Stimmzettel.</strong><br><strong>Zweitstimmen:</strong> ' +
        Object.keys(zweit).filter(function (k) { return zweit[k]; }).sort(function (a, b) { return zweit[b] - zweit[a]; })
          .map(function (k) { return PW.listenName(k) + ' ' + zweit[k]; }).join(' · ');
      var eSumme = 0; Object.keys(erst).forEach(function (k) { eSumme += erst[k]; });
      if (eSumme) {
        var best = Object.keys(erst).sort(function (a, b) { return erst[b] - erst[a]; })[0];
        var k = PW.wahlkreis.kandidierende.filter(function (x) { return String(x.nr) === String(best); })[0];
        text += '<br><strong>Erststimmen:</strong> ' + Object.keys(erst).sort(function (a, b) { return erst[b] - erst[a]; })
          .map(function (n) { var kk = PW.wahlkreis.kandidierende.filter(function (x) { return String(x.nr) === String(n); })[0]; return (kk ? kk.name : n) + ' ' + erst[n]; }).join(' · ') +
          '<br>Das Direktmandat der Klasse ginge an <strong>' + (k ? k.name + ' (' + k.partei + ')' : '—') + '</strong>. 2025 gewann es Marc Biadacz (CDU) mit 37,3 %.';
      }
      ergebnis.className = 'rueck rueck--gut';
      ergebnis.innerHTML = text + '<span class="beleg">Die Zweitstimmen stehen jetzt im Reiter »Sitzrechner« und im »Abgleich« bereit' + (zSumme.sonst ? ' (' + zSumme.sonst + (zSumme.sonst === 1 ? ' Stimme' : ' Stimmen') + ' für kleine Parteien zählt dort als »Sonstige«)' : '') + '.</span>';
      if (fertig) fertig(proz);
    });
    zuruecksetzen.addEventListener('click', function () {
      if (!confirm('Alle Stimmzettel in der Urne löschen?')) return;
      erst = {}; zweit = {}; abgegeben = 0; try { localStorage.removeItem('pw:klasse-stimmen'); } catch (e) {}
      leeren(); zeige(); ergebnis.className = 'rueck'; ergebnis.textContent = '';
    });

    container.appendChild(stand);
    container.appendChild(wahlteil);
    container.appendChild(danke);
    container.appendChild(PW.el('p', { 'class': 'knopfzeile' }, [auswerten, zuruecksetzen]));
    container.appendChild(ergebnis);
    container.appendChild(hinweis);
    zeige();
    return { zweit: function () { return zweit; }, erst: function () { return erst; } };
  };

  /* Einfüge-Import aufbauen */
  PW.einfuegen = function (container, fertig) {
    var feld = PW.el('textarea', { 'class': 'einfuegen', 'aria-label': 'Ergebnisse einfügen', placeholder: 'Hier einfügen, z. B.:\nCDU 7\nSPD 4\nGRÜNE 5\nAfD 2' });
    var knopf = PW.el('button', { type: 'button', 'class': 'knopf knopf--voll', text: 'Erkennen und übernehmen' });
    var r = PW.el('div', { 'class': 'rueck', 'aria-live': 'polite' });
    knopf.addEventListener('click', function () {
      var w = PW.urneAusText(feld.value);
      if (!w) { r.className = 'rueck rueck--nein'; r.textContent = 'Keine Parteien mit Zahlen erkannt. Jede Zeile sollte einen Parteinamen und eine Zahl enthalten, zum Beispiel »GRÜNE 5«.'; return; }
      var summe = PW.urneSumme(w);
      var proz = {};
      /* Werte über 100 insgesamt: als Stimmen deuten; sonst als Prozent übernehmen */
      if (summe > 100.5) { PW.urneIds.forEach(function (id) { if (w[id] !== undefined) proz[id] = Math.round(w[id] / summe * 1000) / 10; }); }
      else if (Math.abs(summe - 100) < 5) { proz = w; }
      else { PW.urneIds.forEach(function (id) { if (w[id] !== undefined) proz[id] = Math.round(w[id] / summe * 1000) / 10; }); }
      PW.merke('klasse', proz);
      r.className = 'rueck rueck--gut';
      r.innerHTML = '<strong>Übernommen:</strong> ' + Object.keys(proz).map(function (id) { return PW.partei(id).name + ' ' + PW.fmt(proz[id]) + ' %'; }).join(' · ') +
        '<span class="beleg">Prüfe die Werte, bevor du sie am Beamer zeigst.</span>';
      if (fertig) fertig(proz);
    });
    container.appendChild(feld);
    container.appendChild(PW.el('p', { 'class': 'knopfzeile' }, [knopf]));
    container.appendChild(r);
  };
})();
