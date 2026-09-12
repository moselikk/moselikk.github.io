export type ThemeMode = 'auto' | 'light' | 'dark';

export function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  function getSavedTheme(): ThemeMode {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'auto';
  }

  function updateButtonTooltip(mode: ThemeMode) {
    if (mode === 'auto') {
      themeToggleBtn?.setAttribute('title', '主题：跟随系统 (点击切换为浅色模式)');
      themeToggleBtn?.setAttribute('aria-label', '主题：跟随系统 (点击切换为浅色模式)');
    } else if (mode === 'light') {
      themeToggleBtn?.setAttribute('title', '主题：浅色模式 (点击切换为深色模式)');
      themeToggleBtn?.setAttribute('aria-label', '主题：浅色模式 (点击切换为深色模式)');
    } else {
      themeToggleBtn?.setAttribute('title', '主题：深色模式 (点击切换为跟随系统)');
      themeToggleBtn?.setAttribute('aria-label', '主题：深色模式 (点击切换为跟随系统)');
    }
  }

  function applyTheme(mode: ThemeMode) {
    if (mode === 'auto') {
      localStorage.removeItem('theme');
      document.documentElement.removeAttribute('data-theme');
    } else {
      localStorage.setItem('theme', mode);
      document.documentElement.setAttribute('data-theme', mode);
    }
    updateButtonTooltip(mode);
  }

  // 初始化按钮提示
  updateButtonTooltip(getSavedTheme());

  themeToggleBtn.addEventListener('click', () => {
    const current = getSavedTheme();
    let next: ThemeMode;
    if (current === 'auto') {
      next = 'light';
    } else if (current === 'light') {
      next = 'dark';
    } else {
      next = 'auto';
    }
    applyTheme(next);
  });

  // 监听系统主题变化（仅在 auto 模式下有效，保持完全跟随系统）
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (!localStorage.getItem('theme')) {
      document.documentElement.removeAttribute('data-theme');
    }
  });
}
