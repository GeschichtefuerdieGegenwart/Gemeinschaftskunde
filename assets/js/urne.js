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

  /* Stimmen in Prozent umrechnen und als Klassenergebnis ablegen */
  PW.urneUebernehmen = function (zaehler) {
    var summe = PW.urneSumme(zaehler);
    if (!summe) return null;
    var proz = {};
    IDS.forEach(function (id) { proz[id] = Math.round((zaehler[id] || 0) / summe * 1000) / 10; });
    PW.merke('klasse', proz);
    PW.merke('klasse-stimmen', { zaehler: zaehler, summe: summe });
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

  /* Urnen-Modus aufbauen. container: Element; fertig(proz): Rückruf nach »Auszählen« */
  PW.urne = function (container, fertig) {
    var zaehler = {}, abgegeben = 0, gesperrt = false;
    var alt = PW.lies('klasse-stimmen', null);
    if (alt && alt.zaehler) { zaehler = alt.zaehler; abgegeben = alt.summe || PW.urneSumme(zaehler); }

    var stand = PW.el('p', { 'class': 'urne-stand', 'aria-live': 'polite' });
    var hinweis = PW.el('p', { 'class': 'klein', style: 'color:var(--leise)' });
    var raster = PW.el('div', { 'class': 'urne-raster' });
    var danke = PW.el('div', { 'class': 'urne-danke', hidden: 'hidden' }, [
      PW.el('p', { 'class': 'gross', text: 'Stimme abgegeben.' }),
      PW.el('p', { 'class': 'klein', text: 'Gib das Gerät weiter. Niemand sieht, wer was gewählt hat.' })
    ]);
    var weiter = PW.el('button', { type: 'button', 'class': 'knopf knopf--akzent knopf--gross', text: 'Nächste Person' });
    danke.appendChild(weiter);

    function zeige() {
      stand.textContent = abgegeben + (abgegeben === 1 ? ' Stimme' : ' Stimmen');
      hinweis.textContent = 'Gezählt werden nur Summen. Es wird nicht gespeichert, wer wann gewählt hat.';
    }
    IDS.forEach(function (id) {
      var p = PW.partei(id);
      var b = PW.el('button', { type: 'button', 'class': 'urne-knopf', style: '--pf:' + p.farbe }, [PW.el('i', { 'aria-hidden': 'true' }), PW.el('span', { text: p.name })]);
      b.addEventListener('click', function () {
        if (gesperrt) return;
        gesperrt = true;
        zaehler[id] = (zaehler[id] || 0) + 1; abgegeben++;
        PW.merke('klasse-stimmen', { zaehler: zaehler, summe: abgegeben });
        raster.hidden = true; danke.hidden = false; zeige(); weiter.focus();
      });
      raster.appendChild(b);
    });
    weiter.addEventListener('click', function () { gesperrt = false; danke.hidden = true; raster.hidden = false; raster.querySelector('button').focus(); });

    var auswerten = PW.el('button', { type: 'button', 'class': 'knopf knopf--voll', text: 'Auszählen und übernehmen' });
    var zuruecksetzen = PW.el('button', { type: 'button', 'class': 'knopf knopf--leise', text: 'Urne leeren' });
    var ergebnis = PW.el('div', { 'class': 'rueck', 'aria-live': 'polite' });
    auswerten.addEventListener('click', function () {
      var proz = PW.urneUebernehmen(zaehler);
      if (!proz) { ergebnis.className = 'rueck rueck--nein'; ergebnis.textContent = 'Die Urne ist leer.'; return; }
      ergebnis.className = 'rueck rueck--gut';
      ergebnis.innerHTML = '<strong>Ausgezählt:</strong> ' + abgegeben + ' Stimmen. ' +
        IDS.filter(function (id) { return zaehler[id]; }).map(function (id) { return PW.partei(id).name + ' ' + zaehler[id] + ' (' + PW.fmt(proz[id]) + ' %)'; }).join(' · ') +
        '<span class="beleg">Das Ergebnis steht jetzt im Reiter »Sitzrechner« und im »Abgleich« bereit.</span>';
      if (fertig) fertig(proz);
    });
    zuruecksetzen.addEventListener('click', function () {
      if (!confirm('Alle Stimmen in der Urne löschen?')) return;
      zaehler = {}; abgegeben = 0; try { localStorage.removeItem('pw:klasse-stimmen'); } catch (e) {}
      zeige(); ergebnis.className = 'rueck'; ergebnis.textContent = '';
    });

    container.appendChild(stand);
    container.appendChild(raster);
    container.appendChild(danke);
    container.appendChild(PW.el('p', { 'class': 'knopfzeile' }, [auswerten, zuruecksetzen]));
    container.appendChild(ergebnis);
    container.appendChild(hinweis);
    zeige();
    return { zaehler: function () { return zaehler; } };
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
