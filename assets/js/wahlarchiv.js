/* Politik-Werkstatt · Muster AI »Wahlarchiv« (v10)
   Klassenwahlen sichern, benennen, als Datei herunterladen und wieder laden – damit ein Ergebnis die Stunde überlebt.
   Gespeichert werden nur Summen je Liste (Zweitstimme) und je Kandidat (Erststimme), keine Namen, keine Reihenfolge, keine Uhrzeit.
   Auf dem Gerät: pw:wahlarchiv (Liste). Datei: JSON, »art: politik-werkstatt-klassenwahl«, Version 1.
   Laden setzt das Klassenergebnis für Sitzrechner und Abgleich (pw:klasse, pw:klasse-sonst, pw:klasse-name). */
(function () {
  'use strict';
  var PW = window.PW = window.PW || {};
  var ART = 'politik-werkstatt-klassenwahl';
  var GROSS = ['cdu', 'csu', 'spd', 'gruene', 'fdp', 'afd', 'linke', 'bsw'];

  function heute() { var d = new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function datumDE(iso) { var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || ''); return m ? m[3] + '.' + m[2] + '.' + m[1] : ''; }
  function listePids() { return (PW.wahlkreis && PW.wahlkreis.listen || []).map(function (l) { return l.pid; }).concat(GROSS); }
  function kandNr() { return (PW.wahlkreis && PW.wahlkreis.kandidierende || []).map(function (k) { return String(k.nr); }); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function summe(o) { var s = 0; Object.keys(o || {}).forEach(function (k) { s += o[k] || 0; }); return s; }

  /* Prozent für den Sitzrechner aus einem Eintrag */
  function prozente(e) {
    var gross = {}, klein = {};
    if (e.zweit && summe(e.zweit)) {
      var n = summe(e.zweit);
      GROSS.forEach(function (id) { gross[id] = Math.round((e.zweit[id] || 0) / n * 1000) / 10; });
      Object.keys(e.zweit).forEach(function (pid) { if (GROSS.indexOf(pid) < 0 && e.zweit[pid]) klein[pid] = Math.round(e.zweit[pid] / n * 1000) / 10; });
    } else if (e.prozent) {
      GROSS.forEach(function (id) { if (e.prozent[id] !== undefined) gross[id] = e.prozent[id]; });
      Object.keys(e.prozent).forEach(function (pid) { if (GROSS.indexOf(pid) < 0 && pid !== 'sonstige' && e.prozent[pid]) klein[pid] = e.prozent[pid]; });
    }
    return { gross: gross, klein: klein };
  }

  /* Eintrag prüfen: nur bekannte Listen und Kandidaten, nur nicht-negative ganze Zahlen (Prozente: 0–100) */
  PW.wahlPruefen = function (d) {
    if (!d || d.art !== ART) return 'Das ist keine Datei der Politik-Werkstatt (Klassenwahl).';
    var pids = listePids(), nrs = kandNr(), fehler = '';
    var e = { art: ART, version: 1, name: String(d.name || 'Klassenwahl').slice(0, 80), datum: /^\d{4}-\d{2}-\d{2}$/.test(d.datum || '') ? d.datum : heute(), zweit: {}, erst: {}, stimmzettel: 0 };
    Object.keys(d.zweit || {}).forEach(function (k) { var v = d.zweit[k]; if (pids.indexOf(k) < 0 || !(v >= 0) || v % 1) fehler = 'Unbekannte Liste oder ungültige Zahl: ' + k; else if (v) e.zweit[k] = v; });
    Object.keys(d.erst || {}).forEach(function (k) { var v = d.erst[k]; if (nrs.indexOf(String(k)) < 0 || !(v >= 0) || v % 1) fehler = 'Unbekannte Kandidatur oder ungültige Zahl: ' + k; else if (v) e.erst[k] = v; });
    if (d.prozent) { e.prozent = {}; Object.keys(d.prozent).forEach(function (k) { var v = d.prozent[k]; if ((pids.indexOf(k) < 0 && k !== 'sonstige') || !(v >= 0 && v <= 100)) fehler = 'Ungültiger Prozentwert: ' + k; else e.prozent[k] = v; }); }
    if (fehler) return fehler;
    if (!summe(e.zweit) && !e.prozent) return 'In der Datei stehen keine Zweitstimmen.';
    e.stimmzettel = Math.max(0, parseInt(d.stimmzettel, 10) || summe(e.zweit) || 0);
    if (d.hinweis) e.hinweis = String(d.hinweis).slice(0, 300);
    return e;
  };

  PW.wahlarchiv = function (box, nachLaden) {
    if (!box) return null;
    var liste = PW.lies('wahlarchiv', []) || [];
    function sichern() { PW.merke('wahlarchiv', liste); }
    box.textContent = '';

    var nameId = 'wa-name';
    var name = PW.el('input', { id: nameId, type: 'text', 'class': 'wa-name', maxlength: '80', value: PW.lies('klasse-name', '') || ('Klassenwahl · ' + datumDE(heute())) });
    var merken = PW.el('button', { type: 'button', 'class': 'knopf knopf--voll', text: 'Aktuelles Ergebnis unter diesem Namen merken' });
    var datei = PW.el('button', { type: 'button', 'class': 'knopf', text: 'Als Datei herunterladen' });
    var laden = PW.el('input', { type: 'file', accept: '.json,application/json', id: 'wa-datei', 'class': 'sr-only' });
    var ladenKn = PW.el('label', { 'for': 'wa-datei', 'class': 'knopf' }, ['Datei laden']);
    var meldung = PW.el('div', { 'class': 'rueck', 'aria-live': 'polite' });
    box.appendChild(PW.el('div', { 'class': 'wa-name-zeile' }, [PW.el('label', { 'for': nameId, text: 'Name der Wahl' }), name]));
    box.appendChild(PW.el('p', { 'class': 'knopfzeile' }, [merken, datei, laden, ladenKn]));
    box.appendChild(meldung);
    var ul = PW.el('ul', { 'class': 'wa-liste', 'aria-label': 'Gesicherte Wahlen' });
    box.appendChild(PW.el('h4', { text: 'Auf diesem Gerät gesichert' }));
    box.appendChild(ul);
    /* Rückfall ohne Download (z. B. in einem gesperrten Moodle-Rahmen): als Text kopieren und einfügen */
    var txt = PW.el('textarea', { 'class': 'schreibfeld wa-text', rows: '4', 'aria-label': 'Ergebnis als Text' });
    var txtLaden = PW.el('button', { type: 'button', 'class': 'knopf knopf--leise', text: 'Text übernehmen' });
    var details = PW.el('details', { 'class': 'wa-details' }, [PW.el('summary', { text: 'Ohne Datei: als Text kopieren oder einfügen' }), PW.el('p', { 'class': 'klein', text: 'Wenn der Download gesperrt ist: Hier steht das aktuelle Ergebnis als Text. Kopiere ihn in eine Notiz. Zum Laden fügst du ihn wieder ein.' }), txt, PW.el('p', { 'class': 'knopfzeile' }, [txtLaden])]);
    box.appendChild(details);

    function aktuell() {
      var st = PW.lies('klasse-stimmen', null), proz = PW.lies('klasse', null);
      var e = { art: ART, version: 1, name: name.value.trim() || 'Klassenwahl', datum: heute(), zweit: {}, erst: {}, stimmzettel: 0 };
      if (st && st.zweit && summe(st.zweit)) { e.zweit = st.zweit; e.erst = st.erst || {}; e.stimmzettel = st.summe || summe(st.zweit); }
      else if (proz && summe(proz)) { e.prozent = proz; var kl = PW.lies('klasse-sonst', {}) || {}; Object.keys(kl).forEach(function (k) { e.prozent[k] = kl[k]; }); }
      else return null;
      return e;
    }
    function dateiname(e) { return 'Klassenwahl_' + (e.name || 'Ergebnis').replace(/[^\wäöüÄÖÜß\- ]+/g, '').trim().replace(/\s+/g, '-').slice(0, 60) + '_' + e.datum + '.json'; }
    function herunterladen(e) {
      var json = JSON.stringify(e, null, 2);
      txt.value = json;
      try {
        var blob = new Blob([json], { type: 'application/json' });
        var a = PW.el('a', { href: URL.createObjectURL(blob), download: dateiname(e) });
        document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
        melde('gut', '<strong>Heruntergeladen:</strong> ' + dateiname(e) + '. Leg die Datei zum Unterrichtsmaterial, etwa in Moodle oder deinen Ordner.');
      } catch (x) { details.open = true; melde('nein', 'Der Download ist hier gesperrt. Unten steht das Ergebnis als Text zum Kopieren.'); }
    }
    function melde(art, html) { meldung.className = 'rueck rueck--' + art; meldung.innerHTML = html; }
    function inListe(e, auto) {
      var i = -1;
      liste.forEach(function (x, j) { if (x.name === e.name && x.datum === e.datum) i = j; });
      if (auto) liste.forEach(function (x, j) { if (x.auto && x.datum === e.datum) i = j; });
      e.auto = !!auto;
      if (i >= 0) liste[i] = e; else liste.unshift(e);
      liste = liste.slice(0, 30); sichern(); zeigeListe();
    }
    function aktivieren(e) {
      var p = prozente(e);
      PW.merke('klasse', p.gross); PW.merke('klasse-sonst', p.klein); PW.merke('klasse-name', e.name);
      name.value = e.name;
      if (nachLaden) nachLaden(e);
    }
    function kurz(e) {
      var teile = [];
      if (e.zweit && summe(e.zweit)) {
        Object.keys(e.zweit).sort(function (a, b) { return e.zweit[b] - e.zweit[a]; }).forEach(function (k) { teile.push(PW.listenName(k) + ' ' + e.zweit[k]); });
      } else if (e.prozent) {
        Object.keys(e.prozent).filter(function (k) { return e.prozent[k]; }).sort(function (a, b) { return e.prozent[b] - e.prozent[a]; }).forEach(function (k) { teile.push((k === 'sonstige' ? 'Sonstige' : PW.listenName(k)) + ' ' + PW.fmt(e.prozent[k]) + ' %'); });
      }
      return teile.join(' · ');
    }
    function zeigeListe() {
      ul.textContent = '';
      if (!liste.length) { ul.appendChild(PW.el('li', { 'class': 'klein wa-leer', text: 'Noch keine Wahl gesichert.' })); return; }
      liste.forEach(function (e, i) {
        var li = PW.el('li', { 'class': 'wa-eintrag' });
        li.appendChild(PW.el('p', { 'class': 'wa-titel', html: '<strong></strong> <span class="klein"></span>' }));
        li.querySelector('strong').textContent = e.name;
        li.querySelector('.klein').textContent = datumDE(e.datum) + (e.stimmzettel ? ' · ' + e.stimmzettel + ' Stimmzettel' : '') + (e.auto ? ' · automatisch gesichert' : '');
        li.appendChild(PW.el('p', { 'class': 'klein wa-kurz', text: 'Zweitstimmen: ' + kurz(e) }));
        if (e.hinweis) li.appendChild(PW.el('p', { 'class': 'klein wa-kurz', text: e.hinweis }));
        var l = PW.el('button', { type: 'button', 'class': 'knopf knopf--voll', text: 'Laden' });
        var d = PW.el('button', { type: 'button', 'class': 'knopf', text: 'Herunterladen' });
        var x = PW.el('button', { type: 'button', 'class': 'knopf knopf--leise', text: 'Entfernen' });
        l.addEventListener('click', function () { aktivieren(e); melde('gut', '<strong>Geladen:</strong> »' + esc(e.name) + '«. Das Ergebnis steht jetzt im Sitzrechner und im Abgleich.'); });
        d.addEventListener('click', function () { herunterladen(e); });
        x.addEventListener('click', function () { if (!confirm('»' + e.name + '« von diesem Gerät entfernen? Eine heruntergeladene Datei bleibt erhalten.')) return; liste.splice(i, 1); sichern(); zeigeListe(); });
        li.appendChild(PW.el('p', { 'class': 'knopfzeile' }, [l, d, x]));
        ul.appendChild(li);
      });
    }
    merken.addEventListener('click', function () {
      var e = aktuell(); if (!e) { melde('nein', 'Es gibt noch kein Ergebnis. Erst auszählen oder ein Ergebnis einfügen.'); return; }
      inListe(e, false); PW.merke('klasse-name', e.name); melde('gut', '<strong>Gemerkt:</strong> »' + esc(e.name) + '« auf diesem Gerät. Für mehr Sicherheit zusätzlich als Datei herunterladen.');
    });
    datei.addEventListener('click', function () { var e = aktuell(); if (!e) { melde('nein', 'Es gibt noch kein Ergebnis zum Herunterladen.'); return; } PW.merke('klasse-name', e.name); inListe(e, false); herunterladen(e); });
    function annehmen(text) {
      var d; try { d = JSON.parse(text); } catch (x) { melde('nein', 'Die Datei lässt sich nicht lesen. Ist es eine .json-Datei aus der Politik-Werkstatt?'); return; }
      var e = PW.wahlPruefen(d);
      if (typeof e === 'string') { melde('nein', e); return; }
      inListe(e, false); aktivieren(e);
      melde('gut', '<strong>Geladen:</strong> »' + esc(e.name) + '« vom ' + datumDE(e.datum) + '. Es steht jetzt im Sitzrechner, im Abgleich und in der Liste unten.');
    }
    laden.addEventListener('change', function () {
      var f = laden.files && laden.files[0]; if (!f) return;
      if (f.size > 200000) { melde('nein', 'Die Datei ist zu groß für ein Klassenergebnis.'); return; }
      var r = new FileReader(); r.onload = function () { annehmen(String(r.result)); laden.value = ''; }; r.readAsText(f);
    });
    txtLaden.addEventListener('click', function () { annehmen(txt.value); });
    details.addEventListener('toggle', function () { if (details.open && !txt.value) { var e = aktuell(); if (e) txt.value = JSON.stringify(e, null, 2); } });
    zeigeListe();
    return {
      autoSichern: function () {
        var e = aktuell(); if (!e) return;
        if (!PW.lies('klasse-name', '')) e.name = 'Klassenwahl · ' + datumDE(heute());
        inListe(e, true);
        melde('gut', '<strong>Automatisch gesichert</strong> auf diesem Gerät. Gib der Wahl oben einen Namen und lade sie als Datei herunter, damit sie auch auf einem anderen Gerät da ist.');
      }
    };
  };
})();
