import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { createHighlighter, Highlighter } from 'shiki';
import matter from 'gray-matter';

let highlighterPromise: Promise<Highlighter> | null = null;

export function getHighlighterInstance() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-light', 'github-dark'],
      langs: [
        'javascript', 'typescript', 'jsx', 'tsx', 'html', 'css', 'scss',
        'json', 'yaml', 'markdown', 'bash', 'shell', 'zsh', 'python',
        'ruby', 'go', 'rust', 'c', 'cpp', 'java', 'sql', 'dockerfile',
        'nginx', 'diff'
      ]
    });
  }
  return highlighterPromise;
}

export interface PostMetadata {
  title?: string;
  date?: string | Date;
  author?: string;
  categories?: string | string[];
  layout?: string;
  permalink?: string;
  description?: string;
  published?: boolean;
  [key: string]: any;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface ParsedMarkdown {
  metadata: PostMetadata;
  contentHtml: string;
  rawContent: string;
  plainText: string;
  toc: TocItem[];
}

// 规范中英文间隙 (Pangu 规则精简高效实现)
export function spacingText(text: string): string {
  return text
    // 汉字与英文字符/数字之间插入空格
    .replace(/([\u4e00-\u9fa5])([a-zA-Z0-9])/g, '$1 $2')
    .replace(/([a-zA-Z0-9])([\u4e00-\u9fa5])/g, '$1 $2');
}

export async function parseMarkdown(fileContent: string): Promise<ParsedMarkdown> {
  const { data: metadata, content: rawContent } = matter(fileContent);
  const highlighter = await getHighlighterInstance();

  const toc: TocItem[] = [];
  let plainTextAcc = '';

  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(() => (tree: any) => {
      function visit(node: any, parent?: any, index?: number) {
        // 1. 提取标题用于 TOC (h2, h3)
        if (node.type === 'element' && (node.tagName === 'h2' || node.tagName === 'h3')) {
          const level = parseInt(node.tagName.substring(1), 10);
          const id = node.properties?.id || '';
          
          const extractText = (n: any): string => {
            if (n.type === 'text') return n.value;
            if (n.children) return n.children.map(extractText).join('');
            return '';
          };
          const titleText = extractText(node).trim();
          if (id && titleText) {
            toc.push({ id, text: titleText, level });
          }
        }

        // 2. 图片懒加载与异步解码属性注入
        if (node.type === 'element' && node.tagName === 'img') {
          node.properties = node.properties || {};
          node.properties.loading = 'lazy';
          node.properties.decoding = 'async';
        }

        // 3. 代码高亮
        if (node.type === 'element' && node.tagName === 'pre') {
          const codeNode = node.children?.find((child: any) => child.type === 'element' && child.tagName === 'code');
          if (codeNode) {
            const className = (codeNode.properties?.className as string[]) || [];
            const langClass = className.find((cls: string) => cls.startsWith('language-'));
            let lang = langClass ? langClass.replace('language-', '').toLowerCase() : 'text';
            
            if (lang === 'sh') lang = 'bash';
            if (lang === 'yml') lang = 'yaml';
            if (lang === 'js') lang = 'javascript';
            if (lang === 'ts') lang = 'typescript';

            const extractText = (n: any): string => {
              if (n.type === 'text') return n.value;
              if (n.children) return n.children.map(extractText).join('');
              return '';
            };
            const codeText = extractText(codeNode).replace(/\n$/, '');

            try {
              const loadedLangs = highlighter.getLoadedLanguages();
              const targetLang = loadedLangs.includes(lang) ? lang : 'text';
              
              const highlightedHtml = highlighter.codeToHtml(codeText, {
                lang: targetLang,
                themes: {
                  light: 'github-light',
                  dark: 'github-dark'
                },
                defaultColor: false
              });

              if (parent && typeof index === 'number') {
                parent.children[index] = {
                  type: 'raw',
                  value: `<div class="highlight">${highlightedHtml}</div>`
                };
              }
            } catch (err) {
              console.warn(`Highlight error for lang ${lang}:`, err);
            }
          }
        }

        // 收集纯文本用于搜索索引
        if (node.type === 'text') {
          plainTextAcc += ' ' + node.value;
        }

        if (node.children) {
          for (let i = 0; i < node.children.length; i++) {
            visit(node.children[i], node, i);
          }
        }
      }
      visit(tree);
    })
    .use(rehypeStringify, { allowDangerousHtml: true });

  const result = await processor.process(rawContent);

  // 纯文本摘要清理
  const cleanPlainText = plainTextAcc
    .replace(/\s+/g, ' ')
    .replace(/[#*`_~>\-\[\]\(\)]/g, '')
    .trim();

  return {
    metadata: metadata as PostMetadata,
    contentHtml: String(result),
    rawContent,
    plainText: cleanPlainText,
    toc
  };
}
