const board = penpot.root.children?.find(s => s.name === "Board");
const masterShape = board?.children?.find(s => s.name === "simple");

// Ver si tiene info de componente
console.log("mainComponent:", masterShape?.mainComponent);
console.log("componentId:", masterShape?.componentId);
console.log("mainInstance:", masterShape?.mainInstance);

// Ver si penpot.selection tiene métodos útiles
console.log("selection keys:", Object.keys(penpot.selection));
console.log("selection:", JSON.stringify(penpot.selection));

// Ver si history tiene duplicate
console.log("history keys:", Object.keys(penpot.history));
for (const key of Object.keys(penpot.history)) {
  console.log(`history.${key}:`, typeof penpot.history[key]);
}