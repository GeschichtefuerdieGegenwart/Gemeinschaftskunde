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

## v6 (28.10.2026): Route Archivpapier, Film, sechs Bausteine – Pull Request, nicht zusammengeführt

**Freigabe im Chat (28.10.2026):** Film weiter verbessern · Route Archivpapier · alle sechs Elemente C1–C6.

| Was | Wo | Stand |
|---|---|---|
| Film T: Titelkarte und Aufgabenband auf der Leinwand, Überblenden, durchgehende »15 €«-Marke, Plakat mit Kreis und Kreuz, Stimmenzähler, Tempo-Schalter (Beamer), Leertaste, Klick auf die Bühne spielt die Szene | Station 1 | fertig |
| Route Archivpapier (Tokens, Kopfzeile, Platte im Stationston) | alle Seiten | fertig |
| U Schieber 1932 ↔ 2025 | Station 4, Sitzrechner | fertig |
| V Regler statt Fünf-Fragen-Test (Fragen bleiben als Einstellhilfe) | Station 3, Schritt 1 | fertig |
| W Wendekarten mit zwölf Begriffen, Stand unter »Mein Stand« | Zusammenfassung, Mein Stand | fertig |
| X Verortung auf zwei Achsen | Station 3, Schritt 3 | fertig – Beutelsbach: keine Quote, keine Empfehlung, »keine Aussage« getrennt |
| Y Zeitstrahl 1863–2025 (16 Ereignisse) | Station 3, Schritt 2 | fertig – Daten vor Einsatz prüfen |
| Z Sortieren mit der Hand | Station 2, vor dem Fächer | fertig – Papier gleichwertig, eingebaut auf Wunsch |
| Musterbuch T–Z mit Zustände-Karten | musterbuch.html | fertig |

**Daten, die du prüfen solltest, bevor es in den Unterricht geht:** Reichstag 1932 (NSDAP 230, SPD 133, KPD 89, Zentrum 75, DNVP 37, BVP 22, DVP 7, DStP 4, weitere 11 = 608) – die Kleinparteien sind zusammengefasst; die Zeitstrahl-Daten (ADAV 1863, Gotha 1875, Parteiengesetz 14.07.1933, CSU 10/1945, FDP 12/1948, GG 23.05.1949, SRP-Verbot 23.10.1952, KPD-Verbot 17.08.1956, Grüne 01/1980, PDS 1989/90, Bündnis 90/Grüne 05/1993, Linke 16.06.2007, AfD 02/2013, NPD-Urteil 17.01.2017, BSW 08.01.2024, Grundmandatsklausel 30.07.2024, Wahl 23.02.2025); die zwölf Begriffskarten (Wortlaut aus der Zusammenfassung).

**Prüfkette (wirklich gelaufen):** `tools/pruefen.py` bei 1440/1280/1024/768/390 auf allen elf Seiten: 0 Befunde (nach zwei Korrekturen: Nummern im Sortieren auf 16 px, Zeitstrahl-Marken auf 44 px Tippfläche). Zusätzlich Hell, Dunkel und Beamer bei 1280 und 390 auf allen elf Seiten (66 Läufe): keine Konsolenfehler, kein waagerechtes Scrollen, kein Text unter 16 px. taste-skill `lint.mjs` auf CSS, `bausteine.js`, `film.js` und den geänderten Seiten: 0 FAIL, 0 WARN. Funktionstest Film: Autoplay erreicht nach 7,5 s Szene 3, »Anhalten« stoppt, Pfeiltaste wechselt, Regler springt auf Szene 11, Ende blendet Vermutungsvergleich ein, `aria-label` nennt Szene und Satz. Funktionstest Bausteine per Skript: Sortieren (wählen → Hierhin), Zeitstrahl (Regler auf 1956 zeigt KPD-Verbot), Verortung (Punkt setzen → Festlegen → Parteien einblenden: SPD, Grüne, Linke oben rechts; CDU, CSU, FDP unten links; Rest als »keine Aussage«), Wendekarte dreht, Wichtigkeits-Regler ordnet. Kontraste der Route Archivpapier (hell): Text auf Grund 13,1 · Leise auf Fläche 6,4 · Blau 7,7 · Akzent 6,3 · kuli 7,0 · Stahl 4,4 (≥ 3) · alle Rückmeldungs- und Tonpaare ≥ 5,9; Dunkel und Beamer unverändert aus v5.

**Nicht gemacht / nur du:** echter Beamer, Finger am iPad (Ziehen bei U, X, Z; Regler bei V, Y), VoiceOver (Film-Satz, Verortung-Beschreibung), Moodle. Impeccable nicht installiert.

## v6.1 (30.10.2026): »Den Weg legen« in Station 1 – Pull Request, nicht zusammengeführt

**Auftrag:** »Bau den Weg, aber lass die alte Aufgabe mit der Zuordnung erstmal drin.«

- Neues Muster Ä in Station 1 nach dem Film: elf Begriffe auf den leeren Weg legen (Ziehen, Tippen, Tastatur), prüfen mit Erklärung je Verwechslung, danach einfärben nach den vier Aufgaben der Politik und ein Warum-Satz zur leeren Implementation. Stufen A/B/C. Spickzettel (Schaubild) erst nach dem ersten Prüfen. Lernstand: erster Versuch je Station und je Farbe.
- Neu im Repo: `assets/js/weg.js`, `assets/img/Funktionen_Weg_einer_Forderung.png` und `.svg`.
- Alte Zuordnung der vier Aufgaben (Abschnitt 2) unverändert.

**Prüfung (gelaufen):** `tools/pruefen.py` fünf Breiten, elf Seiten: 0 Befunde. Station 1 und Musterbuch in Hell/Dunkel/Beamer bei 1280, 768, 390: keine Fehler, kein waagerechtes Scrollen. taste-skill lint 0 FAIL / 0 WARN. Funktionstest per Skript bei 1280 und 390: zwei vertauschte Begriffe → »9 von 11«, Erklärung »Transmission ist erst der Schritt in die Entscheidung …«, »Falsche zurücklegen«, korrigiert → Einfärben freigeschaltet → 11 von 11 Farben.

**Nicht gelaufen:** Finger am echten iPad (Ziehen), VoiceOver.

**Zum Prüfen:** Der »Gedanke zum Vergleichen« nach dem Warum-Satz (Umsetzung vor allem durch Regierung und Verwaltung, Gegenposition Herrschaft/Transmission) ist meine Formulierung, keine Quelle.

## v7 (05.11.2026): Organizer, Urteil, Klausur, Caja – Pull Request, nicht zusammengeführt

**Auftrag:** Organizer für alle fünf Stationen (Startseite, Merkzettel) · Klausurtraining je Ziel mit Erwartungshorizont nach dem eigenen Text und Selbsteinschätzung · Urteilslinie mit anonymem Klassenbild vorher/nachher · Argumente-Waage · Caja als durchgehende Figur · Zeitstrahl in die Vertiefung und neu gestalten (Claude Design) · alte Zuordnung in Station 1 bleibt bis nach der Erprobung.

| Was | Wo | Stand |
|---|---|---|
| AA Organizer »Der Weg durch die Einheit« | Startseite, Merkzettel | fertig |
| AB Urteilslinie, Wahllokal und Klassenbild am Beamer | Startseite (vorher), Station 5 (nachher), Lehrkraft 1c | fertig |
| AC Argumente-Waage mit Sach- und Werturteil | Station 5, Abschnitt 4 | fertig – Belege prüfen |
| AD Klausurtraining, vier Aufgaben | klausurtraining.html, Navigation, Mein Stand, Station 5 | fertig – Erwartungshorizonte gegenlesen |
| Caja (statt Lena) | Film-Schaubild, weg.js, Stationen 1, 3, 4, 5; Produktionsmappe des Lernvideos | fertig |
| Y2 Zeitstrahl in Bahnen | Vertiefung (aus Station 3 entfernt) | fertig |
| Alte Zuordnung der vier Aufgaben | Station 1 | unverändert, wie gewünscht |

**Zum Prüfen vor dem Einsatz:** BVerfG-Urteil 30.07.2024 (Sperrklausel grundsätzlich gerechtfertigt, gilt bis zur Neuregelung mit Grundmandatsklausel); Europawahl-Urteile 09.11.2011 und 26.02.2014; »über 13 % ohne Sitz« (100 − Summe der sechs Parteien = 13,8 %, davon SSW abzuziehen); Erwartungshorizont Ziel 3 (»mit 0,02 Prozentpunkten mehr« beim BSW). Die Argumente »Klare Verantwortung« und »Neue Parteien haben es schwer« sind Formulierungen der Debatte, keine Zitate.

**Prüfkette (gelaufen):** `tools/pruefen.py` bei 1440/1280/1024/768/390 auf zwölf Seiten: 0 Befunde (nach einer Korrektur: Links im Organizer auf 44 px). Hell, Dunkel, Beamer bei 1280 und 390 auf sechs Seiten: keine Konsolenfehler, kein waagerechtes Scrollen. Browser-Test Wahllokal: 12 Stimmen vorher, 11 nachher, Summen und Paare stimmen. Taste-Lint nicht gelaufen (Skript nicht im Container).

**Nicht gelaufen:** echter Beamer, Finger am iPad (Linie, Waage, Zeitstrahl), VoiceOver.

## v8 (08.11.2026): nach der Erprobung

**Anlass:** Rückmeldung der Lernenden zur Stunde (Beobachtung im Arbeitsgedächtnis: »Nach der Stunde 2026-11-08«): sehr gut angekommen; verbessern: Film (Anleitung, Visualisierung), weniger Linien, beim Ziehen Zwischenstände prüfen, Falsche zurücklegen, Stand speichern. Dazu Ideen aus Hilde Digital (Papierprobe »Was bleibt ohne Gerät?«, hybrid mit festen Stellen im Plenum, Lernende und KI).

| Was | Wo |
|---|---|
| Zwischenstand ab fünf Karten, »Falsche zurücklegen«, passende bleiben fest, Stand gespeichert (Z2) | Station 2 Sortieren; dasselbe in Station 1 »Den Weg legen« |
| Anleitung vor dem Film, Startkarte, Caja als Figur, Weg-Band, keine gestrichelten Linien (T2) | Station 1 |
| »Eine Linie je Ebene«: innere Rahmen, Trennlinien und gestrichelte Kästen entfernt | alle Seiten (CSS) |
| Erst erinnern: drei Abruffragen ohne Gerät (AF) | Stationen 2–5 |
| Feste Stellen im Plenum (1d) | Lehrkraft |
| »Ohne KI, ohne Nachschlagen« | Klausurtraining |

**Gemessen:** Elemente mit sichtbarem Rand im Hauptbereich (bei 1280 px, ohne transparente Ränder): Station 1 231 → 156, Station 2 347 → 186, Station 3 646 → 426, Station 4 73 → 63, Station 5 127 → 116.

**Prüfkette (gelaufen):** `tools/pruefen.py` zwölf Seiten × fünf Breiten: 0 Befunde. Hell, Dunkel, Beamer ohne Fehler und ohne waagerechtes Scrollen. Browser-Tests: Sortieren (4 Karten gesperrt, 5 prüfbar, Falsche zurück, Stand nach Neuladen), Den Weg legen (dasselbe, fünf richtige nach Neuladen), Film (Startkarte, Szenen 1–7). **Nicht gelaufen:** iPad mit dem Finger, Beamer, VoiceOver.

**Offen:** Film als Storyboard mit Claude Design weiter ausbauen (die Animation ist jetzt klarer, aber im Stil gleich geblieben); Station »Behauptung prüfen« (laterales Lesen, Vorschlag aus dem Forschungsbericht); Abruf-Antworten fachlich gegenlesen.

## v9 (08.11.2026): Bewegung als Lernmittel – Pull Request, nicht zusammengeführt

**Auftrag:** zwei Stellen mit Bewegung, die einen Ablauf zeigt (Vorlage: Artifact »Motion-Entwürfe Politik und Galerie«, Teile A und B).

1. **AG Scroll-Fassung »Der Weg einer Forderung«** (neue Seite, verlinkt aus Station 1 unter dem Film und aus der Vertiefung): acht Stationen Wunsch · Partei · Koalition · Ministerium · Regierung · Bundestag · Bundesrat · Gesetz; Cajas Zettel »15 €« wandert auf der Bühne; je Station die Partei-Funktion aus dem Lernvideo; Vermutung davor, Modellgrenze und Vergleich danach. Das Lernvideo in Station 1 bleibt unverändert.
2. **AH Parteikarten** in der Vertiefung über dem Zeitstrahl: sieben Karten, Detail mit allen Ereignissen aus `daten.js` und den Sitzen 2025.

**Abweichung von der Vorlage:** Die Stationen folgen der Vorlage (acht Stationen, »Station 3 von 8: Koalition«), beginnen aber bei Cajas Wunsch statt bei einem Verband; die Kurztexte und »Anlass«-Sätze der Vorlage für den Zeitstrahl sind nicht übernommen, weil sie ohne Quelle waren – die Karten nutzen nur `PW.zeitBahnen` und `PW.zeitEreignisse`.

**Prüfkette (gelaufen):** `tools/pruefen.py` dreizehn Seiten × fünf Breiten: 0 Befunde. Hell, Dunkel, Beamer: keine Fehler. Maus, Tastatur (Sprung per Enter, Escape schließt, Fokus zurück auf die Karte), Touch-Emulation iPad (gen 7), Beamer 1280 × 720 (Bühne 496 px hoch), »weniger Bewegung« (Marke ohne Übergang, Abschnitte ohne Animation, Detail sofort). **Nicht gelaufen:** echtes iPad, echter Beamer, VoiceOver.

**Zum Prüfen:** Texte der acht Stationen (Art. 76–78, 82 GG); die Zuordnung der Partei-Funktionen je Station ist eine didaktische Zuordnung, keine Quelle.

## v10 (08.11.2026): Klassenwahl sichern und wieder laden – Pull Request

**Anlass:** Das Ergebnis der Klassenwahl war nach der Stunde weg (nur ein Bildschirmfoto blieb). Eine Stimme schien »verloren«: Sie ging an eine kleine Partei des Stimmzettels und zählte im Sitzrechner als »Sonstige« ohne Sitz, obwohl sie mit 1 von 15 Stimmen über 5 % lag.

**Umgesetzt:** Wahlarchiv mit Name, automatischer Sicherung, Datei herunterladen und laden, Textrückfall; kleine Parteien einzeln im Sitzrechner; Hinweise auf der Lehrkraftseite (Sichern, Wahlgeheimnis). Dazu eine aus dem Bildschirmfoto rekonstruierte Datei (nur Zweitstimmen in Prozent).

**Prüfung (gelaufen):** Browser-Test: 15 Stimmzettel, Auszählen → automatisch gesichert; Datei »Klassenwahl_Bundestagswahl-2026-J1_2026-11-08.json« heruntergeladen; Gerät geleert; Datei geladen → Sitzrechner, Abgleich, Liste wieder da; FREIE WÄHLER mit 6,7 % einzeln mit Sitzen; rekonstruierte Datei geladen. `tools/pruefen.py` siehe Pull Request.

## v11 (10.11.2026): GK-Labor, Koalitionsverhandlung, Gender Gap, Europawahl – Pull Request, nicht zusammengeführt

**Auftrag:** Koalitionsverhandlungen (»was passt, was nicht«), Einfluss von Alter und Geschlecht mit induktivem Einstieg zum Political Gender Gap, Europawahl als eigene Station, ein GK-Labor als Übersicht der ganzen Reihe.

**Umgesetzt:**
1. **GK-Labor** (`index.html`, Muster AO): Leitfrage der Reihe »Was braucht eine Demokratie, um nicht zu scheitern?«; Karte mit drei Zonen (Einbringen → Entscheiden und kontrollieren → Schützen) und fünf Modulen nach BPE 2.1/2.2. Modul 1 ist verfügbar und öffnet seine drei Teile (Parteien · Wahlen zum Bundestag · Wahlen zum Europäischen Parlament); Module 2–5 stehen als »in Planung« mit Leitfrage aus der Grobplanung. Hypothesenliste »Was braucht eine Demokratie?« auf dem Gerät. Die bisherige Startseite heißt jetzt `parteien.html` (Modul 1); der Moodle-Link auf `index.html` bleibt gültig und führt jetzt ins Labor. Marke im Kopf: »GK-Labor«.
2. **Koalitionsverhandlung** (Station 4, Muster AJ): nach der Programmprüfung die strittigen Fragen verhandeln, Bilanz, Vertragsentwurf als Datei.
3. **Drei Menschen, drei Wahlen?** (Station 5, Muster AK): Einstieg mit Caja, Mitschüler, Großeltern; Auflösung nach Abschnitt 2 mit Vergleichsaufgabe und Streitfrage (FT 2024 gegen KAS 2026).
4. **Station 6 »Europa wählt«** mit fünf Reitern: Vergleich Bundestags- und Europawahl (aufdecken), Sitze je Land (AL), Ergebnis 2024 mit Hürden-Schalter (AM), Fraktionen und Mehrheit suchen (AN), Aufgaben des EP und Urteil zur Sperrklausel (Sach- und Werturteil getrennt). Erst-erinnern-Fragen zu Station 5, Ziel 5, Organizer mit sechs Stationen.

**Bewusste Entscheidung:** Der Gender-Einstieg deckt nicht sofort auf, weil Abschnitt 1 und 2 dieselben Zahlen erst vermuten lassen (Lehre »Prüfen, ob die Übersicht etwas vorwegnimmt«).

**Prüfkette (gelaufen):** `tools/pruefen.py` fünfzehn Seiten × fünf Breiten: ein Befund – H1 des GK-Labors bei 390 px dreizeilig (bewusst: die Leitfrage bleibt ganz stehen). Hell, Dunkel, Beamer ohne Fehler und ohne waagerechtes Scrollen (GK-Labor, Modul 1, Stationen 4–6). Browser-Tests: Verhandlung CDU+SPD und CDU+CSU+SPD (fünf strittige Fragen, Optionen, Bilanz, Download, Stand nach Neuladen), Drei Menschen (Tipps, Vermutung, Auflösung, Stand nach Neuladen, 390 px), Station 6 (Aufdecken, Malta-Schätzung, 0/2/5 %: 15/10/7 Parteien, Fraktionen 720 Punkte, EVP+S&D+Renew = 401). **Nicht gelaufen:** echtes iPad, echter Beamer, VoiceOver.

**Zum Prüfen vor dem Einsatz:** Zuordnung der deutschen Parteien zu den EP-Fraktionen (AfD → ESN, BSW fraktionslos, FREIE WÄHLER → Renew, Volt → Grüne/EFA); Stand der 2-%-Hürde (Direktwahlakt 2018, Ratifizierung Deutschland und Spanien); Bevölkerungsanteile 1.1.2024.

## v12 (10.11.2026): Modul 2 »Verbände und Lobbyismus« – Entwurf, Pull Request

Eine Doppelstunde (`verbaende.html`), roter Faden Zuckersteuer 2026, Kernfrage »Stimme der Gesellschaft – oder gekaufte Politik?«. Sieben Schritte mit den sechs Hebeln (verdecken, variieren, rückmelden, stufen, bündeln; das Urteil im Raum). Muster AP–AT. GK-Labor: Modul 2 als »Entwurf« verlinkt.

**Prüfung (gelaufen):** `tools/pruefen.py` für GK-Labor und Modul 2: nur der bekannte Befund (H1 im Labor, 390 px). Hell, Dunkel, Beamer bei 1280 und 390 px ohne Fehler und ohne waagerechtes Scrollen. Browser-Test aller Bausteine samt Stand nach Neuladen. **Nicht gelaufen:** iPad, Beamer im Raum.

## v13 (10.11.2026): Eingaben je Modul löschen – Pull Request

»Eingaben löschen …« im Fuß öffnet ein Feld statt eines Browser-Dialogs: Eingaben im aktuellen Modul löschen (im GK-Labor: Modul 1 oder Modul 2 wählen), Klassenergebnisse von Modul 1 nur mit eigenem Schalter, »Alles auf diesem Gerät löschen« als letzte Wahl; jede Löschung braucht ein zweites Tippen, Escape schließt. Ansicht und Bewegung bleiben immer. Der Lernstand wird je Modul getrennt (Modul 2: st12). Fußzeile neutral für alle Module.

**Prüfung (gelaufen):** Browser-Test mit Schlüsseln aus beiden Modulen: Modul 2 löschen lässt Modul 1, Klassenwahl, Wahlarchiv, Hypothesen und Ansicht stehen; Modul 1 löschen ohne Schalter lässt Klassenwahl und Wahlarchiv stehen; kein Browser-Dialog. `tools/pruefen.py`: nur der bekannte Befund (H1 im Labor, 390 px).

## v14 (11.11.2026): Karte als Linienplan, Klassenergebnis 2026/27, Koalitionsspiel, neue Figuren – Pull Request

1. **Karte des Halbjahres** neu als Linienplan (Advance Organizer): übergeordnete Schritte zuerst (Einbringen → Entscheiden und kontrollieren → Schützen), beschriftete Verbindungen, Rückweg, Legende, »Du bist hier«. Unter »Wahlen zum Bundestag« neu: Klassenergebnis 2026/27 und Koalitionsspiel.
2. **Klassenergebnis 2026/27** fest eingetragen (CDU 26,7 · Die Linke 26,7 · GRÜNE 20 · FDP 20; 6,6 % nicht zugeordnet): Knopf im Sitzrechner, Eintrag im Wahlarchiv, Anker `station4.html#klasse-2627`. Ein eigenes Klassenergebnis auf dem Gerät wird dabei nicht überschrieben.
3. **Koalitionsspiel** (Muster AU): Partei wählen → Partner vermuten, sondieren → drei Runden verhandeln → Vertrag, Scheitern oder Opposition. Kodierung im Kopf von `koalitionsspiel.js` und auf der Seite (»So rechnet das Spiel«).
4. **Figuren** (Muster AV): Caja mit drei Posen, Mitschüler, Großeltern; größere Caja-Kärtchen.

**Prüfung (gelaufen):** `tools/pruefen.py` 17 Seiten × 5 Breiten; Rechenkern des Spiels über alle Pakete für zwölf Bündnisse durchgezählt (je nach Bündnis 2 bis 31 Lösungen, Bündnisse ohne Streit sofort einig); Browser-Tests: Spiel (zu hart, Lösung, zu weich, Opposition, Stand nach Neuladen), Anker `#klasse-2627`, Wahlarchiv, Figuren. **Nicht gelaufen:** iPad, Beamer im Raum, Erprobung mit Lernenden (Schwierigkeit des Spiels).

**Vor dem Einsatz prüfen:** Gewichte der Themen je Partei (Annahme); Aussagen »lehnt jede Zusammenarbeit mit der AfD ab« für SPD, Grüne, Linke, FDP (belegt ist in der Werkstatt nur der CDU-Beschluss 2018); Lindner-Zitat 2017; ob 6,6 % des Klassenergebnisses eine nicht zugeordnete Stimme sind.

## v15 (11.11.2026): Startseite reduziert – drei farbige Säulen

Die Startseite zeigt nur noch die Leitfrage und darunter die drei Schritte als Säulen in drei Tönen (Einbringen · Entscheiden · Schützen), verbunden durch Pfeilspitzen im Band. Module als Kacheln: vorhanden voll mit Link, geplant gestrichelt. Modul 1 mit drei Teilen als Griffe und zwei Direktlinks (Klassenergebnis 2026/27, Koalitionsspiel). Entfallen: Lesehilfe, »Menschen mit Interessen«, Haltestellen, Rückweg, Legende; Hypothesenliste eingeklappt. **Prüfung:** `pruefen.py` für die Startseite (nur der bekannte H1-Befund bei 390 px), Hell/Dunkel/Beamer angesehen.
