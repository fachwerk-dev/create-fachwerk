import { createApp } from "vue";
import { Fachwerk } from "fachwerk";
import "fachwerk/style.css";
import "./style.css";

import index from "./index.md";

const app = createApp(index);
app.use(Fachwerk);
app.mount("#app");
