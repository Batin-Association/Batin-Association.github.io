/* Batin: lys/moerk tema-veksler. Lagrer valget, faller tilbake paa systemet. */
(function () {
  var btn = document.querySelector('.b-theme');
  if (!btn) return;
  function cur() { return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }
  btn.addEventListener('click', function () {
    var next = cur() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('batin-theme', next); } catch (e) {}
  });
})();
