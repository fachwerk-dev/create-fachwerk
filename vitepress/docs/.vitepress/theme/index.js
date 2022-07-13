import DefaultTheme from "vitepress/theme";
import { Fachwerk } from "fachwerk";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(Fachwerk);
  },
};
