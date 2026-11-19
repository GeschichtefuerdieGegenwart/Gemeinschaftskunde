/* Politik-Werkstatt · Muster AB »Urteilslinie mit Klassenbild« (v7)
   Zur Hürden-Frage stellt sich jede und jeder auf eine Linie mit sieben Stellen – vorher (Startseite) und nachher (Station 5).
   Eigenes Gerät: speichert nur die eigene Stelle (pw:urteil-vorher, pw:urteil-nachher) und zeigt die Verschiebung.
   Lehrkraftgerät: Wahllokal wie bei der Klassenwahl. Gezählt werden nur Summen je Stelle und Runde, in der Runde »nachher«
   zusätzlich Summen je Paar (vorher → nachher). Keine Namen, keine Reihenfolge, keine Uhrzeit.
   Bewegung: Die Marke »jetzt« gleitet von der Stelle »vorher« zur neuen Stelle (transform, 300 ms). Sie zeigt die Verschiebung selbst.
   Überwältigungsverbot: Keine Stelle ist richtig; Bleiben ist so gut wie Wechseln, entscheidend ist die Begründung. */
(function () {
  'use strict';
  var PW = window.PW = window.PW || {};
  var N = 7;
  PW.urteilFrage = 'Soll die 5-%-Hürde bei Bundestagswahlen bleiben, wie sie ist?';
  PW.urteilPole = ['Ja – so beibehalten', 'Nein – senken oder abschaffen'];
  PW.urteilWorte = ['klar beibehalten', 'beibehalten', 'eher beibehalten', 'teils, teils', 'eher senken oder abschaffen', 'senken oder abschaffen', 'klar senken oder abschaffen'];

  function weniger() { return PW.wenigerBewegung ? PW.wenigerBewegung() : false; }
  var zaehler = 0;

  /* Die Linie selbst: sieben Stellen als Radiogruppe, Marken für »vorher« und »jetzt« */
  function linie(opts) {
    var name = 'ul-' + (++zaehler);
    var wurzel = PW.el('div', { 'class': 'ul' });
    var feld = PW.el('div', { 'class': 'ul-feld', role: 'radiogroup', 'aria-label': opts.label || PW.urteilFrage });
    var spur = PW.el('div', { 'class': 'ul-spur', 'aria-hidden': 'true' });
    var geist = PW.el('div', { 'class': 'ul-marke ul-marke--vorher', 'aria-hidden': 'true', hidden: 'hidden' }, [PW.el('span', { text: 'vorher' })]);
    var ich = PW.el('div', { 'class': 'ul-marke ul-marke--ich', 'aria-hidden': 'true', hidden: 'hidden' }, [PW.el('span', { text: opts.ichWort || 'jetzt' })]);
    spur.appendChild(geist); spur.appendChild(ich);
    feld.appendChild(spur);
    var inputs = [], zeiger = 0;
    feld.addEventListener('pointerdown', function () { zeiger = Date.now(); });
    for (var i = 1; i <= N; i++) {
      var inp = PW.el('input', { type: 'radio', name: name, value: String(i), 'class': 'sr-only' });
      inputs.push(inp);
      feld.appendChild(PW.el('label', { 'class': 'ul-stelle' }, [inp, PW.el('span', { 'class': 'ul-punkt', 'aria-hidden': 'true' }), PW.el('span', { 'class': 'sr-only', text: 'Stelle ' + i + ' von 7: ' + PW.urteilWorte[i - 1] })]));
    }
    wurzel.appendChild(feld);
    wurzel.appendChild(PW.el('div', { 'class': 'ul-pole', 'aria-hidden': 'true' }, [PW.el('span', { text: PW.urteilPole[0] }), PW.el('span', { text: 'teils, teils' }), PW.el('span', { text: PW.urteilPole[1] })]));
    function setzeMarke(m, p, gleiten) {
      if (!p) { m.hidden = true; return; }
      var war = m.hidden; m.hidden = false;
      if (!gleiten || war || weniger()) { m.classList.add('ohne-gleiten'); m.style.setProperty('--p', p); void m.offsetWidth; m.classList.remove('ohne-gleiten'); }
      else m.style.setProperty('--p', p);
    }
    var api = {
      el: wurzel,
      wert: function () { var c = inputs.filter(function (x) { return x.checked; })[0]; return c ? +c.value : 0; },
      setze: function (p, gleiten) { inputs.forEach(function (x) { x.checked = +x.value === p; }); setzeMarke(ich, p, gleiten); },
      vorher: function (p) { setzeMarke(geist, p, false); },
      leeren: function () { inputs.forEach(function (x) { x.checked = false; }); ich.hidden = true; },
      beiWahl: null
    };
    inputs.forEach(function (x) {
      x.addEventListener('change', function (e) {
        var p = +x.value;
        /* Die Marke gleitet von der vorigen Stelle; bei Tastatur ohne Bewegung (Kowalski) */
        var gleiten = !ich.hidden || (!geist.hidden && opts.vonVorher);
        if (ich.hidden && !geist.hidden && opts.vonVorher) { setzeMarke(ich, +geist.style.getPropertyValue('--p'), false); }
        setzeMarke(ich, p, gleiten && Date.now() - zeiger < 1500);
        if (api.beiWahl) api.beiWahl(p);
      });
    });
    return api;
  }
  PW.urteilLinieBauen = linie;

  function schritte(a, b) {
    if (!a || !b) return '';
    var d = b - a;
    if (d === 0) return 'Du stehst an derselben Stelle wie vorher.';
    var richtung = d > 0 ? '»' + PW.urteilPole[1].replace('Nein – ', '') + '«' : '»' + PW.urteilPole[0].replace('Ja – ', '') + '«';
    var n = Math.abs(d);
    return 'Du hast dich um ' + (n === 1 ? 'eine Stelle' : n + ' Stellen') + ' in Richtung ' + richtung + ' bewegt.';
  }

  /* Eigenes Gerät: runde = 'vorher' | 'nachher' */
  PW.urteilslinie = function (box, runde, wurzelPfad) {
    if (!box) return;
    wurzelPfad = wurzelPfad || '';
    box.textContent = '';
    box.appendChild(PW.el('p', { 'class': 'ul-frage', text: PW.urteilFrage }));
    var vor = PW.lies('urteil-vorher', 0), nach = PW.lies('urteil-nachher', 0);
    var l = linie({ label: PW.urteilFrage + (runde === 'nachher' ? ' Deine Stelle nach der Einheit' : ' Deine Stelle vor der Einheit'), vonVorher: runde === 'nachher', ichWort: runde === 'nachher' ? 'jetzt' : 'du' });
    box.appendChild(l.el);
    var stand = PW.el('p', { 'class': 'ul-stand', 'aria-live': 'polite' });
    box.appendChild(stand);
    var satzKey = runde === 'nachher' ? 'urteil-reflexion' : 'urteil-vorher-satz';
    var satzLabel = runde === 'nachher'
      ? 'Was hat dich bewegt – oder was hat dich in deiner Stelle bestärkt? Nenne ein Argument oder einen Beleg aus der Einheit.'
      : 'Ein Satz zu deiner Stelle (nur für dich): Warum stehst du hier?';
    var satzId = 'ul-satz-' + runde;
    var satz = PW.el('textarea', { id: satzId, 'class': 'schreibfeld', rows: '3' });
    satz.value = PW.lies(satzKey, '') || '';
    satz.addEventListener('input', function () { PW.merke(satzKey, satz.value); });
    var satzTeil = PW.el('div', { 'class': 'ul-satz' }, [PW.el('label', { 'for': satzId, text: satzLabel }), satz]);
    if (runde === 'nachher') {
      var alt = PW.lies('urteil-vorher-satz', '');
      if (alt) satzTeil.insertBefore(PW.el('p', { 'class': 'ul-alt', html: '<strong>Vorher hast du geschrieben:</strong> ' }), satzTeil.firstChild).appendChild(document.createTextNode('»' + alt + '«'));
    }
    box.appendChild(satzTeil);

    function schreibe(p) {
      if (runde === 'vorher') {
        stand.innerHTML = p ? 'Gespeichert, nur auf diesem Gerät: <strong>' + PW.urteilWorte[p - 1] + '</strong>. Am Ende von Station 5 stellst du dich noch einmal auf.' : 'Tippe die Stelle an, an der du gerade stehst. Es gibt keine richtige Stelle.';
      } else {
        if (!p) { stand.textContent = vor ? 'Die helle Marke zeigt, wo du vor der Einheit standest. Wo stehst du jetzt?' : 'Wo stehst du jetzt?'; return; }
        stand.innerHTML = 'Jetzt: <strong>' + PW.urteilWorte[p - 1] + '</strong>. ' + (vor ? schritte(vor, p) + ' Bleiben ist so gut begründbar wie Wechseln – entscheidend ist das Argument.' : 'Eine Stelle von vorher ist auf diesem Gerät nicht gespeichert; vergleiche mit deiner Erinnerung oder dem Klassenbild.');
      }
    }
    if (runde === 'nachher' && vor) l.vorher(vor);
    var eigen = runde === 'nachher' ? nach : vor;
    if (eigen) l.setze(eigen, false);
    schreibe(eigen);
    l.beiWahl = function (p) { PW.merke(runde === 'nachher' ? 'urteil-nachher' : 'urteil-vorher', p); schreibe(p); };
    if (runde === 'vorher') box.appendChild(PW.el('p', { 'class': 'klein ul-hinweis', html: 'Im Unterricht kann die Lehrkraft dieselbe Linie anonym als <a href="' + wurzelPfad + 'lehrkraft.html#urteilslinie">Klassenbild</a> sammeln.' }));
  };

  /* ===== Lehrkraftgerät: Wahllokal und Klassenbild ===== */
  function leer() { var a = []; for (var i = 0; i < N; i++) a.push(0); return a; }
  function zustand() {
    var z = PW.lies('urteil-klasse', null) || {};
    if (!z.vorher) z.vorher = leer();
    if (!z.nachher) z.nachher = leer();
    if (!z.paare) { z.paare = []; for (var i = 0; i < N * N; i++) z.paare.push(0); }
    return z;
  }
  function summe(a) { return a.reduce(function (s, x) { return s + x; }, 0); }
  function median(a) {
    var n = summe(a); if (!n) return 0;
    var h = (n + 1) / 2, s = 0;
    for (var i = 0; i < N; i++) { s += a[i]; if (s >= h) return i + 1; }
    return N;
  }

  PW.urteilKlasse = function (box) {
    if (!box) return;
    var z = zustand();
    var runde = PW.lies('urteil-runde', 'vorher');
    box.textContent = '';
    var wahl = PW.el('div', { 'class': 'ul-runden', role: 'group', 'aria-label': 'Runde' });
    var kV = PW.el('button', { type: 'button', 'class': 'knopf knopf--leise', text: 'Runde vorher' });
    var kN = PW.el('button', { type: 'button', 'class': 'knopf knopf--leise', text: 'Runde nachher' });
    wahl.appendChild(kV); wahl.appendChild(kN);
    box.appendChild(wahl);
    var stand = PW.el('p', { 'class': 'urne-stand', 'aria-live': 'polite' });
    box.appendChild(stand);

    var zettel = PW.el('div', { 'class': 'ul-zettel' });
    zettel.appendChild(PW.el('p', { 'class': 'ul-frage', text: PW.urteilFrage }));
    var lJetzt = linie({ label: 'Wo stehst du jetzt?', ichWort: 'jetzt' });
    var tJetzt = PW.el('p', { 'class': 'ul-zeile', text: 'Wo stehst du jetzt?' });
    zettel.appendChild(tJetzt); zettel.appendChild(lJetzt.el);
    var vorTeil = PW.el('div', { 'class': 'ul-vorteil' });
    var lVor = linie({ label: 'Wo standest du vor der Einheit?', ichWort: 'vorher' });
    var kWeiss = PW.el('label', { 'class': 'schalter schalter--klein' }, [PW.el('input', { type: 'checkbox' }), document.createTextNode('Weiß ich nicht mehr')]);
    vorTeil.appendChild(PW.el('p', { 'class': 'ul-zeile', html: 'Und vorher? <span class="klein">(steht auf deinem Gerät auf der Startseite)</span>' }));
    vorTeil.appendChild(lVor.el); vorTeil.appendChild(kWeiss);
    zettel.appendChild(vorTeil);
    var einwerfen = PW.el('button', { type: 'button', 'class': 'knopf knopf--akzent knopf--gross', text: 'Einwerfen' });
    var fehler = PW.el('div', { 'class': 'rueck', 'aria-live': 'polite', hidden: 'hidden' });
    var wahlteil = PW.el('div', {}, [zettel, PW.el('p', { 'class': 'knopfzeile knopfzeile--mitte' }, [einwerfen]), fehler]);
    var danke = PW.el('div', { 'class': 'urne-danke', hidden: 'hidden' }, [
      PW.el('p', { 'class': 'gross', text: 'Eingeworfen.' }),
      PW.el('p', { 'class': 'klein', text: 'Gezählt wird nur, wie viele an jeder Stelle stehen. Bitte die nächste Person nach vorn bitten.' })
    ]);
    var weiter = PW.el('button', { type: 'button', 'class': 'knopf knopf--akzent knopf--gross', text: 'Nächste Person' });
    danke.appendChild(weiter);
    box.appendChild(wahlteil); box.appendChild(danke);

    var zeigen = PW.el('button', { type: 'button', 'class': 'knopf knopf--voll', text: 'Klassenbild am Beamer zeigen' });
    var leeren = PW.el('button', { type: 'button', 'class': 'knopf knopf--leise', text: 'Diese Runde leeren' });
    box.appendChild(PW.el('p', { 'class': 'knopfzeile' }, [zeigen, leeren]));
    box.appendChild(PW.el('p', { 'class': 'klein', style: 'color:var(--leise)', text: 'Gespeichert werden nur Summen je Stelle und Runde auf diesem Gerät, in der Runde »nachher« auch Summen je Paar »vorher → nachher«. Niemand ist einer Stelle zuzuordnen. Während der Abgabe ist das Klassenbild verdeckt.' }));

    function zeigeRunde() {
      kV.setAttribute('aria-pressed', runde === 'vorher' ? 'true' : 'false');
      kN.setAttribute('aria-pressed', runde === 'nachher' ? 'true' : 'false');
      vorTeil.hidden = runde !== 'nachher';
      var n = summe(z[runde]);
      stand.textContent = 'Runde ' + runde + ': ' + n + (n === 1 ? ' Person hat sich aufgestellt' : ' Personen haben sich aufgestellt');
    }
    function zuruecksetzen() { lJetzt.leeren(); lVor.leeren(); kWeiss.querySelector('input').checked = false; fehler.hidden = true; }
    kV.addEventListener('click', function () { runde = 'vorher'; PW.merke('urteil-runde', runde); zuruecksetzen(); zeigeRunde(); });
    kN.addEventListener('click', function () { runde = 'nachher'; PW.merke('urteil-runde', runde); zuruecksetzen(); zeigeRunde(); });
    einwerfen.addEventListener('click', function () {
      var j = lJetzt.wert();
      if (!j) { fehler.hidden = false; fehler.className = 'rueck rueck--nein'; fehler.textContent = 'Noch keine Stelle gewählt. Tippe auf die Linie.'; return; }
      z[runde][j - 1]++;
      if (runde === 'nachher') {
        var v = lVor.wert();
        if (v && !kWeiss.querySelector('input').checked) z.paare[(v - 1) * N + (j - 1)]++;
      }
      PW.merke('urteil-klasse', z);
      zuruecksetzen(); wahlteil.hidden = true; danke.hidden = false; zeigeRunde(); weiter.focus();
    });
    weiter.addEventListener('click', function () { danke.hidden = true; wahlteil.hidden = false; });
    leeren.addEventListener('click', function () {
      if (!confirm('Alle Stimmen der Runde »' + runde + '« löschen?')) return;
      z[runde] = leer(); if (runde === 'nachher') z.paare = z.paare.map(function () { return 0; });
      PW.merke('urteil-klasse', z); zeigeRunde();
    });
    zeigen.addEventListener('click', function () { PW.urteilBild(zustand(), zeigen); });
    zeigeRunde();
  };

  /* Beamer: beide Verteilungen auf derselben Linie, darunter die Bewegung in Worten */
  PW.urteilBild = function (z, zurueck) {
    var alt = document.getElementById('ul-bild'); if (alt) alt.remove();
    var nV = summe(z.vorher), nN = summe(z.nachher);
    var bild = PW.el('div', { id: 'ul-bild', 'class': 'ul-bild', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'ul-bild-titel' });
    var innen = PW.el('div', { 'class': 'ul-bild-innen' });
    var zu = PW.el('button', { type: 'button', 'class': 'knopf knopf--leise ul-bild-zu', text: 'Schließen' });
    innen.appendChild(zu);
    innen.appendChild(PW.el('h2', { id: 'ul-bild-titel', 'class': 'ul-frage', text: PW.urteilFrage }));
    var raster = PW.el('div', { 'class': 'ul-raster' });
    function reihe(name, werte, art) {
      var r = PW.el('div', { 'class': 'ul-reihe ul-reihe--' + art });
      r.appendChild(PW.el('p', { 'class': 'ul-reihe-name', html: '<strong>' + name + '</strong> · ' + summe(werte) + (summe(werte) === 1 ? ' Person' : ' Personen') }));
      var spalten = PW.el('div', { 'class': 'ul-spalten' });
      werte.forEach(function (w, i) {
        var s = PW.el('div', { 'class': 'ul-spalte' });
        var punkte = PW.el('div', { 'class': 'ul-punkte', 'aria-hidden': 'true' });
        for (var k = 0; k < w; k++) punkte.appendChild(PW.el('i', { style: '--k:' + k }));
        s.appendChild(punkte);
        s.appendChild(PW.el('span', { 'class': 'ul-zahl', text: String(w) }));
        s.appendChild(PW.el('span', { 'class': 'sr-only', text: ' an Stelle ' + (i + 1) + ' (' + PW.urteilWorte[i] + ')' }));
        spalten.appendChild(s);
      });
      r.appendChild(spalten);
      return r;
    }
    raster.appendChild(reihe('Vorher', z.vorher, 'vorher'));
    raster.appendChild(reihe('Nachher', z.nachher, 'nachher'));
    raster.appendChild(PW.el('div', { 'class': 'ul-pole', 'aria-hidden': 'true' }, [PW.el('span', { text: PW.urteilPole[0] }), PW.el('span', { text: 'teils, teils' }), PW.el('span', { text: PW.urteilPole[1] })]));
    innen.appendChild(raster);
    /* Bewegung in Worten */
    var paarSumme = summe(z.paare), blieben = 0, zuBehalten = 0, zuSenken = 0;
    for (var v = 0; v < N; v++) for (var j = 0; j < N; j++) { var c = z.paare[v * N + j]; if (!c) continue; if (v === j) blieben += c; else if (j < v) zuBehalten += c; else zuSenken += c; }
    var text = [];
    if (nV && nN) {
      var mV = median(z.vorher), mN = median(z.nachher);
      text.push('Die Mitte der Klasse lag vorher bei »' + PW.urteilWorte[mV - 1] + '«, nachher bei »' + PW.urteilWorte[mN - 1] + '«.');
    }
    if (paarSumme) text.push('Von ' + paarSumme + ' Personen, die ihre Stelle von vorher angegeben haben: ' + blieben + ' sind geblieben, ' + zuBehalten + ' haben sich Richtung »beibehalten« bewegt, ' + zuSenken + ' Richtung »senken oder abschaffen«.');
    if (!nV && !nN) text.push('Noch keine Stimmen. Erst die Runde »vorher« sammeln, nach Station 5 die Runde »nachher«.');
    innen.appendChild(PW.el('div', { 'class': 'ul-befund' }, text.map(function (t) { return PW.el('p', { text: t }); })));
    innen.appendChild(PW.el('p', { 'class': 'ul-impuls', text: 'Zum Gespräch: Wer sich bewegt hat – welches Argument hat dich bewegt? Wer geblieben ist – was hat dich bestärkt? Keine Stelle ist richtig; es zählt die Begründung.' }));
    bild.appendChild(innen);
    document.body.appendChild(bild);
    if (!weniger()) { bild.classList.add('ist-neu'); requestAnimationFrame(function () { requestAnimationFrame(function () { bild.classList.remove('ist-neu'); }); }); }
    function schliessen() { bild.remove(); document.removeEventListener('keydown', taste); if (zurueck) zurueck.focus(); }
    function taste(e) { if (e.key === 'Escape') schliessen(); }
    zu.addEventListener('click', schliessen);
    document.addEventListener('keydown', taste);
    zu.focus();
  };
})();
