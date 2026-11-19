/* Politik-Werkstatt · Muster AA »Der Weg durch die Einheit« (v7)
   Advance Organizer nach dem Prinzip »Der Weg einer Forderung«: fünf Stationen auf einer gepunkteten Linie,
   je Station Leitfrage, Kernbegriffe, Ziel und was man mitnimmt; am Ende das eigene Urteil.
   Bewegung: Die Linie zieht sich einmal von Station 1 bis zum Urteil (scale, 440 ms), wenn der Weg ins Bild kommt.
   Weniger Bewegung oder schon gesehen: sofort fertig. Ohne JavaScript steht der Rückfall-Text im HTML. */
(function () {
  'use strict';
  var PW = window.PW = window.PW || {};
  PW.organizer = function (wurzel, ziel) {
    var box = ziel || document.getElementById('organizer'); if (!box || !PW.einheit) return;
    wurzel = wurzel || '';
    var fertig = PW.lies('fertig', {});
    var ol = PW.el('ol', { 'class': 'org-weg' });
    PW.einheit.forEach(function (s) {
      var li = PW.el('li', { 'class': 'org-station', style: '--st:var(--ton-' + s.ton + ');--st-tief:var(--ton-' + s.ton + '-tief)' });
      var ist = !!fertig['st' + s.nr];
      if (ist) li.classList.add('ist-fertig');
      li.appendChild(PW.el('span', { 'class': 'org-kreis', 'aria-hidden': 'true', text: String(s.nr) }));
      var karte = PW.el('div', { 'class': 'org-karte' });
      karte.appendChild(PW.el('p', { 'class': 'org-ziel', text: 'Station ' + s.nr + ' · Ziel ' + s.ziel + (ist ? ' · erledigt' : '') }));
      karte.appendChild(PW.el('h3', {}, [PW.el('a', { href: wurzel + s.url, text: s.name })]));
      karte.appendChild(PW.el('p', { 'class': 'org-frage', text: s.frage }));
      if (s.caja) karte.appendChild(PW.el('p', { 'class': 'org-caja', html: '<span class="sr-only">Caja: </span>' + s.caja }));
      var ul = PW.el('ul', { 'class': 'org-begriffe', 'aria-label': 'Kernbegriffe' });
      s.begriffe.forEach(function (b) { ul.appendChild(PW.el('li', { text: b })); });
      karte.appendChild(ul);
      karte.appendChild(PW.el('p', { 'class': 'org-mit', html: '<strong>Das nimmst du mit:</strong> ' + s.mit }));
      li.appendChild(karte);
      ol.appendChild(li);
    });
    var ende = PW.el('li', { 'class': 'org-ende' });
    ende.appendChild(PW.el('span', { 'class': 'org-kreis org-kreis--ende', 'aria-hidden': 'true', text: '§' }));
    ende.appendChild(PW.el('div', { 'class': 'org-karte' }, [
      PW.el('p', { 'class': 'org-ziel', text: 'Am Ende' }),
      PW.el('h3', { text: 'Dein Urteil' }),
      PW.el('p', { 'class': 'org-frage', text: 'Soll die 5-%-Hürde bleiben, wie sie ist?' }),
      PW.el('p', { 'class': 'org-mit', html: 'Du stellst dich vorher und nachher auf die Urteilslinie und siehst, ob du dich bewegt hast. Üben wie in der Klausur: <a href="' + wurzel + 'klausurtraining.html">Klausurtraining</a>.' })
    ]));
    ol.appendChild(ende);
    box.textContent = ''; box.appendChild(ol);

    /* Bewegung: einmal je Sitzung, nur wenn der Weg beim Laden unterhalb des Bildschirms liegt */
    var schon = false; try { schon = sessionStorage.getItem('pw:org') === '1'; } catch (e) {}
    var weniger = PW.wenigerBewegung ? PW.wenigerBewegung() : false;
    if (schon || weniger || !('IntersectionObserver' in window) || ol.getBoundingClientRect().top < window.innerHeight) return;
    ol.classList.add('ist-warten');
    var io = new IntersectionObserver(function (e) {
      if (!e[0].isIntersecting) return; io.disconnect();
      ol.classList.remove('ist-warten'); ol.classList.add('ist-zeichnen');
      try { sessionStorage.setItem('pw:org', '1'); } catch (x) {}
    }, { threshold: 0.25 });
    io.observe(ol);
  };
})();
