/* Politik-Werkstatt · Daten · Stand 19.10.2026
   Jede Zahl hat eine Quelle (siehe QUELLEN unten). Unbekanntes ist null und wird als »noch offen« gezeigt. */
window.PW = window.PW || {};

PW.parteien = [
  { id: 'cdu',   name: 'CDU',   lang: 'Christlich Demokratische Union Deutschlands', farbe: '#1F1D1A', gruendung: '1945 (Bundespartei 1950)', vorsitz: 'Friedrich Merz (seit 31.01.2022)', btw: 22.6, sitze: 164, rolle: 'Regierung (Kanzlerpartei seit Mai 2025)', programm: 'Politikwechsel für Deutschland. Wahlprogramm von CDU und CSU', gemeinsam: 'cdu' },
  { id: 'csu',   name: 'CSU',   lang: 'Christlich-Soziale Union in Bayern', farbe: '#0C6DB3', gruendung: '1945', vorsitz: 'Markus Söder (seit 19.01.2019)', btw: 6.0, sitze: 44, rolle: 'Regierung; tritt nur in Bayern an, Fraktionsgemeinschaft mit der CDU', programm: 'Politikwechsel für Deutschland (gemeinsam mit der CDU)', gemeinsam: 'cdu' },
  { id: 'spd',   name: 'SPD',   lang: 'Sozialdemokratische Partei Deutschlands', farbe: '#C8102E', gruendung: '1863 (als ADAV; Name SPD seit 1890)', vorsitz: 'Lars Klingbeil, Bärbel Bas (seit 27.06.2025)', btw: 16.4, sitze: 120, rolle: 'Regierung (Koalitionspartner)', programm: 'Mehr für Dich. Besser für Deutschland. Regierungsprogramm der SPD' },
  { id: 'gruene', name: 'GRÜNE', lang: 'Bündnis 90/Die Grünen', farbe: '#2E7D32', gruendung: '1980 (Die Grünen; Vereinigung mit Bündnis 90: 1993)', vorsitz: 'Franziska Brantner, Felix Banaszak (seit 16.11.2024)', btw: 11.6, sitze: 85, rolle: 'Opposition', programm: 'Zusammen wachsen. Regierungsprogramm 2025' },
  { id: 'fdp',   name: 'FDP',   lang: 'Freie Demokratische Partei', farbe: '#E8C300', gruendung: '1948', vorsitz: 'Wolfgang Kubicki (seit 30.05.2026)', btw: 4.3, sitze: 0, rolle: 'nicht im Bundestag (unter 5 %)', programm: 'Alles lässt sich ändern. Wahlprogramm der FDP' },
  { id: 'afd',   name: 'AfD',   lang: 'Alternative für Deutschland', farbe: '#1A8FD6', gruendung: '2013', vorsitz: 'Alice Weidel, Tino Chrupalla (wiedergewählt 04.07.2026)', btw: 20.8, sitze: 152, rolle: 'Opposition (größte Oppositionsfraktion)', programm: 'Zeit für Deutschland. Programm der AfD für die Wahl zum 21. Deutschen Bundestag' },
  { id: 'linke', name: 'Die Linke', lang: 'Die Linke', farbe: '#B5176B', gruendung: '2007 (Zusammenschluss von Linkspartei.PDS und WASG am 16.06.2007; Vorgängerin PDS seit 1989/90)', vorsitz: 'Ines Schwerdtner, Luigi Pantisano (seit 20.06.2026)', btw: 8.8, sitze: 64, rolle: 'Opposition', programm: 'Alle wollen regieren, wir wollen verändern. Wahlprogramm der Linken (Langfassung)' },
  { id: 'bsw',   name: 'BSW',   lang: 'Bündnis Soziale Gerechtigkeit und Wirtschaftliche Vernunft (bis 30.09.2026: Bündnis Sahra Wagenknecht)', farbe: '#6B2D8B', gruendung: '2024 (08.01.2024)', vorsitz: 'Fabio De Masi, Amira Mohamed Ali (seit 06.12.2025)', btw: 4.98, sitze: 0, rolle: 'nicht im Bundestag (4,98 %, 9.529 Stimmen unter der Hürde)', programm: 'Unser Land verdient mehr. Wahlprogramm des BSW 2025' }
];
PW.sonstige = { name: 'Sonstige', farbe: '#9A948C' };
PW.sitzeGesamt = 630;
PW.mehrheit = 316;
PW.ssw = { name: 'SSW', sitze: 1, hinweis: 'Partei der dänischen Minderheit, von der 5-%-Hürde befreit' };

/* Einordnungen Dritter: nur mit Datum und Quelle. Gleiches Raster für alle Parteien. */
PW.einordnungen = {
  cdu: [{ text: 'Keine Beobachtung durch das Bundesamt für Verfassungsschutz.', stand: 'Stand 10/2026' }],
  csu: [{ text: 'Keine Beobachtung durch das Bundesamt für Verfassungsschutz.', stand: 'Stand 10/2026' }],
  spd: [{ text: 'Keine Beobachtung durch das Bundesamt für Verfassungsschutz.', stand: 'Stand 10/2026' }],
  gruene: [{ text: 'Keine Beobachtung durch das Bundesamt für Verfassungsschutz.', stand: 'Stand 10/2026' }],
  fdp: [{ text: 'Keine Beobachtung durch das Bundesamt für Verfassungsschutz.', stand: 'Stand 10/2026' }],
  linke: [{ text: 'Die Gesamtpartei wird vom Bundesamt für Verfassungsschutz nicht beobachtet. Zu einzelnen innerparteilichen Zusammenschlüssen: noch offen.', stand: 'Stand 10/2026' }],
  bsw: [{ text: 'Keine Beobachtung durch das Bundesamt für Verfassungsschutz.', stand: 'Stand 10/2026' }],
  afd: [
    { text: 'Bundesamt für Verfassungsschutz (BfV), 2. Mai 2025: Einstufung als »gesichert rechtsextremistische Bestrebung«. Das rund 1.100-seitige Gutachten stützt sich vor allem auf ein ethnisch-abstammungsmäßiges Volksverständnis (über 140 Seiten dazu) und auf Muslimfeindlichkeit; ausgewertet wurden Aussagen von 353 Personen, Programme und Websites. Nach Klage der AfD gab das BfV eine Stillhaltezusage ab.', stand: 'ZDFheute, 14.05.2025; Correctiv, 15.05.2025' },
    { text: 'Verwaltungsgericht Köln, 26. Februar 2026 (Eilverfahren): Das BfV darf die AfD bis zur Entscheidung in der Hauptsache nicht als »gesichert rechtsextremistisch« einstufen. Das Gericht sah den Verdacht verfassungsfeindlicher Bestrebungen bestätigt, die verfassungsfeindliche Gesamtausrichtung der Partei aber derzeit nicht als erwiesen. Die AfD bleibt Verdachtsfall; das BfV kann vor dem OVG Münster Beschwerde einlegen.', stand: 'ZDFheute, 26.02.2026' },
    { text: 'Correctiv, 10. Januar 2024 (»Geheimplan gegen Deutschland«): Recherche zu einem Treffen in Potsdam im November 2023, bei dem der Rechtsextremist Martin Sellner ein Konzept der »Remigration« vortrug; anwesend waren u. a. AfD-Politiker. Die Schilderung des Treffens und das Remigrationskonzept wurden vor Gericht nicht angegriffen; das Landgericht Hamburg wies im Dezember 2025 Klagen gegen die Berichterstattung ab (nicht rechtskräftig). Das Landgericht Berlin verlangte im März 2026 die Änderung zweier Sätze (nicht rechtskräftig).', stand: 'Correctiv, Einordnung vom 23.04.2026 (aktualisiert 15.06.2026)' },
    { text: 'Das BfV-Gutachten wertet nach rund 100 Zitaten den Begriff »Remigration«, wie ihn AfD-Vertreter verwenden, als systematische Abschiebung bestimmter Gruppen ohne Einzelfallprüfung. Das Sächsische Oberverwaltungsgericht entschied im Januar 2025, dass ein abstammungsbezogener Volksbegriff mit dem Volksbegriff des Grundgesetzes und der Menschenwürde unvereinbar ist.', stand: 'Correctiv, 15.05.2025; ZDFheute, 14.05.2025' }
  ]
};

/* Funktionen der Parteien (nach von Alemann u. a.; bpb) */
PW.aufgaben = [
  { id: 'formulierung', name: 'Politikformulierung', text: 'Entscheidungen müssen diskutiert und getroffen werden.' },
  { id: 'implementation', name: 'Politikimplementation', text: 'Getroffene Entscheidungen müssen umgesetzt werden.' },
  { id: 'kontrolle', name: 'Politikkontrolle', text: 'Der politische Prozess muss kontrolliert werden.' },
  { id: 'rekrutierung', name: 'Personalrekrutierung', text: 'Für die Ämter braucht es Personal.' }
];
PW.funktionen = [
  { id: 'artikulation', name: 'Interessenartikulation', aufgabe: 'formulierung', kurz: 'Wünsche und Bedürfnisse von Mitgliedern und Wählern ausdrücken.', beispiel: 'Eine Partei fordert in ihrem Programm einen höheren Mindestlohn.' },
  { id: 'aggregation', name: 'Interessenaggregation', aufgabe: 'formulierung', kurz: 'Verschiedene Interessen bündeln und gewichten.', beispiel: 'Flügel einer Partei einigen sich auf eine gemeinsame Linie; Koalitionspartner schließen einen Vertrag.' },
  { id: 'transmission', name: 'Interessentransmission', aufgabe: 'formulierung', kurz: 'Interessen direkt in Entscheidungen einbringen.', beispiel: 'Eine Regierungspartei setzt eine Forderung aus ihrem Programm als Gesetz um.' },
  { id: 'partizipation', name: 'Partizipation', aufgabe: 'formulierung', kurz: 'Bürgerinnen und Bürgern politisches Engagement ermöglichen.', beispiel: 'Mitglieder stimmen über ein Programm ab; ein Ortsverband lädt zum Bürgerdialog.' },
  { id: 'information', name: 'Informationsvermittlung', aufgabe: 'formulierung', kurz: 'Sachliche Informationen über Politik vermitteln.', beispiel: 'Eine Partei erklärt auf ihrer Website, wie ein Gesetz wirkt.' },
  { id: 'mobilisierung', name: 'Mobilisierung', aufgabe: 'formulierung', kurz: 'Bürgerinnen und Bürger für die Partei und ihre Ziele gewinnen.', beispiel: 'Wahlkampf mit Plakaten und Social-Media-Videos.' },
  { id: 'sozialisation', name: 'Sozialisation', aufgabe: 'formulierung', kurz: 'Menschen in politische Prozesse einführen und prägen.', beispiel: 'Neumitglieder lernen, wie Anträge und Parteitage funktionieren.' },
  { id: 'legitimation', name: 'Legitimation', aufgabe: 'formulierung', kurz: 'Unterstützung für das demokratische System schaffen.', beispiel: 'Parteien bringen Menschen dazu, Entscheidungen zu akzeptieren, auch wenn sie unterlegen sind.' },
  { id: 'herrschaft', name: 'Herrschaftsfunktion', aufgabe: 'formulierung', kurz: 'Verbindliche Entscheidungen treffen, also Herrschaft ausüben.', beispiel: 'Die Regierungsfraktionen beschließen ein Gesetz.' },
  { id: 'kontrolle', name: 'Kontrollfunktion', aufgabe: 'kontrolle', kurz: 'Regierung und Verwaltung kontrollieren, vor allem aus der Opposition.', beispiel: 'Kleine Anfragen, Untersuchungsausschuss.' },
  { id: 'rekrutierung', name: 'Rekrutierung', aufgabe: 'rekrutierung', kurz: 'Personal für Ämter und Mandate auswählen.', beispiel: 'Eine Partei nominiert ihre Kandidatin für das Direktmandat.' }
];
PW.beispiele = [
  { text: 'Die SPD fordert im Wahlprogramm 2025 einen Mindestlohn von 15 Euro, um die Interessen von Beschäftigten mit geringem Einkommen zu vertreten.', richtig: ['artikulation'], auch: ['information'], warum: 'Ein Interesse (höherer Lohn) wird ausgesprochen und in ein Programm geschrieben: Interessenartikulation.' },
  { text: 'In den Koalitionsverhandlungen 2025 einigen sich Union und SPD auf eine gemeinsame Linie beim Mindestlohn, obwohl ihre Programme unterschiedliche Wege vorsehen.', richtig: ['aggregation'], auch: ['transmission'], warum: 'Unterschiedliche Interessen werden gebündelt und gewichtet: Interessenaggregation. Weil daraus Regierungshandeln wird, passt auch Transmission.' },
  { text: 'Die Grünen setzen in einer Landesregierung ein Klimaschutzgesetz um, das sie zuvor auf einem Parteitag beschlossen hatten.', richtig: ['transmission', 'herrschaft'], auch: [], warum: 'Ein Parteibeschluss wird direkt zu einer verbindlichen Entscheidung: Interessentransmission und Herrschaftsfunktion.' },
  { text: 'Ein CDU-Kreisverband lädt zu offenen Bürgerdialogen ein; auch Nichtmitglieder dürfen Vorschläge für das Wahlprogramm einreichen.', richtig: ['partizipation'], auch: ['artikulation'], warum: 'Menschen erhalten einen Weg, sich politisch zu beteiligen: Partizipation.' },
  { text: 'Die AfD erreicht über TikTok und YouTube besonders viele junge Menschen und wirbt dort vor Wahlen um Stimmen.', richtig: ['mobilisierung'], auch: ['information'], warum: 'Die Partei will Menschen für sich gewinnen: Mobilisierung. Sachinformation kann dabei vorkommen, der Zweck ist aber die Stimme.' },
  { text: 'Die FDP bietet Neumitgliedern Einführungsabende an: Wie funktionieren Parteitage, Anträge und innerparteiliche Wahlen?', richtig: ['sozialisation'], auch: ['partizipation'], warum: 'Menschen werden in politische Verfahren eingeführt: Sozialisation.' },
  { text: 'Die CSU nominiert ihren Landesvorsitzenden als Kandidaten für das Amt des Ministerpräsidenten.', richtig: ['rekrutierung'], auch: [], warum: 'Personal für ein Amt wird ausgewählt: Rekrutierung.' },
  { text: 'Die Linke stellt im Bundestag Kleine Anfragen, um Entscheidungen der Bundesregierung offenzulegen und zu prüfen.', richtig: ['kontrolle'], auch: [], warum: 'Die Opposition kontrolliert die Regierung: Kontrollfunktion.' },
  { text: 'Eine Partei veröffentlicht nach der Wahl eine Erklärung: »Wir haben verloren. Wir erkennen das Ergebnis an und werden als Opposition arbeiten.«', richtig: ['legitimation'], auch: [], warum: 'Die Anerkennung des Ergebnisses stützt die Akzeptanz des Systems: Legitimation.' },
  { text: 'Das BSW schreibt in sein Programm, der Mindestlohn solle »unverzüglich auf 15 Euro« steigen, weil die bisherigen Erhöhungen »ein Hohn« seien.', richtig: ['artikulation'], auch: ['mobilisierung'], warum: 'Ein Interesse wird formuliert und zugespitzt: Interessenartikulation, mit werbendem Ton auch Mobilisierung.' },
  { text: 'Nach der Wahl stellt die CDU-Fraktion den Bundeskanzler und besetzt mit ihren Abgeordneten Ministerien und Ausschussvorsitze.', richtig: ['rekrutierung', 'herrschaft'], auch: [], warum: 'Ämter werden mit Parteipersonal besetzt (Rekrutierung), und von dort wird regiert (Herrschaftsfunktion).' },
  { text: 'Die Grünen erklären in einem Erklärvideo sachlich, wie die Zweitstimmendeckung im neuen Wahlrecht funktioniert.', richtig: ['information'], auch: ['sozialisation'], warum: 'Sachliche Aufklärung über ein Verfahren: Informationsvermittlung.' }
];

/* Entscheidungsfragen · Positionen wörtlich aus den Wahlprogrammen 2025 (Seitenzahl = Seite der PDF-Datei). */
PW.fragen = [
  { id: 'tempolimit', frage: 'Soll es ein generelles Tempolimit auf Autobahnen geben?', stufe: 1, kategorien: ['dafür', 'dagegen', 'keine Aussage'], pos: {
    cdu: ['dagegen', '»Anti-Auto-Haltung, Fahrverbote für Innenstädte, das Umwidmen von Parkplätzen und ein generelles Tempolimit auf deutschen Autobahnen lehnen wir ab.«', 'S. 74'],
    csu: ['dagegen', 'wie CDU (gemeinsames Programm)', 'S. 74'],
    spd: ['dafür', '»Wir wollen ein Tempolimit von 130 km/h auf Bundesautobahnen einführen.«', 'S. 36'],
    gruene: ['dafür', '»Ein Sicherheitstempo von 130 km/h auf Autobahnen als generelles Tempolimit ist deshalb überfällig.«', 'S. 48'],
    fdp: ['dagegen', '»Wir Freie Demokraten lehnen ein generelles Tempolimit auf Autobahnen ab.«', 'S. 41'],
    afd: ['dagegen', '»Die AfD lehnt ein generelles Tempolimit auf Bundesautobahnen strikt ab.«', 'S. 45'],
    linke: ['dafür', '»Um Menschen und Klima zu schützen, brauchen wir endlich ein Tempolimit von 120 km/h auf Autobahnen und innerorts Tempo 30 – außer auf Hauptverkehrsachsen.«', 'S. 37'],
    bsw: ['keine Aussage', 'Das Programm enthält keine Aussage zum Tempolimit.', '–'] } },
  { id: 'mindestlohn', frage: 'Soll der gesetzliche Mindestlohn per Gesetz auf 15 Euro steigen?', stufe: 1, kategorien: ['dafür', 'dagegen', 'keine Aussage'], pos: {
    cdu: ['dagegen', '»Lohnfindung muss weiterhin Sache der Sozialpartner sein und nicht der Politik. Einen politischen Mindestlohn lehnen wir ab.«', 'S. 32'],
    csu: ['dagegen', 'wie CDU (gemeinsames Programm)', 'S. 32'],
    spd: ['dafür', '»Dementsprechend muss der Mindestlohn spätestens ab 2026 bei 15 Euro liegen.«', 'S. 23'],
    gruene: ['dafür', '»… braucht es jetzt einen schrittweise steigenden Mindestlohn von zunächst 15 Euro in 2025 und das auch für unter 18-Jährige.«', 'S. 67'],
    fdp: ['dagegen', '»Wir respektieren die Tarifautonomie und lehnen politische Eingriffe in die Arbeit der unabhängigen Mindestlohnkommission ab.«', 'S. 18'],
    afd: ['keine Aussage', 'Das Programm nennt keine Höhe des Mindestlohns.', '–'],
    linke: ['dafür', '»Mit einem Mindestlohn von mindestens 15 Euro – spätestens ab 2026 16 Euro – sowie Steuerentlastungen für kleine Einkommen stellen wir sicher, dass sich Erwerbsarbeit lohnt.«', 'S. 15'],
    bsw: ['dafür', '»Wir wollen den gesetzlichen Mindestlohn unverzüglich auf 15 Euro anheben.«', 'S. 21'] } },
  { id: 'wahlalter', frage: 'Sollen 16-Jährige bei Bundestagswahlen wählen dürfen?', stufe: 1, kategorien: ['dafür', 'dagegen', 'keine Aussage'], pos: {
    cdu: ['keine Aussage', 'Das Programm enthält keine Aussage zum Wahlalter.', '–'],
    csu: ['keine Aussage', 'wie CDU (gemeinsames Programm)', '–'],
    spd: ['dafür', '»Ab 16 Jahren sollen junge Menschen mitentscheiden können, deswegen senken wir das aktive Wahlalter.«', 'S. 27'],
    gruene: ['dafür', '»Nach der Absenkung des Wahlalters für die Europawahlen wollen wir in einem nächsten Schritt, dass junge Menschen ab 16 Jahren auch bei Bundestagswahlen mitentscheiden dürfen.«', 'S. 85'],
    fdp: ['keine Aussage', 'Das Programm enthält keine Aussage zum Wahlalter bei Bundestagswahlen.', '–'],
    afd: ['dagegen', '»Quotierungen der Wählerschaft nach Geschlecht oder anderen Eigenschaften lehnen wir als Eingriffe in das Prinzip ‚Ein Mensch, eine Stimme‘ ab. Ebenso die Absenkung des Wahlalters unter 18 Jahre.«', 'S. 135'],
    linke: ['dafür', '»Das Wahlalter soll auf 16 Jahre abgesenkt werden …«', 'S. 17'],
    bsw: ['keine Aussage', 'Das Programm enthält keine Aussage zum Wahlalter.', '–'] } },
  { id: 'wehrpflicht', frage: 'Soll die Wehrpflicht wieder eingeführt werden?', stufe: 2, kategorien: ['dafür', 'dagegen', 'keine Aussage'], pos: {
    cdu: ['dafür', '»Wir führen eine aufwachsende Wehrpflicht ein. Das ist notwendig für Frieden und Sicherheit unseres Landes.«', 'S. 8'],
    csu: ['dafür', 'wie CDU (gemeinsames Programm)', 'S. 8'],
    spd: ['dagegen', '»Der neue Wehrdienst soll auf Freiwilligkeit basieren und sich dabei am Bedarf der Bundeswehr orientieren.«', 'S. 58'],
    gruene: ['dagegen', '»Statt den aus guten Gründen seit 2011 ausgesetzten allgemeinen Grundwehrdienst wieder einzuführen, wollen wir den freiwilligen Wehrdienst und die Reserve für eine breite Zielgruppe attraktiver machen …«', 'S. 154'],
    fdp: ['dagegen', '»Die Wiedereinsetzung der allgemeinen Wehrpflicht lehnen wir ab.«', 'S. 48'],
    afd: ['dafür', '»Daher wollen wir die Wehrpflicht wieder einsetzen. Diese beinhaltet gemäß aktueller Gesetzeslage auch den Ersatzdienst.«', 'S. 89'],
    linke: ['dagegen', '»Wir stellen uns gegen eine Militarisierung der Gesellschaft: keine Wiedereinführung der Wehrpflicht …«', 'S. 23'],
    bsw: ['keine Aussage', 'Das Programm enthält keine Aussage zur Wehrpflicht.', '–'] } },
  { id: 'miete', frage: 'Soll die Mietpreisbremse bleiben oder sogar verschärft werden?', stufe: 2, kategorien: ['dafür', 'dagegen', 'keine Aussage'], pos: {
    cdu: ['keine Aussage', '»Wir stehen für einen wirksamen und angemessenen Mieterschutz – dazu gehören auch die Regeln zur Miethöhe.« Die Mietpreisbremse wird nicht genannt.', 'S. 8'],
    csu: ['keine Aussage', 'wie CDU (gemeinsames Programm)', 'S. 8'],
    spd: ['dafür', '»Die Mietpreisbremse soll unbefristet und auch für Immobilien, die bis 2019 bezogen wurden, gelten …«', 'S. 21'],
    gruene: ['dafür', '»Wir werden die Mietpreisbremse verlängern und sie durch die Abschaffung von Ausnahmen verschärfen.«', 'S. 69'],
    fdp: ['dagegen', '»Die Mietpreisbremse ist nachweislich eine Investitionsbremse. Deshalb lassen wir sie auslaufen.«', 'S. 44'],
    afd: ['dagegen', '»Die AfD steht für ein ausgewogenes Mietrecht und lehnt staatliche Überregulierungen sowie Investitionshemmnisse wie die Mietpreisbremse oder den Mietendeckel ab.«', 'S. 39'],
    linke: ['dafür', 'Fordert mehr als die Bremse: »Deswegen wollen wir einen bundesweiten Mietendeckel durchsetzen.«', 'S. 4'],
    bsw: ['dafür', 'Fordert mehr als die Bremse: »Wir fordern einen bundesweiten Mietendeckel statt einer wirkungslosen Mietpreisbremse.«', 'S. 28'] } },
  { id: 'kernkraft', frage: 'Soll Deutschland zur Kernkraft zurückkehren?', stufe: 2, kategorien: ['dafür', 'dagegen', 'keine Aussage'], pos: {
    cdu: ['dafür', '»Wir halten an der Option Kernenergie fest. […] Die Wiederaufnahme des Betriebs der zuletzt abgeschalteten Kernkraftwerke prüfen wir.«', 'S. 4'],
    csu: ['dafür', 'wie CDU (gemeinsames Programm)', 'S. 4'],
    spd: ['dagegen', '»Die Atomkraft in Deutschland ist stillgelegt und das ist gut so.«', 'S. 53'],
    gruene: ['dagegen', '»Eine Rückkehr zur Hochrisikotechnologie Atomkraft ist weder für das Erreichen der Klimaziele noch für die Versorgungssicherheit notwendig und für uns […] keine Option.«', 'S. 43'],
    fdp: ['dafür', '»Wir Freie Demokraten wollen die Nutzung klimafreundlicher Zukunftstechnologien wie Kernfusion und sicherer Kernkraftwerke ohne Subventionen ermöglichen.«', 'S. 18'],
    afd: ['dafür', '»Neben dem kurzfristig notwendigen Ausbau von Kohlekraftwerken planen wir den Wiedereinstieg in die Kernenergie.«', 'S. 42'],
    linke: ['dagegen', '»Wir wollen uns dafür einsetzen, dass die positive Bewertung von Atomkraft und Gas in der sogenannten Taxonomie der EU gestrichen wird.«', 'S. 33'],
    bsw: ['dagegen', '»Den Neubau konventioneller Atomkraftwerke lehnen wir ab. Dasselbe gilt derzeit für Mini-Kraftwerke (SMR) …«', 'S. 11'] } },
  { id: 'grenze', frage: 'Sollen Asylsuchende an den deutschen Grenzen zurückgewiesen werden?', stufe: 3, kategorien: ['dafür', 'dagegen', 'keine Aussage'], pos: {
    cdu: ['dafür', '»Wir setzen einen faktischen Aufnahmestopp sofort durch. Dazu weisen wir diejenigen an den deutschen Grenzen zurück, die aus einem anderen Mitgliedstaat der EU oder dem Schengen-Raum nach Deutschland einreisen und bei uns einen Asylantrag stellen wollen.«', 'S. 42–43'],
    csu: ['dafür', 'wie CDU (gemeinsames Programm)', 'S. 42–43'],
    spd: ['dagegen', '»Grenzschließungen und Pauschalzurückweisungen an den Binnengrenzen widersprechen dem Geist eines gemeinsamen Raums der Freiheit, der Sicherheit und des Rechts.«', 'S. 55'],
    gruene: ['dagegen', '»Dauerhafte stationäre Binnengrenzkontrollen lehnen wir deshalb ab. […] Daher sind rechtsstaatliche Kontrollen an den Außengrenzen und eine zuverlässige Registrierung der Menschen unabdingbar.«', 'S. 132'],
    fdp: ['dafür', '»Als Freie Demokraten unterstützen wir die modellhafte Erprobung von Zurückweisungen an den deutschen Außengrenzen …«', 'S. 28'],
    afd: ['dafür', '»… um illegale Einreisen wirksam zu unterbinden und illegal einreisende Personen konsequent an der Grenze zurückweisen zu können.«', 'S. 104'],
    linke: ['dagegen', '»Systematische Binnengrenzkontrollen und Zurückweisungen von Schutzsuchenden an den Grenzen sind unzulässig.«', 'S. 53'],
    bsw: ['keine Aussage', 'Keine Aussage zu Zurückweisungen an der Grenze. Zum Aufenthalt: »Wer aus einem sicheren Drittstaat einreist, hat kein Recht auf Aufenthalt.«', 'S. 36'] } },
  { id: 'eu', frage: 'Soll die EU mehr oder weniger gemeinsam entscheiden?', stufe: 3, kategorien: ['mehr gemeinsam', 'weniger gemeinsam', 'keine Aussage'], pos: {
    cdu: ['mehr gemeinsam', '»Handlungsfähigkeit der Europäischen Union substanziell stärken. […] Mehr Europa nur dort, wo Europa einen Mehrwert für alle schafft.«', 'S. 51'],
    csu: ['mehr gemeinsam', 'wie CDU (gemeinsames Programm)', 'S. 51'],
    spd: ['mehr gemeinsam', '»Wir stehen für eine handlungsfähige und wertebasierte EU.« / »Wir wollen den Europäischen Binnenmarkt weiter vertiefen …«', 'S. 59 / S. 9'],
    gruene: ['mehr gemeinsam', '»Parallel werden wir die EU reformieren, um sie handlungsfähiger zu machen. Und wir müssen die europäische Demokratie mit ihrem klaren Wertefundament wehrhaft machen.«', 'S. 143'],
    fdp: ['mehr gemeinsam', '»Wir Freie Demokraten setzen uns insbesondere für eine Verkleinerung der Kommission, ein Initiativrecht des Europäischen Parlaments sowie qualifizierte Mehrheitsentscheidungen in der gemeinsamen EU-Außen- und Sicherheitspolitik ein.«', 'S. 50'],
    afd: ['weniger gemeinsam', '»Daher streben wir einen ‚Bund europäischer Nationen‘ an, eine neu zu gründende europäische Wirtschafts- und Interessengemeinschaft, in der die Souveränität der Mitgliedstaaten gewahrt ist … Der Übergang von der Europäischen Union in den Bund europäischer Nationen soll entschlossen und planvoll erfolgen.«', 'S. 140'],
    linke: ['mehr gemeinsam', '»Wir streben deshalb neue Verträge an, die die Logik des Neoliberalismus hinter sich lassen.« / »Wir wollen EU-weite Volksbegehren und Volksentscheide ermöglichen.«', 'S. 24'],
    bsw: ['weniger gemeinsam', '»Wir stehen für eine enge Zusammenarbeit der europäischen Staaten, aber nicht für eine immer tiefer gehende Integration in Richtung eines europäischen Bundesstaats.«', 'S. 8'] } }
];

/* Stimmzettel Wahlkreis 260 Böblingen, Bundestagswahl 23.02.2025 (Reihenfolge wie auf dem amtlichen Stimmzettel). */
PW.wahlkreis = {
  nummer: 260, name: 'Böblingen', wahlberechtigte: 243100, waehlende: 204946, beteiligung: 84.3,
  kandidierende: [
    { nr: 1, name: 'Marc Biadacz', partei: 'CDU', pid: 'cdu', erst: 37.3, hinweis: 'Direktmandat gewonnen' },
    { nr: 2, name: 'Jasmina Hostert', partei: 'SPD', pid: 'spd', erst: 16.8, hinweis: 'über Landesliste in den Bundestag' },
    { nr: 3, name: 'Tobias Bacherle', partei: 'GRÜNE', pid: 'gruene', erst: 13.5, hinweis: 'nicht mehr im Bundestag' },
    { nr: 4, name: 'Dr. Florian Toncar', partei: 'FDP', pid: 'fdp', erst: 6.1, hinweis: 'nicht mehr im Bundestag' },
    { nr: 5, name: 'Markus Frohnmaier', partei: 'AfD', pid: 'afd', erst: 17.1, hinweis: 'über Landesliste in den Bundestag' },
    { nr: 6, name: 'Thomas Walz', partei: 'Die Linke', pid: 'linke', erst: 4.9, hinweis: '' },
    { nr: 8, name: 'Dr. Norbert Volz', partei: 'FREIE WÄHLER', pid: 'fw', erst: 3.0, hinweis: '' },
    { nr: 11, name: 'Hasso Kraus', partei: 'Volt', pid: 'volt', erst: 0.9, hinweis: '' },
    { nr: 14, name: 'Johanna Jäckh-Vermeulen', partei: 'MLPD', pid: 'mlpd', erst: 0.1, hinweis: '' },
    { nr: 17, name: 'Friedhild Miller', partei: 'Einzelbewerberin', pid: 'eb', erst: 0.3, hinweis: '' }
  ],
  listen: [
    { nr: 1, pid: 'cdu', name: 'CDU', zweit: 33.2 }, { nr: 2, pid: 'spd', name: 'SPD', zweit: 14.4 }, { nr: 3, pid: 'gruene', name: 'GRÜNE', zweit: 13.9 },
    { nr: 4, pid: 'fdp', name: 'FDP', zweit: 7.0 }, { nr: 5, pid: 'afd', name: 'AfD', zweit: 17.5 }, { nr: 6, pid: 'linke', name: 'Die Linke', zweit: 6.0 },
    { nr: 7, pid: 'basis', name: 'dieBasis', zweit: 0.2 }, { nr: 8, pid: 'fw', name: 'FREIE WÄHLER', zweit: 1.5 }, { nr: 9, pid: 'tier', name: 'Tierschutzpartei', zweit: 0.7 },
    { nr: 10, pid: 'partei', name: 'Die PARTEI', zweit: 0.4 }, { nr: 11, pid: 'volt', name: 'Volt', zweit: 0.6 }, { nr: 12, pid: 'oedp', name: 'ÖDP', zweit: 0.2 },
    { nr: 13, pid: 'bc', name: 'Bündnis C', zweit: 0.2 }, { nr: 14, pid: 'mlpd', name: 'MLPD', zweit: 0.1 }, { nr: 15, pid: 'bd', name: 'BÜNDNIS DEUTSCHLAND', zweit: 0.1 }, { nr: 16, pid: 'bsw', name: 'BSW', zweit: 4.0 }
  ]
};

/* Ergebnisse zum Vergleich (Zweitstimmen in %). null = noch offen. */
PW.ergebnisse = {
  bund:      { titel: 'Deutschland', beteiligung: 82.5, werte: { cdu: 22.6, csu: 6.0, spd: 16.4, gruene: 11.6, fdp: 4.3, afd: 20.8, linke: 8.8, bsw: 4.98 } },
  wahlkreis: { titel: 'Wahlkreis 260 Böblingen', beteiligung: 84.3, werte: { cdu: 33.2, csu: null, spd: 14.4, gruene: 13.9, fdp: 7.0, afd: 17.5, linke: 6.0, bsw: 4.0 } },
  herrenberg:{ titel: 'Stadt Herrenberg', beteiligung: 85.5, werte: { cdu: 32.8, csu: null, spd: 14.7, gruene: 17.3, fdp: 6.7, afd: 15.4, linke: 6.3, bsw: 3.1 } },
  land:      { titel: 'Baden-Württemberg', beteiligung: 83.4, werte: { cdu: 31.6, csu: null, spd: 14.2, gruene: 13.6, fdp: 5.6, afd: 19.8, linke: 6.8, bsw: null } }
};
PW.herrenbergErst = { biadacz: 36.5, bacherle: 17.0 };

/* Repräsentative Wahlstatistik 2025 (Zweitstimmen in %) */
PW.alter = {
  gruppen: ['18–24', '25–34', '35–44', '45–59', '60–69', '70+'],
  werte: {
    'CDU/CSU': [13.0, 16.1, 22.7, 28.7, 31.6, 41.4],
    'AfD': [19.0, 20.8, 27.1, 25.7, 21.0, 11.5],
    'SPD': [11.3, 11.0, 11.2, 13.7, 19.5, 24.9],
    'Grüne': [11.8, 15.9, 14.4, 12.2, 11.0, 7.0],
    'Linke': [27.3, 17.6, 8.7, 5.9, 5.1, 4.5],
    'BSW': [5.7, 5.7, 5.6, 5.0, 4.9, 3.9],
    'FDP': [5.6, 5.2, 4.1, 4.0, 3.7, 4.5]
  }
};
PW.geschlecht1824 = {
  hinweis: 'Zweitstimmen der 18- bis 24-Jährigen in %; »Männer« schließt in der amtlichen Statistik auch »divers« und »ohne Angabe« ein.',
  werte: { 'Linke': [37.1, 17.6], 'AfD': [12.6, 25.2], 'CDU/CSU': [10.4, 15.5], 'Grüne': [12.5, 11.1], 'SPD': [11.4, 11.2], 'FDP': [3.8, 7.5] },
  spalten: ['Frauen', 'Männer']
};
PW.geschlechtAlle = { 'AfD': [16.7, 25.1], 'SPD': [17.9, 14.9], 'Linke': [10.2, 7.3], 'Grüne': [12.5, 10.7], 'CDU/CSU': [28.2, 28.9], 'FDP': [3.8, 4.8] };
PW.brexit = { gruppen: ['18–24', '25–34', '35–44', '45–54', '55–64', '65+'], verbleib: [73, 62, 52, 44, 43, 40], austritt: [27, 38, 48, 56, 57, 60], quelle: 'Lord Ashcroft Polls, Nachwahlbefragung am 23.06.2016, über 12.000 Befragte' };
PW.shell = [
  '50 Prozent der jungen Menschen bezeichnen sich als politisch interessiert (2002: 34 Prozent).',
  'Seit 2019 ist vor allem der Anteil männlicher Jugendlicher gestiegen, die sich als »eher rechts« oder »rechts« einordnen: jeder vierte (2019: weniger als jeder fünfte). Bei den weiblichen Jugendlichen sind es 11 Prozent, ohne Anstieg.',
  'Junge Frauen vertreten häufiger postmaterialistische Werte als junge Männer, etwa bei Feminismus oder Gendern.'
];
PW.weimar1932 = { datum: '31. Juli 1932', nsdap: 37.3, kpd: 14.3, hinweis: 'Reichstagswahl; NSDAP und KPD wollten die parlamentarische Republik abschaffen. Zusammen hatten sie mehr als die Hälfte der Stimmen: Keine demokratische Mehrheit war mehr möglich.' };

PW.quellen = [
  ['Bundeswahlleiterin, Ergebnisse Wahlkreis 260 Böblingen (endgültig)', 'https://www.bundeswahlleiterin.de/bundestagswahlen/2025/ergebnisse/bund-99/land-8/wahlkreis-260.html'],
  ['Bundeswahlleiterin, Ergebnis Deutschland (endgültig)', 'https://www.bundeswahlleiterin.de/bundestagswahlen/2025/ergebnisse/bund-99.html'],
  ['SWR, Ergebnis der Bundestagswahl 2025 für Herrenberg (Zweitstimmen, Wahlberechtigte 22.928, Wählende 19.612, gültig 19.532)', 'https://bundestagswahl-2025-bw.swr.de/public/ec/ergebnis-herrenberg.html'],
  ['Stadt Herrenberg, Ergebnisse der Bundestagswahl (26.02.2025)', 'https://www.herrenberg.de/de/Rathaus/Aktuelles-Presse/Stadtnachrichten/Nachricht?view=publish&item=article&id=6261'],
  ['Stuttgarter Zeitung, Die Wahl in Herrenberg (24.02.2025)', 'https://www.stuttgarter-zeitung.de/artikel/bundestagswahl-2025-herrenberg-wahlergebnis-baden-wuerttemberg-78860063.html'],
  ['Stuttgarter Zeitung, Wahlkreis Böblingen (24.02.2025)', 'https://www.stuttgarter-zeitung.de/artikel/bundestagswahl-2025-wahlkreis-boeblingen-wahlergebnis-baden-wuerttemberg-78866686.html'],
  ['Kandidierende: amtlicher Stimmzettel Wahlkreis 260 (Landratsamt Böblingen) und wen-waehlen.de', 'https://www.wen-waehlen.de/btw25/kandidaten/53852-norbert-volz.html'],
  ['Repräsentative Wahlstatistik 2025 (Bundeswahlleiterin/Destatis), Aufbereitung: PolitikCheck', 'https://www.politikcheck-deutschland.de/wer-waehlt-wen'],
  ['Konrad-Adenauer-Stiftung, Monitor: Wahlverhalten nach Alter und Geschlecht (2025)', 'https://www.kas.de/documents/252038/40211523/Wahlverhalten+nach+Alter+und+Geschlecht.pdf'],
  ['Shell Jugendstudie 2024 (Zusammenfassung)', 'https://kja.de/export/sites/kja/.content/.galleries/downloads/_service/shell-jugendstudie-2024-zusammenfassung.pdf'],
  ['ZDFheute, AfD-Gutachten des Verfassungsschutzes (14.05.2025)', 'https://www.zdfheute.de/politik/deutschland/afd-verfassungsschutz-gutachten-rechtsextremistisch-100.html'],
  ['ZDFheute, VG Köln zur AfD-Einstufung (26.02.2026)', 'https://www.zdfheute.de/politik/deutschland/afd-gericht-einstufung-rechtsextrem-100.html'],
  ['Correctiv, Was im AfD-Gutachten steht (15.05.2025)', 'https://correctiv.org/aktuelles/neue-rechte/2025/05/15/was-im-afd-gutachten-steht-und-was-nicht/'],
  ['Correctiv, Rechtliche Auseinandersetzungen um »Geheimplan gegen Deutschland« (23.04.2026)', 'https://correctiv.org/in-eigener-sache/2026/04/23/rechtliche-auseinandersetzungen-um-geheimplan-gegen-deutschland-eine-einordnung/'],
  ['Wahlprogramme 2025 von CDU/CSU, SPD, Bündnis 90/Die Grünen, FDP, AfD, Die Linke, BSW (PDF-Fassungen der Parteien; Seitenzahlen beziehen sich auf die PDF-Datei)', ''],
  ['Deutsches Historisches Museum, LeMO: Reichstagswahl Juli 1932', 'https://www.dhm.de/lemo/kapitel/weimarer-republik/'],
  ['Parteivorsitze: ZDFheute 30.05.2026 (FDP), 20.06.2026 (Linke), 04.07.2026 (AfD), 06.12.2025 (BSW); Bundestag, Datenhandbuch Kap. 5.7', ''],
  ['Lord Ashcroft Polls, How the United Kingdom voted on Thursday… and why (24.06.2016)', 'https://lordashcroftpolls.com/2016/06/how-the-united-kingdom-voted-and-why/']
];
