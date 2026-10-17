/* GoldenSkate — shared behaviour for all three landing variants.
   i18n (TR default, auto from browser), stories viewer, WhatsApp form, map, reveals. */
(function () {
  'use strict';

  var WA_NUMBER = '905335183201';
  var IG_URL = 'https://www.instagram.com/goldenskate.samsun/';
  var RINK = { lat: 41.3193252, lng: 36.3325103 };
  var LANGS = ['tr', 'ru', 'en'];

  var T = window.GS_I18N;

  var STORIES = [
    { id: 'DQMJ-_0CE13', key: 's.club' },
    { id: 'DekTbvjowG7', key: 's.discipline' },
    { id: 'DXUptkpiBbg', key: 's.axel' },
    { id: 'DP5fAOUiOJ5', key: 's.off' },
    { id: 'DbG1qG2ojmo', key: 's.edge' },
    { id: 'DVHWMc3COD5', key: 's.izmir' },
    { id: 'DWhTEEhCLQE', key: 's.gstar' },
    { id: 'Dd_17pkIzTY', key: 's.work' },
    { id: 'DWa3d4hiB9m', key: 's.spiral' },
    { id: 'Db6N7QxIKYi', key: 's.camp' }
  ];

  var root = document.documentElement;
  var base = root.getAttribute('data-assets') || '../assets/';
  var lang = LANGS.indexOf(root.lang) > -1 ? root.lang : 'tr';

  function store(k, v) {
    try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; }
  }

  function detect() {
    var saved = store('gs-lang');
    if (saved && LANGS.indexOf(saved) > -1) return saved;
    var prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    for (var i = 0; i < prefs.length; i++) {
      var p = String(prefs[i]).toLowerCase().slice(0, 2);
      if (LANGS.indexOf(p) > -1) return p;
    }
    return 'tr';
  }

  function t(key) { return (T[lang] && T[lang][key]) || T.tr[key] || key; }

  function apply(l) {
    lang = l;
    root.lang = l;
    document.title = t('meta.title');
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', t('meta.desc'));
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) { el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph'))); });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria'))); });
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      var on = b.getAttribute('data-lang') === l;
      if (on) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
      b.classList.toggle('is-active', on);
    });
    document.querySelectorAll('[data-wa]').forEach(function (a) {
      a.href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(t('form.wa.hello'));
    });
    root.dispatchEvent(new CustomEvent('gs:lang', { detail: l }));
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-lang]');
    if (!b) return;
    store('gs-lang', b.getAttribute('data-lang'));
    if (b.tagName === 'A') { if (location.hash) b.href = b.getAttribute('href').split('#')[0] + location.hash; return; }
    apply(b.getAttribute('data-lang'));
  });

  document.querySelectorAll('[data-ig]').forEach(function (a) { a.href = IG_URL; a.target = '_blank'; a.rel = 'noopener'; });

  /* ---------- mobile nav ---------- */
  var navBtn = document.querySelector('[data-nav-toggle]');
  if (navBtn) {
    navBtn.addEventListener('click', function () {
      var open = root.classList.toggle('nav-open');
      navBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('[data-nav] a').forEach(function (a) {
      a.addEventListener('click', function () { root.classList.remove('nav-open'); navBtn.setAttribute('aria-expanded', 'false'); });
    });
  }

  /* ---------- reduced motion + hero video ---------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('video[data-hero]').forEach(function (v) {
    if (reduce) { v.removeAttribute('autoplay'); v.pause(); return; }
    var p = v.play && v.play();
    if (p && p.catch) p.catch(function () {});
  });

  /* ---------- scroll reveals ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- stories ---------- */
  function buildStories() {
    var rail = document.querySelector('[data-stories]');
    if (!rail) return;
    rail.innerHTML = '';
    STORIES.forEach(function (s, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'story';
      b.setAttribute('data-story', i);
      b.innerHTML =
        '<span class="story__media"><img src="' + base + 'stories/' + s.id + '.jpg" alt="" loading="lazy" decoding="async">' +
        '<video muted playsinline loop preload="none" src="' + base + 'stories/' + s.id + '.mp4"></video></span>' +
        '<span class="story__label" data-i18n="' + s.key + '">' + t(s.key) + '</span>';
      // short muted preview on hover (desktop only)
      if (!reduce && window.matchMedia('(hover: hover)').matches) {
        var v = b.querySelector('video');
        b.addEventListener('mouseenter', function () { v.preload = 'auto'; var p = v.play(); if (p && p.catch) p.catch(function () {}); b.classList.add('is-playing'); });
        b.addEventListener('mouseleave', function () { v.pause(); b.classList.remove('is-playing'); });
      }
      b.addEventListener('click', function () { openViewer(i); });
      rail.appendChild(b);
    });
  }

  var viewer, vVideo, vBars, vIdx = 0, vMuted = true, lastFocus;
  function ensureViewer() {
    if (viewer) return;
    viewer = document.createElement('div');
    viewer.className = 'viewer';
    viewer.setAttribute('role', 'dialog');
    viewer.setAttribute('aria-modal', 'true');
    viewer.hidden = true;
    viewer.innerHTML =
      '<div class="viewer__frame">' +
      '<div class="viewer__bars"></div>' +
      '<div class="viewer__top"><span class="viewer__brand">goldenskate.samsun</span>' +
      '<button type="button" class="viewer__btn" data-v="sound"></button>' +
      '<button type="button" class="viewer__btn viewer__close" data-v="close" aria-label="Close">✕</button></div>' +
      '<video class="viewer__video" playsinline></video>' +
      '<button type="button" class="viewer__nav viewer__nav--prev" data-v="prev"></button>' +
      '<button type="button" class="viewer__nav viewer__nav--next" data-v="next"></button>' +
      '<a class="viewer__ig" data-v="ig" target="_blank" rel="noopener"></a>' +
      '</div>';
    document.body.appendChild(viewer);
    vVideo = viewer.querySelector('video');
    vBars = viewer.querySelector('.viewer__bars');
    STORIES.forEach(function () { var s = document.createElement('span'); s.innerHTML = '<i></i>'; vBars.appendChild(s); });
    viewer.addEventListener('click', function (e) {
      var a = e.target.closest('[data-v]');
      if (!a) { if (e.target === viewer) closeViewer(); return; }
      var k = a.getAttribute('data-v');
      if (k === 'close') closeViewer();
      if (k === 'prev') show(vIdx - 1);
      if (k === 'next') show(vIdx + 1);
      if (k === 'sound') { vMuted = !vMuted; vVideo.muted = vMuted; labelViewer(); }
    });
    vVideo.addEventListener('timeupdate', function () {
      var bar = vBars.children[vIdx];
      if (bar && vVideo.duration) bar.firstChild.style.transform = 'scaleX(' + (vVideo.currentTime / vVideo.duration) + ')';
    });
    vVideo.addEventListener('ended', function () { show(vIdx + 1); });
    document.addEventListener('keydown', function (e) {
      if (viewer.hidden) return;
      if (e.key === 'Escape') closeViewer();
      if (e.key === 'ArrowRight') show(vIdx + 1);
      if (e.key === 'ArrowLeft') show(vIdx - 1);
    });
    root.addEventListener('gs:lang', labelViewer);
  }
  function labelViewer() {
    if (!viewer) return;
    viewer.querySelector('[data-v="sound"]').textContent = (vMuted ? '🔇 ' : '🔊 ') + t('stories.sound');
    viewer.querySelector('[data-v="close"]').setAttribute('aria-label', t('stories.close'));
    viewer.querySelector('[data-v="prev"]').setAttribute('aria-label', t('stories.prev'));
    viewer.querySelector('[data-v="next"]').setAttribute('aria-label', t('stories.next'));
    viewer.querySelector('[data-v="ig"]').textContent = t('stories.open') + ' ↗';
  }
  function show(i) {
    if (i < 0) i = 0;
    if (i >= STORIES.length) { closeViewer(); return; }
    vIdx = i;
    var s = STORIES[i];
    Array.prototype.forEach.call(vBars.children, function (b, j) { b.firstChild.style.transform = 'scaleX(' + (j < i ? 1 : 0) + ')'; });
    vVideo.src = base + 'stories/' + s.id + '.mp4';
    vVideo.poster = base + 'stories/' + s.id + '.jpg';
    vVideo.muted = vMuted;
    var p = vVideo.play(); if (p && p.catch) p.catch(function () {});
    viewer.querySelector('[data-v="ig"]').href = 'https://www.instagram.com/reel/' + s.id + '/';
  }
  function openViewer(i) {
    ensureViewer(); labelViewer();
    lastFocus = document.activeElement;
    viewer.hidden = false;
    root.classList.add('viewer-open');
    show(i);
    viewer.querySelector('[data-v="close"]').focus();
  }
  function closeViewer() {
    if (!viewer) return;
    vVideo.pause(); vVideo.removeAttribute('src'); vVideo.load();
    viewer.hidden = true;
    root.classList.remove('viewer-open');
    if (lastFocus) lastFocus.focus();
  }

  /* ---------- sign-up form: validated locally; not sent anywhere yet ---------- */
  document.querySelectorAll('[data-form]').forEach(function (f) {
    var ok = f.parentElement.querySelector('[data-form-ok]');
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = f.elements.name.value.trim();
      var phone = f.elements.phone.value.trim();
      var err = f.querySelector('[data-form-error]');
      var msg = '';
      if (!name) msg = t('form.err.name');
      else if (phone.replace(/\D/g, '').length < 7) msg = t('form.err.phone');
      if (msg) {
        if (err) { err.textContent = msg; err.hidden = false; }
        (name ? f.elements.phone : f.elements.name).focus();
        return;
      }
      if (err) err.hidden = true;
      // TODO: connect a backend (e-mail / CRM / Telegram bot) — for now the request stays in the browser
      f.reset();
      f.hidden = true;
      if (ok) { ok.hidden = false; ok.focus(); }
    });
    if (ok) ok.querySelector('[data-form-again]').addEventListener('click', function () {
      ok.hidden = true; f.hidden = false; f.elements.name.focus();
    });
  });

  /* ---------- map: MapLibre + OpenFreeMap vector tiles, every layer recoloured from the page's --map-* tokens ---------- */
  function initMap() {
    var el = document.querySelector('[data-map]');
    if (!el || !window.maplibregl) return;
    var cs = getComputedStyle(root);
    var c = function (k, d) { return cs.getPropertyValue(k).trim() || d; };
    var pal = {
      bg: c('--map-bg', '#082229'), water: c('--map-water', '#0c3a45'), park: c('--map-park', '#0b2d2a'),
      building: c('--map-building', '#0d313a'), road: c('--map-road', 'rgba(232,242,241,.16)'),
      major: c('--map-road-major', 'rgba(214,178,110,.34)'), label: c('--map-label', '#8fb0b2'), halo: c('--map-halo', '#061a20')
    };
    var map = new maplibregl.Map({
      container: el, style: 'https://tiles.openfreemap.org/styles/positron',
      center: [RINK.lng, RINK.lat], zoom: 14.6, attributionControl: { compact: true }, cooperativeGestures: true
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    map.on('style.load', function () {
      map.getStyle().layers.forEach(function (l) {
        var id = l.id, set = function (p, v) { try { map.setPaintProperty(id, p, v); } catch (e) {} };
        if (l.type === 'background') set('background-color', pal.bg);
        else if (l.type === 'fill') {
          if (/water/.test(id)) set('fill-color', pal.water);
          else if (/building|aeroway/.test(id)) set('fill-color', pal.building);
          else set('fill-color', pal.park);
        } else if (l.type === 'line') {
          if (/boundary|railway/.test(id)) map.setLayoutProperty(id, 'visibility', 'none');
          else if (/water/.test(id)) set('line-color', pal.water);
          else if (/casing/.test(id)) set('line-color', pal.bg);
          else if (/motorway|major|trunk|primary/.test(id)) set('line-color', pal.major);
          else set('line-color', pal.road);
        } else if (l.type === 'symbol') {
          if (/shield|airport/.test(id)) map.setLayoutProperty(id, 'visibility', 'none');
          else { set('text-color', pal.label); set('text-halo-color', pal.halo); }
        }
      });
    });
    var pin = document.createElement('div');
    pin.className = 'map-pin'; pin.innerHTML = '<span></span>';
    new maplibregl.Marker({ element: pin }).setLngLat([RINK.lng, RINK.lat]).addTo(map);
  }

  /* ---------- stories rail: arrows, progress thumb, mouse drag ---------- */
  function initRail() {
    var rail = document.querySelector('[data-stories]');
    if (!rail) return;
    var wrap = rail.parentElement;
    var prev = document.querySelector('[data-rail-prev]');
    var next = document.querySelector('[data-rail-next]');
    var thumb = document.querySelector('[data-rail-progress]');
    function step() { var card = rail.querySelector('.story'); return card ? (card.offsetWidth + 18) * 2 : 320; }
    function update() {
      var max = rail.scrollWidth - rail.clientWidth;
      var atEnd = rail.scrollLeft >= max - 4;
      if (prev) prev.disabled = rail.scrollLeft <= 4;
      if (next) next.disabled = atEnd;
      wrap.classList.toggle('at-end', atEnd);
      if (thumb) {
        thumb.style.width = Math.min(100, rail.clientWidth / rail.scrollWidth * 100) + '%';
        thumb.style.transform = 'translateX(' + (rail.scrollLeft / rail.clientWidth * 100) + '%)';
      }
    }
    if (prev) prev.addEventListener('click', function () { rail.scrollBy({ left: -step(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { rail.scrollBy({ left: step(), behavior: 'smooth' }); });
    rail.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    var sx = 0, sl = 0, down = false, moved = false;
    rail.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = false; sx = e.clientX; sl = rail.scrollLeft;
    });
    window.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - sx;
      if (Math.abs(dx) > 6) { moved = true; rail.classList.add('is-dragging'); }
      if (moved) rail.scrollLeft = sl - dx;
    });
    window.addEventListener('pointerup', function () {
      if (!down) return;
      down = false; rail.classList.remove('is-dragging');
    });
    rail.addEventListener('click', function (e) { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
    rail.addEventListener('dragstart', function (e) { e.preventDefault(); });
    update();
  }
  document.querySelectorAll('[data-route]').forEach(function (a) {
    a.href = 'https://www.google.com/maps/dir/?api=1&destination=' + RINK.lat + ',' + RINK.lng;
    a.target = '_blank'; a.rel = 'noopener';
  });

  buildStories();
  initRail();
  apply(lang);
  if (document.readyState === 'complete') initMap(); else window.addEventListener('load', initMap);
})();
