const board = penpot.root.children?.find(s => s.name === "Board");
const masterShape = board?.children?.find(s => s.name === "simple");

console.log("masterShape.id:", masterShape?.id);

// Intentar seleccionarlo y ver qué pasa
penpot.selection = [masterShape];
console.log("selection después:", JSON.stringify(penpot.selection));

// Ver si hay duplicate en penpot directamente
console.log("typeof penpot.duplicate:", typeof penpot.duplicate);
console.log("typeof penpot.copy:", typeof penpot.copy);
console.log("typeof penpot.clone:", typeof penpot.clone);

// Ver todas las funciones de penpot
const fns = Object.keys(penpot).filter(k => typeof penpot[k] === 'function');
console.log("Todas las funciones de penpot:", fns);