/* Politik-Werkstatt · Intro (Muster L): »Die Auszählung«.
   Fünf Sekunden: Stimmzettelzeilen ziehen durch, Kreuze setzen sich, Parteikürzel fliegen als Platten ein und verblassen,
   die 630 Sitzpunkte formieren sich zum Halbrund, dann steht die Grundfrage.
   Regeln: nur transform/opacity, nie ease-in, Staffel 30 ms (max. 8), Ausgänge kürzer als Eingänge, kein Ton, überspringbar.
   Rechtlich und didaktisch: keine Logos, keine Fotos; Parteikürzel gleich groß, gleich lang, zufällige Reihenfolge. */
(function () {
  'use strict';
  var PW = window.PW = window.PW || {};

  PW.intro = function (wurzel) {
    if (!wurzel) return;
    var ziel = document.getElementById('nach-intro');
    var gesehen = false;
    try { gesehen = sessionStorage.getItem('pw:intro') === '1'; } catch (e) {}
    function fertig() {
      wurzel.setAttribute('hidden', '');
      document.body.classList.remove('intro-laeuft');
      if (ziel) { var h = ziel.querySelector('h1'); if (h) { h.setAttribute('tabindex', '-1'); try { h.focus({ preventScroll: true }); } catch (e) {} if (PW.aufbauen) PW.aufbauen(h, { sofort: gesehen }); } }
      try { sessionStorage.setItem('pw:intro', '1'); } catch (e) {}
    }
    var ruhig = (PW.wenigerBewegung && PW.wenigerBewegung()) || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    if (gesehen || ruhig) { fertig(); return; }

    document.body.classList.add('intro-laeuft');
    wurzel.removeAttribute('hidden');

    var buehne = wurzel.querySelector('.intro-buehne');
    var ns = 'http://www.w3.org/2000/svg';

    /* Ebene 1: Stimmzettelzeilen (Kreis + Name), ziehen von rechts ein */
    var zeilen = PW.el('div', { 'class': 'intro-zeilen', 'aria-hidden': 'true' });
    var namen = PW.wahlkreis ? PW.wahlkreis.kandidierende.slice(0, 6).map(function (k) { return k.name; }) : [];
    PW.mischen(namen).forEach(function (n, i) {
      var z = PW.el('div', { 'class': 'intro-zeile' }, [PW.el('span', { 'class': 'intro-kreis' }), PW.el('span', { text: n })]);
      z.style.setProperty('--i', i);
      zeilen.appendChild(z);
    });
    buehne.appendChild(zeilen);

    /* Ebene 2: Parteikürzel als Platten, zufällige Reihenfolge, alle gleich groß */
    var platten = PW.el('div', { 'class': 'intro-platten', 'aria-hidden': 'true' });
    PW.mischen(PW.parteien.map(function (p) { return p; })).forEach(function (p, i) {
      var t = PW.el('span', { 'class': 'intro-platte', text: p.name });
      t.style.setProperty('--pf', p.farbe); t.style.setProperty('--i', i);
      platten.appendChild(t);
    });
    buehne.appendChild(platten);

    /* Ebene 3: 630 Sitzpunkte formieren sich */
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 720 360'); svg.setAttribute('class', 'intro-sitze'); svg.setAttribute('aria-hidden', 'true');
    var cx = 360, cy = 340, punkte = [];
    for (var r = 0; r < 9; r++) {
      var rad = 140 + r * 22, n = Math.round(Math.PI * rad / 10.6);
      for (var i2 = 0; i2 < n; i2++) { var a = Math.PI - Math.PI * (i2 + 0.5) / n; punkte.push({ x: cx + rad * Math.cos(a), y: cy - rad * Math.sin(a), a: a }); }
    }
    punkte.sort(function (u, v) { return v.a - u.a; });
    var ueber = punkte.length - 630; if (ueber > 0) punkte = punkte.slice(Math.floor(ueber / 2), Math.floor(ueber / 2) + 630);
    /* Farben nach dem echten Ergebnis 2025 (Sitzordnung von links nach rechts), nicht erfunden */
    var sitzfolge = [];
    [['linke', 64], ['spd', 120], ['gruene', 85], ['ssw', 1], ['cdu', 164], ['csu', 44], ['afd', 152]].forEach(function (x) {
      var p = PW.partei(x[0]); var f = p ? p.farbe : 'var(--partei-ssw)';
      for (var k = 0; k < x[1]; k++) sitzfolge.push(f);
    });
    punkte.forEach(function (p, i) {
      var c = document.createElementNS(ns, 'circle');
      c.setAttribute('cx', p.x.toFixed(1)); c.setAttribute('cy', p.y.toFixed(1)); c.setAttribute('r', 4.4);
      c.style.fill = sitzfolge[i] || 'var(--partei-leer)';
      c.setAttribute('class', 'intro-punkt');
      c.style.setProperty('--d', Math.round(i / 630 * 1700) + 'ms');
      svg.appendChild(c);
    });
    buehne.appendChild(svg);

    /* Ablauf: die Klassen schalten die CSS-Stufen; Gesamtdauer ~5 s */
    /* v4: ruhiger getaktet, rund 9,5 Sekunden; jede Stufe bekommt Standzeit zum Hinsehen */
    var schritte = [
      [120, 'stufe-zeilen'],
      [1900, 'stufe-kreuze'],
      [3600, 'stufe-platten'],
      [5800, 'stufe-sitze'],
      [8100, 'stufe-frage']
    ];
    var timer = schritte.map(function (s) { return setTimeout(function () { wurzel.classList.add(s[1]); }, s[0]); });
    var ende = setTimeout(fertig, 9600);

    function abbrechen() {
      timer.forEach(clearTimeout); clearTimeout(ende);
      wurzel.removeEventListener('click', abbrechen); document.removeEventListener('keydown', taste);
      fertig();
    }
    function taste(e) { if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') abbrechen(); }
    wurzel.addEventListener('click', abbrechen);
    document.addEventListener('keydown', taste);
    var ueber = wurzel.querySelector('.intro-skip'); if (ueber) ueber.addEventListener('click', abbrechen);
  };
})();
