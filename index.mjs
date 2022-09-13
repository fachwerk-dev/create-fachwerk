#!/usr/bin/env node

import { $, fs, path, cd, chalk } from "zx";
import prompts from "prompts";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const choices = [
  {
    title: "Vanilla JS",
    description: "Fachwerk without frameworks",
    value: "vanilla",
    //prettier-ignore
    message: data => chalk.gray(`\nSuccessfully installed ${chalk.cyan(data.sourceDir)} template.\n\nNow go to ${chalk.green(data.targetDir)} directory, and open the ${chalk.greenBright('index.html')} file in the browser\n`),
  },
  {
    title: "Vue",
    description: "Vue and Vite with Fachwerk",
    value: "vite",
    //prettier-ignore
    message: data => chalk.gray(`\nSuccessfully installed ${chalk.cyan(data.sourceDir)} template. Now run:\n\n${chalk.green(`cd ${data.targetDir}\nnpm run dev\n`)}`),
  },
  {
    title: "Vitepress",
    description: "Vitepress with Fachwerk",
    value: "vitepress",
    //prettier-ignore
    message: data => chalk.gray(`\nSuccessfully installed ${chalk.cyan(data.sourceDir)} template. Now run:\n\n${chalk.green(`cd ${data.targetDir}\nnpm run dev\n`)}`),
  },
  {
    title: "Petite Vue",
    description: "Lightweight Vue with Fachwerk",
    value: "petite-vue",
    //prettier-ignore
    message: data => chalk.gray(`\nSuccessfully installed ${chalk.cyan(data.sourceDir)} template.\n\nNow go to ${chalk.green(data.targetDir)} directory, and open the ${chalk.greenBright('index.html')} file in the browser\n`),
  },
  {
    title: "P5",
    description: "Post-Processing with Fachwerk",
    value: "p5",
    //prettier-ignore
    message: data => chalk.gray(`\nSuccessfully installed ${chalk.cyan(data.sourceDir)} template.\n\nNow go to ${chalk.green(data.targetDir)} directory, and open the ${chalk.greenBright('index.html')} file in the browser\n`),
  },
  {
    title: "Figma",
    description: "Create a Figma plugin with Fachwerk",
    value: "figma",
    //prettier-ignore
    message: data => chalk.gray(`\nSuccessfully installed ${chalk.cyan(data.sourceDir)} template.\n\nOpen the ${chalk.green(data.targetDir)} folder in Figma\n`),
  },
  {
    title: "Node",
    description: "NodeJS with Fachwerk",
    value: "node",
    //prettier-ignore
    message: data => chalk.gray(`\nSuccessfully installed ${chalk.cyan(data.sourceDir)} template. Now run:\n\n${chalk.green(`cd ${data.targetDir}\nnode filename.mjs\n`)}`),
  },
  {
    title: "Deno",
    description: "Deno with Fachwerk",
    value: "deno",
    message: (data) =>
      chalk.gray(
        `\nSuccessfully installed ${chalk.cyan(
          data.sourceDir
        )} template. Now run:\n\n${chalk.green(
          `cd ${data.targetDir}\ndeno run -A filename.js\n`
        )}`
      ),
  },
  {
    title: "Vue slides",
    description: "[Experimental]",
    value: "slides",
    protect: ["index.html"],
    //prettier-ignore
    message: data => chalk.gray(`\nSuccessfully installed ${chalk.cyan(data.sourceDir)} template.\n\nNow go to ${chalk.green(data.targetDir)} directory, and open the ${chalk.greenBright('index.html')} file in the browser\n`),
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
  console.log(choice.message({ sourceDir, targetDir }));
} catch (err) {
  console.error(err);
}
