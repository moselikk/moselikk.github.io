import { Feed } from 'feed';
import { siteConfig } from '../templates/layout.js';

export interface FeedPostItem {
  title: string;
  url: string;
  date: Date;
  description?: string;
  content?: string;
}

export function generateRssFeed(posts: FeedPostItem[]): string {
  const feed = new Feed({
    title: siteConfig.title,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: "zh-CN",
    image: `${siteConfig.url}/apple-touch-icon.png`,
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteConfig.author}`,
    updated: posts.length > 0 ? posts[0].date : new Date(),
    feedLinks: {
      rss2: `${siteConfig.url}/feed.xml`,
    },
    author: {
      name: siteConfig.author,
      email: siteConfig.email,
      link: siteConfig.url
    }
  });

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${siteConfig.url}${post.url}`,
      link: `${siteConfig.url}${post.url}`,
      description: post.description || post.title,
      content: post.content || post.description || post.title,
      author: [
        {
          name: siteConfig.author,
          email: siteConfig.email,
          link: siteConfig.url
        }
      ],
      date: post.date
    });
  }

  return feed.rss2();
}
