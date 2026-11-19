/* ===== GK-Labor · Arbeitsblatt · der Rahmen eines Blatts (Kopfzeile, Register, Blattkopf, Auftragskopf, Tür, Fuß) =====
   Aufbau und Wortlaut wie im Pilot M22 des GGK-Labors und im Modul Motivation des Psycho-Labors. Anders als dort stehen die Aufträge
   als Abschnitte im Dokument (<section data-seite="a1">) und werden nur gezeigt oder verborgen: So bleiben die Bausteine der Stunde,
   ihre Eingaben und ihr Speicher unverändert (Lehre aus M22: »bestehende Seiten teilen statt neu bauen«).
   Aufruf am Ende der Seite: GKSeite({ nr, titel, minuten, auftraege: [{ id, nr, kurz, name, form, min, frei, nach, fehlt, gleich, marke, extra, breit, fertig }], schluessel }) */
(function () {
  "use strict";
  const doc = document, B = window.GKBlatt, esc = B.esc;
  window.GKSeite = function (C) {
    const AUF = C.auftraege, HEFTER = "index.html", KEY = "gk-blatt-" + C.nr.toLowerCase() + ":v1";
    const PLATZ = B.platz(C.nr) || { i: 0, n: 0, name: "GK-Labor", davor: null, danach: null };
    let S = { seite: "start", zuletzt: "", durch: {}, frei: {} };
    try { const j = JSON.parse(localStorage.getItem(KEY) || "null"); if (j && typeof j === "object") S = Object.assign(S, j, { seite: "start" }); } catch (e) {}
    const sichern = () => { try { localStorage.setItem(KEY, JSON.stringify({ zuletzt: S.zuletzt, durch: S.durch, frei: S.frei })); } catch (e) {} };
    const AUFI = id => AUF.findIndex(a => a.id === id), A = id => AUF[AUFI(id)];
    const eigen = a => { try { return !!(a.fertig && a.fertig()); } catch (e) { return false; } };
    const erledigt = id => { const a = A(id); return !!a && (eigen(a) || !!S.durch[id]); };
    /* Offen ist ein Auftrag auch, wenn er schon bearbeitet ist: Neue Freigaben verstecken keine übernommene Arbeit. */
    const offen = id => { const a = A(id); return !a || !a.frei || a.frei === "offen" || !!S.frei[id] || erledigt(id) || (a.frei === "antwort" && eigen(A(a.nach))) || (a.frei === "wenn" && !!a.wenn && !!a.wenn()); };
    const QUER = () => { try { return matchMedia("(min-width:981px)").matches; } catch (e) { return true; } };
    const SCHMAL = () => { const a = A(S.seite); return doc.body.classList.contains("merk-auf") || !!(a && a.breit && offen(a.id)); };
    const runden = AUF.filter(a => !a.extra);
    /* Register und Marken zeigen die Sozialform kurz (bis 26 Zeichen ganz, sonst bis zum ersten Komma); der volle Wortlaut steht im Auftragskasten und im Ablauf */
    const formKurz = a => a.formKurz || (!a.form ? "" : a.form.length <= 26 ? a.form : a.form.split(/, | · /)[0]);
    const zeit = a => [formKurz(a), a.min ? a.min + " Min." : ""].filter(Boolean).join(" · ");
    const $ = id => doc.getElementById(id);
    let FRAGE = false;
    /* Geschwisterblätter desselben Moduls (M1: Auftakt und sechs Stationen) und welche Reiter gerade aufgeklappt sind */
    const E_ = B.einheit(), MODUL = PLATZ.blatt && E_.module ? E_.module.find(m => m.nr === PLATZ.blatt.modul) : null;
    const GESCHW = PLATZ.blatt ? E_.blaetter.filter(b => b.modul === PLATZ.blatt.modul && b.datei) : [];
    const AUFKL = {}; AUFKL[C.nr] = true;

    function kopf() {
      const d = PLATZ.davor, n = PLATZ.danach;
      $("abkopf").innerHTML = '<span class="ab-reiter">' + esc(C.nr) + '</span><div class="ab-ktitel">' + esc(C.titel) + "<small>GK-Labor · Arbeitsblatt" + (d ? " · davor " + esc(d.kurz) : "") + (n ? " · danach " + esc(n.kurz) : "") + "</small></div>" +
        (C.merkzettel ? '<button type="button" class="btn" data-merk aria-expanded="' + doc.body.classList.contains("merk-auf") + '">Merkzettel</button>' : "") + '<button type="button" class="btn" data-ab="sichern">Stand sichern</button><a class="btn" href="' + HEFTER + '">← Hefter</a>';
    }
    function werkzeuge() {
      return B.werkzeuge('<button type="button" class="btn" data-blatt="frage" aria-expanded="' + FRAGE + '">Eingaben löschen …</button>' +
        '<div class="loesch-frage" id="loesch-frage"' + (FRAGE ? "" : " hidden") + '><p><b>Wirklich löschen?</b> ' + esc(C.loesch ? C.loesch.text : "Alle Antworten in diesem Blatt werden auf diesem Gerät entfernt. Andere Blätter bleiben.") + "</p>" +
        '<div class="ab-reihe"><button type="button" class="btn primary" data-blatt="ja">Ja, löschen</button><button type="button" class="btn" data-blatt="nein">Abbrechen</button></div></div>', C.lizenz);
    }
    function register(immer) {
      const r = $("abreg"), lf = $("loesch-frage"); if (!r || (!immer && (r.contains(doc.activeElement) || (lf && !lf.hidden && r.contains(lf))))) return;
      const sl = r.scrollLeft, st = r.scrollTop;
      const zeile = (id, nr, kurz, unter, kl, label, form) => '<li><button type="button" data-geh="' + id + '" class="' + kl + '"' + (id === S.seite ? ' aria-current="step"' : "") + ' aria-label="' + esc(label) + '"><span class="ab-nr" aria-hidden="true">' + nr + "</span><span><b>" + esc(kurz) + "</b>" + (form ? '<small class="ab-form">' + esc(form) + "</small>" : "") + '<span class="ab-st">' + esc(unter) + "</span></span></button></li>";
      const eigene = zeile("start", "D", "Deckblatt", S.seite === "start" ? "du bist hier" : "Frage und Ablauf", "eckig", "Deckblatt: Zentrale Frage und Ablauf") +
        AUF.map(a => {
          const hier = a.id === S.seite;
          const [wort, kl] = hier ? ["du bist hier", "hier"] : erledigt(a.id) ? ["✓ fertig", "fertig"] : offen(a.id) ? ["offen", "offen"] : a.frei === "ansage" ? ["öffnet auf Ansage", "ansage"] : a.frei === "wenn" ? [a.wennKurz || "öffnet später", "antwort"] : ["öffnet nach deiner Antwort", "antwort"];
          return zeile(a.id, a.nr, a.kurz, wort, kl + (a.extra ? " eckig" : ""), (a.extra ? (a.kicker ? "" : "Extra: ") : "Auftrag " + a.nr + ": ") + a.kurz + (a.form ? ", " + a.form : "") + (a.extra || !a.min ? "" : ", " + a.min + " Minuten") + ", " + wort.replace("✓ ", ""), a.extra ? (a.regform || "freiwillig") : zeit(a));
        }).join("");
      if (GESCHW.length < 2) r.innerHTML = '<p class="ab-regtitel">Dieses Blatt' + (C.minuten ? " · " + C.minuten + " Minuten" : "") + "</p><ol>" + eigene + "</ol>";
      else {
        /* Modul mit mehreren Blättern: je Blatt ein Reiter zum Auf- und Zuklappen. Offen ist zuerst das eigene Blatt; ein Tipp auf einen anderen Reiter zeigt dessen Aufträge, ein zweiter Tipp führt hin. */
        const st = B.stand(), kurzNr = n => n.replace(/^[A-Z]+(?=\d)/, "");
        r.innerHTML = '<p class="ab-regtitel">' + esc(MODUL ? MODUL.nr + " · " + MODUL.titel : "Dieses Modul") + '</p><div class="ab-mod">' + GESCHW.map(g => {
          const ich = g.nr === C.nr, auf = !!AUFKL[g.nr], s = st[g.nr], fertig = ich ? (runden.length > 0 && runden.every(a => erledigt(a.id))) : !!(s && s.von && s.fertig >= s.von);
          const wort = ich ? "dieses Blatt" : fertig ? "✓ fertig" : s && s.fertig ? s.fertig + " von " + s.von : "";
          const innen = ich ? eigene : '<li><a class="ab-modlink" href="' + esc(g.datei) + '"><span class="ab-nr" aria-hidden="true">D</span><span><b>Deckblatt</b></span></a></li>' +
            (g.auf || []).map(x => '<li><a class="ab-modlink" href="' + esc(g.datei) + "#" + esc(x[0]) + '"><span class="ab-nr" aria-hidden="true">' + esc(x[1]) + "</span><span><b>" + esc(x[2]) + "</b></span></a></li>").join("");
          return '<section class="ab-modblatt' + (ich ? " ich" : "") + (fertig ? " fertig" : "") + '"><h2><button type="button" class="ab-modtab" data-mod="' + esc(g.nr) + '" aria-expanded="' + auf + '" aria-controls="mod-' + esc(g.nr.replace(/\W/g, "")) + '">' +
            '<span class="ab-modnr">' + esc(kurzNr(g.nr)) + '</span><span class="ab-modname"><b>' + esc(g.kurz) + "</b>" + (wort ? '<small class="ab-st">' + esc(wort) + "</small>" : "") + '</span><span class="ab-modpfeil" aria-hidden="true">' + (auf ? "−" : "+") + "</span></button></h2>" +
            '<ol id="mod-' + esc(g.nr.replace(/\W/g, "")) + '"' + (auf ? "" : " hidden") + ">" + innen + "</ol></section>";
        }).join("") + "</div>";
      }
      const unten = $("abunten");
      if (QUER() && !SCHMAL()) { r.insertAdjacentHTML("beforeend", werkzeuge()); unten.innerHTML = ""; } else unten.innerHTML = werkzeuge();
      r.scrollLeft = sl; r.scrollTop = st;
    }
    const blattzeile = () => '<div class="ab-zeile"><span>Gemeinschaftskunde · 1. Halbjahr</span><span><b>' + esc(C.nr) + "</b> · Arbeitsblatt</span><span>Datum: " + new Date().toLocaleDateString("de-DE") + "</span></div>";
    function akopf(a) {
      return '<header class="ab-akopf' + (a.extra ? " eckig" : "") + '"><span class="ab-nr" aria-hidden="true">' + a.nr + '</span><div><p class="ab-kicker">' + (a.extra ? (a.kicker || "Extra · freiwillig") : "Arbeitsauftrag " + a.nr) + '</p><h1 class="ab-titel">' + esc(a.name) + "</h1>" +
        '<p class="ab-meta">' + (a.extra ? (a.form || "").split(" · ") : [formKurz(a)]).filter(Boolean).map(x => "<span>" + esc(x) + "</span>").join("") + (a.extra || !a.min ? "" : "<span>" + a.min + " Minuten</span>") + (a.marke ? '<span class="ab-marke">' + esc(a.marke) + "</span>" : "") + "</p></div></header>";
    }
    function tuer(a) {
      const ans = a.frei === "ansage";
      return '<div class="ab-zu"><p class="ab-zu-t">' + (ans ? "Dieser Auftrag öffnet auf Ansage." : (a.kicker ? "Dieses Blatt" : "Dieser Auftrag") + (a.frei === "wenn" ? " öffnet später." : " öffnet nach deiner Antwort.")) + "</p>" +
        (ans ? "<p>Warte, bis deine Lehrkraft sagt, dass es weitergeht. So bleibt die Klasse beisammen.</p>" + (a.gleich ? "<p><b>Darum geht es gleich:</b> " + esc(a.gleich) + "</p>" : "") : "<p>" + esc(a.fehlt || "") + "</p>") +
        '<div class="ab-reihe">' + (ans ? '<button type="button" class="btn primary" data-frei="' + a.id + '">' + (a.extra ? esc(a.kurz) : "Auftrag " + a.nr) + " öffnen</button>" : (a.frei === "wenn" ? "" : '<button type="button" class="btn primary" data-geh="' + a.nach + '">Zu Auftrag ' + A(a.nach).nr + "</button>") + '<button type="button" class="btn still" data-frei="' + a.id + '">Auf Ansage trotzdem öffnen</button>') + "</div></div>";
    }
    function fuss(a) {
      if (!a) return '<a class="btn" href="' + HEFTER + '">‹ Zum Hefter</a><button type="button" class="btn primary" data-geh="' + AUF[0].id + '">' + AUF[0].nr + " " + esc(AUF[0].kurz) + " ›</button>";
      const i = AUFI(a.id), d = AUF[i - 1], n = AUF[i + 1];
      return '<button type="button" class="btn" data-geh="' + (d ? d.id : "start") + '">‹ ' + (d ? d.nr + " " + esc(d.kurz) : "Deckblatt") + "</button><span></span>" +
        (n ? '<button type="button" class="btn primary" data-geh="' + n.id + '" data-durch="' + a.id + '">' + n.nr + " " + esc(n.kurz) + " ›</button>" : (PLATZ.danach && PLATZ.danach.datei ? '<a class="btn primary" href="' + esc(PLATZ.danach.datei) + '" data-durch="' + a.id + '">Nächstes Blatt: ' + esc(PLATZ.danach.nr) + " ›</a>" : '<a class="btn primary" href="' + HEFTER + '" data-durch="' + a.id + '">Zum Hefter ›</a>'));
    }
    /* Deckblatt: was sich mit dem Stand ändert (Knöpfe, Ablauf) */
    function deckblatt() {
      const naechst = runden.find(a => !erledigt(a.id)), begonnen = runden.some(a => erledigt(a.id)) || !!S.zuletzt;
      const k = doc.querySelector("[data-deck=knoepfe]");
      if (k) k.innerHTML = '<button type="button" class="btn primary" data-geh="' + AUF[0].id + '">Los geht’s: Auftrag ' + AUF[0].nr + " →</button>" + (begonnen && naechst && naechst.id !== AUF[0].id ? '<button type="button" class="btn" data-geh="' + naechst.id + '">Weiter, wo du warst: Auftrag ' + naechst.nr + "</button>" : "");
      const t = doc.querySelector("[data-deck=ablauf]");
      if (t && !t.firstChild) t.innerHTML = '<table class="ab-ablauf"><thead><tr><th scope="col">Nr.</th><th scope="col">Arbeitsauftrag</th><th scope="col">Sozialform</th><th scope="col">Minuten</th></tr></thead><tbody>' +
        runden.map(a => "<tr><td>" + a.nr + "</td><td>" + esc(a.name) + '</td><td class="form">' + esc(a.form || "") + "</td><td>" + (a.min || "") + "</td></tr>").join("") + (C.minuten ? "<tr><td></td><td>zusammen</td><td></td><td>" + C.minuten + "</td></tr>" : "") + "</tbody></table>" +
        (AUF.some(a => a.extra && !a.kicker) ? '<p class="ab-hinweis" style="margin-top:.5rem">Dazu ein Extra: freiwillig' + (C.minuten ? " und außerhalb der " + C.minuten + " Minuten" : "") + ".</p>" : "");
    }
    function zeigen(fokus) {
      const a = A(S.seite), zu = !!a && !offen(a.id);
      doc.querySelectorAll("#main > section[data-seite]").forEach(s => { s.hidden = s.getAttribute("data-seite") !== S.seite || zu; });
      $("abblattkopf").innerHTML = blattzeile() + (a ? akopf(a) : "");
      $("abtuer").innerHTML = zu ? tuer(a) : "";
      $("abfuss").innerHTML = fuss(a);
      doc.querySelector(".ab-rahmen").classList.toggle("schmal", SCHMAL());
      if (!a) deckblatt();
      register(true); kopf();
      doc.title = (a ? a.nr + " " + a.kurz + " – " : "") + C.nr + " · " + C.titel + " · GK-Labor";
      try { doc.dispatchEvent(new CustomEvent("gk:zeigen", { detail: { seite: S.seite, offen: !zu } })); } catch (e) {}
      if (fokus) { window.scrollTo(0, 0); const m = $("main"); try { m.focus({ preventScroll: true }); } catch (e) { m.focus(); } }
    }
    function geh(id, ausHash) {
      let ziel = null;
      if (id !== "start" && !A(id)) { const z = C.anker ? C.anker(id) : null, e = doc.getElementById(id), sek = e && e.closest("#main > section[data-seite]"); if (z && A(z)) id = z; else if (sek) { ziel = e; id = sek.getAttribute("data-seite"); } else id = "start"; }
      S.seite = id; if (id !== "start") { S.zuletzt = id; sichern(); }
      if (!ausHash) { try { history.replaceState(null, "", id === "start" ? location.pathname + location.search : "#" + id); } catch (e) {} }
      zeigen(true); melden();
      if (ziel && !ziel.closest("[hidden]")) { try { ziel.scrollIntoView({ block: "start" }); } catch (e) {} }
    }
    /* Der Hefter erfährt erst etwas, wenn im Blatt gearbeitet wurde: Das Deckblatt allein ist noch kein Stand. */
    function melden() { const f = runden.filter(a => erledigt(a.id)).length; if (!f && !S.zuletzt) return; B.melde(C.nr, { fertig: f, von: runden.length, satz: C.satz ? C.satz() : "" }); }
    let WARTE = 0;
    function auffrischen() { clearTimeout(WARTE); WARTE = setTimeout(() => { register(false); melden(); }, 250); }

    doc.addEventListener("click", ev => {
      const mt = ev.target.closest && ev.target.closest("[data-mod]");
      if (mt) { const n = mt.getAttribute("data-mod"); AUFKL[n] = !AUFKL[n]; register(true); const neu = doc.querySelector('[data-mod="' + n + '"]'); if (neu) neu.focus(); return; }
      const t = ev.target.closest && ev.target.closest("[data-geh],[data-frei],[data-blatt],[data-durch]"); if (!t) { if (ev.target.closest && ev.target.closest("#main")) auffrischen(); return; }
      if (t.hasAttribute("data-durch") && offen(t.getAttribute("data-durch"))) { S.durch[t.getAttribute("data-durch")] = true; sichern(); melden(); }   // nur ein offener Auftrag gilt mit dem Weiterblättern als erledigt
      if (t.hasAttribute("data-geh")) { ev.preventDefault(); geh(t.getAttribute("data-geh")); }
      else if (t.hasAttribute("data-frei")) { S.frei[t.getAttribute("data-frei")] = true; sichern(); zeigen(true); }
      else if (t.hasAttribute("data-blatt")) {
        const w = t.getAttribute("data-blatt");
        if (w === "frage") { FRAGE = true; register(true); const j = doc.querySelector('[data-blatt="ja"]'); if (j) j.focus(); }
        else if (w === "nein") { FRAGE = false; register(true); const f = doc.querySelector('[data-blatt="frage"]'); if (f) f.focus(); }
        else if (w === "ja" && C.loesch) {   /* wie bisher je Modul (PW.loescheModul): Die Stationen teilen sich Lernstand und Merkstände */
          try { C.loesch.blaetter.forEach(n => { localStorage.removeItem("gk-blatt-" + n.toLowerCase() + ":v1"); B.vergiss(n); }); history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
          window.PW.loescheModul(C.loesch.modul, false);
        }
        else if (w === "ja") { const re = new RegExp(C.schluessel), weg = []; try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k === KEY || re.test(k)) weg.push(k); } weg.forEach(k => localStorage.removeItem(k)); } catch (e) {} B.vergiss(C.nr); try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {} location.reload(); }
      }
    });
    doc.addEventListener("click", ev => { const m = ev.target.closest && ev.target.closest("[data-merk]"); if (!m) return; const k = doc.querySelector(".merk-knopf"); if (k) k.click(); });
    try { new MutationObserver(() => { doc.querySelector(".ab-rahmen").classList.toggle("schmal", SCHMAL()); register(true); kopf(); }).observe(doc.body, { attributes: true, attributeFilter: ["class"] }); } catch (e) {}
    doc.addEventListener("input", ev => { if (ev.target.closest && ev.target.closest("#main")) auffrischen(); });
    doc.addEventListener("change", ev => { if (ev.target.closest && ev.target.closest("#main")) auffrischen(); });
    window.addEventListener("hashchange", () => geh((location.hash || "").slice(1) || "start", true));
    let BREIT = QUER(); window.addEventListener("resize", () => { if (QUER() !== BREIT) { BREIT = QUER(); register(true); } });
    doc.documentElement.classList.add("js");
    geh((location.hash || "").slice(1) || "start", true);
    return { geh: geh, erledigt: erledigt, stand: () => S };
  };
})();
