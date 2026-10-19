/* Politik-Werkstatt · Merkzettel (Muster K): Kurzsicherung als Seitenleiste, auf jeder Seite oben rechts.
   Inhalt aus daten.js; dieselbe Fassung wie die PDF zur Klausurvorbereitung. Zustand (offen/zu) im localStorage, try/catch. */
(function () {
  'use strict';
  var PW = window.PW = window.PW || {};
  PW.merkzettel = function (wurzel) {
    wurzel = wurzel || '';
    var kopf = document.querySelector('.kopf-innen'); if (!kopf || !PW.funktionen) return;
    var knopf = PW.el('button', { type: 'button', 'class': 'merk-knopf', 'aria-expanded': 'false', 'aria-controls': 'merkzettel', html: '<svg aria-hidden="true" width="18" height="14" viewBox="0 0 18 14"><path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" stroke-width="2"/></svg> Merkzettel' });
    var nav = kopf.querySelector('.nav'); if (nav) kopf.insertBefore(knopf, nav); else kopf.appendChild(knopf);
    var m = PW.el('aside', { id: 'merkzettel', 'class': 'merk', 'aria-label': 'Merkzettel: Kurzsicherung' });
    var zu = PW.el('button', { type: 'button', 'class': 'knopf knopf--leise merk-schliessen', text: 'Schließen' });
    m.appendChild(zu);
    m.appendChild(PW.el('h2', { text: 'Merkzettel' }));
    m.appendChild(PW.el('p', { html: 'Die Kurzsicherung zum Nachschlagen während der Aufgaben. Als PDF für die Klausur: <a href="' + wurzel + 'docs/Zusammenfassung_Parteien_und_Wahlen.pdf">Zusammenfassung (2 Seiten)</a>.' }));
    m.appendChild(PW.el('h3', { text: 'Art. 21 GG in einem Satz' }));
    m.appendChild(PW.el('p', { text: 'Parteien wirken an der politischen Willensbildung mit (kein Monopol); Gründung frei, innere Ordnung demokratisch, Rechenschaft über Geld; Verbot nur durch das Bundesverfassungsgericht.' }));
    m.appendChild(PW.el('h3', { text: 'Vier Aufgaben' }));
    var ul = PW.el('ul'); PW.aufgaben.forEach(function (a) { ul.appendChild(PW.el('li', { html: '<strong>' + a.name + ':</strong> ' + a.text })); }); m.appendChild(ul);
    m.appendChild(PW.el('h3', { text: 'Elf Funktionen' }));
    var dl = PW.el('dl'); PW.funktionen.forEach(function (f) { dl.appendChild(PW.el('dt', { text: f.name })); dl.appendChild(PW.el('dd', { text: f.kurz + ' Beispiel: ' + f.beispiel })); }); m.appendChild(dl);
    m.appendChild(PW.el('h3', { text: 'Kurzprofile (Stimmzettelreihenfolge)' }));
    ['cdu', 'csu', 'spd', 'gruene', 'fdp', 'afd', 'linke', 'bsw'].forEach(function (id) {
      var p = PW.partei(id);
      m.appendChild(PW.el('div', { 'class': 'profil-mini', style: '--pf:' + p.farbe }, [PW.el('i', { 'aria-hidden': 'true' }), PW.el('p', { html: '<strong>' + p.name + '</strong> · ' + p.lang.split(' (')[0] + ' · gegr. ' + String(p.gruendung).split(' (')[0] + ' · Vorsitz ' + p.vorsitz.split(' (')[0] + ' · BTW 2025: ' + PW.fmt(p.btw) + ' %, ' + p.sitze + ' Sitze · ' + p.rolle.split(' (')[0] })]));
    });
    m.appendChild(PW.el('h3', { text: 'Wahlrecht 2025 in fünf Zeilen' }));
    var w = PW.el('ul'); ['Erststimme: Person im Wahlkreis (299 Wahlkreise). Zweitstimme: Landesliste – sie entscheidet die Sitzverteilung.', '630 Sitze fest; Verfahren Sainte-Laguë/Schepers.', 'Zweitstimmendeckung: Direktmandate zählen nur, soweit Zweitstimmen reichen; keine Überhang- und Ausgleichsmandate.', '5-%-Hürde oder 3 Direktmandate (Grundmandatsklausel); SSW als Minderheitenpartei befreit.', 'Mehrheit ab 316 Sitzen. 2025: Union 208 + SPD 120 = 328.'].forEach(function (t) { w.appendChild(PW.el('li', { text: t })); }); m.appendChild(w);
    m.appendChild(PW.el('h3', { text: 'Urteilen' }));
    m.appendChild(PW.el('p', { text: 'Sachurteil: Wirkung an Kriterien prüfen. Werturteil: Kriterien gewichten und begründen. Immer: Behauptung → Beleg → Erklärung → Gegenargument → Abwägung.' }));
    document.body.appendChild(m);
    function setze(offen, sofort) {
      m.classList.toggle('ist-offen', offen); document.body.classList.toggle('merk-auf', offen);
      knopf.setAttribute('aria-expanded', offen ? 'true' : 'false');
      PW.merke('merk', offen ? 1 : 0);
      if (offen && !sofort) zu.focus();
    }
    knopf.addEventListener('click', function () { setze(!m.classList.contains('ist-offen')); });
    zu.addEventListener('click', function () { setze(false); knopf.focus(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && m.classList.contains('ist-offen')) { setze(false); knopf.focus(); } });
    if (PW.lies('merk', 0) === 1 && window.innerWidth >= 1024) setze(true, true);
  };
})();
