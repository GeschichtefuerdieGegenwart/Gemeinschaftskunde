/* GK-Labor · Wiederholung vor der Klassenarbeit (v16, Nachtrag 17.11.2026)
   Inhalt: Demokratie und Regierungssysteme (AB1, Repubblica Nova) · Grundrechte und Güterabwägung (DS 2) ·
   Parteien: Aufgaben und Funktionen (Stationen 1–2) · Bundestagswahl und Wahlentscheidung (Stationen 3–5) ·
   Europawahl (Station 6). Modul 2 gehört nicht dazu.
   Muster: Aus dem Kopf (freies Abrufen) → Einfachwahl mit Erklärung je Option (24 Fragen in fünf Bereichen) →
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
      { id: 'a6', f: 'Was unterscheidet direkte von indirekter (repräsentativer) Demokratie?', o: [
        ['Direkt: Das Volk entscheidet Sachfragen selbst. Indirekt: Gewählte entscheiden für das Volk.', true, 'Reine Formen sind selten. Die Schweiz ist repräsentativ mit starken direkten Elementen; in Deutschland gibt es Volks- und Bürgerentscheide vor allem in Ländern und Gemeinden.'],
        ['Direkt: Das Volk wählt den Präsidenten. Indirekt: Das Parlament wählt den Präsidenten für das Volk.', false, 'Das verwechselt Demokratieform und Regierungssystem. Direkte Demokratie heißt: Das Volk entscheidet Sachfragen selbst.'],
        ['Direkt: Es gibt gar keine Gesetze. Indirekt: Ein Parlament beschließt Gesetze für das ganze Volk.', false, 'Auch direkte Demokratien haben Gesetze – das Volk beschließt sie selbst.'],
        ['Direkt: Nur die Mehrheit hat Rechte. Indirekt: Auch Minderheiten werden durch Grundrechte geschützt.', false, 'Grundrechte und Minderheitenschutz gehören zu jeder Demokratie, ob direkt oder indirekt.'] ] },
      { id: 'a2', f: 'Woran erkennst du ein parlamentarisches Regierungssystem?', o: [
        ['Regierung und Parlament sind streng getrennt und unabhängig voneinander.', false, 'Das kennzeichnet das präsidentielle System (USA).'],
        ['Das Parlament wählt die Regierung und kann sie abwählen.', true, 'Genau: Deshalb arbeiten Regierung und Parlamentsmehrheit eng zusammen (Gewaltenverschränkung). Kontrolliert wird vor allem durch die Opposition.'],
        ['Das Staatsoberhaupt führt selbst die Regierung.', false, 'Auch das ist präsidentiell. In Deutschland führt die Kanzlerin oder der Kanzler die Regierung, nicht der Bundespräsident.'],
        ['Das Volk wählt den Regierungschef direkt, in einer eigenen Wahl neben der Parlamentswahl.', false, 'Die Kanzlerin oder den Kanzler wählt der Bundestag (Art. 63 GG).'] ] },
      { id: 'a4', f: 'Wie kann der Bundestag die Kanzlerin oder den Kanzler abwählen?', o: [
        ['Durch eine Volksabstimmung, die der Bundestag mit Mehrheit beantragen muss.', false, 'Eine solche Volksabstimmung kennt das Grundgesetz nicht.'],
        ['Durch einfachen Beschluss, danach wird neu gewählt.', false, 'Ein bloßes Nein reicht nicht – das war eine Schwäche der Weimarer Verfassung.'],
        ['Gar nicht – die Amtszeit dauert immer vier Jahre.', false, 'Die Abwahl ist möglich, aber an eine Bedingung geknüpft.'],
        ['Nur indem er zugleich einen Nachfolger wählt.', true, 'Das konstruktive Misstrauensvotum (Art. 67 GG) verhindert, dass eine Regierung gestürzt wird, ohne dass eine neue bereitsteht.'] ] },
      { id: 'a5', f: 'Was kennzeichnet eine Mischform (semipräsidentielles System) wie in Frankreich?', o: [
        ['Ein Präsident ohne echte Macht und ein Parlament, das allein alle Entscheidungen trifft.', false, 'Das trifft eher auf das parlamentarische System zu (Bundespräsident mit wenig Macht).'],
        ['Ein Wechsel zwischen Demokratie und Diktatur je nach Lage.', false, 'Mit »Mischform« ist kein Wechsel der Staatsform gemeint, sondern eine Verbindung zweier Regierungssysteme.'],
        ['Ein direkt gewählter Präsident und eine Regierung, die vom Parlament abhängt.', true, 'Beides zugleich: präsidentielle und parlamentarische Elemente. Haben Präsident und Parlamentsmehrheit verschiedene Lager, spricht man von »Cohabitation«.'],
        ['Volksabstimmungen ersetzen die Wahl des Parlaments.', false, 'Auch in Mischformen wird das Parlament gewählt.'] ] }
    ], merk: [
      '<strong>Alle Demokratien:</strong> Volkssouveränität, freie und gleiche Wahlen, Herrschaft auf Zeit, Grundrechte, Gewaltenteilung, Opposition und freie Presse.',
      '<strong>Direkt</strong> (das Volk entscheidet Sachfragen selbst) oder <strong>indirekt, repräsentativ</strong> (Gewählte entscheiden). Deutschland: repräsentativ, Volksentscheide vor allem in Ländern und Gemeinden.',
      '<strong>Parlamentarisch</strong> (Deutschland): Bundestag wählt und stürzt die Regierung (Art. 63, 67 GG) → Gewaltenverschränkung, Kontrolle durch die Opposition.',
      '<strong>Präsidentiell</strong> (USA): Präsident über Wahlleute gewählt, vom Kongress nicht abwählbar (nur Amtsenthebung) → strikte Gewaltentrennung.',
      '<strong>Mischform</strong> (Frankreich): direkt gewählter Präsident plus Regierung, die vom Parlament abhängt.'
    ] },
    { id: 'grundrechte', titel: 'Grundrechte und Güterabwägung', quelle: 'Stunde zu den Grundrechten', fragen: [
      { id: 'b1', f: 'Wozu sind Grundrechte vor allem da?', o: [
        ['Sie verpflichten Bürgerinnen und Bürger zu bestimmtem Verhalten.', false, 'Grundrechte binden den Staat, nicht in erster Linie die Einzelnen (Art. 1 Abs. 3 GG).'],
        ['Sie schützen die Einzelnen vor Eingriffen des Staates.', true, 'Grundrechte sind vor allem Abwehrrechte: Der Staat darf nur unter Bedingungen eingreifen.'],
        ['Sie gelten nur, solange kein Notstand herrscht.', false, 'Gerade in der Krise müssen sie gelten. Ihr Wesensgehalt darf nie angetastet werden (Art. 19 Abs. 2 GG).'],
        ['Sie regeln, wie der Bundestag gewählt wird.', false, 'Das regeln Art. 38 GG und das Bundeswahlgesetz.'] ] },
      { id: 'b3', f: 'In welcher Reihenfolge prüfst du, ob ein Eingriff verhältnismäßig ist?', o: [
        ['Erst das Urteil des Gerichts, dann die Meinung der Betroffenen.', false, 'Die Prüfung ist ein festes Schema, kein Meinungsbild.'],
        ['Mehrheit dafür? – Gesetz vorhanden? – Wirkung messbar?', false, 'Eine Mehrheit rechtfertigt keinen Eingriff in Grundrechte.'],
        ['Erforderlich – geeignet – legitimer Zweck – angemessen – Gesetz.', false, 'Die Schritte stimmen, die Reihenfolge nicht: Der Zweck kommt zuerst.'],
        ['Zweck – geeignet – erforderlich – angemessen.', true, 'Vorher prüfst du, ob es eine gesetzliche Grundlage gibt. Scheitert ein Schritt, ist der Eingriff unverhältnismäßig.'] ] },
      { id: 'g1', f: 'Was geschieht im letzten Schritt »angemessen«, der Güterabwägung?', o: [
        ['Man wiegt die Schwere des Eingriffs gegen das Gewicht des geschützten Guts ab.', true, 'Je schwerer der Eingriff in das Grundrecht, desto gewichtiger muss das Gut sein, das geschützt wird – etwa Leben, Gesundheit oder die Rechte anderer. Stoßen zwei Grundrechte zusammen, sollen beide so weit wie möglich gelten.'],
        ['Man prüft, ob es ein milderes Mittel gibt, das genauso gut wirkt.', false, 'Das ist der Schritt »erforderlich«. Er kommt vor der Güterabwägung.'],
        ['Man fragt, ob die Maßnahme ihr Ziel überhaupt fördern kann.', false, 'Das ist der Schritt »geeignet«.'],
        ['Man klärt, ob ein Gesetz die Maßnahme überhaupt erlaubt, und zwar ausdrücklich.', false, 'Das ist die gesetzliche Grundlage. Sie wird ganz am Anfang geprüft.'] ] },
      { id: 'g2', f: 'Ein Eingriff ist geeignet und erforderlich, aber in der Güterabwägung unangemessen. Was folgt daraus?', o: [
        ['Er ist erlaubt, weil er zwei der drei Prüfschritte besteht.', false, 'Alle Schritte müssen erfüllt sein. Scheitert einer, ist der Eingriff unverhältnismäßig.'],
        ['Er ist unverhältnismäßig und damit nicht erlaubt.', true, 'Die Prüfung ist eine Kette: Ein unangemessener Eingriff verletzt das Grundrecht – auch wenn er wirkt und es kein milderes Mittel gibt.'],
        ['Die Bevölkerung muss in einer Abstimmung über den Eingriff entscheiden.', false, 'Über Grundrechtseingriffe entscheiden im Streitfall unabhängige Gerichte, nicht Mehrheiten.'],
        ['Er bleibt erlaubt, wenn die Regierung ihn für dringend nötig hält.', false, 'Die Regierung ist an die Grundrechte gebunden (Art. 1 Abs. 3 GG). Ob ein Eingriff verhältnismäßig ist, prüfen Gerichte.'] ] },
      { id: 'b5', f: 'Du fühlst dich von einer Behörde in deinen Grundrechten verletzt. Was gilt?', o: [
        ['Du kannst sofort und nur beim Bundesverfassungsgericht klagen.', false, 'Zuerst geht es durch die Instanzen (Rechtsweg). Die Verfassungsbeschwerde ist der letzte Schritt.'],
        ['Du musst den Bundestag um eine Entscheidung bitten.', false, 'Einzelfälle entscheiden unabhängige Gerichte (Art. 97 GG), nicht das Parlament.'],
        ['Dir steht der Rechtsweg zu den Gerichten offen.', true, 'Rechtsweggarantie, Art. 19 Abs. 4 GG: Verwaltungsgericht → Verwaltungsgerichtshof → Bundesverwaltungsgericht, zuletzt Verfassungsbeschwerde.'],
        ['Gegen Behörden kann man nicht klagen.', false, 'Gerade dafür gibt es die Verwaltungsgerichte.'] ] }
    ], merk: [
      '<strong>Rechtsstaat:</strong> Bindung an Gesetz und Recht (Art. 20 Abs. 3), Grundrechte binden den Staat (Art. 1 Abs. 3), unabhängige Gerichte (Art. 97), Rechtsweggarantie (Art. 19 Abs. 4).',
      '<strong>Grundrechte</strong> sind Abwehrrechte. Menschenrechte gelten für alle (»Jeder …«, z. B. Art. 5), Bürgerrechte für Deutsche (»Alle Deutschen …«, z. B. Art. 8). Der Wesensgehalt bleibt immer geschützt (Art. 19 Abs. 2).',
      '<strong>Prüfschema:</strong> Schutzbereich → Eingriff → gesetzliche Grundlage → legitimer Zweck → geeignet → erforderlich (kein milderes, gleich wirksames Mittel) → angemessen.',
      '<strong>Güterabwägung</strong> (Schritt »angemessen«): Schwere des Eingriffs gegen das Gewicht des geschützten Guts. Stoßen zwei Grundrechte zusammen, sollen beide so weit wie möglich gelten. Am Ende steht ein Sachurteil.'
    ] },
    { id: 'parteien', titel: 'Parteien: Aufgaben und Funktionen', quelle: 'Modul 1, Stationen 1 und 2', fragen: [
      { id: 'c1', f: 'Was sagt Art. 21 GG über Parteien?', o: [
        ['Parteien wirken bei der Willensbildung des Volkes mit.', true, 'Dazu: Gründung ist frei, die innere Ordnung muss demokratisch sein, die Finanzen müssen offengelegt werden. Verbieten kann nur das Bundesverfassungsgericht.'],
        ['Parteien bestimmen allein und verbindlich, was im Bundestag beschlossen wird.', false, 'Abgeordnete sind an Aufträge nicht gebunden (Art. 38 GG). Parteien »wirken mit«.'],
        ['Parteien dürfen nur mit Erlaubnis des Staates gegründet werden.', false, 'Die Gründung ist frei.'],
        ['Die Bundesregierung kann eine Partei verbieten.', false, 'Verbieten kann nur das Bundesverfassungsgericht, auf Antrag (Art. 21 Abs. 4 GG).'] ] },
      { id: 'p1', f: 'Welche Liste nennt die vier Aufgaben der Politik?', o: [
        ['Interessenartikulation, Interessenaggregation, Interessentransmission und Partizipation', false, 'Das sind vier der elf Funktionen von Parteien. Sie tragen vor allem zur Politikformulierung bei.'],
        ['Gesetzgebung, vollziehende Gewalt, Rechtsprechung und dazu die Verwaltung', false, 'Das sind die Staatsgewalten der Gewaltenteilung, nicht die Aufgaben der Politik.'],
        ['Politikformulierung, Politikimplementation, Politikkontrolle, Personalrekrutierung', true, 'Diese vier Aufgaben muss jede Demokratie erledigen: entscheiden, umsetzen, kontrollieren, Personal finden. Parteien übernehmen dabei Funktionen.'],
        ['Wählen, abstimmen, demonstrieren und Petitionen an den Bundestag schreiben', false, 'Das sind Formen politischer Beteiligung der Bürgerinnen und Bürger.'] ] },
      { id: 'p2', f: 'Eine Oppositionsfraktion beantragt einen Untersuchungsausschuss. Welche Funktion erfüllt sie – und zu welcher Aufgabe gehört das?', o: [
        ['Herrschaftsfunktion – Aufgabe Politikformulierung', false, 'Herrschaft üben die Regierungsfraktionen aus, wenn sie verbindlich entscheiden. Die Opposition prüft.'],
        ['Rekrutierungsfunktion – Aufgabe Personalrekrutierung', false, 'Rekrutierung heißt: Personal für Ämter auswählen. Hier wird nicht gewählt, sondern geprüft.'],
        ['Legitimationsfunktion – Aufgabe Politikimplementation', false, 'Legitimation heißt: Unterstützung für das System schaffen, etwa indem man eine Niederlage anerkennt.'],
        ['Kontrollfunktion – Aufgabe Politikkontrolle', true, 'Die Opposition kontrolliert Regierung und Verwaltung – mit Anfragen und Untersuchungsausschüssen (Art. 44 GG).'] ] },
      { id: 'c2', f: 'Flügel einer Partei einigen sich auf eine gemeinsame Forderung. Welche Funktion ist das?', o: [
        ['Interessenaggregation', true, 'Verschiedene Interessen werden gebündelt und gewichtet. Dasselbe passiert, wenn Koalitionspartner einen Vertrag schließen.'],
        ['Rekrutierung', false, 'Rekrutierung heißt: Personal für Ämter auswählen.'],
        ['Kontrolle der Regierung', false, 'Kontrolle betrifft vor allem die Opposition gegenüber der Regierung.'],
        ['Mobilisierung', false, 'Mobilisierung heißt: Menschen für die Partei gewinnen, etwa im Wahlkampf.'] ] },
      { id: 'p3', f: 'Eine Partei wählt auf einem Parteitag ihre Liste für die Europawahl. Welche Funktion ist das?', o: [
        ['Interessenartikulation', false, 'Artikulation heißt: Interessen aussprechen, etwa im Programm. Hier geht es um Personen.'],
        ['Sozialisation', false, 'Sozialisation heißt: Menschen in politische Verfahren einführen.'],
        ['Informationsvermittlung', false, 'Information heißt: sachlich über Politik aufklären.'],
        ['Rekrutierung', true, 'Parteien wählen Personal für Mandate und Ämter aus – Aufgabe Personalrekrutierung. Bei der Europawahl wählst du in Deutschland Listen, keine einzelnen Personen.'] ] }
    ], merk: [
      '<strong>Art. 21 GG:</strong> Parteien wirken bei der Willensbildung mit; Gründung frei, innere Ordnung demokratisch, Finanzen offen. Verbieten kann nur das Bundesverfassungsgericht; der Verfassungsschutz beobachtet und stuft ein.',
      '<strong>Vier Aufgaben der Politik:</strong> Politikformulierung · Politikimplementation · Politikkontrolle · Personalrekrutierung.',
      '<strong>Elf Funktionen:</strong> Interessenartikulation (Forderung im Programm) · Interessenaggregation (Flügel oder Koalition einigen sich) · Interessentransmission (Programm wird Gesetz) · Partizipation · Informationsvermittlung · Mobilisierung · Sozialisation · Legitimation (Niederlage anerkennen) · Herrschaft (Gesetz beschließen) · Kontrolle (Anfrage der Opposition) · Rekrutierung (Kandidatin aufstellen).',
      '<strong>In der Klassenarbeit:</strong> Funktion nennen, an einem Beispiel erklären, der passenden Aufgabe zuordnen.'
    ] },
    { id: 'wahl', titel: 'Bundestagswahl und Wahlentscheidung', quelle: 'Modul 1, Stationen 3 bis 5', fragen: [
      { id: 'c3', f: 'Was entscheidet die Zweitstimme?', o: [
        ['Wer den Wahlkreis gewinnt.', false, 'Das entscheidet die Erststimme – seit 2025 aber nur, wenn Zweitstimmen den Sieg decken (Zweitstimmendeckung).'],
        ['Wie viele der 630 Sitze eine Partei bekommt.', true, 'Die Zweitstimme ist die wichtigere Stimme: Nach ihr werden die Sitze verteilt (Verfahren Sainte-Laguë/Schepers).'],
        ['Wer Kanzlerin oder Kanzler wird.', false, 'Den Kanzler wählt der Bundestag (Art. 63 GG).'],
        ['Wie viele Abgeordnete ein Bundesland schickt.', false, 'Die Länder sind im Bundesrat vertreten; die Zweitstimme verteilt Sitze an Parteien.'] ] },
      { id: 'c5', f: 'Eine Partei hat 4,3 % der Zweitstimmen. Wann kommt sie trotzdem in den Bundestag?', o: [
        ['Nie – unter 5 % gibt es keine Sitze.', false, 'Es gibt eine Ausnahme: die Grundmandatsklausel.'],
        ['Wenn eine andere Partei ihr Sitze abgibt.', false, 'Sitze lassen sich nicht übertragen.'],
        ['Wenn sie wenigstens in einem Bundesland über 5 % der Zweitstimmen liegt.', false, 'Die 5-%-Hürde gilt bundesweit.'],
        ['Wenn sie drei Wahlkreise gewinnt.', true, 'Grundmandatsklausel: Dann bekommt sie Sitze nach ihrem Zweitstimmenanteil. Das Bundesverfassungsgericht hat sie 2024 bestätigt. Ausnahme ohne Hürde: Parteien nationaler Minderheiten (SSW).'] ] },
      { id: 'w1', f: 'Welche Begründung erfüllt die Anforderungen an eine begründete Wahlentscheidung am besten?', o: [
        ['»Ich wähle Partei A, weil meine Familie sie schon immer wählt und wir damit über viele Jahre gute Erfahrungen gemacht haben.«', false, 'Gewohnheit und Parteibindung erklären, warum Menschen so wählen. Eine sachliche Begründung fehlt: Was will A, und warum ist dir das wichtig?'],
        ['»A, weil mir Thema X am wichtigsten ist und A dazu … fordert (Programm, S. …). Bei Y passt B besser – X wiegt für mich aber mehr.«', true, 'So geht es: Kriterium offenlegen, Position belegen, Gegenargument nennen und gewichten. Welche Partei du wählst, ist nicht entscheidend – die Begründung zählt.'],
        ['»Ich übernehme einfach das Ergebnis eines Online-Wahltests, denn der rechnet ganz objektiv aus, welche Partei am besten zu mir passt.«', false, 'Ein Wahltest zeigt Übereinstimmungen bei wenigen Thesen und gewichtet sie nicht so wie du. Er ersetzt deine eigene Abwägung nicht.'],
        ['»Ich wähle Partei A, weil sie in allen Umfragen klar vorn liegt und meine Stimme dann ganz sicher nicht verloren geht.«', false, 'Taktisch wählen kann ein Argument sein (5-%-Hürde, Koalitionen) – allein ist es keine Begründung. Was will A, und passt das zu deinen Kriterien?'] ] },
      { id: 'w2', f: 'Der Verfassungsschutz stuft eine Partei als Verdachtsfall ein. Was bedeutet das?', o: [
        ['Die Partei ist damit verboten und darf an keiner Wahl mehr teilnehmen.', false, 'Verbieten kann eine Partei nur das Bundesverfassungsgericht (Art. 21 Abs. 4 GG). Bis dahin bleibt sie zugelassen und wählbar.'],
        ['Ein Gericht hat bereits festgestellt, dass die Partei gesichert verfassungsfeindlich ist.', false, '»Verdachtsfall« ist die Stufe davor: Es gibt Anhaltspunkte, aber keine Gewissheit. Die Hochstufung der AfD zur »gesichert rechtsextremistischen Bestrebung« hat das Verwaltungsgericht Köln im Februar 2026 vorläufig gestoppt.'],
        ['Es gibt Anhaltspunkte für verfassungsfeindliche Ziele; sie darf beobachtet werden.', true, 'Der Verfassungsschutz darf die Partei beobachten, auch mit nachrichtendienstlichen Mitteln. Sie bleibt erlaubt und wählbar. Die AfD ist als rechtsextremistischer Verdachtsfall eingestuft; Gerichte haben das bestätigt (rechtskräftig seit 2025).'],
        ['Ihre Abgeordneten verlieren sofort ihre Sitze im Bundestag und in den Landtagen.', false, 'Mandate gehen durch eine Einstufung nicht verloren.'] ] }
    ], merk: [
      '<strong>Wahlrecht 2025:</strong> 630 Sitze; die Zweitstimme verteilt die Sitze; ein Wahlkreissieg zählt nur mit Zweitstimmendeckung; 5-%-Hürde oder drei Wahlkreise (Grundmandatsklausel); Mehrheit ab 316.',
      '<strong>Begründete Wahlentscheidung in fünf Schritten:</strong> Kriterien offenlegen (Themen, Werte) → Positionen belegen (Programm, Seite) → abwägen: Wo passt deine Partei nicht? → Folgen bedenken (5-%-Hürde, Koalition, Regierung oder Opposition) → Fazit, das aus der Abwägung folgt.',
      '<strong>Bewertet wird die Begründung, nicht die Partei.</strong> Alle zur Wahl zugelassenen Parteien sind wählbar.',
      '<strong>Wahlverhalten 2025:</strong> Alter und Geschlecht machen Unterschiede – am stärksten zwischen jungen Frauen und jungen Männern (Political Gender Gap).'
    ] },
    { id: 'europa', titel: 'Europawahl', quelle: 'Station 6', fragen: [
      { id: 'e1', f: 'Was gilt bei der Europawahl in Deutschland?', o: [
        ['Eine Stimme für eine Liste, wählen ab 16, alle fünf Jahre.', true, 'Dazu: 96 der 720 Sitze, verteilt nach Sainte-Laguë/Schepers. Die Wahlbeteiligung lag 2024 bei 64,7 % (Bundestagswahl 2025: 82,5 %).'],
        ['Zwei Stimmen wie bei der Bundestagswahl, wählen ab 18, alle vier Jahre.', false, 'Das sind die Regeln der Bundestagswahl.'],
        ['Das Volk wählt die Präsidentin oder den Präsidenten der Kommission direkt mit.', false, 'Die Kommissionspräsidentin wählt das Parlament – auf Vorschlag des Europäischen Rates (Art. 17 Abs. 7 EUV).'],
        ['96 Wahlkreise, in denen jeweils eine Person direkt gewählt wird.', false, 'Wahlkreise und Erststimmen gibt es nur bei der Bundestagswahl. Bei der Europawahl wählst du eine Bundes- oder Landesliste.'] ] },
      { id: 'd2', f: 'Welche Sperrklausel galt 2024 bei der Europawahl in Deutschland?', o: [
        ['5 %, wie im Bundestag.', false, 'Das Bundesverfassungsgericht kippte 2011 die 5-%-Hürde für die Europawahl.'],
        ['3 %.', false, 'Auch die 3-%-Hürde wurde 2014 vom Bundesverfassungsgericht gekippt.'],
        ['Keine.', true, 'Deshalb kamen 2024 schon Parteien mit 0,6 % zu einem Sitz – 15 Parteien insgesamt. Eine Hürde von mindestens 2 % ist in der EU beschlossen, aber noch nicht in Kraft.'],
        ['2 %.', false, 'Beschlossen (Direktwahlakt 2018), aber noch nicht in Kraft, weil nicht alle Mitgliedstaaten zugestimmt haben.'] ] },
      { id: 'd3', f: 'Deutschland hat 96 der 720 Sitze, Malta 6 – obwohl Malta nach der Bevölkerung weniger als einer zustünde. Wie heißt das Prinzip?', o: [
        ['Gewaltenteilung', false, 'Gewaltenteilung betrifft die Trennung der Staatsgewalten, nicht die Sitzverteilung.'],
        ['Degressive Proportionalität', true, 'Kleine Länder bekommen mehr Sitze, als ihnen nach Köpfen zustünden, große weniger: mindestens 6, höchstens 96 (Art. 14 Abs. 2 EUV).'],
        ['Zweitstimmendeckung', false, 'Das ist eine Regel des Bundestagswahlrechts.'],
        ['Konstruktives Misstrauensvotum', false, 'Das betrifft die Abwahl der Kanzlerin oder des Kanzlers.'] ] },
      { id: 'd4', f: 'Wie sitzen die Abgeordneten im Europäischen Parlament zusammen?', o: [
        ['Nach Ländern: alle Deutschen in einem Block.', false, 'Sie sitzen nach politischer Richtung, nicht nach Herkunft.'],
        ['Nach dem Alphabet ihrer Namen.', false, 'Für die politische Arbeit zählen die Fraktionen.'],
        ['Getrennt nach Regierung und Opposition, so wie im Deutschen Bundestag.', false, 'Das EP trägt keine Regierung mit fester Mehrheit; Mehrheiten bilden sich je Abstimmung.'],
        ['In Fraktionen nach politischer Richtung.', true, 'Zum Beispiel sitzen CDU und CSU in der EVP, die SPD bei den Sozialdemokraten (S&D). Für manche Wahlen braucht es die Mehrheit der Mitglieder: 361 von 720.'] ] },
      { id: 'e2', f: 'Was kann das Europäische Parlament – anders als der Bundestag – nicht?', o: [
        ['Gesetze beschließen', false, 'Doch: Im ordentlichen Gesetzgebungsverfahren entscheidet es gleichberechtigt mit dem Rat der EU.'],
        ['Den Haushalt der EU beschließen', false, 'Doch: Den jährlichen Haushalt beschließt es gemeinsam mit dem Rat.'],
        ['Eigene Gesetzentwürfe einbringen', true, 'Das Initiativrecht hat die Kommission. Das Parlament kann sie nur auffordern, einen Vorschlag zu machen (Art. 225 AEUV).'],
        ['Die Kommission kontrollieren und ihr das Misstrauen aussprechen', false, 'Doch: Es wählt die Kommissionspräsidentin, stimmt der Kommission zu und kann ihr mit Zweidrittelmehrheit das Misstrauen aussprechen.'] ] }
    ], merk: [
      '<strong>Europawahl in Deutschland:</strong> alle 5 Jahre, ab 16, eine Stimme für eine Liste, 96 von 720 Sitzen, keine Sperrklausel (BVerfG 2011 und 2014); eine EU-Hürde von mindestens 2 % ist beschlossen, aber noch nicht in Kraft.',
      '<strong>Degressive Proportionalität:</strong> mindestens 6, höchstens 96 Sitze je Land – kleine Länder haben mehr Gewicht pro Kopf.',
      '<strong>Das EP</strong> beschließt Gesetze und Haushalt gleichberechtigt mit dem Rat, wählt die Kommissionspräsidentin auf Vorschlag des Europäischen Rates und kontrolliert die Kommission. Eigene Gesetzentwürfe bringt es nicht ein.',
      '<strong>Fraktionen</strong> nach politischer Richtung (z. B. EVP, S&D, Renew, Grüne/EFA); Mehrheit der Mitglieder: 361.'
    ] }
  ];

  var ZAHLWORT = ['null', 'einen', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben'];
  function anzahl() { return ZAHLWORT[PW.wdhBereiche.length] || String(PW.wdhBereiche.length); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  PW.wdhKopf = function (box) {
    if (!box) return;
    var t = PW.el('textarea', { id: 'wdh-kopf', 'class': 'schreibfeld', rows: '5', placeholder: 'Begriffe, Artikel, Zahlen, Beispiele – alles, was dir einfällt' });
    t.value = PW.lies('wdh-kopf', '') || '';
    var z = PW.el('p', { 'class': 'klein', 'aria-live': 'polite' });
    function zaehle() { var n = (t.value.match(/\S+/g) || []).length; z.textContent = n ? n + ' Wörter. Gut – jetzt die ' + anzahl() + ' Bereiche.' : 'Ohne Heft, etwa 5 Minuten.'; }
    t.addEventListener('input', function () { PW.merke('wdh-kopf', t.value); zaehle(); });
    box.appendChild(PW.el('label', { 'for': 'wdh-kopf', 'class': 'vh-label', text: 'Schreib auf, was du zu den ' + anzahl() + ' Bereichen noch weißt:' }));
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
    } else if (!offen.length) box.appendChild(PW.el('p', { 'class': 'rueck rueck--gut', html: '<strong>Alle ' + anzahl() + ' Bereiche bearbeitet, alles passte.</strong> Jetzt die Probeklausur unter Zeitdruck.' }));
  };
})();
