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
