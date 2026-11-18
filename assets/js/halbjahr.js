/* GK-Labor · Das erste Halbjahr (v18) – eine Quelle für
   · die Halbjahreskarte auf der Startseite (Band mit fünf Abschnitten, Einheiten und Stunden),
   · den Reiter »Zusammenfassungen« (alle Zusammenfassungen, frei nach der Einheit oder auf Ansage),
   · die Sperre auf den Zusammenfassungen selbst, die Halbjahresleiste der Einheiten und die Freigabe im Lehrkraft-Modus.
   Läuft ohne werkstatt.js, auch im Kopf einer Seite (HJ.sperre). Liest den Stand aus pw:fertig (Stationen 1–6),
   pw:wdh-<bereich> (Wiederholung) und pw:m2-sachurteil / pw:m2-werturteil (Modul 2). Speichert nur pw:frei-<einheit> = true
   (Freigabe auf Ansage); gelöscht mit »Eingaben löschen …« der jeweiligen Einheit (PW.modulVon).
   Reihenfolge nach der Grobplanung HJ1, mit der Klassenarbeit nach Modul 1 (Entscheidung der Lehrkraft, 18.11.2026).
   Leitfragen und »Ich kann« aus der Grobplanung und dem Kompetenzraster des Halbjahres-Handouts. */
(function () {
  'use strict';
  var HJ = window.HJ = window.HJ || {};
  var SITZUNG = {};
  function lies(k, d) { try { var v = localStorage.getItem('pw:' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } }
  function merke(k, v) { try { localStorage.setItem('pw:' + k, JSON.stringify(v)); } catch (e) { /* privates Fenster: gilt nur für diese Sitzung */ } }
  function weg(k) { try { localStorage.removeItem('pw:' + k); } catch (e) { /* nichts */ } }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var SH = '­';

  HJ.leitfrage = 'Was braucht eine Demokratie, um nicht zu scheitern?';

  HJ.phasen = [
    { id: 'grund', name: 'Grundlagen', frage: 'Was macht eine Demokratie aus?', ton: 'gelb' },
    { id: 'ein', name: 'Einbringen', frage: 'Wer bringt Interessen in die Politik?', ton: 'blau' },
    { id: 'ent', name: 'Entscheiden', frage: 'Wer entscheidet – und wer kontrolliert?', ton: 'gruen' },
    { id: 'schutz', name: 'Schützen', frage: 'Was gefährdet die Demokratie?', ton: 'lila' },
    { id: 'bilanz', name: 'Bilanz', frage: 'Brücke nach Weimar', ton: 'warm' }
  ];

  /* art: papier (im Unterricht, ohne Lernseite) · lernseite · klassenarbeit · geplant */
  HJ.einheiten = [
    { id: 'grundlagen', phase: 'grund', titel: 'Grundlagen', kurz: 'Grund' + SH + 'lagen', art: 'papier', meta: 'drei Stunden · auf Papier',
      zf: 'zusammenfassung-grundlagen.html',
      teile: [
        { id: 'ab1', titel: 'Demokratie und Regierungs' + SH + 'systeme', zusatz: 'Arbeitsblatt AB1 · Repubblica Nova',
          kann: 'beschreiben, was alle Demokratien gemeinsam haben, und das parlamentarische, das präsidentielle und das semipräsidentielle Regierungssystem unterscheiden' },
        { id: 'ds1', titel: 'Direkte Demokratie', frage: 'Hat die Mehrheit immer Recht?',
          kann: 'Formen und Ebenen direkter Demokratie in Deutschland darstellen und Chancen und Probleme direkter Demokratie an Fällen erläutern – und ein Sachurteil von einem Werturteil unterscheiden' },
        { id: 'ds2', titel: 'Rechtsstaat und Grundrechte', frage: 'Wie weit darf der Staat in meine Freiheit eingreifen?',
          kann: 'die Merkmale eines Rechtsstaats erläutern und einen Grundrechtseingriff mithilfe der Verhältnismäßigkeitsprüfung beurteilen' }
      ] },
    { id: 'm1', phase: 'ein', nr: 'Modul 1', titel: 'Parteien und Wahlen', kurz: 'Parteien und Wahlen', art: 'lernseite', url: 'parteien.html',
      meta: 'Lernseite · zwei Doppelstunden', zf: 'zusammenfassung.html', pdf: 'docs/Zusammenfassung_Parteien_und_Wahlen.pdf',
      teile: [
        { id: 'st1', titel: 'Grundlagen', url: 'parteien-wahlen/station1.html' },
        { id: 'st2', titel: 'Erkennen', url: 'parteien-wahlen/station2.html' },
        { id: 'st3', titel: 'Positionen', url: 'parteien-wahlen/station3.html' },
        { id: 'st4', titel: 'Wählen', url: 'parteien-wahlen/station4.html' },
        { id: 'st5', titel: 'Warum so?', url: 'parteien-wahlen/station5.html' },
        { id: 'st6', titel: 'Europa', url: 'parteien-wahlen/station6.html' }
      ],
      extra: [['Koalitionsspiel', 'parteien-wahlen/koalition.html'], ['Klassenergebnis 2026/27', 'parteien-wahlen/station4.html#klasse-2627']] },
    { id: 'ka', phase: 'ein', titel: 'Klassenarbeit', kurz: 'Klassen' + SH + 'arbeit', art: 'klassenarbeit', url: 'klassenarbeit/index.html',
      meta: 'Wiederholung · Probeklausur', zf: 'klassenarbeit/zusammenfassung.html',
      teile: [
        { id: 'wdh', titel: 'Wiederholung', url: 'klassenarbeit/index.html' },
        { id: 'ichkann', titel: 'Ich-kann-Liste', url: 'klassenarbeit/ich-kann.html', ohneStand: true },
        { id: 'probe', titel: 'Probeklausur', url: 'klassenarbeit/probeklausur.html', ohneStand: true }
      ] },
    { id: 'm2', phase: 'ein', nr: 'Modul 2', titel: 'Verbände und Lobbyismus', kurz: 'Verbände', art: 'lernseite', url: 'verbaende.html',
      meta: 'Lernseite · Entwurf', zf: 'zusammenfassung-verbaende.html',
      teile: [
        { id: 'ds4', titel: 'Stimme der Gesellschaft – oder gekaufte Politik?', url: 'verbaende.html' }
      ] },
    { id: 'm3', phase: 'ein', nr: 'Modul 3', titel: 'Medien', kurz: 'Medien', art: 'geplant', meta: 'eine Stunde · geplant',
      teile: [
        { id: 'ds6', titel: 'Wächter oder Polarisierungs' + SH + 'maschine?', frage: 'Wächter der Demokratie oder Polarisierungsmaschine – und wer schützt uns vor wem?',
          kann: 'die Bedeutung von Medien – auch sozialen Medien – für eine demokratische Gesellschaft erörtern' }
      ] },
    { id: 'm4', phase: 'ent', nr: 'Modul 4', titel: 'Deutschland und die EU', kurz: 'Deutschland und die EU', art: 'geplant', meta: 'drei Stunden · geplant',
      teile: [
        { id: 'ds7', titel: 'Fall Wehrdienst', frage: 'Pflicht für uns – wer hat das entschieden, und wer kontrolliert es?',
          kann: 'einen politischen Entscheidungsprozess in Deutschland mithilfe des Politikzyklus analysieren und die Rolle von Bundestag, Bundesrat, Bundesregierung, Opposition und Bundesverfassungsgericht beschreiben' },
        { id: 'ds8', titel: 'EU: Organe und Gesetz' + SH + 'gebung', frage: 'Wer macht in der EU die Gesetze?',
          kann: 'die Organe der EU und das ordentliche Gesetzgebungsverfahren erklären' },
        { id: 'ds9', titel: 'EU: Europäi' + SH + 'sierung', frage: 'Wie stark bestimmt die EU deutsche Politik – und ist das demokratisch?',
          kann: 'den Einfluss der EU auf die nationale Politik untersuchen und beurteilen' }
      ] },
    { id: 'm5', phase: 'schutz', nr: 'Modul 5', titel: 'Gefährdungen der Demokratie', kurz: 'Gefähr' + SH + 'dungen', art: 'geplant', meta: 'zwei Stunden · geplant',
      teile: [
        { id: 'ds10', titel: 'Demokratie' + SH + 'feinde erkennen', frage: 'Woran erkennt man Demokratiefeinde – und was darf der Staat gegen sie tun?',
          kann: 'populistische und extremistische Positionen anhand von Kriterien erkennen und Instrumente der wehrhaften Demokratie beurteilen' },
        { id: 'ds12', titel: 'Parteiverbot', frage: 'Wie viel Schutz verträgt die Freiheit?' }
      ] },
    { id: 'bilanz', phase: 'bilanz', titel: 'Bilanz', kurz: 'Bilanz', art: 'geplant', meta: 'eine Stunde · geplant',
      teile: [
        { id: 'ds13', titel: 'Bilanz und Brücke nach Weimar', frage: 'Was braucht eine Demokratie, um nicht zu scheitern?' }
      ] }
  ];

  /* Fragen der Wiederholung je Bereich – muss zu assets/js/wiederholung.js passen (Prüfung in tools/halbjahr_test.js) */
  HJ.WDH = { demokratie: ['a1', 'a6', 'a2', 'a4', 'a5'], grundrechte: ['b1', 'b3', 'g1', 'g2', 'b5'], parteien: ['c1', 'p1', 'p2', 'c2', 'p3'], wahl: ['c3', 'c5', 'w1', 'w2'], europa: ['e1', 'd2', 'd3', 'd4', 'e2'] };
  var WDH_NAME = { demokratie: 'Demokratie und Regierungssysteme', grundrechte: 'Grundrechte und Güterabwägung', parteien: 'Parteien: Aufgaben und Funktionen', wahl: 'Bundestagswahl und Wahlentscheidung', europa: 'Europawahl' };

  HJ.einheit = function (id) { for (var i = 0; i < HJ.einheiten.length; i++) if (HJ.einheiten[i].id === id) return HJ.einheiten[i]; return null; };
  HJ.phase = function (id) { for (var i = 0; i < HJ.phasen.length; i++) if (HJ.phasen[i].id === id) return HJ.phasen[i]; return HJ.phasen[0]; };
  function ton(e) { return e.art === 'klassenarbeit' ? '--zt:var(--flaeche);--zt-tief:var(--text)' : '--zt:var(--ton-' + HJ.phase(e.phase).ton + ');--zt-tief:var(--ton-' + HJ.phase(e.phase).ton + '-tief)'; }
  function tonPhase(p) { return '--zt:var(--ton-' + p.ton + ');--zt-tief:var(--ton-' + p.ton + '-tief)'; }

  function bereichFertig(b) { var st = lies('wdh-' + b, {}) || {}; return HJ.WDH[b].every(function (q) { return st[q] !== undefined && st[q] !== null; }); }
  function m2Fertig() { return !!(String(lies('m2-sachurteil', '') || '').trim() && String(lies('m2-werturteil', '') || '').trim()); }
  function m2Begonnen() { try { return Object.keys(localStorage).some(function (k) { return /^pw:(lobby-|zucker$|m2-)/.test(k); }); } catch (e) { return false; } }

  /* Stand einer Einheit: erledigt, n von, was offen ist (mit Link), Satz für die Kachel */
  HJ.stand = function (id) {
    var e = HJ.einheit(id), r = { e: e, erledigt: false, n: 0, von: 0, offen: [], text: '', begonnen: false, kaestchen: [] };
    if (!e) return r;
    if (e.art === 'papier') { r.text = 'auf Papier'; r.kaestchen = e.teile.map(function () { return 'p'; }); return r; }
    if (e.art === 'geplant') { r.text = 'geplant'; r.kaestchen = e.teile.map(function () { return 'g'; }); return r; }
    if (e.id === 'm1') {
      var f = lies('fertig', {}) || {};
      e.teile.forEach(function (t, i) { r.von++; if (f[t.id]) { r.n++; r.kaestchen.push('f'); } else { r.offen.push({ id: t.id, titel: 'Station ' + (i + 1) + ' · ' + t.titel, url: t.url }); r.kaestchen.push(''); } });
      r.text = r.n + ' von ' + r.von + ' Stationen';
    } else if (e.id === 'ka') {
      Object.keys(HJ.WDH).forEach(function (b, i) { r.von++; if (bereichFertig(b)) { r.n++; r.kaestchen.push('f'); } else { r.offen.push({ id: b, titel: 'Bereich ' + (i + 1) + ' · ' + WDH_NAME[b], url: 'klassenarbeit/index.html#b-' + b }); r.kaestchen.push(''); } });
      r.text = r.n + ' von ' + r.von + ' Bereichen';
    } else if (e.id === 'm2') {
      r.von = 1; r.erledigt = m2Fertig(); r.n = r.erledigt ? 1 : 0; r.kaestchen = [r.erledigt ? 'f' : ''];
      if (!r.erledigt) r.offen.push({ id: 's6', titel: 'Schritt 6 · Sach- und Werturteil', url: 'verbaende.html#s6' });
      r.begonnen = r.erledigt || m2Begonnen();
      r.text = r.erledigt ? '' : r.begonnen ? 'begonnen' : 'noch nicht begonnen';
    }
    if (e.id !== 'm2') { r.erledigt = r.von > 0 && r.n === r.von; r.begonnen = r.n > 0; }
    if (r.erledigt) r.text = 'erledigt';
    return r;
  };
  function teilStand(e, t, s) {
    if (t.ohneStand || e.art === 'papier' || e.art === 'geplant') return null;
    if (e.id === 'm1') return !!(lies('fertig', {}) || {})[t.id];
    return s.erledigt;
  }

  /* Freigabe: erledigt oder auf Ansage */
  HJ.freiAufAnsage = function (id) { return !!SITZUNG[id] || lies('frei-' + id, false) === true; };
  HJ.frei = function (id) { var e = HJ.einheit(id); if (!e || !e.zf) return false; return HJ.freiAufAnsage(id) || HJ.stand(id).erledigt; };
  HJ.freigeben = function (id) { SITZUNG[id] = true; merke('frei-' + id, true); };
  HJ.zuruecknehmen = function (id) { delete SITZUNG[id]; weg('frei-' + id); };
  /* Im Kopf einer Zusammenfassung, vor dem ersten Zeichnen: verbirgt den Inhalt, solange er gesperrt ist (ohne JavaScript bleibt alles sichtbar) */
  HJ.sperre = function (id) { if (!HJ.frei(id)) document.documentElement.setAttribute('data-zf', 'zu'); };

  /* Wo geht es weiter? Die erste Einheit mit Lernseite, die noch nicht erledigt ist */
  HJ.aktuell = function () {
    for (var i = 0; i < HJ.einheiten.length; i++) {
      var e = HJ.einheiten[i]; if (e.art !== 'lernseite' && e.art !== 'klassenarbeit') continue;
      var s = HJ.stand(e.id); if (s.erledigt) continue;
      var t = e.id === 'm1' ? HJ.einheit('m1').teile.filter(function (x) { return x.id === s.offen[0].id; })[0] : e.teile[0];
      return { e: e, t: t, s: s, nr: e.id === 'm1' ? e.teile.indexOf(t) + 1 : 0 };
    }
    return null;
  };
  function weiterName(a) {
    if (a.e.id === 'm1') return 'Modul 1 · Station ' + a.nr + ' · ' + a.t.titel;
    if (a.e.id === 'ka') return 'Klassenarbeit · Wiederholung';
    return (a.e.nr ? a.e.nr + ' · ' : '') + a.e.titel;
  }

  var BEDINGUNG = {
    grundlagen: 'Diese Stunden waren auf Papier. Die Zusammenfassung öffnet, wenn deine Lehrkraft sie freigibt.',
    m1: 'Sie öffnet, sobald du alle sechs Stationen erledigt hast – oder wenn deine Lehrkraft sie freigibt.',
    ka: 'Sie öffnet, sobald du alle fünf Bereiche der Wiederholung bearbeitet hast – oder wenn deine Lehrkraft sie freigibt. Erst abrufen, dann nachlesen: So merkst du, was du schon kannst.',
    m2: 'Sie öffnet, sobald du in Schritt 6 dein Sach- und dein Werturteil geschrieben hast – oder wenn deine Lehrkraft sie freigibt.'
  };
  HJ.bedingung = function (id) { return BEDINGUNG[id] || ''; };
  function schlossHTML(e, s, w) {
    var offen = s.offen.length ? '<p class="zs-offen"><b>Noch offen:</b></p><ul class="zs-liste">' + s.offen.map(function (t) { return '<li><a href="' + w + t.url + '">' + esc(t.titel) + '</a></li>'; }).join('') + '</ul>' : '';
    return '<p class="zs-text">' + esc(BEDINGUNG[e.id]) + '</p>' + offen +
      '<div class="zs-ansage"><button type="button" class="knopf" data-ansage="' + e.id + '" aria-expanded="false">Meine Lehrkraft hat sie freigegeben</button>' +
      '<div class="zs-rueck" hidden><p>Hat deine Lehrkraft gesagt, dass diese Zusammenfassung jetzt frei ist?</p>' +
      '<button type="button" class="knopf knopf--akzent" data-ansage-ja="' + e.id + '">Ja, öffnen</button> <button type="button" class="knopf knopf--leise" data-ansage-nein="1">Nein, zurück</button></div></div>';
  }
  HJ.bindeAnsage = function (wurzelEl, nachher) {
    wurzelEl.addEventListener('click', function (ev) {
      var b = ev.target.closest ? ev.target.closest('button') : null; if (!b || !wurzelEl.contains(b)) return;
      var huelle = b.closest('.zs-ansage'); if (!huelle) return;
      var auf = huelle.querySelector('[data-ansage]'), rueck = huelle.querySelector('.zs-rueck');
      if (b.hasAttribute('data-ansage')) { rueck.hidden = false; auf.setAttribute('aria-expanded', 'true'); rueck.querySelector('[data-ansage-ja]').focus(); }
      else if (b.hasAttribute('data-ansage-nein')) { rueck.hidden = true; auf.setAttribute('aria-expanded', 'false'); auf.focus(); }
      else if (b.hasAttribute('data-ansage-ja')) { var id = b.getAttribute('data-ansage-ja'); HJ.freigeben(id); if (nachher) nachher(id); }
    });
  };

  /* ---------- Startseite: Band und Karten ---------- */
  function kaestchen(s) { return '<span class="hb-k" aria-hidden="true">' + s.kaestchen.map(function (k) { return '<i' + (k ? ' class="' + k + '"' : '') + '></i>'; }).join('') + '</span>'; }
  function kachel(e, akt) {
    var s = HJ.stand(e.id), hier = !!(akt && akt.e === e);
    var status = s.erledigt ? '✓ erledigt' : s.text;
    return '<li class="hb-einheit hb-einheit--' + e.art + (hier ? ' is-hier' : '') + (s.erledigt ? ' is-fertig' : '') + '"' + (e.art === 'klassenarbeit' ? ' style="' + ton(e) + '"' : '') + '>' +
      '<a href="#e-' + e.id + '">' + (e.nr ? '<span class="hb-nr">' + esc(e.nr) + '</span>' : '') + '<b class="hb-t">' + esc(e.kurz || e.titel) + '</b>' + kaestchen(s) +
      '<span class="hb-s">' + esc(status) + '</span>' + (hier ? '<span class="hb-hier">du bist hier</span>' : '') + '</a></li>';
  }
  function teilZeile(e, t, i, s, akt, w) {
    var fertig = teilStand(e, t, s), hier = !!(akt && akt.e === e && akt.t === t);
    if (t.url) {
      var marke = fertig ? '<span class="hk-st">✓<span class="sr-only"> erledigt</span></span>' : (e.id === 'ka' && t.id === 'wdh' && s.n ? '<span class="hk-st hk-st--leise">' + s.n + ' von ' + s.von + '</span>' : '');
      return '<li class="' + (fertig ? 'is-fertig' : '') + (hier ? ' is-hier' : '') + '"><a href="' + w + t.url + '">' + (e.id === 'm1' ? '<span class="hk-nr" aria-hidden="true">' + (i + 1) + '</span><span class="hk-tt"><span class="sr-only">Station ' + (i + 1) + ': </span>' : '<span class="hk-tt">') + esc(t.titel) + (hier ? '<span class="hk-hier">du bist hier</span>' : '') + '</span>' + marke + '</a></li>';
    }
    var wo = e.art === 'papier' ? 'Im Unterricht auf Papier.' : 'Noch nicht gebaut – Leitfrage aus der Planung des Halbjahres.';
    return '<li><details><summary><span class="hk-tt">' + esc(t.titel) + '</span><span class="hk-art">' + (e.art === 'papier' ? 'Papier' : 'geplant') + '</span></summary>' +
      (t.zusatz ? '<p>' + esc(t.zusatz) + '</p>' : '') + (t.frage ? '<p class="hk-frage">' + esc(t.frage) + '</p>' : '') +
      (t.kann ? '<p><b>Ich kann</b> ' + esc(t.kann) + '.</p>' : '') + '<p class="hk-wo">' + wo + '</p></details></li>';
  }
  function karte(e, akt, w) {
    var p = HJ.phase(e.phase), s = HJ.stand(e.id), frei = HJ.frei(e.id);
    var stand = (e.art === 'lernseite' || e.art === 'klassenarbeit') ? ' · <span class="hk-stand">' + esc(s.erledigt ? '✓ erledigt' : s.text) + '</span>' : '';
    var zf = !e.zf ? '<p class="hk-zf hk-zf--nein">Zusammenfassung kommt mit der Einheit</p>' :
      frei ? '<p class="hk-zf"><a href="' + w + e.zf + '">Zusammenfassung lesen</a></p>' :
      '<p class="hk-zf hk-zf--zu"><a href="' + w + e.zf + '">Zusammenfassung · noch gesperrt</a></p>';
    return '<article class="hk hk--' + e.art + '" id="e-' + e.id + '" style="' + ton(e) + '" aria-labelledby="ht-' + e.id + '">' +
      (p.name !== e.titel || e.nr ? '<p class="hk-phase">' + esc(p.name) + (e.nr ? ' · ' + esc(e.nr) : '') + '</p>' : '') +
      '<h3 id="ht-' + e.id + '">' + (e.url ? '<a href="' + w + e.url + '">' + esc(e.titel) + '</a>' : esc(e.titel)) + '</h3>' +
      '<p class="hk-meta">' + esc(e.meta) + stand + '</p>' +
      '<ol class="hk-teile">' + e.teile.map(function (t, i) { return teilZeile(e, t, i, s, akt, w); }).join('') + '</ol>' +
      (e.extra ? '<p class="hk-extra">' + e.extra.map(function (x) { return '<a href="' + w + x[1] + '">' + esc(x[0]) + '</a>'; }).join('') + '</p>' : '') +
      zf + '</article>';
  }
  HJ.karte = function (huelle, w) {
    if (!huelle) return; w = w || '';
    var akt = HJ.aktuell();
    var weiter = akt ? '<div class="hj-weiter"><a class="knopf knopf--akzent knopf--gross" href="' + w + akt.t.url + '">Weiter: ' + esc(weiterName(akt)) + '</a></div>' :
      '<div class="hj-weiter"><a class="knopf knopf--akzent knopf--gross" href="' + w + 'zusammenfassungen.html">Zu den Zusammenfassungen</a></div>';
    var band = '<ol class="hb" aria-label="Das erste Halbjahr: fünf Abschnitte, acht Einheiten">' + HJ.phasen.map(function (p) {
      var es = HJ.einheiten.filter(function (e) { return e.phase === p.id; });
      return '<li class="hb-phase" style="' + tonPhase(p) + ';--n:' + es.length + '"><p class="hb-kopf"><b>' + esc(p.name) + '</b><small>' + esc(p.frage) + '</small></p>' +
        '<ol class="hb-einheiten">' + es.map(function (e) { return kachel(e, akt); }).join('') + '</ol></li>';
    }).join('') + '</ol>';
    huelle.innerHTML = weiter + band + '<h2 class="hk-titel" id="einheiten">Einheiten und Stunden</h2><div class="hk-raster">' + HJ.einheiten.map(function (e) { return karte(e, akt, w); }).join('') + '</div>';
  };

  /* ---------- Reiter »Zusammenfassungen« ---------- */
  HJ.hub = function (liste, w) {
    if (!liste) return; w = w || '';
    function zeichne(fokusId) {
      liste.innerHTML = HJ.einheiten.map(function (e) {
        var p = HJ.phase(e.phase);
        var kopf = (p.name !== e.titel || e.nr ? '<p class="hk-phase">' + esc(p.name) + (e.nr ? ' · ' + esc(e.nr) : '') + '</p>' : '') + '<h2 id="zt-' + e.id + '">' + esc(e.titel) + '</h2>';
        if (!e.zf) return '<li class="zfh zfh--geplant" style="' + ton(e) + '" aria-labelledby="zt-' + e.id + '">' + kopf + '<p class="zfh-st">Kommt mit der Einheit.</p></li>';
        var s = HJ.stand(e.id);
        if (HJ.frei(e.id)) {
          var wie = HJ.freiAufAnsage(e.id) && !s.erledigt ? 'frei · auf Ansage' : 'frei · Einheit erledigt';
          return '<li class="zfh is-frei" id="z-' + e.id + '" style="' + ton(e) + '" aria-labelledby="zt-' + e.id + '">' + kopf + '<p class="zfh-st">' + wie + '</p><p class="zfh-akt">' +
            '<a class="knopf knopf--voll" href="' + w + e.zf + '">Zusammenfassung lesen</a>' +
            (e.pdf ? ' <a class="knopf" href="' + w + e.pdf + '">Als PDF (2 Seiten)</a>' : '') +
            (e.id === 'm1' ? ' <a class="knopf knopf--leise" href="' + w + 'zusammenfassung.html#lernkarten">Lernkarten</a>' : '') + '</p></li>';
        }
        return '<li class="zfh is-zu" id="z-' + e.id + '" style="' + ton(e) + '" aria-labelledby="zt-' + e.id + '">' + kopf + '<p class="zfh-st">noch gesperrt' + (s.von > 1 ? ' · ' + esc(s.text) : '') + '</p>' + schlossHTML(e, s, w) + '</li>';
      }).join('');
      if (fokusId) { var a = liste.querySelector('#z-' + fokusId + ' .zfh-akt a'); if (a) a.focus(); }
    }
    zeichne();
    HJ.bindeAnsage(liste, function (id) { zeichne(id); var live = document.getElementById('zfh-live'); if (live) live.textContent = 'Freigegeben: ' + HJ.einheit(id).titel + '.'; });
  };

  /* ---------- Sperre auf der Zusammenfassung selbst ---------- */
  HJ.schloss = function (platz, id, w) {
    var e = HJ.einheit(id); if (!platz || !e) return; w = w || '';
    if (HJ.frei(id)) { document.documentElement.removeAttribute('data-zf'); platz.hidden = true; return; }
    document.documentElement.setAttribute('data-zf', 'zu');
    platz.innerHTML = '<h2 class="zs-titel">Noch gesperrt</h2>' + schlossHTML(e, HJ.stand(id), w) + '<p class="zs-weg"><a href="' + w + 'zusammenfassungen.html">Alle Zusammenfassungen</a> · <a href="' + w + 'index.html#e-' + id + '">Zur Einheit im Halbjahr</a></p>';
    platz.hidden = false;
    HJ.bindeAnsage(platz, function () {
      document.documentElement.removeAttribute('data-zf');
      platz.innerHTML = '<p class="zs-frei" role="status">Freigegeben auf Ansage. Die Zusammenfassung steht jetzt hier.</p>';
      var h = document.querySelector('h1'); if (h) { h.setAttribute('tabindex', '-1'); h.focus(); }
    });
  };

  /* ---------- Halbjahresleiste auf den Einheiten ---------- */
  HJ.leiste = function (platz, id, w) {
    if (!platz) return; w = w || '';
    var ids = HJ.einheiten.map(function (e) { return e.id; }), k = ids.indexOf(id);
    platz.innerHTML = '<nav class="hl" aria-label="Wo diese Einheit im Halbjahr steht"><a class="hl-alle" href="' + w + 'index.html#e-' + id + '">Halbjahr</a><ol>' + HJ.einheiten.map(function (e, i) {
      var s = HJ.stand(e.id), hier = i === k, fern = k >= 0 && Math.abs(i - k) > 1;
      var text = esc(e.kurz || e.titel) + (s.erledigt ? '<span class="hl-ok" aria-hidden="true">✓</span><span class="sr-only"> (erledigt)</span>' : '') + (e.art === 'geplant' ? '<span class="sr-only"> (geplant)</span>' : '');
      var ziel = e.url ? w + e.url : w + 'index.html#e-' + e.id;
      return '<li class="hl-e hl-e--' + e.art + (hier ? ' is-hier' : '') + (fern ? ' hl-fern' : '') + '" style="' + ton(e) + '">' +
        (hier ? '<span aria-current="page">' + text + '<span class="sr-only"> – du bist hier</span></span>' : '<a href="' + ziel + '">' + text + '</a>') + '</li>';
    }).join('') + '</ol></nav>';
  };

  /* ---------- Lehrkraft-Modus: auf diesem Gerät freigeben ---------- */
  HJ.lehrkraft = function (platz) {
    if (!platz) return;
    function zeichne(fokus) {
      platz.innerHTML = '<ul class="zfl">' + HJ.einheiten.filter(function (e) { return e.zf; }).map(function (e) {
        var a = HJ.freiAufAnsage(e.id), s = HJ.stand(e.id);
        return '<li><span><b>' + esc(e.titel) + '</b> – ' + (a ? 'auf diesem Gerät freigegeben' : s.erledigt ? 'frei, weil die Einheit hier erledigt ist' : 'gesperrt') + '</span>' +
          '<button type="button" class="knopf' + (a ? ' knopf--leise' : '') + '" data-lk="' + e.id + '">' + (a ? 'Freigabe zurücknehmen' : 'Auf diesem Gerät freigeben') + '</button></li>';
      }).join('') + '</ul>';
      if (fokus) { var b = platz.querySelector('[data-lk="' + fokus + '"]'); if (b) b.focus(); }
    }
    zeichne();
    platz.addEventListener('click', function (ev) {
      var b = ev.target.closest ? ev.target.closest('[data-lk]') : null; if (!b) return;
      var id = b.getAttribute('data-lk'); if (HJ.freiAufAnsage(id)) HJ.zuruecknehmen(id); else HJ.freigeben(id); zeichne(id);
    });
  };
})();
