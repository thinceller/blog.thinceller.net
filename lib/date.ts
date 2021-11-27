import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';

const tz = 'Asia/Tokyo';
dayjs.extend(timezone);
dayjs.tz.setDefault(tz);

/**
 * @param dateString ISO8601 date string
 * @returns formatted date string (e.g. 2020-01-01)
 */
export const formatDate = (dateString: string): string => {
  const date = dayjs(dateString);

  return date.format('YYYY-MM-DD');
};
