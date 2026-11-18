/* Prüft assets/js/halbjahr.js gegen den Bestand: Fragen der Wiederholung, Links und Zusammenfassungen.
   Aufruf: node tools/halbjahr_test.js (ohne Abhängigkeiten) */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const wurzel = path.join(__dirname, '..');
const lies = (p) => fs.readFileSync(path.join(wurzel, p), 'utf8');
const ctx = { window: {}, localStorage: { getItem: () => null, setItem() {}, removeItem() {} }, document: { documentElement: { setAttribute() {} } } };
vm.createContext(ctx); vm.runInContext(lies('assets/js/halbjahr.js'), ctx);
const HJ = ctx.window.HJ;
let fehler = 0; const pruefe = (ok, text) => { if (!ok) { fehler++; console.log('FEHLER ' + text); } };

/* 1 · Fragen je Bereich wie in der Wiederholung */
const wdh = lies('assets/js/wiederholung.js');
const bereiche = {};
for (const m of wdh.matchAll(/\{ id: '(\w+)', titel: '[^']+'[^\n]*fragen: \[([\s\S]*?)\n    \] ?\}/g)) bereiche[m[1]] = [...m[2].matchAll(/\{ id: '(\w+)', f:/g)].map((x) => x[1]);
pruefe(Object.keys(bereiche).join() === Object.keys(HJ.WDH).join(), 'Bereiche: ' + Object.keys(bereiche) + ' ≠ ' + Object.keys(HJ.WDH));
for (const b of Object.keys(HJ.WDH)) pruefe((bereiche[b] || []).join() === HJ.WDH[b].join(), 'Fragen in ' + b + ': ' + bereiche[b] + ' ≠ ' + HJ.WDH[b]);

/* 2 · Jede Seite und jede Zusammenfassung gibt es */
const datei = (u) => u.split('#')[0];
let n = 0;
for (const e of HJ.einheiten) {
  for (const u of [e.url, e.zf, e.pdf].filter(Boolean)) { n++; pruefe(fs.existsSync(path.join(wurzel, datei(u))), e.id + ': ' + u + ' fehlt'); }
  for (const t of e.teile) if (t.url) { n++; pruefe(fs.existsSync(path.join(wurzel, datei(t.url))), e.id + '/' + t.id + ': ' + t.url + ' fehlt'); }
  for (const x of e.extra || []) { n++; pruefe(fs.existsSync(path.join(wurzel, datei(x[1]))), e.id + ': ' + x[1] + ' fehlt'); }
  pruefe(HJ.phasen.some((p) => p.id === e.phase), e.id + ': Abschnitt ' + e.phase + ' unbekannt');
}
/* 3 · Jede Zusammenfassung trägt die Sperre ihrer Einheit */
for (const e of HJ.einheiten.filter((x) => x.zf)) {
  const t = lies(datei(e.zf));
  pruefe(t.includes("HJ.sperre('" + e.id + "')") && t.includes("'zf-schloss'), '" + e.id + "'"), e.zf + ': Sperre für ' + e.id + ' fehlt');
  pruefe(t.includes('zf-schutz'), e.zf + ': kein geschützter Inhalt (zf-schutz)');
}
/* 4 · Speicherschlüssel der Freigabe gehören zur richtigen Einheit (PW.modulVon) */
const ws = lies('assets/js/werkstatt.js');
pruefe(/k\.indexOf\('frei-'\) === 0\) return \(\{ m1: 'm1', m2: 'm2', ka: 'ka' \}\)/.test(ws), 'PW.modulVon kennt frei-* nicht');

console.log(fehler ? fehler + ' Fehler' : 'halbjahr_test: alles in Ordnung (' + Object.keys(HJ.WDH).length + ' Bereiche, ' + n + ' Links, ' + HJ.einheiten.filter((x) => x.zf).length + ' Sperren)');
process.exit(fehler ? 1 : 0);
