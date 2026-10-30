/* Politik-Werkstatt · Muster Ä »Den Weg legen« (v6.1)
   Nach dem Film: Die elf Begriffe werden auf den leeren Weg gelegt (Anker ist die Szene, nicht die Reihenfolge),
   erst wenn alle liegen, wird geprüft – mit eigener Erklärung je Verwechslung. Danach färben die Lernenden jede Station
   in der Farbe ihrer Aufgabe der Politik und begründen, warum die Implementation leer bleibt.
   Stufen: A Begriff + Definition auf der Karte · B nur der Begriff · C nur der Begriff, an der Station nur das Bildzeichen.
   Bedienung: Finger und Maus ziehen; oder Karte tippen, dann Station tippen; Tastatur über dieselben Knöpfe. */
(function () {
  'use strict';
  var PW = window.PW = window.PW || {};
  var weniger = function () { return PW.wenigerBewegung ? PW.wenigerBewegung() : false; };

  var FOLGE = ['artikulation', 'aggregation', 'partizipation', 'information', 'mobilisierung', 'sozialisation', 'rekrutierung', 'legitimation', 'herrschaft', 'transmission', 'kontrolle'];
  var SZENE = {
    artikulation: 'Viele wollen höhere Löhne. »15 €« kommt ins Programm.',
    aggregation: '14, 15 oder 16 €? Auf dem Parteitag entsteht eine Linie.',
    partizipation: 'Lena tritt ein und stimmt im Ortsverband mit ab.',
    information: 'Am Infostand und im Erklärvideo: Was bedeutet die Forderung?',
    mobilisierung: 'Plakate, Videos, Haustür: Menschen an die Urne bringen.',
    sozialisation: 'Lena lernt, wie Antrag, Parteitag und Abstimmung gehen.',
    rekrutierung: 'Die Partei stellt eine Kandidatin für den Wahlkreis auf.',
    legitimation: 'Wahltag: Auch wer verliert, erkennt das Ergebnis an.',
    herrschaft: 'Die Mehrheit im Bundestag beschließt – das gilt für alle.',
    transmission: 'Die Forderung aus dem Programm wird zum Gesetz.',
    kontrolle: 'Die Opposition fragt nach: Wirkt das Gesetz?'
  };
  /* Typische Verwechslungen: VERW[gesucht][gelegt] */
  var VERW = {
    artikulation: { aggregation: 'Aggregation bündelt mehrere Vorstellungen zu einer. Hier wird der Wunsch erst einmal ausgesprochen und aufgegriffen.', transmission: 'Transmission ist erst der Schritt in die Entscheidung. Hier wird der Wunsch zum ersten Mal ausgesprochen.' },
    aggregation: { artikulation: 'Artikulation heißt: einen Wunsch aussprechen. Hier liegen schon mehrere Vorstellungen auf dem Tisch und werden zu einer Linie gebündelt.', partizipation: 'Partizipation ist das Mitmachen. Hier geht es darum, was am Ende als gemeinsame Linie herauskommt.' },
    partizipation: { mobilisierung: 'Mobilisierung gewinnt Menschen für die Partei, vor allem im Wahlkampf. Hier macht Lena selbst mit und entscheidet mit.', sozialisation: 'Sozialisation ist das, was Lena beim Mitmachen lernt. Hier geht es um das Mitmachen selbst.' },
    information: { mobilisierung: 'Mobilisierung will gewinnen. Hier wird sachlich erklärt, was die Forderung bedeutet.', artikulation: 'Artikulation spricht einen Wunsch aus. Hier wird ein bestehender Vorschlag erklärt.' },
    mobilisierung: { information: 'Informationsvermittlung erklärt sachlich. Plakate und Haustürgespräche im Wahlkampf wollen Menschen gewinnen.', partizipation: 'Partizipation heißt selbst mitmachen und mitentscheiden. Hier sollen Menschen für die Partei und ihre Ziele gewonnen werden.' },
    sozialisation: { partizipation: 'Partizipation ist das Mitmachen. Hier geht es darum, was Lena dabei lernt und wie sie in die Politik hineinwächst.', rekrutierung: 'Rekrutierung wählt Personal für Ämter aus. Hier lernt ein Mitglied erst die Abläufe.' },
    rekrutierung: { sozialisation: 'Sozialisation ist das Hineinwachsen. Hier wird jemand für ein Mandat ausgewählt.', mobilisierung: 'Mobilisierung gewinnt Wählerinnen und Wähler. Hier wählt die Partei eine Person für ein Mandat aus.' },
    legitimation: { herrschaft: 'Herrschaft ist das verbindliche Entscheiden. Hier geht es darum, dass alle das Wahlergebnis anerkennen.', mobilisierung: 'Mobilisierung bringt Menschen an die Urne. Hier geht es um die Anerkennung des Ergebnisses – auch durch die Unterlegenen.' },
    herrschaft: { legitimation: 'Legitimation ist die Anerkennung. Hier trifft die Mehrheit eine verbindliche Entscheidung.', transmission: 'Transmission meint, dass ein bestimmtes Interesse in die Entscheidung eingeht. Hier geht es um das verbindliche Entscheiden überhaupt.' },
    transmission: { herrschaft: 'Herrschaft ist das verbindliche Entscheiden überhaupt. Hier geht es darum, dass genau die Forderung aus dem Programm in das Gesetz eingeht.', artikulation: 'Artikulation steht am Anfang. Hier ist der Wunsch schon im Gesetz angekommen.' },
    kontrolle: { herrschaft: 'Herrschaft üben die aus, die entscheiden. Hier prüft die Opposition die Regierung.', information: 'Informationsvermittlung erklärt nach außen. Hier fragt die Opposition die Regierung, um sie zu kontrollieren.' }
  };
  var AUFGABEN = [
    { id: 'formulierung', name: 'Politikformulierung', farbe: 'var(--blau)' },
    { id: 'implementation', name: 'Politikimplementation', farbe: 'var(--ton-gelb-tief)' },
    { id: 'kontrolle', name: 'Politikkontrolle', farbe: 'var(--akzent)' },
    { id: 'rekrutierung', name: 'Personalrekrutierung', farbe: 'var(--ton-gruen-tief)' }
  ];
  var ICON = {
    artikulation: '<path d="M4 6h36a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H20l-10 9v-9H4a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4z" style="fill:var(--blau-zart)"/>',
    aggregation: '<rect x="2" y="4" width="14" height="10" style="fill:var(--flaeche)"/><rect x="2" y="30" width="14" height="10" style="fill:var(--flaeche)"/><path d="M18 9 28 20M18 35 28 24"/><rect x="28" y="15" width="16" height="14" style="fill:var(--blau-zart)"/>',
    partizipation: '<rect x="13" y="2" width="20" height="14" style="fill:var(--blau-zart)"/><path d="M23 16v8M14 44V30a9 9 0 0 1 18 0v14"/>',
    information: '<rect x="2" y="4" width="40" height="28" style="fill:var(--flaeche)"/><path d="m10 24 8-8 6 6 10-10M14 32 8 44M30 32l6 12"/>',
    mobilisierung: '<rect x="6" y="2" width="30" height="24" style="fill:var(--blau-zart)"/><path d="M21 26v18M12 44h18"/><circle cx="21" cy="14" r="6"/>',
    sozialisation: '<circle cx="10" cy="30" r="4" style="fill:var(--text)"/><path d="M10 34v8"/><circle cx="30" cy="12" r="7" style="fill:var(--blau)"/><path d="M30 19v24M18 26l8-4M4 44h40"/>',
    rekrutierung: '<circle cx="22" cy="9" r="7" style="fill:var(--ton-gruen-tief)"/><path d="M22 16v14M14 22h16"/><rect x="6" y="32" width="32" height="12" style="fill:var(--flaeche)"/>',
    legitimation: '<rect x="4" y="16" width="36" height="28" style="fill:var(--flaeche)"/><path d="M14 16h16" style="stroke-width:5"/><rect x="14" y="0" width="16" height="12" style="fill:var(--flaeche)"/><path d="m18 3 8 6M26 3l-8 6"/>',
    herrschaft: '<path d="M4 40a18 18 0 0 1 36 0M2 44h40"/><circle cx="6.5" cy="34" r="3" style="fill:var(--blau);stroke:none"/><circle cx="11" cy="26" r="3" style="fill:var(--blau);stroke:none"/><circle cx="18" cy="22.5" r="3" style="fill:var(--blau);stroke:none"/><circle cx="26" cy="22.5" r="3" style="fill:var(--blau);stroke:none"/><circle cx="33" cy="26" r="3" style="fill:var(--leise);stroke:none"/><circle cx="37.5" cy="34" r="3" style="fill:var(--leise);stroke:none"/>',
    transmission: '<rect x="0" y="16" width="14" height="10" style="fill:var(--blau-zart)"/><path d="M14 21h12m-5-5 5 5-5 5"/><rect x="28" y="6" width="16" height="32" style="fill:var(--flaeche)"/><path d="M36 14v16" style="stroke:var(--akzent)"/>',
    kontrolle: '<circle cx="18" cy="18" r="13" style="fill:var(--akzent-zart)"/><path d="m28 28 14 14" style="stroke-width:5"/>'
  };
  function fn(id) { for (var i = 0; i < PW.funktionen.length; i++) if (PW.funktionen[i].id === id) return PW.funktionen[i]; return null; }
  function icon(id) { return '<svg class="weg-icon" viewBox="-2 -2 48 48" aria-hidden="true" style="fill:none;stroke:var(--text);stroke-width:3;stroke-linecap:round;stroke-linejoin:round">' + ICON[id] + '</svg>'; }

  PW.wegLegen = function (container, opt) {
    opt = opt || {};
    var KEY = opt.schluessel || 'st1-weg';
    var st = PW.lies(KEY, null) || {};
    st.lage = st.lage || {}; st.farbe = st.farbe || {}; st.stufe = st.stufe || 'A';
    function speichern() { PW.merke(KEY, st); }

    var w = PW.el('div', { 'class': 'weg', 'data-stufe': st.stufe });
    /* Stufen */
    var stufen = PW.el('div', { 'class': 'stufen weg-stufen', role: 'group', 'aria-label': 'Stufe für den Weg' });
    stufen.appendChild(PW.el('span', { 'class': 'klein', text: 'Stufe:' }));
    var stufenText = { A: 'A · Begriff mit Definition', B: 'B · nur der Begriff', C: 'C · nur Bildzeichen am Weg' };
    var stKn = {};
    ['A', 'B', 'C'].forEach(function (k) { var b = PW.el('button', { type: 'button', 'class': 'knopf', 'aria-pressed': st.stufe === k ? 'true' : 'false', text: stufenText[k] }); b.addEventListener('click', function () { st.stufe = k; speichern(); w.setAttribute('data-stufe', k); Object.keys(stKn).forEach(function (x) { stKn[x].setAttribute('aria-pressed', x === k ? 'true' : 'false'); }); }); stKn[k] = b; stufen.appendChild(b); });
    w.appendChild(stufen);

    var hinweis = PW.el('p', { 'class': 'klein weg-hinweis', 'aria-live': 'polite', text: 'Zieh einen Begriff auf die passende Station – oder tippe erst den Begriff, dann die Station.' });
    w.appendChild(hinweis);

    /* Ablage */
    var ablage = PW.el('div', { 'class': 'weg-ablage', 'aria-label': 'Begriffe, die noch nicht liegen' });
    var karten = {};
    PW.mischen(FOLGE).forEach(function (id) {
      var f = fn(id);
      var k = PW.el('button', { type: 'button', 'class': 'weg-karte', 'data-id': id, 'aria-pressed': 'false' }, [PW.el('b', { text: f.name }), PW.el('span', { 'class': 'weg-def', text: f.kurz })]);
      karten[id] = k; ablage.appendChild(k);
    });
    w.appendChild(ablage);

    /* Bühne mit Weg */
    var buehne = PW.el('div', { 'class': 'weg-buehne' });
    var linie = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); linie.setAttribute('class', 'weg-linie'); linie.setAttribute('aria-hidden', 'true');
    var pfad = document.createElementNS('http://www.w3.org/2000/svg', 'path'); linie.appendChild(pfad); buehne.appendChild(linie);
    var stationen = {}, plaetze = {};
    var REIHE = { artikulation: [1, 1], aggregation: [1, 2], partizipation: [1, 3], information: [1, 4], mobilisierung: [2, 4], sozialisation: [2, 3], rekrutierung: [2, 2], legitimation: [2, 1], herrschaft: [3, 1], transmission: [3, 2], kontrolle: [3, 4] };
    FOLGE.forEach(function (id, i) {
      var s = PW.el('div', { 'class': 'weg-station', 'data-id': id, style: '--r:' + REIHE[id][0] + ';--c:' + REIHE[id][1] + ';order:' + (i * 2) });
      var kreis = PW.el('span', { 'class': 'weg-kreis', text: String(i + 1) });
      var kopf = PW.el('div', { 'class': 'weg-kopf' }, [kreis]); kopf.insertAdjacentHTML('beforeend', icon(id));
      var platz = PW.el('div', { 'class': 'weg-platz' });
      var szene = PW.el('p', { 'class': 'weg-szene', text: SZENE[id] });
      var farbe = PW.el('button', { type: 'button', 'class': 'weg-farbe', hidden: '', text: 'Aufgabe wählen' });
      var rueck = PW.el('p', { 'class': 'weg-rueck', 'aria-live': 'polite' });
      s.appendChild(kopf); s.appendChild(platz); s.appendChild(szene); s.appendChild(farbe); s.appendChild(rueck);
      stationen[id] = s; plaetze[id] = platz; buehne.appendChild(s);
      farbe.addEventListener('click', function () { var i2 = AUFGABEN.map(function (a) { return a.id; }).indexOf(st.farbe[id]); st.farbe[id] = AUFGABEN[(i2 + 1) % AUFGABEN.length].id; speichern(); zeigeFarbe(id); farbePruefenKn.disabled = FOLGE.some(function (x) { return !st.farbe[x]; }); });
    });
    var gesetz = PW.el('div', { 'class': 'weg-gesetz', style: '--r:3;--c:3;order:19', 'aria-hidden': 'true' }, [PW.el('span', { text: '§' }), PW.el('small', { text: 'das Gesetz' })]);
    buehne.appendChild(gesetz);
    w.appendChild(buehne);

    /* Knöpfe und Rückmeldung */
    var pruefen = PW.el('button', { type: 'button', 'class': 'knopf knopf--voll', text: 'Weg prüfen', disabled: '' });
    var neu = PW.el('button', { type: 'button', 'class': 'knopf knopf--leise', text: 'Falsche zurücklegen' , hidden: '' });
    var alle = PW.el('button', { type: 'button', 'class': 'knopf knopf--leise', text: 'Alle zurücklegen' });
    var spick = PW.el('details', { 'class': 'weg-spick', hidden: '' }, [PW.el('summary', { text: 'Spickzettel: das Schaubild' })]);
    spick.appendChild(PW.el('img', { src: opt.bild || '../assets/img/Funktionen_Weg_einer_Forderung.png', alt: 'Schaubild »Der Weg einer Forderung« mit allen elf Funktionen, ihren Definitionen und den Farben der vier Aufgaben der Politik.', loading: 'lazy' }));
    var ergebnis = PW.el('div', { 'class': 'rueck', 'aria-live': 'polite' });
    w.appendChild(PW.el('div', { 'class': 'knopfzeile' }, [pruefen, neu, alle]));
    w.appendChild(ergebnis); w.appendChild(spick);

    /* Phase 2: einfärben */
    var phase2 = PW.el('div', { 'class': 'weg-phase2', hidden: '' });
    phase2.appendChild(PW.el('h4', { text: 'Jetzt einfärben: Zu welcher Aufgabe der Politik gehört jede Funktion?' }));
    phase2.appendChild(PW.el('p', { text: 'Tippe an jeder Station auf »Aufgabe wählen«, bis die richtige Aufgabe steht. Die Farbe erscheint im Kreis, das Wort darunter.' }));
    var leg = PW.el('ul', { 'class': 'weg-legende' });
    AUFGABEN.forEach(function (a) { leg.appendChild(PW.el('li', {}, [PW.el('i', { style: 'background:' + a.farbe, 'aria-hidden': 'true' }), a.name])); });
    phase2.appendChild(leg);
    var farbePruefenKn = PW.el('button', { type: 'button', 'class': 'knopf knopf--voll', text: 'Farben prüfen', disabled: '' });
    var farbeRueck = PW.el('div', { 'class': 'rueck', 'aria-live': 'polite' });
    phase2.appendChild(PW.el('div', { 'class': 'knopfzeile' }, [farbePruefenKn])); phase2.appendChild(farbeRueck);
    var warum = PW.el('div', { 'class': 'weg-warum', hidden: '' });
    warum.appendChild(PW.el('label', { 'for': 'weg-warum', html: '<strong>Politikimplementation blieb leer. Warum?</strong> Schreib einen Satz in deinen eigenen Worten.' }));
    var feld = PW.el('textarea', { id: 'weg-warum', 'class': 'eingabe-feld', placeholder: 'Ich glaube, die Umsetzung …' }); feld.value = st.warum || '';
    feld.addEventListener('input', function () { st.warum = feld.value; speichern(); denk.hidden = feld.value.trim().length < 20; });
    var denk = PW.el('div', { 'class': 'rueck rueck--eigen', hidden: '' , html: '<strong>Ein Gedanke zum Vergleichen, keine Lösung:</strong> Gesetze umsetzen ist vor allem Sache von Regierung und Verwaltung. Parteien wirken daran nur mittelbar mit, über ihre Leute in Regierungsämtern – deshalb bekommt die Implementation in dieser Zuordnung keine eigene Funktion. Man kann auch anders argumentieren: Herrschaft und Transmission reichen bis in die Umsetzung hinein. Nimm deinen Satz mit ins Plenum.' });
    warum.appendChild(feld); warum.appendChild(denk); phase2.appendChild(warum);
    w.appendChild(phase2);
    container.appendChild(w);

    /* ---------- Logik ---------- */
    var gewaehlt = null, geprueft = false;
    function setLeer(s) {
      var i = FOLGE.indexOf(s); plaetze[s].innerHTML = '';
      var b = PW.el('button', { type: 'button', 'class': 'weg-leer', 'aria-label': 'Station ' + (i + 1) + ': ' + SZENE[s] + ' – Begriff hierher legen', text: 'Begriff hierher' });
      b.addEventListener('click', function () { if (geprueft) return; if (gewaehlt) lege(gewaehlt, s); else hinweis.textContent = 'Tippe zuerst einen Begriff an.'; });
      plaetze[s].appendChild(b);
    }
    FOLGE.forEach(setLeer);
    function waehle(id) { Object.keys(karten).forEach(function (k) { karten[k].classList.toggle('ist-gewaehlt', k === id); karten[k].setAttribute('aria-pressed', k === id ? 'true' : 'false'); }); gewaehlt = id; hinweis.textContent = id ? '»' + fn(id).name + '« gewählt – jetzt die Station antippen.' : 'Zieh einen Begriff auf die passende Station – oder tippe erst den Begriff, dann die Station.'; }
    function stationVon(k) { for (var s in st.lage) if (st.lage[s] === k) return s; return null; }
    function zurueck(k) { var s = stationVon(k); if (s) { delete st.lage[s]; setLeer(s); stationen[s].classList.remove('ist-belegt', 'ist-richtig', 'ist-falsch'); } ablage.appendChild(karten[k]); karten[k].classList.remove('ist-gelegt'); }
    function lege(k, s) {
      if (st.lage[s] && st.lage[s] !== k) zurueck(st.lage[s]);
      var alt = stationVon(k); if (alt) { delete st.lage[alt]; setLeer(alt); stationen[alt].classList.remove('ist-belegt'); }
      st.lage[s] = k; plaetze[s].innerHTML = ''; plaetze[s].appendChild(karten[k]); karten[k].classList.add('ist-gelegt'); stationen[s].classList.add('ist-belegt');
      if (!weniger()) { stationen[s].classList.add('ist-gelandet'); setTimeout(function () { stationen[s].classList.remove('ist-gelandet'); }, 260); }
      waehle(null); speichern(); stand();
    }
    function stand() { var n = Object.keys(st.lage).length; pruefen.disabled = n < FOLGE.length || geprueft; if (!geprueft) hinweis.textContent = n + ' von 11 Begriffen liegen.' + (n < 11 ? '' : ' Jetzt prüfen.'); }
    Object.keys(karten).forEach(function (k) {
      var kn = karten[k], start = null;
      kn.addEventListener('click', function (e) { if (geprueft || kn.getAttribute('data-gezogen')) { kn.removeAttribute('data-gezogen'); return; } if (stationVon(k)) { zurueck(k); waehle(k); return; } waehle(gewaehlt === k ? null : k); });
      kn.addEventListener('pointerdown', function (e) { if (geprueft || (e.pointerType === 'mouse' && e.button !== 0)) return; start = { x: e.clientX, y: e.clientY }; });
      kn.addEventListener('pointermove', function (e) {
        if (!start) return; var dx = e.clientX - start.x, dy = e.clientY - start.y;
        if (!kn.classList.contains('ist-gezogen')) { if (Math.hypot(dx, dy) < 8) return; kn.classList.add('ist-gezogen'); try { kn.setPointerCapture(e.pointerId); } catch (x) {} waehle(k); }
        kn.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
        var el = document.elementFromPoint(e.clientX, e.clientY); var ziel = el && el.closest ? el.closest('.weg-station') : null;
        Object.keys(stationen).forEach(function (s) { stationen[s].classList.toggle('ist-ziel', stationen[s] === ziel); });
      });
      function ende(e) { if (!start) return; var war = kn.classList.contains('ist-gezogen'); start = null; kn.classList.remove('ist-gezogen'); kn.style.transform = ''; Object.keys(stationen).forEach(function (s) { stationen[s].classList.remove('ist-ziel'); }); if (!war) return; kn.setAttribute('data-gezogen', '1'); var el = document.elementFromPoint(e.clientX, e.clientY); var ziel = el && el.closest ? el.closest('.weg-station') : null; if (ziel) lege(k, ziel.getAttribute('data-id')); else { if (stationVon(k)) zurueck(k); waehle(null); stand(); } }
      kn.addEventListener('pointerup', ende); kn.addEventListener('pointercancel', ende);
    });
    pruefen.addEventListener('click', function () {
      geprueft = true; pruefen.disabled = true; var ok = 0, falsch = [];
      FOLGE.forEach(function (s) {
        var k = st.lage[s], r = stationen[s].querySelector('.weg-rueck'); var richtig = k === s;
        stationen[s].classList.toggle('ist-richtig', richtig); stationen[s].classList.toggle('ist-falsch', !richtig);
        if (richtig) { ok++; r.innerHTML = '<strong>Passt.</strong>'; }
        else { falsch.push(s); var gelegt = fn(k); var erkl = (VERW[s] && VERW[s][k]) || ('»' + gelegt.name + '« heißt: ' + gelegt.kurz + ' Passt das zu dieser Szene? Lies die Szene noch einmal.'); r.innerHTML = '<strong>Passt nicht.</strong> ' + erkl; }
        if (PW.notiere) PW.notiere(1, 'weg-' + s, richtig, 'Funktion erkennen: ' + fn(s).name);
      });
      st.versuche = (st.versuche || 0) + 1; speichern();
      spick.hidden = false;
      if (ok === FOLGE.length) { ergebnis.className = 'rueck rueck--gut'; ergebnis.innerHTML = '<strong>Alle elf passen.</strong> Jetzt färbst du den Weg ein.'; neu.hidden = true; zeigePhase2(); }
      else { ergebnis.className = 'rueck rueck--nein'; ergebnis.innerHTML = '<strong>' + ok + ' von 11 passen.</strong> Lies bei den markierten Stationen die Erklärung, dann lege die falschen Begriffe neu. Der Spickzettel unten hilft – aber versuch es erst ohne.'; neu.hidden = false; }
    });
    neu.addEventListener('click', function () { geprueft = false; FOLGE.forEach(function (s) { if (stationen[s].classList.contains('ist-falsch')) zurueck(st.lage[s]); stationen[s].querySelector('.weg-rueck').innerHTML = stationen[s].classList.contains('ist-richtig') ? '<strong>Passt.</strong>' : ''; }); neu.hidden = true; ergebnis.className = 'rueck'; ergebnis.textContent = ''; speichern(); stand(); });
    alle.addEventListener('click', function () { geprueft = false; FOLGE.forEach(function (s) { if (st.lage[s]) zurueck(st.lage[s]); stationen[s].querySelector('.weg-rueck').innerHTML = ''; stationen[s].classList.remove('ist-richtig', 'ist-falsch'); }); st.lage = {}; st.farbe = {}; FOLGE.forEach(zeigeFarbe); phase2.hidden = true; neu.hidden = true; ergebnis.className = 'rueck'; ergebnis.textContent = ''; speichern(); stand(); });
    function zeigePhase2() { phase2.hidden = false; FOLGE.forEach(function (s) { stationen[s].querySelector('.weg-farbe').hidden = false; zeigeFarbe(s); }); farbePruefenKn.disabled = FOLGE.some(function (x) { return !st.farbe[x]; }); }
    function zeigeFarbe(s) { var a = AUFGABEN.filter(function (x) { return x.id === st.farbe[s]; })[0]; var kreis = stationen[s].querySelector('.weg-kreis'); kreis.style.background = a ? a.farbe : ''; kreis.classList.toggle('ist-gefaerbt', !!a); stationen[s].querySelector('.weg-farbe').textContent = a ? a.name : 'Aufgabe wählen'; stationen[s].classList.remove('farbe-ok', 'farbe-falsch'); }
    farbePruefenKn.addEventListener('click', function () {
      var ok = 0;
      FOLGE.forEach(function (s) { var soll = fn(s).aufgabe, ist = st.farbe[s], r = stationen[s].querySelector('.weg-rueck'); var richtig = soll === ist; stationen[s].classList.toggle('farbe-ok', richtig); stationen[s].classList.toggle('farbe-falsch', !richtig); if (richtig) { ok++; r.innerHTML = '<strong>Passt.</strong> ' + AUFGABEN.filter(function (a) { return a.id === soll; })[0].name + '.'; } else { var sollN = AUFGABEN.filter(function (a) { return a.id === soll; })[0].name; r.innerHTML = '<strong>Passt nicht.</strong> ' + (ist === 'implementation' ? 'Umsetzen tun vor allem Regierung und Verwaltung. ' : '') + 'Frag dich: Wird hier etwas beschlossen und vorbereitet, geprüft – oder geht es um Personen? Richtig ist: ' + sollN + '.'; } if (PW.notiere) PW.notiere(1, 'wegfarbe-' + s, richtig, 'Aufgabe zuordnen: ' + fn(s).name); });
      farbeRueck.className = ok === FOLGE.length ? 'rueck rueck--gut' : 'rueck rueck--nein';
      farbeRueck.innerHTML = '<strong>' + ok + ' von 11 Farben passen.</strong> ' + (ok === FOLGE.length ? 'Neun Funktionen gehören zur Politikformulierung, je eine zur Kontrolle und zur Rekrutierung – und die Implementation bleibt leer.' : 'Korrigiere die markierten Stationen; die Erklärung steht jeweils darunter.');
      warum.hidden = false; denk.hidden = feld.value.trim().length < 20;
    });

    /* Gepunkteter Weg durch die Kreismitten, an Reihenenden außen herum */
    function zeichne() {
      var b = buehne.getBoundingClientRect(); if (!b.width) return;
      linie.setAttribute('viewBox', '0 0 ' + b.width + ' ' + b.height); linie.setAttribute('width', b.width); linie.setAttribute('height', b.height);
      var p = FOLGE.map(function (s) { var r = stationen[s].querySelector('.weg-kreis').getBoundingClientRect(); return { x: r.left - b.left + r.width / 2, y: r.top - b.top + r.height / 2 }; });
      var g = gesetz.querySelector('span').getBoundingClientRect(); var pg = { x: g.left - b.left + g.width / 2, y: g.top - b.top + g.height / 2 };
      p.splice(10, 0, pg);
      var eng = b.width < 760, d = 'M' + p[0].x.toFixed(0) + ',' + p[0].y.toFixed(0);
      for (var i = 1; i < p.length; i++) {
        var a = p[i - 1], c = p[i];
        if (!eng && Math.abs(c.y - a.y) > 20) { var rechts = a.x > b.width / 2; var ax = rechts ? b.width - 6 : 6; d += ' L' + ax + ',' + a.y.toFixed(0) + ' L' + ax + ',' + c.y.toFixed(0) + ' L' + c.x.toFixed(0) + ',' + c.y.toFixed(0); }
        else d += ' L' + c.x.toFixed(0) + ',' + c.y.toFixed(0);
      }
      pfad.setAttribute('d', d);
    }
    if (window.ResizeObserver) new ResizeObserver(zeichne).observe(buehne); else window.addEventListener('resize', zeichne);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(zeichne);
    setTimeout(zeichne, 50);

    /* Gespeicherten Stand wiederherstellen */
    Object.keys(st.lage).forEach(function (s) { if (karten[st.lage[s]] && stationen[s]) { var k = st.lage[s]; plaetze[s].innerHTML = ''; plaetze[s].appendChild(karten[k]); karten[k].classList.add('ist-gelegt'); stationen[s].classList.add('ist-belegt'); } });
    stand();
  };
})();
