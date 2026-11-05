/* Politik-Werkstatt · Muster AC »Argumente-Waage« (v7)
   Pro- und Contra-Argumente zur 5-%-Hürde selbst gewichten (0 bis 3), ein eigenes Argument dazulegen.
   Die Waage kippt nach den eigenen Gewichten (rotate, höchstens 14°, 300 ms); die Bewegung zeigt das Abwägen selbst.
   Danach Sachurteil und Werturteil schreiben. Die Waage ersetzt das Urteil nicht: Sie zeigt nur, was man selbst gewichtet hat.
   Gespeichert nur auf dem Gerät: pw:waage. Belege mit Quelle; Umstrittenes ist als umstritten gekennzeichnet. */
(function () {
  'use strict';
  var PW = window.PW = window.PW || {};
  PW.waageArgumente = [
    { id: 'p1', seite: 'pro', titel: 'Stabile Mehrheiten', text: 'Weniger Fraktionen machen es leichter, eine Regierung mit eigener Mehrheit zu bilden.', beleg: '2025: Union und SPD haben mit 328 von 630 Sitzen eine Mehrheit (ab 316). Prüfe im Sitzrechner, ob es ohne Hürde reicht. Quelle: Bundeswahlleiterin.' },
    { id: 'p2', seite: 'pro', titel: 'Lehre aus Weimar', text: 'Ohne Sperrklausel zogen viele kleine Parteien ins Parlament; Mehrheiten wurden schwer.', beleg: 'Reichstag Juli 1932: mehr als acht Parteien, NSDAP und KPD zusammen 319 von 608 Sitzen. Umstritten: NSDAP und KPD wären auch mit einer Hürde eingezogen.' },
    { id: 'p3', seite: 'pro', titel: 'Arbeitsfähiges Parlament', text: 'Das Bundesverfassungsgericht hält eine Sperrklausel beim Bundestag für zulässig, weil der Bundestag eine Regierung wählen und tragen muss.', beleg: 'BVerfG, Urteil vom 30. Juli 2024 zum Wahlrecht: Sperrklausel grundsätzlich gerechtfertigt; bis zu einer Neuregelung gilt sie zusammen mit der Grundmandatsklausel.' },
    { id: 'p4', seite: 'pro', titel: 'Klare Verantwortung', text: 'Mit wenigen großen Parteien ist für Wählende leichter zu erkennen, wer regiert und wer verantwortlich ist.', beleg: 'Ein Argument aus Werten und Erfahrung, keine Zahl. Prüfe: Gilt das auch bei Koalitionen aus drei Parteien?' },
    { id: 'c1', seite: 'contra', titel: 'Viele Stimmen ohne Sitz', text: 'Wer eine Partei unter 5 % wählt, ist im Bundestag nicht vertreten.', beleg: '2025: über 13 % der Zweitstimmen ohne Sitz (BSW 4,98 %, FDP 4,3 %, Sonstige außer SSW). Quelle: Bundeswahlleiterin.' },
    { id: 'c2', seite: 'contra', titel: 'Gleichheit der Wahl', text: 'Jede Stimme soll den gleichen Erfolg haben können. Die Hürde macht manche Stimmen wirkungslos.', beleg: 'Art. 38 Abs. 1 GG: Die Abgeordneten werden in »allgemeiner, unmittelbarer, freier, gleicher und geheimer Wahl« gewählt.' },
    { id: 'c3', seite: 'contra', titel: 'Es geht auch ohne', text: 'Für die Europawahl hat das Bundesverfassungsgericht Hürden gekippt, weil dort keine Regierung von einer stabilen Mehrheit abhängt.', beleg: 'BVerfG 9. November 2011 (5-%-Hürde) und 26. Februar 2014 (3-%-Hürde) zur Europawahl. Für den Bundestag gilt das ausdrücklich nicht.' },
    { id: 'c4', seite: 'contra', titel: 'Neue Parteien haben es schwer', text: 'Viele wählen aus Sorge um eine »verschenkte Stimme« taktisch – neue Ideen kommen schwerer ins Parlament.', beleg: 'Alternative in der Debatte: eine Ersatzstimme für den Fall, dass die erste Wahl unter 5 % bleibt.' }
  ];
  var WORTE = ['zählt nicht', 'wenig', 'mittel', 'stark'];
  var MAX = 14;

  PW.waage = function (box) {
    if (!box) return;
    var st = PW.lies('waage', null) || {};
    st.g = st.g || {}; st.eigen = st.eigen || { text: '', seite: '' };
    function sichern() { PW.merke('waage', st); }
    box.textContent = '';

    /* Bühne: Waage */
    var buehne = PW.el('div', { 'class': 'waage-buehne', 'aria-hidden': 'true' });
    var balken = PW.el('div', { 'class': 'waage-balken' });
    var schaleL = PW.el('div', { 'class': 'waage-schale waage-schale--pro' }, [PW.el('span', { text: 'beibehalten' })]);
    var schaleR = PW.el('div', { 'class': 'waage-schale waage-schale--contra' }, [PW.el('span', { text: 'senken oder abschaffen' })]);
    balken.appendChild(schaleL); balken.appendChild(schaleR);
    buehne.appendChild(balken);
    buehne.appendChild(PW.el('div', { 'class': 'waage-saeule' }));
    var stand = PW.el('p', { 'class': 'waage-stand', 'aria-live': 'polite' });

    /* Argumente */
    var spalten = PW.el('div', { 'class': 'waage-spalten' });
    var sp = { pro: PW.el('div', { 'class': 'waage-spalte' }, [PW.el('h3', { text: 'Für die Hürde, wie sie ist' })]), contra: PW.el('div', { 'class': 'waage-spalte' }, [PW.el('h3', { text: 'Gegen die Hürde, wie sie ist' })]) };
    function gewichtWahl(name, wert, beiWahl, label) {
      var g = PW.el('div', { 'class': 'waage-gewicht', role: 'radiogroup', 'aria-label': label });
      WORTE.forEach(function (w, i) {
        var inp = PW.el('input', { type: 'radio', name: name, value: String(i), 'class': 'sr-only' });
        if (wert === i) inp.checked = true;
        inp.addEventListener('change', function () { beiWahl(i); });
        g.appendChild(PW.el('label', {}, [inp, PW.el('span', { text: w })]));
      });
      return g;
    }
    PW.waageArgumente.forEach(function (a) {
      var k = PW.el('article', { 'class': 'waage-arg waage-arg--' + a.seite });
      k.appendChild(PW.el('h4', { text: a.titel }));
      k.appendChild(PW.el('p', { text: a.text }));
      k.appendChild(PW.el('p', { 'class': 'waage-beleg', html: '<strong>Beleg:</strong> ' }));
      k.lastChild.appendChild(document.createTextNode(a.beleg));
      k.appendChild(gewichtWahl('w-' + a.id, st.g[a.id], function (i) { st.g[a.id] = i; sichern(); kippe(); }, 'Gewicht für ' + a.titel));
      sp[a.seite].appendChild(k);
    });
    spalten.appendChild(sp.pro); spalten.appendChild(sp.contra);

    /* Eigenes Argument */
    var eigen = PW.el('div', { 'class': 'waage-eigen' });
    eigen.appendChild(PW.el('h3', { text: 'Dein eigenes Argument' }));
    var et = PW.el('textarea', { id: 'waage-eigen-text', 'class': 'schreibfeld', rows: '2' }); et.value = st.eigen.text;
    eigen.appendChild(PW.el('label', { 'for': 'waage-eigen-text', text: 'Was fehlt dir auf der Waage? (Behauptung und Beleg)' }));
    eigen.appendChild(et);
    var seite = PW.el('div', { 'class': 'waage-gewicht', role: 'radiogroup', 'aria-label': 'Seite deines Arguments' });
    [['pro', 'für die Hürde'], ['contra', 'gegen die Hürde']].forEach(function (s) {
      var inp = PW.el('input', { type: 'radio', name: 'waage-seite', value: s[0], 'class': 'sr-only' });
      if (st.eigen.seite === s[0]) inp.checked = true;
      inp.addEventListener('change', function () { st.eigen.seite = s[0]; sichern(); kippe(); });
      seite.appendChild(PW.el('label', {}, [inp, PW.el('span', { text: s[1] })]));
    });
    eigen.appendChild(seite);
    eigen.appendChild(gewichtWahl('w-eigen', st.eigen.g, function (i) { st.eigen.g = i; sichern(); kippe(); }, 'Gewicht für dein eigenes Argument'));
    et.addEventListener('input', function () { st.eigen.text = et.value; sichern(); kippe(); });

    /* Urteil */
    var urteil = PW.el('div', { 'class': 'waage-urteil' });
    urteil.appendChild(PW.el('h3', { text: 'Jetzt urteilst du' }));
    var sperre = PW.el('p', { 'class': 'klein waage-sperre' });
    urteil.appendChild(sperre);
    function feld(id, key, label, hilfe) {
      var t = PW.el('textarea', { id: id, 'class': 'schreibfeld', rows: '4' }); t.value = st[key] || '';
      t.addEventListener('input', function () { st[key] = t.value; sichern(); });
      return PW.el('div', { 'class': 'ul-satz' }, [PW.el('label', { 'for': id, text: label }), PW.el('p', { 'class': 'klein', style: 'margin:0;color:var(--leise)', text: hilfe }), t]);
    }
    var fSach = feld('waage-sach', 'sach', 'Sachurteil: Wie wirkt die Hürde, gemessen an den Kriterien?', 'Gemessen am Kriterium … wirkt die Hürde …, wie … zeigt (Beleg). Dem steht gegenüber, dass …');
    var fWert = feld('waage-wert', 'wert', 'Werturteil: Was ist dir wichtiger – und warum?', 'Ich halte die Hürde für …, weil mir … wichtiger ist als … Passt das zu deiner Waage? Wenn nicht: Was fehlt auf ihr?');
    urteil.appendChild(fSach); urteil.appendChild(fWert);

    box.appendChild(PW.el('p', { text: 'Gewichte jedes Argument: Wie stark überzeugt es dich, mit Blick auf den Beleg? Die Waage zeigt nur deine Gewichte – sie entscheidet nichts für dich.' }));
    box.appendChild(buehne); box.appendChild(stand);
    box.appendChild(spalten); box.appendChild(eigen); box.appendChild(urteil);

    function kippe() {
      var pro = 0, con = 0, n = 0;
      PW.waageArgumente.forEach(function (a) { var g = st.g[a.id]; if (g === undefined) return; n++; if (a.seite === 'pro') pro += g; else con += g; });
      if (st.eigen.seite && st.eigen.g && st.eigen.text.trim()) { if (st.eigen.seite === 'pro') pro += st.eigen.g; else con += st.eigen.g; }
      var winkel = 0; if (pro + con) winkel = Math.max(-MAX, Math.min(MAX, (con - pro) / Math.max(pro + con, 6) * MAX * 1.6));
      balken.style.setProperty('--w', winkel.toFixed(1) + 'deg');
      var neigung = pro === con ? 'Die Waage steht im Gleichgewicht.' : 'Die Waage neigt sich zu »' + (pro > con ? 'beibehalten' : 'senken oder abschaffen') + '«.';
      stand.innerHTML = n ? '<strong>' + neigung + '</strong> Deine Gewichte: für die Hürde ' + pro + ', gegen die Hürde ' + con + '. Gewichtet: ' + n + ' von 8 Argumenten.' : 'Noch nichts gewichtet. Die Waage steht gerade.';
      var frei = n >= 6;
      sperre.textContent = frei ? 'Schreibe zuerst das Sachurteil, dann das Werturteil. Dein Werturteil darf von der Waage abweichen – dann begründe, warum.' : 'Gewichte mindestens sechs der acht Argumente, dann öffnen sich die Felder. Erst abwägen, dann urteilen.';
      fSach.hidden = !frei; fWert.hidden = !frei;
    }
    kippe();
  };
})();
