import { renderLayout } from './layout.js';

export interface PostSummary {
  title: string;
  url: string;
  date: Date;
  year: number;
}

export function renderHomePage(posts: PostSummary[]): string {
  // 按年份分组
  const groupsByYear: { [year: number]: PostSummary[] } = {};
  for (const post of posts) {
    const y = post.year;
    if (!groupsByYear[y]) {
      groupsByYear[y] = [];
    }
    groupsByYear[y].push(post);
  }

  const sortedYears = Object.keys(groupsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  let listHtml = '';
  for (const year of sortedYears) {
    const yearPosts = groupsByYear[year];
    listHtml += `\n    <h2 id="y${year}">${year}</h2>\n    <ul class="post-list">`;
    for (const post of yearPosts) {
      listHtml += `\n      <li><a class="post-link" href="${post.url}">${post.title}</a></li>`;
    }
    listHtml += `\n    </ul>`;
  }

  const content = `<article class="post" itemscope itemtype="http://schema.org/BlogPosting">
<div class="post-content" itemprop="articleList">${listHtml}
</div>
</article>`;

  return renderLayout({
    content
  });
}
