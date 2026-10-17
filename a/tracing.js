/* Variant A signature: a gold skate tracing that runs down the page and draws itself as you scroll.
   The curve is a prolate trochoid — loops swell near each section heading, flatten in between. */
(function () {
  var top = document.querySelector('[data-top]');
  function onScrollTop() { top.classList.toggle('is-solid', window.scrollY > 40); }
  window.addEventListener('scroll', onScrollTop, { passive: true });
  onScrollTop();

  var svg = document.querySelector('[data-tracing]');
  if (!svg || getComputedStyle(svg).display === 'none') return;
  var path = svg.querySelector('path');
  var flow = svg.parentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var len = 0;

  function build() {
    var H = flow.offsetHeight;
    svg.setAttribute('viewBox', '0 0 120 ' + H);
    var anchors = Array.prototype.map.call(flow.querySelectorAll('h2'), function (h) {
      return h.getBoundingClientRect().top - flow.getBoundingClientRect().top + 30;
    });
    var pts = [], c = 24; // c: downward travel per radian (one loop ≈ 150px)
    for (var th = 0, y = 0; y < H; th += 0.07) {
      var near = anchors.reduce(function (m, a) { return Math.min(m, Math.abs(a - th * c)); }, 1e9);
      var R = 5 + 36 * Math.exp(-(near * near) / (2 * 90 * 90)); // loops (R > c) only near headings
      var x = 60 + R * Math.sin(th) + 18 * Math.sin(th / 9);
      y = th * c - R * Math.cos(th) + R;
      pts.push(x.toFixed(1) + ' ' + y.toFixed(1));
    }
    path.setAttribute('d', 'M' + pts.join(' L'));
    len = path.getTotalLength();
    path.style.strokeDasharray = len;
    draw();
  }
  function draw() {
    if (reduce) { path.style.strokeDashoffset = 0; return; }
    var r = flow.getBoundingClientRect();
    var p = Math.min(1, Math.max(0, (window.innerHeight * .75 - r.top) / r.height));
    path.style.strokeDashoffset = len * (1 - p);
  }
  window.addEventListener('scroll', draw, { passive: true });
  window.addEventListener('resize', function () { clearTimeout(build.t); build.t = setTimeout(build, 200); });
  window.addEventListener('load', build);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(build);
})();
