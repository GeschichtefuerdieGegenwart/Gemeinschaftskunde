/* GK-Labor · Wiederholung vor der Klassenarbeit (v16)
   Inhalt: Demokratie und Regierungssysteme (AB1, Repubblica Nova) · Grundrechte und Rechtsstaat (DS 2) ·
   Parteien und Bundestagswahl (Modul 1, Stationen 1–5) · Europawahl (Station 6). Modul 2 gehört nicht dazu.
   Muster: Aus dem Kopf (freies Abrufen) → Einfachwahl mit Erklärung je Option (21 Fragen in vier Bereichen) →
   Merkkasten je Bereich erst nach dem Bereich → Ende mit Liste »noch einmal ansehen« und den Druckfassungen.
   Keine Punkte; gespeichert nur auf dem Gerät (Schlüssel pw:wdh-*), gelöscht mit »Eingaben löschen …« (Modul 1). */
(function () {
  'use strict';
  var PW = window.PW = window.PW || {};

  /* o: [Text, passt (true/false), Erklärung] – die passende Antwort steht an wechselnder Stelle */
  PW.wdhBereiche = [
    { id: 'demokratie', titel: 'Demokratie und Regierungssysteme', quelle: 'AB1 · Repubblica Nova', fragen: [
      { id: 'a1', f: 'Was haben alle Demokratien gemeinsam?', o: [
        ['Das Volk stimmt über jedes Gesetz selbst ab, ein Parlament ist nicht nötig.', false, 'Das wäre reine direkte Demokratie. Die meisten Demokratien sind repräsentativ: Gewählte entscheiden.'],
        ['Die Regierung wird in jedem Fall vom Parlament gewählt.', false, 'Nur im parlamentarischen System. In den USA wählt das Volk (über Wahlleute) den Präsidenten.'],
        ['Die Macht geht vom Volk aus und wird auf Zeit vergeben.', true, 'Volkssouveränität, Herrschaft auf Zeit durch freie Wahlen, Grundrechte und Gewaltenteilung – das teilen alle Demokratien.'],
        ['Das Staatsoberhaupt wird immer direkt vom Volk gewählt.', false, 'Den Bundespräsidenten wählt die Bundesversammlung (Art. 54 GG), nicht das Volk.'] ] },
      { id: 'a2', f: 'Woran erkennst du ein parlamentarisches Regierungssystem?', o: [
        ['Das Parlament wählt die Regierung und kann sie abwählen.', true, 'Genau: Das Parlament wählt die Regierung und kann sie stürzen. Deshalb arbeiten Regierung und Mehrheit eng zusammen.'],
        ['Regierung und Parlament sind streng getrennt und unabhängig voneinander.', false, 'Das kennzeichnet das präsidentielle System (USA).'],
        ['Das Staatsoberhaupt führt selbst die Regierung.', false, 'Auch das ist präsidentiell. In Deutschland führt die Kanzlerin oder der Kanzler die Regierung, nicht der Bundespräsident.'],
        ['Das Volk wählt den Regierungschef direkt, in einer eigenen Wahl neben der Parlamentswahl.', false, 'Die Kanzlerin oder den Kanzler wählt der Bundestag (Art. 63 GG).'] ] },
      { id: 'a3', f: 'Was meint »Gewaltenverschränkung« in Deutschland?', o: [
        ['Bundestag und Bundesrat sind ein gemeinsames Organ.', false, 'Sie sind zwei getrennte Organe. Der Bundesrat vertritt die Länder.'],
        ['Die Gerichte beschließen die Gesetze, das Parlament wendet sie im Einzelfall an.', false, 'Umgekehrt: Das Parlament beschließt Gesetze, die Gerichte wenden sie an und kontrollieren sie.'],
        ['Regierung und Mehrheit im Bundestag arbeiten eng zusammen.', true, 'Regierung und Parlamentsmehrheit wirken zusammen. Kontrolliert wird vor allem durch die Opposition – nicht mehr durch »das Parlament« als Ganzes.'],
        ['Jede Gewalt kann die anderen jederzeit auflösen.', false, 'Das gibt es nicht. Der Bundestag kann die Regierung nur über das konstruktive Misstrauensvotum abwählen.'] ] },
      { id: 'a4', f: 'Wie kann der Bundestag die Kanzlerin oder den Kanzler abwählen?', o: [
        ['Durch eine Volksabstimmung, die der Bundestag mit Mehrheit beantragen muss.', false, 'Eine solche Volksabstimmung kennt das Grundgesetz nicht.'],
        ['Durch einfachen Beschluss, danach wird neu gewählt.', false, 'Ein bloßes Nein reicht nicht – das war eine Schwäche der Weimarer Verfassung.'],
        ['Gar nicht – die Amtszeit dauert immer vier Jahre.', false, 'Die Abwahl ist möglich, aber an eine Bedingung geknüpft.'],
        ['Nur indem er zugleich einen Nachfolger wählt.', true, 'Das konstruktive Misstrauensvotum (Art. 67 GG) verhindert, dass eine Regierung gestürzt wird, ohne dass eine neue bereitsteht.'] ] },
      { id: 'a5', f: 'Was kennzeichnet eine Mischform (semipräsidentielles System) wie in Frankreich?', o: [
        ['Ein direkt gewählter Präsident und eine Regierung, die vom Parlament abhängt.', true, 'Beides zugleich: präsidentielle und parlamentarische Elemente. Haben Präsident und Parlamentsmehrheit verschiedene Lager, spricht man von »Cohabitation«.'],
        ['Ein Präsident ohne echte Macht und ein Parlament, das allein alle Entscheidungen trifft.', false, 'Das trifft eher auf das parlamentarische System zu (Bundespräsident mit wenig Macht).'],
        ['Ein Wechsel zwischen Demokratie und Diktatur je nach Lage.', false, 'Mit »Mischform« ist kein Wechsel der Staatsform gemeint, sondern eine Verbindung zweier Regierungssysteme.'],
        ['Volksabstimmungen ersetzen die Wahl des Parlaments.', false, 'Auch in Mischformen wird das Parlament gewählt.'] ] }
    ], merk: [
      '<strong>Alle Demokratien:</strong> Volkssouveränität, freie und gleiche Wahlen, Herrschaft auf Zeit, Grundrechte, Gewaltenteilung, Opposition und freie Presse.',
      '<strong>Direkt</strong> (das Volk entscheidet selbst) oder <strong>repräsentativ</strong> (Gewählte entscheiden). Deutschland: repräsentativ, auf Bundesebene fast ohne Volksentscheide.',
      '<strong>Parlamentarisch</strong> (Deutschland): Bundestag wählt und stürzt die Regierung (Art. 63, 67 GG) → Gewaltenverschränkung, Kontrolle durch die Opposition.',
      '<strong>Präsidentiell</strong> (USA): Präsident über Wahlleute gewählt, vom Kongress nicht abwählbar (nur Amtsenthebung) → strikte Gewaltentrennung.',
      '<strong>Mischform</strong> (Frankreich): direkt gewählter Präsident plus Regierung, die vom Parlament abhängt.'
    ] },
    { id: 'grundrechte', titel: 'Grundrechte und Rechtsstaat', quelle: 'Stunde zu den Grundrechten', fragen: [
      { id: 'b1', f: 'Wozu sind Grundrechte vor allem da?', o: [
        ['Sie verpflichten Bürgerinnen und Bürger zu bestimmtem Verhalten.', false, 'Grundrechte binden den Staat, nicht in erster Linie die Einzelnen (Art. 1 Abs. 3 GG).'],
        ['Sie schützen die Einzelnen vor Eingriffen des Staates.', true, 'Grundrechte sind vor allem Abwehrrechte: Der Staat darf nur unter Bedingungen eingreifen.'],
        ['Sie gelten nur, solange kein Notstand herrscht.', false, 'Gerade in der Krise müssen sie gelten. Ihr Wesensgehalt darf nie angetastet werden (Art. 19 Abs. 2 GG).'],
        ['Sie regeln, wie der Bundestag gewählt wird.', false, 'Das regeln Art. 38 GG und das Bundeswahlgesetz.'] ] },
      { id: 'b2', f: 'Was unterscheidet Menschenrechte von Bürgerrechten im Grundgesetz?', o: [
        ['Menschenrechte gelten für alle, Bürgerrechte nur für Deutsche.', true, 'Art. 8 GG beginnt mit »Alle Deutschen haben das Recht …«; die Meinungsfreiheit (Art. 5) gilt für »jeder«.'],
        ['Menschenrechte stehen nur in der UNO-Charta, Bürgerrechte dagegen nur im Grundgesetz.', false, 'Beide stehen im Grundgesetz; sie unterscheiden sich darin, wem sie zustehen.'],
        ['Bürgerrechte sind wichtiger und können nicht eingeschränkt werden.', false, 'Auch Bürgerrechte können durch Gesetz eingeschränkt werden.'],
        ['Es gibt keinen Unterschied, beide Begriffe meinen dasselbe.', false, 'Der Unterschied liegt im Kreis der Berechtigten.'] ] },
      { id: 'b3', f: 'In welcher Reihenfolge prüfst du, ob ein Eingriff verhältnismäßig ist?', o: [
        ['Erst das Urteil des Gerichts, dann die Meinung der Betroffenen.', false, 'Die Prüfung ist ein festes Schema, kein Meinungsbild.'],
        ['Mehrheit dafür? – Gesetz vorhanden? – Wirkung messbar?', false, 'Eine Mehrheit rechtfertigt keinen Eingriff in Grundrechte.'],
        ['Erforderlich – geeignet – legitimer Zweck – angemessen – Gesetz.', false, 'Die Schritte stimmen, die Reihenfolge nicht: Der Zweck kommt zuerst.'],
        ['Zweck – geeignet – erforderlich – angemessen.', true, 'Vorher prüfst du, ob es eine gesetzliche Grundlage gibt. Scheitert ein Schritt, ist der Eingriff unverhältnismäßig.'] ] },
      { id: 'b4', f: 'Was bedeutet »erforderlich«?', o: [
        ['Die Maßnahme ist im Gesetz ausdrücklich vorgeschrieben.', false, 'Das ist die gesetzliche Grundlage, nicht die Erforderlichkeit.'],
        ['Es gibt kein milderes Mittel, das genauso gut wirkt.', true, 'Gibt es einen sanfteren Weg zum selben Ziel, ist der Eingriff nicht erforderlich.'],
        ['Die Mehrheit der Betroffenen hält die Maßnahme für nötig.', false, 'Zustimmung ist kein Prüfschritt.'],
        ['Nutzen und Schaden stehen in einem vernünftigen Verhältnis.', false, 'Das ist die Angemessenheit (Zumutbarkeit), der letzte Schritt.'] ] },
      { id: 'b5', f: 'Du fühlst dich von einer Behörde in deinen Grundrechten verletzt. Was gilt?', o: [
        ['Du kannst sofort und nur beim Bundesverfassungsgericht klagen.', false, 'Zuerst geht es durch die Instanzen (Rechtsweg). Die Verfassungsbeschwerde ist der letzte Schritt.'],
        ['Dir steht der Rechtsweg zu den Gerichten offen.', true, 'Rechtsweggarantie, Art. 19 Abs. 4 GG: Verwaltungsgericht → Verwaltungsgerichtshof → Bundesverwaltungsgericht, zuletzt Verfassungsbeschwerde.'],
        ['Du musst den Bundestag um eine Entscheidung bitten.', false, 'Einzelfälle entscheiden unabhängige Gerichte (Art. 97 GG), nicht das Parlament.'],
        ['Gegen Behörden kann man nicht klagen.', false, 'Gerade dafür gibt es die Verwaltungsgerichte.'] ] }
    ], merk: [
      '<strong>Rechtsstaat:</strong> Bindung an Gesetz und Recht (Art. 20 Abs. 3), Grundrechte binden den Staat (Art. 1 Abs. 3), unabhängige Gerichte (Art. 97), Rechtsweggarantie (Art. 19 Abs. 4).',
      '<strong>Grundrechte</strong> sind Abwehrrechte. Menschenrechte gelten für alle, Bürgerrechte für Deutsche. Wesensgehalt (Art. 19 Abs. 2) und Ewigkeitsklausel (Art. 79 Abs. 3) schützen den Kern.',
      '<strong>Verhältnismäßigkeit:</strong> Gesetzliche Grundlage? → legitimer Zweck → geeignet → erforderlich (kein milderes Mittel) → angemessen.',
      '<strong>Weimar:</strong> Art. 48 WRV erlaubte es, Grundrechte per Notverordnung außer Kraft zu setzen (Reichstagsbrandverordnung, 28.02.1933).'
    ] },
    { id: 'parteien', titel: 'Parteien und Bundestagswahl', quelle: 'Modul 1, Stationen 1–5', fragen: [
      { id: 'c1', f: 'Was sagt Art. 21 GG über Parteien?', o: [
        ['Parteien wirken bei der Willensbildung des Volkes mit.', true, 'Dazu: Gründung ist frei, die innere Ordnung muss demokratisch sein, die Finanzen müssen offengelegt werden; verbieten kann nur das Bundesverfassungsgericht.'],
        ['Parteien bestimmen allein und verbindlich, was im Bundestag beschlossen wird.', false, 'Abgeordnete sind an Aufträge nicht gebunden (Art. 38 GG). Parteien »wirken mit«.'],
        ['Parteien dürfen nur mit Erlaubnis des Staates gegründet werden.', false, 'Die Gründung ist frei.'],
        ['Die Bundesregierung kann eine Partei verbieten.', false, 'Verbieten kann nur das Bundesverfassungsgericht, auf Antrag.'] ] },
      { id: 'c2', f: 'Flügel einer Partei einigen sich auf eine gemeinsame Forderung. Welche Funktion ist das?', o: [
        ['Rekrutierung', false, 'Rekrutierung heißt: Personal für Ämter auswählen.'],
        ['Kontrolle der Regierung', false, 'Kontrolle betrifft vor allem die Opposition gegenüber der Regierung.'],
        ['Aggregation', true, 'Interessenaggregation: Verschiedene Interessen werden gebündelt und gewichtet.'],
        ['Mobilisierung', false, 'Mobilisierung heißt: Menschen für die Partei gewinnen, etwa im Wahlkampf.'] ] },
      { id: 'c3', f: 'Was entscheidet die Zweitstimme?', o: [
        ['Wer den Wahlkreis gewinnt.', false, 'Das entscheidet die Erststimme – aber der Sieg zählt nur, wenn er durch Zweitstimmen gedeckt ist.'],
        ['Wie viele der 630 Sitze eine Partei bekommt.', true, 'Die Zweitstimme ist die wichtigere Stimme: Nach ihr werden die Sitze verteilt (Verfahren Sainte-Laguë).'],
        ['Wer Kanzlerin oder Kanzler wird.', false, 'Den Kanzler wählt der Bundestag (Art. 63 GG).'],
        ['Wie viele Abgeordnete ein Bundesland schickt.', false, 'Die Länder sind im Bundesrat vertreten; die Zweitstimme verteilt Sitze an Parteien.'] ] },
      { id: 'c4', f: 'Was gilt seit dem Wahlrecht 2025 für den Gewinn eines Wahlkreises?', o: [
        ['Wer im Wahlkreis die meisten Erststimmen hat, sitzt in jedem Fall im Bundestag.', false, 'Das galt früher (Überhangmandate). Seit 2025 nicht mehr.'],
        ['Der Sieg zählt nur, wenn Zweitstimmen ihn decken.', true, 'Zweitstimmendeckung: Gewinnt eine Partei mehr Wahlkreise, als ihr Sitze zustehen, gehen die knappsten Sieger leer aus. Der Bundestag bleibt bei 630 Sitzen.'],
        ['Wahlkreise gibt es seit 2025 nicht mehr.', false, 'Es gibt weiter 299 Wahlkreise und die Erststimme.'],
        ['Ein Wahlkreissieg zählt doppelt.', false, 'Das gibt es nicht.'] ] },
      { id: 'c5', f: 'Eine Partei hat 4,3 % der Zweitstimmen. Wann kommt sie trotzdem in den Bundestag?', o: [
        ['Nie – unter 5 % gibt es keine Sitze.', false, 'Es gibt eine Ausnahme: die Grundmandatsklausel.'],
        ['Wenn sie drei Wahlkreise gewinnt.', true, 'Grundmandatsklausel: Dann bekommt sie Sitze nach ihrem Zweitstimmenanteil. Das Bundesverfassungsgericht hat sie 2024 bestätigt. Ausnahme ohne Hürde: Parteien nationaler Minderheiten (SSW).'],
        ['Wenn eine andere Partei ihr Sitze abgibt.', false, 'Sitze lassen sich nicht übertragen.'],
        ['Wenn sie wenigstens in einem Bundesland über 5 % der Zweitstimmen liegt.', false, 'Die 5-%-Hürde gilt bundesweit.'] ] },
      { id: 'c6', f: 'Warum gibt es in Deutschland fast immer eine Koalition?', o: [
        ['Weil das Grundgesetz zwei Regierungsparteien vorschreibt.', false, 'Eine solche Vorschrift gibt es nicht.'],
        ['Weil die größte Partei nach der Verfassung immer mit der zweitgrößten regieren muss.', false, 'Wer koaliert, entscheiden die Parteien selbst.'],
        ['Weil der Bundespräsident die Partner auswählt.', false, 'Er schlägt die Kanzlerin oder den Kanzler vor – die Mehrheit bilden die Parteien.'],
        ['Weil selten eine Partei allein 316 Sitze hat.', true, 'Deshalb verhandeln Parteien über einen Koalitionsvertrag – mit Kompromissen, die Teile des eigenen Programms kosten.'] ] }
    ], merk: [
      '<strong>Art. 21 GG:</strong> Parteien wirken bei der Willensbildung mit; Gründung frei, innere Ordnung demokratisch, Finanzen offen; Verbot nur durch das Bundesverfassungsgericht.',
      '<strong>Funktionen</strong> (u. a.): Artikulation, Aggregation, Transmission, Partizipation, Mobilisierung, Legitimation, Herrschaft, Kontrolle, Rekrutierung.',
      '<strong>Wahlrecht 2025:</strong> 630 Sitze; Zweitstimme verteilt die Sitze; Erststimme nur mit Zweitstimmendeckung; 5-%-Hürde oder drei Wahlkreise; Mehrheit ab 316.',
      '<strong>Wahlverhalten 2025:</strong> Alter und Geschlecht machen Unterschiede – am stärksten zwischen jungen Frauen und jungen Männern (Political Gender Gap).'
    ] },
    { id: 'europa', titel: 'Europawahl', quelle: 'Station 6', fragen: [
      { id: 'd1', f: 'Wie viele der 720 Sitze im Europäischen Parlament kommen aus Deutschland?', o: [
        ['96', true, 'Das ist das Maximum, das ein Land haben darf (Art. 14 EUV).'],
        ['630', false, 'Das ist die Zahl der Sitze im Bundestag.'],
        ['720', false, 'Das ist das ganze Europäische Parlament.'],
        ['27', false, 'Das ist die Zahl der Mitgliedstaaten.'] ] },
      { id: 'd2', f: 'Welche Sperrklausel galt 2024 bei der Europawahl in Deutschland?', o: [
        ['5 %, wie im Bundestag.', false, 'Das Bundesverfassungsgericht kippte 2011 die 5-%-Hürde für die Europawahl.'],
        ['3 %.', false, 'Auch die 3-%-Hürde wurde 2014 vom Bundesverfassungsgericht gekippt.'],
        ['Keine.', true, 'Deshalb kamen 2024 schon Parteien mit 0,6 % zu einem Sitz – 15 Parteien insgesamt. Eine 2-%-Hürde ist in der EU beschlossen, aber noch nicht in Kraft.'],
        ['2 %.', false, 'Beschlossen (Direktwahlakt 2018), aber noch nicht in Kraft, weil nicht alle Mitgliedstaaten zugestimmt haben.'] ] },
      { id: 'd3', f: 'Malta hat 6 Sitze, obwohl ihm nach der Bevölkerung weniger als einer zustünde. Wie heißt das Prinzip?', o: [
        ['Gewaltenteilung', false, 'Gewaltenteilung betrifft die Trennung der Staatsgewalten, nicht die Sitzverteilung.'],
        ['Degressive Proportionalität', true, 'Kleine Länder bekommen mehr Sitze, als ihnen nach Köpfen zustünden, große weniger: mindestens 6, höchstens 96.'],
        ['Zweitstimmendeckung', false, 'Das ist eine Regel des Bundestagswahlrechts.'],
        ['Konstruktives Misstrauensvotum', false, 'Das betrifft die Abwahl der Kanzlerin oder des Kanzlers.'] ] },
      { id: 'd4', f: 'Wie sitzen die Abgeordneten im Europäischen Parlament zusammen?', o: [
        ['Nach Ländern: alle Deutschen in einem Block.', false, 'Sie sitzen nach politischer Richtung, nicht nach Herkunft.'],
        ['In Fraktionen nach politischer Richtung.', true, 'Zum Beispiel sitzen CDU und CSU in der EVP, die SPD bei den Sozialdemokraten (S&D).'],
        ['Nach dem Alphabet ihrer Namen.', false, 'Für die politische Arbeit zählen die Fraktionen.'],
        ['Getrennt nach Regierung und Opposition, so wie im Deutschen Bundestag.', false, 'Das EP trägt keine Regierung mit fester Mehrheit; Mehrheiten bilden sich je Abstimmung.'] ] }
    ], merk: [
      '<strong>Europawahl in Deutschland:</strong> alle 5 Jahre, ab 16, eine Stimme für eine Liste, 96 von 720 Sitzen, keine Sperrklausel (BVerfG 2011 und 2014).',
      '<strong>Degressive Proportionalität:</strong> mindestens 6, höchstens 96 Sitze je Land – kleine Länder haben mehr Gewicht pro Kopf.',
      '<strong>Das EP</strong> beschließt Gesetze und Haushalt mit dem Rat, wählt die Kommissionspräsidentin und kontrolliert die Kommission; Gesetzentwürfe bringt es nicht selbst ein.',
      '<strong>Fraktionen</strong> nach politischer Richtung (z. B. EVP, S&D, Renew, Grüne/EFA); Mehrheit der Mitglieder: 361.'
    ] }
  ];

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  PW.wdhKopf = function (box) {
    if (!box) return;
    var t = PW.el('textarea', { id: 'wdh-kopf', 'class': 'schreibfeld', rows: '5', placeholder: 'Begriffe, Artikel, Zahlen, Beispiele – alles, was dir einfällt' });
    t.value = PW.lies('wdh-kopf', '') || '';
    var z = PW.el('p', { 'class': 'klein', 'aria-live': 'polite' });
    function zaehle() { var n = (t.value.match(/\S+/g) || []).length; z.textContent = n ? n + ' Wörter. Gut – jetzt die vier Bereiche.' : 'Ohne Heft, etwa 5 Minuten.'; }
    t.addEventListener('input', function () { PW.merke('wdh-kopf', t.value); zaehle(); });
    box.appendChild(PW.el('label', { 'for': 'wdh-kopf', 'class': 'vh-label', text: 'Schreib auf, was du zu den vier Bereichen noch weißt:' }));
    box.appendChild(t); box.appendChild(z); zaehle();
  };

  PW.wdhBereich = function (box, bid) {
    var B = PW.wdhBereiche.filter(function (b) { return b.id === bid; })[0]; if (!box || !B) return;
    var st = PW.lies('wdh-' + bid, {}) || {};
    var liste = PW.el('ol', { 'class': 'wdh-fragen' });
    var merk = PW.el('div', { 'class': 'wdh-merk', hidden: 'hidden' });
    function fertig() { return B.fragen.every(function (q) { return st[q.id] !== undefined; }); }
    function zeigeMerk() {
      if (!fertig()) return;
      var nein = B.fragen.filter(function (q) { return !q.o[st[q.id]][1]; }).length;
      merk.hidden = false;
      merk.innerHTML = '<h3>Das musst du wissen</h3><ul>' + B.merk.map(function (m) { return '<li>' + m + '</li>'; }).join('') + '</ul>' +
        '<p class="klein">' + (nein ? 'Bei ' + (nein === 1 ? 'einer Frage' : nein + ' Fragen') + ' lagst du daneben – lies die Erklärung dort noch einmal.' : 'Alle Fragen passten im ersten Anlauf.') + ' Quelle im Unterricht: ' + esc(B.quelle) + '.</p>';
      var ende = document.getElementById('wdh-ende-liste'); if (ende && PW.wdhEnde) PW.wdhEnde(ende);
    }
    B.fragen.forEach(function (q, i) {
      var li = PW.el('li', { 'class': 'wdh-frage' });
      li.appendChild(PW.el('p', { 'class': 'wdh-f', text: q.f }));
      var g = PW.el('div', { 'class': 'wdh-optionen', role: 'radiogroup', 'aria-label': q.f });
      var r = PW.el('p', { 'class': 'wdh-rueck', 'aria-live': 'polite' });
      function rueck() {
        var w = st[q.id]; if (w === undefined) return;
        var o = q.o[w], richtig = q.o.filter(function (x) { return x[1]; })[0];
        r.className = 'wdh-rueck rueck ' + (o[1] ? 'rueck--gut' : 'rueck--nein');
        r.innerHTML = '<strong>' + (o[1] ? 'Passt.' : 'Passt nicht.') + '</strong> ' + esc(o[2]) + (o[1] ? '' : ' <br><strong>Passend wäre:</strong> ' + esc(richtig[0]) + ' – ' + esc(richtig[2]));
        g.querySelectorAll('input').forEach(function (x) { x.disabled = true; });
      }
      q.o.forEach(function (o, j) {
        var inp = PW.el('input', { type: 'radio', name: 'wdh-' + q.id, value: String(j), 'class': 'sr-only' });
        if (st[q.id] === j) inp.checked = true;
        inp.addEventListener('change', function () {
          if (st[q.id] !== undefined) return;
          st[q.id] = j; PW.merke('wdh-' + bid, st); rueck(); zeigeMerk();
          if (PW.notiere) PW.notiere(7, q.id, o[1], B.titel);
        });
        g.appendChild(PW.el('label', { 'class': 'wdh-option' }, [inp, PW.el('span', { text: o[0] })]));
      });
      li.appendChild(g); li.appendChild(r); liste.appendChild(li); rueck();
    });
    box.appendChild(liste); box.appendChild(merk); zeigeMerk();
  };

  PW.wdhEnde = function (box) {
    if (!box) return;
    box.textContent = '';
    var offen = [], nochmal = [], fertig = 0;
    PW.wdhBereiche.forEach(function (B) {
      var st = PW.lies('wdh-' + B.id, {}) || {}, n = 0;
      B.fragen.forEach(function (q) { if (st[q.id] === undefined) n++; else if (!q.o[st[q.id]][1]) nochmal.push({ b: B, q: q }); });
      if (n) offen.push(B.titel + ' (' + n + ' offen)'); else fertig++;
    });
    if (offen.length) box.appendChild(PW.el('p', { text: 'Noch nicht bearbeitet: ' + offen.join(' · ') + '.' }));
    if (nochmal.length) {
      box.appendChild(PW.el('p', { html: '<strong>Noch einmal ansehen:</strong>' }));
      var ul = PW.el('ul', { 'class': 'wdh-nochmal' });
      nochmal.forEach(function (x) { ul.appendChild(PW.el('li', {}, [PW.el('a', { href: '#b-' + x.b.id, text: x.q.f })])); });
      box.appendChild(ul);
    } else if (!offen.length) box.appendChild(PW.el('p', { 'class': 'rueck rueck--gut', html: '<strong>Alle vier Bereiche bearbeitet, alles passte.</strong> Jetzt die Probeklausur unter Zeitdruck.' }));
  };
})();
