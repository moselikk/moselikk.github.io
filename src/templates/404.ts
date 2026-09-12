import { renderLayout } from './layout.js';

export function render404Page(): string {
  const content = `<article class="post">
  <header class="post-header">
    <h1 class="post-title">404: Page not found</h1>
  </header>
  <div class="post-content">
    <p>抱歉，您访问的页面不存在。<a href="/">返回首页</a></p>
  </div>
</article>`;

  return renderLayout({
    title: "404 - Page Not Found",
    content
  });
}
