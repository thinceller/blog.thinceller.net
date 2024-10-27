import { FC } from 'react';
import { formatDate } from '../lib/date';

export const PostTitle: FC<{ title: string; date: string }> = ({
  title,
  date,
}) => {
  return (
    <>
      <h1 className="my-4 text-custom-3xl font-bold">{title}</h1>
      <p>{formatDate(date)} 公開</p>
    </>
  );
};
