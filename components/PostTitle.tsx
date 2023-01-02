import { VFC } from 'react';
import { Heading, Text } from '@chakra-ui/react';
import { formatDate } from '../lib/date';

export const PostTitle: VFC<{ title: string; date: string }> = ({
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
