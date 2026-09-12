import { initHitokoto } from './hitokoto.js';
import { initDenglong } from './denglong.js';

function setupExternalLinks() {
  const origin = window.location.origin;
  const links = document.getElementsByTagName('a');
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    if (
      link.href &&
      link.href.indexOf(origin) !== 0 &&
      !link.href.startsWith('mailto:') &&
      !link.href.startsWith('javascript:') &&
      !link.href.startsWith('#')
    ) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  }
}

function setupResponsiveTables() {
  const tables = document.getElementsByTagName('table');
  for (let t = 0; t < tables.length; t++) {
    const table = tables[t];
    if (table.tHead && table.tHead.rows.length > 0 && table.tBodies.length > 0) {
      const ths = table.tHead.rows[0].cells;
      const trs = table.tBodies[0].rows;
      for (let r = 0; r < trs.length; r++) {
        const row = trs[r];
        for (let c = 0; c < row.cells.length && c < ths.length; c++) {
          row.cells[c].setAttribute('data-label', ths[c].textContent || '');
        }
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setupExternalLinks();
  setupResponsiveTables();
  initHitokoto();
  initDenglong();
});
