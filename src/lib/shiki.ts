import type { HighlighterCore } from 'shiki/core';
import { createHighlighterCore } from 'shiki/core';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';

let highlighterInstance: HighlighterCore | null = null;

export const getHighlighter = async () => {
  if (highlighterInstance) {
    return highlighterInstance;
  }

  highlighterInstance = await createHighlighterCore({
    themes: [import('@shikijs/themes/night-owl')],
    langs: [
      import('@shikijs/langs/javascript'),
      import('@shikijs/langs/typescript'),
      import('@shikijs/langs/tsx'),
      import('@shikijs/langs/shell'),
      import('@shikijs/langs/json'),
      import('@shikijs/langs/yaml'),
      import('@shikijs/langs/markdown'),
      import('@shikijs/langs/css'),
      import('@shikijs/langs/html'),
      import('@shikijs/langs/bash'),
      import('@shikijs/langs/rust'),
    ],
    engine: createOnigurumaEngine(() => import('shiki/wasm')),
  });

  return highlighterInstance;
};
