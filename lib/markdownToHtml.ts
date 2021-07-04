import markdownIt from 'markdown-it';

const md = new markdownIt();

export function markdownToHtml(markdown: string) {
  return md.render(markdown);
}
