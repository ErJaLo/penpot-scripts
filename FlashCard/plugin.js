// Ver qué métodos tiene un shape (el componente maestro en el canvas)
const allShapes = penpot.root.children;
console.log("root children count:", allShapes?.length);
console.log("root children names:", allShapes?.map(c => c.name));

const masterShape = allShapes?.find(s => s.name === "simple");
console.log("masterShape keys:", masterShape ? Object.keys(masterShape) : "no encontrado");
if (masterShape) {
  for (const key of Object.keys(masterShape)) {
    console.log(`masterShape.${key}:`, typeof masterShape[key]);
  }
}