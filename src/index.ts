import { query, classes } from 'min-dom';

class ClickHighlighter {
  constructor(eventBus: any, canvas: any) {
    console.log('ClickHighlighter init');
    eventBus.on('element.click', (event: any) => {
      const gfx = event.element.gfx; // SVG 图形元素
      if (gfx) {
        classes(gfx).toggle('highlighted');
      }
    });
  }
}

export default {
  __init__: ['clickHighlighter'],
  clickHighlighter: ['type', ClickHighlighter],
};
