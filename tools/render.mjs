// Builds the static language pages: /tr/, /ru/, /en/ from src/page.html + assets/i18n.js,
// and a root index.html that sends first-time visitors to their browser language.
// Usage: node tools/render.mjs   (run from the build folder)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import vm from 'node:vm';

const SITE = 'https://golden-skate.com';
const LANGS = ['tr', 'ru', 'en'];

const ctx = { window: {} };
vm.runInNewContext(readFileSync('assets/i18n.js', 'utf8'), ctx);
const T = ctx.window.GS_I18N;
const tpl = readFileSync('src/page.html', 'utf8');

const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const text = (s) => String(s).replace(/<(?!br\s*\/?>)/g, '&lt;'); // copy may contain <br>, nothing else

const alternates = (lang) => [
  `<link rel="canonical" href="${SITE}/${lang}/">`,
  ...LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${SITE}/${l}/">`),
  `<link rel="alternate" hreflang="x-default" href="${SITE}/">`,
  `<meta property="og:title" content="${attr(T[lang]['meta.title'])}">`,
  `<meta property="og:description" content="${attr(T[lang]['meta.desc'])}">`,
  `<meta property="og:url" content="${SITE}/${lang}/">`,
  `<meta property="og:image" content="${SITE}/assets/img/poster-teal.webp">`,
  `<meta property="og:locale" content="${{ tr: 'tr_TR', ru: 'ru_RU', en: 'en_US' }[lang]}">`,
].join('\n');

for (const lang of LANGS) {
  const d = T[lang];
  const get = (k) => {
    if (!(k in d)) throw new Error(`missing ${lang}:${k}`);
    return d[k];
  };
  let html = tpl
    .replace(/{{LANG}}/g, lang)
    .replace('{{TITLE}}', text(get('meta.title')))
    .replace('{{DESC}}', attr(get('meta.desc')))
    .replace('{{ALTERNATES}}', alternates(lang));

  // element text: <tag ... data-i18n="key" ...>…</tag>
  html = html.replace(/<(\w+)(\s[^>]*?\sdata-i18n="([^"]+)"[^>]*|\s+data-i18n="([^"]+)"[^>]*)>([\s\S]*?)<\/\1>/g,
    (m, tag, attrs, k1, k2) => `<${tag}${attrs}>${text(get(k1 || k2))}</${tag}>`);
  // aria labels
  html = html.replace(/<[^>]*\sdata-i18n-aria="([^"]+)"[^>]*>/g, (tag, k) =>
    tag.replace(/\saria-label="[^"]*"/, '').replace(/\sdata-i18n-aria=/, ` aria-label="${attr(get(k))}" data-i18n-aria=`));
  // current language in the switcher
  html = html.replace(`<a data-lang="${lang}" `, `<a class="is-active" aria-current="page" data-lang="${lang}" `);

  if (/data-i18n="[^"]+"\s*><\//.test(html)) console.warn(`${lang}: some data-i18n elements are still empty`);
  mkdirSync(lang, { recursive: true });
  writeFileSync(`${lang}/index.html`, html);
  console.log(`${lang}/index.html`, html.length);
}

// Root: first visit → browser language (or the one picked earlier with the switcher); default Turkish.
const root = `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>GoldenSkate Samsun</title>
<meta name="description" content="${attr(T.tr['meta.desc'])}">
${LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${SITE}/${l}/">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${SITE}/">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<meta name="theme-color" content="#061a20">
<script>
(function () {
  var L = ['tr', 'ru', 'en'], pick = null;
  try { pick = localStorage.getItem('gs-lang'); } catch (e) {}
  if (L.indexOf(pick) < 0) {
    pick = 'tr';
    var prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    for (var i = 0; i < prefs.length; i++) {
      var p = String(prefs[i]).toLowerCase().slice(0, 2);
      if (L.indexOf(p) > -1) { pick = p; break; }
    }
  }
  location.replace(pick + '/' + location.search + location.hash);
})();
</script>
<noscript><meta http-equiv="refresh" content="0; url=tr/"></noscript>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#061a20;color:#e8f2f1;font:16px/1.5 system-ui,sans-serif}a{color:#f0d9a6;margin:0 10px}</style>
</head>
<body><p><a href="tr/" hreflang="tr">Türkçe</a><a href="ru/" hreflang="ru">Русский</a><a href="en/" hreflang="en">English</a></p></body>
</html>
`;
writeFileSync('index.html', root);
writeFileSync('a/index.html', `<!doctype html>
<meta charset="utf-8">
<title>GoldenSkate Samsun</title>
<meta http-equiv="refresh" content="0; url=../">
<link rel="canonical" href="${SITE}/">
<a href="../">golden-skate.com</a>
`);
writeFileSync('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LANGS.map((l) => `  <url><loc>${SITE}/${l}/</loc>
${LANGS.map((x) => `    <xhtml:link rel="alternate" hreflang="${x}" href="${SITE}/${x}/"/>`).join('\n')}
  </url>`).join('\n')}
</urlset>
`);
writeFileSync('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
console.log('index.html, sitemap.xml, robots.txt');
