---
name: Politik-Werkstatt
description: Lernumgebung für Gemeinschaftskunde – der Stimmzettel als Grundform, zwei Druckfarben (Erststimme Schwarz, Zweitstimme Blau), das Kreuz als Rückmeldung.
colors:
  grund: "#F1F0ED"
  flaeche: "#FFFFFD"
  karton: "#E7E5E0"
  text: "#1F1D1A"
  leise: "#5B5751"
  stahl: "#75706A"
  linie: "#DDD9D2"
  blau: "#1F4E8C"
  blau-zart: "#DCE6F3"
  blau-tief: "#163A69"
  erfolg: "#2E6B34"
  fehler: "#B0281C"
  nacht: "#17140F"
  nacht-text: "#F3EADB"
typography:
  display:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.4rem + 4.4vw, 5rem)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  h1:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.4rem + 2.6vw, 3.25rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.015em"
  h2:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(1.625rem, 1.25rem + 1.4vw, 2.375rem)"
    fontWeight: 600
    lineHeight: 1.15
  h3:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(1.3125rem, 1.2rem + 0.5vw, 1.625rem)"
    fontWeight: 600
    lineHeight: 1.2
  intro:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.15rem + 0.4vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.08rem + 0.2vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.55
  small:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.2
rounded:
  none: "0"
  sm: "4px"
  circle: "50%"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "24px"
  "6": "32px"
  "7": "48px"
  "8": "64px"
  "9": "96px"
components:
  button-primary:
    backgroundColor: "{colors.text}"
    textColor: "{colors.flaeche}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "12px 20px"
    height: "48px"
  button-secondary:
    backgroundColor: "{colors.flaeche}"
    textColor: "{colors.text}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "12px 20px"
    height: "48px"
  option:
    backgroundColor: "{colors.flaeche}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "14px 16px"
    height: "56px"
  card:
    backgroundColor: "{colors.flaeche}"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    padding: "24px"
  ballot-circle:
    backgroundColor: "{colors.flaeche}"
    textColor: "{colors.text}"
    rounded: "{rounded.circle}"
    height: "44px"
---

# Design System: Politik-Werkstatt

## 1. Overview

**Creative North Star: »Der Stimmzettel«**

Die Politik-Werkstatt sieht aus wie ein amtlicher Stimmzettel, der zum Arbeitsbogen geworden ist: weißes Papier mit einem Falz in der Mitte, links die Spalte in **Druckschwarz** (die Erststimme, die Person), rechts die Spalte in **Stimmzettelblau** (die Zweitstimme, die Partei). Jede Entscheidung endet in einem **Kreis**, und ein **Kreuz** ist die einzige Rückmeldung, die es braucht. Fortschritt sind fünf Kreise, die nacheinander ein Kreuz bekommen. Ergebnisse werden im **Halbrund** des Plenarsaals gezeigt, der einzigen Form der Seite, die Farbe über zwei Druckfarben hinaus kennt: Parteifarben, immer mit Name und Zahl.

Die Oberfläche ist flach und gedruckt: Linien nur dort, wo ein Stimmzettel Linien hat (Tabellenraster des Zettels), sonst Flächen in Tonstufen. Tiefe entsteht durch die **versetzte Platte**, nicht durch Schatten. Bewegung ist kurz und funktional: das Kreuz setzt sich, der Zettel wird gefaltet, ein Sitz rückt ins Halbrund.

Das System lehnt ab: Parteilogos und Parteifarben außerhalb von Ergebnissen, Gamification (Punkte, Sterne, Abzeichen), Ampeln für Leistungen, weiche Schatten, Verläufe, Hochglanz, Nachahmung amtlicher Dokumente über die Lernfunktion hinaus.

**Key Characteristics:**
- Zwei Druckfarben: Schwarz (Erststimme, Hauptaktion, Text) und Blau (Zweitstimme, Hinweise, Belege). Keine dritte Akzentfarbe.
- Kreis und Kreuz als Signatur für Auswahl und Rückmeldung.
- Halbrund (630 Sitze) als einziges farbiges Diagramm; Farbe nie ohne Wort.
- Bricolage Grotesque für Überschriften, Atkinson Hyperlegible Next für alles Lesbare.
- iPad hoch und quer, Beamer 1280 × 720 für Übersichten und Ergebnisse.

## 2. Colors

### Primary
- **Text / Druckschwarz** (#1F1D1A): Fließtext, Hauptaktionen, Erststimme. Auf Grund 14,8:1.
- **Blau / Stimmzettelblau** (#1F4E8C): Zweitstimme, Belege, Quellenhinweise, aktive Fortschrittskreise. Auf Grund 7,3:1, auf Fläche 8,3:1; heller Text auf Blau 8,3:1.
- **Blau zart / tief** (#DCE6F3 / #163A69): Hinweisflächen und Text darauf (9,0:1).

### Neutral
- **Grund** (#F1F0ED): Seitenhintergrund, Papier. Text 14,8:1.
- **Fläche** (#FFFFFD): Stimmzettelfelder, Karten, Eingaben. Text 16,8:1.
- **Karton** (#E7E5E0): zurückgesetzte Bänder, Passepartout.
- **Leise** (#5B5751): Nebennotizen, nie Fließtext (6,3:1).
- **Stahl** (#75706A): Grenzen von Bedienelementen (4,3:1).
- **Linie** (#DDD9D2): nur das Raster des Stimmzettels.

### Status
Erfolg #2E6B34 (5,6:1), Fehler #B0281C (5,8:1). Status steht immer als Wort.

### Parteifarben (nur im Halbrund und in Ergebnisbalken)
CDU #1F1D1A · CSU #0C6DB3 · SPD #C8102E · Grüne #2E7D32 · FDP #E8C300 (Text darauf dunkel) · AfD #1A8FD6 · Linke #B5176B · BSW #6B2D8B · Freie Wähler #D97706 · Sonstige #9A948C. Jede Fläche trägt Name und Zahl; die Farben dienen der Wiedererkennung aus Wahlberichten, nicht der Wertung.

### Named Rules
**The Two-Inks Rule.** Schwarz und Blau sind die einzigen Gestaltungsfarben. Hervorhebung über Gewicht, Größe und Fläche, nie über eine dritte Farbe.

**The Ballot-Colour Rule.** Parteifarben erscheinen nur in Ergebnissen (Halbrund, Balken), immer mit Parteiname und Zahl, nie an Knöpfen, Karten oder Profilen.

**The Neutral Action Rule.** Hauptaktionen sind Druckschwarz; Zweitstimmenblau markiert Belege und Hinweise, nie Aufforderungen.

## 3. Typography

**Display Font:** Bricolage Grotesque (OFL), lokal als woff2 (Bold 700, SemiBold 600).
**Body Font:** Atkinson Hyperlegible Next (OFL), lokal als woff2 (Regular, Bold), unverändert.
Zahlen in Ergebnissen mit `font-variant-numeric: tabular-nums`.

### Hierarchy
- **Display** (700, 40 → 80 px, 1,04): nur Startseiten-Leitsatz.
- **H1** (700, 32 → 52 px, 1,08): Stationstitel.
- **H2** (600, 26 → 38 px, 1,15): Abschnitte.
- **H3** (600, 21 → 26 px, 1,2): Fragen, Kartentitel.
- **Intro** (20 → 24 px, 1,45): Einleitungssatz unter H1.
- **Body** (18 → 20 px, 1,55, max. 68ch).
- **Small** (16 px): Hilfetexte, Quellen. Nie kleiner.
- **Label** (700, 18 px): Knöpfe.

### Named Rules
**The 16-Pixel Floor.** Kein Text unter 16 px, auch nicht auf dem Stimmzettel oder im Halbrund.
**The Display-Only-Bricolage Rule.** Bricolage nur für Display und H1–H3 sowie die Wortmarke.
**The Two-Line Rule.** Jede Überschrift höchstens zwei Zeilen bei 1440, 1280, 768 und 390 px.

## 4. Layout

Inhaltsbreite 72 rem, Stationen mit Arbeitsbereich 64 rem, Seitenrand `clamp(1rem, 4vw, 3rem)`. Raster 4 / 8 / 12 Spalten; der Stimmzettel ist immer zweispaltig (ab 768 px nebeneinander, darunter untereinander mit Falz als Trennband). Abstände 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 px. Umbrüche 600, 768, 1024, 1280 px und `max-height: 760px` für Beamer.

### Named Rules
**The First-Action Rule.** Auf jedem ersten Bildschirm ein echter Knopf (≥ 48 px).
**The Beamer Rule.** Start, Halbrund und Realitätsabgleich zeigen das Wesentliche in 1280 × 720 ohne Scrollen.
**The One-Task Rule.** Pro Bildschirm eine Aufgabe: eine Frage, ein Stimmzettel, ein Diagramm.
**The Static Grid Rule.** Jede bewegte Ansicht hat eine ruhende Fassung; nichts läuft von allein.

## 5. Elevation & Depth

Keine weichen Schatten. Ebenen entstehen durch die **versetzte Platte**: Karton oder Blau zart 6 px rechts unten hinter einer Karte. Beim Überfahren hebt die Karte 2 px ab, beim Drücken rückt sie 4 px auf die Platte. Überlagerungen (Aufdecken, Lehrkraft-Modus) liegen auf einem Grund-Schleier.

### Named Rules
**The No-Blur Rule.** `box-shadow` mit Unschärfe ist verboten.

## 6. Shapes

Ecken 4 px für Karten, Knöpfe, Felder; Kreise (50 %) nur für Stimmzettelkreise und Fortschritt. Signaturformen: der **Kreis** (44 px, 2-px-Kante Druckschwarz), das **Kreuz** (zwei Striche, 3 px), der **Falz** (gestrichelte Mittellinie des Stimmzettels, nur dort), das **Halbrund** (Sitze als Punkte in Reihen), der **Wahlumschlag** (Übergang zwischen Stimmabgabe und Ergebnis). Keine Stempel, Siegel, Adler oder Hoheitszeichen.

## 7. Components

### Buttons
- **Primär:** Druckschwarz, Text Fläche, 48 px, 4 px Ecken, Label 18 px fett. **Sekundär:** Fläche, 2-px-Kante Stahl.
- Zustände: Hover (nur feiner Zeiger) Platte 4 px versetzt; Druck 2 px verschoben, 100 ms; Fokus Doppelring (3 px Text außen, 2 px Fläche innen).

### Auswahloption (Stimmzettelzeile)
- Zeile aus Fläche mit 2-px-Kante Stahl, mindestens 56 px hoch, links der Kreis, rechts der Text. Gewählt: Kreuz im Kreis (Zeichnung, 160 ms) und Kante Druckschwarz. In Station 3 ist die Option die Partei, in Station 4 Kandidat oder Partei.

### Rückmeldung
- Fläche in Blau zart mit Text in Blau tief, 4 px Ecken, `aria-live="polite"`. Enthält immer: Ergebnis als Wort (»passt«, »passt auch«, »passt nicht«), Begründung, ggf. Beleg mit Seitenzahl. Nie nur ein Haken.

### Fortschritt
- Fünf Kreise mit Stationsnamen, abgehakte Kreise tragen ein Kreuz, der aktuelle ist blau gefüllt; Text »Station 2 von 5« steht daneben.

### Karten
- Fläche, 4 px Ecken, keine Haarlinie, versetzte Platte in Karton. Profilkarten tragen den Parteinamen als Text, keine Parteifarbe.

### Halbrund
- SVG, 630 Punkte in 9 Reihen, Blöcke je Partei mit Beschriftung (Name, Sitze) außerhalb des Diagramms als Liste; Mehrheitsmarke 316 als Strich mit Wort »Mehrheit: 316 Sitze«. Statische Fassung ohne JavaScript: Tabelle.

### Eingaben
- Fläche, 2-px-Kante Stahl, 48 px, Label darüber. Fehler: Kante Fehlerrot plus Text.

### Navigation
- Wortmarke links (»Politik-Werkstatt«, der Bindestrich als Kreuz), rechts höchstens vier Punkte: Start · Einheit · Zusammenfassung · Lehrkraft. Unter 768 px ein Knopf »Menü«, der ohne JavaScript zur Navigation im Fuß springt.

### Fuß
- Wortmarke in voller Breite, Pflichttext, Quellen der Seite, »Eingaben löschen«.

## 8. Do's and Don'ts

### Do:
- **Do** jede Rückmeldung begründen und Belege mit Seitenzahl zeigen.
- **Do** Parteien in Reihenfolge des Stimmzettels oder nach Ergebnis zeigen, nie nach Sympathie.
- **Do** Farbe nur mit Wort und Zahl verwenden.
- **Do** Bewegung nur auf Tippen starten; »Weniger Bewegung« anbieten.
- **Do** jede Station mit einem Satz beginnen, der sagt, was man danach kann.

### Don't:
- **Don't** Parteilogos, Parteifarben an Bedienelementen, Fotos von Politikerinnen und Politikern.
- **Don't** Punkte, Prozent für Leistungen, Abzeichen, Ranglisten, Ampeln.
- **Don't** weiche Schatten, Verläufe, Glas, Rundungen über 4 px außer Kreisen.
- **Don't** Text unter 16 px; Blau als Fließtextfarbe.
- **Don't** Autoplay, Endlosbewegung, Konfetti.
- **Don't** Zitate, Zahlen oder Positionen ohne Quelle; Unbekanntes heißt »noch offen«.
- **Don't** einen Übereinstimmungswert zwischen Lernenden und Parteien berechnen.

## v2 (19.10.2026): Farbe, Fächer, Merkzettel, Reiter

- **Akzent** `#A8411A` (Grund 5,36:1; Weiß auf Akzent 6,1:1) für Prolog-Grundfrage, Stationsnummern, Empfehlungsmarke, einen Hauptknopf je Seite. Zart: `#F6E3D5`.
- **Stationstöne** (Kopfband je Station, immer mit Wort und Zahl): warm `#F6E3D5`, blau `#DCE6F3`, grün `#E3EEE4`, lila `#ECE4F2`. Text darauf ≥ 13:1.
- **Ballot-Colour Rule, erweitert:** Parteifarbe zusätzlich als Kante und Marke auf Kurzprofilen – stets neben dem Parteinamen, nie als einziger Träger.
- **Fächer** (Muster I): Scroll-Snap, Randkarten 55 % Deckkraft und 0,96 Skalierung, Mitte voll; Pfeile 48 px, Punkte, Stand »x / n«; ohne JavaScript Liste.
- **Merkzettel** (Muster K): Seitenleiste 440 px, Split-Screen ab 1024 px; Inhalt = Klausur-PDF.
- **Reiter** (Muster J): Ordnerblätter, aktives Blatt weiß, inaktive Karton; Adresse #id.
- **Kopfband** je Station: Nummer, H1, Leitfrage (Bricolage 600), drei Kennzahlkacheln.
