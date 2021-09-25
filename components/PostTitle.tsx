import { VFC } from 'react';
import { Box, Heading, Text } from '@chakra-ui/layout';

export const PostTitle: VFC<{ title: string; date: string }> = ({
  title,
  date,
}) => {
  return (
    <Box>
      <Heading as="h1" size="lg" sx={{ mb: 4 }}>
        {title}
      </Heading>
      <Text mb="4">{date}</Text>
    </Box>
  );
};
