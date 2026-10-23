/* Politik-Werkstatt · Lernstand (Muster N, v4): zählt je Aufgabe den ersten Versuch und die genutzte Niveaustufe.
   Keine Noten, keine Punkte, keine Prozente als Leistungsmaß, kein Vergleich zwischen Lernenden.
   Alles bleibt im localStorage dieses Geräts und wird über »Eingaben löschen« entfernt. */
(function () {
  'use strict';
  var PW = window.PW = window.PW || {};

  PW.ziele = [
    { nr: 1, text: 'Sie kennen Aufgaben und Funktionen von Parteien.', kurz: 'Was Parteien tun – und woran man es erkennt.', stationen: [1, 2], seite: 'parteien-wahlen/station1.html' },
    { nr: 2, text: 'Sie bilden eine fundierte Meinung über die aktuelle Parteienlandschaft in Deutschland.', kurz: 'Positionen mit wörtlichen Belegen vergleichen.', stationen: [3], seite: 'parteien-wahlen/station3.html' },
    { nr: 3, text: 'Sie geben ihre Stimme ab und werten die Ergebnisse aus.', kurz: 'Stimmzettel, Sitzrechner, Koalitionen.', stationen: [4], seite: 'parteien-wahlen/station4.html' },
    { nr: 4, text: 'Sie beurteilen, welchen Einfluss das Alter bei einer Wahl spielt.', kurz: 'Wahlverhalten nach Alter und Geschlecht beurteilen.', stationen: [5], seite: 'parteien-wahlen/station5.html' }
  ];
  PW.stufenNamen = { A: 'A · Lesen und zuordnen', B: 'B · Selbst erklären', C: 'C · Eigenes Beispiel' };

  function alles() { return PW.lies('lernstand', {}) || {}; }

  /* station: 1–5 · id: eindeutiger Aufgabenschlüssel · richtig: true/false · thema: Stichwort · stufe: 'A'|'B'|'C' (optional) */
  PW.notiere = function (station, id, richtig, thema, stufe) {
    var a = alles(); var k = 'st' + station;
    a[k] = a[k] || {};
    if (a[k][id]) return a[k][id];           /* nur der erste Versuch zählt */
    a[k][id] = { r: richtig ? 1 : 0, t: thema || '', s: stufe || '' };
    PW.merke('lernstand', a);
    PW.lernstandAnzeigen(station);
    return a[k][id];
  };

  /* Bearbeitung auf einer Niveaustufe festhalten (Stufe B und C: freie Texte, die nicht bewertet werden) */
  PW.notiereStufe = function (station, id, stufe) {
    var a = alles(); var k = 'st' + station + '-stufen';
    a[k] = a[k] || {};
    if (a[k][id]) return;
    a[k][id] = stufe;
    PW.merke('lernstand', a);
    PW.lernstandAnzeigen(station);
  };

  PW.stand = function (station) {
    var daten = alles();
    var a = daten['st' + station] || {}; var ids = Object.keys(a);
    var richtig = ids.filter(function (i) { return a[i].r === 1; }).length;
    var themen = [];
    ids.filter(function (i) { return a[i].r === 0; }).forEach(function (i) { if (a[i].t && themen.indexOf(a[i].t) < 0) themen.push(a[i].t); });
    var stufen = { A: 0, B: 0, C: 0 };
    ids.forEach(function (i) { if (a[i].s && stufen[a[i].s] !== undefined) stufen[a[i].s]++; });
    var frei = daten['st' + station + '-stufen'] || {};
    Object.keys(frei).forEach(function (i) { if (stufen[frei[i]] !== undefined) stufen[frei[i]]++; });
    return { gesamt: ids.length, richtig: richtig, themen: themen, stufen: stufen, freie: Object.keys(frei).length };
  };

  /* Ring aus der Formensprache der Seite: ein Kreis wie der Stimmzettelkreis, der sich füllt. */
  PW.standRing = function (richtig, gesamt) {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 120 120'); svg.setAttribute('class', 'stand-ring'); svg.setAttribute('aria-hidden', 'true');
    var u = 2 * Math.PI * 52;
    var hinten = document.createElementNS(ns, 'circle');
    hinten.setAttribute('cx', 60); hinten.setAttribute('cy', 60); hinten.setAttribute('r', 52);
    hinten.setAttribute('fill', 'none'); hinten.setAttribute('stroke', '#DDD9D2'); hinten.setAttribute('stroke-width', 12);
    svg.appendChild(hinten);
    var vorn = document.createElementNS(ns, 'circle');
    vorn.setAttribute('cx', 60); vorn.setAttribute('cy', 60); vorn.setAttribute('r', 52);
    vorn.setAttribute('fill', 'none'); vorn.setAttribute('stroke', '#1F4E8C'); vorn.setAttribute('stroke-width', 12);
    vorn.setAttribute('stroke-linecap', 'butt');
    vorn.setAttribute('transform', 'rotate(-90 60 60)');
    var anteil = gesamt ? richtig / gesamt : 0;
    vorn.setAttribute('stroke-dasharray', u.toFixed(1));
    vorn.setAttribute('stroke-dashoffset', (PW.wenigerBewegung && PW.wenigerBewegung() ? u * (1 - anteil) : u).toFixed(1));
    svg.appendChild(vorn);
    var t = document.createElementNS(ns, 'text');
    t.setAttribute('x', 60); t.setAttribute('y', 68); t.setAttribute('text-anchor', 'middle');
    t.setAttribute('font-family', 'Bricolage Grotesque, sans-serif'); t.setAttribute('font-size', '34'); t.setAttribute('font-weight', '700'); t.setAttribute('fill', '#1F1D1A');
    t.textContent = String(richtig);
    svg.appendChild(t);
    if (!(PW.wenigerBewegung && PW.wenigerBewegung())) {
      setTimeout(function () { vorn.style.transition = 'stroke-dashoffset 440ms cubic-bezier(.23,1,.32,1)'; vorn.setAttribute('stroke-dashoffset', (u * (1 - anteil)).toFixed(1)); }, 60);
    }
    return svg;
  };

  function stufenZeile(s) {
    var zeile = PW.el('div', { 'class': 'stufen-stand' });
    var summe = s.stufen.A + s.stufen.B + s.stufen.C;
    if (!summe) return null;
    ['A', 'B', 'C'].forEach(function (k) {
      if (!s.stufen[k]) return;
      zeile.appendChild(PW.el('span', { 'class': 'stufen-marke stufe-' + k, text: PW.stufenNamen[k].replace(' · ', ': ') + ' – ' + s.stufen[k] + (s.stufen[k] === 1 ? ' Aufgabe' : ' Aufgaben') }));
    });
    return zeile;
  }

  /* Zwischenstand am Ende einer Station */
  PW.lernstandAnzeigen = function (station) {
    var box = document.getElementById('lernstand'); if (!box) return;
    var s = PW.stand(station);
    box.innerHTML = '';
    if (!s.gesamt && !s.freie) {
      box.appendChild(PW.el('p', { 'class': 'klein', text: 'Sobald du Aufgaben bearbeitest, steht hier dein Zwischenstand – nur für dich, auf diesem Gerät.' }));
      return;
    }
    var kopf = PW.el('div', { 'class': 'stand-kopf' });
    if (s.gesamt) kopf.appendChild(PW.standRing(s.richtig, s.gesamt));
    var text = PW.el('div');
    if (s.gesamt) {
      text.appendChild(PW.el('p', { 'class': 'stand-satz', html: '<strong>' + s.richtig + ' von ' + s.gesamt + '</strong> bearbeiteten Aufgaben im ersten Anlauf richtig.' }));
    }
    if (s.freie) text.appendChild(PW.el('p', { 'class': 'klein', text: s.freie + (s.freie === 1 ? ' freie Antwort' : ' freie Antworten') + ' geschrieben – die bewertet niemand außer dir.' }));
    var st = stufenZeile(s); if (st) text.appendChild(st);
    kopf.appendChild(text);
    box.appendChild(kopf);
    if (s.themen.length) {
      box.appendChild(PW.el('p', { html: '<strong>Für die Klassenarbeit:</strong> Sieh dir noch einmal an: ' + s.themen.slice(0, 6).join(' · ') + '.' }));
      box.appendChild(PW.el('p', { 'class': 'klein', html: 'Die Kurzsicherung dazu steht im <button type="button" class="knopf knopf--leise merk-auf-knopf">Merkzettel</button> oben rechts; dieselbe Fassung gibt es als PDF.' }));
      var mk = box.querySelector('.merk-auf-knopf'); if (mk) mk.addEventListener('click', function () { var k = document.querySelector('.merk-knopf'); if (k) k.click(); });
    } else if (s.gesamt) {
      box.appendChild(PW.el('p', { text: 'Alles im ersten Anlauf richtig. Nimm dir in der Zusammenfassung die Begriffe vor, die du noch nicht frei erklären kannst.' }));
    }
    box.appendChild(PW.el('p', { 'class': 'klein', style: 'color:var(--leise)', text: 'Das ist keine Note, zählt keine Punkte und wird nicht übertragen. Über »Eingaben löschen« im Fuß verschwindet es.' }));
  };

  /* Gesamtausgabe nach den vier Zielen */
  PW.lernstandGesamt = function (box, wurzel) {
    wurzel = wurzel || '';
    box.innerHTML = '';
    var leer = true;
    PW.ziele.forEach(function (z) {
      var g = 0, r = 0, themen = [], stufen = { A: 0, B: 0, C: 0 }, frei = 0;
      z.stationen.forEach(function (st) {
        var s = PW.stand(st); g += s.gesamt; r += s.richtig; frei += s.freie;
        themen = themen.concat(s.themen); ['A', 'B', 'C'].forEach(function (k) { stufen[k] += s.stufen[k]; });
      });
      if (g || frei) leer = false;
      var k = PW.el('section', { 'class': 'karte ziel-karte' });
      k.appendChild(PW.el('p', { 'class': 'ziel-nr', text: 'Ziel ' + z.nr }));
      k.appendChild(PW.el('p', { 'class': 'ziel-text', text: z.text }));
      if (g) {
        var kopf = PW.el('div', { 'class': 'stand-kopf' });
        kopf.appendChild(PW.standRing(r, g));
        var d = PW.el('div');
        d.appendChild(PW.el('p', { 'class': 'stand-satz', html: '<strong>' + r + ' von ' + g + '</strong> im ersten Anlauf richtig' }));
        var zz = stufenZeile({ stufen: stufen }); if (zz) d.appendChild(zz);
        kopf.appendChild(d); k.appendChild(kopf);
        if (themen.length) k.appendChild(PW.el('p', { 'class': 'klein', text: 'Noch ansehen: ' + themen.slice(0, 5).join(' · ') }));
      } else if (frei) {
        k.appendChild(PW.el('p', { 'class': 'klein', text: frei + ' freie Antworten geschrieben.' }));
      } else {
        k.appendChild(PW.el('p', { 'class': 'klein', text: 'Noch nicht bearbeitet.' }));
      }
      k.appendChild(PW.el('p', { 'class': 'klein' }, [PW.el('a', { href: wurzel + z.seite, text: 'Zur Station' })]));
      box.appendChild(k);
    });
    if (leer) box.appendChild(PW.el('p', { 'class': 'hinweis', text: 'Noch keine Aufgaben bearbeitet. Der Überblick füllt sich, während du durch die Stationen gehst.' }));
  };
})();
