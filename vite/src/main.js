import { createApp } from "vue";
import { Fachwerk } from "fachwerk/vue";
import "fachwerk/fachwerk.css";
import "./style.css";

import index from "./index.md";

const app = createApp(index);

app.use(Fachwerk);
app.mount("#app");
