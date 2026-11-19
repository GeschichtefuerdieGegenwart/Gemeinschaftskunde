/* Politik-Werkstatt · Muster AG »Der Weg einer Forderung als Scroll-Fassung« (v9)
   Bewegung als Lernmittel: Der Ablauf der Gesetzgebung ist der Lerngegenstand. Die Person scrollt (Reglerweg statt Dauer),
   kein Autoplay. Links eine feste Bühne mit acht Stationen, rechts die Abschnitte. Kommt ein Abschnitt in die Bildmitte
   (IntersectionObserver, mittlere 10 %), wandert die Marke – Cajas Forderung »15 €« – zur Station (transform, 300 ms, ease-out).
   Die Abschnitte blenden über CSS animation-timeline: view() ein, nur in @supports und ohne »weniger Bewegung«.
   Rückfall: ohne IntersectionObserver oder bei »weniger Bewegung« springt die Marke ohne Übergang; ohne JavaScript bleibt die Liste.
   Modell, keine Abbildung echter Abläufe – am Ende »Was lässt dieses Modell weg?«. */
(function () {
  'use strict';
  var PW = window.PW = window.PW || {};

  PW.wegStationen = [
    { k: 'Wunsch', t: 'Caja und viele andere wünschen sich 15 Euro', s: 'Caja jobbt im Supermarkt, ihr Lohn reicht kaum für die Miete. Gewerkschaften und Sozialverbände greifen die Forderung auf, gehen an die Öffentlichkeit und sprechen mit Abgeordneten.', f: 'Noch ohne Partei: Auch Verbände bringen Interessen ein.' },
    { k: 'Partei', t: 'Eine Partei nimmt die Forderung auf', s: 'Die Forderung landet im Wahlprogramm. Beleg: SPD-Wahlprogramm 2025, S. 23 – »Dementsprechend muss der Mindestlohn spätestens ab 2026 bei 15 Euro liegen.«', f: 'Interessenartikulation und Interessenaggregation' },
    { k: 'Koalition', t: 'Nach der Wahl: der Koalitionsvertrag', s: 'Die Parteien, die zusammen regieren wollen, handeln aus, was sie gemeinsam umsetzen. Was im Koalitionsvertrag steht, hat gute Chancen. Was fehlt, kommt meist nicht weiter.', f: 'Interessenaggregation' },
    { k: 'Ministerium', t: 'Das Ministerium schreibt einen Entwurf', s: 'Fachleute im zuständigen Ministerium – beim Mindestlohn das Ministerium für Arbeit und Soziales – formulieren einen Referentenentwurf. Verbände dürfen Stellung nehmen.', f: 'Interessentransmission über die Ministerin oder den Minister der Partei' },
    { k: 'Regierung', t: 'Die Bundesregierung beschließt den Gesetzentwurf', s: 'Das Kabinett bringt den Entwurf auf den Weg. Zuerst nimmt der Bundesrat Stellung, dann geht der Entwurf an den Bundestag.', f: 'Herrschaftsfunktion' },
    { k: 'Bundestag', t: 'Der Bundestag berät und stimmt ab', s: 'Erste Lesung, dann Arbeit im Fachausschuss, oft mit Anhörung von Sachverständigen. In der zweiten und dritten Lesung beschließt die Mehrheit. Die Opposition fragt nach und begründet ihre Gegenposition.', f: 'Herrschaftsfunktion und Kontrollfunktion' },
    { k: 'Bundesrat', t: 'Die Länder sind noch einmal dran', s: 'Bei Zustimmungsgesetzen muss der Bundesrat zustimmen, bei Einspruchsgesetzen kann er Einspruch einlegen. Bei Streit vermittelt der Vermittlungsausschuss.', f: 'Auch hier wirken Parteien – über die Landesregierungen.' },
    { k: 'Gesetz', t: 'Ausgefertigt und verkündet', s: 'Der Bundespräsident fertigt das Gesetz aus, danach wird es im Bundesgesetzblatt verkündet. Aus Cajas Wunsch ist geltendes Recht geworden – im Modell.', f: 'Interessentransmission: vom Programm ins Gesetz' }
  ];

  PW.scrolly = function (wurzel) {
    if (!wurzel) return;
    var S = PW.wegStationen, N = S.length;
    var spur = wurzel.querySelector('.sy-spur'), marke = wurzel.querySelector('.sy-marke');
    var schritte = wurzel.querySelector('.sy-schritte'), stand = wurzel.querySelector('.sy-stand');
    var weniger = function () { return PW.wenigerBewegung ? PW.wenigerBewegung() : false; };
    /* Bühne: acht Knoten */
    var knoten = S.map(function (st, i) {
      var k = PW.el('li', { 'class': 'sy-knoten' }, [PW.el('span', { 'class': 'sy-kreis', 'aria-hidden': 'true', text: String(i + 1) }), PW.el('span', { 'class': 'sy-name', text: st.k })]);
      spur.appendChild(k); return k;
    });
    /* Abschnitte (ersetzen die statische Liste) */
    schritte.textContent = '';
    S.forEach(function (st, i) {
      var a = PW.el('article', { 'class': 'sy-schritt', 'data-i': String(i), id: 'sy-' + (i + 1), 'aria-labelledby': 'sy-t-' + (i + 1) });
      a.appendChild(PW.el('p', { 'class': 'sy-nr', text: 'Station ' + (i + 1) + ' von ' + N + ' · ' + st.k }));
      a.appendChild(PW.el('h2', { id: 'sy-t-' + (i + 1), text: st.t }));
      a.appendChild(PW.el('p', { text: st.s }));
      a.appendChild(PW.el('p', { 'class': 'sy-funktion', html: '<strong>Partei-Funktion hier:</strong> ' }));
      a.lastChild.appendChild(document.createTextNode(st.f));
      schritte.appendChild(a);
    });
    var aktuell = -1;
    function setze(i, ohneGleiten) {
      if (i === aktuell) return;
      aktuell = i;
      knoten.forEach(function (k, j) { k.classList.toggle('ist-erledigt', j < i); k.classList.toggle('ist-jetzt', j === i); });
      var kr = knoten[i].querySelector('.sy-kreis');
      var sp = marke.parentNode.getBoundingClientRect(), r = kr.getBoundingClientRect();
      if (ohneGleiten || weniger()) marke.classList.add('ohne-gleiten');
      var cs = getComputedStyle(marke), dx = parseFloat(cs.getPropertyValue('--sy-dx')) || 0, dy = parseFloat(cs.getPropertyValue('--sy-dy')) || 0;
      marke.style.transform = 'translate(' + (r.left - sp.left + r.width / 2 + dx).toFixed(1) + 'px,' + (r.top - sp.top + r.height / 2 + dy).toFixed(1) + 'px)';
      if (ohneGleiten || weniger()) { void marke.offsetWidth; marke.classList.remove('ohne-gleiten'); }
      stand.textContent = 'Station ' + (i + 1) + ' von ' + N + ': ' + S[i].k;
      schritte.querySelectorAll('.sy-schritt').forEach(function (s) { s.classList.toggle('ist-aktiv', +s.getAttribute('data-i') === i); });
    }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) setze(+e.target.getAttribute('data-i')); });
      }, { rootMargin: '-45% 0px -45% 0px' });
      schritte.querySelectorAll('.sy-schritt').forEach(function (s) { io.observe(s); });
    }
    /* Knoten antippen springt zum Abschnitt (Tastatur und Finger, ohne Scroll-Animation bei weniger Bewegung) */
    knoten.forEach(function (k, i) {
      var b = PW.el('a', { href: '#sy-' + (i + 1), 'class': 'sy-sprung', 'aria-label': 'Zu Station ' + (i + 1) + ': ' + S[i].k });
      b.addEventListener('click', function (e) {
        var ziel = document.getElementById('sy-' + (i + 1)); if (!ziel) return;
        e.preventDefault();
        ziel.scrollIntoView({ block: 'center', behavior: weniger() ? 'auto' : 'smooth' });
        setze(i, false);
        ziel.setAttribute('tabindex', '-1'); ziel.focus({ preventScroll: true });
      });
      k.appendChild(b);
    });
    function neu() { var a = aktuell; aktuell = -1; setze(a < 0 ? 0 : a, true); }
    if (window.ResizeObserver) new ResizeObserver(neu).observe(spur); else window.addEventListener('resize', neu);
    requestAnimationFrame(function () { setze(0, true); });
  };
})();
