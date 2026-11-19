/* Politik-Werkstatt · Detailprofile der Parteien · Stand 20.10.2026
   Alle Angaben stammen aus den Wahlprogrammen zur Bundestagswahl 2025.
   Aufbau für jede Partei gleich: drei Kernanliegen und sechs Politikfelder, jeweils mit wörtlichem Beleg und Seite der PDF-Datei.
   Wo ein Programm schweigt, steht »keine Aussage« – keine Deutung. Keine Wertung, keine Reihenfolge nach Sympathie. */
window.PW = window.PW || {};

PW.felder = [
  { id: 'wirtschaft', name: 'Wirtschaft und Arbeit' },
  { id: 'soziales', name: 'Soziales und Rente' },
  { id: 'klima', name: 'Klima und Energie' },
  { id: 'migration', name: 'Migration' },
  { id: 'europa', name: 'Europa' },
  { id: 'sicherheit', name: 'Sicherheit und Verteidigung' }
];

PW.profile = {
  cdu: {
    kern: [
      { titel: 'Politikwechsel nach drei »verlorenen Jahren«', zitat: 'Unser Land braucht Stabilität und Aufbruch. Unser Land braucht einen Politikwechsel!', s: 'S. 3' },
      { titel: 'Entlastung von Unternehmen', zitat: 'Wir senken die Unternehmenssteuerbelastung auf maximal 25 Prozent, schaffen den Rest-Soli ab und verbessern Abschreibungen und Verlustverrechnung.', s: 'S. 4' },
      { titel: 'Stopp der illegalen Migration', zitat: 'Wir setzen einen faktischen Aufnahmestopp sofort durch.', s: 'S. 42' }
    ],
    felder: {
      wirtschaft: { kurz: 'Steuern senken, Bürokratie abbauen, keine Vermögensteuer.', zitat: 'Keine Vermögensteuer. Wir wollen Menschen, die sich etwas erarbeitet und aufgebaut haben, nicht bestrafen.', s: 'S. 34' },
      soziales: { kurz: 'Rentenalter und Rentenhöhe bleiben, dazu private Vorsorge; politischer Mindestlohn abgelehnt.', zitat: 'An der bestehenden gesetzlichen Regelung zum Renteneintrittsalter halten wir fest. […] Keine Rentenkürzungen.', s: 'S. 34' },
      klima: { kurz: 'Klimaschutz marktwirtschaftlich, Strompreise senken, Kernenergie als Option.', zitat: 'Wir halten an der Option Kernenergie fest. […] Die Wiederaufnahme des Betriebs der zuletzt abgeschalteten Kernkraftwerke prüfen wir.', s: 'S. 4' },
      migration: { kurz: 'Zurückweisungen an der Grenze, Aufnahmestopp.', zitat: 'Dazu weisen wir diejenigen an den deutschen Grenzen zurück, die aus einem anderen Mitgliedstaat der EU oder dem Schengen-Raum nach Deutschland einreisen und bei uns einen Asylantrag stellen wollen.', s: 'S. 42–43' },
      europa: { kurz: 'Handlungsfähige EU, aber nur dort, wo sie einen Mehrwert schafft.', zitat: 'Mehr Europa nur dort, wo Europa einen Mehrwert für alle schafft.', s: 'S. 51' },
      sicherheit: { kurz: 'Wehrpflicht einführen, mindestens zwei Prozent für Verteidigung, Unterstützung der Ukraine.', zitat: 'Wir stehen zum Zwei-Prozent-Ziel – mindestens. Denn die NATO ist unsere Sicherheitsgarantie.', s: 'S. 8' }
    }
  },
  csu: {
    gemeinsam: 'cdu',
    kern: [
      { titel: 'Gemeinsames Programm mit der CDU', zitat: 'Politikwechsel für Deutschland. Wahlprogramm von CDU und CSU', s: 'S. 1' },
      { titel: 'Tritt nur in Bayern an', zitat: '', s: '' },
      { titel: 'Fraktionsgemeinschaft im Bundestag', zitat: '', s: '' }
    ],
    felder: null
  },
  spd: {
    kern: [
      { titel: 'Leben bezahlbar halten', zitat: 'Wir sorgen dafür, dass das Leben bezahlbar bleibt – mit einem höheren Mindestlohn, mit bezahlbaren Mieten und günstigen Lebensmitteln.', s: 'S. 5' },
      { titel: 'Stabile Rente', zitat: 'Wir sorgen dafür, dass das Niveau der gesetzlichen Rentenversicherung dauerhaft bei mindestens 48 Prozent gesichert wird.', s: 'S. 25' },
      { titel: 'Hohe Vermögen stärker besteuern', zitat: 'Die ausgesetzte Vermögensteuer wollen wir für sehr hohe Vermögen revitalisieren.', s: 'S. 19' }
    ],
    felder: {
      wirtschaft: { kurz: 'Investitionen in Industrie und Infrastruktur, höhere Steuern auf sehr große Vermögen.', zitat: 'Wir wollen die höchsten Vermögen in unserem Land bei der Finanzierung der Gemeinschaft stärker in die Verantwortung nehmen.', s: 'S. 17' },
      soziales: { kurz: 'Mindestlohn 15 Euro, Rentenniveau 48 Prozent, Mietpreisbremse unbefristet.', zitat: 'Dementsprechend muss der Mindestlohn spätestens ab 2026 bei 15 Euro liegen.', s: 'S. 23' },
      klima: { kurz: 'Modernisierung fortsetzen, günstiger Strom, kein Zurück zur Atomkraft.', zitat: 'Die Atomkraft in Deutschland ist stillgelegt und das ist gut so.', s: 'S. 53' },
      migration: { kurz: 'Gegen Pauschalzurückweisungen an den Binnengrenzen, für europäische Lösungen.', zitat: 'Grenzschließungen und Pauschalzurückweisungen an den Binnengrenzen widersprechen dem Geist eines gemeinsamen Raums der Freiheit, der Sicherheit und des Rechts.', s: 'S. 55' },
      europa: { kurz: 'Handlungsfähige, wertebasierte EU, vertiefter Binnenmarkt.', zitat: 'Wir stehen für eine handlungsfähige und wertebasierte EU.', s: 'S. 59' },
      sicherheit: { kurz: 'Mindestens zwei Prozent für Verteidigung, Wehrdienst auf freiwilliger Basis, Unterstützung der Ukraine ohne Eskalation.', zitat: 'Wir setzen uns daher auch zukünftig für eine nachhaltige Verteidigungsfinanzierung von mindestens zwei Prozent des BIP ein.', s: 'S. 57' }
    }
  },
  gruene: {
    kern: [
      { titel: 'Zukunftskraft in vier Richtungen', zitat: 'Es geht jetzt darum, diese Kraft als Zukunftskraft aufzunehmen: ökologisch und ökonomisch, solidarisch und europäisch.', s: 'S. 9' },
      { titel: 'Gerechteres Steuersystem', zitat: 'Wir haben gute Konzepte, die die Vermögensungleichheit effektiv reduzieren. Zu möglichen Ansätzen gehören: eine globale Milliardärssteuer, eine fairere Erbschaftssteuer […] und eine nationale Vermögenssteuer auf sehr hohe Vermögen.', s: 'S. 73' },
      { titel: 'Klimaschutz ohne Atomkraft', zitat: 'Eine Rückkehr zur Hochrisikotechnologie Atomkraft ist weder für das Erreichen der Klimaziele noch für die Versorgungssicherheit notwendig.', s: 'S. 43' }
    ],
    felder: {
      wirtschaft: { kurz: 'Investitionen in klimaneutrale Industrie, Reform der Erbschaftsteuer.', zitat: 'Deswegen fokussieren wir uns auf folgende Maßnahmen: eine Reform der Erbschaftssteuer hin zu einem Modell mit personenbezogenem Lebensfreibetrag, weitgehender Streichung bestehender Ausnahmen für außerordentlich große Erbschaften.', s: 'S. 73' },
      soziales: { kurz: 'Mindestlohn 15 Euro, Rentenniveau mindestens 48 Prozent, Mietpreisbremse verschärfen.', zitat: 'Daher werden wir das gesetzliche Rentenniveau bei mindestens 48 Prozent halten und nachhaltig stabilisieren.', s: 'S. 97' },
      klima: { kurz: 'Erneuerbare ausbauen, Tempolimit 130, keine Atomkraft.', zitat: 'Ein Sicherheitstempo von 130 km/h auf Autobahnen als generelles Tempolimit ist deshalb überfällig.', s: 'S. 48' },
      migration: { kurz: 'Gegen dauerhafte Binnengrenzkontrollen, für rechtsstaatliche Kontrollen an den Außengrenzen.', zitat: 'Dauerhafte stationäre Binnengrenzkontrollen lehnen wir deshalb ab. […] Daher sind rechtsstaatliche Kontrollen an den Außengrenzen und eine zuverlässige Registrierung der Menschen unabdingbar.', s: 'S. 132' },
      europa: { kurz: 'EU reformieren und handlungsfähiger machen.', zitat: 'Parallel werden wir die EU reformieren, um sie handlungsfähiger zu machen.', s: 'S. 143' },
      sicherheit: { kurz: 'Europäischer Pfeiler der NATO, freiwilliger Wehrdienst statt Wehrpflicht, Unterstützung der Ukraine.', zitat: 'Unsere Sicherheit ist eingebettet in der EU und der NATO. Wir stärken den europäischen Pfeiler der NATO.', s: 'S. 152' }
    }
  },
  fdp: {
    kern: [
      { titel: 'Leistung soll sich lohnen', zitat: 'Konkret fordern wir, dass sich der Spitzensteuersatz künftig an der aktuellen Beitragsbemessungsgrenze der Rentenversicherung orientiert.', s: 'S. 14' },
      { titel: 'Wettbewerbsfähige Unternehmenssteuern', zitat: 'Wir fordern die Absenkung der Unternehmenssteuerbelastung auf unter 25 Prozent.', s: 'S. 15' },
      { titel: 'Kapitalgedeckte Altersvorsorge', zitat: 'Eine echte individuelle Aktienrente sorgt sogar wieder für ein steigendes Rentenniveau.', s: 'S. 21' }
    ],
    felder: {
      wirtschaft: { kurz: 'Steuern und Bürokratie senken, keine Vermögensteuer.', zitat: 'Wir lehnen jede Form einer Vermögensteuer oder Vermögensabgabe ab.', s: 'S. 14' },
      soziales: { kurz: 'Aktienrente und private Vorsorge, keine politischen Eingriffe beim Mindestlohn, Mietpreisbremse auslaufen lassen.', zitat: 'Wir respektieren die Tarifautonomie und lehnen politische Eingriffe in die Arbeit der unabhängigen Mindestlohnkommission ab.', s: 'S. 18' },
      klima: { kurz: 'Technologieoffenheit, Emissionshandel, Kernkraft und Kernfusion ohne Subventionen.', zitat: 'Wir Freie Demokraten wollen die Nutzung klimafreundlicher Zukunftstechnologien wie Kernfusion und sicherer Kernkraftwerke ohne Subventionen ermöglichen.', s: 'S. 18' },
      migration: { kurz: 'Erprobung von Zurückweisungen an den Außengrenzen, Einwanderung nach Qualifikation.', zitat: 'Als Freie Demokraten unterstützen wir die modellhafte Erprobung von Zurückweisungen an den deutschen Außengrenzen.', s: 'S. 28' },
      europa: { kurz: 'EU durch Reformen stärken: kleinere Kommission, Initiativrecht des Parlaments, Mehrheitsentscheidungen.', zitat: 'Wir Freie Demokraten setzen uns insbesondere für eine Verkleinerung der Kommission, ein Initiativrecht des Europäischen Parlaments sowie qualifizierte Mehrheitsentscheidungen in der gemeinsamen EU-Außen- und Sicherheitspolitik ein.', s: 'S. 50' },
      sicherheit: { kurz: 'Keine Wehrpflicht, feste Bindung an NATO, Ukraine unterstützen.', zitat: 'Die Wiedereinsetzung der allgemeinen Wehrpflicht lehnen wir ab.', s: 'S. 48' }
    }
  },
  afd: {
    kern: [
      { titel: 'Mehr Netto vom Brutto', zitat: 'Mehr Netto vom Brutto schaffen wir durch: Senkung der Einkommensteuer durch einen deutlich höheren Grundfreibetrag.', s: 'S. 15' },
      { titel: 'Zurückweisung an der Grenze', zitat: '… um illegale Einreisen wirksam zu unterbinden und illegal einreisende Personen konsequent an der Grenze zurückweisen zu können.', s: 'S. 104' },
      { titel: '»Bund europäischer Nationen« statt EU', zitat: 'Daher streben wir einen ‚Bund europäischer Nationen‘ an, eine neu zu gründende europäische Wirtschafts- und Interessengemeinschaft, in der die Souveränität der Mitgliedstaaten gewahrt ist.', s: 'S. 140' }
    ],
    felder: {
      wirtschaft: { kurz: 'Einkommen- und Unternehmenssteuern senken, Vermögen- und Erbschaftsteuer abschaffen.', zitat: 'Die AfD will die derzeit zur Erhebung ausgesetzte Vermögensteuer sowie die Erbschaftssteuer abschaffen.', s: 'S. 61' },
      soziales: { kurz: 'Rentensystem umbauen, Mietpreisbremse ablehnen; keine Aussage zur Höhe des Mindestlohns.', zitat: 'Wir streben eine Rentenversicherung an, mit der Erwerbstätige sich wieder einen finanziell gesicherten Lebensabend erarbeiten können.', s: 'S. 18' },
      klima: { kurz: 'Wiedereinstieg in die Kernenergie, Ausbau von Kohlekraftwerken, kein Tempolimit.', zitat: 'Neben dem kurzfristig notwendigen Ausbau von Kohlekraftwerken planen wir den Wiedereinstieg in die Kernenergie.', s: 'S. 42' },
      migration: { kurz: 'Konsequente Zurückweisung an der Grenze.', zitat: '… um illegale Einreisen wirksam zu unterbinden und illegal einreisende Personen konsequent an der Grenze zurückweisen zu können.', s: 'S. 104' },
      europa: { kurz: 'EU durch einen Staatenbund souveräner Nationen ersetzen.', zitat: 'Der Übergang von der Europäischen Union in den Bund europäischer Nationen soll entschlossen und planvoll erfolgen.', s: 'S. 140' },
      sicherheit: { kurz: 'Wehrpflicht wieder einsetzen, NATO vorerst behalten, keine Osterweiterung, Ukraine neutral.', zitat: 'Eine Osterweiterung der EU und der NATO lehnen wir ab. […] Die Zukunft der Ukraine sehen wir als neutralen Staat außerhalb von NATO und EU.', s: 'S. 88 / S. 93' }
    }
  },
  linke: {
    kern: [
      { titel: 'Milliardärsteuer', zitat: 'Ab einer Milliarde Euro legen wir einen Sondersteuersatz von 12 Prozent fest: die Milliardärsteuer.', s: 'S. 10' },
      { titel: 'Höheres Rentenniveau', zitat: 'Wir wollen das Rentenniveau wieder auf 53 Prozent anheben und die Beitragsbemessungsgrenze verdoppeln.', s: 'S. 15' },
      { titel: 'Abrüstung statt Aufrüstung', zitat: 'Keine Stationierung von US-Mittelstreckenraketen in Deutschland und keine weitere Aufrüstung, sondern Abrüstung in Deutschland und Europa.', s: 'S. 23' }
    ],
    felder: {
      wirtschaft: { kurz: 'Vermögensteuer wieder einführen, Steuern für die Mehrheit senken, Gewerbesteuer zur Gemeindewirtschaftsteuer umbauen.', zitat: 'Die Linke fordert, dass die Vermögensteuer wieder eingeführt wird.', s: 'S. 10' },
      soziales: { kurz: 'Mindestlohn 15 Euro, Rentenniveau 53 Prozent, bundesweiter Mietendeckel.', zitat: 'Mit einem Mindestlohn von mindestens 15 Euro – spätestens ab 2026 16 Euro – … stellen wir sicher, dass sich Erwerbsarbeit lohnt.', s: 'S. 15' },
      klima: { kurz: 'Tempolimit 120, keine Rückkehr zur Atomkraft, Klimaschutz sozial abfedern.', zitat: 'Um Menschen und Klima zu schützen, brauchen wir endlich ein Tempolimit von 120 km/h auf Autobahnen und innerorts Tempo 30.', s: 'S. 37' },
      migration: { kurz: 'Zurückweisungen an Grenzen unzulässig, Schutzsuchende aufnehmen.', zitat: 'Systematische Binnengrenzkontrollen und Zurückweisungen von Schutzsuchenden an den Grenzen sind unzulässig.', s: 'S. 53' },
      europa: { kurz: 'Neue EU-Verträge ohne neoliberale Logik, EU-weite Volksentscheide.', zitat: 'Wir streben deshalb neue Verträge an, die die Logik des Neoliberalismus hinter sich lassen.', s: 'S. 24' },
      sicherheit: { kurz: 'Keine Wehrpflicht, Abrüstung, Verbot von Rüstungsexporten.', zitat: 'Wir wollen das Geschäft mit dem Krieg beenden und Rüstungsexporte vollständig verbieten.', s: 'S. 23' }
    }
  },
  bsw: {
    kern: [
      { titel: 'Mindestrente und höherer Mindestlohn', zitat: 'Wir fordern eine Mindestrente von 1500 Euro.', s: 'S. 22' },
      { titel: 'Keine höheren Militärausgaben', zitat: 'Wir lehnen höhere Militärausgaben ab, die Erfüllung des Zwei-Prozent-Zieles der NATO oder gar höhere Ausgaben.', s: 'S. 6' },
      { titel: 'Soziale Marktwirtschaft mit starkem Mittelstand', zitat: 'Das deutsche Erfolgsmodell muss eine soziale Marktwirtschaft sein, mit einem starken Mittelstand, starken Gewerkschaften und Arbeitnehmerrechten, sozialem Zusammenhalt, Gerechtigkeit statt Gier.', s: 'S. 3' }
    ],
    felder: {
      wirtschaft: { kurz: 'Energiepreise senken, Industrie halten, Emissionshandel in Frage stellen.', zitat: 'Der europäische Emissionshandel muss entweder globalisiert werden, oder Deutschland sollte auf EU-Ebene für seine Abschaffung werben.', s: 'S. 10' },
      soziales: { kurz: 'Mindestlohn 15 Euro, Mindestrente 1500 Euro, bundesweiter Mietendeckel.', zitat: 'Wir wollen den gesetzlichen Mindestlohn unverzüglich auf 15 Euro anheben.', s: 'S. 21' },
      klima: { kurz: 'Klimaschutz durch neue Technologien, kein Neubau von Atomkraftwerken.', zitat: 'Den Neubau konventioneller Atomkraftwerke lehnen wir ab. Dasselbe gilt derzeit für Mini-Kraftwerke (SMR).', s: 'S. 11' },
      migration: { kurz: 'Kein Aufenthaltsrecht bei Einreise aus einem sicheren Drittstaat; keine Aussage zu Zurückweisungen an der Grenze.', zitat: 'Wer aus einem sicheren Drittstaat einreist, hat kein Recht auf Aufenthalt.', s: 'S. 36' },
      europa: { kurz: 'Zusammenarbeit der Staaten, aber kein europäischer Bundesstaat.', zitat: 'Wir stehen für eine enge Zusammenarbeit der europäischen Staaten, aber nicht für eine immer tiefer gehende Integration in Richtung eines europäischen Bundesstaats.', s: 'S. 8' },
      sicherheit: { kurz: 'Keine Wehrpflicht, keine höheren Militärausgaben, Verhandlungen im Ukrainekrieg.', zitat: 'Wir lehnen die Wiedereinführung einer Wehrpflicht ab. […] Wir wollen unser Land friedenstüchtig machen.', s: 'S. 6' }
    }
  }
};
PW.profilHinweis = 'Alle Zitate stammen aus den Wahlprogrammen der Parteien zur Bundestagswahl 2025; die Seitenzahl bezeichnet die Seite der jeweiligen PDF-Datei (bei der AfD entspricht die gedruckte Seite der PDF-Seite minus 1). Die Auswahl der Felder ist für alle Parteien gleich. Wo ein Programm zu einem Punkt nichts sagt, steht »keine Aussage«.';
