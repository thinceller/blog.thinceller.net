import type { FC } from 'react';
import { formatDate } from '../lib/date';
import { PostTags } from './PostTags';

type Props = {
  title: string;
  date: string;
  tags?: string[] | null;
};

export const PostTitle: FC<Props> = ({ title, date, tags }) => {
  return (
    <>
      <h1 className="my-4 text-custom-3xl font-bold">{title}</h1>
      <p>{formatDate(date)} 公開</p>
      <PostTags tags={tags} />
    </>
  );
};
