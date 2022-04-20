import { defineConfig } from "vitepress";

export default defineConfig({
  vue: { reactivityTransform: true },
  markdown: { html: true, breaks: true },
  themeConfig: {
    sidebar: {
      "/": [
        {
          text: "Pages",
          children: [
            { text: "Local data", link: "/" },
            { text: "Global data", link: "/index2" },
          ],
        },
      ],
    },
  },
});
