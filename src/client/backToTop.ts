export function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  const scrollContainer = document.getElementById('article') || window;

  if (!btn) return;

  function checkScroll() {
    const scrollY = (scrollContainer === window)
      ? window.scrollY
      : (scrollContainer as HTMLElement).scrollTop;

    if (scrollY > 300) {
      btn?.classList.add('visible');
    } else {
      btn?.classList.remove('visible');
    }
  }

  scrollContainer.addEventListener('scroll', checkScroll, { passive: true });
  window.addEventListener('scroll', checkScroll, { passive: true });

  btn.addEventListener('click', () => {
    if (scrollContainer === window) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      (scrollContainer as HTMLElement).scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}
