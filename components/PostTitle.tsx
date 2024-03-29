import { Heading, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { formatDate } from '../lib/date';

export const PostTitle: FC<{ title: string; date: string }> = ({
  title,
  date,
}) => {
  return (
    <>
      <Heading as="h1" size="lg" sx={{ mb: 4 }}>
        {title}
      </Heading>
      <Text>{formatDate(date)} 公開</Text>
    </>
  );
};
