/* ===== GK-Labor · Arbeitsblatt · gemeinsamer Kern · übernommen aus dem GGK-Labor (src/arbeitsblatt/ab.js) mit tools/schicht.py =====
   Platz im Hefter · Stand an den Hefter melden · Stand als Datei sichern und laden (Text als Rückfall) · Ansicht für den Beamer.
   Alles bleibt im Browser oder in der Datei: keine Anmeldung, kein Server, keine Namen.
   Wenige Tipps: Sichern ist ein Tipp (auch aus der Kopfzeile), Laden öffnet sofort die Dateiwahl; die Rückmeldung steht daneben, nicht in einem Fenster. */
(function () {
  "use strict";
  const doc = document, root = doc.documentElement;
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const H = window.GK_HEFTER || {};
  const einheit = () => root.getAttribute("data-einheit") || "";
  const E = () => H[einheit()] || null;
  const lies = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const schreib = (k, v) => { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } };
  const standKey = () => "gk-hefter-" + einheit() + ":v1";

  /* Platz im Hefter: »Blatt 7 von 11«, davor und danach */
  function platz(nr) {
    const e = E(); if (!e) return null;
    const i = e.blaetter.findIndex(b => b.nr === nr); if (i < 0) return null;
    return { i: i + 1, n: e.blaetter.length, blatt: e.blaetter[i], davor: e.blaetter[i - 1] || null, danach: e.blaetter[i + 1] || null, name: e.name, start: e.start };
  }
  /* Jedes Blatt meldet dem Hefter nur: wie viele Aufträge fertig sind und – wenn vorhanden – den eigenen Satz zum Schluss. */
  function stand() { try { return JSON.parse(lies(standKey()) || "{}") || {}; } catch (e) { return {}; } }
  function melde(nr, d) {
    if (!E()) return; const s = stand(), alt = JSON.stringify(s[nr] || null);
    const neu = { fertig: d.fertig | 0, von: d.von | 0, satz: String(d.satz || "").slice(0, 400) };
    if (JSON.stringify(Object.assign({}, s[nr], neu)) === alt) return;
    s[nr] = Object.assign(neu, { zeit: new Date().toISOString().slice(0, 10) }); s._zuletzt = nr; schreib(standKey(), JSON.stringify(s));
  }
  function vergiss(nr) { const s = stand(); if (!(nr in s)) return; delete s[nr]; if (s._zuletzt === nr) delete s._zuletzt; schreib(standKey(), JSON.stringify(s)); }   // »Eingaben löschen« im Blatt: auch der Eintrag im Hefter geht

  /* ---------- Stand als Datei ---------- */
  function paket() {
    const e = E(), re = new RegExp(e.schluessel), daten = {};
    try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (re.test(k)) daten[k] = localStorage.getItem(k); } } catch (x) {}
    return JSON.stringify({ art: "gk-hefter", einheit: einheit(), name: e.name, version: 1, datum: new Date().toISOString(), daten: daten });
  }
  const dateiname = () => "Hefter-" + E().name.replace(/[^A-Za-zÄÖÜäöüß]+/g, "-") + "_" + new Date().toISOString().slice(0, 10) + ".json";
  let RUECK = "";   // letzte Rückmeldung zum Sichern oder Laden; bleibt stehen, auch wenn das Register neu gezeichnet wird
  function rueck(html) { RUECK = html || ""; doc.querySelectorAll("[data-ab-rueck]").forEach(p => { p.innerHTML = RUECK; }); }
  function sichern() {
    if (!E()) return false;
    const text = paket(), name = dateiname();
    try { const a = doc.createElement("a"); a.href = URL.createObjectURL(new Blob([text], { type: "application/json" })); a.download = name; doc.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); }
    catch (e) { textFenster(); return false; }
    rueck("<b>Gesichert:</b> " + esc(name) + ". Die Datei liegt bei deinen Downloads. Leg sie in deinen Ordner für Gemeinschaftskunde.");
    return true;
  }
  /* Der getippte Knopf zeigt kurz selbst, dass gesichert wurde – auch dort, wo die Werkzeuge gerade nicht zu sehen sind (Knopf in der Kopfzeile). */
  function kurz(t, text) {
    if (!t || t.hasAttribute("data-ab-alt")) return;
    t.setAttribute("data-ab-alt", t.textContent); t.textContent = text;
    setTimeout(() => { if (doc.contains(t)) t.textContent = t.getAttribute("data-ab-alt"); t.removeAttribute("data-ab-alt"); }, 3500);
  }
  /* Laden: eine einzige Dateiwahl für die ganze Seite. Sie bleibt bestehen, auch wenn Register oder Blatt neu gezeichnet werden. */
  let WAHL = null;
  function laden() {
    if (!E()) return;
    if (!WAHL) {
      WAHL = doc.createElement("input"); WAHL.type = "file"; WAHL.accept = "application/json,.json,text/plain"; WAHL.id = "ab-datei"; WAHL.tabIndex = -1;
      WAHL.setAttribute("aria-hidden", "true"); WAHL.style.cssText = "position:fixed;left:0;top:0;width:1px;height:1px;opacity:0;pointer-events:none";
      WAHL.addEventListener("change", () => {
        const f = WAHL.files && WAHL.files[0]; if (!f) return;
        const r = new FileReader();
        r.onload = () => { const m = uebernehmen(String(r.result || "")); if (m) rueck(esc(m)); };
        r.onerror = () => rueck("Die Datei ließ sich nicht lesen.");
        r.readAsText(f); WAHL.value = "";
      });
      doc.body.appendChild(WAHL);
    }
    WAHL.click();
  }
  function uebernehmen(text) {
    const e = E();
    try {
      const j = JSON.parse(text);
      if (!j || j.art !== "gk-hefter" || !j.daten || typeof j.daten !== "object") throw 0;
      if (j.einheit !== einheit()) return "Diese Datei gehört zum Hefter „" + (j.name || j.einheit) + "“. Hier ist der Hefter „" + e.name + "“.";
      const re = new RegExp(e.schluessel); let n = 0;
      Object.keys(j.daten).forEach(k => { if (re.test(k) && typeof j.daten[k] === "string" && schreib(k, j.daten[k])) n++; });
      if (!n) throw 0;
      location.reload(); return "";
    } catch (x) { return "Das passt nicht. Wähle die Datei, die mit „Hefter-“ beginnt und auf „.json“ endet."; }
  }
  /* Rückfall, wenn keine Datei geht (zum Beispiel in manchen Apps): der Stand als Text zum Kopieren und Einfügen */
  let VON = null;
  function textFenster() {
    if (!E()) return;
    let f = doc.getElementById("ab-fenster");
    if (!f) { f = doc.createElement("div"); f.id = "ab-fenster"; f.className = "ab-fenster nodruck"; doc.body.appendChild(f); }
    VON = doc.activeElement;
    f.innerHTML = '<div class="ab-fenster__blatt" role="dialog" aria-modal="true" aria-labelledby="ab-fenster-t"><h2 id="ab-fenster-t">Stand als Text</h2>' +
      "<p>Geht keine Datei? Kopiere diesen Text und sichere ihn in einer Notiz. Er enthält dasselbe wie die Datei.</p>" +
      '<textarea readonly id="ab-standtext" aria-label="Stand als Text">' + esc(paket()) + "</textarea>" +
      '<div class="ab-reihe"><button type="button" class="btn" data-ab="kopieren" data-fokus>Text kopieren</button><span class="ab-hinweis" id="ab-kopiert" role="status"></span></div>' +
      '<label for="ab-ladetext">Gesicherten Text hier einfügen und laden</label><textarea id="ab-ladetext"></textarea>' +
      '<p class="ab-hinweis" id="ab-lademeld" role="status" aria-live="polite"></p>' +
      '<div class="ab-reihe"><button type="button" class="btn" data-ab="text-laden">Text laden</button><button type="button" class="btn primary" data-ab="zu">Fertig</button></div></div>';
    f.hidden = false; const k = f.querySelector("[data-fokus]"); if (k) k.focus();
  }
  function fensterZu() { const f = doc.getElementById("ab-fenster"); if (f) { f.hidden = true; f.innerHTML = ""; } if (VON && doc.contains(VON)) VON.focus(); VON = null; }

  /* ---------- Ansicht für den Beamer (gilt für alle Blätter auf diesem Gerät) ---------- */
  const beamer = () => root.getAttribute("data-ansicht") === "beamer";
  function setzeBeamer(an) { if (an) root.setAttribute("data-ansicht", "beamer"); else root.removeAttribute("data-ansicht"); schreib("gk-ansicht", an ? "beamer" : ""); }
  if (lies("gk-ansicht") === "beamer") root.setAttribute("data-ansicht", "beamer");

  /* ---------- Druck: Schreibfelder werden zu Text auf Linien (ein Feld druckt sonst nur seinen sichtbaren Ausschnitt) ---------- */
  function vorDruck() {
    nachDruck();
    doc.querySelectorAll("main textarea").forEach(t => {
      if (t.closest("[hidden]") || !t.getClientRects().length) return;
      const d = doc.createElement("div"); d.className = "ab-druckfeld"; d.textContent = t.value;
      d.style.setProperty("--zeilen", String(Math.max(2, +t.getAttribute("rows") || 2)));
      t.insertAdjacentElement("afterend", d); t.classList.add("ab-druckweg");
    });
  }
  function nachDruck() { doc.querySelectorAll(".ab-druckfeld").forEach(d => d.remove()); doc.querySelectorAll(".ab-druckweg").forEach(t => t.classList.remove("ab-druckweg")); }
  window.addEventListener("beforeprint", vorDruck); window.addEventListener("afterprint", nachDruck);

  /* ---------- Werkzeuge: überall dieselben Knöpfe an derselben Stelle, offen sichtbar ---------- */
  function dateiKnoepfe(klasse) {
    return '<button type="button" class="btn' + (klasse ? " " + klasse : "") + '" data-ab="sichern">Stand als Datei sichern</button>' +
      '<button type="button" class="btn" data-ab="laden">Stand aus Datei laden</button>' +
      '<p class="ab-klein" data-ab-rueck aria-live="polite">' + RUECK + "</p>";
  }
  function werkzeuge(mitte, lizenz) {
    return '<div class="ab-werk nodruck">' + dateiKnoepfe() + (mitte || "") +
      '<label class="ab-haken"><input type="checkbox" data-ab="beamer"' + (beamer() ? " checked" : "") + "> Ansicht für den Beamer</label>" +
      '<button type="button" class="btn still" data-ab="text">Geht keine Datei? Stand als Text</button>' +
      '<p class="ab-klein">Alles bleibt auf diesem Gerät. Nichts wird gesendet.</p>' +
      (lizenz ? '<p class="ab-c">' + esc(lizenz) + "</p>" : "") + "</div>";
  }
  doc.addEventListener("click", ev => {
    const t = ev.target.closest && ev.target.closest("[data-ab]"); if (!t || t.tagName === "INPUT") return;
    const a = t.getAttribute("data-ab");
    if (a === "sichern") { if (sichern()) kurz(t, "✓ Gesichert"); }
    else if (a === "laden") laden();
    else if (a === "text") textFenster();
    else if (a === "zu") fensterZu();
    else if (a === "kopieren") { const ta = doc.getElementById("ab-standtext"), s = doc.getElementById("ab-kopiert"); ta.select(); let ok = false; try { ok = doc.execCommand("copy"); } catch (e) {} if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(ta.value).then(() => { s.textContent = "Kopiert."; }, () => { s.textContent = ok ? "Kopiert." : "Markiere den Text und kopiere ihn von Hand."; }); else s.textContent = ok ? "Kopiert." : "Markiere den Text und kopiere ihn von Hand."; }
    else if (a === "text-laden") { const m = uebernehmen((doc.getElementById("ab-ladetext") || {}).value || ""); if (m) doc.getElementById("ab-lademeld").textContent = m; }
  });
  doc.addEventListener("change", ev => {
    const t = ev.target; if (!t || !t.getAttribute) return;
    const a = t.getAttribute("data-ab");
    if (a === "beamer") setzeBeamer(t.checked);
  });
  doc.addEventListener("keydown", ev => { const f = doc.getElementById("ab-fenster"); if (f && !f.hidden && ev.key === "Escape") fensterZu(); });

  window.GKBlatt = { platz, stand, melde, vergiss, sichern, laden, werkzeuge, dateiKnoepfe, beamer, einheit: E, esc };
})();
/* ===== Ende des gemeinsamen Kerns ===== */

/* Öffentliche Fassung: Fehlt eine Bilddatei unter media/ (Bilder aus dem Unterrichtsmaterial liegen nur im Moodle-Kurs), steht dort ein gekennzeichneter Platzhalter. */
(function () {
  "use strict";
  var wurzel = (document.currentScript && document.currentScript.src || "").replace(/assets\/blatt\/ab\.js.*$/, "");
  function ersatz(img) { if (img.getAttribute("data-ersatz") || !/media\//.test(img.getAttribute("src") || "")) return; img.setAttribute("data-ersatz", "1"); img.src = wurzel + "media/platzhalter.svg"; }
  document.addEventListener("error", function (ev) { if (ev.target && ev.target.tagName === "IMG") ersatz(ev.target); }, true);
  function pruef() { [].forEach.call(document.images, function (i) { if (i.complete && i.naturalWidth === 0) ersatz(i); }); }
  pruef(); window.addEventListener("load", pruef);
})();
