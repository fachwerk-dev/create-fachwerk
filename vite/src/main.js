import { createApp } from "vue";
import { Fachwerk } from "fachwerk/vue";
import "fachwerk/vue.css";
import "./style.css";

import index from "./index.md";

const app = createApp(index);

app.use(Fachwerk);
app.mount("#app");
