import DefaultTheme from "vitepress/theme";
import { Fachwerk } from "fachwerk";
import "fachwerk/style.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(Fachwerk);
  },
};
