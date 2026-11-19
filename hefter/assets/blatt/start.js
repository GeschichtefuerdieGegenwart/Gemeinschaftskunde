/* GK-Labor · Startbildschirm »Der Hefter« · zeigt je Karte Nummer, Titel, Titelbild und Stand; der Stand kommt aus den Blättern (GKBlatt.stand). */
(function () {
  "use strict";
  const B = window.GKBlatt, e = B.einheit(), esc = B.esc, ziel = document.getElementById("hefter");
  const PAKET = window.GK_PAKET || null;   // im Paket: die Nummern der Blätter, die darin liegen
  let FRAGE = false;
  function zeichne() {
    const st = B.stand(), da = b => b.art === "blatt" && !!b.datei && (!PAKET || PAKET.indexOf(b.nr) >= 0);
    /* je Blatt: Stand aus dem Blatt selbst */
    const blatt = e.blaetter.filter(da).map(b => {
      const s = st[b.nr], fertig = !!(s && s.von && s.fertig >= s.von), begonnen = !!(s && (s.fertig || s.zeit)), hier = !fertig && st._zuletzt === b.nr;
      return { b: b, fertig: fertig, begonnen: begonnen, hier: hier, wort: fertig ? "✓ fertig" : hier ? "du bist hier · " + (s.fertig | 0) + " von " + s.von : begonnen ? (s.fertig | 0) + " von " + s.von + " Aufträgen fertig" : "noch nicht begonnen" };
    });
    /* je Modul (eine Karte): seine Blätter zusammen */
    const info = e.module.map(m => {
      const bl = blatt.filter(x => x.b.modul === m.nr), ist = bl.length > 0, nF = bl.filter(x => x.fertig).length, fertig = ist && nF === bl.length, hierB = bl.find(x => x.hier), begonnen = bl.some(x => x.begonnen || x.fertig);
      const naechst = hierB || bl.find(x => !x.fertig) || bl[0] || null, eins = bl.length === 1;
      const wort = !ist ? (m.art === "papier" ? "auf Papier" : m.art === "geplant" ? "geplant" : "folgt") : fertig ? "✓ fertig" : eins ? bl[0].wort + (bl[0].hier ? " Aufträgen" : "") : hierB ? "du bist hier · " + hierB.b.nr + " · " + nF + " von " + bl.length + " Blättern fertig" : begonnen ? nF + " von " + bl.length + " Blättern fertig" : "noch nicht begonnen · " + bl.length + " Blätter";
      return { b: m, bl: bl, ist: ist, fertig: fertig, hier: !!hierB, begonnen: begonnen, naechst: naechst, wort: wort, kl: !ist ? (m.art === "geplant" ? "geplant" : "") : fertig ? "fertig" : hierB ? "hier" : "" };
    });
    const nFertig = blatt.filter(x => x.fertig).length;
    const weiter = blatt.find(x => x.hier) || blatt.find(x => !x.fertig) || blatt[0] || null;
    const kreise = info.map(x => '<li><span class="st-kreis ' + (x.kl || "") + '" aria-hidden="true"></span><span>' + esc(x.b.nr) + '</span><span class="sr">: ' + esc(x.wort) + "</span></li>").join("");
    const karten = info.map(x => {
      const b = x.b, innen = '<span class="st-bild"><img src="' + esc(b.bild.datei) + '" alt="' + esc(b.bild.alt) + '" width="480" height="184"' + (b.bild.ganz ? ' class="ganz"' : "") + ' loading="eager"><span class="st-nr">' + esc(b.nr) + "</span></span>" +
        '<span class="st-text"><b>' + esc(b.titel) + '</b><span class="st-meta">' + esc(b.meta) + '</span><span class="st-wort ' + (x.fertig ? "fertig" : x.hier ? "hier" : x.ist ? "" : "leise") + '">' + esc(x.wort) + "</span></span>";
      return "<li>" + (x.ist ? '<a class="st-karte ' + x.kl + '" href="' + esc(x.naechst.b.datei) + '">' + innen + "</a>" : '<div class="st-karte ' + x.kl + '">' + innen + "</div>") + "</li>";
    }).join("");
    /* alle Blätter, nach Modulen: der direkte Weg zu einem bestimmten Blatt */
    const liste = info.filter(x => x.ist).map(x => '<li class="st-gruppe"><h3><span class="st-gnr">' + esc(x.b.nr) + "</span> " + esc(x.b.titel) + "</h3><ol>" +
      x.bl.map(y => '<li><a class="st-zeile ' + (y.fertig ? "fertig" : y.hier ? "hier" : "") + '" href="' + esc(y.b.datei) + '"><span class="st-znr">' + esc(y.b.nr) + "</span><span><b>" + esc(y.b.kurz) + '</b><span class="st-zwort">' + esc(y.wort.replace(/^du bist hier · (.*)$/, "du bist hier · $1 Aufträgen")) + "</span></span></a></li>").join("") + "</ol></li>").join("");
    ziel.innerHTML =
      '<section class="st-kopf"><div><h1 class="st-frage">' + esc(e.frage) + "</h1>" +
      (weiter ? '<a class="btn primary st-weiter" href="' + esc(weiter.b.datei) + '">' + (weiter.begonnen ? "Weiter: " : "Los geht’s: ") + esc(weiter.b.nr) + " · " + esc(weiter.b.kurz) + " →</a>" : "") + "</div>" +
      '<div class="st-stand"><p><b>Dein Stand:</b> ' + nFertig + " von " + blatt.length + (blatt.length === 1 ? " Blatt" : " Blättern") + " fertig" + (weiter && weiter.hier ? " · du bist bei " + esc(weiter.b.nr) : "") + '</p><ol class="st-kreise">' + kreise + '</ol><p class="st-legende">Kreuz = fertig · gestrichelt = geplant</p></div></section>' +
      '<section aria-label="Alle Module des Halbjahres"><ol class="st-karten">' + karten + "</ol></section>" +
      '<section class="st-alle" aria-labelledby="st-alle-t"><h2 id="st-alle-t">Alle Blätter</h2><ol class="st-gruppen">' + liste + "</ol></section>" +
      '<section class="st-unten nodruck"><h2>Dein Stand als Datei</h2><p>Wechselst du das Gerät? Sichere deinen Stand als Datei und lade ihn auf dem anderen Gerät wieder. Es gibt keine Anmeldung und keinen Server.</p>' +
      '<div class="ab-reihe">' + B.dateiKnoepfe() + "</div>" +
      '<label class="ab-haken"><input type="checkbox" data-ab="beamer"' + (B.beamer() ? " checked" : "") + "> Ansicht für den Beamer</label>" +
      '<div class="ab-reihe"><button type="button" class="btn" data-hefter="frage" aria-expanded="' + FRAGE + '">Alle Eingaben löschen …</button><button type="button" class="btn still" data-ab="text">Geht keine Datei? Stand als Text</button></div>' +
      '<div class="loesch-frage" id="hefter-frage"' + (FRAGE ? "" : " hidden") + ' style="max-width:40rem"><p><b>Wirklich alles löschen?</b> Alle Antworten in allen Blättern werden auf diesem Gerät entfernt.</p><div class="ab-reihe"><button type="button" class="btn primary" data-hefter="ja">Ja, alles löschen</button><button type="button" class="btn" data-hefter="nein">Abbrechen</button></div></div>' +
      '<p class="st-c">Titelbilder: Herkunft in der <a href="Bildliste.html">Bildliste</a>. Alles bleibt auf diesem Gerät. Nichts wird gesendet.</p></section>';
  }
  document.addEventListener("click", ev => {
    const t = ev.target.closest && ev.target.closest("[data-hefter]"); if (!t) return;
    const a = t.getAttribute("data-hefter");
    if (a === "frage") { FRAGE = true; zeichne(); document.querySelector('[data-hefter="ja"]').focus(); }
    else if (a === "nein") { FRAGE = false; zeichne(); document.querySelector('[data-hefter="frage"]').focus(); }
    else if (a === "ja") { const re = new RegExp(e.schluessel), weg = []; try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (re.test(k)) weg.push(k); } weg.forEach(k => localStorage.removeItem(k)); } catch (x) {} FRAGE = false; zeichne(); }
  });
  window.addEventListener("pageshow", zeichne);
  zeichne();
})();
