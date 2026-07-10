/* Batin: viser alle tall med arabisk-indiske sifre (٠-٩).
   Identitetsvalg knyttet til navnets rot. Kjorer i nettleseren, endrer bare
   det som VISES, ikke kildeteksten.

   Regler:
   - Sifre som staar inntil en bokstav hoppes over (beskytter "bat1n", ver-numre o.l.).
   - Elementer (eller foreldre) merket data-latin beholder vanlige tall. Bruk det paa
     alt som maa kunne kopieres og verifiseres, for eksempel org.nr mot offentlig register.
   - Skript, stiler og skjemafelt roeres aldri. */
(function () {
  var MAP = {'0':'٠','1':'١','2':'٢','3':'٣','4':'٤','5':'٥','6':'٦','7':'٧','8':'٨','9':'٩'};

  function isLetter(c) { return !!c && /[A-Za-zÀ-ÿ]/.test(c); }

  function skip(node) {
    var el = node.parentElement;
    while (el) {
      var t = el.tagName;
      if (t === 'SCRIPT' || t === 'STYLE' || t === 'TEXTAREA' || t === 'INPUT' || t === 'CODE') return true;
      if (el.hasAttribute && el.hasAttribute('data-latin')) return true;
      el = el.parentElement;
    }
    return false;
  }

  function convert(text) {
    // Match hele talluttrykk (grupper skilt med mellomrom, punktum, komma, skraastrek).
    return text.replace(/\d+(?:[.,\/ ]\d+)*/g, function (run, offset, s) {
      var before = s[offset - 1], after = s[offset + run.length];
      if (isLetter(before) || isLetter(after)) return run; // beskytt ident som bat1n
      var conv = run.replace(/[0-9]/g, function (d) { return MAP[d]; });
      // Bytt mellomrom mellom grupper til smalt hardt mellomrom (U+202F). Arabiske
      // sifre snur ellers mellomrom-separerte grupper (org.nr 938 045 348 ville blitt
      // 348 045 938). U+202F holder rekkefoelgen og ser penere ut for tallgruppering.
      return conv.replace(/ /g, ' ');
    });
  }

  function walk(root) {
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var nodes = [], n;
    while ((n = w.nextNode())) nodes.push(n);
    for (var k = 0; k < nodes.length; k++) {
      var node = nodes[k];
      if (skip(node)) continue;
      if (/[0-9]/.test(node.nodeValue)) node.nodeValue = convert(node.nodeValue);
    }
  }

  function run() { walk(document.body); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
