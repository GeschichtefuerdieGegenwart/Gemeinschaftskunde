/* GK-Labor · Modul 1 · Muster AU »Koalitionsspiel« (v14)
   Ein Verhandlungsspiel gegen einen kodierten Gegenspieler: Partei wählen → Partner vermuten und sondieren → verhandeln → Vertrag oder Scheitern.
   Kodierung (Spielregel, kein Messwert):
   - Position je Partei und Streitfrage aus den Wahlprogrammen 2025 (PW.fragen, mit Beleg in Station 3).
   - Gewicht je Partei und Thema (1 weniger wichtig · 2 wichtig · 3 Kernthema) ist eine ANNAHME der Werkstatt und steht so in keinem Programm.
   - Ergebnis je Thema: Linie A, Linie B oder Kompromiss. Nutzen: eigene Linie 1 · Kompromiss 0,4 · andere Linie 0, gewichtet;
     Themen, in denen sich alle einig sind, zählen voll mit.
   - Jede Partei braucht einen Mindestanteil ihres gewichteten Programms: 0,40 + 0,40 × Sitzanteil im Bündnis.
   - Sitze: Bundestagswahl 2025 amtlich; Klassenergebnisse über PW.sitze mit 5-%-Hürde.
   - Rote Linie: Ein Kernthema (Gewicht 3) darf nicht ganz verloren gehen.
   - Drei Runden. Lehnt ein Partner dreimal ab: gescheitert (zu hart). Stimmt der Partner zu, aber die eigene Basis nicht: gescheitert (zu lasch).
   Bewegung: nur der Stempel am Ende (transform, 300 ms, ease-out); bei »weniger Bewegung« steht er sofort. */
(function () {
  'use strict';
  var PW = window.PW = window.PW || {};

  PW.spielThemen = {
    tempolimit: { kurz: 'Tempolimit auf Autobahnen', a: 'Tempolimit kommt', b: 'Kein Tempolimit', k: 'Tempo 130 erst als Test auf einigen Strecken' },
    mindestlohn: { kurz: 'Mindestlohn 15 Euro', a: '15 Euro per Gesetz', b: 'Die Kommission entscheidet allein', k: 'Die Kommission entscheidet – mit dem Ziel 15 Euro' },
    wahlalter: { kurz: 'Wählen ab 16', a: 'Wahlalter 16', b: 'Wahlalter bleibt 18', k: 'Eine Kommission prüft das Wahlalter 16' },
    wehrpflicht: { kurz: 'Wehrpflicht', a: 'Wehrpflicht kommt zurück', b: 'Wehrdienst bleibt freiwillig', k: 'Freiwillig – Pflicht nur, wenn zu wenige kommen' },
    miete: { kurz: 'Mietpreisbremse', a: 'Bremse bleibt und wird schärfer', b: 'Bremse läuft aus', k: 'Bremse wird verlängert, aber nicht verschärft' },
    kernkraft: { kurz: 'Kernkraft', a: 'Rückkehr zur Kernkraft', b: 'Keine Rückkehr', k: 'Kein Neubau, aber Forschung an neuen Reaktoren' },
    grenze: { kurz: 'Zurückweisungen an der Grenze', a: 'Zurückweisungen', b: 'Keine Zurückweisungen', k: 'Nur in Absprache mit den Nachbarländern' },
    eu: { kurz: 'Europäische Union', a: 'Mehr gemeinsam entscheiden', b: 'Weniger gemeinsam entscheiden', k: 'Mehr gemeinsam nur bei Sicherheit und Handel' }
  };
  /* Gewichte: Annahme der Werkstatt (siehe Kopf). */
  PW.spielGewicht = {
    cdu:    { tempolimit: 2, mindestlohn: 2, wahlalter: 1, wehrpflicht: 2, miete: 1, kernkraft: 1, grenze: 3, eu: 1 },
    spd:    { tempolimit: 1, mindestlohn: 3, wahlalter: 1, wehrpflicht: 2, miete: 2, kernkraft: 2, grenze: 2, eu: 2 },
    gruene: { tempolimit: 2, mindestlohn: 2, wahlalter: 2, wehrpflicht: 1, miete: 2, kernkraft: 3, grenze: 2, eu: 2 },
    fdp:    { tempolimit: 2, mindestlohn: 2, wahlalter: 1, wehrpflicht: 2, miete: 3, kernkraft: 1, grenze: 1, eu: 2 },
    afd:    { tempolimit: 2, mindestlohn: 1, wahlalter: 2, wehrpflicht: 2, miete: 1, kernkraft: 2, grenze: 3, eu: 3 },
    linke:  { tempolimit: 1, mindestlohn: 3, wahlalter: 1, wehrpflicht: 2, miete: 3, kernkraft: 1, grenze: 2, eu: 1 },
    bsw:    { tempolimit: 1, mindestlohn: 2, wahlalter: 1, wehrpflicht: 1, miete: 3, kernkraft: 1, grenze: 2, eu: 2 }
  };
  /* Öffentliche Festlegungen. Belegt in der Werkstatt ist der CDU-Beschluss von 2018 (Station 4, Kriterium 3). */
  PW.spielAusschluss = [
    { a: 'cdu', b: 'afd', text: 'Die CDU hat 2018 beschlossen: keine Koalition mit der AfD.' },
    { a: 'cdu', b: 'linke', text: 'Die CDU hat 2018 beschlossen: keine Koalition mit der Linkspartei.' },
    { a: 'spd', b: 'afd', text: 'Die SPD lehnt jede Zusammenarbeit mit der AfD ab.' },
    { a: 'gruene', b: 'afd', text: 'Die Grünen lehnen jede Zusammenarbeit mit der AfD ab.' },
    { a: 'linke', b: 'afd', text: 'Die Linke lehnt jede Zusammenarbeit mit der AfD ab.' },
    { a: 'fdp', b: 'afd', text: 'Die FDP lehnt jede Zusammenarbeit mit der AfD ab.' }
  ];
  var KOMP = 0.4, RUNDEN = 3;

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function weniger() { return PW.wenigerBewegung ? PW.wenigerBewegung() : false; }

  /* ---------- Rechenkern (auch für Tests) ---------- */
  PW.spielSitze = function (art) {
    var s, fest = art.indexOf('fest:') === 0 ? PW.klassenErgebnis(art.slice(5)) : null;
    if (fest) s = PW.sitze(fest.prozent, { huerde: 5 });
    else if (art === 'klasse') { var k = PW.lies('klasse', null) || {}, kl = PW.lies('klasse-sonst', {}) || {}, w = {}; Object.keys(k).forEach(function (i) { w[i] = k[i]; }); Object.keys(kl).forEach(function (i) { w[i] = kl[i]; }); s = PW.sitze(w, { huerde: 5 }); }
    else { s = {}; PW.parteien.forEach(function (p) { if (p.sitze) s[p.id] = p.sitze; }); }   /* amtliche Sitzzahlen 2025 */
    var akteure = [];
    Object.keys(PW.spielGewicht).forEach(function (id) {
      var n = s[id] || 0, name = PW.partei(id).name;
      if (id === 'cdu' && s.csu) { n += s.csu; name = 'CDU/CSU'; }
      if (n) akteure.push({ id: id, name: name, sitze: n, farbe: PW.partei(id).farbe });
    });
    akteure.sort(function (x, y) { return y.sitze - x.sitze; });
    return akteure;
  };
  PW.spielTisch = function (ids) {
    var tisch = [], einig = [];
    PW.fragen.forEach(function (q) {
      var pos = {}; ids.forEach(function (id) { var p = q.pos[id] && q.pos[id][0]; if (p && p !== 'keine Aussage') pos[id] = p; });
      var werte = Object.keys(pos).map(function (id) { return pos[id]; }).filter(function (v, i, a) { return a.indexOf(v) === i; });
      if (werte.length > 1) tisch.push({ q: q, pos: pos });
      else if (werte.length === 1) einig.push({ q: q, wert: werte[0], pos: pos });
    });
    return { tisch: tisch, einig: einig };
  };
  /* angebot: { frageId: 'a' | 'k' | 'b' } */
  PW.spielNutzen = function (id, tisch, angebot, einig) {
    var sum = 0, max = 0, rot = null, G = PW.spielGewicht[id];
    (einig || []).forEach(function (e) { if (e.pos[id]) { var w = G[e.q.id] || 1; sum += w; max += w; } });
    tisch.forEach(function (t) {
      if (!t.pos[id]) return;
      var w = G[t.q.id] || 1, o = angebot[t.q.id]; max += w;
      var meine = t.pos[id] === t.q.kategorien[0] ? 'a' : 'b';
      var u = o === meine ? 1 : o === 'k' ? KOMP : 0;
      sum += w * u;
      if (w === 3 && u === 0) rot = t.q.id;
    });
    return { anteil: max ? sum / max : 1, rot: rot };
  };
  PW.spielSchwelle = function (sitze, gesamt) { return PW.spielBasis + PW.spielSteigung * (sitze / gesamt); };
  PW.spielBasis = 0.40; PW.spielSteigung = 0.40;
  PW.spielPruefe = function (ich, partner, akteure, tisch, angebot, einig) {
    var alle = [ich].concat(partner), gesamt = 0, sitz = {};
    akteure.forEach(function (a) { if (alle.indexOf(a.id) >= 0) { gesamt += a.sitze; sitz[a.id] = a.sitze; } });
    var erg = { gesamt: gesamt, parteien: {} };
    alle.forEach(function (id) {
      var n = PW.spielNutzen(id, tisch, angebot, einig), t = PW.spielSchwelle(sitz[id], gesamt);
      erg.parteien[id] = { anteil: n.anteil, schwelle: t, rot: n.rot, ok: !n.rot && n.anteil >= t };
    });
    erg.partnerOk = partner.every(function (id) { return erg.parteien[id].ok; });
    erg.ichOk = erg.parteien[ich].ok;
    return erg;
  };

  /* ---------- Oberfläche ---------- */
  PW.koalitionsspiel = function (box) {
    if (!box) return;
    var st = PW.lies('spiel', {}) || {};
    if (!st.art) st.art = 'bund';
    function sichern() { PW.merke('spiel', st); }
    function akteure() { return PW.spielSitze(st.art); }
    function akt(id) { var a = akteure().filter(function (x) { return x.id === id; })[0]; return a || { id: id, name: PW.partei(id).name, sitze: 0, farbe: PW.partei(id).farbe }; }
    function chip(id) { var a = akt(id); return '<span class="sp-chip"><i style="background:' + a.farbe + '"></i>' + esc(a.name) + '</span>'; }
    function wort(anteil, schwelle) { return anteil >= schwelle + 0.2 ? 'deutlich' : anteil >= schwelle ? 'erkennbar' : anteil >= schwelle - 0.12 ? 'zu wenig' : 'kaum'; }

    function leiste(n) {
      var ol = PW.el('ol', { 'class': 'sp-leiste', 'aria-label': 'Schritte des Spiels' });
      ['Partei', 'Sondieren', 'Verhandeln', 'Ergebnis'].forEach(function (t, i) { ol.appendChild(PW.el('li', { 'class': i + 1 === n ? 'ist-jetzt' : i + 1 < n ? 'ist-fertig' : '', 'aria-current': i + 1 === n ? 'step' : null }, [PW.el('b', { text: String(i + 1) }), ' ' + t])); });
      ol.querySelectorAll('[aria-current="null"]').forEach(function (x) { x.removeAttribute('aria-current'); });
      return ol;
    }
    function neu(n, titel) {
      box.textContent = '';
      box.appendChild(leiste(n));
      var h = PW.el('h2', { 'class': 'sp-titel', tabindex: '-1', text: titel }); box.appendChild(h);
      return h;
    }
    function gehe(fn, fokus) { fn(); if (fokus !== false) { var h = box.querySelector('.sp-titel'); if (h) h.focus({ preventScroll: false }); } }

    /* 1 · Partei wählen */
    function schritt1() {
      neu(1, 'Wähle deine Partei');
      box.appendChild(PW.el('p', { text: 'Du führst die Verhandlungen für eine Partei. Ziel: eine Regierung mit Mehrheit – und möglichst viel vom eigenen Programm im Vertrag.' }));
      var wahl = PW.el('div', { 'class': 'sp-ergebnis', role: 'group', 'aria-label': 'Welches Wahlergebnis?' });
      var arten = [['bund', 'Bundestagswahl 2025']];
      (PW.klassenErgebnisse || []).forEach(function (f) { arten.push(['fest:' + f.id, f.name]); });
      if (PW.lies('klasse', null)) arten.push(['klasse', PW.lies('klasse-name', '') || 'Eure Klassenwahl']);
      arten.forEach(function (a) {
        var b = PW.el('button', { type: 'button', 'class': 'knopf knopf--leise', 'aria-pressed': st.art === a[0] ? 'true' : 'false', text: a[1] });
        b.addEventListener('click', function () { st = { art: a[0] }; sichern(); schritt1(); });
        wahl.appendChild(b);
      });
      box.appendChild(PW.el('p', { 'class': 'klein sp-label', text: 'Wahlergebnis:' })); box.appendChild(wahl);
      var liste = PW.el('div', { 'class': 'sp-parteien' });
      var A = akteure(), summe = 0; A.forEach(function (a) { summe += a.sitze; });
      A.forEach(function (a) {
        var b = PW.el('button', { type: 'button', 'class': 'sp-partei', style: '--sp-farbe:' + a.farbe });
        b.appendChild(PW.el('strong', { text: a.name })); b.appendChild(PW.el('span', { text: a.sitze + ' Sitze' }));
        b.addEventListener('click', function () { st.ich = a.id; st.partner = []; st.angebot = {}; st.runde = 0; st.verlauf = []; st.ende = null; sichern(); gehe(schritt2); });
        liste.appendChild(b);
      });
      box.appendChild(liste);
      box.appendChild(PW.el('p', { 'class': 'klein', text: 'Mehrheit: 316 von 630 Sitzen. Keine Partei hat sie allein.' }));
    }

    function ausschluesse(ids) {
      var r = [];
      PW.spielAusschluss.forEach(function (x) { if (ids.indexOf(x.a) >= 0 && ids.indexOf(x.b) >= 0) r.push(x.text); });
      return r;
    }

    /* 2 · Sondieren: erst vermuten, dann aufdecken */
    function schritt2() {
      var ich = akt(st.ich);
      neu(2, 'Mit wem könntest du regieren?');
      box.appendChild(PW.el('p', { html: 'Du verhandelst für ' + chip(st.ich) + ' (' + ich.sitze + ' Sitze). <strong>Vermute zuerst:</strong> Mit wem reicht es für 316 Sitze – und mit wem passt es inhaltlich? Wähle einen oder zwei Partner.' }));
      var liste = PW.el('div', { 'class': 'sp-parteien sp-parteien--wahl', role: 'group', 'aria-label': 'Partner wählen' });
      var gew = (st.partner || []).slice();
      akteure().filter(function (a) { return a.id !== st.ich; }).forEach(function (a) {
        var inp = PW.el('input', { type: 'checkbox', value: a.id, 'class': 'sr-only' });
        if (gew.indexOf(a.id) >= 0) inp.checked = true;
        inp.addEventListener('change', function () {
          var i = gew.indexOf(a.id);
          if (inp.checked) { if (gew.length >= 2) { inp.checked = false; return; } gew.push(a.id); } else if (i >= 0) gew.splice(i, 1);
          st.partner = gew.slice(); st.sondiert = false; sichern(); aus.textContent = ''; kn.disabled = !gew.length; kn.hidden = false;
        });
        liste.appendChild(PW.el('label', { 'class': 'sp-partei', style: '--sp-farbe:' + a.farbe }, [inp, PW.el('strong', { text: a.name }), PW.el('span', { text: a.sitze + ' Sitze' })]));
      });
      box.appendChild(liste);
      var kn = PW.el('button', { type: 'button', 'class': 'knopf knopf--akzent', text: 'Sondieren: Was trennt uns?' });
      kn.disabled = !gew.length;
      var aus = PW.el('div', { 'class': 'sp-sondierung', 'aria-live': 'polite' });
      box.appendChild(PW.el('p', { 'class': 'knopfzeile' }, [kn])); box.appendChild(aus);
      function zeige() {
        var ids = [st.ich].concat(gew), sitze = 0; ids.forEach(function (id) { sitze += akt(id).sitze; });
        var T = PW.spielTisch(ids), aus2 = ausschluesse(ids);
        var n = T.tisch.length, m = T.einig.length;
        var naehe = n === 0 ? 'sehr nah' : n <= 2 ? 'nah' : n <= 4 ? 'weit auseinander' : 'sehr weit auseinander';
        var html = '<div class="sp-befund"><p><strong>' + ids.map(function (id) { return esc(akt(id).name); }).join(' + ') + ': ' + sitze + ' Sitze.</strong> ' + (sitze >= 316 ? 'Das reicht für die Mehrheit.' : 'Es fehlen ' + (316 - sitze) + ' Sitze – das wäre eine Minderheitsregierung.') + '</p>' +
          '<p><strong>Inhaltlich: ' + naehe + '.</strong> Einig in ' + m + ', strittig in ' + n + ' von ' + (m + n) + ' Fragen.' + (n ? ' Strittig: ' + T.tisch.map(function (t) { return esc(PW.spielThemen[t.q.id].kurz); }).join(' · ') + '.' : '') + '</p>';
        if (aus2.length) html += '<p class="sp-warn"><strong>Festlegung vor der Wahl:</strong> ' + aus2.map(esc).join(' ') + ' In der Wirklichkeit käme dieses Gespräch nicht zustande. Du kannst es als Gedankenexperiment durchspielen.</p>';
        html += '</div>';
        aus.innerHTML = html;
        var los = PW.el('button', { type: 'button', 'class': 'knopf knopf--voll', text: aus2.length ? 'Als Gedankenexperiment verhandeln' : 'Verhandlung beginnen' });
        los.addEventListener('click', function () { st.angebot = {}; st.runde = 0; st.verlauf = []; st.ende = null; sichern(); gehe(schritt3); });
        var opp = PW.el('button', { type: 'button', 'class': 'knopf', text: 'Lieber in die Opposition' });
        opp.addEventListener('click', function () { st.ende = { art: 'opposition', grund: 'sondierung' }; sichern(); gehe(schritt4); });
        aus.appendChild(PW.el('p', { 'class': 'knopfzeile' }, [los, opp]));
        aus.appendChild(PW.el('p', { 'class': 'klein', text: 'Oder ändere oben die Partner und sondiere neu.' }));
      }
      kn.addEventListener('click', function () { st.sondiert = true; sichern(); kn.hidden = true; zeige(); });
      if (st.sondiert && gew.length) { kn.hidden = true; zeige(); }
      var z = PW.el('button', { type: 'button', 'class': 'knopf knopf--leise', text: '← Andere Partei' });
      z.addEventListener('click', function () { gehe(schritt1); });
      box.appendChild(PW.el('p', { 'class': 'knopfzeile sp-zurueck' }, [z]));
    }

    /* 3 · Verhandeln */
    function schritt3() {
      var ids = [st.ich].concat(st.partner), T = PW.spielTisch(ids), A = akteure();
      var G = PW.spielGewicht[st.ich];
      neu(3, 'Verhandlung: Runde ' + Math.min((st.runde || 0) + 1, RUNDEN) + ' von ' + RUNDEN);
      box.appendChild(PW.el('p', { html: chip(st.ich) + ' verhandelt mit ' + st.partner.map(chip).join(' und ') + '. Lege für jedes strittige Thema fest, was im Vertrag stehen soll. Dann legst du das Paket vor. Du hast drei Runden.' }));
      if (T.einig.length) box.appendChild(PW.el('p', { 'class': 'klein sp-einig', html: '<strong>Schon einig:</strong> ' + T.einig.map(function (e) { var th = PW.spielThemen[e.q.id]; return esc(e.wert === e.q.kategorien[0] ? th.a : th.b); }).join(' · ') }));
      if (!T.tisch.length) {
        box.appendChild(PW.el('p', { 'class': 'rueck rueck--gut', html: '<strong>Nichts ist strittig.</strong> In allen vergleichbaren Fragen wollt ihr dasselbe.' }));
        var f = PW.el('button', { type: 'button', 'class': 'knopf knopf--voll', text: 'Vertrag unterschreiben' });
        f.addEventListener('click', function () { st.ende = { art: 'vertrag' }; sichern(); gehe(schritt4); });
        box.appendChild(PW.el('p', { 'class': 'knopfzeile' }, [f])); return;
      }
      var liste = PW.el('ol', { 'class': 'sp-tisch' });
      T.tisch.forEach(function (t) {
        var th = PW.spielThemen[t.q.id], w = G[t.q.id] || 1, meine = t.pos[st.ich] ? (t.pos[st.ich] === t.q.kategorien[0] ? 'a' : 'b') : null;
        var li = PW.el('li', { 'class': 'sp-thema' });
        li.appendChild(PW.el('h3', { text: th.kurz }));
        li.appendChild(PW.el('p', { 'class': 'klein sp-wichtig', text: !meine ? 'Dein Programm sagt dazu nichts.' : w === 3 ? 'Für deine Partei: Kernthema – darf nicht verloren gehen.' : w === 2 ? 'Für deine Partei: wichtig.' : 'Für deine Partei: weniger wichtig.' }));
        var g = PW.el('div', { 'class': 'sp-optionen', role: 'radiogroup', 'aria-label': th.kurz });
        [['a', th.a], ['k', th.k], ['b', th.b]].forEach(function (o) {
          var inp = PW.el('input', { type: 'radio', name: 'sp-' + t.q.id, value: o[0], 'class': 'sr-only' });
          if (st.angebot[t.q.id] === o[0]) inp.checked = true;
          inp.addEventListener('change', function () { st.angebot[t.q.id] = o[0]; sichern(); basis(); });
          var wer = o[0] === 'k' ? '<em>Kompromiss</em>' : ids.filter(function (id) { return t.pos[id] && (t.pos[id] === t.q.kategorien[0] ? 'a' : 'b') === o[0]; }).map(chip).join(' ');
          var lab = PW.el('label', { 'class': 'sp-option' + (o[0] === meine ? ' sp-option--meine' : '') }, [inp]);
          lab.appendChild(PW.el('span', { html: '<b>' + esc(o[1]) + '</b><small>' + wer + '</small>' }));
          g.appendChild(lab);
        });
        li.appendChild(g); liste.appendChild(li);
      });
      box.appendChild(liste);
      var bas = PW.el('p', { 'class': 'sp-basis', 'aria-live': 'polite' });
      var vor = PW.el('button', { type: 'button', 'class': 'knopf knopf--akzent', text: 'Paket vorlegen' });
      var opp = PW.el('button', { type: 'button', 'class': 'knopf', text: 'Aufstehen: Opposition' });
      var antwort = PW.el('div', { 'class': 'sp-antwort', 'aria-live': 'polite' });
      box.appendChild(bas); box.appendChild(PW.el('p', { 'class': 'knopfzeile' }, [vor, opp])); box.appendChild(antwort);
      function voll() { return T.tisch.every(function (t) { return st.angebot[t.q.id]; }); }
      function basis() {
        vor.disabled = !voll();
        if (!voll()) { bas.textContent = 'Lege zuerst jedes Thema fest.'; return; }
        var e = PW.spielPruefe(st.ich, st.partner, A, T.tisch, st.angebot, T.einig).parteien[st.ich];
        bas.innerHTML = '<strong>Deine eigene Partei:</strong> ' + (e.rot ? 'Nein – das Kernthema »' + esc(PW.spielThemen[e.rot].kurz) + '« wäre verloren.' : e.anteil >= e.schwelle + 0.2 ? 'begeistert. Ob der Partner da mitgeht?' : e.anteil >= e.schwelle ? 'trägt das mit.' : 'würde das ablehnen: zu wenig eigenes Programm.');
      }
      function reaktion(id, e) {
        var a = akt(id), Gp = PW.spielGewicht[id];
        if (e.ok) return '<p class="rueck rueck--gut"><strong>' + esc(a.name) + ': einverstanden.</strong></p>';
        var txt;
        if (e.rot) txt = '»' + esc(PW.spielThemen[e.rot].kurz) + '« ist für uns ein Kernthema. Das geben wir nicht ganz auf.';
        else {
          var offen = T.tisch.filter(function (t) { return t.pos[id] && st.angebot[t.q.id] !== (t.pos[id] === t.q.kategorien[0] ? 'a' : 'b'); }).sort(function (x, y) { return (Gp[y.q.id] || 1) - (Gp[x.q.id] || 1); });
          var tausch = T.tisch.filter(function (t) { return t.pos[id] && t.pos[st.ich] && st.angebot[t.q.id] === (t.pos[id] === t.q.kategorien[0] ? 'a' : 'b') && (Gp[t.q.id] || 1) < (G[t.q.id] || 1); })[0];
          txt = 'Das reicht uns nicht. ' + (offen[0] ? 'Bei »' + esc(PW.spielThemen[offen[0].q.id].kurz) + '« müsst ihr euch bewegen.' : '') + (tausch ? ' Dafür könnten wir bei »' + esc(PW.spielThemen[tausch.q.id].kurz) + '« nachgeben.' : '');
        }
        return '<p class="rueck rueck--nein"><strong>' + esc(a.name) + ':</strong> ' + txt + '</p>';
      }
      vor.addEventListener('click', function () {
        var e = PW.spielPruefe(st.ich, st.partner, A, T.tisch, st.angebot, T.einig);
        st.runde = (st.runde || 0) + 1;
        var html = st.partner.map(function (id) { return reaktion(id, e.parteien[id]); }).join('');
        if (e.partnerOk && e.ichOk) { st.ende = { art: 'vertrag' }; sichern(); gehe(schritt4); return; }
        if (e.partnerOk && !e.ichOk) { st.ende = { art: 'basis' }; sichern(); gehe(schritt4); return; }
        if (st.runde >= RUNDEN) { st.ende = { art: 'abbruch' }; sichern(); gehe(schritt4); return; }
        sichern();
        antwort.innerHTML = html + '<p class="klein">Noch ' + (RUNDEN - st.runde) + (RUNDEN - st.runde === 1 ? ' Runde' : ' Runden') + '. Ändere dein Paket und lege es neu vor.</p>';
        box.querySelector('.sp-titel').textContent = 'Verhandlung: Runde ' + (st.runde + 1) + ' von ' + RUNDEN;
      });
      opp.addEventListener('click', function () { st.ende = { art: 'opposition', grund: 'verhandlung' }; sichern(); gehe(schritt4); });
      basis();
    }

    /* 4 · Ergebnis */
    function schritt4() {
      var ids = [st.ich].concat(st.partner || []), T = PW.spielTisch(ids), A = akteure(), e = st.ende || { art: 'opposition' };
      var ich = akt(st.ich);
      var titel = { vertrag: 'Der Koalitionsvertrag steht', basis: 'Gescheitert: Deine Partei sagt Nein', abbruch: 'Gescheitert: Die Gespräche platzen', opposition: 'Du gehst in die Opposition' }[e.art];
      neu(4, titel);
      var pr = (e.art !== 'opposition' || (st.runde || 0) > 0) && T.tisch.every(function (t) { return st.angebot && st.angebot[t.q.id]; }) ? PW.spielPruefe(st.ich, st.partner, A, T.tisch, st.angebot, T.einig) : null;
      if (e.art === 'vertrag') {
        var blatt = PW.el('article', { 'class': 'sp-vertrag' });
        blatt.appendChild(PW.el('p', { 'class': 'sp-stempel' + (weniger() ? '' : ' sp-stempel--neu'), 'aria-hidden': 'true', text: 'unterschrieben' }));
        blatt.appendChild(PW.el('h3', { text: 'Koalitionsvertrag · ' + ids.map(function (id) { return akt(id).name; }).join(' + ') }));
        blatt.appendChild(PW.el('p', { 'class': 'klein', text: (pr ? pr.gesamt : ids.reduce(function (s, id) { return s + akt(id).sitze; }, 0)) + ' von 630 Sitzen' + ((pr ? pr.gesamt : 316) >= 316 ? '' : ' – ohne Mehrheit: Die Kanzlerwahl wäre unsicher.') }));
        var ul = PW.el('ul', { 'class': 'sp-punkte' });
        T.einig.forEach(function (x) { var th = PW.spielThemen[x.q.id]; ul.appendChild(PW.el('li', { html: '<b>' + esc(x.wert === x.q.kategorien[0] ? th.a : th.b) + '</b> <small>einig</small>' })); });
        T.tisch.forEach(function (t) {
          var th = PW.spielThemen[t.q.id], o = st.angebot[t.q.id];
          var wer = o === 'k' ? 'Kompromiss' : 'Linie von ' + ids.filter(function (id) { return t.pos[id] && (t.pos[id] === t.q.kategorien[0] ? 'a' : 'b') === o; }).map(function (id) { return akt(id).name; }).join(', ');
          ul.appendChild(PW.el('li', { html: '<b>' + esc(o === 'k' ? th.k : o === 'a' ? th.a : th.b) + '</b> <small>' + esc(wer) + '</small>' }));
        });
        blatt.appendChild(ul); box.appendChild(blatt);
        var weg = [], halb = [];
        T.tisch.forEach(function (t) { if (!t.pos[st.ich]) return; var m = t.pos[st.ich] === t.q.kategorien[0] ? 'a' : 'b', o = st.angebot[t.q.id], th = PW.spielThemen[t.q.id]; if (o === 'k') halb.push(th.kurz); else if (o !== m) weg.push(m === 'a' ? th.a : th.b); });
        box.appendChild(PW.el('p', { 'class': 'sp-preis', html: '<strong>Der Preis des Regierens für ' + esc(ich.name) + ':</strong> ' + (weg.length ? 'Aufgegeben: ' + weg.map(esc).join(' · ') + '.' : 'Keine eigene Position ganz aufgegeben.') + (halb.length ? ' Nur als Kompromiss: ' + halb.map(esc).join(' · ') + '.' : '') }));
      } else if (e.art === 'basis') {
        box.appendChild(PW.el('p', { 'class': 'rueck rueck--nein', html: '<strong>Zu weich verhandelt.</strong> Dein Partner war einverstanden – aber deine eigene Partei erkennt ihr Programm nicht wieder. Der Parteitag lehnt den Vertrag ab.' }));
      } else if (e.art === 'abbruch') {
        box.appendChild(PW.el('p', { 'class': 'rueck rueck--nein', html: '<strong>Zu hart verhandelt – oder zu weit auseinander.</strong> Nach drei Runden ohne Einigung beendet dein Gegenüber die Gespräche.' }));
      }
      if (pr) {
        var hs = PW.el('div', { 'class': 'sp-hand' }, [PW.el('h3', { text: 'Wie viel eigenes Programm steckt drin?' })]);
        ids.forEach(function (id) {
          var p = pr.parteien[id];
          hs.appendChild(PW.el('div', { 'class': 'balken sp-handzeile' }, [PW.el('span', { text: akt(id).name }), PW.el('div', { 'class': 'spur' }, [PW.el('div', { 'class': 'fuellung', style: 'background:' + akt(id).farbe + ';transform:scaleX(' + Math.max(p.anteil, 0.02).toFixed(2) + ')' }), PW.el('i', { 'class': 'sp-marke', style: 'left:' + (p.schwelle * 100).toFixed(0) + '%', title: 'Mindestens nötig' })]), PW.el('span', { 'class': 'zahl', text: p.rot ? 'Kernthema verloren' : wort(p.anteil, p.schwelle) })]));
        });
        hs.appendChild(PW.el('p', { 'class': 'klein', text: 'Der Strich zeigt, wie viel eine Partei mindestens braucht. Große Partner verlangen mehr als kleine.' }));
        box.appendChild(hs);
      }
      if (e.art === 'opposition' || e.art === 'abbruch' || e.art === 'basis') {
        var viertel = Math.ceil(630 / 4);
        var opp = PW.el('aside', { 'class': 'sp-opposition' });
        opp.innerHTML = '<h3>Die Alternative: Opposition</h3>' +
          '<p>Ohne Regierungsamt bleibt deiner Fraktion die Kontrolle: Fragen an die Regierung, Reden im Bundestag, eigene Gesetzentwürfe, Arbeit in den Ausschüssen.</p>' +
          '<p><strong>Mit einem Viertel der Abgeordneten (' + viertel + ' von 630)</strong> kann die Opposition einen Untersuchungsausschuss erzwingen (Art. 44 GG) und ein Gesetz vom Bundesverfassungsgericht prüfen lassen (Art. 93 GG). ' + esc(ich.name) + ' hat ' + ich.sitze + ' Sitze: ' + (ich.sitze >= viertel ? 'Das reicht allein.' : 'Das reicht allein nicht – ihr braucht andere Fraktionen.' + (st.art === 'bund' && st.ich === 'spd' ? '' : ' Zum Vergleich: Auch 120 Sitze, so viele wie die SPD 2025, lägen darunter.')) + '</p>' +
          '<p><strong>Was man dir vorwerfen kann:</strong> Wer gewählt wurde und nicht regieren will, drückt sich vor der Verantwortung. <strong>Was du antworten kannst:</strong> »Es ist besser, nicht zu regieren, als falsch zu regieren« – so begründete FDP-Chef Christian Lindner 2017 den Abbruch der Jamaika-Gespräche.</p>';
        box.appendChild(opp);
      }
      var fr = PW.el('div', { 'class': 'sp-nach' });
      fr.innerHTML = '<h3>Nachdenken – erst allein, dann zu zweit</h3><ol><li>Was hat dich dein Erfolg oder dein Scheitern gekostet?</li><li>Warum verlangt das Verhältniswahlrecht fast immer Kompromisse?</li><li>Wem würdest du das Ergebnis erklären müssen – und was würdest du sagen?</li></ol>' +
        '<p class="klein"><strong>Modell, keine Wirklichkeit.</strong> Wie wichtig ein Thema einer Partei ist, hat die Werkstatt angenommen; es steht in keinem Programm. <strong>Was lässt dieses Modell weg?</strong> Zum Beispiel Personen, Ministerien, Geld, Vertrauen – und die über hundert Themen eines echten Vertrags.</p>';
      box.appendChild(fr);
      var nochmal = PW.el('button', { type: 'button', 'class': 'knopf knopf--voll', text: 'Noch einmal verhandeln' });
      nochmal.addEventListener('click', function () { st.angebot = {}; st.runde = 0; st.ende = null; sichern(); gehe(st.partner && st.partner.length ? schritt3 : schritt2); });
      var andere = PW.el('button', { type: 'button', 'class': 'knopf', text: 'Andere Partner' });
      andere.addEventListener('click', function () { st.ende = null; st.sondiert = false; st.partner = []; sichern(); gehe(schritt2); });
      var neuS = PW.el('button', { type: 'button', 'class': 'knopf knopf--leise', text: 'Andere Partei' });
      neuS.addEventListener('click', function () { st = { art: st.art }; sichern(); gehe(schritt1); });
      box.appendChild(PW.el('p', { 'class': 'knopfzeile' }, [nochmal, andere, neuS]));
    }

    if (st.ende && st.ich) schritt4(); else if (st.ich && st.partner && st.partner.length && st.sondiert && st.runde !== undefined && Object.keys(st.angebot || {}).length) schritt3(); else if (st.ich) schritt2(); else schritt1();
  };
})();
