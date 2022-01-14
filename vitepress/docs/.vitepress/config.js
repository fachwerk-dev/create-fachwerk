import { defineConfig } from "vitepress";

export default defineConfig({
  vue: { reactivityTransform: true },
  markdown: { breaks: true },
  themeConfig: {
    sidebar: {
      "/": [
        {
          text: "Pages",
          children: [
            { text: "index.md", link: "/" },
            { text: "index2.md", link: "/index2" },
          ],
        },
      ],
    },
  },
});
