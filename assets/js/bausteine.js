/* Politik-Werkstatt · Bausteine v6 (aus »Gegenwart« übernommen und an den Stimmzettel angepasst)
   U Schieber (Vorher–nachher) · V Regler mit sichtbarer Folge · W Wendekarten · X Verortung · Y Zeitstrahl · Z Sortieren mit der Hand.
   Regeln: Festlegung vor Auflösung, Text neben dem Bild, Tastatur und Finger, nur transform/opacity, Endzustand ohne JavaScript lesbar. */
(function () {
  'use strict';
  var PW = window.PW = window.PW || {};
  var weniger = function () { return PW.wenigerBewegung ? PW.wenigerBewegung() : false; };

  /* ---------- U · Schieber: zwei Ansichten übereinander, die Person zieht die Grenze ---------- */
  PW.schieber = function (container, opt) {
    var w = PW.el('div', { 'class': 'schieber' });
    var buehne = PW.el('div', { 'class': 'schieber-buehne' });
    var unten = PW.el('div', { 'class': 'schieber-ebene schieber-unten' }), oben = PW.el('div', { 'class': 'schieber-ebene schieber-oben' });
    opt.links(unten); opt.rechts(oben);
    var griff = PW.el('div', { 'class': 'schieber-griff', 'aria-hidden': 'true' });
    buehne.appendChild(unten); buehne.appendChild(oben); buehne.appendChild(griff);
    var regler = PW.el('input', { type: 'range', min: 0, max: 100, value: 50, 'aria-label': opt.label || 'Vorher und nachher: Grenze ziehen' });
    var zeile = PW.el('div', { 'class': 'schieber-zeile' }, [PW.el('span', { text: opt.linksName }), regler, PW.el('span', { text: opt.rechtsName })]);
    var stand = PW.el('p', { 'class': 'klein schieber-stand', 'aria-live': 'polite' });
    function setze(v) { oben.style.clipPath = 'inset(0 0 0 ' + v + '%)'; griff.style.left = v + '%'; stand.textContent = v <= 2 ? 'Nur ' + opt.rechtsName + ' sichtbar.' : v >= 98 ? 'Nur ' + opt.linksName + ' sichtbar.' : 'Links ' + opt.linksName + ', rechts ' + opt.rechtsName + ' – Grenze bei ' + v + ' %.'; }
    regler.addEventListener('input', function () { setze(parseInt(regler.value, 10)); });
    /* Ziehen direkt auf der Bühne (Finger und Maus) */
    var aktiv = false;
    function ausPos(e) { var r = buehne.getBoundingClientRect(); var x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left; var v = Math.round(Math.max(0, Math.min(100, x / r.width * 100))); regler.value = v; setze(v); }
    buehne.addEventListener('pointerdown', function (e) { aktiv = true; buehne.setPointerCapture(e.pointerId); ausPos(e); });
    buehne.addEventListener('pointermove', function (e) { if (aktiv) ausPos(e); });
    buehne.addEventListener('pointerup', function () { aktiv = false; }); buehne.addEventListener('pointercancel', function () { aktiv = false; });
    setze(50);
    w.appendChild(buehne); w.appendChild(zeile); w.appendChild(stand); container.appendChild(w);
    return { setze: setze };
  };

  /* ---------- V · Regler mit sichtbarer Folge: Wichtigkeit je Streitfrage, Reihung ordnet sich live ---------- */
  PW.wichtigkeit = function (container, fragen, opt) {
    opt = opt || {};
    var werte = PW.lies(opt.schluessel || 'wichtig', {}) || {};
    var w = PW.el('div', { 'class': 'wichtig' });
    var liste = PW.el('div', { 'class': 'wichtig-liste' });
    var reihung = PW.el('ol', { 'class': 'wichtig-reihung', 'aria-label': 'Deine Reihung' });
    var regler = {};
    fragen.forEach(function (q) {
      var v = werte[q.id] === undefined ? 50 : werte[q.id];
      var inp = PW.el('input', { type: 'range', min: 0, max: 100, step: 5, value: v, id: 'wi-' + q.id, 'aria-valuetext': v + ' von 100' });
      var wort = PW.el('output', { 'for': 'wi-' + q.id, 'class': 'wichtig-wort' });
      var zeile = PW.el('div', { 'class': 'wichtig-zeile' }, [PW.el('label', { 'for': 'wi-' + q.id, text: q.frage }), inp, wort]);
      regler[q.id] = inp;
      inp.addEventListener('input', function () { werte[q.id] = parseInt(inp.value, 10); inp.setAttribute('aria-valuetext', inp.value + ' von 100'); PW.merke(opt.schluessel || 'wichtig', werte); zeige(); });
      liste.appendChild(zeile);
    });
    function wortFuer(v) { return v >= 80 ? 'sehr wichtig' : v >= 60 ? 'wichtig' : v >= 40 ? 'mittel' : v >= 20 ? 'wenig' : 'unwichtig'; }
    var ids = fragen.map(function (q) { return q.id; }), ersteReihe = true;
    function zeige() {
      fragen.forEach(function (q) { var v = werte[q.id] === undefined ? 50 : werte[q.id]; liste.querySelector('#wi-' + q.id).nextSibling.textContent = wortFuer(v); });
      var sortiert = ids.slice().sort(function (a, b) { return (werte[b] === undefined ? 50 : werte[b]) - (werte[a] === undefined ? 50 : werte[a]); });
      /* FLIP: Zeilen gleiten an ihren neuen Platz */
      var alt = {}; reihung.querySelectorAll('li').forEach(function (li) { alt[li.getAttribute('data-id')] = li.getBoundingClientRect().top; });
      reihung.innerHTML = '';
      sortiert.forEach(function (id, i) {
        var q = fragen.filter(function (x) { return x.id === id; })[0]; var v = werte[id] === undefined ? 50 : werte[id];
        var li = PW.el('li', { 'data-id': id, 'class': i < 3 ? 'ist-oben' : '' }, [PW.el('span', { 'class': 'wichtig-balken', style: 'transform:scaleX(' + (v / 100).toFixed(2) + ')' }), PW.el('span', { 'class': 'wichtig-name', text: q.frage }), PW.el('span', { 'class': 'wichtig-zahl', text: v })]);
        reihung.appendChild(li);
      });
      if (!ersteReihe && !weniger()) reihung.querySelectorAll('li').forEach(function (li) { var id = li.getAttribute('data-id'); if (alt[id] === undefined) return; var d = alt[id] - li.getBoundingClientRect().top; if (!d) return; li.style.transition = 'none'; li.style.transform = 'translateY(' + d + 'px)'; requestAnimationFrame(function () { li.style.transition = 'transform var(--dauer-sitze) var(--ease-inout)'; li.style.transform = ''; }); });
      ersteReihe = false;
      if (opt.bei) opt.bei(Object.keys(werte).length ? sortiert.slice(0, 3) : null, werte);
    }
    w.appendChild(liste); w.appendChild(reihung); container.appendChild(w);
    zeige();
    return { top: function () { return ids.slice().sort(function (a, b) { return (werte[b] === undefined ? 50 : werte[b]) - (werte[a] === undefined ? 50 : werte[a]); }).slice(0, 3); }, setze: function (id, v) { werte[id] = v; regler[id].value = v; PW.merke(opt.schluessel || 'wichtig', werte); zeige(); } };
  };

  /* ---------- W · Wendekarten: Begriff vorn, Tippen dreht, hinten Definition und Beispiel; dann Selbsteinschätzung in Worten ---------- */
  PW.wendekarten = function (container, begriffe, opt) {
    opt = opt || {};
    var stand = PW.lies(opt.schluessel || 'karten', {}) || {};
    var w = PW.el('div', { 'class': 'wende-stapel' });
    var zaehler = PW.el('p', { 'class': 'klein wende-zaehler', 'aria-live': 'polite' });
    function zaehle() { var k = Object.keys(stand).filter(function (b) { return stand[b] === 'kann'; }).length, n = Object.keys(stand).filter(function (b) { return stand[b] === 'noch'; }).length; zaehler.textContent = (k || n) ? 'Du sagst: ' + k + ' von ' + begriffe.length + ' kann ich erklären, ' + n + ' noch nicht' + (begriffe.length - k - n ? ', ' + (begriffe.length - k - n) + ' offen' : '') + '. Keine Note – dein eigener Stand.' : 'Tippe eine Karte, lies die Rückseite und sag dann, ob du den Begriff erklären kannst.'; }
    begriffe.forEach(function (b, i) {
      var karte = PW.el('div', { 'class': 'wende', 'data-begriff': b.b });
      var knopf = PW.el('button', { type: 'button', 'class': 'wende-innen', 'aria-expanded': 'false', 'aria-label': 'Karte ' + (i + 1) + ': ' + b.b + ' – umdrehen' });
      var vorn = PW.el('div', { 'class': 'wende-seite wende-vorn' }, [PW.el('span', { 'class': 'wende-nr', text: String(i + 1) }), PW.el('strong', { text: b.b }), PW.el('span', { 'class': 'klein', text: 'Tippen: umdrehen ↻' })]);
      var hinten = PW.el('div', { 'class': 'wende-seite wende-hinten', 'aria-hidden': 'true' }, [PW.el('strong', { text: b.b }), PW.el('p', { text: b.d }), PW.el('p', { 'class': 'klein', text: 'Beispiel: ' + b.bsp })]);
      knopf.appendChild(vorn); knopf.appendChild(hinten);
      var urteil = PW.el('div', { 'class': 'wende-urteil' });
      var kann = PW.el('button', { type: 'button', 'class': 'knopf knopf--leise', 'aria-pressed': stand[b.b] === 'kann' ? 'true' : 'false', text: 'Kann ich erklären' });
      var noch = PW.el('button', { type: 'button', 'class': 'knopf knopf--leise', 'aria-pressed': stand[b.b] === 'noch' ? 'true' : 'false', text: 'Noch nicht' });
      function setze(v) { stand[b.b] = v; PW.merke(opt.schluessel || 'karten', stand); kann.setAttribute('aria-pressed', v === 'kann' ? 'true' : 'false'); noch.setAttribute('aria-pressed', v === 'noch' ? 'true' : 'false'); karte.setAttribute('data-stand', v); zaehle(); }
      kann.addEventListener('click', function () { setze('kann'); }); noch.addEventListener('click', function () { setze('noch'); });
      if (stand[b.b]) karte.setAttribute('data-stand', stand[b.b]);
      knopf.addEventListener('click', function (ev) { var offen = karte.classList.toggle('ist-gewendet'); knopf.setAttribute('aria-expanded', offen ? 'true' : 'false'); hinten.setAttribute('aria-hidden', offen ? 'false' : 'true'); vorn.setAttribute('aria-hidden', offen ? 'true' : 'false'); if (ev.detail === 0 || weniger()) karte.classList.add('ohne-drehung'); else karte.classList.remove('ohne-drehung'); });
      urteil.appendChild(kann); urteil.appendChild(noch);
      karte.appendChild(knopf); karte.appendChild(urteil); w.appendChild(karte);
    });
    container.appendChild(zaehler); container.appendChild(w); zaehle();
  };

  /* ---------- X · Verortung: sich auf zwei Achsen einordnen, erst dann die Parteien sehen ---------- */
  PW.verortung = function (container, fragen, opt) {
    opt = opt || {};
    var gemerkt = PW.lies(opt.schluessel || 'verortung', {}) || {};
    var w = PW.el('div', { 'class': 'verortung' });
    var wahl = PW.el('div', { 'class': 'verortung-wahl' });
    function auswahl(name, label, vor) { var sel = PW.el('select', { id: 'vo-' + name, 'aria-label': label }); fragen.forEach(function (q) { var o = PW.el('option', { value: q.id, text: q.frage }); if (q.id === vor) o.selected = true; sel.appendChild(o); }); var l = PW.el('label', { 'for': 'vo-' + name, text: label }); wahl.appendChild(PW.el('div', {}, [l, sel])); return sel; }
    var selX = auswahl('x', 'Waagerechte Achse', gemerkt.x || fragen[0].id), selY = auswahl('y', 'Senkrechte Achse', gemerkt.y || fragen[1].id);
    var feld = PW.el('div', { 'class': 'verortung-feld', tabindex: '0', role: 'img' });
    var punkt = PW.el('div', { 'class': 'verortung-punkt', 'aria-hidden': 'true' });
    var ax = { l: PW.el('span', { 'class': 'vo-ax vo-l' }), r: PW.el('span', { 'class': 'vo-ax vo-r' }), o: PW.el('span', { 'class': 'vo-ax vo-o' }), u: PW.el('span', { 'class': 'vo-ax vo-u' }) };
    var zellen = {}; ['lo', 'ro', 'lu', 'ru'].forEach(function (k) { zellen[k] = PW.el('div', { 'class': 'vo-zelle vo-' + k }); feld.appendChild(zellen[k]); });
    Object.keys(ax).forEach(function (k) { feld.appendChild(ax[k]); }); feld.appendChild(punkt);
    var stand = PW.el('p', { 'class': 'klein verortung-stand', 'aria-live': 'polite' });
    var fest = PW.el('button', { type: 'button', 'class': 'knopf knopf--voll', text: 'Festlegen' });
    var zeigen = PW.el('button', { type: 'button', 'class': 'knopf', text: 'Parteien einblenden', disabled: '' });
    var neu = PW.el('button', { type: 'button', 'class': 'knopf knopf--leise', text: 'Neu setzen' });
    var belege = PW.el('div', { 'class': 'verortung-belege' });
    var pos = null, festgelegt = false, eingeblendet = false;
    function q(id) { return fragen.filter(function (x) { return x.id === id; })[0]; }
    function achsen() { var qx = q(selX.value), qy = q(selY.value); ax.l.textContent = qx.kategorien[1]; ax.r.textContent = qx.kategorien[0]; ax.o.textContent = qy.kategorien[0]; ax.u.textContent = qy.kategorien[1]; feld.setAttribute('aria-label', 'Fläche: waagerecht ' + qx.frage + ' (' + qx.kategorien[1] + ' links, ' + qx.kategorien[0] + ' rechts), senkrecht ' + qy.frage + ' (' + qy.kategorien[0] + ' oben, ' + qy.kategorien[1] + ' unten)'); }
    function setzePunkt(x, y) { pos = { x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) }; punkt.style.left = (pos.x * 100) + '%'; punkt.style.top = ((1 - pos.y) * 100) + '%'; punkt.hidden = false; var qx = q(selX.value), qy = q(selY.value); stand.textContent = 'Dein Punkt: ' + (pos.x > .5 ? 'eher ' + qx.kategorien[0] : pos.x < .5 ? 'eher ' + qx.kategorien[1] : 'unentschieden') + ' beim Thema »' + qx.frage.replace(/\?$/, '') + '«, ' + (pos.y > .5 ? 'eher ' + qy.kategorien[0] : pos.y < .5 ? 'eher ' + qy.kategorien[1] : 'unentschieden') + ' bei »' + qy.frage.replace(/\?$/, '') + '«.'; }
    function ausEreignis(e) { var r = feld.getBoundingClientRect(); setzePunkt((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height); }
    var zieht = false;
    feld.addEventListener('pointerdown', function (e) { if (festgelegt) return; zieht = true; feld.setPointerCapture(e.pointerId); ausEreignis(e); });
    feld.addEventListener('pointermove', function (e) { if (zieht && !festgelegt) ausEreignis(e); });
    feld.addEventListener('pointerup', function () { zieht = false; }); feld.addEventListener('pointercancel', function () { zieht = false; });
    feld.addEventListener('keydown', function (e) { if (festgelegt) return; var p = pos || { x: .5, y: .5 }, d = .05; if (e.key === 'ArrowLeft') setzePunkt(p.x - d, p.y); else if (e.key === 'ArrowRight') setzePunkt(p.x + d, p.y); else if (e.key === 'ArrowUp') setzePunkt(p.x, p.y + d); else if (e.key === 'ArrowDown') setzePunkt(p.x, p.y - d); else return; e.preventDefault(); });
    function leeren() { Object.keys(zellen).forEach(function (k) { zellen[k].innerHTML = ''; }); belege.innerHTML = ''; }
    function einblenden() {
      leeren(); var qx = q(selX.value), qy = q(selY.value); var ohne = [];
      PW.parteien.forEach(function (p) {
        var px = qx.pos[p.id], py = qy.pos[p.id]; if (!px || !py) return;
        var kx = px[0] === qx.kategorien[0] ? 'r' : px[0] === qx.kategorien[1] ? 'l' : null, ky = py[0] === qy.kategorien[0] ? 'o' : py[0] === qy.kategorien[1] ? 'u' : null;
        if (!kx || !ky) { ohne.push(p.name + (!kx ? ' (keine Aussage zu »' + qx.frage.replace(/\?$/, '') + '«)' : ' (keine Aussage zu »' + qy.frage.replace(/\?$/, '') + '«)')); return; }
        zellen[kx + ky].appendChild(PW.el('span', { 'class': 'vo-partei', style: '--pf:' + p.farbe }, [PW.el('i', { 'aria-hidden': 'true' }), p.name]));
        belege.appendChild(PW.el('p', { 'class': 'klein', html: '<strong>' + p.name + ':</strong> ' + px[0] + ' (' + (px[2] !== '–' ? px[2] : 'ohne Fundstelle') + ') · ' + py[0] + ' (' + (py[2] !== '–' ? py[2] : 'ohne Fundstelle') + ')' }));
      });
      if (ohne.length) belege.appendChild(PW.el('p', { 'class': 'klein', text: 'Nicht auf der Fläche: ' + ohne.join(', ') + '.' }));
      belege.appendChild(PW.el('p', { 'class': 'klein', style: 'color:var(--leise)', text: 'Die Parteien stehen in den vier Feldern, weil ihre Programme nur »dafür« oder »dagegen« sagen – Zwischentöne stehen in den Programmstellen. Die Seite rechnet keine Nähe aus; das Bild zeigt, wer wo steht.' }));
      eingeblendet = true; zeigen.disabled = true; if (opt.bei) opt.bei();
    }
    fest.addEventListener('click', function () { if (!pos) { stand.textContent = 'Setze zuerst deinen Punkt – tippen, ziehen oder Pfeiltasten.'; return; } festgelegt = true; fest.disabled = true; zeigen.disabled = false; feld.classList.add('ist-fest'); PW.merke(opt.schluessel || 'verortung', { x: selX.value, y: selY.value, px: pos.x, py: pos.y }); });
    zeigen.addEventListener('click', einblenden);
    neu.addEventListener('click', function () { festgelegt = false; eingeblendet = false; pos = null; punkt.hidden = true; fest.disabled = false; zeigen.disabled = true; feld.classList.remove('ist-fest'); leeren(); stand.textContent = 'Setze deinen Punkt.'; });
    [selX, selY].forEach(function (sel) { sel.addEventListener('change', function () { if (selX.value === selY.value) { sel.value = fragen.filter(function (x) { return x.id !== (sel === selX ? selY.value : selX.value); })[0].id; } achsen(); neu.click(); }); });
    achsen(); punkt.hidden = true; stand.textContent = 'Setze deinen Punkt – tippen, ziehen oder Pfeiltasten.';
    if (gemerkt.px !== undefined) { setzePunkt(gemerkt.px, gemerkt.py); }
    w.appendChild(wahl); w.appendChild(feld); w.appendChild(stand); w.appendChild(PW.el('div', { 'class': 'knopfzeile' }, [fest, zeigen, neu])); w.appendChild(belege); container.appendChild(w);
  };

  /* ---------- Y · Zeitstrahl: Parteien und Parteienrecht 1863–2025, gezogen ---------- */
  PW.zeitstrahlBaustein = function (container, ereignisse, opt) {
    opt = opt || {};
    var j0 = ereignisse[0].j, j1 = ereignisse[ereignisse.length - 1].j;
    var w = PW.el('div', { 'class': 'zeitstrahl' });
    var spur = PW.el('div', { 'class': 'zs-spur', 'aria-hidden': 'true' });
    var fuell = PW.el('div', { 'class': 'zs-fuellung' }); spur.appendChild(fuell);
    var marken = ereignisse.map(function (e, i) { var m = PW.el('button', { type: 'button', 'class': 'zs-marke zs-' + e.art, style: 'left:' + ((e.j - j0) / (j1 - j0) * 100) + '%', 'aria-label': e.j + ': ' + e.t }); m.addEventListener('click', function () { regler.value = String(e.j); zeige(e.j, true); }); spur.appendChild(m); return m; });
    var regler = PW.el('input', { type: 'range', min: j0, max: j1, step: 1, value: j0, 'aria-label': 'Jahr ziehen, ' + j0 + ' bis ' + j1 });
    var jahr = PW.el('p', { 'class': 'zs-jahr' });
    var text = PW.el('p', { 'class': 'zs-text', 'aria-live': 'polite' });
    var liste = PW.el('ol', { 'class': 'zs-liste' });
    ereignisse.forEach(function (e) { liste.appendChild(PW.el('li', { 'data-jahr': e.j }, [PW.el('b', { text: String(e.j) }), ' ', e.t])); });
    function zeige(j, direkt) {
      j = parseInt(j, 10); fuell.style.transform = 'scaleX(' + ((j - j0) / (j1 - j0)).toFixed(3) + ')';
      var akt = null; ereignisse.forEach(function (e, i) { var da = e.j <= j; marken[i].classList.toggle('ist-da', da); marken[i].classList.toggle('ist-aktuell', false); if (da) akt = i; });
      if (akt !== null) marken[akt].classList.add('ist-aktuell');
      jahr.textContent = String(j); text.textContent = akt === null ? 'Noch nichts – zieh nach rechts.' : ereignisse[akt].j + ': ' + ereignisse[akt].t;
      liste.querySelectorAll('li').forEach(function (li) { li.classList.toggle('ist-aktuell', akt !== null && parseInt(li.getAttribute('data-jahr'), 10) === ereignisse[akt].j); li.classList.toggle('ist-da', parseInt(li.getAttribute('data-jahr'), 10) <= j); });
    }
    regler.addEventListener('input', function () { zeige(regler.value); });
    w.appendChild(spur); w.appendChild(regler); w.appendChild(PW.el('div', { 'class': 'zs-kopf' }, [jahr, text]));
    var det = PW.el('details'); det.appendChild(PW.el('summary', { text: 'Alle Ereignisse als Liste' })); det.appendChild(liste); w.appendChild(det);
    container.appendChild(w); zeige(opt.start || j0);
  };

  /* ---------- Z · Sortieren mit der Hand: Beispiele auf die vier Aufgaben ziehen (oder tippen, oder Tastatur) ---------- */
  PW.sortieren = function (container, beispiele, aufgaben, funktionen, opt) {
    opt = opt || {};
    var w = PW.el('div', { 'class': 'sortieren' });
    var ablage = PW.el('div', { 'class': 'sort-ablage', 'aria-label': 'Noch nicht zugeordnet' });
    var felder = {}; var felderBox = PW.el('div', { 'class': 'sort-felder' });
    aufgaben.forEach(function (a) { var f = PW.el('div', { 'class': 'sort-feld', 'data-aufgabe': a.id, role: 'group', 'aria-label': a.name }); f.appendChild(PW.el('h4', { text: a.name })); f.appendChild(PW.el('p', { 'class': 'klein', text: a.text })); var ziel = PW.el('button', { type: 'button', 'class': 'sort-ziel', text: 'Hierhin' }); ziel.addEventListener('click', function () { if (gewaehlt) lege(gewaehlt, a.id); }); f.appendChild(ziel); f.appendChild(PW.el('div', { 'class': 'sort-inhalt' })); felderBox.appendChild(f); felder[a.id] = f; });
    var gewaehlt = null, zuordnung = {}, geprueft = false;
    function fnVon(id) { return funktionen.filter(function (f) { return f.id === id; })[0]; }
    var karten = beispiele.map(function (b, i) {
      var k = PW.el('div', { 'class': 'sort-karte', 'data-i': i });
      var kn = PW.el('button', { type: 'button', 'class': 'sort-griff', 'aria-pressed': 'false', 'aria-label': 'Beispiel ' + (i + 1) + ' wählen: ' + b.text }); kn.appendChild(PW.el('span', { 'class': 'sort-nr', text: String(i + 1) })); kn.appendChild(PW.el('span', { text: b.text }));
      kn.addEventListener('click', function () { if (geprueft) return; waehle(k); });
      var r = PW.el('div', { 'class': 'sort-rueck', 'aria-live': 'polite' });
      k.appendChild(kn); k.appendChild(r); ablage.appendChild(k);
      /* Ziehen mit dem Finger oder der Maus */
      var start = null;
      kn.addEventListener('pointerdown', function (e) { if (geprueft || e.pointerType === 'mouse' && e.button !== 0) return; start = { x: e.clientX, y: e.clientY, id: e.pointerId }; });
      kn.addEventListener('pointermove', function (e) { if (!start || geprueft) return; var dx = e.clientX - start.x, dy = e.clientY - start.y; if (!k.classList.contains('ist-gezogen') && Math.hypot(dx, dy) < 6) return; if (!k.classList.contains('ist-gezogen')) { k.classList.add('ist-gezogen'); kn.setPointerCapture(e.pointerId); waehle(k, true); } k.style.transform = 'translate(' + dx + 'px,' + dy + 'px)'; var el = document.elementFromPoint(e.clientX, e.clientY); var f = el && el.closest ? el.closest('.sort-feld') : null; Object.keys(felder).forEach(function (id) { felder[id].classList.toggle('ist-ziel', f === felder[id]); }); });
      function ende(e) { if (!start) return; var war = k.classList.contains('ist-gezogen'); k.classList.remove('ist-gezogen'); k.style.transform = ''; start = null; Object.keys(felder).forEach(function (id) { felder[id].classList.remove('ist-ziel'); }); if (!war) return; var el = document.elementFromPoint(e.clientX, e.clientY); var f = el && el.closest ? el.closest('.sort-feld') : null; if (f) lege(k, f.getAttribute('data-aufgabe')); else waehle(null); e.preventDefault(); kn.addEventListener('click', function stop(ev) { ev.stopImmediatePropagation(); kn.removeEventListener('click', stop, true); }, true); }
      kn.addEventListener('pointerup', ende); kn.addEventListener('pointercancel', ende);
      return k;
    });
    function waehle(k, still) { karten.forEach(function (x) { x.classList.toggle('ist-gewaehlt', x === k); x.querySelector('.sort-griff').setAttribute('aria-pressed', x === k ? 'true' : 'false'); }); gewaehlt = k; hinweis.textContent = k ? (still ? '' : 'Jetzt ein Feld antippen: »Hierhin«.') : ''; }
    function lege(k, aufgabe) { felder[aufgabe].querySelector('.sort-inhalt').appendChild(k); zuordnung[k.getAttribute('data-i')] = aufgabe; waehle(null); PW.merke(opt.schluessel || 'sortierung', zuordnung); pruefen.disabled = Object.keys(zuordnung).length < beispiele.length; stand.textContent = Object.keys(zuordnung).length + ' von ' + beispiele.length + ' zugeordnet.'; if (!weniger()) { k.classList.add('ist-gelandet'); setTimeout(function () { k.classList.remove('ist-gelandet'); }, 300); } }
    var hinweis = PW.el('p', { 'class': 'klein sort-hinweis', 'aria-live': 'polite' });
    var stand = PW.el('p', { 'class': 'klein', text: '0 von ' + beispiele.length + ' zugeordnet.' });
    var pruefen = PW.el('button', { type: 'button', 'class': 'knopf knopf--voll', text: 'Prüfen', disabled: '' });
    var zurueck = PW.el('button', { type: 'button', 'class': 'knopf knopf--leise', text: 'Alle zurücklegen' });
    var ergebnis = PW.el('div', { 'class': 'rueck', 'aria-live': 'polite' });
    pruefen.addEventListener('click', function () {
      geprueft = true; pruefen.disabled = true; var ok = 0;
      beispiele.forEach(function (b, i) { var k = karten[i], r = k.querySelector('.sort-rueck'); var passende = b.richtig.map(function (id) { return fnVon(id).aufgabe; }), auch = b.auch.map(function (id) { return fnVon(id).aufgabe; }); var z = zuordnung[i]; var fnR = fnVon(b.richtig[0]); var aufR = aufgaben.filter(function (a) { return a.id === fnR.aufgabe; })[0];
        if (passende.indexOf(z) >= 0) { ok++; k.classList.add('ist-richtig'); r.innerHTML = '<strong>Passt.</strong> ' + fnR.name + ' gehört zu ' + aufR.name + '.'; }
        else if (auch.indexOf(z) >= 0) { ok++; k.classList.add('ist-auch'); r.innerHTML = '<strong>Passt auch.</strong> Am deutlichsten ist aber ' + aufR.name + ' (' + fnR.name + ').'; }
        else { k.classList.add('ist-falsch'); r.innerHTML = '<strong>Passt nicht.</strong> ' + b.warum.split(':')[0] + ' – das ist ' + aufR.name + '.'; }
        if (PW.notiere) PW.notiere(2, 'sort-' + i, passende.indexOf(z) >= 0 || auch.indexOf(z) >= 0, 'Aufgabe erkennen: ' + aufR.name);
      });
      ergebnis.className = 'rueck rueck--eigen'; ergebnis.innerHTML = '<strong>' + ok + ' von ' + beispiele.length + '</strong> auf dem richtigen Feld. Jetzt wird es genauer: Unten bestimmst du zu jedem Beispiel die Funktion – nicht nur die Aufgabe.';
      if (opt.danach) opt.danach(ok);
    });
    zurueck.addEventListener('click', function () { geprueft = false; zuordnung = {}; PW.merke(opt.schluessel || 'sortierung', {}); karten.forEach(function (k) { k.classList.remove('ist-richtig', 'ist-auch', 'ist-falsch'); k.querySelector('.sort-rueck').innerHTML = ''; ablage.appendChild(k); }); pruefen.disabled = true; ergebnis.className = 'rueck'; ergebnis.textContent = ''; stand.textContent = '0 von ' + beispiele.length + ' zugeordnet.'; });
    var alt = PW.lies(opt.schluessel || 'sortierung', {}) || {}; Object.keys(alt).forEach(function (i) { if (karten[i] && felder[alt[i]]) { felder[alt[i]].querySelector('.sort-inhalt').appendChild(karten[i]); zuordnung[i] = alt[i]; } });
    if (Object.keys(zuordnung).length) { stand.textContent = Object.keys(zuordnung).length + ' von ' + beispiele.length + ' zugeordnet.'; pruefen.disabled = Object.keys(zuordnung).length < beispiele.length; }
    w.appendChild(hinweis); w.appendChild(ablage); w.appendChild(felderBox); w.appendChild(stand); w.appendChild(PW.el('div', { 'class': 'knopfzeile' }, [pruefen, zurueck])); w.appendChild(ergebnis); container.appendChild(w);
  };
})();
