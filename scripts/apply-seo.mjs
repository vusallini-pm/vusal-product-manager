import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../dist");
const origin = "https://vusallini-pm.github.io/vusal-product-manager";
const siteName = "Вусал — Продуктовый менеджер";
const modified = "2026-11-21";
const pages = [
  { file: "index.html", url: "/", title: `${siteName} | Продуктовое портфолио`, description: "Портфолио продукт-менеджера Вусала: продуктовые кейсы, A/B‑эксперименты, автоматизация процессов, управление командой и измеримые результаты.", kind: "ProfilePage", crumbs: [["Главная", "/"]] },
  { file: "about/index.html", url: "/about/", title: "Обо мне — Вусал | Продуктовый менеджер", description: "Профессиональная история Вусала: путь от операционной и технической работы к управлению продуктами, исследованиям пользователей и проверке гипотез.", kind: "ProfilePage", crumbs: [["Главная", "/"], ["Обо мне", "/about/"]] },
  { file: "cases/index.html", url: "/cases/", title: "Продуктовые кейсы — Вусал | Продуктовый менеджер", description: "Кейсы Вусала: продуктовые исследования, MVP, A/B‑тесты, Safety Score, автоматизация расследований, Flask‑приложения и управление операционными процессами.", kind: "CollectionPage", crumbs: [["Главная", "/"], ["Кейсы", "/cases/"]] },
  { file: "experience/index.html", url: "/experience/", title: "Опыт работы — Вусал | Продуктовый менеджер", description: "Опыт Вусала в Яндексе, ДМ‑ТЕХ и ИНКОМ‑Недвижимость: продуктовые эксперименты, техническая поддержка, автоматизация и управление операциями.", kind: "ProfilePage", crumbs: [["Главная", "/"], ["Опыт", "/experience/"]] },
  { file: "contact/index.html", url: "/contact/", title: "Контакты — Вусал | Продуктовый менеджер", description: "Связаться с продукт-менеджером Вусалом: Telegram, WhatsApp и телефон для обсуждения продуктовых задач и профессиональных предложений.", kind: "ContactPage", crumbs: [["Главная", "/"], ["Контакты", "/contact/"]] },
];
const cases = [
  ["workspace", "WORKSPACE", "WORKSPACE — продуктовый кейс Вусала", "Кейс создания единой рабочей среды: исследования пользователей, формирование гипотезы, MVP, A/B‑тестирование и развитие внутреннего продукта."],
  ["speed", "Скорость доставки", "Оптимизация скорости доставки — кейс Вусала", "Продуктовый кейс A/B‑эксперимента: сокращение среднего времени доставки на 5–7% без роста количества инцидентов."],
  ["tickets", "Распределение тикетов", "Распределение тикетов и SLA — кейс Вусала", "Кейс автоматического распределения обращений: балансировка нагрузки второй линии поддержки и снижение нарушений SLA с 10–15 до 1–2 в день."],
  ["safety-score", "Safety Score", "Safety Score — продуктовый кейс Вусала", "Как единый показатель безопасности флота за два месяца стал рабочим инструментом для 50 сотрудников, включая 10 руководителей."],
  ["outsourcing", "Аутсорсинг выездов", "Аутсорсинг выездов — кейс Вусала", "Как новый процесс с федеральными и локальными подрядчиками сократил среднее время доезда к роботам с 1–1,5 часа до 30 минут."],
  ["investigation", "Расследование инцидентов", "Расследование инцидентов — кейс Вусала", "Перепроектирование рабочего сценария расследования инцидентов: наблюдение за сотрудниками, обратная связь и сокращение ручных действий."],
  ["vakiro", "Vakiro", "Vakiro — собственный продукт Вусала", "Самостоятельная разработка платформы поиска работы в Азербайджане: каталог, фильтры, три языка, модерация и Supabase."],
  ["qr-registration", "QR‑регистрация", "QR‑регистрация — технический кейс Вусала", "Веб‑приложение на Python и Flask для регистрации по QR‑коду: проверка срока действия, защита от повторов и передача данных в Google Sheets."],
  ["incident-helper", "Incident helper", "Incident helper — кейс автоматизации Вусала", "Браузерное расширение для Яндекс.Трекера: автоматический поиск робота, камер и временного промежутка, переход к анализу за 20–30 секунд."],
  ["automations", "Малые автоматизации", "Малые автоматизации — кейс Вусала", "Набор небольших инструментов на Python и JavaScript для навигации, видео, мониторинга и сохранения состояния интерфейса."],
];
for (const [slug, name, title, description] of cases) {
  const url = "/cases/" + slug + "/";
  pages.push({ file: "cases/" + slug + "/index.html", url, title, description, kind: "WebPage", article: true, crumbs: [["Главная", "/"], ["Кейсы", "/cases/"], [name, url]] });
}
const person = {
  "@type": "Person", "@id": origin + "/#person", name: "Вусал", url: origin + "/",
  jobTitle: "Руководитель группы менеджеров внутренних продуктов",
  telephone: "+79260229909", sameAs: ["https://t.me/vusallini"],
  knowsAbout: ["Управление продуктами", "Продуктовые исследования", "A/B‑тестирование", "Автоматизация процессов", "Управление операциями", "Python", "JavaScript"]
};
const website = { "@type": "WebSite", "@id": origin + "/#website", url: origin + "/", name: siteName, inLanguage: "ru-RU", publisher: { "@id": person["@id"] } };
const escape = value => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

// Replace only managed head metadata, preserving page body, viewport, styles and scripts.
function writeHead(file, metadata) {
  const filePath = path.join(root, file);
  const html = fs.readFileSync(filePath, "utf8");
  const icon = path.relative(path.dirname(file), "favicon.svg").replaceAll("\\", "/");
  const updated = html.replace(/<head\b[^>]*>([\s\S]*?)<\/head>/i, (_, head) => {
    const preserved = head
      .replace(/<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->\s*/g, "")
      .replace(/<title\b[^>]*>[\s\S]*?<\/title>\s*/gi, "")
      .replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>\s*/gi, "")
      .replace(/<meta\b[^>]*\bcharset=["']?[^\s"'>]+["']?[^>]*>\s*/gi, "")
      .replace(/<meta\b[^>]*(?:name=["'](?:description|robots|theme-color|twitter:[^"']*)["']|property=["']og:[^"']*["']|http-equiv=["']refresh["'])[^>]*>\s*/gi, "")
      .replace(/<link\b[^>]*rel=["'](?:canonical|icon)["'][^>]*>\s*/gi, "")
      .trim();
    return '<head>\n  <meta charset="utf-8">\n  <link rel="icon" type="image/svg+xml" href="' + icon + '">\n  <!-- SEO:START -->\n' + metadata + "\n  <!-- SEO:END -->\n  " + preserved + "</head>";
  });
  if (!/<head\b/i.test(html)) throw new Error("Missing head: " + file);
  fs.writeFileSync(filePath, updated);
}

for (const page of pages) {
  const absolute = origin + page.url;
  const breadcrumb = { "@type": "BreadcrumbList", "@id": absolute + "#breadcrumb", itemListElement: page.crumbs.map(([name, url], index) => ({ "@type": "ListItem", position: index + 1, name, item: origin + url })) };
  const entity = { "@type": page.kind, "@id": absolute + "#webpage", url: absolute, name: page.title, description: page.description, inLanguage: "ru-RU", isPartOf: { "@id": website["@id"] }, breadcrumb: { "@id": breadcrumb["@id"] } };
  const graph = [person, website, entity, breadcrumb];
  if (page.kind === "ProfilePage") entity.mainEntity = { "@id": person["@id"] };
  if (page.article) {
    entity.mainEntity = { "@id": absolute + "#article" };
    graph.push({ "@type": "Article", "@id": absolute + "#article", headline: page.title, description: page.description, inLanguage: "ru-RU", author: { "@id": person["@id"] }, mainEntityOfPage: { "@id": entity["@id"] } });
  }
  const title = escape(page.title);
  const description = escape(page.description);
  const tags = [
    "<title>" + title + "</title>",
    '<meta name="description" content="' + description + '">',
    '<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">',
    '<meta name="theme-color" content="#070707">',
    '<link rel="canonical" href="' + absolute + '">',
    '<meta property="og:locale" content="ru_RU">',
    '<meta property="og:type" content="' + (page.article ? "article" : "website") + '">',
    '<meta property="og:site_name" content="' + siteName + '">',
    '<meta property="og:title" content="' + title + '">',
    '<meta property="og:description" content="' + description + '">',
    '<meta property="og:url" content="' + absolute + '">',
    '<meta name="twitter:card" content="summary">',
    '<meta name="twitter:title" content="' + title + '">',
    '<meta name="twitter:description" content="' + description + '">',
    '<script type="application/ld+json">' + JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replaceAll("<", "\\u003c") + "</script>"
  ];
  writeHead(page.file, tags.map(tag => "  " + tag).join("\n"));
}

// Old bookmarks should lead to the current collection without indexing duplicate content.
writeHead("lab/index.html", [
  "<title>Проекты перенесены в кейсы — Вусал</title>",
  '<meta name="description" content="Собственные проекты и прототипы Вусала теперь доступны в разделе «Кейсы».">',
  '<meta name="robots" content="noindex,follow">',
  '<link rel="canonical" href="' + origin + '/cases/">',
  '<meta http-equiv="refresh" content="0; url=../cases/">'
].map(tag => "  " + tag).join("\n"));

const urls = pages.map(page => "  <url><loc>" + origin + page.url + "</loc><lastmod>" + modified + "</lastmod></url>").join("\n");
fs.writeFileSync(path.join(root, "sitemap.xml"), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls + "\n</urlset>\n");
fs.writeFileSync(path.join(root, "robots.txt"), "User-agent: *\nAllow: /\n\nSitemap: " + origin + "/sitemap.xml\n");
console.log("SEO metadata applied to " + pages.length + " pages; retired lab redirects to cases.");
