interface SearchDoc {
  title: string;
  url: string;
  date: string;
  content: string;
}

let searchIndex: SearchDoc[] | null = null;
let activeIndex = -1;

export function initSearch() {
  const modal = document.getElementById('search-modal');
  const input = document.getElementById('search-input') as HTMLInputElement | null;
  const resultsContainer = document.getElementById('search-results');
  const openButtons = document.querySelectorAll('.open-search-btn');
  const closeBtn = document.getElementById('search-close');

  if (!modal || !input || !resultsContainer) return;

  async function loadIndex() {
    if (!searchIndex) {
      try {
        const res = await fetch('/search-index.json');
        searchIndex = await res.json();
      } catch (err) {
        console.error('Failed to load search index:', err);
      }
    }
  }

  function openSearch() {
    modal?.classList.add('active');
    document.body.style.overflow = 'hidden';
    loadIndex().then(() => {
      input?.focus();
      renderResults(input?.value || '');
    });
  }

  function closeSearch() {
    modal?.classList.remove('active');
    document.body.style.overflow = '';
    if (input) input.value = '';
    resultsContainer!.innerHTML = '';
    activeIndex = -1;
  }

  function escapeHtml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function highlightMatches(text: string, query: string, maxLength = 80): string {
    const escapedText = escapeHtml(text);
    if (!query.trim()) {
      return escapedText.slice(0, maxLength) + (escapedText.length > maxLength ? '...' : '');
    }

    const regex = new RegExp(`(${query.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    const matchIndex = escapedText.search(regex);
    let start = 0;
    if (matchIndex > 20) {
      start = Math.max(0, matchIndex - 20);
    }
    const snippet = escapedText.slice(start, start + maxLength);
    const highlighted = snippet.replace(regex, '<mark>$1</mark>');
    return (start > 0 ? '...' : '') + highlighted + (start + maxLength < escapedText.length ? '...' : '');
  }

  function renderResults(query: string) {
    if (!searchIndex) return;
    const q = query.trim().toLowerCase();
    activeIndex = -1;

    if (!q) {
      resultsContainer!.innerHTML = '<div class="search-empty-tip">输入关键词搜索 30+ 篇技术笔记与文章...</div>';
      return;
    }

    const matched = searchIndex.filter(item => {
      return item.title.toLowerCase().includes(q) || item.content.toLowerCase().includes(q);
    });

    if (matched.length === 0) {
      resultsContainer!.innerHTML = '<div class="search-empty-tip">未找到匹配文章</div>';
      return;
    }

    resultsContainer!.innerHTML = matched
      .slice(0, 8)
      .map((item, idx) => {
        const titleHighlight = highlightMatches(item.title, q, 60);
        const snippetHighlight = highlightMatches(item.content, q, 90);
        return `
          <a class="search-item" data-index="${idx}" href="${item.url}">
            <div class="search-item-title">${titleHighlight}</div>
            <div class="search-item-snippet">${snippetHighlight}</div>
          </a>
        `;
      })
      .join('');

    updateActiveItem();
  }

  function updateActiveItem() {
    const items = resultsContainer?.querySelectorAll('.search-item');
    if (!items) return;
    items.forEach((el, idx) => {
      if (idx === activeIndex) {
        el.classList.add('selected');
        el.scrollIntoView({ block: 'nearest' });
      } else {
        el.classList.remove('selected');
      }
    });
  }

  // 绑定快捷键 Cmd+K / Ctrl+K & Esc
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      if (modal.classList.contains('active')) {
        closeSearch();
      } else {
        openSearch();
      }
    } else if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeSearch();
    } else if (modal.classList.contains('active')) {
      const items = resultsContainer?.querySelectorAll('.search-item');
      if (!items || items.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex = (activeIndex + 1) % items.length;
        updateActiveItem();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = (activeIndex - 1 + items.length) % items.length;
        updateActiveItem();
      } else if (e.key === 'Enter' && activeIndex >= 0) {
        e.preventDefault();
        const selected = items[activeIndex] as HTMLAnchorElement;
        if (selected) {
          window.location.href = selected.href;
        }
      }
    }
  });

  input.addEventListener('input', (e) => {
    renderResults((e.target as HTMLInputElement).value);
  });

  openButtons.forEach(btn => btn.addEventListener('click', openSearch));
  closeBtn?.addEventListener('click', closeSearch);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeSearch();
  });
}
