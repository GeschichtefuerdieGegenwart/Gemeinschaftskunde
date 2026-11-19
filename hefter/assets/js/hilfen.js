/* Politik-Werkstatt · Gestufte Hilfen (aus »Gegenwart« / Psycho-Labor, v5)
   Drei Stufen, nur auf Wunsch, nacheinander: 1 Begriff → 2 Hinweis → 3 Lösungsweg. Die Aufgabe bleibt offen, die Person
   legt sich selbst fest (Denken vor Klicken). Der Lernstand vermerkt in Worten, bei wie vielen Aufgaben Hilfe genutzt wurde. */
(function () {
  'use strict';
  var PW = window.PW = window.PW || {};
  var NAMEN = ['Begriff', 'Hinweis', 'Lösungsweg'];

  /* stufen: drei Einträge, je String (HTML) oder Funktion, die ein Element oder HTML liefert.
     opt.station, opt.id: für den Lernstand. opt.sperre: Funktion, die true liefert, solange Hilfe noch nicht gezeigt werden soll. */
  PW.hilfen = function (container, stufen, opt) {
    opt = opt || {};
    var box = PW.el('div', { 'class': 'hilfen' });
    var offen = 0;
    var knopf = PW.el('button', { type: 'button', 'class': 'knopf knopf--leise hilfen-knopf', 'aria-expanded': 'false', text: 'Hilfe' });
    var liste = PW.el('ol', { 'class': 'hilfen-stufen', hidden: '' });
    var blaetter = stufen.slice(0, 3).map(function (st, i) {
      var li = PW.el('li', { 'class': 'hilfe', hidden: '' });
      li.appendChild(PW.el('b', { 'class': 'hilfe-titel', text: (i + 1) + ' · ' + NAMEN[i] }));
      li.setAttribute('data-inhalt', '0');
      liste.appendChild(li);
      return { li: li, st: st };
    });
    function fuellen(b) {
      if (b.li.getAttribute('data-inhalt') === '1') return;
      var inhalt = typeof b.st === 'function' ? b.st() : b.st;
      if (typeof inhalt === 'string') b.li.appendChild(PW.el('div', { html: inhalt })); else if (inhalt) b.li.appendChild(inhalt);
      b.li.setAttribute('data-inhalt', '1');
    }
    function beschriften() {
      if (offen >= blaetter.length) { knopf.textContent = 'Alle Hilfen gezeigt'; knopf.disabled = true; return; }
      knopf.textContent = offen === 0 ? 'Hilfe' : 'Nächste Hilfe (' + (offen + 1) + ' von ' + blaetter.length + ')';
    }
    knopf.addEventListener('click', function (ev) {
      if (opt.sperre && opt.sperre()) return;
      var b = blaetter[offen]; if (!b) return;
      fuellen(b); liste.hidden = false; b.li.hidden = false; offen++;
      knopf.setAttribute('aria-expanded', 'true');
      if (PW.notiereHilfe && opt.station) PW.notiereHilfe(opt.station, opt.id, offen);
      beschriften();
      if (!(PW.wenigerBewegung && PW.wenigerBewegung()) && !(ev && ev.detail === 0)) { b.li.classList.add('ist-neu'); setTimeout(function () { b.li.classList.remove('ist-neu'); }, 300); }
    });
    beschriften();
    box.appendChild(knopf); box.appendChild(liste);
    container.appendChild(box);
    return box;
  };

  /* Hilfestufe im Lernstand festhalten: je Aufgabe nur die höchste Stufe */
  PW.notiereHilfe = function (station, id, stufe) {
    var a = PW.lies('lernstand', {}) || {}; var k = 'st' + station + '-hilfen';
    a[k] = a[k] || {};
    if ((a[k][id] || 0) >= stufe) return;
    a[k][id] = stufe;
    PW.merke('lernstand', a);
    if (PW.lernstandAnzeigen) PW.lernstandAnzeigen(station);
  };
  PW.hilfenStand = function (station) {
    var a = PW.lies('lernstand', {}) || {}; var h = a['st' + station + '-hilfen'] || {};
    var ids = Object.keys(h); var tief = ids.filter(function (i) { return h[i] >= 3; }).length;
    return { aufgaben: ids.length, loesungsweg: tief };
  };
})();
