// Builds the static language pages from src/page.html + assets/i18n.js:
//   /      Turkish (main page). First-time visitors whose browser prefers Russian or English are sent to /ru/ or /en/;
//          anyone who picked a language with the switcher gets that one (picking TR keeps them on / with no redirect).
//   /ru/   Russian
//   /en/   English
// Usage: node tools/render.mjs   (run from the build folder)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import vm from 'node:vm';

const SITE = 'https://golden-skate.com';
const LANGS = ['tr', 'ru', 'en'];
const PAGES = {
  tr: { out: 'index.html', base: '', url: `${SITE}/`, href: { tr: './', ru: 'ru/', en: 'en/' } },
  ru: { out: 'ru/index.html', base: '../', url: `${SITE}/ru/`, href: { tr: '../', ru: './', en: '../en/' } },
  en: { out: 'en/index.html', base: '../', url: `${SITE}/en/`, href: { tr: '../', ru: '../ru/', en: './' } },
};

const ctx = { window: {} };
vm.runInNewContext(readFileSync('assets/i18n.js', 'utf8'), ctx);
const T = ctx.window.GS_I18N;
const tpl = readFileSync('src/page.html', 'utf8');

const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const text = (s) => String(s).replace(/<(?!br\s*\/?>)/g, '&lt;'); // copy may contain <br>, nothing else

// Runs first in <head> of the Turkish main page, before anything renders.
const REDIRECT = `<script>
(function () {
  if (/bot|crawl|spider|slurp|lighthouse|preview/i.test(navigator.userAgent)) return;
  var pick = null;
  try { pick = localStorage.getItem('gs-lang'); } catch (e) {}
  if (!pick) {
    var prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    for (var i = 0; i < prefs.length; i++) {
      var p = String(prefs[i]).toLowerCase().slice(0, 2);
      if (p === 'tr' || p === 'ru' || p === 'en') { pick = p; break; }
    }
  }
  if (pick === 'ru' || pick === 'en') location.replace(pick + '/' + location.search + location.hash);
})();
</script>`;

const alternates = (lang) => [
  `<link rel="canonical" href="${PAGES[lang].url}">`,
  ...LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${PAGES[l].url}">`),
  `<link rel="alternate" hreflang="x-default" href="${PAGES.tr.url}">`,
  `<meta property="og:title" content="${attr(T[lang]['meta.title'])}">`,
  `<meta property="og:description" content="${attr(T[lang]['meta.desc'])}">`,
  `<meta property="og:url" content="${PAGES[lang].url}">`,
  `<meta property="og:image" content="${SITE}/assets/img/poster-teal.webp">`,
  `<meta property="og:locale" content="${{ tr: 'tr_TR', ru: 'ru_RU', en: 'en_US' }[lang]}">`,
].join('\n');

for (const lang of LANGS) {
  const d = T[lang], pg = PAGES[lang];
  const get = (k) => {
    if (!(k in d)) throw new Error(`missing ${lang}:${k}`);
    return d[k];
  };
  let html = tpl
    .replace(/{{LANG}}/g, lang)
    .replace(/{{BASE}}/g, pg.base)
    .replace(/{{HREF_TR}}/g, pg.href.tr).replace(/{{HREF_RU}}/g, pg.href.ru).replace(/{{HREF_EN}}/g, pg.href.en)
    .replace('{{REDIRECT}}', lang === 'tr' ? REDIRECT : '')
    .replace('{{TITLE}}', text(get('meta.title')))
    .replace('{{DESC}}', attr(get('meta.desc')))
    .replace('{{ALTERNATES}}', alternates(lang));

  // element text: <tag ... data-i18n="key" ...>…</tag>
  html = html.replace(/<(\w+)(\s[^>]*?\sdata-i18n="([^"]+)"[^>]*|\s+data-i18n="([^"]+)"[^>]*)>([\s\S]*?)<\/\1>/g,
    (m, tag, attrs, k1, k2) => `<${tag}${attrs}>${text(get(k1 || k2))}</${tag}>`);
  // aria labels
  html = html.replace(/<[^>]*\sdata-i18n-aria="([^"]+)"[^>]*>/g, (tag, k) =>
    tag.replace(/\saria-label="[^"]*"/, '').replace(/\sdata-i18n-aria=/, ` aria-label="${attr(get(k))}" data-i18n-aria=`));
  // current language in both switchers (header + mobile menu)
  html = html.replaceAll(`<a data-lang="${lang}" `, `<a class="is-active" aria-current="page" data-lang="${lang}" `);

  if (/data-i18n="[^"]+"\s*><\//.test(html)) console.warn(`${lang}: some data-i18n elements are still empty`);
  if (pg.out.includes('/')) mkdirSync(pg.out.split('/')[0], { recursive: true });
  writeFileSync(pg.out, html);
  console.log(pg.out, html.length);
}

// Old addresses: /tr/ (explicit Turkish → remember it, go to /) and /a/ (first prototype).
mkdirSync('tr', { recursive: true });
writeFileSync('tr/index.html', `<!doctype html>
<meta charset="utf-8">
<title>GoldenSkate Samsun</title>
<link rel="canonical" href="${SITE}/">
<script>try { localStorage.setItem('gs-lang', 'tr'); } catch (e) {} location.replace('../' + location.hash);</script>
<noscript><meta http-equiv="refresh" content="0; url=../"></noscript>
<a href="../">golden-skate.com</a>
`);
writeFileSync('a/index.html', `<!doctype html>
<meta charset="utf-8">
<title>GoldenSkate Samsun</title>
<meta http-equiv="refresh" content="0; url=../">
<link rel="canonical" href="${SITE}/">
<a href="../">golden-skate.com</a>
`);
writeFileSync('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LANGS.map((l) => `  <url><loc>${PAGES[l].url}</loc>
${LANGS.map((x) => `    <xhtml:link rel="alternate" hreflang="${x}" href="${PAGES[x].url}"/>`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${PAGES.tr.url}"/>
  </url>`).join('\n')}
</urlset>
`);
writeFileSync('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
console.log('tr/ and a/ redirects, sitemap.xml, robots.txt');
