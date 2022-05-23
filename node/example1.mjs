import { writeFile } from "fs/promises";
import { circlepoints, circlepath } from "fachwerk";
import { Resvg } from "@resvg/resvg-js";

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
  <path
    d="${circlepoints(24, 50)
      .map((point) => circlepath(50, point))
      .join("")}"
    fill="none"
    stroke="lightblue"
    stroke-width="2"
    transform="translate(100,100)"
  />
</svg>
`;

const png = new Resvg(svg).render().asPng();
await writeFile("./example1.png", png);
