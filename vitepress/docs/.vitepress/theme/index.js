import DefaultTheme from "vitepress/theme";
import { Fachwerk } from "fachwerk/vue";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(Fachwerk);
  },
};
