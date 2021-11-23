import { VFC } from 'react';
import { Box, Heading, Text } from '@chakra-ui/layout';
import { format, parseISO } from 'date-fns';

export const PostTitle: VFC<{ title: string; date: string }> = ({
  title,
  date,
}) => {
  return (
    <Box my={10}>
      <Heading as="h1" size="lg" sx={{ mb: 4 }}>
        {title}
      </Heading>
      <Text>{format(parseISO(date), 'yyyy-MM-dd')} 公開</Text>
    </Box>
  );
};
