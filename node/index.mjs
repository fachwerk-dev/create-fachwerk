import { promises } from "fs";
import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";
import { Resvg } from "@resvg/resvg-js";
import { Fachwerk } from "fachwerk";

const template = `
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
  <path
    :d="circlepoints(24,50)
      .map(point => circlepath(50,point))
      .join('')
    "
    fill="none"
    stroke="lightblue"
    stroke-width="2"
    transform="translate(100,100)"
  />
</svg>
`;

const app = createSSRApp({
  template,
});
app.use(Fachwerk);

const renderedSvg = await renderToString(app);
const png = new Resvg(renderedSvg).render().asPng();
await promises.writeFile("./example.png", png);
