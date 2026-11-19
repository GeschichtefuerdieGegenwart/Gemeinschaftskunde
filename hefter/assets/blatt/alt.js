/* ===== GK-Labor · Brücke zwischen den Bausteinen der bisherigen Seiten (werkstatt.js und Co.) und dem Blatt =====
   Die Bausteine laufen unverändert. Diese Datei sorgt nur dafür, dass sie im Blatt zurechtkommen:
   1 Was ein Baustein an den <body> hängt (Merkzettel, Detailblatt, Klassenbild), kommt in eine Hülle .gkw – sonst hätte es kein Aussehen.
   2 Reiter der alten Seiten (PW.reiter) gibt es nicht mehr: Das Register blättert. Die Bausteine erfahren trotzdem, wann ihr Abschnitt zu sehen ist.
   3 Verweise auf die alten Seiten zeigen auf die neuen Blätter (window.GK_LINKS).
   4 Halbjahresleiste und Schloss der alten Zusammenfassungen (HJ) sind durch Hefter und Tür ersetzt. */
(function () {
  "use strict";
  var doc = document, PW = window.PW = window.PW || {};
  var ich = doc.currentScript, WURZEL = (ich && ich.getAttribute("data-wurzel")) || "", IM_BLATT = !!doc.getElementById("main") && !!doc.querySelector(".ab-rahmen");
  window.HJ = window.HJ || { leiste: function () {}, schloss: function () {}, sperre: function () {}, frei: function () { return true; } };

  /* ---------- 3 Verweise ---------- */
  var L = window.GK_LINKS || [];
  function ziel(href) {
    if (!href || /^(https?:|mailto:|#|javascript:|data:|blob:)/.test(href)) return undefined;
    var m = /^([^#?]*)(\?[^#]*)?(#.*)?$/.exec(href), pfad = m[1], anker = m[3] || "";
    for (var i = 0; i < L.length; i++) {
      var r = new RegExp(L[i][0]).exec(pfad); if (!r) continue;
      if (L[i][1] === null) return null;
      var z = L[i][1].replace(/\$(\d)/g, function (_, n) { return r[+n] || ""; });
      if (z.indexOf("#") >= 0 && anker) z = z.split("#")[0] + anker;   // der Anker des Verweises geht vor
      else z += anker;
      return WURZEL + z;
    }
    return undefined;
  }
  function richte(a) {
    if (a.hasAttribute("data-gk")) return; a.setAttribute("data-gk", "1");
    var z = ziel(a.getAttribute("href"));
    if (z === undefined) return;
    if (z === null) { var s = doc.createElement("span"); s.textContent = a.textContent; a.replaceWith(s); return; }
    a.setAttribute("href", z); a.removeAttribute("onclick");
  }
  function alle(w) { if (w.nodeType !== 1) return; if (w.tagName === "A" && w.hasAttribute("href")) richte(w); w.querySelectorAll && w.querySelectorAll("a[href]").forEach(richte); }
  if (L.length) {
    alle(doc.body);
    try { new MutationObserver(function (ms) { ms.forEach(function (m) { [].forEach.call(m.addedNodes, alle); }); }).observe(doc.body, { childList: true, subtree: true }); } catch (e) {}
  }
  if (!IM_BLATT) return;

  /* ---------- 1 Hülle für lose Teile ---------- */
  var lose = doc.createElement("div"); lose.className = "gkw"; lose.id = "gkw-lose";
  var ton = doc.querySelector("#main > section.gkw[data-ton]"); if (ton) lose.setAttribute("data-ton", ton.getAttribute("data-ton"));
  doc.body.appendChild(lose);
  function eigen(n) { return n.nodeType !== 1 || n === lose || /^(SCRIPT|STYLE|LINK|NOSCRIPT|HEADER|MAIN)$/.test(n.tagName) || /(^|\s)ab-/.test(n.className || "") || n.id === "ab-fenster" || n.id === "ab-datei" || (n.tagName === "A" && n.hasAttribute("download")); }
  try { new MutationObserver(function (ms) { ms.forEach(function (m) { [].forEach.call(m.addedNodes, function (n) { if (n.parentNode === doc.body && !eigen(n)) lose.appendChild(n); }); }); }).observe(doc.body, { childList: true }); } catch (e) {}

  PW.intro = function () {};                                   // die Eröffnung von Modul 1 entfällt: Das Blatt beginnt still
  PW.rahmen = function () { if (PW.cajaKarten) PW.cajaKarten(); };   // Kopf, Navigation und Fuß stellt das Blatt; die Figur bleibt
  /* ---------- 2 Reiter ---------- */
  PW.reiter = function (liste, namen) {
    var ids = Object.keys(namen || {});
    if (liste) liste.hidden = true;
    doc.addEventListener("gk:zeigen", function (ev) {
      var s = doc.querySelector('#main > section[data-seite="' + ev.detail.seite + '"]'); if (!s || !liste) return;
      ids.forEach(function (id) { var e = doc.getElementById(id); if (e && s.contains(e)) { try { liste.dispatchEvent(new CustomEvent("reiter:wechsel", { detail: { id: id } })); } catch (x) {} } });
    });
    return { zeige: function (id) { if (window.BLATT) window.BLATT.geh(id); } };
  };
  /* Zeichnungen, die ihre Breite messen, rechnen neu, sobald ihr Auftrag zu sehen ist */
  doc.addEventListener("gk:zeigen", function () { setTimeout(function () { try { window.dispatchEvent(new Event("resize")); } catch (e) {} }, 0); });
})();
