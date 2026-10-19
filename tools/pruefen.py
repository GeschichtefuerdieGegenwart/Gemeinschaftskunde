#!/usr/bin/env python3
"""Prüfkette Politik-Werkstatt: lädt jede Seite über file://, sammelt Konsolenfehler,
misst waagerechtes Scrollen bei 1440/1280/1024/768/390, prüft Textgrößen und Tippziele,
macht Bildschirmfotos (1440, 1280x720 Beamer, 390). Aufruf: python3 tools/pruefen.py [ausgabeordner]"""
import sys, os, json
from playwright.sync_api import sync_playwright

WURZEL = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SEITEN = ['index.html', 'parteien-wahlen/station1.html', 'parteien-wahlen/station2.html', 'parteien-wahlen/station3.html',
          'parteien-wahlen/station4.html', 'parteien-wahlen/station5.html', 'zusammenfassung.html', 'vertiefung.html', 'lehrkraft.html', 'musterbuch.html']
BREITEN = [1440, 1280, 1024, 768, 390]
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(WURZEL, 'tools', 'fotos')
os.makedirs(OUT, exist_ok=True)

JS_PRUEF = """() => {
  const probleme = [];
  const sx = document.documentElement.scrollWidth, cw = document.documentElement.clientWidth;
  if (sx > cw + 1) probleme.push('waagerechtes Scrollen: ' + sx + ' > ' + cw);
  const alle = document.querySelectorAll('body *');
  let klein = 0, zielKlein = 0;
  for (const e of alle) {
    const cs = getComputedStyle(e);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    if (e.closest('details:not([open])') && !e.matches('summary') && !e.closest('summary')) continue;
    const hatText = [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
    if (hatText && parseFloat(cs.fontSize) < 16 && !e.closest('svg') && !e.classList.contains('sr-only')) klein++;
    if (e.matches('a,button,input:not([type=radio]):not([type=checkbox]),label.opt,summary')) {
      const r = e.getBoundingClientRect(); if (r.width && r.height && (r.height < 44 || r.width < 44)) zielKlein++;
    }
  }
  if (klein) probleme.push('Text unter 16px: ' + klein + ' Elemente');
  if (zielKlein) probleme.push('Tippziele unter 44px: ' + zielKlein);
  const h = document.querySelector('h1'); if (h) { const lines = Math.round(h.getBoundingClientRect().height / parseFloat(getComputedStyle(h).lineHeight)); if (lines > 2) probleme.push('H1 hat ' + lines + ' Zeilen'); }
  return probleme;
}"""

bericht = {}
with sync_playwright() as p:
    b = p.chromium.launch(args=['--no-sandbox'])
    for seite in SEITEN:
        url = 'file://' + os.path.join(WURZEL, seite)
        eintrag = {'konsole': [], 'breiten': {}}
        for br in BREITEN:
            hoehe = 720 if br == 1280 else 900
            ctx = b.new_context(viewport={'width': br, 'height': hoehe}, device_scale_factor=1)
            pg = ctx.new_page()
            pg.on('console', lambda m, e=eintrag: e['konsole'].append(m.type + ': ' + m.text) if m.type in ('error', 'warning') else None)
            pg.on('pageerror', lambda ex, e=eintrag: e['konsole'].append('pageerror: ' + str(ex)))
            pg.goto(url); pg.wait_for_timeout(600)
            probleme = pg.evaluate(JS_PRUEF)
            if br == 1280:
                sh = pg.evaluate('document.documentElement.scrollHeight')
                probleme.append('Beamer: Seitenhöhe ' + str(sh) + ' px (ohne Scrollen bis 720)')
            eintrag['breiten'][br] = probleme
            if br in (1440, 1280, 390):
                name = seite.replace('/', '_').replace('.html', '') + '_' + str(br) + '.png'
                pg.screenshot(path=os.path.join(OUT, name), full_page=(br != 1280))
            ctx.close()
        eintrag['konsole'] = sorted(set(eintrag['konsole']))
        bericht[seite] = eintrag
    b.close()

with open(os.path.join(OUT, 'bericht.json'), 'w', encoding='utf-8') as f:
    json.dump(bericht, f, ensure_ascii=False, indent=1)
for s, e in bericht.items():
    print('==', s)
    for k in e['konsole']: print('  KONSOLE', k)
    for br, pr in e['breiten'].items():
        for x in pr: print('  ', br, x)
