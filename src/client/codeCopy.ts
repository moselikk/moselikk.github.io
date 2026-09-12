export function initCodeCopy() {
  const highlights = document.querySelectorAll('div.highlight');
  
  highlights.forEach(highlight => {
    // 避免重复添加
    if (highlight.querySelector('.copy-code-btn')) return;

    const btn = document.createElement('button');
    btn.className = 'copy-code-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', '复制代码');
    btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;

    btn.addEventListener('click', async () => {
      const code = highlight.querySelector('pre code');
      if (!code) return;

      const text = code.textContent || '';
      try {
        await navigator.clipboard.writeText(text);
        btn.classList.add('copied');
        btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00ae50" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    });

    highlight.appendChild(btn);
  });
}
