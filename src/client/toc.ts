export function initToc() {
  const tocContainer = document.querySelector('.post-toc');
  if (!tocContainer) return;

  const tocLinks = document.querySelectorAll('.post-toc a');
  if (tocLinks.length === 0) return;

  const headings: HTMLElement[] = [];
  tocLinks.forEach(link => {
    const id = link.getAttribute('href')?.replace('#', '');
    if (id) {
      const heading = document.getElementById(id);
      if (heading) headings.push(heading);
    }
  });

  if (headings.length === 0) return;

  // 观察当前视口中最靠上的可见标题
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          tocLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    },
    {
      rootMargin: '0px 0px -70% 0px'
    }
  );

  headings.forEach(h => observer.observe(h));
}
