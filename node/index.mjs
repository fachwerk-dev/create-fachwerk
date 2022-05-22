import { promises } from "fs";
import { Resvg } from "@resvg/resvg-js";

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-201 -201 402 402" style="max-width: 402px;"><circle cx="0" cy="-100" r="100" fill="lightblue" style="mix-blend-mode: multiply;"></circle><circle cx="70.71067812" cy="-70.71067812" r="100" fill="lightblue" style="mix-blend-mode: multiply;"></circle><circle cx="100" cy="0" r="100" fill="lightblue" style="mix-blend-mode: multiply;"></circle><circle cx="70.71067812" cy="70.71067812" r="100" fill="lightblue" style="mix-blend-mode: multiply;"></circle><circle cx="0" cy="100" r="100" fill="lightblue" style="mix-blend-mode: multiply;"></circle><circle cx="-70.71067812" cy="70.71067812" r="100" fill="lightblue" style="mix-blend-mode: multiply;"></circle><circle cx="-100" cy="0" r="100" fill="lightblue" style="mix-blend-mode: multiply;"></circle><circle cx="-70.71067812" cy="-70.71067812" r="100" fill="lightblue" style="mix-blend-mode: multiply;"></circle><!--v-if--><path id="rectgrid" d="M 0,0 L 100,0 L 100,100 L 0,100 ZM 100,0 L 200,0 L 200,100 L 100,100 ZM 200,0 L 300,0 L 300,100 L 200,100 ZM 300,0 L 400,0 L 400,100 L 300,100 ZM 0,100 L 100,100 L 100,200 L 0,200 ZM 100,100 L 200,100 L 200,200 L 100,200 ZM 200,100 L 300,100 L 300,200 L 200,200 ZM 300,100 L 400,100 L 400,200 L 300,200 ZM 0,200 L 100,200 L 100,300 L 0,300 ZM 100,200 L 200,200 L 200,300 L 100,300 ZM 200,200 L 300,200 L 300,300 L 200,300 ZM 300,200 L 400,200 L 400,300 L 300,300 ZM 0,300 L 100,300 L 100,400 L 0,400 ZM 100,300 L 200,300 L 200,400 L 100,400 ZM 200,300 L 300,300 L 300,400 L 200,400 ZM 300,300 L 400,300 L 400,400 L 300,400 Z" transform="translate(-200, -200)" fill="none" stroke="black" stroke-width="2" opacity="0.1"></path></svg>
`;

const resvg = new Resvg(svg);
const pngData = resvg.render();
const pngBuffer = pngData.asPng();

await promises.writeFile("./svg.png", pngBuffer);
