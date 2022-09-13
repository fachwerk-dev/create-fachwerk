import * as f from "https://unpkg.com/fachwerk/dist/fachwerk.mjs";
import { render } from "https://deno.land/x/resvg_wasm/mod.ts";

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
  <path
    d="${f
      .circlepoints(24, 50)
      .map((point) => f.circlepath(50, point))
      .join("")}"
    fill="none"
    stroke="lightblue"
    stroke-width="2"
    transform="translate(100,100)"
  />
</svg>
`;

const png = await render(svg);
await Deno.writeFile("example1.png", png);
