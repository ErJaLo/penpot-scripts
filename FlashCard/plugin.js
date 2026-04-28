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

const components = penpot.library.local.findComponents();
const mainComponent = components.find(c => c.name === "simple");

if (!mainComponent) {
  console.error("Componente 'simple' no encontrado");
} else {
  for (let i = 0; i < dictionary.length; i++) {
    const entry = dictionary[i];

    const instance = mainComponent.instantiate();

    instance.x = (i % COLS) * (CARD_SIZE + GAP);
    instance.y = Math.floor(i / COLS) * (CARD_SIZE + GAP);

    const charShape   = findDeep(instance, "character");
    const pinyinShape = findDeep(instance, "pinyin");
    const transShape  = findDeep(instance, "translation_es");

    if (charShape)   charShape.characters   = entry.character;
    if (pinyinShape) pinyinShape.characters = entry.pinyin;
    if (transShape)  transShape.characters  = entry.translation_es;
  }
}