import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../dist");
const origin = "https://vusallini-pm.github.io/vusal-product-manager";

const pages = [
  { file: "index.html", url: "/", title: "Вусал — Product Manager | Продуктовое портфолио", description: "Портфолио продукт-менеджера Вусала: продуктовые кейсы, A/B‑эксперименты, автоматизация процессов, управление командой и измеримые результаты.", kind: "ProfilePage", crumbs: [["Главная", "/"]] },
  { file: "about/index.html", url: "/about/", title: "Обо мне — Вусал | Product Manager", description: "Профессиональная история Вусала: путь от операционной и технической работы к управлению продуктами, исследованиям пользователей и проверке гипотез.", kind: "ProfilePage", crumbs: [["Главная", "/"], ["Обо мне", "/about/"]] },
  { file: "cases/index.html", url: "/cases/", title: "Продуктовые кейсы — Вусал | Product Manager", description: "Кейсы Вусала на пересечении продукта, операций и автоматизации: discovery, MVP, A/B‑тесты, продуктовые метрики и улучшение SLA.", kind: "CollectionPage", crumbs: [["Главная", "/"], ["Кейсы", "/cases/"]] },
  { file: "cases/workspace/index.html", url: "/cases/workspace/", title: "WORKSPACE — продуктовый кейс Вусала", description: "Кейс создания единой рабочей среды: исследования пользователей, формирование гипотезы, MVP, A/B‑тестирование и развитие внутреннего продукта.", kind: "Article", crumbs: [["Главная", "/"], ["Кейсы", "/cases/"], ["WORKSPACE", "/cases/workspace/"]] },
  { file: "cases/speed/index.html", url: "/cases/speed/", title: "Оптимизация скорости доставки — кейс Вусала", description: "Продуктовый кейс A/B‑эксперимента: сокращение среднего времени доставки на 5–7% без роста количества инцидентов.", kind: "Article", crumbs: [["Главная", "/"], ["Кейсы", "/cases/"], ["Скорость доставки", "/cases/speed/"]] },
  { file: "cases/tickets/index.html", url: "/cases/tickets/", title: "Распределение тикетов и SLA — кейс Вусала", description: "Кейс автоматического распределения обращений: балансировка нагрузки второй линии поддержки и снижение нарушений SLA с 10–15 до 1–2 в день.", kind: "Article", crumbs: [["Главная", "/"], ["Кейсы", "/cases/"], ["Распределение тикетов", "/cases/tickets/"]] },
  { file: "lab/index.html", url: "/lab/", title: "Лаборатория и собственные проекты — Вусал", description: "Самостоятельные продукты и прототипы Вусала: Vakiro, Python, Flask, JavaScript, Supabase, браузерные расширения и автоматизация рабочих процессов.", kind: "CollectionPage", crumbs: [["Главная", "/"], ["Лаборатория", "/lab/"]] },
  { file: "experience/index.html", url: "/experience/", title: "Опыт работы — Вусал | Product Manager", description: "Опыт Вусала в Яндексе, ДМ‑ТЕХ и ИНКОМ‑Недвижимость: продуктовые эксперименты, техническая поддержка, автоматизация и управление операциями.", kind: "ProfilePage", crumbs: [["Главная", "/"], ["Опыт", "/experience/"]] },
  { file: "contact/index.html", url: "/contact/", title: "Контакты — Вусал | Product Manager", description: "Связаться с продукт-менеджером Вусалом: Telegram, WhatsApp и телефон для обсуждения продуктовых задач и профессиональных предложений.", kind: "ContactPage", crumbs: [["Главная", "/"], ["Контакты", "/contact/"]] },
];

const person = {
  "@type": "Person",
  "@id": `${origin}/#person`,
  name: "Вусал",
  url: `${origin}/`,
  jobTitle: "Product Manager",
  telephone: "+79260229909",
  sameAs: ["https://t.me/vusallini"],
  knowsAbout: ["Product Management", "Product Discovery", "A/B Testing", "Process Automation", "Operations Management", "Python", "JavaScript"]
};

for (const page of pages) {
  const absolute = `${origin}${page.url}`;
  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: page.crumbs.map(([name, url], i) => ({
      "@type": "ListItem", position: i + 1, name, item: `${origin}${url}`
    }))
  };
  const entity = {
    "@type": page.kind,
    "@id": `${absolute}#webpage`,
    url: absolute,
    name: page.title,
    description: page.description,
    inLanguage: "ru-RU",
    isPartOf: { "@id": `${origin}/#website` },
    breadcrumb: { "@id": `${absolute}#breadcrumb` }
  };
  if (page.kind === "Article") entity.author = { "@id": `${origin}/#person` };
  if (page.kind === "ProfilePage") entity.mainEntity = { "@id": `${origin}/#person` };
  breadcrumb["@id"] = `${absolute}#breadcrumb`;
  const graph = [entity, breadcrumb];
  if (page.url === "/") {
    graph.unshift(person, {
      "@type": "WebSite", "@id": `${origin}/#website`, url: `${origin}/`, name: "Вусал — Product Manager", inLanguage: "ru-RU", publisher: { "@id": `${origin}/#person` }
    });
  }
  const seo = `<!-- SEO:START -->
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
  <meta name="theme-color" content="#070707">
  <link rel="canonical" href="${absolute}">
  <meta property="og:locale" content="ru_RU">
  <meta property="og:type" content="${page.kind === "Article" ? "article" : "website"}">
  <meta property="og:site_name" content="Вусал — Product Manager">
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.description}">
  <meta property="og:url" content="${absolute}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${page.title}">
  <meta name="twitter:description" content="${page.description}">
  <script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}</script>
  <!-- SEO:END -->`;

  const filePath = path.join(root, page.file);
  let html = fs.readFileSync(filePath, "utf8");
  html = html.replace(/<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->\s*/g, "");
  html = html.replace(/<title>[\s\S]*?<\/title>\s*/i, "");
  html = html.replace(/<meta\s+name=["']description["'][^>]*>\s*/i, "");
  html = html.replace(/<head>/i, `<head>\n  ${seo}`);
  fs.writeFileSync(filePath, html);
}

const urls = pages.map(page => `  <url><loc>${origin}${page.url}</loc><lastmod>2026-11-20</lastmod></url>`).join("\n");
fs.writeFileSync(path.join(root, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
fs.writeFileSync(path.join(root, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);

console.log(`SEO metadata applied to ${pages.length} pages.`);
