import { defineConfig } from "vitepress";

export default defineConfig({
  title: `Fachwerk + Vitepress`,
  vue: { reactivityTransform: true },
  markdown: { html: true, breaks: true },
  themeConfig: {
    sidebar: {
      "/": [{ text: "index.md", link: "/" }],
    },
  },
});
