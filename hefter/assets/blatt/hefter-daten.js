/* ===== GK-Labor · der Hefter des ersten Halbjahres · erzeugt aus tools/blaetter.py – dort ändern =====
   module: die acht Karten des Startbildschirms (Zählung wie bisher: G · M1 · KA · M2 · M3 · M4 · M5 · B) · blaetter: alle Arbeitsblätter in ihrer Reihenfolge.
   bild.status: »aus dem Material« (Politik_Halbjahr_1, Seite) oder »eigene Zeichnung«. */
window.GK_HEFTER = {
 "gk": {
  "name": "GK-Labor",
  "start": "index.html",
  "frage": "Was braucht eine Demokratie, um nicht zu scheitern?",
  "schluessel": "^(pw:|gk-)",
  "module": [
   {
    "nr": "G",
    "titel": "Grundlagen",
    "meta": "drei Blätter · Demokratie, direkte Demokratie, Rechtsstaat",
    "art": "blatt",
    "bild": {
     "datei": "media/platzhalter.svg",
     "alt": "Luftbild: eine Autobahn führt durch einen Wald.",
     "status": "aus dem Material (Politik_Halbjahr_1, S. 11, Fall »Welches Recht schränken Sie ein?«); Urheber dort nicht genannt – noch offen"
    }
   },
   {
    "nr": "M1",
    "titel": "Parteien und Wahlen",
    "meta": "Auftakt und sechs Stationen · zwei Doppelstunden",
    "art": "blatt",
    "bild": {
     "datei": "media/platzhalter.svg",
     "alt": "Schaubild: Sitzverteilung im 21. Deutschen Bundestag mit 630 Sitzen, nach Fraktionen und mit Frauenanteil.",
     "status": "aus dem Material (Politik_Halbjahr_1, S. 22); Urheber dort nicht genannt – noch offen"
    }
   },
   {
    "nr": "KA",
    "titel": "Klassenarbeit",
    "meta": "Wiederholung · Probeklausur",
    "art": "blatt",
    "bild": {
     "datei": "media/ka-titel.svg",
     "alt": "Zeichnung: ein liniertes Blatt mit drei Aufgaben und ein Stift.",
     "status": "eigene Zeichnung"
    }
   },
   {
    "nr": "M2",
    "titel": "Verbände und Lobbyismus",
    "meta": "eine Doppelstunde · Fall: Zuckersteuer",
    "art": "blatt",
    "bild": {
     "datei": "media/m2-titel.svg",
     "alt": "Zeichnung: ein Gesetzentwurf mit Paragrafenzeichen, gestrichenen und eingefügten Zeilen; von links und rechts drücken Pfeile darauf, unten stehen Getränkeflaschen und Zuckerwürfel.",
     "status": "eigene Zeichnung"
    }
   },
   {
    "nr": "M3",
    "titel": "Medien",
    "meta": "eine Stunde",
    "art": "geplant",
    "bild": {
     "datei": "media/platzhalter.svg",
     "alt": "Illustration: Gesichter in Kreisen, verbunden zu einem Netz vor einer Weltkugel.",
     "status": "aus dem Material (Politik_Halbjahr_1, S. 65, »Echokammern und Filterblasen«); Urheber dort nicht genannt – noch offen"
    }
   },
   {
    "nr": "M4",
    "titel": "Deutschland und die EU",
    "meta": "drei Stunden",
    "art": "geplant",
    "bild": {
     "datei": "media/platzhalter.svg",
     "ganz": true,
     "alt": "Schaubild: drei Felder Legislative, Exekutive und Judikative mit Paragrafenzeichen, Handschellen und Waage.",
     "status": "aus dem Material (Politik_Halbjahr_1, S. 66, »Gewaltenteilung«); Urheber dort nicht genannt – noch offen"
    }
   },
   {
    "nr": "M5",
    "titel": "Gefährdungen der Demokratie",
    "meta": "zwei Stunden",
    "art": "geplant",
    "bild": {
     "datei": "media/platzhalter.svg",
     "alt": "Weltkarte »Autokratie gegen Demokratie«: Staaten eingefärbt nach Regierungsform.",
     "status": "aus dem Material (Politik_Halbjahr_1, S. 49); im Bild: katapult-magazin.de"
    }
   },
   {
    "nr": "B",
    "titel": "Bilanz",
    "meta": "eine Stunde · Brücke nach Weimar",
    "art": "geplant",
    "bild": {
     "datei": "media/b-titel.svg",
     "alt": "Zeichnung: eine Brücke mit zwei Pfeilern.",
     "status": "eigene Zeichnung"
    }
   }
  ],
  "blaetter": [
   {
    "nr": "G1",
    "modul": "G",
    "titel": "Demokratie und Regierungssysteme",
    "kurz": "Demokratie",
    "datei": "g1-demokratie.html",
    "art": "blatt",
    "auf": [
     [
      "a1",
      "1",
      "Merkmale von Demokratien"
     ],
     [
      "a2",
      "2",
      "Regierungsformen bewerten"
     ],
     [
      "a3",
      "3",
      "Stimmen Sie ab!"
     ]
    ]
   },
   {
    "nr": "G2",
    "modul": "G",
    "titel": "Direkte Demokratie",
    "kurz": "Direkte Demokratie",
    "datei": "g2-direkte-demokratie.html",
    "art": "blatt",
    "auf": [
     [
      "a1",
      "1",
      "Wiederholung"
     ],
     [
      "a2",
      "2",
      "Ihre Meinung"
     ],
     [
      "a3",
      "3",
      "Fahrplan und Regeln"
     ],
     [
      "a4",
      "4",
      "Positionslinie"
     ],
     [
      "a5",
      "5",
      "Aufgabe 1 · Wo abstimmen?"
     ],
     [
      "a6",
      "6",
      "Aufgabe 2 · Vier Fälle"
     ],
     [
      "a7",
      "7",
      "Aufgabe 3 · Sachurteil"
     ],
     [
      "a8",
      "8",
      "Sicherung"
     ],
     [
      "a9",
      "9",
      "Hypothesenwand"
     ],
     [
      "k",
      "K",
      "Klassenarbeit üben"
     ],
     [
      "l",
      "L",
      "Lernkarten"
     ]
    ]
   },
   {
    "nr": "G3",
    "modul": "G",
    "titel": "Rechtsstaat und Grundrechte",
    "kurz": "Rechtsstaat und Grundrechte",
    "datei": "g3-rechtsstaat.html",
    "art": "blatt",
    "auf": [
     [
      "a1",
      "1",
      "Wiederholung"
     ],
     [
      "a2",
      "2",
      "Darf die Schule das?"
     ],
     [
      "a3",
      "3",
      "Aufgabe 1 · Bausteine"
     ],
     [
      "a4",
      "4",
      "Prüfschema"
     ],
     [
      "a5",
      "5",
      "Aufgabe 2 · Fallgerichte"
     ],
     [
      "a6",
      "6",
      "Urteilsverkündung"
     ],
     [
      "a7",
      "7",
      "Rechtsweg und Weimar"
     ],
     [
      "a8",
      "8",
      "Hypothesenwand"
     ],
     [
      "l",
      "L",
      "Lernkarten"
     ]
    ]
   },
   {
    "nr": "M1",
    "modul": "M1",
    "titel": "Parteien und Wahlen",
    "kurz": "Auftakt",
    "datei": "m1-parteien-und-wahlen.html",
    "art": "blatt",
    "auf": [
     [
      "a1",
      "1",
      "Wo stehst du?"
     ],
     [
      "z",
      "Z",
      "Zusammenfassung"
     ]
    ]
   },
   {
    "nr": "M1.1",
    "modul": "M1",
    "titel": "Was Parteien tun",
    "kurz": "Grundlagen",
    "datei": "m1-1-grundlagen.html",
    "art": "blatt",
    "auf": [
     [
      "a1",
      "1",
      "Grundgesetz markieren"
     ],
     [
      "a2",
      "2",
      "Vier Aufgaben"
     ],
     [
      "a3",
      "3",
      "Elf Funktionen"
     ],
     [
      "a4",
      "4",
      "Selbsttest"
     ],
     [
      "s",
      "S",
      "Zwischenstand"
     ],
     [
      "extra",
      "＋",
      "Extra · freiwillig"
     ]
    ]
   },
   {
    "nr": "M1.2",
    "modul": "M1",
    "titel": "Funktionen erkennen",
    "kurz": "Erkennen",
    "datei": "m1-2-erkennen.html",
    "art": "blatt",
    "auf": [
     [
      "a1",
      "1",
      "Erst erinnern"
     ],
     [
      "a2",
      "2",
      "Erst grob"
     ],
     [
      "a3",
      "3",
      "Dann genau"
     ],
     [
      "s",
      "S",
      "Zwischenstand"
     ],
     [
      "a4",
      "4",
      "Sicherung"
     ]
    ]
   },
   {
    "nr": "M1.3",
    "modul": "M1",
    "titel": "Wofür stehen die Parteien?",
    "kurz": "Positionen",
    "datei": "m1-3-positionen.html",
    "art": "blatt",
    "auf": [
     [
      "a1",
      "1",
      "Erst erinnern"
     ],
     [
      "a2",
      "2",
      "Was ist dir wichtig?"
     ],
     [
      "a3",
      "3",
      "Die Parteien dazu"
     ],
     [
      "a4",
      "4",
      "Acht Streitfragen"
     ],
     [
      "a5",
      "5",
      "Sicherung"
     ],
     [
      "s",
      "S",
      "Zwischenstand"
     ],
     [
      "extra",
      "＋",
      "Extra · freiwillig"
     ]
    ]
   },
   {
    "nr": "M1.4",
    "modul": "M1",
    "titel": "Wählen und auszählen",
    "kurz": "Wählen",
    "datei": "m1-4-waehlen.html",
    "art": "blatt",
    "auf": [
     [
      "a1",
      "1",
      "Erst erinnern"
     ],
     [
      "a2",
      "2",
      "Der Stimmzettel"
     ],
     [
      "a3",
      "3",
      "Die Klassenwahl"
     ],
     [
      "a4",
      "4",
      "Der Sitzrechner"
     ],
     [
      "a5",
      "5",
      "Der Koalitionsrechner"
     ],
     [
      "a6",
      "6",
      "Realitätsabgleich"
     ],
     [
      "s",
      "S",
      "Zwischenstand"
     ],
     [
      "extra",
      "＋",
      "Extra · freiwillig"
     ]
    ]
   },
   {
    "nr": "M1.5",
    "modul": "M1",
    "titel": "Warum wählen Menschen so?",
    "kurz": "Warum so?",
    "datei": "m1-5-warum-so.html",
    "art": "blatt",
    "auf": [
     [
      "a1",
      "1",
      "Erst erinnern"
     ],
     [
      "a2",
      "2",
      "Drei Menschen"
     ],
     [
      "a3",
      "3",
      "Vermuten: 18 bis 24"
     ],
     [
      "a4",
      "4",
      "Frauen und Männer"
     ],
     [
      "a5",
      "5",
      "Zurück zu den drei"
     ],
     [
      "a6",
      "6",
      "Brexit 2016"
     ],
     [
      "s",
      "S",
      "Zwischenstand"
     ],
     [
      "a7",
      "7",
      "Die 5-%-Hürde"
     ],
     [
      "extra",
      "＋",
      "Extra · freiwillig"
     ]
    ]
   },
   {
    "nr": "M1.6",
    "modul": "M1",
    "titel": "Europa wählt",
    "kurz": "Europa wählt",
    "datei": "m1-6-europa.html",
    "art": "blatt",
    "auf": [
     [
      "a1",
      "1",
      "Erst erinnern"
     ],
     [
      "a2",
      "2",
      "So wird gewählt"
     ],
     [
      "a3",
      "3",
      "Sitze je Land"
     ],
     [
      "a4",
      "4",
      "Ergebnis 2024"
     ],
     [
      "a5",
      "5",
      "Fraktionen"
     ],
     [
      "a6",
      "6",
      "Parlament und Urteil"
     ]
    ]
   },
   {
    "nr": "KA",
    "modul": "KA",
    "titel": "Fit für die Klassenarbeit",
    "kurz": "Klassenarbeit",
    "datei": "ka-klassenarbeit.html",
    "art": "blatt",
    "auf": [
     [
      "a1",
      "1",
      "Aus dem Kopf"
     ],
     [
      "a2",
      "2",
      "Demokratie"
     ],
     [
      "a3",
      "3",
      "Grundrechte"
     ],
     [
      "a4",
      "4",
      "Parteien"
     ],
     [
      "a5",
      "5",
      "Bundestagswahl"
     ],
     [
      "a6",
      "6",
      "Europawahl"
     ],
     [
      "a7",
      "7",
      "Schreiben üben"
     ],
     [
      "i",
      "I",
      "Ich-kann-Liste"
     ],
     [
      "p",
      "P",
      "Probeklausur"
     ],
     [
      "z",
      "Z",
      "Zusammenfassung"
     ]
    ]
   },
   {
    "nr": "M2",
    "modul": "M2",
    "titel": "Verbände und Lobbyismus",
    "kurz": "Verbände und Lobbyismus",
    "datei": "m2-verbaende.html",
    "art": "blatt",
    "auf": []
   }
  ]
 }
};
