/* GK-Labor · Figuren (v14) – Caja und die anderen erfundenen Personen, als kleine Bildfamilie
   Flache Formen aus Tokens, eine Büste je Person: Grundkreis, Kleidung im Stationston, Gesicht mit Augen, Brauen, Nase, Mund, Wangen.
   Posen für Caja: 'gruss' (Standard) · 'denkt' (Hand am Kinn, Fragezeichen) · 'waehlt' (Stimmzettel mit Kreuz).
   Alle Figuren sind erfunden und stehen für Gruppen, nicht für echte Personen. Rein schmückend-orientierend: aria-hidden, der Text trägt alles.
   Keine Bewegung. Farben: Haut- und Haartöne als eigene Tokens (--haut-*, --haar-*), Kleidung aus den Tönen der Seite. */
(function () {
  'use strict';
  var PW = window.PW = window.PW || {};
  var L = 'var(--fig-linie)';

  function gesicht(o) {
    /* Kopf um (0,0), Breite 60, Höhe 80 */
    var s = '';
    s += '<path d="M-30 -6C-30 -30 -18 -40 0 -40S30 -30 30 -6C30 20 18 40 0 40S-30 20 -30 -6Z" style="fill:' + o.haut + '"/>';
    s += '<circle cx="-19" cy="16" r="5.5" style="fill:var(--fig-wange);opacity:.35"/><circle cx="19" cy="16" r="5.5" style="fill:var(--fig-wange);opacity:.35"/>';
    s += '<ellipse cx="-12" cy="2" rx="3.3" ry="' + (o.blinzeln ? 1.2 : 4.3) + '" style="fill:' + L + '"/><ellipse cx="12" cy="2" rx="3.3" ry="' + (o.blinzeln ? 1.2 : 4.3) + '" style="fill:' + L + '"/>';
    if (!o.blinzeln) s += '<circle cx="-10.8" cy=".4" r="1.2" style="fill:#fff"/><circle cx="13.2" cy=".4" r="1.2" style="fill:#fff"/>';
    s += '<path d="M-19 -9Q-12 -' + (o.braue || 13) + ' -5 -10M5 -10Q12 -' + (o.braue || 13) + ' 19 -9" style="fill:none;stroke:' + (o.brauenfarbe || o.haar) + ';stroke-width:2.6;stroke-linecap:round"/>';
    s += '<path d="M0 4Q-3.5 13 1 15" style="fill:none;stroke:' + o.hautS + ';stroke-width:2.4;stroke-linecap:round"/>';
    s += o.mund === 'offen' ? '<path d="M-8 23Q0 33 8 23Z" style="fill:' + L + '"/>' : o.mund === 'gerade' ? '<path d="M-6 25H6" style="fill:none;stroke:' + L + ';stroke-width:2.4;stroke-linecap:round"/>' : '<path d="M-9 22Q0 31 9 22" style="fill:none;stroke:' + L + ';stroke-width:2.4;stroke-linecap:round"/>';
    if (o.brille) s += '<g style="fill:none;stroke:' + L + ';stroke-width:2.2"><circle cx="-12" cy="2" r="8.5"/><circle cx="12" cy="2" r="8.5"/><path d="M-3.5 2H3.5M-20.5 1L-29 -2M20.5 1L29 -2"/></g>';
    if (o.bart) s += '<path d="M-11 19Q0 13 11 19Q6 24 0 21Q-6 24 -11 19Z" style="fill:' + o.haar + '"/>';
    return s;
  }
  function frisurHinten(o) {
    if (o.frisur === 'dutt') return '<circle cx="0" cy="-52" r="15" style="fill:' + o.haar + '"/><path d="M-42 6C-48 -40 -26 -56 0 -56S48 -40 42 6C44 30 40 46 34 58H-34C-40 46 -44 30 -42 6Z" style="fill:' + o.haar + '"/>';
    if (o.frisur === 'bob') return '<path d="M-38 4C-42 -36 -24 -52 0 -52S42 -36 38 4C40 18 38 28 34 34H-34C-38 28 -40 18 -38 4Z" style="fill:' + o.haar + '"/>';
    return '';
  }
  function frisurVorn(o) {
    if (o.frisur === 'dutt') return '<path d="M-32 -8C-32 -34 -16 -46 4 -44C22 -42 34 -30 32 -6C26 -18 16 -24 6 -26C-4 -16 -18 -10 -32 -8Z" style="fill:' + o.haar + '"/><path d="M-20 -26C-12 -34 0 -36 10 -34" style="fill:none;stroke:' + o.haarL + ';stroke-width:3;stroke-linecap:round"/>';
    if (o.frisur === 'bob') return '<path d="M-33 -4C-34 -34 -18 -46 0 -46S34 -34 33 -4C28 -20 20 -28 10 -30C0 -22 -14 -18 -24 -20C-28 -16 -31 -10 -33 -4Z" style="fill:' + o.haar + '"/><path d="M-16 -32C-8 -38 6 -38 14 -34" style="fill:none;stroke:' + o.haarL + ';stroke-width:3;stroke-linecap:round"/>';
    if (o.frisur === 'kurz') return '<path d="M-31 -12C-34 -40 -16 -50 2 -50C22 -50 36 -38 31 -12C29 -24 24 -30 16 -32C6 -28 -8 -28 -18 -32C-26 -28 -30 -20 -31 -12Z" style="fill:' + o.haar + '"/>' +
      '<g style="fill:' + o.haar + '"><circle cx="-18" cy="-44" r="8"/><circle cx="-6" cy="-49" r="9"/><circle cx="8" cy="-49" r="9"/><circle cx="20" cy="-43" r="8"/></g>' +
      '<path d="M-10 -46C-4 -50 6 -50 12 -47" style="fill:none;stroke:' + o.haarL + ';stroke-width:3;stroke-linecap:round"/>';
    if (o.frisur === 'kranz') return '<path d="M-31 -2C-36 -22 -30 -34 -22 -38C-26 -28 -26 -16 -27 -6ZM31 -2C36 -22 30 -34 22 -38C26 -28 26 -16 27 -6Z" style="fill:' + o.haar + '"/><path d="M-14 -37Q0 -42 14 -37" style="fill:none;stroke:' + o.hautS + ';stroke-width:2;stroke-linecap:round"/>';
    return '';
  }
  /* Eine Büste: Kopfmitte (cx, cy), Maßstab m */
  function bueste(o) {
    var s = '<g transform="translate(' + o.cx + ' ' + o.cy + ') scale(' + (o.m || 1) + ')">';
    s += frisurHinten(o);
    s += '<path d="M-62 110C-60 76 -36 62 -18 58H18C36 62 60 76 62 110Z" style="fill:' + o.jacke + '"/>';                       /* Schultern */
    if (o.kapuze) s += '<path d="M-27 62C-20 50 20 50 27 62C20 76 -20 76 -27 62Z" style="fill:' + L + ';opacity:.22"/>';
    s += '<path d="M-12 34H12V60C6 70 -6 70 -12 60Z" style="fill:' + o.hautS + '"/>';                                          /* Hals */
    if (o.kragen) s += '<path d="M-18 58L0 78L18 58L12 54L0 66L-12 54Z" style="fill:var(--flaeche)"/>';
    if (o.kapuze) s += '<path d="M-8 66V88M8 66V88" style="fill:none;stroke:var(--flaeche);stroke-width:2.6;stroke-linecap:round"/><circle cx="-8" cy="90" r="2.4" style="fill:var(--flaeche)"/><circle cx="8" cy="90" r="2.4" style="fill:var(--flaeche)"/>';
    if (o.kopfhoerer) s += '<path d="M-22 60C-22 74 22 74 22 60" style="fill:none;stroke:' + L + ';stroke-width:5;stroke-linecap:round"/><rect x="-29" y="52" width="10" height="16" rx="4" style="fill:' + L + '"/><rect x="19" y="52" width="10" height="16" rx="4" style="fill:' + L + '"/>';
    if (o.kette) s += '<path d="M-14 60Q0 74 14 60" style="fill:none;stroke:var(--flaeche);stroke-width:2.4;stroke-dasharray:.1 5;stroke-linecap:round"/>';
    s += gesicht(o) + frisurVorn(o);
    if (o.ohrring) s += '<circle cx="-30" cy="14" r="2.6" style="fill:' + o.ohrring + '"/>';
    return s + '</g>';
  }
  function rahmen(inhalt, vb, klasse, grund) {
    return '<svg class="fig ' + (klasse || '') + '" viewBox="' + vb + '" aria-hidden="true" focusable="false">' +
      '<circle cx="' + (vb === '0 0 220 180' ? 110 : 80) + '" cy="96" r="' + (vb === '0 0 220 180' ? 84 : 78) + '" style="fill:' + (grund || 'var(--karton)') + '"/>' + inhalt + '</svg>';
  }

  var CAJA = { cx: 80, cy: 76, haut: 'var(--haut-1)', hautS: 'var(--haut-1-s)', haar: 'var(--haar-1)', haarL: 'var(--haar-1-l)', frisur: 'dutt', jacke: 'var(--ton-gelb-tief)', kapuze: true, ohrring: 'var(--ton-gelb)' };
  function kopie(o, mehr) { var n = {}; Object.keys(o).forEach(function (k) { n[k] = o[k]; }); Object.keys(mehr || {}).forEach(function (k) { n[k] = mehr[k]; }); return n; }

  PW.figur = function (wer, pose) {
    if (wer === 'mitschueler') return rahmen(bueste({ cx: 80, cy: 76, haut: 'var(--haut-2)', hautS: 'var(--haut-2-s)', haar: 'var(--haar-2)', haarL: 'var(--haar-2-l)', frisur: 'kurz', jacke: 'var(--ton-blau-tief)', kopfhoerer: true, braue: 12 }), '0 0 160 180', 'fig--mitschueler');
    if (wer === 'grosseltern') return rahmen(
      bueste({ cx: 70, cy: 92, m: 0.78, haut: 'var(--haut-3)', hautS: 'var(--haut-3-s)', haar: 'var(--haar-grau)', haarL: 'var(--haar-grau-l)', frisur: 'bob', jacke: 'var(--ton-warm-tief)', brille: true, kette: true, brauenfarbe: 'var(--haar-grau-s)' }) +
      bueste({ cx: 150, cy: 86, m: 0.82, haut: 'var(--haut-3)', hautS: 'var(--haut-3-s)', haar: 'var(--haar-grau)', haarL: 'var(--haar-grau-l)', frisur: 'kranz', jacke: 'var(--ton-gruen-tief)', kragen: true, bart: true, mund: 'gerade', brauenfarbe: 'var(--haar-grau-s)' }),
      '0 0 220 180', 'fig--grosseltern');
    /* Caja */
    var extra = '';
    if (pose === 'denkt') {
      extra = '<path d="M150 180C148 156 132 140 116 134L104 146C114 154 118 166 118 180Z" style="fill:var(--ton-gelb-tief)"/><path d="M150 180C148 156 132 140 116 134L104 146C114 154 118 166 118 180Z" style="fill:' + L + ';opacity:.14"/>' +
        '<ellipse cx="103" cy="122" rx="10" ry="9" style="fill:var(--haut-1)"/><path d="M96 118C100 114 106 114 110 118" style="fill:none;stroke:var(--haut-1-s);stroke-width:2.2;stroke-linecap:round"/>' +
        '<circle cx="134" cy="34" r="16" style="fill:var(--flaeche);stroke:' + L + ';stroke-width:2.5"/><circle cx="116" cy="54" r="4" style="fill:var(--flaeche);stroke:' + L + ';stroke-width:2.5"/>' +
        '<path d="M129 30C129 24 139 24 139 30C139 34 134 34 134 39" style="fill:none;stroke:var(--akzent);stroke-width:3.2;stroke-linecap:round"/><circle cx="134" cy="45" r="2" style="fill:var(--akzent)"/>';
      return rahmen(bueste(kopie(CAJA, { braue: 15, mund: 'gerade' })) + extra, '0 0 160 180', 'fig--caja fig--denkt');
    }
    if (pose === 'waehlt') {
      extra = '<g transform="rotate(9 122 128)"><rect x="100" y="98" width="46" height="60" rx="2" style="fill:var(--flaeche);stroke:' + L + ';stroke-width:2.5"/>' +
        '<path d="M108 110H138M108 120H126" style="stroke:var(--stahl);stroke-width:3;stroke-linecap:round"/><circle cx="123" cy="140" r="9" style="fill:none;stroke:' + L + ';stroke-width:2.5"/><path d="M117 134L129 146M129 134L117 146" style="stroke:var(--akzent);stroke-width:3.4;stroke-linecap:round"/></g>' +
        '<ellipse cx="108" cy="160" rx="11" ry="9" style="fill:var(--haut-1)"/><path d="M100 158C104 153 112 153 116 158" style="fill:none;stroke:var(--haut-1-s);stroke-width:2.2;stroke-linecap:round"/>';
      return rahmen(bueste(kopie(CAJA, { mund: 'offen' })) + extra, '0 0 160 180', 'fig--caja fig--waehlt');
    }
    return rahmen(bueste(CAJA), '0 0 160 180', 'fig--caja');
  };

  /* Caja-Kärtchen: <aside class="caja" data-pose="denkt"> – das Bild kommt per Skript, der Text steht im Markup. */
  PW.cajaBild = function (pose) { return PW.figur('caja', pose).replace('class="fig ', 'class="caja-bild fig '); };
  PW.cajaKarten = function () {
    document.querySelectorAll('aside.caja').forEach(function (a) {
      if (a.querySelector('.caja-bild')) return;
      a.insertAdjacentHTML('afterbegin', PW.cajaBild(a.getAttribute('data-pose') || ''));
      if (!a.querySelector('.caja-name')) a.insertBefore(PW.el('p', { 'class': 'caja-name', text: 'Caja · 19 · erfundene Figur' }), a.querySelector('p'));
    });
  };
})();
