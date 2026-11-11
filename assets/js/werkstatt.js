/* Politik-Werkstatt · gemeinsame Bausteine (läuft ohne Server, auch über file://) */
(function () {
  'use strict';
  var PW = window.PW = window.PW || {};

  /* Speicher: nur try/catch, nur kleine Werte, über »Eingaben löschen« entfernbar */
  PW.lies = function (k, standard) { try { var v = localStorage.getItem('pw:' + k); return v === null ? standard : JSON.parse(v); } catch (e) { return standard; } };
  PW.merke = function (k, v) { try { localStorage.setItem('pw:' + k, JSON.stringify(v)); } catch (e) { /* privates Fenster o. ä. */ } };
  PW.loescheAlles = function () { try { Object.keys(localStorage).filter(function (k) { return k.indexOf('pw:') === 0; }).forEach(function (k) { localStorage.removeItem(k); }); } catch (e) {} location.reload(); };
  /* v13 · Eingaben je Modul löschen. Einstellungen (Ansicht, Bewegung) bleiben immer.
     Modul 2: Schlüssel lobby-*, zucker, m2-* und Lernstand st12. Labor: hypothesen. Alles andere gehört zu Modul 1.
     Klassenergebnisse in Modul 1 (Klassenwahl, Urne, Wahlarchiv, Klassenbild der Urteilslinie) nur auf ausdrücklichen Wunsch. */
  PW.module = { m1: 'Modul 1 · Parteien und Wahlen', m2: 'Modul 2 · Verbände und Lobbyismus' };
  var EINSTELLUNG = ['ansicht', 'bewegung'];
  var M2_LERN = ['st12'];
  function istKlasse(k) { return k === 'wahlarchiv' || k === 'urne' || k.indexOf('klasse') === 0 || k === 'urteil-klasse' || k === 'urteil-runde'; }
  PW.modulVon = function (k) {
    if (EINSTELLUNG.indexOf(k) >= 0) return null;
    if (k === 'hypothesen') return 'labor';
    if (k.indexOf('lobby-') === 0 || k === 'zucker' || k.indexOf('m2-') === 0) return 'm2';
    return 'm1';
  };
  PW.loescheModul = function (m, mitKlasse) {
    try {
      Object.keys(localStorage).filter(function (k) { return k.indexOf('pw:') === 0; }).forEach(function (pk) {
        var k = pk.slice(3);
        if (k === 'lernstand') {
          var a = PW.lies('lernstand', {}) || {};
          Object.keys(a).forEach(function (st) { var zuM2 = M2_LERN.indexOf(st) >= 0; if ((m === 'm2' && zuM2) || (m === 'm1' && !zuM2)) delete a[st]; });
          if (Object.keys(a).length) PW.merke('lernstand', a); else localStorage.removeItem(pk);
          return;
        }
        if (PW.modulVon(k) !== m) return;
        if (m === 'm1' && istKlasse(k) && !mitKlasse) return;
        localStorage.removeItem(pk);
      });
    } catch (e) {}
    location.reload();
  };
  /* Bedienfeld im Fuß: erst wählen, dann bestätigen – ohne Browser-Dialog */
  PW.loeschFeld = function (aktuell) {
    var hier = aktuell === 'm2' ? 'm2' : aktuell === 'labor' ? 'labor' : 'm1';
    var huelle = PW.el('div', { 'class': 'loesch-huelle' });
    var knopf = PW.el('button', { 'class': 'knopf knopf--leise', type: 'button', 'aria-expanded': 'false', 'aria-controls': 'loesch-feld', text: 'Eingaben löschen …' });
    var feld = PW.el('div', { 'class': 'loesch-feld', id: 'loesch-feld', hidden: 'hidden', role: 'group', 'aria-label': 'Eingaben löschen' });
    feld.appendChild(PW.el('p', { 'class': 'loesch-titel', text: 'Was soll weg? Gelöscht wird nur auf diesem Gerät. Ansicht und Bewegung bleiben.' }));
    function modulKnopf(m) {
      var zeile = PW.el('div', { 'class': 'loesch-zeile' });
      var cb = null;
      var b = PW.el('button', { 'class': 'knopf', type: 'button', text: 'Eingaben in ' + PW.module[m].split(' · ')[0] + ' löschen' });
      zeile.appendChild(PW.el('p', { 'class': 'loesch-info', html: '<strong>' + PW.module[m] + '</strong> – ' + (m === 'm1' ? 'Antworten, Tipps, Lernstand der Stationen 1–6. Modul 2 bleibt unverändert.' : 'Schätzungen, Tipps, Rückmeldungen, Barometer, Urteile. Modul 1 und eure Klassenwahl bleiben unverändert.') }));
      if (m === 'm1') {
        cb = PW.el('input', { type: 'checkbox' });
        zeile.appendChild(PW.el('label', { 'class': 'schalter schalter--klein loesch-klasse' }, [cb, document.createTextNode('auch Klassenergebnisse löschen (Klassenwahl, Wahlarchiv, Klassenbild der Urteilslinie)')]));
      }
      b.addEventListener('click', function () {
        if (b.getAttribute('data-sicher') !== '1') { b.setAttribute('data-sicher', '1'); b.textContent = 'Wirklich? Noch einmal tippen'; return; }
        PW.loescheModul(m, cb ? cb.checked : false);
      });
      zeile.appendChild(PW.el('p', { 'class': 'knopfzeile' }, [b]));
      return zeile;
    }
    if (hier === 'labor') { feld.appendChild(modulKnopf('m1')); feld.appendChild(modulKnopf('m2')); }
    else feld.appendChild(modulKnopf(hier));
    var alles = PW.el('button', { 'class': 'knopf knopf--leise', type: 'button', text: 'Alles auf diesem Gerät löschen' });
    alles.addEventListener('click', function () {
      if (alles.getAttribute('data-sicher') !== '1') { alles.setAttribute('data-sicher', '1'); alles.textContent = 'Wirklich alles, in allen Modulen? Noch einmal tippen'; return; }
      PW.loescheAlles();
    });
    var zu = PW.el('button', { 'class': 'knopf knopf--leise', type: 'button', text: 'Abbrechen' });
    feld.appendChild(PW.el('p', { 'class': 'knopfzeile' }, [alles, zu]));
    function auf(offen) { feld.hidden = !offen; knopf.setAttribute('aria-expanded', offen ? 'true' : 'false'); if (!offen) feld.querySelectorAll('[data-sicher]').forEach(function (x) { x.removeAttribute('data-sicher'); }); if (!offen) { feld.textContent = ''; var neu = PW.loeschFeld(aktuell); huelle.parentNode.replaceChild(neu, huelle); neu.querySelector('button').focus(); } }
    knopf.addEventListener('click', function () { auf(feld.hidden); if (!feld.hidden) { var f = feld.querySelector('button'); if (f) f.focus(); } });
    zu.addEventListener('click', function () { auf(false); });
    feld.addEventListener('keydown', function (e) { if (e.key === 'Escape') auf(false); });
    huelle.appendChild(knopf); huelle.appendChild(feld);
    return huelle;
  };

  /* Farben nur aus Tokens (drei Ansichten): liefert den aktuellen Wert einer CSS-Variablen */
  PW.farbe = function (name) { try { return getComputedStyle(document.documentElement).getPropertyValue('--' + name).trim(); } catch (e) { return ''; } };
  /* Ansicht: hell · dunkel · beamer (html[data-ansicht]); ohne Wahl folgt sie dem System */
  PW.ansichten = { hell: 'Hell', dunkel: 'Dunkel', beamer: 'Beamer' };
  PW.setzeAnsicht = function (a) { if (PW.ansichten[a]) document.documentElement.setAttribute('data-ansicht', a); else document.documentElement.removeAttribute('data-ansicht'); PW.merke('ansicht', a); document.dispatchEvent(new CustomEvent('pw:ansicht', { detail: a })); };
  PW.fmt = function (n, stellen) { if (n === null || n === undefined || isNaN(n)) return 'noch offen'; if (stellen === undefined) stellen = Math.abs(Math.round(n * 10) / 10 - Math.round(n * 100) / 100) < 1e-9 ? 1 : 2; return Number(n).toLocaleString('de-DE', { minimumFractionDigits: stellen, maximumFractionDigits: stellen }); };
  PW.partei = function (id) { for (var i = 0; i < PW.parteien.length; i++) if (PW.parteien[i].id === id) return PW.parteien[i]; return null; };
  PW.mischen = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  PW.el = function (tag, attrs, kinder) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { if (k === 'text') e.textContent = attrs[k]; else if (k === 'html') e.innerHTML = attrs[k]; else e.setAttribute(k, attrs[k]); });
    (kinder || []).forEach(function (c) { e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return e;
  };

  /* Sitzverteilung: Sainte-Laguë/Schepers auf 630 Sitze, 5-%-Hürde, Grundmandatsklausel (3 Direktmandate), SSW befreit.
     Zweitstimmendeckung heißt im neuen Recht: Direktmandate zählen nur, soweit die Zweitstimmen reichen – deshalb reicht hier
     die reine Verhältnisrechnung. Werte: Prozent der gültigen Zweitstimmen je Partei. */
  PW.sitze = function (werte, opts) {
    opts = opts || {};
    var huerde = opts.huerde === undefined ? 5 : opts.huerde;
    var grundmandate = opts.grundmandate || {};
    var gesamt = opts.gesamt || PW.sitzeGesamt;
    var ssw = opts.ssw ? 1 : 0;
    var zul = {};
    Object.keys(werte).forEach(function (id) {
      var v = werte[id]; if (v === null || v === undefined || isNaN(v) || v <= 0) return;
      var zugelassen = v >= huerde || (grundmandate[id] || 0) >= 3 || opts.ohneHuerde;
      if (zugelassen) zul[id] = v;
    });
    var summe = 0; Object.keys(zul).forEach(function (id) { summe += zul[id]; });
    var zuVerteilen = gesamt - ssw;
    var out = {}; if (ssw) out.ssw = 1;
    if (!summe) return out;
    /* Höchstzahlverfahren Sainte-Laguë/Schepers: Divisoren 0,5; 1,5; 2,5 … (ergibt dieselbe Verteilung wie das Divisorverfahren mit Standardrundung) */
    var ids = Object.keys(zul); ids.forEach(function (id) { out[id] = 0; });
    for (var k = 0; k < zuVerteilen; k++) {
      var best = null, bestQ = -1;
      ids.forEach(function (id) { var q = zul[id] / (out[id] + 0.5); if (q > bestQ) { bestQ = q; best = id; } });
      out[best]++;
    }
    return out;
  };

  /* Halbrund: 630 Punkte in Reihen. Parteifarbe nur mit Name und Zahl (Legende). */
  PW.halbrund = function (container, sitzeJeId, reihenfolge, animiert, opts) {
    container.innerHTML = '';
    var gesamtSitze = (opts && opts.gesamt) || PW.sitzeGesamt, mehrheit = (opts && opts.mehrheit) || PW.mehrheit;
    var gesamt = 0; reihenfolge.forEach(function (r) { gesamt += sitzeJeId[r.id] || 0; });
    var rest = gesamtSitze - gesamt;
    var reihen = 9, r0 = 150, dr = 24, W = 720, H = 390, cx = 360, cy = 372, abst = 10.6, pr = 5;
    /* v11: andere Parlamentsgrößen (96 deutsche Sitze im EP, 720 im EP) – Reihen und Abstand aus der Sitzzahl */
    if (gesamtSitze !== PW.sitzeGesamt) {
      reihen = gesamtSitze < 200 ? 5 : 9; dr = 216 / reihen;
      var summeRad = 0; for (var rr = 0; rr < reihen; rr++) summeRad += r0 + rr * dr;
      abst = Math.PI * summeRad / gesamtSitze; pr = Math.min(abst * 0.42, dr * 0.42, 11);
    }
    var punkte = [];
    for (var r = 0; r < reihen; r++) {
      var rad = r0 + r * dr, n = Math.round(Math.PI * rad / abst);
      for (var i = 0; i < n; i++) { var a = Math.PI - Math.PI * (i + 0.5) / n; punkte.push({ x: cx + rad * Math.cos(a), y: cy - rad * Math.sin(a), a: a }); }
    }
    punkte.sort(function (p, q) { return q.a - p.a; });
    var extra = punkte.length - gesamtSitze; if (extra > 0) punkte = punkte.slice(Math.floor(extra / 2), Math.floor(extra / 2) + gesamtSitze);
    while (punkte.length < gesamtSitze) punkte.push(punkte[punkte.length - 1]);
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H); svg.setAttribute('class', 'halbrund'); svg.setAttribute('role', 'img');
    var beschr = reihenfolge.filter(function (r) { return sitzeJeId[r.id]; }).map(function (r) { return r.name + ' ' + sitzeJeId[r.id]; }).join(', ');
    svg.setAttribute('aria-label', 'Sitzverteilung: ' + (beschr || 'keine Sitze') + (rest > 0 ? ', unbesetzt ' + rest : ''));
    var idx = 0, k = 0;
    reihenfolge.forEach(function (r) {
      var n = sitzeJeId[r.id] || 0;
      for (var i = 0; i < n && idx < punkte.length; i++, idx++) {
        var c = document.createElementNS(ns, 'circle'); var p = punkte[idx];
        c.setAttribute('cx', p.x.toFixed(1)); c.setAttribute('cy', p.y.toFixed(1)); c.setAttribute('r', pr.toFixed(1));
        c.style.fill = animiert ? 'var(--partei-leer)' : r.farbe; c.style.stroke = 'var(--text)'; c.setAttribute('stroke-width', '.6');
        if (animiert) { (function (c, farbe, d) { setTimeout(function () { c.style.fill = farbe; }, d); })(c, r.farbe, Math.min(440, (k++ / gesamtSitze) * 440)); }
        svg.appendChild(c);
      }
    });
    for (; idx < punkte.length; idx++) {
      var c2 = document.createElementNS(ns, 'circle'); var p2 = punkte[idx];
      c2.setAttribute('cx', p2.x.toFixed(1)); c2.setAttribute('cy', p2.y.toFixed(1)); c2.setAttribute('r', pr.toFixed(1)); c2.style.fill = 'var(--partei-leer)'; c2.style.stroke = 'var(--partei-sonstige)'; c2.setAttribute('stroke-width', '.6');
      svg.appendChild(c2);
    }
    /* Mehrheitsmarke (entfällt bei opts.ohneMehrheit, etwa für die deutsche Delegation im EP) */
    if (!(opts && opts.ohneMehrheit)) {
    var l = document.createElementNS(ns, 'line'); l.setAttribute('x1', cx); l.setAttribute('x2', cx); l.setAttribute('y1', cy - r0 - dr * reihen + 2); l.setAttribute('y2', cy - 44); l.style.stroke = 'var(--text)'; l.setAttribute('stroke-width', 2); l.setAttribute('stroke-dasharray', '6 4'); svg.appendChild(l);
    var t = document.createElementNS(ns, 'text'); t.setAttribute('x', cx); t.setAttribute('y', cy - 14); t.setAttribute('text-anchor', 'middle'); t.setAttribute('font-size', '18'); t.setAttribute('font-family', 'Atkinson Hyperlegible Next, sans-serif'); t.style.fill = 'var(--text)'; t.textContent = 'Mehrheit ab ' + mehrheit + ' Sitzen'; svg.appendChild(t);
    }
    container.appendChild(svg);
    var leg = PW.el('ul', { 'class': 'legende' });
    reihenfolge.forEach(function (r) { if (!sitzeJeId[r.id]) return; leg.appendChild(PW.el('li', {}, [PW.el('span', { 'class': 'punkt', style: 'background:' + r.farbe }), r.name + ' ' + sitzeJeId[r.id] + (sitzeJeId[r.id] === 1 ? ' Sitz' : ' Sitze')])); });
    if (rest > 0) leg.appendChild(PW.el('li', {}, [PW.el('span', { 'class': 'punkt', style: 'background:var(--partei-leer)' }), 'unbesetzt ' + rest]));
    container.appendChild(leg);
    /* Tabelle als Rückfall für Screenreader und Druck */
    var tab = PW.el('table', { 'class': 'sr-only' }); var tb = PW.el('tbody');
    reihenfolge.forEach(function (r) { if (sitzeJeId[r.id]) tb.appendChild(PW.el('tr', {}, [PW.el('th', { text: r.name }), PW.el('td', { text: sitzeJeId[r.id] + (sitzeJeId[r.id] === 1 ? ' Sitz' : ' Sitze') })])); });
    tab.appendChild(tb); container.appendChild(tab);
  };

  /* Caja: eine erfundene Figur ohne Partei, die durch die Einheit führt. Markup: <aside class="caja"><p>…</p></aside>;
     das Skript setzt nur das Bild davor – ohne Skript bleibt der Text vollständig. */
  PW.cajaBild = function () {
    return '<svg class="caja-bild" viewBox="0 0 96 112" aria-hidden="true">' +
      '<rect x="6" y="8" width="84" height="100" style="fill:var(--karton)"/>' +
      '<path d="M18 112c2-26 14-38 30-38s28 12 30 38z" style="fill:var(--ton-gelb-tief)"/>' +
      '<path d="M38 74h20l-4 14h-12z" style="fill:var(--text)"/>' +
      '<path d="M26 44c0-18 10-28 22-28s22 10 22 28c0 8-2 16-4 22H30c-2-6-4-14-4-22z" style="fill:var(--text)"/>' +
      '<ellipse cx="48" cy="46" rx="15" ry="18" style="fill:var(--flaeche);stroke:var(--text);stroke-width:2"/>' +
      '<path d="M34 38c6-8 20-10 28-2" style="fill:none;stroke:var(--text);stroke-width:5;stroke-linecap:round"/>' +
      '<circle cx="42" cy="47" r="2" style="fill:var(--text)"/><circle cx="54" cy="47" r="2" style="fill:var(--text)"/>' +
      '<path d="M43 56c3 2 7 2 10 0" style="fill:none;stroke:var(--text);stroke-width:2;stroke-linecap:round"/></svg>';
  };
  PW.cajaKarten = function () {
    document.querySelectorAll('aside.caja').forEach(function (a) {
      if (a.querySelector('.caja-bild')) return;
      a.insertAdjacentHTML('afterbegin', PW.cajaBild());
      if (!a.querySelector('.caja-name')) a.insertBefore(PW.el('p', { 'class': 'caja-name', text: 'Caja · 19 · erfundene Figur' }), a.querySelector('p'));
    });
  };

  /* Kopf, Fortschritt, Fuß */
  var seiten = [
    { id: 'labor', url: 'index.html', name: 'GK-Labor' },
    { id: 'start', url: 'parteien.html', name: 'Modul 1' },
    { id: 'ziele', url: 'ziele.html', name: 'Mein Stand' },
    { id: 'st1', url: 'parteien-wahlen/station1.html', name: 'Grundlagen', station: 1 },
    { id: 'st2', url: 'parteien-wahlen/station2.html', name: 'Erkennen', station: 2 },
    { id: 'st3', url: 'parteien-wahlen/station3.html', name: 'Positionen', station: 3 },
    { id: 'st4', url: 'parteien-wahlen/station4.html', name: 'Wählen', station: 4 },
    { id: 'spiel', url: 'parteien-wahlen/koalition.html', name: 'Koalitionsspiel' },
    { id: 'st5', url: 'parteien-wahlen/station5.html', name: 'Warum so?', station: 5 },
    { id: 'st6', url: 'parteien-wahlen/station6.html', name: 'Europa', station: 6 },
    { id: 'm2', url: 'verbaende.html', name: 'Modul 2' },
    { id: 'zus', url: 'zusammenfassung.html', name: 'Zusammenfassung' },
    { id: 'vert', url: 'vertiefung.html', name: 'Vertiefung' },
    { id: 'lehr', url: 'lehrkraft.html', name: 'Lehrkraft' },
    { id: 'klausur', url: 'klausurtraining.html', name: 'Klausurtraining' },
    { id: 'weg', url: 'weg-einer-forderung.html', name: 'Weg einer Forderung' }
  ];
  PW.rahmen = function (aktuell, wurzel) {
    wurzel = wurzel || '';
    var kopf = document.querySelector('.kopf-innen'); if (!kopf) return;
    kopf.appendChild(PW.el('a', { 'class': 'marke', href: wurzel + 'index.html' }, [PW.el('span', { 'class': 'kreuz', 'aria-hidden': 'true' }), 'GK-Labor']));
    var nav = PW.el('nav', { 'class': 'nav', 'aria-label': 'Hauptnavigation' });
    ['start', 'ziele', 'klausur', 'zus', 'lehr'].map(function (id) { return seiten.filter(function (x) { return x.id === id; })[0]; }).forEach(function (s) { var a = PW.el('a', { href: wurzel + s.url, text: s.name }); if (s.id === aktuell) a.setAttribute('aria-current', 'page'); nav.appendChild(a); });
    kopf.appendChild(nav);
    var fort = document.querySelector('.fort');
    if (fort) {
      var fertig = PW.lies('fertig', {});
      seiten.filter(function (s) { return s.station; }).forEach(function (s) {
        var li = PW.el('li', {}, [PW.el('a', { href: wurzel + s.url, text: s.station + ' ' + s.name })]);
        if (fertig['st' + s.station]) li.className = 'ist-fertig';
        if (s.id === aktuell) li.setAttribute('aria-current', 'step');
        fort.appendChild(li);
      });
    }
    if (PW.cajaKarten) PW.cajaKarten();
    var lf = document.querySelector('.kopfzeile .leitfrage');
    if (lf && PW.aufbauen) { var schon = false; try { schon = sessionStorage.getItem('pw:lf:' + aktuell) === '1'; sessionStorage.setItem('pw:lf:' + aktuell, '1'); } catch (e) {} PW.aufbauen(lf, { sofort: schon }); }
    var fuss = document.querySelector('.fuss-innen');
    if (fuss) {
      fuss.appendChild(PW.el('span', { text: 'GK-Labor · Gemeinschaftskunde J1 · Stand 10.11.2026 · Quellen stehen auf den Seiten' }));
      var einst = PW.el('div', { 'class': 'einstellungen' });
      /* Ansicht: Hell · Dunkel · Beamer */
      var ans = PW.el('div', { 'class': 'ansicht-wahl', role: 'group', 'aria-label': 'Ansicht' });
      var aktiv = PW.lies('ansicht', '');
      Object.keys(PW.ansichten).forEach(function (k) {
        var kn = PW.el('button', { type: 'button', 'class': 'knopf knopf--leise', 'aria-pressed': aktiv === k ? 'true' : 'false', text: PW.ansichten[k] });
        kn.addEventListener('click', function () { PW.setzeAnsicht(k); ans.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === kn ? 'true' : 'false'); }); });
        ans.appendChild(kn);
      });
      einst.appendChild(PW.el('span', { 'class': 'einst-wort', text: 'Ansicht' })); einst.appendChild(ans);
      /* Weniger Bewegung */
      var sw = PW.el('label', { 'class': 'schalter schalter--klein' });
      var cb = PW.el('input', { type: 'checkbox' }); cb.checked = PW.wenigerBewegung ? PW.wenigerBewegung() : false;
      cb.addEventListener('change', function () { if (PW.schalteBewegung) PW.schalteBewegung(!cb.checked); });
      sw.appendChild(cb); sw.appendChild(document.createTextNode('Weniger Bewegung'));
      einst.appendChild(sw);
      fuss.appendChild(einst);
      fuss.appendChild(PW.loeschFeld(aktuell));
    }
  };
  /* Reiter (Muster J): <ul class="reiter" data-fuer="a,b,c"> + Abschnitte mit id. Hash öffnet den passenden Reiter. */
  PW.reiter = function (liste, namen) {
    var ids = Object.keys(namen), knoepfe = {};
    liste.setAttribute('role', 'tablist');
    ids.forEach(function (id) {
      var b = PW.el('button', { type: 'button', role: 'tab', id: 'tab-' + id, 'aria-controls': id, 'aria-selected': 'false', text: namen[id] });
      b.addEventListener('click', function () { zeige(id); });
      b.addEventListener('keydown', function (e) { var i = ids.indexOf(id); if (e.key === 'ArrowRight') { knoepfe[ids[(i + 1) % ids.length]].focus(); zeige(ids[(i + 1) % ids.length]); } if (e.key === 'ArrowLeft') { knoepfe[ids[(i + ids.length - 1) % ids.length]].focus(); zeige(ids[(i + ids.length - 1) % ids.length]); } });
      knoepfe[id] = b; liste.appendChild(PW.el('li', { role: 'presentation' }, [b]));
      var sec = document.getElementById(id); if (sec) { sec.setAttribute('role', 'tabpanel'); sec.setAttribute('aria-labelledby', 'tab-' + id); sec.classList.add('reiter-blatt'); }
    });
    function zeige(id, still) {
      ids.forEach(function (x) { var sec = document.getElementById(x); if (sec) sec.hidden = x !== id; knoepfe[x].setAttribute('aria-selected', x === id ? 'true' : 'false'); knoepfe[x].setAttribute('tabindex', x === id ? '0' : '-1'); });
      if (!still) { try { history.replaceState(null, '', '#' + id); } catch (e) {} }
      liste.dispatchEvent(new CustomEvent('reiter:wechsel', { detail: { id: id } }));
    }
    var start = (location.hash || '').replace('#', ''); zeige(ids.indexOf(start) >= 0 ? start : ids[0], true);
    window.addEventListener('hashchange', function () { var h = location.hash.replace('#', ''); if (ids.indexOf(h) >= 0) zeige(h); });
    return { zeige: zeige };
  };
  PW.stationFertig = function (n) { var f = PW.lies('fertig', {}); f['st' + n] = true; PW.merke('fertig', f); };
})();
