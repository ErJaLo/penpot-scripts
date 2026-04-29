// Ver si group devuelve algo útil o si hay otro método
console.log("typeof penpot.group:", typeof penpot.group);
console.log("typeof penpot.ungroup:", typeof penpot.ungroup);
console.log("typeof penpot.flatten:", typeof penpot.flatten);
console.log("typeof penpot.createVariantFromComponents:", typeof penpot.createVariantFromComponents);

// Intentar duplicar seleccionando y usando group trick
const board = penpot.root.children?.find(s => s.name === "Board");
const masterShape = board?.children?.find(s => s.name === "simple");

// Seleccionar el shape
penpot.selection = [masterShape];

// Ver si penpot.ui tiene sendMessage o similar
console.log("ui keys:", Object.keys(penpot.ui));
for (const key of Object.keys(penpot.ui)) {
  console.log(`ui.${key}:`, typeof penpot.ui[key]);
}