import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import * as sass from 'sass';
import * as esbuild from 'esbuild';
import { parseMarkdown } from '../src/utils/markdown.js';
import { renderHomePage, PostSummary } from '../src/templates/home.js';
import { renderPostPage } from '../src/templates/post.js';
import { renderCustomPage } from '../src/templates/page.js';
import { render404Page } from '../src/templates/404.js';
import { generateRssFeed, FeedPostItem } from '../src/utils/feed.js';
import { generateSitemap, SitemapUrl } from '../src/utils/sitemap.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const contentDir = path.resolve(rootDir, 'content');
const postsDir = path.resolve(contentDir, 'posts');
const publicDir = path.resolve(rootDir, 'public');
const assetsSrcDir = path.resolve(rootDir, 'src/assets');
const clientSrcDir = path.resolve(rootDir, 'src/client');

function slugify(text: string): string {
  return text
    .trim()
    .replace(/\s+/g, '-');
}

function parseSafeDate(rawDate: any, dateStrFromFilename: string): Date {
  if (rawDate) {
    const d = new Date(rawDate);
    if (!isNaN(d.getTime())) return d;
  }
  if (dateStrFromFilename) {
    const d = new Date(dateStrFromFilename);
    if (!isNaN(d.getTime())) return d;
  }
  return new Date();
}

async function build() {
  const startTime = Date.now();
  console.log('🚀 Starting SSG Build for moselikk.com...');

  // 1. Clean & prepare dist directory
  await fs.emptyDir(distDir);

  // 2. Copy public directory assets
  if (await fs.pathExists(publicDir)) {
    await fs.copy(publicDir, distDir);
    console.log('📁 Static assets copied from public/ to dist/');
  }

  // 3. Compile SCSS
  const assetsDistDir = path.resolve(distDir, 'assets');
  await fs.ensureDir(assetsDistDir);

  const scssPath = path.resolve(assetsSrcDir, 'main.scss');
  if (await fs.pathExists(scssPath)) {
    const sassResult = sass.compile(scssPath, {
      style: 'compressed',
      loadPaths: [assetsSrcDir],
      silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'slash-div']
    });
    await fs.writeFile(path.resolve(assetsDistDir, 'main.css'), sassResult.css);
    console.log('🎨 SCSS compiled successfully to assets/main.css');
  }

  // 4. Bundle client JS
  const clientEntry = path.resolve(clientSrcDir, 'main.ts');
  if (await fs.pathExists(clientEntry)) {
    await esbuild.build({
      entryPoints: [clientEntry],
      outfile: path.resolve(assetsDistDir, 'main.js'),
      bundle: true,
      minify: true,
      format: 'esm',
      target: ['es2022']
    });
    console.log('⚡ Client TS bundled successfully to assets/main.js');
  }

  // 5. Parse and build Published Posts (按 Jekyll 标准: 必须符合 YYYY-MM-DD-*.md 且 published !== false)
  const postFiles = await fs.readdir(postsDir);
  const postsList: { summary: PostSummary; feedItem: FeedPostItem; date: Date }[] = [];
  const sitemapUrls: SitemapUrl[] = [
    { loc: '/', changefreq: 'daily', priority: 1.0 },
    { loc: '/about/', changefreq: 'monthly', priority: 0.8 },
    { loc: '/excerpt/', changefreq: 'weekly', priority: 0.8 }
  ];

  for (const file of postFiles) {
    if (file.startsWith('.')) continue;

    // 必须符合标准命名规范: YYYY-MM-DD-title.md
    const match = file.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.(md|markdown)$/);
    if (!match) {
      // 非标准命名的文件（如草稿 abc.md, def.md）不作为正式文章发布
      continue;
    }

    const [, dateStr, rawSlug] = match;
    const fullPath = path.resolve(postsDir, file);
    const rawContent = await fs.readFile(fullPath, 'utf-8');
    const { metadata, contentHtml } = await parseMarkdown(rawContent);

    // 如果 frontmatter 明确标记 published: false 则跳过发布
    if (metadata.published === false) {
      continue;
    }

    // 解析发布日期
    const postDate = parseSafeDate(metadata.date, dateStr);

    // 标准 slug 处理（与 Jekyll 一致，空格转换为短横线）
    const slug = slugify(rawSlug);
    const postUrl = `/blog/${slug}`;

    const title = metadata.title || rawSlug;
    const author = metadata.author;
    const description = metadata.description;

    // 输出文章 HTML
    const postHtml = renderPostPage({
      title,
      date: postDate,
      author,
      description,
      url: postUrl,
      contentHtml
    });

    // 写入 dist/blog/[slug]/index.html
    const postOutDir = path.resolve(distDir, 'blog', slug);
    await fs.ensureDir(postOutDir);
    await fs.writeFile(path.resolve(postOutDir, 'index.html'), postHtml);

    // 同时写入 dist/blog/[slug].html（保证在所有 Clean URL 静态服务器下均可无缝直接匹配）
    await fs.writeFile(path.resolve(distDir, 'blog', `${slug}.html`), postHtml);

    postsList.push({
      date: postDate,
      summary: {
        title,
        url: postUrl,
        date: postDate,
        year: postDate.getFullYear()
      },
      feedItem: {
        title,
        url: postUrl,
        date: postDate,
        description,
        content: contentHtml
      }
    });

    sitemapUrls.push({
      loc: postUrl,
      lastmod: postDate.toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.7
    });
  }

  // 按日期由新到旧排序
  postsList.sort((a, b) => b.date.getTime() - a.date.getTime());

  console.log(`📝 Generated ${postsList.length} published blog posts in dist/blog/`);

  // 6. Generate Homepage (dist/index.html)
  const homeHtml = renderHomePage(postsList.map(p => p.summary));
  await fs.writeFile(path.resolve(distDir, 'index.html'), homeHtml);
  console.log('🏠 Homepage generated at dist/index.html');

  // 7. Generate About page (dist/about/index.html + dist/about.html)
  const aboutPath = path.resolve(contentDir, 'about.md');
  if (await fs.pathExists(aboutPath)) {
    const aboutRaw = await fs.readFile(aboutPath, 'utf-8');
    const { metadata, contentHtml } = await parseMarkdown(aboutRaw);
    const aboutHtml = renderCustomPage({
      title: metadata.title || '关于我...',
      type: 'about',
      url: '/about/',
      contentHtml
    });
    const aboutOutDir = path.resolve(distDir, 'about');
    await fs.ensureDir(aboutOutDir);
    await fs.writeFile(path.resolve(aboutOutDir, 'index.html'), aboutHtml);
    await fs.writeFile(path.resolve(distDir, 'about.html'), aboutHtml);
    console.log('👤 About page generated at dist/about/index.html & dist/about.html');
  }

  // 8. Generate Excerpt page (dist/excerpt/index.html + dist/excerpt.html)
  const excerptPath = path.resolve(contentDir, 'excerpt.md');
  if (await fs.pathExists(excerptPath)) {
    const excerptRaw = await fs.readFile(excerptPath, 'utf-8');
    const { metadata, contentHtml } = await parseMarkdown(excerptRaw);
    const excerptHtml = renderCustomPage({
      title: metadata.title || '「读书 - 生活」 片段',
      type: 'excerpt',
      url: '/excerpt/',
      contentHtml
    });
    const excerptOutDir = path.resolve(distDir, 'excerpt');
    await fs.ensureDir(excerptOutDir);
    await fs.writeFile(path.resolve(excerptOutDir, 'index.html'), excerptHtml);
    await fs.writeFile(path.resolve(distDir, 'excerpt.html'), excerptHtml);
    console.log('📖 Excerpt page generated at dist/excerpt/index.html & dist/excerpt.html');
  }

  // 9. Generate 404 page (dist/404.html)
  const notFoundHtml = render404Page();
  await fs.writeFile(path.resolve(distDir, '404.html'), notFoundHtml);
  console.log('🚫 404 page generated at dist/404.html');

  // 10. Generate RSS feed (dist/feed.xml)
  const rssXml = generateRssFeed(postsList.map(p => p.feedItem));
  await fs.writeFile(path.resolve(distDir, 'feed.xml'), rssXml);
  console.log('📡 RSS Feed generated at dist/feed.xml');

  // 11. Generate Sitemap (dist/sitemap.xml)
  const sitemapXml = generateSitemap(sitemapUrls);
  await fs.writeFile(path.resolve(distDir, 'sitemap.xml'), sitemapXml);
  console.log('🗺️ Sitemap generated at dist/sitemap.xml');

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`✨ SSG Build completed successfully in ${duration}s!`);
}

build().catch((err) => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
