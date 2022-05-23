import { writeFile } from "fs/promises";
import { Fachwerk } from "fachwerk";
import { Resvg } from "@resvg/resvg-js";

import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
  <path
    v-for="point in circlepoints(24,50)"
    :d="circlepath(50,point)"
    fill="none"
    stroke="lightblue"
    stroke-width="2"
    transform="translate(100,100)"
  />
</svg>
`;

const app = createSSRApp({
  template: svg,
});
app.use(Fachwerk);

const renderedSvg = await renderToString(app);
const png = new Resvg(renderedSvg).render().asPng();
await writeFile("./example2.png", png);
