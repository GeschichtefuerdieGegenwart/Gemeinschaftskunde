/* Politik-Werkstatt · Lernstand (Muster N): zählt je Aufgabe nur den ersten Versuch.
   Keine Noten, keine Punkte, keine Prozente, kein Vergleich zwischen Lernenden. Alles bleibt im localStorage dieses Geräts
   und wird über »Eingaben löschen« entfernt. Zweck: Rückmeldung und Empfehlung, keine Leistungsmessung. */
(function () {
  'use strict';
  var PW = window.PW = window.PW || {};

  PW.ziele = [
    { nr: 1, text: 'Sie kennen Aufgaben und Funktionen von Parteien.', stationen: [1, 2], seite: 'parteien-wahlen/station1.html' },
    { nr: 2, text: 'Sie bilden eine fundierte Meinung über die aktuelle Parteienlandschaft in Deutschland.', stationen: [3], seite: 'parteien-wahlen/station3.html' },
    { nr: 3, text: 'Sie geben ihre Stimme ab und werten die Ergebnisse aus.', stationen: [4], seite: 'parteien-wahlen/station4.html' },
    { nr: 4, text: 'Sie beurteilen, welchen Einfluss das Alter bei einer Wahl spielt.', stationen: [5], seite: 'parteien-wahlen/station5.html' }
  ];

  function alles() { return PW.lies('lernstand', {}) || {}; }

  /* station: 1–5, id: eindeutiger Aufgabenschlüssel, richtig: true/false, thema: Stichwort für die Empfehlung */
  PW.notiere = function (station, id, richtig, thema) {
    var a = alles(); var k = 'st' + station;
    a[k] = a[k] || {};
    if (a[k][id]) return a[k][id];           /* nur der erste Versuch zählt */
    a[k][id] = { r: richtig ? 1 : 0, t: thema || '' };
    PW.merke('lernstand', a);
    PW.lernstandAnzeigen(station);
    return a[k][id];
  };

  PW.stand = function (station) {
    var a = alles()['st' + station] || {}; var ids = Object.keys(a);
    var richtig = ids.filter(function (i) { return a[i].r === 1; }).length;
    var offen = ids.filter(function (i) { return a[i].r === 0; }).map(function (i) { return a[i].t; }).filter(Boolean);
    var einmalig = []; offen.forEach(function (t) { if (einmalig.indexOf(t) < 0) einmalig.push(t); });
    return { gesamt: ids.length, richtig: richtig, themen: einmalig };
  };

  /* Zwischenstand am Ende einer Station */
  PW.lernstandAnzeigen = function (station, wurzel) {
    var box = document.getElementById('lernstand'); if (!box) return;
    var s = PW.stand(station);
    box.innerHTML = '';
    if (!s.gesamt) { box.appendChild(PW.el('p', { 'class': 'klein', text: 'Sobald du Aufgaben bearbeitest, steht hier dein Zwischenstand – nur für dich, auf diesem Gerät.' })); return; }
    box.appendChild(PW.el('p', { 'class': 'stand-satz', html: 'Du hast <strong>' + s.richtig + ' von ' + s.gesamt + '</strong> bearbeiteten Aufgaben im ersten Anlauf richtig gelöst.' }));
    if (s.themen.length) {
      box.appendChild(PW.el('p', { html: '<strong>Für die Klassenarbeit:</strong> Sieh dir noch einmal an: ' + s.themen.slice(0, 6).join(' · ') + '.' }));
      box.appendChild(PW.el('p', { 'class': 'klein', html: 'Die Kurzsicherung dazu steht im <button type="button" class="knopf knopf--leise merk-auf-knopf">Merkzettel</button> oben rechts.' }));
      var mk = box.querySelector('.merk-auf-knopf'); if (mk) mk.addEventListener('click', function () { var k = document.querySelector('.merk-knopf'); if (k) k.click(); });
    } else {
      box.appendChild(PW.el('p', { text: 'Alles im ersten Anlauf richtig. Nimm dir in der Zusammenfassung die Begriffe vor, die du noch nicht frei erklären kannst.' }));
    }
    box.appendChild(PW.el('p', { 'class': 'klein', style: 'color:var(--leise)', text: 'Das ist keine Note und wird nicht übertragen. Über »Eingaben löschen« im Fuß verschwindet es.' }));
  };

  /* Gesamtausgabe nach den vier Zielen */
  PW.lernstandGesamt = function (box, wurzel) {
    wurzel = wurzel || '';
    box.innerHTML = '';
    var leer = true;
    PW.ziele.forEach(function (z) {
      var g = 0, r = 0, themen = [];
      z.stationen.forEach(function (st) { var s = PW.stand(st); g += s.gesamt; r += s.richtig; themen = themen.concat(s.themen); });
      if (g) leer = false;
      var k = PW.el('section', { 'class': 'karte ziel-karte' });
      k.appendChild(PW.el('p', { 'class': 'ziel-nr', text: 'Ziel ' + z.nr }));
      k.appendChild(PW.el('p', { 'class': 'ziel-text', text: z.text }));
      if (g) {
        k.appendChild(PW.el('p', { 'class': 'stand-satz', html: '<strong>' + r + ' von ' + g + '</strong> Aufgaben im ersten Anlauf richtig' }));
        if (themen.length) k.appendChild(PW.el('p', { 'class': 'klein', text: 'Noch ansehen: ' + themen.slice(0, 5).join(' · ') }));
      } else {
        k.appendChild(PW.el('p', { 'class': 'klein', text: 'Noch nicht bearbeitet.' }));
      }
      k.appendChild(PW.el('p', { 'class': 'klein' }, [PW.el('a', { href: wurzel + z.seite, text: 'Zur Station' })]));
      box.appendChild(k);
    });
    if (leer) box.appendChild(PW.el('p', { 'class': 'hinweis', text: 'Noch keine Aufgaben bearbeitet. Der Überblick füllt sich, während du durch die Stationen gehst.' }));
  };
})();
