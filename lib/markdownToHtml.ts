import markdownIt from 'markdown-it';
import markdownItPrism from 'markdown-it-prism';

const md = markdownIt({ breaks: true, linkify: true });

md.use(markdownItPrism);

export function markdownToHtml(markdown: string) {
  return md.render(markdown);
}
