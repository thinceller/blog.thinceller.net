import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faRss } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer className="border-t border-gray-200">
      <div className="flex flex-row justify-between mx-auto max-w-screen-md p-6">
        <p>&copy; {new Date().getFullYear()} thinceller</p>
        <div className="flex flex-row gap-2">
          <a
            target="_blank"
            rel="noreferrer noopener"
            href="https://twitter.com/thinceller_dev"
            aria-label="Twitter link"
          >
            <FontAwesomeIcon
              icon={faTwitter}
              className="text-xl text-gray-400"
            />
          </a>
          <a
            target="_blank"
            rel="noreferrer noopener"
            href="https://github.com/thinceller"
            aria-label="GitHub link"
          >
            <FontAwesomeIcon
              icon={faGithub}
              className="text-xl text-gray-400"
            />
          </a>
          <a href="/rss.xml" aria-label="RSS Feed">
            <FontAwesomeIcon icon={faRss} className="text-xl text-gray-400" />
          </a>
        </div>
      </div>
    </footer>
  );
};
