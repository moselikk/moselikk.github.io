export interface SiteConfig {
  title: string;
  description: string;
  url: string;
  author: string;
  email: string;
  gitalk: {
    clientID: string;
    clientSecret: string;
    repo: string;
    owner: string;
    admin: string[];
  };
}

export const siteConfig: SiteConfig = {
  title: "moselikk",
  description: "Less is more.",
  url: "https://www.moselikk.com",
  author: "Moselikk",
  email: "moselikk@gmail.com",
  gitalk: {
    clientID: 'Ov23liIfrOwneaRJHCAX',
    clientSecret: 'e7280b26ac83f5bf55be6040ec6a833e74da3705',
    repo: 'moselikk.github.io',
    owner: 'moselikk',
    admin: ['moselikk']
  }
};

export interface LayoutOptions {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  type?: 'website' | 'article';
  publishedDate?: string;
  includeGitalk?: boolean;
  content: string;
}

export function renderLayout(options: LayoutOptions): string {
  const pageTitle = options.title
    ? `${options.title} · ${siteConfig.title}`
    : `${siteConfig.title} | ${siteConfig.description}`;
  const pageDesc = options.description || siteConfig.description;
  const canonical = options.canonicalUrl || `${siteConfig.url}/`;
  const ogType = options.type || 'website';
  const siteLogo = `${siteConfig.url}/apple-touch-icon.png`;

  // JSON-LD 结构化数据
  const schemaJson = options.type === 'article'
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": options.title || siteConfig.title,
        "description": pageDesc,
        "url": canonical,
        "datePublished": options.publishedDate,
        "author": {
          "@type": "Person",
          "name": siteConfig.author
        },
        "publisher": {
          "@type": "Organization",
          "name": siteConfig.title,
          "logo": {
            "@type": "ImageObject",
            "url": siteLogo
          }
        }
      }
    : {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": siteConfig.title,
        "headline": siteConfig.title,
        "description": siteConfig.description,
        "url": siteConfig.url,
        "author": {
          "@type": "Person",
          "name": siteConfig.author
        },
        "publisher": {
          "@type": "Organization",
          "name": siteConfig.title,
          "logo": {
            "@type": "ImageObject",
            "url": siteLogo
          }
        }
      };

  return `<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="x-ua-compatible" content="ie=edge" />
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${escapeHtml(pageDesc)}" />
  <meta name="author" content="${escapeHtml(siteConfig.author)}" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="canonical" href="${canonical}" />
  <link rel="shortcut icon" href="/favicon.ico" />
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="stylesheet" href="/assets/main.css" />
  <link rel="alternate" type="application/rss+xml" title="${siteConfig.title}" href="/feed.xml" />
  
  <!-- 防白屏闪烁主题预执行脚本 -->
  <script>
    (function() {
      try {
        var saved = localStorage.getItem('theme');
        if (saved === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else if (saved === 'light') {
          document.documentElement.setAttribute('data-theme', 'light');
        }
      } catch(e) {}
    })();
  </script>

  <!-- Open Graph / Social SEO -->
  <meta property="og:site_name" content="${siteConfig.title}" />
  <meta property="og:type" content="${ogType}" />
  <meta property="og:title" content="${escapeHtml(pageTitle)}" />
  <meta property="og:description" content="${escapeHtml(pageDesc)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${siteLogo}" />
  <meta property="og:locale" content="zh_CN" />
  ${options.publishedDate ? `<meta property="article:published_time" content="${options.publishedDate}" />` : ''}

  <!-- Twitter Card SEO -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${escapeHtml(pageTitle)}" />
  <meta name="twitter:description" content="${escapeHtml(pageDesc)}" />
  <meta name="twitter:image" content="${siteLogo}" />

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
${JSON.stringify(schemaJson, null, 2)}
  </script>

  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-K329WMFD');</script>
  <!-- End Google Tag Manager -->

  ${options.includeGitalk ? `
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css" />
  <script src="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js"></script>
  ` : ''}
</head>
<body>
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K329WMFD"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->

  <!-- 顶部控制小工具（搜索 & 主题切换） -->
  <div class="top-actions">
    <button type="button" class="action-btn open-search-btn" aria-label="搜索 (Cmd+K)" title="搜索 (Cmd+K)">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      <span class="search-kbd">⌘K</span>
    </button>
    <button type="button" class="action-btn" id="theme-toggle" aria-label="主题：跟随系统 (点击切换)" title="主题：跟随系统 (点击切换)">
      <svg class="auto-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
      <svg class="sun-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
      <svg class="moon-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
    </button>
  </div>

  <div class="outer">
    <div class="page-content" id="article">
      <div class="wrapper">
        <div id="hitokoto" class="hitokoto">
          <a href="#" id="hitokoto_text">...... </a>
        </div>
        <div class="hanging-drop"></div>
        ${options.content}
      </div>
    </div>
  </div>

  <!-- 全局搜索弹窗浮层 -->
  <div id="search-modal" class="search-modal" aria-hidden="true">
    <div class="search-dialog">
      <div class="search-header">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input type="text" id="search-input" placeholder="输入搜索文章、技术笔记..." autocomplete="off" />
        <button type="button" id="search-close" class="search-close-btn" aria-label="关闭">Esc</button>
      </div>
      <div id="search-results" class="search-results"></div>
    </div>
  </div>

  <!-- 返回顶部按钮 -->
  <button type="button" id="back-to-top" class="back-to-top" aria-label="返回顶部" title="返回顶部">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>
  </button>

  <script type="module" src="/assets/main.js"></script>
</body>
</html>`;
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
