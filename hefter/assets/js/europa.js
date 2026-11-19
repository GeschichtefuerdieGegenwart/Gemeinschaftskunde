/* Politik-Werkstatt · Station 6 »Europa wählt« (v11) – Daten und Bausteine
   Muster AL · Sitze-Waage: Bevölkerungsanteil gegen Sitzanteil (degressive Proportionalität), erst schätzen, dann aufdecken.
   Muster AM · Hürden-Schalter: dasselbe Ergebnis 2024 mit 0 %, 2 % und 5 % (PW.sitze, 96 Sitze), Halbrund und Satz daneben.
   Muster AN · Mehrheit im EP suchen: Fraktionen ankreuzen, Summe gegen 361.
   Quellen stehen auf der Seite. Was offen ist, heißt »noch offen«. */
(function () {
  'use strict';
  var PW = window.PW = window.PW || {};

  /* Endgültiges Ergebnis der Europawahl 2024 in Deutschland (Bundeswahlleiterin, PM 42/24 vom 03.07.2024), nur Parteien mit Sitz */
  PW.ep2024 = [
    { id: 'cdu', name: 'CDU', anteil: 23.7, sitze: 23, farbe: 'var(--partei-cdu)', fraktion: 'EVP' },
    { id: 'afd', name: 'AfD', anteil: 15.9, sitze: 15, farbe: 'var(--partei-afd)', fraktion: 'ESN' },
    { id: 'spd', name: 'SPD', anteil: 13.9, sitze: 14, farbe: 'var(--partei-spd)', fraktion: 'S&D' },
    { id: 'gruene', name: 'GRÜNE', anteil: 11.9, sitze: 12, farbe: 'var(--partei-gruene)', fraktion: 'Grüne/EFA' },
    { id: 'csu', name: 'CSU', anteil: 6.3, sitze: 6, farbe: 'var(--partei-csu)', fraktion: 'EVP' },
    { id: 'bsw', name: 'BSW', anteil: 6.2, sitze: 6, farbe: 'var(--partei-bsw)', fraktion: 'fraktionslos' },
    { id: 'fdp', name: 'FDP', anteil: 5.2, sitze: 5, farbe: 'var(--partei-fdp)', fraktion: 'Renew' },
    { id: 'linke', name: 'Die Linke', anteil: 2.7, sitze: 3, farbe: 'var(--partei-linke)', fraktion: 'Linke' },
    { id: 'fw', name: 'FREIE WÄHLER', anteil: 2.7, sitze: 3, farbe: 'var(--partei-fw)', fraktion: 'Renew' },
    { id: 'volt', name: 'Volt', anteil: 2.6, sitze: 3, farbe: 'var(--partei-volt)', fraktion: 'Grüne/EFA' },
    { id: 'partei', name: 'Die PARTEI', anteil: 1.9, sitze: 2, farbe: 'var(--partei-sonstige)' },
    { id: 'tier', name: 'Tierschutzpartei', anteil: 1.4, sitze: 1, farbe: 'var(--partei-sonstige)' },
    { id: 'oedp', name: 'ÖDP', anteil: 0.6, sitze: 1, farbe: 'var(--partei-sonstige)' },
    { id: 'familie', name: 'FAMILIE', anteil: 0.6, sitze: 1, farbe: 'var(--partei-sonstige)' },
    { id: 'pdf', name: 'PdF', anteil: 0.6, sitze: 1, farbe: 'var(--partei-sonstige)' }
  ];
  PW.ep2024Quelle = 'Die Bundeswahlleiterin, Pressemitteilung 42/24 vom 03.07.2024 (endgültiges Ergebnis der Europawahl 2024). Wahlbeteiligung 64,7 %.';

  /* Fraktionen im EP (bpb, Stand 10.09.2024), 720 Sitze, Mehrheit 361 */
  PW.epFraktionen = [
    { id: 'linke', name: 'Die Linke', lang: 'Fraktion Die Linke im EP', sitze: 46, farbe: 'var(--partei-linke)', de: 'Die Linke' },
    { id: 'sd', name: 'S&D', lang: 'Sozialdemokraten', sitze: 136, farbe: 'var(--partei-spd)', de: 'SPD' },
    { id: 'gruene', name: 'Grüne/EFA', lang: 'Grüne / Europäische Freie Allianz', sitze: 53, farbe: 'var(--partei-gruene)', de: 'GRÜNE, Volt' },
    { id: 'renew', name: 'Renew', lang: 'Renew Europe (Liberale)', sitze: 77, farbe: 'var(--partei-fdp)', de: 'FDP, FREIE WÄHLER' },
    { id: 'evp', name: 'EVP', lang: 'Europäische Volkspartei (Christdemokraten)', sitze: 188, farbe: 'var(--partei-csu)', de: 'CDU, CSU' },
    { id: 'ekr', name: 'EKR', lang: 'Europäische Konservative und Reformer', sitze: 78, farbe: 'var(--fr-ekr)', de: '–' },
    { id: 'pfe', name: 'PfE', lang: 'Patrioten für Europa', sitze: 84, farbe: 'var(--fr-pfe)', de: '–' },
    { id: 'esn', name: 'ESN', lang: 'Europa der Souveränen Nationen', sitze: 25, farbe: 'var(--fr-esn)', de: 'AfD' },
    { id: 'ohne', name: 'fraktionslos', lang: 'ohne Fraktion', sitze: 33, farbe: 'var(--partei-sonstige)', de: 'u. a. BSW' }
  ];
  PW.epFraktionenQuelle = 'Bundeszentrale für politische Bildung, Fraktionen im Europäischen Parlament, Stand 10.09.2024. Die Zahlen ändern sich in der Wahlperiode leicht, wenn Abgeordnete wechseln.';

  /* Sitze je Mitgliedstaat 2024–2029 (Beschluss des Europäischen Rates (EU) 2023/2061) */
  PW.epLaender = [
    ['Deutschland', 96], ['Frankreich', 81], ['Italien', 76], ['Spanien', 61], ['Polen', 53], ['Rumänien', 33], ['Niederlande', 31],
    ['Belgien', 22], ['Griechenland', 21], ['Portugal', 21], ['Schweden', 21], ['Tschechien', 21], ['Ungarn', 21], ['Österreich', 20],
    ['Bulgarien', 17], ['Dänemark', 15], ['Finnland', 15], ['Slowakei', 15], ['Irland', 14], ['Kroatien', 12], ['Litauen', 11],
    ['Lettland', 9], ['Slowenien', 9], ['Estland', 7], ['Luxemburg', 6], ['Malta', 6], ['Zypern', 6]
  ];
  /* Bevölkerungsanteile an der EU (1.1.2024), wie sie der Rat für die qualifizierte Mehrheit nutzt (Agence Europe) */
  PW.epAnteile = { Deutschland: 18.49, Frankreich: 15.17, Luxemburg: 0.15, Malta: 0.12 };

  /* Muster AL · Sitze-Waage */
  PW.epWaage = function (box) {
    if (!box) return;
    box.textContent = '';
    var frage = PW.el('p', { html: '<strong>Erst schätzen:</strong> Malta hat 0,12 % der EU-Bevölkerung. Wie viele der 720 Sitze bekäme Malta, wenn streng nach Bevölkerung verteilt würde? Und wie viele hat es wirklich?' });
    var l1 = PW.el('label', { 'for': 'ep-malta1', text: 'streng nach Bevölkerung' }), i1 = PW.el('input', { id: 'ep-malta1', type: 'number', min: 0, max: 96, step: 1, inputmode: 'numeric' });
    var l2 = PW.el('label', { 'for': 'ep-malta2', text: 'wirklich' }), i2 = PW.el('input', { id: 'ep-malta2', type: 'number', min: 0, max: 96, step: 1, inputmode: 'numeric' });
    var form = PW.el('div', { 'class': 'vermutung' }, [PW.el('div', {}, [l1, i1]), PW.el('div', {}, [l2, i2])]);
    var knopf = PW.el('button', { type: 'button', 'class': 'knopf knopf--akzent', text: 'Aufdecken' });
    var aus = PW.el('div', { 'class': 'epw', hidden: 'hidden', 'aria-live': 'polite' });
    box.appendChild(frage); box.appendChild(form); box.appendChild(PW.el('p', { 'class': 'knopfzeile' }, [knopf])); box.appendChild(aus);
    var st = PW.lies('ep-malta', {}) || {};
    if (st.a !== undefined) i1.value = st.a; if (st.b !== undefined) i2.value = st.b;
    function zeige(animiert) {
      aus.hidden = false; aus.textContent = '';
      var tipp = (i1.value || i2.value) ? 'Deine Schätzung: ' + (i1.value || '–') + ' und ' + (i2.value || '–') + ' Sitze. ' : '';
      aus.appendChild(PW.el('p', { 'class': 'rueck', html: '<strong>Streng nach Bevölkerung: weniger als ein Sitz (0,12 % von 720 = 0,9). Wirklich: 6 Sitze.</strong> ' + tipp + 'Kleine Länder bekommen mehr Sitze, als ihnen nach Köpfen zustünden; große weniger. Das heißt <strong>degressive Proportionalität</strong>: Jedes Land hat mindestens 6 und höchstens 96 Sitze (Art. 14 Abs. 2 EUV).' }));
      var tab = PW.el('div', { 'class': 'epw-raster' });
      ['Deutschland', 'Frankreich', 'Luxemburg', 'Malta'].forEach(function (land) {
        var sitze = PW.epLaender.filter(function (x) { return x[0] === land; })[0][1];
        var sa = sitze / 720 * 100, ba = PW.epAnteile[land];
        var zeile = PW.el('div', { 'class': 'epw-land' }, [PW.el('h4', { text: land + ' · ' + sitze + ' Sitze' })]);
        [['Anteil an der Bevölkerung', ba], ['Anteil an den Sitzen', sa]].forEach(function (z, j) {
          zeile.appendChild(PW.el('div', { 'class': 'balken epw-zeile' + (j ? ' epw-zeile--sitze' : '') }, [PW.el('span', { text: z[0] }), PW.el('div', { 'class': 'spur' }, [PW.el('div', { 'class': 'fuellung', 'data-wert': Math.max(z[1] / 20, 0.01).toFixed(3) })]), PW.el('span', { 'class': 'zahl', text: PW.fmt(Math.round(z[1] * 100) / 100) + ' %' })]));
        });
        tab.appendChild(zeile);
      });
      aus.appendChild(tab);
      aus.appendChild(PW.el('p', { 'class': 'klein', html: '<strong>Rechne nach:</strong> Wie viele Menschen vertritt eine Abgeordnete aus Deutschland, wie viele eine aus Malta? (Deutschland rund 83 Millionen, Malta rund 0,5 Millionen Einwohner.) <strong>Beurteile:</strong> Ist das ungerecht gegenüber den Deutschen – oder nötig, damit auch kleine Länder mit mehreren Parteien vertreten sind?' }));
      aus.appendChild(PW.el('p', { 'class': 'klein', style: 'color:var(--leise)', text: 'Quellen: Beschluss (EU) 2023/2061 des Europäischen Rates (Sitze 2024–2029); Bevölkerungsanteile am 1.1.2024 nach den Zahlen des Rates für die qualifizierte Mehrheit (Agence Europe). Einwohnerzahlen gerundet.' }));
      if (animiert && PW.balkenWachsen) PW.balkenWachsen(tab); else tab.querySelectorAll('.fuellung').forEach(function (f) { f.style.transform = 'scaleX(' + f.getAttribute('data-wert') + ')'; });
      if (PW.notiere) PW.notiere(6, 'ep-malta', +i2.value === 6, 'Sitze je Land im EP');
    }
    knopf.addEventListener('click', function () { st = { a: i1.value, b: i2.value, offen: true }; PW.merke('ep-malta', st); zeige(true); });
    if (st.offen) zeige(false);
  };

  /* Alle 27 Länder als liegende Balken */
  PW.epLaenderListe = function (box) {
    if (!box) return;
    box.textContent = '';
    PW.epLaender.forEach(function (x) {
      box.appendChild(PW.el('div', { 'class': 'balken balken--klein epl' + (x[0] === 'Deutschland' ? ' epl--de' : '') }, [PW.el('span', { text: x[0] }), PW.el('div', { 'class': 'spur' }, [PW.el('div', { 'class': 'fuellung', style: 'transform:scaleX(' + (x[1] / 96).toFixed(3) + ')' })]), PW.el('span', { 'class': 'zahl', text: String(x[1]) })]));
    });
  };

  /* Muster AM · Hürden-Schalter */
  PW.epHuerde = function (box, satz) {
    if (!box) return;
    var reihen = PW.ep2024.map(function (p) { return { id: p.id, name: p.name, farbe: p.farbe }; });
    var werte = {}; PW.ep2024.forEach(function (p) { werte[p.id] = p.anteil; });
    function sitzeBei(h) {
      if (!h) { var o = {}; PW.ep2024.forEach(function (p) { o[p.id] = p.sitze; }); return o; }
      return PW.sitze(werte, { huerde: h, gesamt: 96 });
    }
    var basis = sitzeBei(0);
    function zeige(h, animiert) {
      var s = sitzeBei(h);
      PW.halbrund(box, s, reihen, animiert, { gesamt: 96, ohneMehrheit: true });
      var drin = Object.keys(s).filter(function (k) { return s[k]; });
      var raus = PW.ep2024.filter(function (p) { return !s[p.id]; });
      var gewinner = PW.ep2024.filter(function (p) { return (s[p.id] || 0) > p.sitze; }).map(function (p) { return p.name + ' +' + (s[p.id] - p.sitze); });
      satz.innerHTML = h === 0
        ? '<strong>Geltendes Recht 2024: keine Hürde.</strong> ' + drin.length + ' Parteien bekommen Sitze. Schon 0,6 % der Stimmen reichen für einen Sitz.'
        : '<strong>Mit ' + h + '-%-Hürde: ' + drin.length + ' statt 15 Parteien.</strong> Ohne Sitz blieben: ' + raus.map(function (p) { return p.name; }).join(', ') + ' – zusammen ' + PW.fmt(Math.round(raus.reduce(function (a, p) { return a + p.anteil; }, 0) * 10) / 10) + ' % der Stimmen. Mehr Sitze bekämen: ' + gewinner.join(', ') + '.';
      satz.appendChild(PW.el('span', { 'class': 'klein', style: 'display:block;color:var(--leise);margin-top:4px', text: h === 0 ? 'Amtliche Sitzverteilung.' : 'Modellrechnung der Werkstatt: Sainte-Laguë mit den gerundeten Anteilen der Parteien, die 2024 Sitze bekamen. Mit 0 % ergibt diese Rechnung genau die amtliche Verteilung.' }));
    }
    return { zeige: zeige, basis: basis };
  };

  /* Muster AN · Mehrheit im EP suchen */
  PW.epMehrheit = function (box, ergebnis) {
    if (!box) return;
    box.textContent = '';
    PW.epFraktionen.forEach(function (f) {
      var inp = PW.el('input', { type: 'checkbox', value: f.id });
      inp.addEventListener('change', rechne);
      box.appendChild(PW.el('label', {}, [inp, PW.el('span', { 'class': 'punkt', style: 'width:16px;height:16px;border-radius:50%;border:1px solid var(--text);display:inline-block;background:' + f.farbe }), f.name + ' · ' + f.sitze]));
    });
    function rechne() {
      var s = 0, n = [];
      box.querySelectorAll('input:checked').forEach(function (i) { var f = PW.epFraktionen.filter(function (x) { return x.id === i.value; })[0]; s += f.sitze; n.push(f.name); });
      if (!n.length) { ergebnis.className = 'rueck'; ergebnis.textContent = 'Kreuze Fraktionen an.'; return; }
      ergebnis.className = 'rueck ' + (s >= 361 ? 'rueck--gut' : 'rueck--nein');
      ergebnis.innerHTML = '<strong>' + n.join(' + ') + ': ' + s + ' Sitze.</strong> ' + (s >= 361 ? 'Das reicht für die Mehrheit der Mitglieder (361). ' : 'Es fehlen ' + (361 - s) + ' Sitze. ') + 'Anders als im Bundestag gibt es im EP keine feste Koalition – Mehrheiten bilden sich je Abstimmung neu.';
    }
    rechne();
  };
})();
