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
  [key: string]: any;
}

export interface ParsedMarkdown {
  metadata: PostMetadata;
  contentHtml: string;
  rawContent: string;
}

export async function parseMarkdown(fileContent: string): Promise<ParsedMarkdown> {
  const { data: metadata, content: rawContent } = matter(fileContent);
  const highlighter = await getHighlighterInstance();

  // 自定义 remark/rehype 插件或在 rehype 阶段对 code 节点执行 shiki 渲染
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(() => (tree: any) => {
      // 遍历 AST 找到 pre > code 并应用 shiki 代码高亮
      function visit(node: any, parent?: any, index?: number) {
        if (node.type === 'element' && node.tagName === 'pre') {
          const codeNode = node.children?.find((child: any) => child.type === 'element' && child.tagName === 'code');
          if (codeNode) {
            const className = (codeNode.properties?.className as string[]) || [];
            const langClass = className.find((cls: string) => cls.startsWith('language-'));
            let lang = langClass ? langClass.replace('language-', '').toLowerCase() : 'text';
            
            // 别名修正
            if (lang === 'sh') lang = 'bash';
            if (lang === 'yml') lang = 'yaml';
            if (lang === 'js') lang = 'javascript';
            if (lang === 'ts') lang = 'typescript';

            // 提取代码文本
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

              // 将当前 pre 节点替换为 highlighed html 对应的 raw 节点
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

  return {
    metadata: metadata as PostMetadata,
    contentHtml: String(result),
    rawContent
  };
}
