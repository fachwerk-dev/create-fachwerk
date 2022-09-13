figma.showUI(__html__);
figma.ui.hide();
figma.ui.onmessage = ({ message, points }) => {
  if (message === "circles") {
    console.log(points);

    // const nodes = [];
    // points.forEach(([x, y]) => {
    //   console.log([x, y]);
    // const circle = figma.createEllipse();
    // circle.x = x;
    // circle.y = y;
    // circle.resize(200, 200);
    // circle.fills = { type: "SOLID", color: { r: 1, g: 0, b: 0 } };
    // figma.currentPage.appendChild(circle);
    // nodes.push(circle);
    //  });
    // figma.currentPage.selection = nodes;
    // figma.viewport.scrollAndZoomIntoView(nodes);
  }
  figma.closePlugin();
};
