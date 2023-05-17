#!/usr/bin/env node

import chalk from "chalk";
import fs from "fs";
import path from "path";
import { lstat } from "fs/promises";

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (error, filenames) => {
  if (error) {
    console.log(error);
  }
  const statPromises = filenames.map((filename) => {
    return lstat(path.join(targetDir, filename));
  });
  const allStats = await Promise.all(statPromises);

  for (let stats of allStats) {
    const index = allStats.indexOf(stats);

    if (stats.isFile()) {
      console.log(filenames[index]);
    } else {
      console.log(chalk.blue(filenames[index]));
    }
  }
});
