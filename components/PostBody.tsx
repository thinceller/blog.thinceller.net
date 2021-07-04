import type { VFC } from 'react';

import styles from './PostBody.module.css';

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
