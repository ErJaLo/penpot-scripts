const dictionary = [
  { character: "我", pinyin: "wǒ", translation_es: "yo" },
  { character: "你", pinyin: "nǐ", translation_es: "tú" },
  { character: "好", pinyin: "hǎo", translation_es: "bueno" },
];

const CARD_SIZE = 2560;
const GAP = 100;
const COLS = 4;

// Busca el componente maestro por nombre
const mainComponent = penpot.currentPage.findComponent("simple");

for (let i = 0; i < dictionary.length; i++) {
  const entry = dictionary[i];

  // Instancia el componente
  const instance = mainComponent.createInstance();
  instance.x = (i % COLS) * (CARD_SIZE + GAP);
  instance.y = Math.floor(i / COLS) * (CARD_SIZE + GAP);

  // Navega la jerarquía: simple > value1 > [capa]
  const value1 = instance.findChild("value1");

  value1.findChild("character").characters   = entry.character;
  value1.findChild("pinyin").characters       = entry.pinyin;
  value1.findChild("translation_es").characters = entry.translation_es;
  // separator no necesita texto, es visual
}