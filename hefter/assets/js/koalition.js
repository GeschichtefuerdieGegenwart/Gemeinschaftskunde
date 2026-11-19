/* Politik-Werkstatt · Koalitionen (Muster Q): mehr als die rechnerische Mehrheit.
   Die inhaltliche Nähe wird aus den acht Streitfragen der Station 3 berechnet – also aus den Wahlprogrammen 2025,
   nicht aus Vermutungen. »keine Aussage« zählt nicht als Übereinstimmung und nicht als Gegensatz.
   Aussagen zur Zusammenarbeit sind belegt und datiert; wo nichts vorliegt, steht das ausdrücklich da.
   Die Seite gibt keine Prognose und keine Empfehlung ab – die Wahrscheinlichkeit beurteilen die Lernenden. */
(function () {
  'use strict';
  var PW = window.PW = window.PW || {};

  PW.koalAussagen = {
    cdu: [{ text: 'CDU-Bundesparteitag in Hamburg, Dezember 2018: Beschluss gegen Koalitionen und ähnliche Formen der Zusammenarbeit mit der AfD und mit der Linkspartei (»Unvereinbarkeitsbeschluss«). Die Parteispitze hat ihn seither mehrfach bekräftigt; innerparteilich wird er weiter diskutiert.', quelle: 'CDU-Parteitagsbeschluss 2018; t-online 24.06.2019; ZDFheute 04.09.2026' },
           { text: 'Seit Mai 2025 regiert die CDU gemeinsam mit CSU und SPD; Friedrich Merz ist seit dem 06.05.2025 Bundeskanzler.', quelle: 'Bundesregierung, Mai 2025' }],
    csu: [{ text: 'Die CSU bildet mit der CDU eine Fraktionsgemeinschaft und trägt deren Beschlüsse zur Zusammenarbeit mit; sie regiert seit Mai 2025 mit CDU und SPD.', quelle: 'Bundesregierung, Mai 2025' }],
    spd: [{ text: 'Die SPD regiert seit Mai 2025 gemeinsam mit CDU und CSU.', quelle: 'Bundesregierung, Mai 2025' }],
    gruene: [{ text: 'Keine belegte Aussage in dieser Sammlung. Die Grünen sind seit 2025 in der Opposition.', quelle: 'Stand 10/2026' }],
    fdp: [{ text: 'Keine belegte Aussage in dieser Sammlung. Die FDP ist seit 2025 nicht im Bundestag.', quelle: 'Stand 10/2026' }],
    afd: [{ text: 'Von der CDU durch den Beschluss von 2018 als Koalitionspartner ausgeschlossen. Die AfD selbst wirbt für eine Regierungsbeteiligung.', quelle: 'CDU-Parteitagsbeschluss 2018' }],
    linke: [{ text: 'Von der CDU durch den Beschluss von 2018 als Koalitionspartner ausgeschlossen. Über Ausnahmen auf Landesebene wird in der CDU seit 2026 gestritten.', quelle: 'CDU-Parteitagsbeschluss 2018; ZDFheute 04.09.2026' }],
    bsw: [{ text: 'Keine belegte Aussage in dieser Sammlung. Das BSW ist seit 2025 nicht im Bundestag.', quelle: 'Stand 10/2026' }]
  };

  /* Inhaltliche Nähe aus den acht Streitfragen: gleiche Kategorie = einig, verschiedene = strittig. */
  PW.koalNaehe = function (ids) {
    var einig = [], strittig = [], offen = [];
    (PW.fragen || []).forEach(function (q) {
      var pos = ids.map(function (id) { return q.pos[id] ? q.pos[id][0] : null; });
      if (pos.some(function (p) { return p === null; })) return;
      if (pos.some(function (p) { return p === 'keine Aussage'; })) { offen.push(q); return; }
      var alleGleich = pos.every(function (p) { return p === pos[0]; });
      if (alleGleich) einig.push({ q: q, wert: pos[0] });
      else strittig.push({ q: q, pos: pos });
    });
    return { einig: einig, strittig: strittig, offen: offen, vergleichbar: einig.length + strittig.length };
  };

  /* Darstellung für ein gewähltes Bündnis */
  PW.koalPruefung = function (box, ids, sitze) {
    box.innerHTML = '';
    if (ids.length < 2) {
      box.appendChild(PW.el('p', { 'class': 'klein', text: 'Wähle mindestens zwei Parteien aus, dann prüfen wir hier die inhaltliche Nähe und die bekannten Aussagen.' }));
      return;
    }
    var namen = ids.map(function (id) { return PW.partei(id).name; });
    var n = PW.koalNaehe(ids);
    var summe = 0; ids.forEach(function (id) { summe += sitze[id] || 0; });

    /* Kriterium 1: Mehrheit */
    var k1 = PW.el('div', { 'class': 'koal-kriterium' }, [
      PW.el('b', { text: '1' }),
      PW.el('div', { html: '<strong>Rechnerische Mehrheit:</strong> ' + namen.join(' + ') + ' hätten <strong>' + summe + ' von 630</strong> Sitzen. ' +
        (summe >= PW.mehrheit ? 'Das reicht für eine Mehrheit (ab ' + PW.mehrheit + ').' : 'Das reicht nicht; es fehlen ' + (PW.mehrheit - summe) + ' Sitze.') })
    ]);
    box.appendChild(k1);

    /* Kriterium 2: inhaltliche Nähe */
    var k2 = PW.el('div', { 'class': 'koal-kriterium' }, [
      PW.el('b', { text: '2' }),
      PW.el('div', { html: '<strong>Inhaltliche Nähe</strong> (aus den acht Streitfragen der Station 3, Grundlage sind die Wahlprogramme 2025): <strong>' + n.einig.length + ' von ' + n.vergleichbar + '</strong> vergleichbaren Fragen gleich beantwortet.' })
    ]);
    box.appendChild(k2);

    var felder = PW.el('div', { 'class': 'koal-pruefung' });
    var fe = PW.el('div', { 'class': 'koal-feld' }); fe.appendChild(PW.el('h4', { text: 'Darin einig' }));
    if (n.einig.length) {
      var ule = PW.el('ul');
      n.einig.forEach(function (e) { ule.appendChild(PW.el('li', { html: e.q.frage.replace(/\?$/, '') + ' – alle: <strong>' + e.wert + '</strong>' })); });
      fe.appendChild(ule);
    } else fe.appendChild(PW.el('p', { 'class': 'klein', text: 'In keiner der vergleichbaren Fragen dieselbe Position.' }));
    felder.appendChild(fe);

    var fs = PW.el('div', { 'class': 'koal-feld' }); fs.appendChild(PW.el('h4', { text: 'Darin uneinig' }));
    if (n.strittig.length) {
      var uls = PW.el('ul');
      n.strittig.forEach(function (e) {
        uls.appendChild(PW.el('li', { html: e.q.frage.replace(/\?$/, '') + ' – ' + ids.map(function (id, i) { return PW.partei(id).name + ': <strong>' + e.pos[i] + '</strong>'; }).join(', ') }));
      });
      fs.appendChild(uls);
      fs.appendChild(PW.el('p', { 'class': 'klein', style: 'margin:8px 0 0', text: 'Die wörtlichen Belege dazu stehen in Station 3, Schritt 3.' }));
    } else fs.appendChild(PW.el('p', { 'class': 'klein', text: 'In den vergleichbaren Fragen keine Gegensätze.' }));
    felder.appendChild(fs);
    box.appendChild(felder);

    if (n.offen.length) {
      box.appendChild(PW.el('p', { 'class': 'klein', style: 'color:var(--leise);margin-top:10px', text: 'Nicht vergleichbar, weil mindestens ein Programm dazu nichts sagt: ' + n.offen.map(function (q) { return q.frage.replace(/\?$/, ''); }).join(' · ') + '.' }));
    }

    /* Kriterium 3: Aussagen */
    var k3 = PW.el('div', { 'class': 'koal-kriterium', style: 'margin-top:14px' }, [PW.el('b', { text: '3' }), PW.el('div', { html: '<strong>Was öffentlich gesagt wurde</strong> (belegt und datiert):' })]);
    box.appendChild(k3);
    var aus = PW.el('ul', { style: 'font-size:1rem' });
    ids.forEach(function (id) {
      (PW.koalAussagen[id] || []).forEach(function (a) {
        aus.appendChild(PW.el('li', { html: '<strong>' + PW.partei(id).name + ':</strong> ' + a.text + ' <span style="color:var(--leise)">(' + a.quelle + ')</span>' }));
      });
    });
    box.appendChild(aus);
    box.appendChild(PW.el('p', { 'class': 'hinweis', style: 'margin-top:12px', html: '<strong>Die Seite urteilt nicht.</strong> Ob dieses Bündnis wahrscheinlich ist, beurteilst du selbst – aus Mehrheit, inhaltlicher Nähe und Aussagen. Prüfe dabei auch, ob sich seit Oktober 2026 etwas geändert hat.' }));
  };
})();
