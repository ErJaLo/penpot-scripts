const board = penpot.root.children?.find(s => s.name === "Board");
const masterShape = board?.children?.find(s => s.name === "simple");

// Inspeccionar hijos del shape
console.log("children:", masterShape?.children?.map(c => ({ name: c.name, type: c.type })));

// Bajar al variant 'simple' dentro
const variant = masterShape?.children?.find(c => c.name === "simple");
console.log("variant children:", variant?.children?.map(c => ({ name: c.name, type: c.type })));

// Intentar editar un texto directamente
const charShape = variant?.children?.find(c => c.name === "character");
console.log("charShape:", charShape?.name, typeof charShape?.characters);
if (charShape) {
  charShape.characters = "TEST";
  console.log("✓ Texto modificado");
}