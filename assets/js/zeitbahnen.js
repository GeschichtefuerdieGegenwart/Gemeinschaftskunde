/* Politik-Werkstatt · Muster Y2 »Zeitstrahl in Bahnen« (v7, ersetzt Y in Station 3; jetzt in der Vertiefung)
   Entwurf aus Claude Design: je Partei eine Bahn, die sich bis zum gewählten Jahr füllt; 1933–1945 als schwarzer Block;
   eine eigene Bahn für das Parteienrecht (§). Regler ziehen oder Ereignis tippen; die Karte rechts erklärt das Ereignis.
   Telefon (< 900 px): eine Spalte als Liste, der Regler bleibt oben stehen.
   Bewegung: Füllung per scaleX (220 ms) nur beim Tippen; beim Ziehen folgt sie dem Finger ohne Verzögerung. */
(function () {
  'use strict';
  var PW = window.PW = window.PW || {};
  var J0 = 1860, J1 = 2030;
  function X(j) { return ((j - J0) / (J1 - J0) * 100).toFixed(3) + '%'; }
  function bahn(id) { for (var i = 0; i < PW.zeitBahnen.length; i++) if (PW.zeitBahnen[i].id === id) return PW.zeitBahnen[i]; return null; }

  PW.zeitbahnen = function (box, start) {
    if (!box || !PW.zeitBahnen) return;
    var B = PW.zeitBahnen, E = PW.zeitEreignisse, jahr = start || 1949;
    box.textContent = '';
    var w = PW.el('div', { 'class': 'zb' });

    /* Karte mit Jahr und Ereignis */
    var karte = PW.el('div', { 'class': 'zb-karte', 'aria-live': 'polite' });
    var kJahr = PW.el('span', { 'class': 'zb-jahr' }), kSeit = PW.el('span', { 'class': 'zb-seit' });
    var kT = PW.el('h3', {}), kD = PW.el('p', {}), kAktiv = PW.el('p', { 'class': 'zb-aktiv' });
    karte.appendChild(PW.el('div', { 'class': 'zb-karte-kopf' }, [kJahr, kSeit]));
    karte.appendChild(kT); karte.appendChild(kD); karte.appendChild(kAktiv);

    /* Regler */
    var reglerId = 'zb-regler-' + Math.random().toString(36).slice(2, 7);
    var regler = PW.el('input', { id: reglerId, type: 'range', min: '1863', max: '2025', step: '1', value: String(jahr) });
    var sJahr = PW.el('span', { 'class': 'zb-steuer-jahr', 'aria-hidden': 'true' });
    var steuer = PW.el('div', { 'class': 'zb-steuer' }, [PW.el('label', { 'for': reglerId, text: 'Jahr ziehen' }), regler, sJahr]);

    /* Legende */
    var legende = PW.el('ul', { 'class': 'zb-legende' }, [
      PW.el('li', { html: '<i class="zb-l-punkt" aria-hidden="true"></i>Gründung, Umbenennung, Zusammenschluss' }),
      PW.el('li', { html: '<i class="zb-l-recht" aria-hidden="true">§</i>Parteienrecht und Wahlrecht' }),
      PW.el('li', { html: '<i class="zb-l-ns" aria-hidden="true"></i>1933–1945: NS-Diktatur, keine freien Parteien' })
    ]);

    /* Breite Ansicht: Bahnen */
    var bahnen = PW.el('div', { 'class': 'zb-bahnen' });
    var spurRaum = PW.el('div', { 'class': 'zb-spuren' });
    var fuellungen = [], marken = [];
    B.forEach(function (b) {
      var reihe = PW.el('div', { 'class': 'zb-reihe' });
      reihe.appendChild(PW.el('div', { 'class': 'zb-name' }, [PW.el('b', { text: b.name }), PW.el('span', { text: b.seit })]));
      var spur = PW.el('div', { 'class': 'zb-spur' });
      b.von.forEach(function (v) {
        var seg = PW.el('div', { 'class': 'zb-seg', style: 'left:' + X(v[0]) + ';width:calc(' + X(v[1]) + ' - ' + X(v[0]) + ')' });
        var f = PW.el('div', { 'class': 'zb-fuell' }); seg.appendChild(f);
        fuellungen.push({ el: f, v: v });
        spur.appendChild(seg);
      });
      reihe.appendChild(spur);
      reihe.appendChild(PW.el('div', { 'class': 'zb-sitze' }, [PW.el('i', { style: 'background:' + b.farbe, 'aria-hidden': 'true' }), PW.el('span', { text: b.sitze + ' Sitze' })]));
      reihe._spur = spur; reihe._id = b.id;
      spurRaum.appendChild(reihe);
    });
    var recht = PW.el('div', { 'class': 'zb-reihe zb-reihe--recht' });
    recht.appendChild(PW.el('div', { 'class': 'zb-name' }, [PW.el('b', { text: 'Parteienrecht' }), PW.el('span', { text: 'Grundgesetz, Verbote, Urteile' })]));
    var rechtSpur = PW.el('div', { 'class': 'zb-spur zb-spur--recht' }); recht.appendChild(rechtSpur); recht.appendChild(PW.el('div', { 'class': 'zb-sitze' }));
    spurRaum.appendChild(recht);
    /* Marken */
    E.forEach(function (e, i) {
      var ziel = e.bahn === 'recht' ? rechtSpur : null;
      if (!ziel) spurRaum.querySelectorAll('.zb-reihe').forEach(function (r) { if (r._id === e.bahn) ziel = r._spur; });
      var m = PW.el('button', { type: 'button', 'class': 'zb-marke' + (e.bahn === 'recht' ? ' zb-marke--recht' : ''), style: 'left:' + X(e.j) + (e.bahn === 'recht' ? ';--reihe:' + (e.reihe || 0) : ''), 'aria-label': e.j + ': ' + e.t }, [PW.el('span', { 'aria-hidden': 'true', text: e.bahn === 'recht' ? '§' : '' })]);
      m.addEventListener('click', function () { setze(e.j, true); });
      marken.push({ el: m, e: e });
      ziel.appendChild(m);
    });
    /* NS-Block und Jahreslinie über alle Bahnen */
    var ueber = PW.el('div', { 'class': 'zb-ueber', 'aria-hidden': 'true' });
    ueber.appendChild(PW.el('div', { 'class': 'zb-ns', style: 'left:' + X(1933) + ';width:calc(' + X(1945) + ' - ' + X(1933) + ')' }, [PW.el('b', { text: '1933' }), PW.el('span', { text: 'bis' }), PW.el('b', { text: '1945' })]));
    var linie = PW.el('div', { 'class': 'zb-linie' }, [PW.el('span', {})]);
    ueber.appendChild(linie);
    var achse = PW.el('div', { 'class': 'zb-achse', 'aria-hidden': 'true' });
    for (var t = 1860; t <= 2020; t += 20) achse.appendChild(PW.el('span', { 'class': t % 40 === 0 ? 'zb-tick zb-tick--gross' : 'zb-tick', style: 'left:' + X(t), text: String(t) }));
    var spurRahmen = PW.el('div', { 'class': 'zb-rahmen' }, [spurRaum, ueber]);
    bahnen.appendChild(spurRahmen);
    bahnen.appendChild(PW.el('div', { 'class': 'zb-achse-reihe' }, [PW.el('div', {}), achse, PW.el('div', {})]));

    /* Schmale Ansicht: Liste */
    var liste = PW.el('ol', { 'class': 'zb-liste' });
    var eintraege = [];
    E.forEach(function (e) {
      if (e.j === 1945) liste.appendChild(PW.el('li', { 'class': 'zb-liste-ns' }, [PW.el('b', { text: '1933–1945' }), PW.el('span', { text: 'NS-Diktatur: keine freien Parteien' })]));
      var b = bahn(e.bahn);
      var knopf = PW.el('button', { type: 'button', 'class': 'zb-liste-knopf' }, [PW.el('i', { 'class': e.bahn === 'recht' ? 'zb-l-recht' : 'zb-l-punkt', 'aria-hidden': 'true', text: e.bahn === 'recht' ? '§' : '' }), PW.el('b', { text: e.j + ' · ' + (b ? b.name : 'Recht') }), PW.el('span', { text: e.t })]);
      var det = PW.el('p', { 'class': 'zb-liste-text', text: e.d, hidden: 'hidden' });
      knopf.addEventListener('click', function () { setze(e.j, true); });
      var li = PW.el('li', {}, [knopf, det]);
      eintraege.push({ li: li, det: det, k: knopf, e: e });
      liste.appendChild(li);
    });

    function setze(j, getippt) {
      jahr = Math.max(1863, Math.min(2025, j));
      regler.value = String(jahr);
      w.classList.toggle('ist-getippt', !!getippt);
      fuellungen.forEach(function (f) {
        var a = f.v[0], z = f.v[1];
        var anteil = jahr <= a ? 0 : jahr >= z ? 1 : (jahr - a) / (z - a);
        f.el.style.transform = 'scaleX(' + anteil.toFixed(3) + ')';
      });
      linie.style.left = X(jahr); linie.firstChild.textContent = String(jahr);
      var ev = E.filter(function (e) { return e.j <= jahr; }).pop() || E[0];
      marken.forEach(function (m) { m.el.classList.toggle('ist-da', m.e.j <= jahr); m.el.classList.toggle('ist-aktuell', m.e === ev); m.el.setAttribute('aria-pressed', m.e === ev ? 'true' : 'false'); });
      eintraege.forEach(function (x) { var akt = x.e === ev; x.det.hidden = !akt; x.li.classList.toggle('ist-aktuell', akt); x.li.classList.toggle('ist-spaeter', x.e.j > jahr); x.k.setAttribute('aria-expanded', akt ? 'true' : 'false'); });
      kJahr.textContent = String(jahr); sJahr.textContent = String(jahr);
      kSeit.textContent = ev.j === jahr ? 'Ereignis in diesem Jahr' : 'letztes Ereignis: ' + ev.j;
      kT.textContent = ev.t; kD.textContent = ev.d;
      var aktiv = B.filter(function (b) { return b.von.some(function (v) { return jahr >= v[0] && (jahr < v[1] || v[1] === 2025); }); }).map(function (b) { return b.name; });
      kAktiv.innerHTML = 'Von den heutigen Parteien gibt es: <b></b>';
      kAktiv.lastChild.textContent = aktiv.length ? aktiv.join(', ') : 'keine – keine freien Parteien';
    }
    regler.addEventListener('input', function () { setze(parseInt(regler.value, 10), false); });

    var obenText = PW.el('div', { 'class': 'zb-oben-text' });
    var sec = box.parentNode; if (sec) sec.querySelectorAll('.zb-intro').forEach(function (n) { obenText.appendChild(n); });
    obenText.appendChild(legende);
    w.appendChild(PW.el('div', { 'class': 'zb-oben' }, [obenText, karte]));
    w.appendChild(steuer);
    w.appendChild(bahnen);
    w.appendChild(liste);
    box.appendChild(w);
    setze(jahr, false);
  };
})();
