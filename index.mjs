#!/usr/bin/env node

import { $, fs, path, cd, chalk } from "zx";
import prompts from "prompts";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const choices = [
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
  {
    title: "Slides",
    description: "With Tailwind support",
    value: "slides",
    protect: ["index.html"],
  },
];

const { sourceDir } = await prompts({
  type: "select",
  name: "sourceDir",
  message: "▦ Pick a Fachwerk template",
  choices,
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
  const choice = choices.filter((c) => c.value === sourceDir)[0];

  const filter = (src) => {
    const filename = path.basename(src);
    const targetPath = path.join(target, filename);
    if (fs.pathExistsSync(targetPath) && choice.protect?.includes(filename)) {
      return false;
    }
    return true;
  };

  await fs.copy(source, target, { filter });

  let npm = !["esm", "global", "slides"].includes(sourceDir);
  if (npm) {
    await cd(targetDir);
    await $`npm install`;
  }

  console.log(
    npm
      ? chalk.gray(
          `\nSuccessfully installed ${chalk.cyan(
            sourceDir
          )} template. Now run:\n\n${chalk.green(
            `cd ${targetDir}\nnpm run dev\n`
          )}`
        )
      : chalk.gray(
          `\nSuccessfully installed ${chalk.cyan(
            sourceDir
          )} template.\n\nNow open the ${chalk.green(
            `${targetDir}`
          )} directory in the browser and start editing.\n`
        )
  );
} catch (err) {
  console.error(err);
}
