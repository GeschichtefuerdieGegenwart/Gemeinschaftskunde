/* Politik-Werkstatt · gemeinsame Bausteine (läuft ohne Server, auch über file://) */
(function () {
  'use strict';
  var PW = window.PW = window.PW || {};

  /* Speicher: nur try/catch, nur kleine Werte, über »Eingaben löschen« entfernbar */
  PW.lies = function (k, standard) { try { var v = localStorage.getItem('pw:' + k); return v === null ? standard : JSON.parse(v); } catch (e) { return standard; } };
  PW.merke = function (k, v) { try { localStorage.setItem('pw:' + k, JSON.stringify(v)); } catch (e) { /* privates Fenster o. ä. */ } };
  PW.loescheAlles = function () { try { Object.keys(localStorage).filter(function (k) { return k.indexOf('pw:') === 0; }).forEach(function (k) { localStorage.removeItem(k); }); } catch (e) {} location.reload(); };

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
  PW.halbrund = function (container, sitzeJeId, reihenfolge, animiert) {
    container.innerHTML = '';
    var gesamt = 0; reihenfolge.forEach(function (r) { gesamt += sitzeJeId[r.id] || 0; });
    var rest = PW.sitzeGesamt - gesamt;
    var reihen = 9, r0 = 150, dr = 24, W = 720, H = 390, cx = 360, cy = 372;
    var punkte = [];
    for (var r = 0; r < reihen; r++) {
      var rad = r0 + r * dr, n = Math.round(Math.PI * rad / 10.6);
      for (var i = 0; i < n; i++) { var a = Math.PI - Math.PI * (i + 0.5) / n; punkte.push({ x: cx + rad * Math.cos(a), y: cy - rad * Math.sin(a), a: a }); }
    }
    punkte.sort(function (p, q) { return q.a - p.a; });
    var extra = punkte.length - PW.sitzeGesamt; if (extra > 0) punkte = punkte.slice(Math.floor(extra / 2), Math.floor(extra / 2) + PW.sitzeGesamt);
    while (punkte.length < PW.sitzeGesamt) punkte.push(punkte[punkte.length - 1]);
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
        c.setAttribute('cx', p.x.toFixed(1)); c.setAttribute('cy', p.y.toFixed(1)); c.setAttribute('r', 5);
        c.setAttribute('fill', animiert ? '#E7E5E0' : r.farbe); c.setAttribute('stroke', '#1F1D1A'); c.setAttribute('stroke-width', '.6');
        if (animiert) { (function (c, farbe, d) { setTimeout(function () { c.setAttribute('fill', farbe); }, d); })(c, r.farbe, Math.min(440, (k++ / PW.sitzeGesamt) * 440)); }
        svg.appendChild(c);
      }
    });
    for (; idx < punkte.length; idx++) {
      var c2 = document.createElementNS(ns, 'circle'); var p2 = punkte[idx];
      c2.setAttribute('cx', p2.x.toFixed(1)); c2.setAttribute('cy', p2.y.toFixed(1)); c2.setAttribute('r', 5); c2.setAttribute('fill', '#E7E5E0'); c2.setAttribute('stroke', '#9A948C'); c2.setAttribute('stroke-width', '.6');
      svg.appendChild(c2);
    }
    /* Mehrheitsmarke */
    var l = document.createElementNS(ns, 'line'); l.setAttribute('x1', cx); l.setAttribute('x2', cx); l.setAttribute('y1', cy - r0 - dr * reihen + 2); l.setAttribute('y2', cy - 44); l.setAttribute('stroke', '#1F1D1A'); l.setAttribute('stroke-width', 2); l.setAttribute('stroke-dasharray', '6 4'); svg.appendChild(l);
    var t = document.createElementNS(ns, 'text'); t.setAttribute('x', cx); t.setAttribute('y', cy - 14); t.setAttribute('text-anchor', 'middle'); t.setAttribute('font-size', '18'); t.setAttribute('font-family', 'Atkinson Hyperlegible Next, sans-serif'); t.setAttribute('fill', '#1F1D1A'); t.textContent = 'Mehrheit ab ' + PW.mehrheit + ' Sitzen'; svg.appendChild(t);
    container.appendChild(svg);
    var leg = PW.el('ul', { 'class': 'legende' });
    reihenfolge.forEach(function (r) { if (!sitzeJeId[r.id]) return; leg.appendChild(PW.el('li', {}, [PW.el('span', { 'class': 'punkt', style: 'background:' + r.farbe }), r.name + ' ' + sitzeJeId[r.id] + (sitzeJeId[r.id] === 1 ? ' Sitz' : ' Sitze')])); });
    if (rest > 0) leg.appendChild(PW.el('li', {}, [PW.el('span', { 'class': 'punkt', style: 'background:#E7E5E0' }), 'unbesetzt ' + rest]));
    container.appendChild(leg);
    /* Tabelle als Rückfall für Screenreader und Druck */
    var tab = PW.el('table', { 'class': 'sr-only' }); var tb = PW.el('tbody');
    reihenfolge.forEach(function (r) { if (sitzeJeId[r.id]) tb.appendChild(PW.el('tr', {}, [PW.el('th', { text: r.name }), PW.el('td', { text: sitzeJeId[r.id] + (sitzeJeId[r.id] === 1 ? ' Sitz' : ' Sitze') })])); });
    tab.appendChild(tb); container.appendChild(tab);
  };

  /* Kopf, Fortschritt, Fuß */
  var seiten = [
    { id: 'start', url: 'index.html', name: 'Start' },
    { id: 'st1', url: 'parteien-wahlen/station1.html', name: 'Grundlagen', station: 1 },
    { id: 'st2', url: 'parteien-wahlen/station2.html', name: 'Erkennen', station: 2 },
    { id: 'st3', url: 'parteien-wahlen/station3.html', name: 'Positionen', station: 3 },
    { id: 'st4', url: 'parteien-wahlen/station4.html', name: 'Wählen', station: 4 },
    { id: 'st5', url: 'parteien-wahlen/station5.html', name: 'Warum so?', station: 5 },
    { id: 'zus', url: 'zusammenfassung.html', name: 'Zusammenfassung' },
    { id: 'vert', url: 'vertiefung.html', name: 'Vertiefung' },
    { id: 'lehr', url: 'lehrkraft.html', name: 'Lehrkraft' }
  ];
  PW.rahmen = function (aktuell, wurzel) {
    wurzel = wurzel || '';
    var kopf = document.querySelector('.kopf-innen'); if (!kopf) return;
    kopf.appendChild(PW.el('a', { 'class': 'marke', href: wurzel + 'index.html' }, [PW.el('span', { 'class': 'kreuz', 'aria-hidden': 'true' }), 'Politik-Werkstatt']));
    var nav = PW.el('nav', { 'class': 'nav', 'aria-label': 'Hauptnavigation' });
    [seiten[0], seiten[6], seiten[7], seiten[8]].forEach(function (s) { var a = PW.el('a', { href: wurzel + s.url, text: s.name }); if (s.id === aktuell) a.setAttribute('aria-current', 'page'); nav.appendChild(a); });
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
    var fuss = document.querySelector('.fuss-innen');
    if (fuss) {
      fuss.appendChild(PW.el('span', { text: 'Politik-Werkstatt · Einheit »Parteien und Wahlen« · Stand 19.10.2026 · Daten: Bundeswahlleiterin, Wahlprogramme 2025 (Quellen auf der Zusammenfassung)' }));
      var b = PW.el('button', { 'class': 'knopf knopf--leise', type: 'button', text: 'Eingaben löschen' });
      b.addEventListener('click', function () { if (confirm('Alle gespeicherten Eingaben auf diesem Gerät löschen?')) PW.loescheAlles(); });
      fuss.appendChild(b);
    }
  };
  PW.stationFertig = function (n) { var f = PW.lies('fertig', {}); f['st' + n] = true; PW.merke('fertig', f); };
})();
