import type { VFC } from 'react';

import styles from '../styles/markdown.module.css';

type PostBodyProps = {
  content: string;
};

export const PostBody: VFC<PostBodyProps> = ({ content }) => {
  return (
    <div
      className={styles['markdown']}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
