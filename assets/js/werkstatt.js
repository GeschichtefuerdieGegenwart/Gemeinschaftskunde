/* Politik-Werkstatt · gemeinsame Bausteine (läuft ohne Server, auch über file://) */
(function () {
  'use strict';
  var PW = window.PW = window.PW || {};

  /* Speicher: nur try/catch, nur kleine Werte, über »Eingaben löschen« entfernbar */
  PW.lies = function (k, standard) { try { var v = localStorage.getItem('pw:' + k); return v === null ? standard : JSON.parse(v); } catch (e) { return standard; } };
  PW.merke = function (k, v) { try { localStorage.setItem('pw:' + k, JSON.stringify(v)); } catch (e) { /* privates Fenster o. ä. */ } };
  PW.loescheAlles = function () { try { Object.keys(localStorage).filter(function (k) { return k.indexOf('pw:') === 0; }).forEach(function (k) { localStorage.removeItem(k); }); } catch (e) {} location.reload(); };

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
        c.style.fill = animiert ? 'var(--partei-leer)' : r.farbe; c.style.stroke = 'var(--text)'; c.setAttribute('stroke-width', '.6');
        if (animiert) { (function (c, farbe, d) { setTimeout(function () { c.style.fill = farbe; }, d); })(c, r.farbe, Math.min(440, (k++ / PW.sitzeGesamt) * 440)); }
        svg.appendChild(c);
      }
    });
    for (; idx < punkte.length; idx++) {
      var c2 = document.createElementNS(ns, 'circle'); var p2 = punkte[idx];
      c2.setAttribute('cx', p2.x.toFixed(1)); c2.setAttribute('cy', p2.y.toFixed(1)); c2.setAttribute('r', 5); c2.style.fill = 'var(--partei-leer)'; c2.style.stroke = 'var(--partei-sonstige)'; c2.setAttribute('stroke-width', '.6');
      svg.appendChild(c2);
    }
    /* Mehrheitsmarke */
    var l = document.createElementNS(ns, 'line'); l.setAttribute('x1', cx); l.setAttribute('x2', cx); l.setAttribute('y1', cy - r0 - dr * reihen + 2); l.setAttribute('y2', cy - 44); l.style.stroke = 'var(--text)'; l.setAttribute('stroke-width', 2); l.setAttribute('stroke-dasharray', '6 4'); svg.appendChild(l);
    var t = document.createElementNS(ns, 'text'); t.setAttribute('x', cx); t.setAttribute('y', cy - 14); t.setAttribute('text-anchor', 'middle'); t.setAttribute('font-size', '18'); t.setAttribute('font-family', 'Atkinson Hyperlegible Next, sans-serif'); t.style.fill = 'var(--text)'; t.textContent = 'Mehrheit ab ' + PW.mehrheit + ' Sitzen'; svg.appendChild(t);
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

  /* Kopf, Fortschritt, Fuß */
  var seiten = [
    { id: 'start', url: 'index.html', name: 'Start' },
    { id: 'ziele', url: 'ziele.html', name: 'Mein Stand' },
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
    [seiten[0], seiten[1], seiten[7], seiten[9]].forEach(function (s) { var a = PW.el('a', { href: wurzel + s.url, text: s.name }); if (s.id === aktuell) a.setAttribute('aria-current', 'page'); nav.appendChild(a); });
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
    var lf = document.querySelector('.kopfzeile .leitfrage');
    if (lf && PW.aufbauen) { var schon = false; try { schon = sessionStorage.getItem('pw:lf:' + aktuell) === '1'; sessionStorage.setItem('pw:lf:' + aktuell, '1'); } catch (e) {} PW.aufbauen(lf, { sofort: schon }); }
    var fuss = document.querySelector('.fuss-innen');
    if (fuss) {
      fuss.appendChild(PW.el('span', { text: 'Politik-Werkstatt · Einheit »Parteien und Wahlen« · Stand 27.10.2026 · Daten: Bundeswahlleiterin, Wahlprogramme 2025 (Quellen auf der Zusammenfassung)' }));
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
      var b = PW.el('button', { 'class': 'knopf knopf--leise', type: 'button', text: 'Eingaben löschen' });
      b.addEventListener('click', function () { if (confirm('Alle gespeicherten Eingaben auf diesem Gerät löschen?')) PW.loescheAlles(); });
      einst.appendChild(b);
      fuss.appendChild(einst);
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
