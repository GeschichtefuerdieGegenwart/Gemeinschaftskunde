# Politik-Werkstatt · Einheit »Parteien und Wahlen« · Bericht

Stand 19.10.2026 · Route A »Der Stimmzettel« · statisch (HTML/CSS/JS), läuft über `file://` und GitHub Pages, keine Netzverbindung nötig.

## Idee und »live thing«

Auf dieser Seite wird der Stimmzettel – zwei Spalten, zwei Druckfarben (Schwarz für die Erststimme, Blau für die Zweitstimme), Kreis und Kreuz – zur Grundform jeder Aufgabe. Jede Auswahl ist ein Kreuz im Kreis; jedes Ergebnis ein Halbrund mit 630 Punkten. Das live thing ist der **Sitzrechner mit Schalter für die 5-%-Hürde** (Station 4): Bundesergebnis, Wahlkreis 260 oder Klassenergebnis laden, Hürde an/aus, Grundmandatsklausel, dann Koalitionsrechner (316 Sitze).

## Seiten

| Seite | Inhalt |
|---|---|
| `index.html` | Start, fünf Stationen, passt bei 1280 × 720 ohne Scrollen (Beamer) |
| `parteien-wahlen/station1.html` | Art. 21 GG mit Aufdecken, vier Aufgaben zuordnen, elf Funktionskarten, Selbsttest mit Begründungen |
| `parteien-wahlen/station2.html` | zwölf Beispiele, Mehrfachantworten möglich, Rückmeldung »Passt / Vertretbar / Eher nicht« mit Begründung |
| `parteien-wahlen/station3.html` | acht Kurzprofile (Stimmzettelreihenfolge) mit »Einordnungen Dritter« (gleiches Raster für alle), acht Streitfragen in drei Stufen; wörtliche Programmstellen mit PDF-Seite |
| `parteien-wahlen/station4.html` | Stimmzettel WK 260 (10 Kandidierende, 16 Listen), Sitzrechner (Sainte-Laguë/Schepers, 630 Sitze, 5 %, Grundmandatsklausel, SSW), Weimar-Karte, Koalitionsrechner, Realitätsabgleich |
| `parteien-wahlen/station5.html` | Vermuten → Repräsentative Wahlstatistik 2025 (Alter, Geschlecht), Forschung (KAS, Shell 2024), Brexit-Tabelle, Beurteilungsraster 5-%-Hürde |
| `zusammenfassung.html` | Druckfassung ≤ 2 Seiten A4 (`@media print`), Quellenliste |
| `vertiefung.html` | optional: Vertrauen (forsa 12/2025) und Mitglieder (Niedermayer 2025) |
| `lehrkraft.html` | Menti-Ergebnis eintragen (nur localStorage dieses Geräts), Beamer-Ansichten, Verlaufsplan A/B, Bildungsplanbezug, Datenschutz |
| `musterbuch.html` | Bewegungsmuster A–H zum Ausprobieren, Schalter »Weniger Bewegung«, Empfehlung |

Alle Daten liegen in `assets/js/daten.js` mit Quellenliste. Unbekannte Werte sind `null` und erscheinen als »noch offen« (BW: BSW; FDP-Mitgliederzahl). Herrenberg 2025 vollständig nach SWR-Wahlportal.

## Prüfkette (wirklich gelaufen)

1. **taste-skill `lint.mjs`** (Leonxlnx/taste-skill, geklont am 19.10.2026) über 11 Dateien: **0 FAIL, 3 WARN** (1-px-Linien in Legendenpunkten). Vier Ausnahmen mit Kommentar `taste-skill-ignore`: Fokus-Doppelring (WCAG 2.4.11) und versetzte Platte ohne Weichzeichner.
2. **taste-skill `inspect.mjs`** (App-Modus über `.taste-skill/direction.json`, echter Chromium, Breiten 1440/1280/1024/768/390): **alle 10 Seiten 0 FAIL**. Verbleibende WARN: `below-fold` (Lernseiten sind lang, gewollt), `panel-void` (gleich hohe Karten im Raster), `no-data-hue` (Sitzrechner vor dem Laden leer), `rainbow-chart` (Parteifarben, gewollt, immer mit Name und Zahl), `tabular` (Atkinson ohne tnum-Feature). Begründete Allowances: still-page, no-footage, few-pictures, focal-point, shadow, heavy-shadow, heavy-borders, app-title-size (Gründe in der Datei).
3. **Eigene Prüfung `tools/pruefen.py`** (Playwright/Chromium, file://): keine Konsolenfehler, kein waagerechtes Scrollen bei 1440/1280/1024/768/390, kein Text unter 16 px, keine Tippziele unter 44 px, keine H1 über zwei Zeilen; Startseite bei 1280 × 720: 720 px Seitenhöhe (kein Scrollen). Bildschirmfotos in `tools/fotos/`.
4. **Funktionstest** (Playwright): Klassenergebnis speichern → Sitzrechner lädt es → Hürde aus → Koalition 346 Sitze → Abgleich; Stimmzettel abgeben; Rückmeldungen Station 1, 2, 5; Musterbuch alle Knöpfe; »Eingaben löschen« leert `pw:*`.
5. **Sitzrechner gegen amtliches Ergebnis:** mit gerundeten Prozentwerten CDU 165 / SPD 119 statt 164 / 120 (alle anderen exakt). Auf der Seite ist der Grund genannt.
6. **Nicht gelaufen:** Impeccable `audit`/`polish` (Plugin in dieser Umgebung nicht installiert). Kontrastwerte wurden gerechnet (DESIGN.md), nicht mit axe geprüft. Kein Test mit echtem iPad/VoiceOver.

## Letzte Kritik (ehrlich, nach critique.md)

Design 30/40 (konsequent, aber karg; die Platte ist die einzige Tiefe), Usability 26/30 (große Ziele, Rückmeldung begründet, lange Seiten), Creativity 13/20 (Stimmzettel trägt, Halbrund ist Standard), Content 9/10 (echte Zahlen, Belege). **78/100.** Hauptschwäche: Station 3 ist sehr lang (8 Fragen × 8 Parteien); im Unterricht genügen pro Lernendem 3–4 Fragen, die Seite erlaubt das.

## Bewusst nicht eingebaut

- Parteilogos, Fotos, Übereinstimmungswert, Punkte oder Ampeln (Überwältigungsverbot, DESIGN.md).
- Server, Login, Tracking, externe Schriften. Klassenwahl läuft über Menti; die Seite rechnet nur.
- Muster G (In die Urne) ist eingebaut, aber entbehrlich; Entscheidung über Buchstaben steht aus.

## Offen / Freigabe nötig

- Buchstaben aus dem Musterbuch (Empfehlung A, B, C, D, E, F, H).
- Fachliche Durchsicht der Programmzitate (Seitenzahlen beziehen sich auf die PDF-Dateien; AfD: gedruckte Seite = PDF-Seite − 1) und der »Einordnungen Dritter«.
- Gerichtsstand zur AfD-Einstufung kann sich ändern (OVG Münster); Datum steht bei jedem Eintrag.

## Datenprüfung 19.10.2026 (zweiter Durchgang)
- Herrenberg (SWR-Wahlportal): SPD 14,7 · FDP 6,7 · Linke 6,3 % ergänzt; 22.928 Wahlberechtigte, 19.612 Wählende, 19.532 gültig, 85,5 %.
- Parteivorsitze nachgeprüft: Linke seit 20.06.2026 Ines Schwerdtner und Luigi Pantisano (van Aken nicht mehr angetreten) – korrigiert; AfD Weidel/Chrupalla am 04.07.2026 wiedergewählt; FDP Kubicki seit 30.05.2026; BSW De Masi/Mohamed Ali seit 06.12.2025; SPD Klingbeil/Bas seit 27.06.2025; Grüne Brantner/Banaszak seit 16.11.2024.
- Gründungsjahre mit Erläuterung: Linke 2007 (Zusammenschluss Linkspartei.PDS + WASG, 16.06.2007; PDS seit 1989/90), CDU 1945 (Bundespartei 1950), SPD 1863 (ADAV), Grüne 1980 (mit Bündnis 90 seit 1993), BSW 08.01.2024.
- Bundesergebnis gegen Bundeswahlleiterin geprüft: alle Prozentwerte, Sitze und BSW 4,98 % (2.472.947 Stimmen, 9.529 unter der Hürde) korrekt.
- Brexit-Tabelle korrigiert: jetzt Lord Ashcroft (6 Altersgruppen, 73/27 … 40/60) statt der Werte aus der alten Präsentation.

## v2 (19.10.2026): Dramaturgie, Fächer, Merkzettel, Reiter, Farbe

Umgesetzt nach `claude/04_Prompt_Website_v2.md`:
- **Prolog** auf der Startseite: drei wischbare Bilder (»Wozu Parteien?« → Art. 21 GG → vier Aufgaben), danach die fünf Stationen. Passt bei 1280 × 720 als erster Bildschirm (die Stationen liegen darunter, gewollt).
- **Fächer** (`assets/js/faecher.js`, Muster I): Scroll-Snap, Pfeile 48 px, Punkte, Stand »x / n«, Tastatur (Pfeile, Pos1/Ende), Randkarten 55 % Deckkraft; ohne JavaScript Liste. Eingesetzt für Prolog, Funktionskarten (St. 1), Beispiele (St. 2), Kurzprofile und Streitfragen (St. 3).
- **Merkzettel** (`assets/js/merkzettel.js`, Muster K): Knopf oben rechts auf jeder Seite, Seitenleiste 440 px als Split-Screen ab 1024 px, darunter Vollbild; Inhalt aus `daten.js` (Art. 21, vier Aufgaben, elf Funktionen mit Beispiel, acht Kurzprofile, Wahlrecht in fünf Zeilen, Urteilen); Escape schließt; Zustand im localStorage.
- **Station 3**: Selbsttest »Was ist dir wichtig?« (5 Fragen, nur Themen, keine Parteien, nichts wird gespeichert oder verrechnet) → drei empfohlene Streitfragen, alle acht im Fächer; Kurzprofile mit Parteifarbe als Kante und Marke, Kennzahlen groß; Einordnungen Dritter getrennt.
- **Station 4** als Reiter (Muster J): Stimmzettel · Sitzrechner · Koalition · Abgleich; Bundesergebnis 2025 vorgeladen; Adresse `#rechner` usw. bleibt verlinkbar.
- **PDF** `docs/Zusammenfassung_Parteien_und_Wahlen.pdf` (2 Seiten A4, aus `tools/pdf-vorlage.html` mit Chromium gedruckt): Seite 1 Art. 21, Aufgaben, Funktionen mit Beispiel; Seite 2 acht Kurzprofile, Wahlrecht 2025, Urteilen. Über den Merkzettel verlinkt.
- **Farbe**: Akzent `#A8411A` (Grund 5,36:1) für Grundfrage, Stationsnummern, Empfehlung; Kopfband je Station in getöntem Ton (warm, blau, grün, lila; Text ≥ 13:1); Parteifarben in Profilen stets mit Namen.

Prüfkette v2: taste-skill lint **0 FAIL, 0 WARN**; inspect (App-Modus, 1440/1280/1024/768/390) **alle 10 Seiten 0 FAIL** (neue begründete Allowances: edge-text, covered-text, palette-cream – Fächer-Randkarten und Stationston); eigene Prüfung: keine Konsolenfehler, kein waagerechtes Scrollen, kein Text < 16 px, keine Tippziele < 44 px; Funktionstest: Fächer, Selbsttest → Empfehlung, Reiter, Merkzettel (1280 und 390), Sitzrechner, Koalition. Nicht gelaufen: Impeccable audit/polish, Test auf echtem iPad.

## v3 (20.10.2026): Eröffnung, Differenzierung, Lernstand

Umgesetzt nach `claude/05_Prompt_Website_v3.md`:
- **Intro** (`assets/js/intro.js`, Muster L): 5,2 Sekunden in fünf Stufen – Stimmzettelzeilen ziehen ein, Kreuze setzen sich, acht Parteiplatten fliegen in zufälliger Reihenfolge ein und verblassen, 630 Sitzpunkte formieren sich **in der echten Sitzverteilung 2025** (Linke–SPD–Grüne–SSW–CDU–CSU–AfD), dann steht »Wozu gibt es Parteien?«. Keine Logos und keine Fotos: Marken- und Persönlichkeitsrechte, außerdem würde eine Bilderfolge einzelne Parteien hervorheben. Überspringbar per Knopf, Klick und Taste; einmal je Sitzung; bei »Weniger Bewegung« entfällt es ganz.
- **Zielmenü** (`ziele.html`): die vier Ziele wörtlich, mit Station, Link und – sobald bearbeitet – dem Stand je Ziel. Aus der Kopfnavigation jeder Seite erreichbar.
- **Station 1**: Markierfunktion im Art. 21 (zwei Marker, Prüfung mit begründeter Rückmeldung), Stufenschalter A/B/C (vorgegeben · selbst erklären mit lokaler Begriffsprüfung · eigenes Beispiel mit drei Kriterien), Selbsttest jetzt im Fächer.
- **Station 3**: Detailblatt je Partei (`assets/js/profile.js`) mit drei Kernanliegen und sechs Politikfeldern – Wirtschaft und Arbeit, Soziales und Rente, Klima und Energie, Migration, Europa, Sicherheit –, je mit wörtlichem Zitat und PDF-Seite, gleiches Raster für alle acht Parteien, Einordnungen Dritter weiterhin getrennt.
- **Station 4**: Kontrollfrage zur Wirkung der 5-%-Hürde (ohne Hürde kämen Union und SPD auf 297 statt 328 Sitze – im Rechner nachprüfbar).
- **Lernstand** (`assets/js/lernstand.js`, Muster N): zählt je Aufgabe nur den ersten Versuch, zeigt am Ende jeder Station einen Satz plus Empfehlung mit Fachbegriffen und Verweis auf den Merkzettel, Gesamtüberblick nach den vier Zielen auf `ziele.html`. Keine Noten, keine Punkte, keine Prozente, kein Vergleich; alles im localStorage, über »Eingaben löschen« entfernbar, nichts wird übertragen.

Neue Muster im Musterbuch: **L** Intro, **M** Markieren, **N** Lernstand, **O** Detailblatt.

Prüfkette v3: taste-skill lint **0 FAIL, 0 WARN**; inspect (App-Modus, 1440/1280/1024/768/390) **alle 11 Seiten 0 FAIL**; neue begründete Allowances: `rainbow-chart` (Parteifarben im Halbrund, immer mit Name und Zahl), `panel-void` (gleich hohe Fächerkarten), `covered-text` (Grundfrage vor dem abgedunkelten Halbrund). Eigene Prüfung: keine Konsolenfehler, kein waagerechtes Scrollen, kein Text < 16 px, keine Tippziele < 44 px, Startseite 938 px bei 1280 × 720 (Prolog und erste Stationen sichtbar, Rest darunter). Funktionstest: Intro inklusive Überspringen per Escape, Markieren mit Prüfung, Stufen A/B/C mit Freitext, Selbsttest-Fächer, Detailblatt mit Escape, Kontrollfrage Station 4, Lernstand je Station und Gesamtüberblick.

Grenzen, ehrlich benannt: Die Freitextprüfung erkennt Schlüsselbegriffe, nicht den Sinn – sie sagt das auf der Seite und überlässt das Urteil den Lernenden. Nicht gelaufen: Impeccable audit/polish (Plugin hier nicht installiert), Test auf einem echten iPad und mit VoiceOver.

## v4 (23.10.2026): Ruhigere Eröffnung, Ziele zuerst, Klassenwahl, Koalitionen

Umgesetzt nach `claude/06_Prompt_Website_v4.md`:
- **Intro verlangsamt:** rund 9,5 statt 5,2 Sekunden, fünf Stufen mit Standzeit (Zeilen 150 ms versetzt, Sitzpunkte über 1,7 s). Unverändert: nur transform/opacity, kein ease-in, überspringbar per Knopf, Klick und Taste, einmal je Sitzung, entfällt bei »Weniger Bewegung«.
- **Startseite:** Grundfrage, dann die vier Ziele als gestaltete Tafel, darunter »Einheit starten«. Die Stationskacheln sind entfallen; die Stationen erreicht man über die Fortschrittsleiste und die Navigation. `ziele.html` heißt jetzt »Mein Stand« und zeigt den Lernstand nach den vier Zielen.
- **Station 1:** kurze Einführung mit Verweis auf Merkzettel und PDF; die vier Aufgaben liegen jetzt im Fächer; der Lernstand erfasst zusätzlich die **Niveaustufe** (A/B/C, auch für freie Antworten, die niemand bewertet) und zeigt einen **Ring** mit Zahl, Stufenmarken und Empfehlung.
- **Station 3:** neue Reihenfolge in drei markierten Schritten – 1. Was ist dir wichtig? · 2. Was sagen die Parteien dazu? (Kurzprofile und Detailblätter) · 3. Kontrolle: Acht Streitfragen.
- **Station 4:** neuer Reiter **Klassenwahl** mit zwei Wegen – Urnen-Modus auf einem Gerät (Summen statt Datensätzen, Sperre gegen Doppelabgabe, »Auszählen und übernehmen« füllt Sitzrechner und Abgleich) und Einfüge-Import, der Text aus Menti, Moodle oder Strichliste erkennt (Stimmen wie Prozentwerte).
- **Koalitionen:** drei Kriterien – Mehrheit, inhaltliche Nähe (aus den acht Streitfragen, also aus den Programmen 2025 gerechnet; »keine Aussage« zählt weder als Einigkeit noch als Gegensatz) und belegte, datierte Aussagen (CDU-Parteitagsbeschluss 2018; Koalition aus Union und SPD seit Mai 2025; sonst ausdrücklich »keine belegte Aussage in dieser Sammlung«). Dazu fünf Aufgaben von AFB I bis III mit Satzbausteinen. Beispielbefund: Union und SPD stimmen in 1 von 6 vergleichbaren Streitfragen überein und regieren trotzdem zusammen – das ist der Diskussionsanker.
- **Lehrkraft-Modus:** drei Wege zur Klassenwahl, Anleitung zum Einbinden in Moodle (Link, Datei mit index.html, iframe) und eine ehrliche Erklärung, warum eine Live-Verbindung zu Menti in einer statischen Seite nicht möglich ist.

Neue Muster im Musterbuch: **P** Wahlurne, **Q** Koalitionsprüfung.

Prüfkette v4: taste-skill lint **0 FAIL**; inspect (App-Modus, 1440/1280/1024/768/390) **alle 11 Seiten 0 FAIL** (Rest-WARN: below-fold auf langen Lernseiten, tabular – Atkinson kennt kein tnum-Feature). Eigene Prüfung: keine Konsolenfehler, kein waagerechtes Scrollen, kein Text < 16 px, keine Tippziele < 44 px. Funktionstest: Intro-Takt, Zieltafel, Aufgaben-Fächer, Stufen mit Stufenerfassung, Lernstand-Ring, Station-3-Schritte, Urne (fünf Stimmen, Auszählen, Leeren), Einfüge-Import (Stimmen und Prozentwerte), Koalitionsprüfung mit CDU + SPD, Abgleich mit Klassenergebnis.

Grenzen, ehrlich benannt: Eine Live-Übernahme aus Menti ist ohne Server oder kostenpflichtige Schnittstelle nicht möglich; die Seite sagt das auf der Seite und im Lehrkraft-Modus. Das Wahlgeheimnis beim Urnen-Modus hängt am Verfahren im Raum, nicht an der Technik. Nicht gelaufen: Impeccable audit/polish (Plugin hier nicht installiert), Test auf einem echten iPad, Test der Moodle-Einbindung in einer echten Moodle-Instanz.

## v4.1 (23.10.2026): Wahllokal statt Knopfliste

Auf Wunsch der Lehrkraft ist der Urnen-Modus jetzt ein **Wahllokal am Lehrkraftgerät**: Das Gerät bleibt vorn, die Lernenden kommen einzeln nach vorn und kreuzen auf dem **amtlichen Stimmzettel des Wahlkreises 260** Erst- und Zweitstimme an (dieselbe Darstellung wie im Übungsreiter, mit den echten Kandidierenden und den 16 Landeslisten von 2025). »Stimmzettel einwerfen« lässt den Zettel nach unten wegsinken (Muster G), danach steht nur die Bestätigung; »Nächste Person« holt den leeren Zettel zurück.

- Gezählt werden **Erst- und Zweitstimmen getrennt**, als Summen je Kandidat und je Liste – keine Namen, keine Reihenfolge, keine Uhrzeit.
- »Auszählen und übernehmen« gibt beide Auszählungen aus, nennt das **Direktmandat der Klasse** im Vergleich mit dem echten Ergebnis 2025 (Marc Biadacz, CDU, 37,3 %) und schreibt die Zweitstimmen in Sitzrechner und Realitätsabgleich; Stimmen für die kleinen Listen zählen dort als »Sonstige«.
- Ein leerer Zettel wird abgewiesen – mit dem Hinweis, dass er in einer echten Wahl ungültig wäre.
- Der Knopf »Klassenergebnis« im Sitzrechner schaltet sich frei, sobald eine Klassenwahl vorliegt.
- Lehrkraft-Modus und Musterbuch (Muster P »Das Wahllokal«) sind entsprechend umgeschrieben; dort steht auch der Zeitbedarf: rund 15 Sekunden je Person, bei 19 Lernenden etwa 5 Minuten.

Prüfkette v4.1: taste-skill lint 0 FAIL/0 WARN; inspect der geänderten Seiten 0 FAIL; eigene Prüfung ohne Befund; Funktionstest mit sieben Stimmzetteln inklusive Kleinpartei, leerem Zettel, Auszählung, Übernahme in den Sitzrechner und Realitätsabgleich.

## v5 (27.10.2026): Angleichung an »Gemeinschaftskunde«, Übernahmen aus »Gegenwart«

**Was sich geändert hat** (Freigabe: alle Punkte A1–A3, B1–B7; Fraunces für Grundfrage, Streitfragen und Programmzitate – zusätzlich, weil es dieselbe Rolle ist, für die Leitfrage jeder Station):

| Nr | Änderung | Wo |
|---|---|---|
| A1 | Rückmeldung einheitlich »Passt.« / »Passt auch.« / »Passt nicht.«, Begründung und Beleg bleiben | Station 1, 2, 3, 4 (Hürdenfrage), 5 |
| A2 | Lernstand-Ring ohne Ziffer; alle Hexwerte aus den Skripten entfernt (Halbrund, Ring, Intro, Balken, Legende lesen Tokens) | `lernstand.js`, `werkstatt.js`, `intro.js`, `daten.js`, Station 4, Musterbuch |
| A3 | Fokus-Doppelring mit `--fokus-innen` je Ansicht, auch im Stimmzettel | `werkstatt.css` |
| B1 | Drei Ansichten Hell · Dunkel · Beamer, Schalter im Fuß neben »Weniger Bewegung«, Wiederherstellung vor dem ersten Zeichnen | alle Seiten, `werkstatt.css`, `werkstatt.js` |
| B2 | Fraunces kursiv als Stimme (lokal, OFL) | Grundfrage, Leitfragen, Streitfragen, Zitate |
| B3 | Muster R Aufbauen | Grundfrage nach dem Intro, Leitfrage je Station (einmal je Sitzung), erstes Zitat im Detailblatt, Musterbuch |
| B4 | Gestufte Hilfen Begriff → Hinweis → Lösungsweg, aus den vorhandenen Daten (Definitionen, Aufgabengruppe, Fundstelle, Programmstelle) | Station 1 (Aufgaben, Selbsttest), 2 (zwölf Beispiele), 3 (jede Partei je Streitfrage) |
| B5 | Muster S Ansichtswechsel (View Transitions) | Station 3 Profil → Detail; seitenübergreifend Wortmarke, Fortschritt, Stationsnummer |
| B6 | `--kuli` für Eigenes: Freitexte, eigene Streitfragen, Empfehlungsmarke, ●-Markierung; ▲ auf `--marker` | Station 1, 3, Lernstand |
| B7 | Zustände-Karten zu jedem Muster A–S | `musterbuch.html` |

**Kontraste** (gerechnet, nicht geschätzt; alle Paare in allen drei Ansichten): Text auf Grund 14,8 / 15,0 / 21,0; Leise auf Fläche 7,2 / 7,4 / 12,3; Blau auf Fläche 8,3 / 7,5 / 10,3; Akzent auf Fläche 6,1 / 5,7 / 9,4; kuli auf Fläche 7,4 / 7,5 / 10,2; alle Rückmeldungspaare ≥ 8,5; Stationstöne ≥ 7,3. Beamer: jedes Textpaar ≥ 7:1 (Mindestwert 8,5). Parteifarben als Grafik ≥ 3:1 auf Fläche in allen Ansichten, außer FDP-Gelb (1,7 hell / 2,0 Beamer) – deshalb tragen Sitzpunkte, Balken und Legendenpunkte eine Kante in `--text`.

**Prüfkette (wirklich gelaufen):** `tools/pruefen.py` bei 1440/1280/1024/768/390 – keine Konsolenfehler, kein waagerechtes Scrollen, kein Text unter 16 px, keine Tippziele unter 44 px, Start und »Mein Stand« bei 1280 × 720 ohne Scrollen. Dasselbe zusätzlich für Dunkel und Beamer bei 1280 und 390 auf allen elf Seiten (eigenes Skript, 0 Befunde). taste-skill `lint.mjs` auf CSS, JS und den geänderten Seiten: 0 FAIL, 1 WARN (das Wort »ease-in« im Kommentar »nie ease-in« in `motion.js`). Aufbauen gemessen: 10 Wörter, nach 250 ms 1 sichtbar, nach 2,85 s alle, `sr-only`-Kopie vollständig. Bildschirmfotos in Hell, Dunkel und Beamer angesehen (Start, Station 2–4, Musterbuch).

**Bewusst nicht übernommen:** Honig/Petrol und Überdruck (hätten hier keine Bedeutung), Autoplay (die Werkstatt sagt »nie Autoplay«), Wende, Schwärzung, Stempel, Zeitstrahl, Leinwände.

**Offen / Freigabe nötig:** Probe am echten Beamer (Beamer-Ansicht ist für helle Räume gerechnet, nicht am Gerät getestet); VoiceOver am iPad für Aufbauen (Kopie vorhanden, nicht gehört); seitenübergreifende View Transitions wirken nur auf GitHub Pages, nicht über `file://`; Impeccable `audit`/`polish` weiterhin nicht installiert.
