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
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="stylesheet" href="/assets/main.css" />
  <link rel="alternate" type="application/rss+xml" title="${siteConfig.title}" href="/feed.xml" />
  
  <!-- Open Graph / Facebook / WeChat SEO -->
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

  <!-- Schema.org JSON-LD Structured Data -->
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

  <script type="module" src="/assets/main.js"></script>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
