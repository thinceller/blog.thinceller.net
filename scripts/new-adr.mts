import fs from 'node:fs/promises';
import { format } from 'date-fns';
import enquirer from 'enquirer';

/**
 * Template for the ADR
 */
const template = `

## Status

<!-- What is the status, such as proposed, accepted, rejected, deprecated, superseded, etc.? -->

## Context

<!-- What is the issue that we're seeing that is motivating this decision or change. -->

## Decision

<!-- What is the change that we're actually proposing or doing. -->

## Consequences

<!-- What becomes easier or more difficult to do because of this change? -->
`;

async function main() {
  const res = await enquirer.prompt<{ title: string }>([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the ADR',
    },
  ]);

  /**
   * Convert the input title to kebab case
   */
  const title = res.title
    .split(' ')
    .map((word) => word.toLowerCase())
    .join('-');
  const date = new Date();
  const filename = `${format(date, 'yyyy-MM-dd')}-${title}.md`;
  const filepath = `docs/adr/${filename}`;

  fs.writeFile(filepath, `# ${res.title}${template}`);

  console.log(`Created ${filepath} successfully!`);
}

main();
