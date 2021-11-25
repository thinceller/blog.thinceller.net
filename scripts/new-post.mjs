#!/usr/bin/env node

import fs from 'node:fs/promises';
import chalk from 'chalk';
import ora from 'ora';
import enquirer from 'enquirer';
import { format, formatISO } from 'date-fns';

const postsDirName = '_posts';

/**
 * Create _posts directory if it doesn't exist
 */
const spinner = ora(`Creating ${chalk.bold(postsDirName)} directory`).start();
await fs
  .mkdir(postsDirName)
  .then(() => {
    spinner.succeed(`${chalk.bold(postsDirName)} directory created.`);
  })
  .catch(() => {
    spinner.info(`${chalk.bold(postsDirName)} directory already exists.`);
  });

/**
 * Input new post slug and title
 * @type {{ slug: string, title: string }}
 */
const res = await enquirer.prompt([
  {
    type: 'input',
    name: 'slug',
    message: 'Enter new post slug:',
  },
  {
    type: 'input',
    name: 'title',
    message: 'Enter new post title:',
  },
]);

/**
 * Confirm new post creation
 */
enquirer
  .prompt({
    type: 'confirm',
    name: 'confirm',
    message: `Create new post ${chalk.bold(res.slug)}?`,
  })
  .then(async ({ confirm }) => {
    if (confirm) {
      /**
       * Create new post
       */
      const spinner = ora(`Creating new post ${chalk.bold(res.slug)}`).start();
      /**
       * Get current date
       */
      const date = new Date();
      await fs
        .writeFile(
          `${postsDirName}/${format(date, 'yyyy-MM-dd')}-${res.slug}.mdx`,
          postTemplate(res.title, date)
        )
        .then(() => {
          spinner.succeed(`New post ${chalk.bold(res.slug)} created.`);
        })
        .catch(() => {
          spinner.fail(`Failed to create new post ${chalk.bold(res.slug)}.`);
        });
    }
  });

function postTemplate(title, date) {
  return `---
title: ${title}
description: |
date: '${formatISO(date)}'
publishedTime: '${formatISO(date)}'
modifiedTime: '${formatISO(date)}'
tags:
---
`;
}
