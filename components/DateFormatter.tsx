import { VFC } from 'react';

import { formatDate } from '../lib/date';

type Props = {
  /**
   * ISO8601 date string
   */
  date: string;
};
export const DateFormatter: VFC<Props> = ({ date }) => {
  return <time dateTime={date}>{formatDate(date)}</time>;
};
