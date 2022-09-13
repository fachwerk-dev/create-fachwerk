figma.showUI(__html__);
figma.ui.hide();
figma.ui.onmessage = ({ message, circles }) => {
  if (message === "circles") {
    // Set up a frame
    const frame = figma.createFrame();
    frame.name = "Figma and Fachwerk";
    frame.x = -150;
    frame.y = -150;
    frame.resize(500, 500);

    const nodes = [];

    // Loop over the received circle coordinates
    // and create Figma circles

    circles.forEach(([x, y], i) => {
      const circle = figma.createEllipse();
      circle.name = `Ellipse ${i + 1}`;
      circle.x = x;
      circle.y = y;
      circle.resize(200, 200);
      circle.strokeWeight = 2;
      circle.strokes = [
        { type: "SOLID", color: { r: 173 / 255, g: 216 / 255, b: 230 / 255 } },
      ];
      circle.fills = [];
      figma.currentPage.appendChild(circle);
      nodes.push(circle);
    });

    // Group and zoom in on the circles

    const group = figma.group(nodes, frame);
    group.expanded = false;
    figma.currentPage.selection = [group];
    figma.viewport.scrollAndZoomIntoView([group]);
  }
  figma.closePlugin();
};
