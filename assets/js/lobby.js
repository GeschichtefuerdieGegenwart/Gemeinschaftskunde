/* GK-Labor · Modul 2 »Verbände und Lobbyismus« (v12, Entwurf)
   Roter Faden: die Zuckersteuer 2026 – ein Gesetz unter Druck. Kernfrage: Stimme der Gesellschaft oder gekaufte Politik?
   Muster AP · Schätz mal: drei Zahlen aus dem Lobbyregister erst schätzen, dann aufdecken (Hebel verdecken).
   Muster AQ · Gesetz im Änderungsmodus: fünf Fassungen am Regler, Änderungen gestrichen und eingefügt; vor jeder Erklärung tippen,
               wer ein Interesse an der Änderung hatte (Hebel variieren + verdecken). Ehrlich: belegt ist, wer was forderte – nicht, wer es durchsetzte.
   Muster AR · Akteure und Machtressourcen: je Akteur Ressourcen wählen, erklärende Rückmeldung »Passt / Passt auch / Passt nicht« (Hebel rückmelden).
   Muster AS · Einflussbarometer am Gerät vorne: Die Klasse schätzt per Handzeichen, die Lehrkraft stellt ein (Hebel bündeln, ein Gerät).
   Muster AT · Haltungslinie vorher/nachher zur Kernfrage (fünf Stellen, keine richtige).
   Alle Positionen mit Quelle und Datum. Zitate kurz und wörtlich aus Presseberichten. Was offen ist, heißt »noch offen«. */
(function () {
  'use strict';
  var PW = window.PW = window.PW || {};

  /* ---------- Daten ---------- */
  PW.lobbyZahlen = [
    { id: 'personen', frage: 'Wie viele Personen standen Ende 2024 namentlich im Lobbyregister des Bundestags?', einheit: 'Personen', wert: 26998,
      zeige: '26.998 Personen', vergleich: 'Das sind rund 43 je Sitz im Bundestag (630 Sitze).' },
    { id: 'geld', frage: 'Wie viel Geld gaben die eingetragenen Interessenvertretungen 2024 für ihre Lobbyarbeit aus? (in Millionen Euro)', einheit: 'Mio. €', wert: 910.6,
      zeige: '910,6 Millionen Euro', vergleich: 'Eher mehr: Bis März 2024 durften Einträge die Summe verweigern (507 taten es), und manche Gruppen müssen sich gar nicht eintragen.' },
    { id: 'strafe', frage: 'Wie hoch war das höchste rechtskräftige Bußgeld für Verstöße gegen das Lobbyregistergesetz (2022–2024)? (in Euro)', einheit: '€', wert: 660,
      zeige: '660 Euro', vergleich: '20 Verfahren, Bußgelder in 3 Fällen; rechtskräftig wurden 660 € und 495 €.' }
  ];
  PW.lobbyZahlenQuelle = 'Deutscher Bundestag, hib 131/2025 vom 31.03.2025: Bericht der registerführenden Stelle nach § 9 Abs. 1 LobbyRG (Zeitraum 1.1.2022–31.12.2024).';

  /* Fassungen der Zuckersteuer. zeilen: Form · Stufen · Ausnahmen · Start · Einnahmen · Geld */
  PW.zuckerZeilen = [['form', 'Form'], ['stufen', 'Stufen je Liter'], ['ausnahmen', 'Ausnahmen'], ['start', 'Start'], ['einnahmen', 'Einnahmen im Jahr'], ['geld', 'Wohin das Geld geht']];
  PW.zuckerFassungen = [
    { kurz: 'April 2026', titel: 'Die Koalition einigt sich auf eine Zuckerabgabe',
      w: { form: 'Sonderabgabe (»Zuckerabgabe«)', stufen: 'nach dem Vorschlag der Finanzkommission Gesundheit: 26 ct ab 5 g, 32 ct ab 8 g Zucker je 100 ml', ausnahmen: 'noch offen', start: '2028', einnahmen: 'rund 450 Mio. €', geld: 'an die gesetzlichen Krankenkassen' },
      quelle: 'beck-aktuell, 30.06.2026 (mit Verweis auf die Einigung vom 28.04.2026); Stufen nach Berichten über den Kommissionsvorschlag' },
    { kurz: '30. Juni 2026', titel: 'Aus der Abgabe wird eine Steuer',
      w: { form: 'Verbrauchsteuer (»Zuckersteuer«), federführend das Finanzministerium', geld: 'in den Bundeshaushalt; soll eine Kürzung des Zuschusses an den Gesundheitsfonds abmildern' },
      frage: 'Warum wurde aus der Abgabe eine Steuer?',
      antwort: 'Wegen <strong>verfassungsrechtlicher Bedenken</strong>: Eine Sonderabgabe ist nur unter engen Bedingungen erlaubt; hier zahlen Hersteller, profitieren sollten Versicherte. Eine Verbrauchsteuer sei »unproblematisch«, sagte der Kölner Verfassungsrechtler Henning Tappe. Kein Lobbyerfolg, sondern Recht – nicht jede Änderung hat einen Lobbyisten.',
      quelle: 'beck-aktuell, 30.06.2026; taz, 14.10.2026 (Verwendung der Einnahmen)' },
    { kurz: 'Ende September 2026', titel: 'Der Entwurf des Finanzministers',
      w: { stufen: 'drei Stufen: 26 ct ab 5 g, 32 ct ab 7 g, 38 ct ab 10 g', start: '1. Juli 2027', einnahmen: '925 Mio. € (2031: 1,16 Mrd. €)' },
      frage: 'Der Entwurf ist strenger als der Kommissionsvorschlag. Wer hatte daran ein Interesse?',
      antwort: 'Das <strong>Finanzministerium</strong> unter Lars Klingbeil (SPD): mehr Einnahmen, die schon im Haushalt eingeplant sind, und mehr Druck auf die Hersteller, Zucker zu senken. Gesundheitsverbände unterstützen die Steuer. Ein Entwurf ist immer auch ein Interesse – das des Ministeriums.',
      quelle: 'taz, 14.10.2026; Handelsblatt, 13.10.2026' },
    { kurz: '14. Oktober 2026', titel: 'Kanzleramt stoppt, Kabinett beschließt eine abgespeckte Fassung',
      w: { stufen: 'zwei Stufen: 26 ct ab 5 g, 32 ct ab 8 g', ausnahmen: 'kleine unabhängige Hersteller bis 70.000 Liter im Jahr; zusätzlich Betriebe bis 1 Mio. Liter (EU-Kommission muss zustimmen)', einnahmen: '820 Mio. € (2031: 890 Mio. €)' },
      frage: 'Eine Stufe weg, mehr Ausnahmen, rund 100 Millionen weniger. Wer hatte daran ein Interesse?',
      antwort: 'Anfang Oktober stoppte das Kanzleramt den Entwurf: Er weiche vom Kommissionsvorschlag ab und sei in der Regierung nicht mehrheitsfähig. Kurz zuvor hatten <strong>neun Agrar- und Verbraucherminister der Union aus den Ländern</strong> an Kanzler Merz geschrieben. Gegen die Steuer sind auch <strong>Getränke- und Lebensmittelindustrie</strong> und der <strong>Bauernverband</strong>. Belegt ist, wer was forderte. <strong>Wer welche Zeile gestrichen hat, steht nirgends.</strong>',
      quelle: 'Handelsblatt, 13.10.2026; taz, 14.10.2026' },
    { kurz: '5. November 2026', titel: 'Die Mehrheit im Bundestag wackelt',
      w: { start: '1. Juli 2027 – Verschiebung um ein Jahr wird verhandelt; ob die Steuer kommt, ist offen', einnahmen: 'offen (eingeplant: 690 Mio. € für 2027)' },
      frage: 'Jetzt könnte die ganze Steuer kippen. Wer hatte daran ein Interesse?',
      antwort: 'Laut <em>Bild</em> wollen alle zwölf Agrarpolitiker der Unionsfraktion nicht zustimmen; die Koalition hat nur eine knappe Mehrheit. Seit dem 19. Oktober werben <strong>acht Verbände</strong> mit einer Kampagne gegen die Steuer, die Wirtschaftliche Vereinigung Zucker warnt vor Folgen für Zuckerfabriken. Dagegen der Präsident der <strong>Bundesärztekammer</strong>: »Gesundheitsschutz muss Vorrang vor Lobbyinteressen haben.« Abgeordnete entscheiden frei (Art. 38 GG) – ob sie Verbandsargumente übernehmen oder selbst so denken, lässt sich von außen nicht trennen.',
      quelle: 'Deutsches Ärzteblatt, 05.11.2026; top agrar, 05.11.2026; vinetur.com nach Getränke News, 20.10.2026' }
  ];
  PW.zuckerTipps = [['finanz', 'Finanzministerium'], ['gesundheit', 'Gesundheitsverbände'], ['industrie', 'Getränke- und Lebensmittelindustrie'], ['agrar', 'Landwirtschaft und Zuckerwirtschaft'], ['union', 'Unionspolitiker in Bund und Ländern'], ['recht', 'niemand – das Recht']];
  PW.zuckerRichtig = [null, ['recht'], ['finanz', 'gesundheit'], ['union', 'industrie', 'agrar'], ['union', 'industrie', 'agrar']];

  PW.lobbyRessourcen = [['geld', 'Geld'], ['wissen', 'Fachwissen und Daten'], ['mitglieder', 'Mitglieder und Wählerstimmen'], ['konflikt', 'Drohpotenzial: Arbeitsplätze, Preise, Standorte'], ['zugang', 'Zugang zu Entscheidern'], ['oeffentlichkeit', 'Öffentlichkeit und Kampagnen'], ['amt', 'ein Amt im Verfahren']];
  PW.lobbyAkteure = [
    { id: 'industrie', name: 'Acht Verbände der Getränke- und Lebensmittelwirtschaft', typ: 'Verbände', pos: 'gegen die Steuer',
      beleg: 'Kampagne seit dem 19.10.2026, u. a. Wirtschaftsvereinigung Alkoholfreie Getränke, Deutscher Brauer-Bund, Verband Deutscher Mineralbrunnen: »Eine Zuckersteuer macht nicht schlanker. Sie macht ärmer.« Der Start 2027 sei unrealistisch. Schon im Juni schrieben über 300 Unternehmen einen offenen Brief: Höhere Preise träfen vor allem Haushalte mit wenig Geld.',
      quelle: 'vinetur.com nach Getränke News, 20.10.2026; beck-aktuell, 30.06.2026',
      r: { oeffentlichkeit: ['passt', 'Die Kampagne zielt auf die Debatte, bevor der Bundestag entscheidet.'], konflikt: ['passt', 'Kosten, Preise, kleine Betriebe: Wer mit Folgen für Betriebe und Kundschaft argumentiert, zeigt Drohpotenzial.'], geld: ['auch', 'Eine Kampagne kostet Geld; wie viel, steht im Lobbyregister je Verband.'], wissen: ['auch', 'Branchenzahlen zu Kosten und Absatz kennen die Verbände am besten.'], mitglieder: ['auch', 'Viele Betriebe sprechen mit einer Stimme – das gibt Gewicht.'], zugang: ['offen', 'Möglich, aus diesen Quellen aber nicht belegt.'], amt: ['nein', 'Verbände haben kein Amt – sie wirken von außen.'] } },
    { id: 'agrar', name: 'Deutscher Bauernverband und Wirtschaftliche Vereinigung Zucker', typ: 'Verbände', pos: 'gegen die Steuer',
      beleg: 'Bauernpräsident Joachim Rukwied fordert, die Pläne zurückzuziehen, und warnt vor einer »Schwächung der gesamten Wertschöpfungskette«. Die Zuckerwirtschaft rechnet vor, nach britischem Vorbild könnte rechnerisch eine Zuckerfabrik schließen; Rübenbauern fürchten Süßstoff statt Rübenzucker.',
      quelle: 'BauernZeitung (Online, 2026); top agrar, 05.11.2026',
      r: { mitglieder: ['passt', 'Viele Landwirtinnen und Landwirte, oft in ländlichen Wahlkreisen – das hören Abgeordnete.'], konflikt: ['passt', 'Die Fabrik, die schließen könnte: Arbeitsplätze und Einkommen in der Region.'], wissen: ['auch', 'Zahlen zu Absatz und Anbau.'], zugang: ['offen', 'Kontakte zu Agrarpolitikern liegen nahe – in diesen Quellen aber nicht belegt. Vermutung ist kein Beleg.'], oeffentlichkeit: ['auch', 'Stellungnahmen in Fach- und Tagespresse.'], geld: ['offen', 'Aus diesen Quellen nicht zu sagen.'], amt: ['nein', 'Kein Amt im Verfahren.'] } },
    { id: 'gesundheit', name: 'Bundesärztekammer, Deutsche Diabetes Gesellschaft, AOK-Bundesverband', typ: 'Verbände', pos: 'für die Steuer',
      beleg: 'Ärztepräsident Klaus Reinhardt nennt eine Blockade einen »gesundheitspolitischen Offenbarungseid«. Die Diabetes-Gesellschaft verweist auf starke Belege, dass solche Steuern wirken: Britische Hersteller senkten den Zucker stärker als die freiwillige Strategie in Deutschland.',
      quelle: 'Deutsches Ärzteblatt, 05.11.2026',
      r: { wissen: ['passt', 'Studien und ärztliche Erfahrung – Expertise ist ihre stärkste Ressource.'], oeffentlichkeit: ['passt', 'Deutliche Worte in der Presse.'], mitglieder: ['auch', 'Hinter der Ärztekammer stehen alle Ärztinnen und Ärzte, hinter der AOK Millionen Versicherte.'], zugang: ['offen', 'Aus diesen Quellen nicht belegt.'], konflikt: ['nein', 'Mit Arbeitsplätzen oder Standorten drohen sie nicht.'], geld: ['offen', 'Aus diesen Quellen nicht zu sagen.'], amt: ['nein', 'Kein Amt im Verfahren.'] },
      dreh: 'Auch das ist Interessenvertretung – mit einem anderen Ziel. Lobby heißt nicht automatisch Industrie.' },
    { id: 'laender', name: 'Neun Agrar- und Verbraucherminister der Union aus den Ländern', typ: 'Regierungsmitglieder der Länder', pos: 'gegen die Steuer',
      beleg: 'Brief an Bundeskanzler Merz kurz vor der Einigung: Eine Zuckersteuer setze auf »staatliche Lenkung« und belaste den Kauf bestimmter Lebensmittel unnötig. Sie verweisen auf die freiwillige Reduktionsstrategie: 2025 fast 15 % weniger Zucker in Erfrischungsgetränken als 2018 (vorläufige Zahlen).',
      quelle: 'Handelsblatt, 13.10.2026; taz, 14.10.2026; BauernZeitung (Online, 2026)',
      r: { zugang: ['passt', 'Ein Brief direkt an den Kanzler – Zugang, den kaum ein Verband hat.'], amt: ['passt', 'Sie sind selbst Teil der Politik: Ministerinnen und Minister mit Gewicht in ihrer Partei.'], oeffentlichkeit: ['auch', 'Der Brief wurde öffentlich.'], wissen: ['auch', 'Zahlen aus der Reduktionsstrategie.'], mitglieder: ['nein', 'Sie vertreten keinen Mitgliederverband.'], geld: ['nein', 'Kein Geld im Spiel.'], konflikt: ['nein', 'Kein Drohpotenzial im Sinn von Arbeitsplätzen.'] },
      dreh: 'Kein Verband: Einfluss auf ein Bundesgesetz läuft auch über Parteien und Länder.' },
    { id: 'finanz', name: 'Bundesfinanzminister Lars Klingbeil (SPD)', typ: 'Bundesregierung', pos: 'für die Steuer',
      beleg: 'Sein Ministerium schrieb den Entwurf. Die Einnahmen – 690 Mio. € für 2027 – sind im Haushalt schon eingeplant. Die Steuer soll zugleich Geld bringen und Hersteller dazu bewegen, weniger Zucker zu verwenden.',
      quelle: 'Handelsblatt, 13.10.2026; Deutsches Ärzteblatt, 05.11.2026',
      r: { amt: ['passt', 'Das federführende Ministerium formuliert den Text – die stärkste Ressource im Verfahren.'], wissen: ['passt', 'Fachleute im Ministerium rechnen Einnahmen und Folgen.'], zugang: ['auch', 'Er sitzt im Kabinett.'], oeffentlichkeit: ['auch', 'Er wirbt öffentlich für die Steuer.'], geld: ['nein', 'Er gibt kein Geld aus, um Einfluss zu nehmen – er will Einnahmen.'], mitglieder: ['nein', 'Kein Verband.'], konflikt: ['nein', 'Kein Drohpotenzial dieser Art.'] },
      dreh: 'Auch die Regierung hat Interessen: hier Einnahmen für den Haushalt.' },
    { id: 'union', name: 'Agrarpolitiker der Unionsfraktion im Bundestag', typ: 'Abgeordnete', pos: 'gegen die Steuer oder für eine Verschiebung',
      beleg: 'Laut Bild haben alle zwölf angekündigt, nicht zuzustimmen; Haushalts- und Finanzpolitiker könnten folgen. Verhandelt wird über einen Start ein Jahr später.',
      quelle: 'Deutsches Ärzteblatt, 05.11.2026, und Head Topics, 04.11.2026 (beide nach Bild)',
      r: { amt: ['passt', 'Ihre Stimme im Bundestag: Bei knapper Mehrheit können wenige ein Gesetz stoppen.'], mitglieder: ['auch', 'Sie wollen in ihren Wahlkreisen wiedergewählt werden.'], zugang: ['auch', 'Sie sitzen mit am Verhandlungstisch der Koalition.'], oeffentlichkeit: ['auch', 'Die Ankündigung über die Presse erhöht den Druck.'], wissen: ['offen', 'Aus diesen Quellen nicht zu sagen.'], geld: ['nein', 'Kein Geld im Spiel.'], konflikt: ['nein', 'Kein Drohpotenzial im Sinn von Arbeitsplätzen – aber ein Veto.'] },
      dreh: 'Abgeordnete sind frei (Art. 38 GG). Ob sie Verbandsargumente übernehmen oder selbst so denken, lässt sich von außen nicht trennen.' }
  ];

  PW.lobbyFunktionen = [['artikulation', 'Interessen ausdrücken (Artikulation)'], ['aggregation', 'Interessen bündeln (Aggregation)'], ['information', 'Politik informieren (Expertise)'], ['selbst', 'Den Staat entlasten (Selbstregulierung)'], ['kontrolle', 'Kritik und Kontrolle'], ['teilhabe', 'Mitmachen ermöglichen (Partizipation)']];
  PW.lobbySaetze = [
    { t: 'Acht Verbände treten mit einem Satz auf: »Eine Zuckersteuer macht nicht schlanker. Sie macht ärmer.«', ok: 'aggregation', auch: ['artikulation'], erk: 'Viele Betriebe mit unterschiedlichen Lagen einigen sich auf eine Botschaft: Das ist Bündeln.' },
    { t: 'Rübenbauern sagen über ihren Verband, was sie fürchten: dass Hersteller Süßstoff statt Rübenzucker nehmen.', ok: 'artikulation', auch: [], erk: 'Ein Interesse wird hörbar gemacht: Artikulation.' },
    { t: 'Die Diabetes-Gesellschaft verweist auf Studien aus Großbritannien.', ok: 'information', auch: ['kontrolle'], erk: 'Verbände liefern Wissen, das Ministerien und Abgeordnete nutzen – Expertise.' },
    { t: 'Seit 2018 senken Hersteller Zucker freiwillig, ohne Gesetz – die Union verweist darauf.', ok: 'selbst', auch: [], erk: 'Die Wirtschaft regelt selbst, der Staat verzichtet auf ein Gesetz: Selbstregulierung. Ob sie reicht, ist genau der Streit.' },
    { t: 'Der Ärztepräsident kritisiert öffentlich, dass Unionspolitiker die Steuer blockieren.', ok: 'kontrolle', auch: ['artikulation'], erk: 'Öffentliche Kritik an Regierenden ist Kontrolle von außen.' },
    { t: 'Wer in einem Verband mitarbeitet, wirkt an Politik mit, ohne in einer Partei zu sein.', ok: 'teilhabe', auch: [], erk: 'Verbände eröffnen einen Weg zur Beteiligung neben Wahlen und Parteien (Art. 9 Abs. 1 GG: Vereinigungsfreiheit).' }
  ];

  /* ---------- Hilfen ---------- */
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function weniger() { return PW.wenigerBewegung ? PW.wenigerBewegung() : false; }
  function name(liste, id) { for (var i = 0; i < liste.length; i++) if (liste[i][0] === id) return liste[i][1]; return id; }

  /* ---------- AP · Schätz mal ---------- */
  PW.lobbySchaetzen = function (box) {
    if (!box) return;
    var st = PW.lies('lobby-schaetz', {}) || {};
    box.textContent = '';
    var liste = PW.el('ol', { 'class': 'lz-liste' });
    var felder = {};
    PW.lobbyZahlen.forEach(function (z, i) {
      var inp = PW.el('input', { type: 'number', min: 0, step: 'any', inputmode: 'decimal', id: 'lz-' + z.id });
      if (st[z.id] !== undefined) inp.value = st[z.id];
      felder[z.id] = inp;
      var aufl = PW.el('div', { 'class': 'lz-aufl', hidden: 'hidden' });
      liste.appendChild(PW.el('li', { 'class': 'lz-zahl' }, [
        PW.el('label', { 'for': 'lz-' + z.id, text: z.frage }),
        PW.el('div', { 'class': 'lz-eingabe' }, [inp, PW.el('span', { 'class': 'lz-einheit', text: z.einheit })]),
        aufl]));
      z._aufl = aufl;
    });
    box.appendChild(liste);
    var knopf = PW.el('button', { type: 'button', 'class': 'knopf knopf--akzent', text: 'Aufdecken' });
    var hinweis = PW.el('p', { 'class': 'klein', 'aria-live': 'polite' });
    var schluss = PW.el('div', { 'class': 'lz-schluss', hidden: 'hidden' });
    box.appendChild(PW.el('p', { 'class': 'knopfzeile' }, [knopf])); box.appendChild(hinweis); box.appendChild(schluss);
    function zeige() {
      PW.lobbyZahlen.forEach(function (z) {
        var t = felder[z.id].value, a = z._aufl; a.hidden = false;
        var abw = t ? (+t / z.wert) : null;
        var wort = !t ? 'Du hast nicht geschätzt.' : abw > 0.8 && abw < 1.25 ? 'Deine Schätzung liegt nah dran.' : abw < 0.8 ? 'Du hast unterschätzt.' : 'Du hast überschätzt.';
        a.innerHTML = '<p class="lz-wert">' + z.zeige + '</p><p class="klein">' + wort + ' ' + z.vergleich + '</p>';
      });
      schluss.hidden = false;
      schluss.innerHTML = '<p class="lz-knall">910 Millionen Euro im Jahr – und das höchste Bußgeld: 660 Euro.</p><p>Bevor du urteilst: Sagen diese Zahlen schon, dass Lobbyarbeit Gesetze <em>kauft</em>? Was müsstest du zusätzlich wissen?</p><p class="klein" style="color:var(--leise)">Quelle: ' + esc(PW.lobbyZahlenQuelle) + '</p>';
    }
    knopf.addEventListener('click', function () {
      var n = PW.lobbyZahlen.filter(function (z) { return felder[z.id].value !== ''; }).length;
      if (n < 2) { hinweis.textContent = 'Schätze mindestens zwei Zahlen. Ein Bauchgefühl reicht.'; return; }
      hinweis.textContent = '';
      PW.lobbyZahlen.forEach(function (z) { st[z.id] = felder[z.id].value; }); st.offen = true; PW.merke('lobby-schaetz', st);
      knopf.hidden = true; zeige();
    });
    if (st.offen) { knopf.hidden = true; zeige(); }
  };

  /* ---------- AT · Haltungslinie ---------- */
  PW.lobbyHaltungWorte = ['vor allem Stimme der Gesellschaft', 'eher Stimme der Gesellschaft', 'beides', 'eher gekaufte Politik', 'vor allem gekaufte Politik'];
  PW.lobbyHaltung = function (box, runde) {
    if (box) PW['haltung_' + runde] = function () { PW.lobbyHaltung(box, runde); };
    if (!box) return;
    box.textContent = '';
    var key = 'lobby-haltung-' + runde, jetzt = PW.lies(key, 0);
    var g = PW.el('div', { 'class': 'hl', role: 'radiogroup', 'aria-label': 'Lobbyismus: Stimme der Gesellschaft oder gekaufte Politik? ' + (runde === 'nachher' ? 'Deine Stelle am Ende' : 'Deine Stelle am Anfang') });
    PW.lobbyHaltungWorte.forEach(function (w, i) {
      var inp = PW.el('input', { type: 'radio', name: 'hl-' + runde, value: String(i + 1), 'class': 'sr-only' });
      if (jetzt === i + 1) inp.checked = true;
      inp.addEventListener('change', function () { PW.merke(key, i + 1); schreibe(i + 1); if (runde === 'vorher' && PW.haltung_nachher) PW.haltung_nachher(); });
      var lab = PW.el('label', { 'class': 'hl-stelle' }, [inp, PW.el('span', { text: w })]);
      g.appendChild(lab);
    });
    box.appendChild(g);
    var satz = PW.el('p', { 'class': 'klein', 'aria-live': 'polite' }); box.appendChild(satz);
    function schreibe(p) {
      var vor = PW.lies('lobby-haltung-vorher', 0);
      if (runde === 'nachher') g.querySelectorAll('.hl-stelle').forEach(function (l, j) { l.classList.toggle('hl-stelle--vorher', vor === j + 1); });
      if (runde === 'vorher') { satz.textContent = p ? 'Gespeichert auf diesem Gerät: ' + PW.lobbyHaltungWorte[p - 1] + '. Am Ende stellst du dich noch einmal auf.' : 'Tippe an, wo du gerade stehst. Es gibt keine richtige Stelle.'; return; }
      if (!p) { satz.textContent = vor ? 'Am Anfang standest du bei »' + PW.lobbyHaltungWorte[vor - 1] + '« (umrandet).' : 'Tippe an, wo du jetzt stehst.'; return; }
      satz.textContent = !vor ? 'Jetzt: ' + PW.lobbyHaltungWorte[p - 1] + '.' : p === vor ? 'Du bist geblieben – begründe, warum die Stunde dich bestätigt hat.' : 'Du hast dich bewegt: von »' + PW.lobbyHaltungWorte[vor - 1] + '« zu »' + PW.lobbyHaltungWorte[p - 1] + '«. Welches Material hat dich bewegt?';
    }
    schreibe(jetzt);
  };

  /* ---------- AQ · Gesetz im Änderungsmodus ---------- */
  PW.zuckerAenderung = function (box) {
    if (!box) return;
    var F = PW.zuckerFassungen, N = F.length;
    var st = PW.lies('zucker', { stufe: 0, tipps: {} }) || { stufe: 0, tipps: {} };
    if (!st.tipps) st.tipps = {};
    box.textContent = '';
    /* kumulierter Stand je Fassung */
    var stand = [], akt = {};
    F.forEach(function (f, i) { Object.keys(f.w).forEach(function (k) { akt[k] = f.w[k]; }); stand[i] = JSON.parse(JSON.stringify(akt)); });
    var kopf = PW.el('div', { 'class': 'gb-steuer' });
    var zurueck = PW.el('button', { type: 'button', 'class': 'knopf knopf--leise', text: '← Fassung zurück' });
    var vor = PW.el('button', { type: 'button', 'class': 'knopf', text: 'Nächste Fassung →' });
    var regler = PW.el('input', { type: 'range', min: '0', max: String(N - 1), step: '1', value: String(st.stufe || 0), 'aria-label': 'Fassung wählen', 'class': 'gb-regler' });
    var marken = PW.el('ol', { 'class': 'gb-marken', 'aria-hidden': 'true' });
    F.forEach(function (f) { marken.appendChild(PW.el('li', { text: f.kurz })); });
    kopf.appendChild(PW.el('div', { 'class': 'gb-reglerzeile' }, [regler, marken]));
    kopf.appendChild(PW.el('p', { 'class': 'knopfzeile' }, [zurueck, vor]));
    var blatt = PW.el('article', { 'class': 'gb-blatt', 'aria-live': 'polite' });
    var rand = PW.el('aside', { 'class': 'gb-rand' });
    box.appendChild(kopf);
    box.appendChild(PW.el('div', { 'class': 'gb-buehne' }, [blatt, rand]));
    function zeige(i, gleiten) {
      st.stufe = i; PW.merke('zucker', st); regler.value = String(i);
      zurueck.disabled = i === 0; vor.disabled = i === N - 1;
      var f = F[i], s = stand[i], alt = i ? stand[i - 1] : null;
      blatt.textContent = '';
      blatt.appendChild(PW.el('p', { 'class': 'gb-stand', text: 'Fassung ' + (i + 1) + ' von ' + N + ' · ' + f.kurz }));
      blatt.appendChild(PW.el('h3', { text: f.titel }));
      blatt.appendChild(PW.el('p', { 'class': 'gb-para', text: '§ Zucker in Erfrischungsgetränken' }));
      var dl = PW.el('dl', { 'class': 'gb-zeilen' });
      PW.zuckerZeilen.forEach(function (z) {
        var neu = s[z[0]], vorher = alt ? alt[z[0]] : null, geaendert = alt && neu !== vorher;
        var dd = PW.el('dd', { 'class': geaendert ? 'gb-neu' : '' });
        if (geaendert && vorher) dd.appendChild(PW.el('del', { text: vorher }));
        dd.appendChild(geaendert ? PW.el('ins', { text: neu }) : document.createTextNode(neu || 'noch offen'));
        dl.appendChild(PW.el('dt', { text: z[1] })); dl.appendChild(dd);
      });
      blatt.appendChild(dl);
      blatt.appendChild(PW.el('p', { 'class': 'klein gb-quelle', text: 'Quelle: ' + f.quelle }));
      if (gleiten && !weniger()) { blatt.querySelectorAll('ins').forEach(function (x, j) { x.classList.add('gb-kommt'); x.style.animationDelay = Math.min(j, 4) * 60 + 'ms'; }); }
      randZeigen(i);
    }
    function randZeigen(i) {
      rand.textContent = '';
      var f = F[i];
      if (!f.frage) { rand.appendChild(PW.el('p', { html: '<strong>Ausgangspunkt.</strong> Gehe zur nächsten Fassung. Achte darauf, was gestrichen und was eingefügt wird.' })); return; }
      rand.appendChild(PW.el('p', { 'class': 'gb-frage', text: f.frage }));
      var getippt = st.tipps[i];
      var g = PW.el('div', { 'class': 'gb-tipp', role: 'group', 'aria-label': 'Wer hatte ein Interesse? Mehrere möglich' });
      var gewaehlt = (getippt || []).slice();
      PW.zuckerTipps.forEach(function (t) {
        var inp = PW.el('input', { type: 'checkbox', value: t[0], 'class': 'sr-only' });
        if (gewaehlt.indexOf(t[0]) >= 0) inp.checked = true;
        if (getippt) inp.disabled = true;
        inp.addEventListener('change', function () { var k = gewaehlt.indexOf(t[0]); if (inp.checked && k < 0) gewaehlt.push(t[0]); if (!inp.checked && k >= 0) gewaehlt.splice(k, 1); pruef.disabled = !gewaehlt.length; });
        g.appendChild(PW.el('label', {}, [inp, PW.el('span', { text: t[1] })]));
      });
      rand.appendChild(g);
      var pruef = PW.el('button', { type: 'button', 'class': 'knopf knopf--akzent', text: 'Hintergrund aufdecken', disabled: '' });
      var aus = PW.el('div', { 'class': 'gb-hinter' });
      if (!getippt) rand.appendChild(PW.el('p', { 'class': 'knopfzeile' }, [pruef]));
      rand.appendChild(aus);
      function auf() {
        var r = PW.zuckerRichtig[i] || [], tipp = st.tipps[i] || [];
        var treffer = tipp.filter(function (x) { return r.indexOf(x) >= 0; });
        var wort = !tipp.length ? '' : treffer.length === tipp.length && treffer.length ? 'Passt.' : treffer.length ? 'Passt teilweise.' : 'Passt nicht.';
        aus.innerHTML = '<p class="rueck' + (wort === 'Passt.' ? ' rueck--gut' : wort === 'Passt nicht.' ? ' rueck--nein' : ' rueck--auch') + '"><strong>' + wort + '</strong> ' + (r.length === 1 && r[0] === 'recht' ? 'Hier stand kein Akteur dahinter, sondern das Recht.' : 'Ein Interesse hatten: ' + r.map(function (x) { return name(PW.zuckerTipps, x); }).join(', ') + '.') + '</p><p>' + f.antwort + '</p>';
      }
      pruef.addEventListener('click', function () { st.tipps[i] = gewaehlt.slice(); PW.merke('zucker', st); if (PW.notiere) PW.notiere(12, 'zucker-' + i, true, 'Interessen hinter Gesetzesänderungen'); randZeigen(i); });
      if (getippt) auf();
    }
    regler.addEventListener('input', function () { zeige(+regler.value, true); });
    zurueck.addEventListener('click', function (e) { zeige(Math.max(0, st.stufe - 1), e.detail !== 0); });
    vor.addEventListener('click', function (e) { zeige(Math.min(N - 1, st.stufe + 1), e.detail !== 0); });
    zeige(Math.min(st.stufe || 0, N - 1), false);
  };

  /* ---------- AR · Akteure und Machtressourcen ---------- */
  PW.lobbyAkteurKarten = function (box) {
    if (!box) return;
    var st = PW.lies('lobby-akteure', {}) || {};
    box.textContent = '';
    PW.lobbyAkteure.forEach(function (a, n) {
      var k = PW.el('article', { 'class': 'ak-karte', id: 'ak-' + a.id });
      k.appendChild(PW.el('p', { 'class': 'ak-meta', text: 'Akteur ' + (n + 1) + ' · ' + a.typ + ' · ' + a.pos }));
      k.appendChild(PW.el('h3', { text: a.name }));
      k.appendChild(PW.el('p', { 'class': 'ak-beleg', text: a.beleg }));
      k.appendChild(PW.el('p', { 'class': 'klein ak-quelle', text: 'Quelle: ' + a.quelle }));
      k.appendChild(PW.el('p', { 'class': 'ak-auftrag', html: '<strong>Welche Machtressourcen setzt dieser Akteur ein?</strong> Wähle bis zu drei.' }));
      var g = PW.el('div', { 'class': 'gb-tipp ak-wahl', role: 'group', 'aria-label': 'Machtressourcen von ' + a.name });
      var gew = (st[a.id] && st[a.id].w) || [];
      PW.lobbyRessourcen.forEach(function (r) {
        var inp = PW.el('input', { type: 'checkbox', value: r[0], 'class': 'sr-only' });
        if (gew.indexOf(r[0]) >= 0) inp.checked = true;
        inp.addEventListener('change', function () {
          var i = gew.indexOf(r[0]);
          if (inp.checked) { if (gew.length >= 3) { inp.checked = false; hin.textContent = 'Höchstens drei – welche wiegen am schwersten?'; return; } if (i < 0) gew.push(r[0]); }
          else if (i >= 0) gew.splice(i, 1);
          hin.textContent = ''; st[a.id] = { w: gew, offen: false }; PW.merke('lobby-akteure', st); aus.textContent = ''; pk.hidden = false; pk.disabled = !gew.length;
        });
        g.appendChild(PW.el('label', {}, [inp, PW.el('span', { text: r[1] })]));
      });
      k.appendChild(g);
      var hin = PW.el('p', { 'class': 'klein', 'aria-live': 'polite' });
      var pk = PW.el('button', { type: 'button', 'class': 'knopf', text: 'Rückmeldung', disabled: gew.length ? null : '' });
      if (!gew.length) pk.setAttribute('disabled', ''); else pk.removeAttribute('disabled');
      var aus = PW.el('div', { 'class': 'ak-rueck', 'aria-live': 'polite' });
      k.appendChild(hin); k.appendChild(PW.el('p', { 'class': 'knopfzeile' }, [pk])); k.appendChild(aus);
      function rueck() {
        var html = '<ul class="ak-liste">';
        gew.forEach(function (id) {
          var e = a.r[id] || ['offen', ''];
          var wort = { passt: 'Passt.', auch: 'Passt auch.', nein: 'Passt nicht.', offen: 'Nicht belegt.' }[e[0]];
          html += '<li class="ak-' + e[0] + '"><strong>' + name(PW.lobbyRessourcen, id) + ': ' + wort + '</strong> ' + e[1] + '</li>';
        });
        html += '</ul>';
        var stark = Object.keys(a.r).filter(function (id) { return a.r[id][0] === 'passt' && gew.indexOf(id) < 0; });
        if (stark.length) html += '<p class="klein">Die Quelle zeigt außerdem: ' + stark.map(function (id) { return name(PW.lobbyRessourcen, id) + ' – ' + a.r[id][1]; }).join(' ') + '</p>';
        if (a.dreh) html += '<p class="ak-dreh">' + a.dreh + '</p>';
        aus.innerHTML = html;
      }
      pk.addEventListener('click', function () { st[a.id] = { w: gew, offen: true }; PW.merke('lobby-akteure', st); rueck(); pk.hidden = true; if (PW.notiere) PW.notiere(12, 'ak-' + a.id, true, 'Machtressourcen von Akteuren'); });
      if (st[a.id] && st[a.id].offen && gew.length) { rueck(); pk.hidden = true; }
      box.appendChild(k);
    });
  };

  /* ---------- Funktionen zuordnen ---------- */
  PW.lobbyFunktionenUeben = function (box) {
    if (!box) return;
    var st = PW.lies('lobby-funktionen', {}) || {};
    box.textContent = '';
    var ol = PW.el('ol', { 'class': 'fn-liste' });
    PW.lobbySaetze.forEach(function (s, i) {
      var li = PW.el('li', { 'class': 'fn-satz' }, [PW.el('p', { 'class': 'fn-text', text: s.t })]);
      var sel = PW.el('select', { 'aria-label': 'Funktion für Satz ' + (i + 1), 'class': 'fn-wahl' });
      sel.appendChild(PW.el('option', { value: '', text: 'Funktion wählen …' }));
      PW.lobbyFunktionen.forEach(function (f) { sel.appendChild(PW.el('option', { value: f[0], text: f[1] })); });
      if (st[i]) sel.value = st[i];
      var r = PW.el('p', { 'class': 'fn-rueck', 'aria-live': 'polite' });
      function zeig() {
        var v = sel.value; if (!v) { r.textContent = ''; r.className = 'fn-rueck'; return; }
        var w = v === s.ok ? 'Passt.' : s.auch.indexOf(v) >= 0 ? 'Passt auch.' : 'Passt nicht.';
        r.className = 'fn-rueck ' + (w === 'Passt.' ? 'rueck rueck--gut' : w === 'Passt auch.' ? 'rueck rueck--auch' : 'rueck rueck--nein');
        r.innerHTML = '<strong>' + w + '</strong> ' + (w === 'Passt nicht.' ? 'Lies den Satz noch einmal: Was tut der Verband hier?' : s.erk + (w === 'Passt auch.' ? ' Am genauesten: ' + name(PW.lobbyFunktionen, s.ok) + '.' : ''));
      }
      sel.addEventListener('change', function () { st[i] = sel.value; PW.merke('lobby-funktionen', st); zeig(); });
      li.appendChild(sel); li.appendChild(r); ol.appendChild(li);
      if (st[i]) zeig();
    });
    box.appendChild(ol);
  };

  /* ---------- AS · Einflussbarometer (ein Gerät vorne) ---------- */
  PW.lobbyBarometer = function (box) {
    if (!box) return;
    var worte = ['kein', 'gering', 'mittel', 'groß', 'sehr groß'];
    var st = PW.lies('lobby-barometer', {}) || {};
    box.textContent = '';
    PW.lobbyAkteure.forEach(function (a) {
      var w = st[a.id] === undefined ? 0 : st[a.id];
      var reg = PW.el('input', { type: 'range', min: '0', max: '4', step: '1', value: String(w), 'aria-label': 'Einfluss von ' + a.name, 'aria-valuetext': worte[w] });
      var wert = PW.el('span', { 'class': 'bm-wert', text: worte[w] });
      var spur = PW.el('div', { 'class': 'spur' }, [PW.el('div', { 'class': 'fuellung', style: 'transform:scaleX(' + (w / 4) + ')' })]);
      reg.addEventListener('input', function () { var v = +reg.value; st[a.id] = v; PW.merke('lobby-barometer', st); wert.textContent = worte[v]; reg.setAttribute('aria-valuetext', worte[v]); spur.firstChild.style.transform = 'scaleX(' + (v / 4) + ')'; });
      box.appendChild(PW.el('div', { 'class': 'bm-zeile' }, [PW.el('span', { 'class': 'bm-name', text: a.name }), reg, spur, wert]));
    });
    var leeren = PW.el('button', { type: 'button', 'class': 'knopf knopf--leise', text: 'Barometer leeren' });
    leeren.addEventListener('click', function () { PW.merke('lobby-barometer', {}); PW.lobbyBarometer(box); });
    box.appendChild(PW.el('p', { 'class': 'knopfzeile' }, [leeren]));
  };
})();
