const board = penpot.root.children?.find(s => s.name === "Board");
console.log("board children names:", board?.children?.map(c => c.name));

const masterShape = board?.children?.find(s => s.name === "simple");
console.log("masterShape encontrado:", !!masterShape);

if (masterShape) {
  for (const key of Object.keys(masterShape)) {
    console.log(`masterShape.${key}:`, typeof masterShape[key]);
  }
}