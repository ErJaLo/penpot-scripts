// Ver todas las keys de penpot sin ejecutar getters
console.log("penpot keys completo:", JSON.stringify(Object.keys(penpot)));
console.log("penpot.root keys:", JSON.stringify(Object.keys(penpot.root)));

// Ver si root tiene métodos útiles
for (const key of Object.keys(penpot.root)) {
  console.log(`root.${key}:`, typeof penpot.root[key]);
}

// Ver si hay createShape, createInstance, etc. directamente en penpot
const interestingKeys = Object.keys(penpot).filter(k => 
  typeof penpot[k] === 'function' || k.includes('create') || k.includes('shape') || k.includes('instance')
);
console.log("penpot funciones/interesantes:", interestingKeys);