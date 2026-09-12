import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { handleStaticRequest } from './dev.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

let passedCount = 0;
let failedCount = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  ✅ [PASS] ${message}`);
    passedCount++;
  } else {
    console.error(`  ❌ [FAIL] ${message}`);
    failedCount++;
  }
}

// 线上 https://www.moselikk.com/ 实际发布的 30 篇文章标准列表
const EXPECTED_LIVE_SLUGS = [
  'verdaccio-offline',
  'berkeley',
  'ipv6',
  'nginx-conf',
  'fab-word-list',
  'xu-tong',
  'document-style-guide-copy',
  'Setting-Backups',
  'eNSP-ERR40-copy',
  'command',
  'ChatGPT',
  'scp',
  'git-commands',
  'book-to-live',
  'website-amiibowiki',
  'JS-arguments',
  'OpenWrt',
  'ElementUI',
  'BEHRINGERX32',
  'turn&band&sound',
  'voice-recording-equipment',
  'radio-certification',
  'KB-MB-Mbps',
  '15-CLI-tools',
  'front-end-base',
  'mac-MDM',
  'Unix-like-system',
  'vscode-code-folding',
  'Chinese-3DS',
  'welcome-to-myblog'
];

async function runTests() {
  console.log('🧪 Starting Comprehensive Test Suite for moselikk-web-new...\n');

  // Test Suite 1: Build Output Verification
  console.log('📦 Test Suite 1: Static Build Artifacts & Post Consistency');
  execSync('npm run build', { cwd: rootDir, stdio: 'pipe' });

  assert(fs.existsSync(path.join(distDir, 'index.html')), 'dist/index.html exists');
  assert(fs.existsSync(path.join(distDir, 'about/index.html')), 'dist/about/index.html exists');
  assert(fs.existsSync(path.join(distDir, 'about.html')), 'dist/about.html exists');
  assert(fs.existsSync(path.join(distDir, 'excerpt/index.html')), 'dist/excerpt/index.html exists');
  assert(fs.existsSync(path.join(distDir, 'excerpt.html')), 'dist/excerpt.html exists');
  assert(fs.existsSync(path.join(distDir, '404.html')), 'dist/404.html exists');
  assert(fs.existsSync(path.join(distDir, 'feed.xml')), 'dist/feed.xml exists');
  assert(fs.existsSync(path.join(distDir, 'sitemap.xml')), 'dist/sitemap.xml exists');
  assert(fs.existsSync(path.join(distDir, 'search-index.json')), 'dist/search-index.json exists (Search Index)');
  assert(fs.existsSync(path.join(distDir, 'assets/main.css')), 'dist/assets/main.css exists');
  assert(fs.existsSync(path.join(distDir, 'assets/main.js')), 'dist/assets/main.js exists');
  assert(fs.existsSync(path.join(distDir, 'CNAME')), 'dist/CNAME exists');
  assert(fs.existsSync(path.join(distDir, 'favicon.ico')), 'dist/favicon.ico exists');
  assert(fs.existsSync(path.join(distDir, 'apple-touch-icon.png')), 'dist/apple-touch-icon.png exists');

  // 验证未发布/草稿文件（如 abc.md, def.md）不会被错误输出
  assert(!fs.existsSync(path.join(distDir, 'blog/abc/index.html')), 'Draft file "abc.md" is NOT published to blog posts');
  assert(!fs.existsSync(path.join(distDir, 'blog/def/index.html')), 'Draft file "def.md" is NOT published to blog posts');

  // 严格比对线上 30 篇文章与重构产物
  console.log(`\n  Strictly validating against all ${EXPECTED_LIVE_SLUGS.length} live articles...`);
  let allMatched = true;
  for (const slug of EXPECTED_LIVE_SLUGS) {
    const dirHtml = path.join(distDir, 'blog', slug, 'index.html');
    const flatHtml = path.join(distDir, 'blog', `${slug}.html`);
    if (!fs.existsSync(dirHtml) || !fs.existsSync(flatHtml)) {
      allMatched = false;
      console.error(`  ❌ Missing published post for slug: ${slug}`);
    }
  }
  assert(allMatched, `All ${EXPECTED_LIVE_SLUGS.length} live articles match 100% with reconstructed outputs`);

  // Test Suite 2: Feature & Content Verification
  console.log('\n🔍 Test Suite 2: Features, Styles & Configurations');
  
  const searchIndexData = JSON.parse(fs.readFileSync(path.join(distDir, 'search-index.json'), 'utf-8'));
  assert(Array.isArray(searchIndexData) && searchIndexData.length === 30, `search-index.json contains exactly 30 indexable articles`);
  assert(searchIndexData.some((item: any) => item.title.includes('离线环境') && item.url === '/blog/verdaccio-offline'), 'search-index.json contains valid article entries');

  const homeHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
  assert(!homeHtml.includes('href="/blog/abc"'), 'Homepage archive does NOT contain unpublished draft "abc"');
  assert(!homeHtml.includes('href="/blog/def"'), 'Homepage archive does NOT contain unpublished draft "def"');
  assert(homeHtml.includes('href="/blog/verdaccio-offline"'), 'Homepage contains latest article "verdaccio-offline"');
  assert(homeHtml.includes('href="/favicon.ico"'), 'Homepage includes favicon link tag');
  assert(homeHtml.includes('search-modal') && homeHtml.includes('theme-toggle'), 'Homepage contains search modal and theme toggle button');
  assert(homeHtml.includes('back-to-top'), 'Homepage contains back-to-top button');

  const verdaccioHtml = fs.readFileSync(path.join(distDir, 'blog/verdaccio-offline/index.html'), 'utf-8');
  assert(verdaccioHtml.includes('Gitalk'), 'verdaccio-offline article includes Gitalk comment container');
  assert(!verdaccioHtml.includes('zooming'), 'verdaccio-offline article does NOT contain removed Zooming library');
  assert(verdaccioHtml.includes('GTM-K329WMFD'), 'verdaccio-offline article includes GTM container tracking code');
  assert(verdaccioHtml.includes('shiki'), 'verdaccio-offline article includes Shiki syntax highlighted code blocks');

  const openwrtHtml = fs.readFileSync(path.join(distDir, 'blog/OpenWrt/index.html'), 'utf-8');
  assert(openwrtHtml.includes('post-toc'), 'Multi-heading article (OpenWrt) includes right TOC container');

  const mainCss = fs.readFileSync(path.join(distDir, 'assets/main.css'), 'utf-8');
  assert(mainCss.includes('--shiki-light') && mainCss.includes('--shiki-dark'), 'main.css contains dual-theme Shiki CSS variables');
  assert(mainCss.includes('search-modal') && mainCss.includes('post-toc'), 'main.css contains search and TOC styling');
  assert(mainCss.includes('data-theme="dark"') || mainCss.includes('prefers-color-scheme: dark'), 'main.css contains dark mode styles');

  const sitemapXml = fs.readFileSync(path.join(distDir, 'sitemap.xml'), 'utf-8');
  assert(sitemapXml.includes('<loc>https://www.moselikk.com/blog/verdaccio-offline</loc>'), 'sitemap.xml contains correct canonical URLs');

  // Test Suite 3: Local Dev Server Routing & Clean URLs
  console.log('\n🌐 Test Suite 3: Local Dev Server Routing & Clean URLs (handleStaticRequest)');

  function testRoute(urlPath: string, expectedStatus: number, expectedSnippet?: string): boolean {
    const res = handleStaticRequest(urlPath);
    const contentStr = res.content.toString('utf-8');
    const statusMatch = res.status === expectedStatus;
    const contentMatch = expectedSnippet ? contentStr.includes(expectedSnippet) : true;
    return statusMatch && contentMatch;
  }

  // 1. 首页
  assert(testRoute('/', 200, 'moselikk'), 'GET / -> 200 OK (Homepage)');

  // 2. 核心文章路由（包括特殊字符与 copy slugify）
  assert(testRoute('/blog/verdaccio-offline', 200, '离线环境'), 'GET /blog/verdaccio-offline -> 200 OK');
  assert(testRoute('/blog/document-style-guide-copy', 200, '中文技术文档'), 'GET /blog/document-style-guide-copy -> 200 OK');
  assert(testRoute('/blog/eNSP-ERR40-copy', 200, '华为 eNSP'), 'GET /blog/eNSP-ERR40-copy -> 200 OK');
  assert(testRoute('/blog/mac-MDM', 200, 'Mac 企业监管机'), 'GET /blog/mac-MDM -> 200 OK');
  assert(testRoute('/blog/ChatGPT', 200, 'ChatGPT'), 'GET /blog/ChatGPT -> 200 OK');
  assert(testRoute('/blog/OpenWrt', 200, 'OpenWrt'), 'GET /blog/OpenWrt -> 200 OK');

  // 3. 关于页与摘录页
  assert(testRoute('/about', 200, '关于我...'), 'GET /about -> 200 OK');
  assert(testRoute('/about/', 200, '关于我...'), 'GET /about/ -> 200 OK');
  assert(testRoute('/excerpt', 200, '「读书 - 生活」 片段'), 'GET /excerpt -> 200 OK');
  assert(testRoute('/excerpt/', 200, '「读书 - 生活」 片段'), 'GET /excerpt/ -> 200 OK');

  // 4. 静态资源与搜索索引
  assert(testRoute('/assets/main.css', 200, 'font-family'), 'GET /assets/main.css -> 200 OK');
  assert(testRoute('/assets/main.js', 200, 'hitokoto'), 'GET /assets/main.js -> 200 OK');
  assert(testRoute('/search-index.json', 200, 'verdaccio-offline'), 'GET /search-index.json -> 200 OK (Search Index JSON)');
  assert(testRoute('/feed.xml', 200, '<rss'), 'GET /feed.xml -> 200 OK');
  assert(testRoute('/sitemap.xml', 200, '<urlset'), 'GET /sitemap.xml -> 200 OK');

  // 5. 404 自定义页面
  assert(testRoute('/non-existent-page-xyz', 404, '404: Page not found'), 'GET /non-existent-page-xyz -> 404 Not Found (Custom 404 Page)');

  console.log('\n========================================');
  console.log(`📊 Test Summary: ${passedCount} passed, ${failedCount} failed`);
  console.log('========================================\n');

  if (failedCount > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Test runner encountered an error:', err);
  process.exit(1);
});
