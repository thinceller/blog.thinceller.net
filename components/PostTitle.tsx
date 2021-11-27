import { VFC } from 'react';
import { Box, Heading, Text } from '@chakra-ui/layout';
import { formatDate } from '../lib/date';

export const PostTitle: VFC<{ title: string; date: string }> = ({
  title,
  date,
}) => {
  return (
    <Box my={10}>
      <Heading as="h1" size="lg" sx={{ mb: 4 }}>
        {title}
      </Heading>
      <Text>{formatDate(date)} 公開</Text>
    </Box>
  );
};
