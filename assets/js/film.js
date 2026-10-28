/* Politik-Werkstatt · Muster T »Der Weg einer Forderung« (v6-Vorschlag)
   Ein Eingabe-Film zu den elf Funktionen von Parteien: eine Forderung aus dem Alltag wird verfolgt, bis sie Gesetz ist und geprüft wird.
   Bewegung ist hier Lerngegenstand (Zusammenhang der Funktionen). Regeln: Leinwand zeichnet nur aus Tokens, Frage davor, Zahl und Wort
   neben dem Bild, ziehbar und anhaltbar (Regler, Tasten, Knöpfe), Autoplay nur nach Klick und nur im Sichtfeld, bei weniger Bewegung
   steht jede Szene sofort. Alles ist Modell: In Wirklichkeit laufen die Funktionen gleichzeitig und ohne feste Reihenfolge. */
(function () {
  'use strict';
  var PW = window.PW = window.PW || {};

  /* Szenenfolge als Erzählung (Reihenfolge weicht bewusst von der Liste ab; die Liste bleibt die fachliche Ordnung) */
  var FOLGE = ['artikulation', 'aggregation', 'partizipation', 'information', 'mobilisierung', 'sozialisation', 'rekrutierung', 'legitimation', 'herrschaft', 'transmission', 'kontrolle'];
  var SATZ = {
    artikulation: 'Menschen wollen etwas. Die Partei greift den Wunsch »Mindestlohn 15 €« auf und schreibt ihn ins Programm.',
    aggregation: 'In der Partei gibt es mehrere Vorstellungen – 14, 15, 16 Euro. Sie werden zu einer Linie gebündelt.',
    partizipation: 'Menschen treten ein, stimmen mit ab, diskutieren im Ortsverband: Die Partei macht Mitmachen möglich.',
    information: 'Die Partei erklärt nach außen, was die Forderung bedeutet und wie sie wirken soll.',
    mobilisierung: 'Wahlkampf: Plakate und Videos holen Menschen an die Urne – für die Partei und ihre Ziele.',
    sozialisation: 'Ein Neumitglied lernt, wie Anträge, Parteitage und Abstimmungen funktionieren – es wächst in die Politik hinein.',
    rekrutierung: 'Die Partei stellt eine Kandidatin für den Wahlkreis auf. Aus einem Mitglied wird ein Mandat.',
    legitimation: 'Die Wahl verteilt die Sitze. Auch wer unterliegt, erkennt das Ergebnis an – das trägt das System.',
    herrschaft: 'Die Mehrheit im Bundestag beschließt. Parteien üben Herrschaft aus: Ihre Entscheidung gilt für alle.',
    transmission: 'Die Forderung aus dem Programm wird Gesetz: Ein Interesse ist direkt in eine Entscheidung eingegangen.',
    kontrolle: 'Die Opposition fragt nach: Wirkt das Gesetz? Kleine Anfragen und Ausschüsse kontrollieren die Regierung.'
  };
  var AUFGABEN = { formulierung: 'Politikformulierung', implementation: 'Politikimplementation', kontrolle: 'Politikkontrolle', rekrutierung: 'Personalrekrutierung' };
  var W = 960, H = 540, DAUER = 2600, DAUER_LANGSAM = 4200;

  function fn(id) { for (var i = 0; i < PW.funktionen.length; i++) if (PW.funktionen[i].id === id) return PW.funktionen[i]; return null; }
  function ease(t) { t = Math.max(0, Math.min(1, t)); return 1 - Math.pow(1 - t, 3); }
  function seg(t, a, b) { return ease((t - a) / (b - a)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function zufall(seed) { return function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }; }

  PW.film = function (container, opt) {
    opt = opt || {};
    if (!container || !PW.funktionen) return;
    var weniger = function () { return PW.wenigerBewegung ? PW.wenigerBewegung() : false; };
    var farbe = function (n) { return (PW.farbe && PW.farbe(n)) || '#000'; };

    /* ---------- Markup ---------- */
    var wurzel = PW.el('div', { 'class': 'film' });
    var buehne = PW.el('div', { 'class': 'film-buehne' });
    var canvas = document.createElement('canvas'); canvas.setAttribute('role', 'img'); canvas.className = 'film-leinwand'; canvas.setAttribute('tabindex', '0'); canvas.title = 'Pfeiltasten: Szene wechseln · Leertaste: abspielen oder anhalten';
    buehne.appendChild(canvas);
    var stand = PW.el('p', { 'class': 'film-stand', 'aria-live': 'polite' });
    var kopf = PW.el('div', { 'class': 'film-kopf' });
    var nr = PW.el('p', { 'class': 'film-nr' });
    var titel = PW.el('h3', { 'class': 'film-titel' });
    var chip = PW.el('p', { 'class': 'film-chip' });
    var kurz = PW.el('p', { 'class': 'film-kurz' });
    var satz = PW.el('p', { 'class': 'film-satz' });
    var bsp = PW.el('p', { 'class': 'film-bsp klein' });
    kopf.appendChild(nr); kopf.appendChild(titel); kopf.appendChild(chip); kopf.appendChild(kurz); kopf.appendChild(satz); kopf.appendChild(bsp);
    var steuer = PW.el('div', { 'class': 'film-steuer' });
    var zurueck = PW.el('button', { type: 'button', 'class': 'knopf knopf--leise', text: '← Zurück' });
    var nochmal = PW.el('button', { type: 'button', 'class': 'knopf knopf--leise', text: 'Szene noch einmal' });
    var weiter = PW.el('button', { type: 'button', 'class': 'knopf knopf--voll', text: 'Weiter →' });
    var alle = PW.el('button', { type: 'button', 'class': 'knopf', 'aria-pressed': 'false', text: 'Alle elf abspielen' });
    var tempo = PW.el('button', { type: 'button', 'class': 'knopf knopf--leise', 'aria-pressed': 'false', text: 'Langsamer (Beamer)' });
    steuer.appendChild(zurueck); steuer.appendChild(nochmal); steuer.appendChild(weiter); steuer.appendChild(alle); steuer.appendChild(tempo);
    var punkte = PW.el('ol', { 'class': 'film-punkte', 'aria-label': 'Szenen' });
    var reglerZeile = PW.el('div', { 'class': 'film-regler' });
    var regler = PW.el('input', { type: 'range', min: 0, max: String(FOLGE.length * 1000), step: 1, value: 0, 'aria-label': 'Film ziehen: Szene und Zeitpunkt' });
    reglerZeile.appendChild(PW.el('span', { 'class': 'klein', text: 'Ziehen' })); reglerZeile.appendChild(regler);
    var status = PW.el('p', { 'class': 'film-status klein', html: '<strong>Modell.</strong> Ein durchgespielter Beispielweg – in Wirklichkeit laufen die Funktionen gleichzeitig und ohne feste Reihenfolge. Die Forderung »Mindestlohn 15 €« steht so im SPD-Programm 2025 (Beleg in Station 2); ob sie Gesetz wird, zeigt der Film als Modell, nicht als Tatsache.' });
    wurzel.appendChild(buehne); wurzel.appendChild(punkte); wurzel.appendChild(reglerZeile); wurzel.appendChild(kopf); wurzel.appendChild(steuer); wurzel.appendChild(stand); wurzel.appendChild(status);
    container.appendChild(wurzel);

    var knoepfe = FOLGE.map(function (id, i) {
      var b = PW.el('button', { type: 'button', 'aria-label': 'Szene ' + (i + 1) + ': ' + fn(id).name, text: String(i + 1) });
      b.addEventListener('click', function (ev) { autoAus(); zeige(i, ev && ev.detail === 0 ? 1 : 0, true); });
      punkte.appendChild(PW.el('li', {}, [b])); return b;
    });

    /* ---------- Zeichnen ---------- */
    var ctx = canvas.getContext('2d'), dpr = Math.min(2, window.devicePixelRatio || 1);
    function groesse() { var r = buehne.getBoundingClientRect(); var w = Math.max(320, r.width); canvas.width = Math.round(w * dpr); canvas.height = Math.round(w * H / W * dpr); canvas.style.height = Math.round(w * H / W) + 'px'; }
    groesse(); if (window.ResizeObserver) new ResizeObserver(function () { groesse(); male(); }).observe(buehne); else window.addEventListener('resize', function () { groesse(); male(); });

    var rnd = zufall(21);
    var leute = []; for (var i = 0; i < 36; i++) leute.push({ x: 60 + (i % 12) * 48 + (rnd() - .5) * 16, y: 400 + Math.floor(i / 12) * 44 + (rnd() - .5) * 12 });
    var PL = { x: 220, y: 180, w: 330, h: 140 };           /* Partei-Platte */
    var URNE = { x: 470, y: 262, w: 100, h: 84 };
    var BT = { cx: 790, cy: 285, r0: 72, dr: 24, reihen: 4 };
    var btPunkte = []; (function () { for (var r = 0; r < BT.reihen; r++) { var rad = BT.r0 + r * BT.dr, n = Math.round(Math.PI * rad / 18); for (var k = 0; k < n; k++) { var a = Math.PI - Math.PI * (k + .5) / n; btPunkte.push({ x: BT.cx + rad * Math.cos(a), y: BT.cy - rad * Math.sin(a), a: a }); } } btPunkte.sort(function (p, q) { return q.a - p.a; }); })();

    function sc(v) { return v * canvas.width / W; }
    function kreis(x, y, r, fill, stroke, lw) { ctx.beginPath(); ctx.arc(sc(x), sc(y), sc(r), 0, Math.PI * 2); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.lineWidth = sc(lw || 1.2); ctx.strokeStyle = stroke; ctx.stroke(); } }
    function rect(x, y, w, h, fill, stroke, lw) { ctx.beginPath(); ctx.rect(sc(x), sc(y), sc(w), sc(h)); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.lineWidth = sc(lw || 2); ctx.strokeStyle = stroke; ctx.stroke(); } }
    function text(s, x, y, gr, fill, align, fett) { ctx.font = (fett ? '700 ' : '400 ') + sc(gr) + 'px "Atkinson Hyperlegible Next", system-ui, sans-serif'; ctx.fillStyle = fill; ctx.textAlign = align || 'left'; ctx.textBaseline = 'middle'; ctx.fillText(s, sc(x), sc(y)); }
    function zettel(x, y, w, h, s, alpha, fill, kante) { ctx.save(); ctx.globalAlpha = Math.max(0, Math.min(1, alpha)); rect(x + 4, y + 4, w, h, farbe('karton')); rect(x, y, w, h, fill || farbe('flaeche'), kante || farbe('text')); text(s, x + w / 2, y + h / 2, 24, farbe('text'), 'center', true); ctx.restore(); }
    function kreuz(x, y, r, col, anteil) { ctx.save(); ctx.lineWidth = sc(2.4); ctx.strokeStyle = col; ctx.lineCap = 'round'; var a = Math.max(0, Math.min(1, anteil)); ctx.beginPath(); ctx.moveTo(sc(x - r), sc(y - r)); ctx.lineTo(sc(x - r + 2 * r * Math.min(1, a * 2)), sc(y - r + 2 * r * Math.min(1, a * 2))); ctx.stroke(); if (a > .5) { ctx.beginPath(); ctx.moveTo(sc(x + r), sc(y - r)); ctx.lineTo(sc(x + r - 2 * r * (a - .5) * 2), sc(y - r + 2 * r * (a - .5) * 2)); ctx.stroke(); } ctx.restore(); }
    function linie(x1, y1, x2, y2, col, lw, strich) { ctx.save(); ctx.beginPath(); ctx.moveTo(sc(x1), sc(y1)); ctx.lineTo(sc(x2), sc(y2)); ctx.strokeStyle = col; ctx.lineWidth = sc(lw || 1.5); if (strich) ctx.setLineDash([sc(5), sc(5)]); ctx.stroke(); ctx.restore(); }

    function platte(label, sub, alpha, marke) { ctx.save(); ctx.globalAlpha = alpha === undefined ? 1 : alpha; rect(PL.x + 6, PL.y + 6, PL.w, PL.h, farbe('blau-zart')); rect(PL.x, PL.y, PL.w, PL.h, farbe('flaeche'), farbe('blau'), 2.5); if (marke) { rect(PL.x + PL.w - 96, PL.y - 16, 96, 32, farbe('flaeche'), farbe('text'), 1.5); text('15 €', PL.x + PL.w - 48, PL.y, 22, farbe('text'), 'center', true); } text('Partei', PL.x + 16, PL.y + 26, 24, farbe('blau'), 'left', true); if (label) text(label, PL.x + PL.w / 2, PL.y + 72, 26, farbe('text'), 'center', true); if (sub) text(sub, PL.x + PL.w / 2, PL.y + 108, 24, farbe('leise'), 'center'); ctx.restore(); }
    function menge(aus, mitglieder) { leute.forEach(function (p, i) { if (aus && aus.indexOf(i) >= 0) return; kreis(p.x, p.y, 10, mitglieder && mitglieder.indexOf(i) >= 0 ? farbe('blau') : farbe('text')); }); }
    function urne(alpha, dx) { dx = dx || 0; ctx.save(); ctx.globalAlpha = alpha === undefined ? 1 : alpha; rect(URNE.x + dx, URNE.y, URNE.w, URNE.h, farbe('flaeche'), farbe('text')); rect(URNE.x + dx + 22, URNE.y - 7, URNE.w - 44, 7, farbe('text')); text('Urne', URNE.x + dx + URNE.w / 2, URNE.y + URNE.h + 22, 24, farbe('leise'), 'center'); ctx.restore(); }
    function bundestag(fuellung, alpha, heben) { ctx.save(); ctx.globalAlpha = alpha === undefined ? 1 : alpha; var n = btPunkte.length, mehrheit = Math.round(n * .58); btPunkte.forEach(function (p, i) { var voll = fuellung !== undefined && i < Math.round(fuellung * n); var reg = i < mehrheit; var r = 7.5; if (heben && ((heben === 'reg' && reg) || (heben === 'opp' && !reg))) r = 9.5; kreis(p.x, p.y, r, voll ? (reg ? farbe('blau') : farbe('stahl')) : farbe('partei-leer'), farbe('text'), .6); }); text('Bundestag', BT.cx, BT.cy + 28, 24, farbe('leise'), 'center'); ctx.restore(); }
    function gesetz(x, y, s, alpha) { ctx.save(); ctx.globalAlpha = Math.max(0, Math.min(1, alpha)); rect(x + 4, y + 4, 300, 56, farbe('karton')); rect(x, y, 300, 56, farbe('flaeche'), farbe('text')); text('§', x + 22, y + 28, 30, farbe('akzent'), 'center', true); text(s, x + 40 + 260 / 2 - 10, y + 28, 24, farbe('text'), 'center', true); ctx.restore(); }

    var SZENEN = {
      artikulation: function (t) {
        var quellen = [3, 17, 30], worte = ['Mindestlohn 15 €', 'Mehr Wohnungen', 'Tempolimit'];
        menge();
        platte(t > .75 ? 'Programm:' : '', t > .75 ? 'Mindestlohn 15 €' : '', 1);
        quellen.forEach(function (q, k) {
          var p = leute[q]; var a = seg(t, .05 + k * .08, .35 + k * .08);
          var x0 = p.x - 90, y0 = p.y - 30 - 60 * a;
          if (k === 0) { var m = seg(t, .45, .85); var x = lerp(x0, PL.x + PL.w / 2 - 105, m), y = lerp(y0, PL.y + 48, m); zettel(x, y, 210, 46, worte[k], a * (1 - seg(t, .8, .95))); }
          else zettel(x0, y0, 210, 46, worte[k], a * (1 - seg(t, .55, .9)));
        });
        return 'Drei Wünsche aus der Menge; einer wird zur Programmforderung.';
      },
      aggregation: function (t) {
        menge(); platte(t > .85 ? 'Linie:' : 'Flügel streiten', t > .85 ? 'Mindestlohn 15 €' : '', 1);
        var ks = ['14 €', '15 €', '16 €']; var a = seg(t, .05, .3), m = seg(t, .4, .85);
        ks.forEach(function (s, k) { var x0 = PL.x - 100 + k * 200, y0 = PL.y - 90; var x = lerp(x0, PL.x + PL.w / 2 - 55, m), y = lerp(y0, PL.y + 48, m); zettel(x, y, 110, 44, m > .95 ? '15 €' : s, a * (k === 1 ? 1 - seg(t, .88, .98) : 1 - seg(t, .8, .95))); });
        return 'Drei Vorschläge werden zu einer Linie.';
      },
      partizipation: function (t) {
        var rein = [0, 5, 9, 14, 20, 26, 31, 35]; var mitgl = [];
        menge(rein);
        rein.forEach(function (q, k) { var p = leute[q]; var a = seg(t, .05 + k * .06, .55 + k * .06); var x = lerp(p.x, PL.x + 34 + k * 34, a), y = lerp(p.y, PL.y + PL.h - 22, a); kreis(x, y, 10, a > .95 ? farbe('blau') : farbe('text')); if (a > .95) mitgl.push(q); });
        platte('Mitglieder: ' + mitgl.length, t > .9 ? 'stimmen ab · diskutieren' : '', .9, true);
        return mitgl.length + ' Menschen sind eingetreten.';
      },
      information: function (t) {
        menge(); platte('Erklärt:', '15 € für alle Beschäftigten', 1, true);
        var ziele = [2, 8, 13, 19, 24, 29, 34]; ziele.forEach(function (q, k) { var p = leute[q]; var a = seg(t, .05 + k * .07, .5 + k * .07); if (a <= 0) return; linie(PL.x + PL.w / 2, PL.y + PL.h, lerp(PL.x + PL.w / 2, p.x, a), lerp(PL.y + PL.h, p.y - 10, a), farbe('blau'), 1.5, true); if (a > .98) kreis(p.x, p.y, 15, null, farbe('blau'), 2.5); });
        return 'Erklärungen gehen von der Partei zu den Menschen.';
      },
      mobilisierung: function (t) {
        var geher = [1, 6, 11, 16, 22, 27, 33]; menge(geher); platte('Wahlkampf', '', .9, true); urne(seg(t, .0, .2), 190);
        var pa = seg(t, .05, .3); zettel(PL.x + PL.w + 30, PL.y - 70, 170, 84, '', pa, farbe('akzent-zart'), farbe('akzent'));
        ctx.save(); ctx.globalAlpha = pa; text('Wählt!', PL.x + PL.w + 115, PL.y - 48, 24, farbe('text'), 'center', true); kreis(PL.x + PL.w + 115, PL.y - 12, 11, farbe('flaeche'), farbe('text'), 1.5); kreuz(PL.x + PL.w + 115, PL.y - 12, 5, farbe('text'), seg(t, .3, .5)); ctx.restore();
        geher.forEach(function (q, k) { var p = leute[q]; var a = seg(t, .25 + k * .05, .75 + k * .05); kreis(lerp(p.x, URNE.x + 190 + 14 + k * 14, a), lerp(p.y, URNE.y - 28, a), 10, farbe('text')); });
        return 'Ein Plakat ruft, sieben Menschen gehen zur Urne.';
      },
      sozialisation: function (t) {
        menge(); platte('Neumitglied lernt', '', .9, true);
        var cx = PL.x + PL.w + 240, cy = PL.y + 60; var r = lerp(5, 12, seg(t, .1, .9));
        var lern = ['Antrag', 'Parteitag', 'Abstimmung']; lern.forEach(function (s, k) { var a = seg(t, .15 + k * .22, .4 + k * .22); var ang = -Math.PI / 2 + k * (2 * Math.PI / 3); var x = cx + 110 * Math.cos(ang), y = cy + 80 * Math.sin(ang); linie(cx, cy, lerp(cx, x, a), lerp(cy, y, a), farbe('linie'), 2); zettel(x - 70, y - 22, 140, 44, s, a); });
        kreis(cx, cy, r, t > .9 ? farbe('blau') : farbe('text'));
        return 'Ein neues Mitglied wächst in Regeln und Abläufe hinein.';
      },
      rekrutierung: function (t) {
        menge(); platte('stellt auf', '', .9, true); bundestag(0, seg(t, .5, .8));
        var a = seg(t, .05, .4), b = seg(t, .45, .85); var x0 = PL.x + PL.w - 40, y0 = PL.y + PL.h - 22; var x1 = PL.x + PL.w + 20, y1 = PL.y + 10;
        zettel(x1 - 200, y1 - 90, 250, 46, 'Kandidatin WK 260', a);
        var ziel = btPunkte[Math.floor(btPunkte.length * .3)]; kreis(lerp(lerp(x0, x1, a), ziel.x, b), lerp(lerp(y0, y1, a), ziel.y, b), b > .95 ? 8 : 11, farbe('blau'), farbe('text'), 1);
        return 'Aus einem Mitglied wird eine Kandidatin, aus der Kandidatin ein Mandat.';
      },
      legitimation: function (t) {
        menge(); urne(1); bundestag(seg(t, .45, .95), 1);
        [4, 7, 12, 18, 23, 28, 32].forEach(function (q, k) { var p = leute[q]; var a = seg(t, .02 + k * .04, .3 + k * .04), m = seg(t, .25 + k * .04, .55 + k * .04); if (a <= 0) return; var x = lerp(p.x, URNE.x + URNE.w / 2, m), y = lerp(p.y - 30, URNE.y, m); ctx.save(); ctx.globalAlpha = 1 - seg(t, .55 + k * .03, .7 + k * .03); kreis(x, y, 14, farbe('flaeche'), farbe('text'), 2); kreuz(x, y, 7, farbe('text'), a); ctx.restore(); });
        var gez = [4, 7, 12, 18, 23, 28, 32].filter(function (q, k) { return seg(t, .25 + k * .04, .55 + k * .04) >= 1; }).length; if (gez) text(gez + (gez === 1 ? ' Stimme' : ' Stimmen'), URNE.x - 20, URNE.y + 40, 24, farbe('text'), 'right', true);
        if (t > .9) text('Alle erkennen das Ergebnis an', BT.cx, BT.cy + 62, 24, farbe('text'), 'center', true);
        return 'Kreuze wandern in die Urne, der Bundestag füllt sich.';
      },
      herrschaft: function (t) {
        menge(); bundestag(1, 1, t > .15 && t < .7 ? 'reg' : null);
        var a = seg(t, .35, .8); gesetz(BT.cx - 150, BT.cy + 50 + 50 * a, 'Gesetz beschlossen', seg(t, .3, .6));
        if (t > .8) text('gilt für alle', BT.cx, BT.cy + 190, 24, farbe('leise'), 'center');
        return 'Die Regierungsmehrheit beschließt ein Gesetz.';
      },
      transmission: function (t) {
        menge(); platte('Programm:', 'Mindestlohn 15 €', 1); bundestag(1, 1);
        var m = seg(t, .1, .7); var x = lerp(PL.x + PL.w / 2 - 105, BT.cx - 110, m), y = lerp(PL.y + 48, BT.cy + 105, m);
        gesetz(BT.cx - 150, BT.cy + 100, m > .95 ? 'Mindestlohn 15 €' : 'Gesetz', 1);
        if (m < .95) zettel(x, y, 210, 46, 'Mindestlohn 15 €', 1);
        linie(PL.x + PL.w, PL.y + 70, BT.cx - 155, BT.cy + 125, farbe('linie'), 2, true);
        return 'Die Programmforderung steht jetzt im Gesetz.';
      },
      kontrolle: function (t) {
        menge(); bundestag(1, 1, t > .1 && t < .6 ? 'opp' : null);
        var a = seg(t, .1, .5), b = seg(t, .55, .95);
        zettel(BT.cx - 10, BT.cy + 50 + 30 * (1 - a), 310, 46, 'Kleine Anfrage: Wirkt es?', a);
        zettel(BT.cx - 340, BT.cy + 115 + 30 * (1 - b), 290, 46, 'Antwort der Regierung', b);
        gesetz(BT.cx - 60, BT.cy + 175, 'Mindestlohn 15 €', 1);
        return 'Die Opposition fragt nach, die Regierung muss antworten.';
      }
    };

    var szene = 0, t = 1, laeuft = null, auto = false, sichtbar = true, vorher = null, langsam = false;
    try { langsam = PW.lies && PW.lies('film-tempo', '') === 'langsam'; } catch (e) {}
    function male() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = farbe('flaeche'); ctx.fillRect(0, 0, canvas.width, canvas.height);
      rect(0, 520, W, 20, farbe('karton'));
      var id = FOLGE[szene]; var tt = weniger() ? 1 : t;
      /* Überblenden: die alte Szene bleibt kurz stehen, die neue blendet darüber ein */
      var blende = vorher !== null && vorher !== szene && tt < .18 && !weniger();
      if (blende) { SZENEN[FOLGE[vorher]](1); ctx.save(); ctx.globalAlpha = tt / .18; ctx.fillStyle = farbe('flaeche'); ctx.fillRect(0, 0, canvas.width, canvas.height * 520 / H); }
      var s = SZENEN[id](tt);
      if (blende) ctx.restore();
      /* Titelkarte: Name der Funktion schiebt sich ein, Aufgabe darunter */
      var f = fn(id); var ein = weniger() ? 1 : seg(tt, 0, .22);
      ctx.save(); ctx.globalAlpha = ein; var dx = (1 - ein) * 18;
      ctx.font = '700 ' + sc(30) + 'px "Bricolage Grotesque", "Atkinson Hyperlegible Next", sans-serif'; ctx.fillStyle = farbe('text'); ctx.textAlign = 'right'; ctx.textBaseline = 'middle'; ctx.fillText(f.name, sc(W - 24 + dx), sc(34));
      text(AUFGABEN[f.aufgabe], W - 24 + dx, 64, 24, farbe('leise'), 'right'); ctx.restore();
      /* Band: elf Felder, gesehene gefüllt, aktuelles in Akzent */
      for (var b = 0; b < FOLGE.length; b++) { rect(24 + b * 30, 54, 24, 8, b < szene ? farbe('text') : b === szene ? farbe('akzent') : farbe('karton')); }
      text((szene + 1) + ' / 11', 24, 30, 24, farbe('leise'), 'left');
      canvas.setAttribute('aria-label', 'Szene ' + (szene + 1) + ' von 11, ' + fn(id).name + ': ' + s);
      return s;
    }
    function beschrifte() {
      var f = fn(FOLGE[szene]);
      nr.textContent = 'Szene ' + (szene + 1) + ' von 11 · in der Liste: Funktion ' + (PW.funktionen.indexOf(f) + 1);
      titel.textContent = f.name; chip.textContent = 'Aufgabe: ' + AUFGABEN[f.aufgabe];
      kurz.textContent = f.kurz; satz.textContent = SATZ[f.id]; bsp.textContent = 'Echtes Beispiel: ' + f.beispiel;
      knoepfe.forEach(function (b, i) { b.setAttribute('aria-current', i === szene ? 'step' : 'false'); b.classList.toggle('ist-gesehen', i < szene); });
      zurueck.disabled = szene === 0; weiter.textContent = szene === FOLGE.length - 1 ? 'Zum Ende' : 'Weiter →';
    }
    function spiele(cb) {
      if (laeuft) cancelAnimationFrame(laeuft);
      if (weniger()) { t = 1; male(); stand.textContent = male(); if (cb) cb(); return; }
      var start = performance.now(); t = 0; var dauer = langsam ? DAUER_LANGSAM : DAUER;
      function schritt(now) { if (!sichtbar) { laeuft = requestAnimationFrame(schritt); start += 16; return; } t = Math.min(1, (now - start) / dauer); var s = male(); regler.value = String(szene * 1000 + Math.round(t * 1000)); if (t < 1) laeuft = requestAnimationFrame(schritt); else { laeuft = null; stand.textContent = s; if (cb) cb(); } }
      laeuft = requestAnimationFrame(schritt);
    }
    function zeige(i, sofort, merken) {
      var neu = Math.max(0, Math.min(FOLGE.length - 1, i)); vorher = neu === szene ? null : szene; szene = neu; beschrifte();
      if (sofort) { if (laeuft) cancelAnimationFrame(laeuft); laeuft = null; t = 1; stand.textContent = male(); regler.value = String(szene * 1000 + 1000); }
      else spiele(auto ? function () { if (szene < FOLGE.length - 1) setTimeout(function () { if (auto) zeige(szene + 1); }, langsam ? 1100 : 700); else autoAus(); } : null);
      if (merken && opt.merke) opt.merke(szene);
      if (szene === FOLGE.length - 1 && t >= 1 && opt.amEnde) opt.amEnde();
    }
    function autoAus() { auto = false; alle.setAttribute('aria-pressed', 'false'); alle.textContent = 'Alle elf abspielen'; }
    zurueck.addEventListener('click', function (ev) { autoAus(); zeige(szene - 1, ev.detail === 0 ? 1 : 0, true); });
    weiter.addEventListener('click', function (ev) { autoAus(); if (szene === FOLGE.length - 1) { if (opt.amEnde) opt.amEnde(); return; } zeige(szene + 1, ev.detail === 0 ? 1 : 0, true); });
    nochmal.addEventListener('click', function () { autoAus(); zeige(szene, 0, false); });
    alle.addEventListener('click', function () { if (auto) { autoAus(); if (laeuft) { cancelAnimationFrame(laeuft); laeuft = null; t = 1; stand.textContent = male(); } return; } if (weniger()) return; auto = true; alle.setAttribute('aria-pressed', 'true'); alle.textContent = 'Anhalten'; zeige(szene === FOLGE.length - 1 ? 0 : szene, 0, true); });
    function tempoZeigen() { tempo.setAttribute('aria-pressed', langsam ? 'true' : 'false'); tempo.textContent = langsam ? 'Normales Tempo' : 'Langsamer (Beamer)'; }
    tempo.addEventListener('click', function () { langsam = !langsam; if (PW.merke) PW.merke('film-tempo', langsam ? 'langsam' : 'normal'); tempoZeigen(); }); tempoZeigen();
    regler.addEventListener('input', function () { autoAus(); if (laeuft) { cancelAnimationFrame(laeuft); laeuft = null; } var v = parseInt(regler.value, 10); var i = Math.min(FOLGE.length - 1, Math.floor(v / 1000)); if (i !== szene) { szene = i; beschrifte(); } t = Math.min(1, (v - i * 1000) / 1000); stand.textContent = male(); });
    wurzel.addEventListener('keydown', function (e) { if (e.target === regler) return; if (e.key === 'ArrowRight') { e.preventDefault(); autoAus(); zeige(szene + 1, 1, true); } if (e.key === 'ArrowLeft') { e.preventDefault(); autoAus(); zeige(szene - 1, 1, true); } if (e.key === ' ' && e.target === canvas) { e.preventDefault(); alle.click(); } });
    canvas.addEventListener('click', function () { if (laeuft) return; autoAus(); zeige(szene, 0, false); });
    if (window.IntersectionObserver) new IntersectionObserver(function (es) { es.forEach(function (e) { sichtbar = e.isIntersecting; }); }, { threshold: .2 }).observe(buehne);
    document.addEventListener('pw:ansicht', function () { male(); });
    document.fonts && document.fonts.ready && document.fonts.ready.then(function () { male(); });

    beschrifte(); t = 1; stand.textContent = male(); regler.value = '1000';
    return { zeige: zeige, folge: FOLGE };
  };
})();
