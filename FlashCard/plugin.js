const dictionary = [
  { character: "我", pinyin: "wǒ", translation_es: "yo" },
  { character: "你", pinyin: "nǐ", translation_es: "tú" },
  { character: "好", pinyin: "hǎo", translation_es: "bueno" },
];

const CARD_SIZE = 2560;
const GAP = 100;
const COLS = 4;

const findDeep = (shape, name) => {
  if (shape.name === name) return shape;
  for (const child of shape.children ?? []) {
    const found = findDeep(child, name);
    if (found) return found;
  }
  return null;
};

try {
  // ── 1. Componentes disponibles ──────────────────────────────────────────
  const components = penpot.library.local.findComponents();
  console.log("[1] Total componentes:", components.length);
  components.forEach(c => console.log("    -", c.name, "| id:", c.id));

  const mainComponent = components.find(c => c.name === "simple");
  if (!mainComponent) {
    console.error("[!] Componente 'simple' no encontrado. Abortando.");
  } else {
    console.log("[2] Componente encontrado:", mainComponent.name, mainComponent.id);

    // ── 2. Métodos disponibles en el componente ──────────────────────────
    const proto = Object.getOwnPropertyNames(Object.getPrototypeOf(mainComponent));
    console.log("[2b] Métodos del componente:", proto.join(", "));

    for (let i = 0; i < dictionary.length; i++) {
      const entry = dictionary[i];
      console.log(`\n[3] Procesando entrada ${i}:`, entry);

      // ── 3. Instanciar ──────────────────────────────────────────────────
      let instance;
      try {
        instance = mainComponent.instantiate();
        console.log("[4] Instancia creada:", instance?.name, instance?.id);
      } catch (e) {
        console.error("[!] Error al instanciar:", e.message);
        break;
      }

      // ── 4. Posicionar ──────────────────────────────────────────────────
      instance.x = (i % COLS) * (CARD_SIZE + GAP);
      instance.y = Math.floor(i / COLS) * (CARD_SIZE + GAP);
      console.log("[5] Posición asignada: x=", instance.x, "y=", instance.y);

      // ── 5. Inspeccionar hijos ──────────────────────────────────────────
      console.log("[6] Hijos directos de la instancia:", instance.children?.map(c => c.name));
      instance.children?.forEach(child => {
        console.log("    hijo:", child.name, "| hijos suyos:", child.children?.map(c => c.name));
      });

      // ── 6. Buscar shapes por nombre ────────────────────────────────────
      const charShape   = findDeep(instance, "character");
      const pinyinShape = findDeep(instance, "pinyin");
      const transShape  = findDeep(instance, "translation_es");

      console.log("[7] Shapes encontrados:");
      console.log("    character:      ", charShape?.name ?? "NO ENCONTRADO");
      console.log("    pinyin:         ", pinyinShape?.name ?? "NO ENCONTRADO");
      console.log("    translation_es: ", transShape?.name ?? "NO ENCONTRADO");

      // ── 7. Asignar texto ───────────────────────────────────────────────
      if (charShape) {
        charShape.characters = entry.character;
        console.log("[8] character asignado:", entry.character);
      } else {
        console.warn("[!] No se pudo asignar 'character'");
      }

      if (pinyinShape) {
        pinyinShape.characters = entry.pinyin;
        console.log("[8] pinyin asignado:", entry.pinyin);
      } else {
        console.warn("[!] No se pudo asignar 'pinyin'");
      }

      if (transShape) {
        transShape.characters = entry.translation_es;
        console.log("[8] translation_es asignado:", entry.translation_es);
      } else {
        console.warn("[!] No se pudo asignar 'translation_es'");
      }
    }

    console.log("\n[✓] Script finalizado.");
  }
} catch (e) {
  console.error("[FATAL]", e.message);
  console.error(e.stack);
}