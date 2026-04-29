console.log("penpot keys:", Object.keys(penpot));
console.log("currentPage keys:", Object.keys(penpot.currentPage));

for (const key of Object.keys(penpot)) {
  console.log(`penpot.${key}:`, typeof penpot[key]);
}

for (const key of Object.keys(penpot.currentPage)) {
  console.log(`currentPage.${key}:`, typeof penpot.currentPage[key]);
}

const shape = penpot.currentPage.findShapes({ name: "simple" })?.[0];
console.log("shape keys:", shape ? Object.keys(shape) : "no encontrado");
if (shape) {
  for (const key of Object.keys(shape)) {
    console.log(`shape.${key}:`, typeof shape[key]);
  }
}