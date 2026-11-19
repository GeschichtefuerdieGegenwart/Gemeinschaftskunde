/* ===== GK-Labor · Felder zum Hineinschreiben in den neu gebauten Blättern (Modul G) =====
   Jedes Feld trägt data-feld="name". Gespeichert wird je Blatt ein Eintrag im localStorage (nur auf diesem Gerät, try/catch);
   er geht mit »Stand als Datei sichern« mit und mit »Eingaben löschen« weg. Keine Namen, keine Auswertung. */
(function () {
  "use strict";
  var KEY = "", D = {};
  function lade() { try { var j = JSON.parse(localStorage.getItem(KEY) || "null"); D = j && typeof j === "object" ? j : {}; } catch (e) { D = {}; } }
  function sichere() { try { localStorage.setItem(KEY, JSON.stringify(D)); } catch (e) {} }
  function setze(f) {
    var n = f.getAttribute("data-feld"), w = D[n];
    if (f.type === "radio") f.checked = w === f.value;
    else if (f.type === "checkbox") f.checked = !!w;
    else f.value = w == null ? "" : w;
  }
  function lies(f) {
    var n = f.getAttribute("data-feld");
    if (f.type === "radio") { if (f.checked) D[n] = f.value; }
    else if (f.type === "checkbox") D[n] = f.checked;
    else D[n] = f.value;
    sichere();
  }
  window.GKFeld = {
    start: function (key) {
      KEY = key; lade();
      document.querySelectorAll("[data-feld]").forEach(setze);
      document.addEventListener("input", function (ev) { if (ev.target.hasAttribute && ev.target.hasAttribute("data-feld")) lies(ev.target); });
      document.addEventListener("change", function (ev) { if (ev.target.hasAttribute && ev.target.hasAttribute("data-feld")) lies(ev.target); });
    },
    wert: function (n) { var w = D[n]; return typeof w === "string" ? w.trim() : w; }
  };
})();
