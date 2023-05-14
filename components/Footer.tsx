import { FC } from 'react';
import { Box, Stack, HStack, Text, Link, Icon } from '@chakra-ui/react';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Footer: FC = () => {
  return (
    <Box as="footer" borderTop="1px" borderTopColor="gray.200">
      <Stack
        direction="row"
        justify="space-between"
        mx="auto"
        maxW="800px"
        p={6}
      >
        <Text>&copy; {new Date().getFullYear()} thinceller</Text>
        <HStack>
          <Link
            href="https://twitter.com/thinceller_dev"
            isExternal
            aria-label="Twitter link"
          >
            <Icon
              as={FontAwesomeIcon}
              icon={faTwitter}
              color="gray.400"
              size="lg"
            />
          </Link>
          <Link
            href="https://github.com/thinceller"
            isExternal
            aria-label="GitHub link"
          >
            <Icon
              as={FontAwesomeIcon}
              icon={faGithub}
              color="gray.400"
              size="lg"
            />
          </Link>
          {/* TODO: rss へのリンクを追加する */}
        </HStack>
      </Stack>
    </Box>
  );
};
