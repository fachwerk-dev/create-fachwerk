#!/usr/bin/env node

import { $, fs, path, cd, chalk } from "zx";
import prompts from "prompts";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const { sourceDir } = await prompts({
  type: "select",
  name: "sourceDir",
  message: "Pick a Fachwerk template",
  choices: [
    {
      title: "Vite",
      description: "ViteJS with Fachwerk plugin",
      value: "vite",
    },
    {
      title: "Vitepress",
      description: "Vitepress with Fachwerk plugin",
      value: "vitepress",
    },
    {
      title: "Javascript ESM",
      description: "Singe JS file with ESM",
      value: "esm",
    },
    {
      title: "Javascript global",
      description: "Single JS file with globals",
      value: "global",
    },
  ],
  initial: 0,
});

const { targetDir } = await prompts({
  type: "text",
  name: "targetDir",
  message: "Project directory",
  initial: `fachwerk-${sourceDir}`,
});

try {
  const source = path.resolve(__dirname, sourceDir);
  const target = path.resolve(process.cwd(), targetDir);
  await fs.copy(source, target);
  let npm = !["esm", "global"].includes(sourceDir);
  if (npm) {
    await cd(targetDir);
    await $`npm install`;
  }
  console.log(
    `\n${chalk.gray(
      `Successfully installed ${chalk.cyan(sourceDir)} template.`
    )}`
  );

  console.log(
    npm
      ? `Now run \n\n${chalk.green(`cd ${targetDir}\nnpm run dev`)}`
      : chalk.gray(
          `\nNow open the ${chalk.green(
            `${targetDir}/index.html`
          )} in the browser and start editing\n`
        )
  );
} catch (err) {
  console.error(err);
}
