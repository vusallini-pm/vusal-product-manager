# Вусал — Product Manager

[![Deploy portfolio to GitHub Pages](https://github.com/seregazcerev-cmyk/vusal-product-manager/actions/workflows/pages.yml/badge.svg)](https://github.com/seregazcerev-cmyk/vusal-product-manager/actions/workflows/pages.yml)

Многостраничное профессиональное портфолио продукт-менеджера в чёрно-золотом editorial-стиле.

## Публикация

Сайт автоматически публикуется в GitHub Pages из папки `dist` после каждого изменения ветки `main`.

Публичный адрес: <https://seregazcerev-cmyk.github.io/vusal-product-manager/>

## SEO

Уникальные метаданные, canonical URL, Open Graph, JSON-LD, `sitemap.xml` и `robots.txt` генерируются командой:

```bash
node scripts/apply-seo.mjs
```
