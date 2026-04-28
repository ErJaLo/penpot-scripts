const dictionary = [
  { character: "我", pinyin: "wǒ", translation_es: "yo" },
  { character: "你", pinyin: "nǐ", translation_es: "tú" },
  { character: "好", pinyin: "hǎo", translation_es: "bueno" },
];

const CARD_SIZE = 2560;
const GAP = 100;
const COLS = 4;

// Busca el componente maestro en la librería local
const components = penpot.library.local.findComponents();
const mainComponent = components.find(c => c.name === "simple");

if (!mainComponent) {
  console.error("Componente 'simple' no encontrado");
} else {
  for (let i = 0; i < dictionary.length; i++) {
    const entry = dictionary[i];

    // Crea una instancia del componente — método correcto según la API
    const instance = mainComponent.instance();
    instance.x = (i % COLS) * (CARD_SIZE + GAP);
    instance.y = Math.floor(i / COLS) * (CARD_SIZE + GAP);

    // Busca los textos dentro de la instancia por nombre
    const children = penpot.currentPage.findShapes({ name: "character" });
    // Filtra los que pertenecen a esta instancia concreta
    const charShape = instance.children?.find(c => c.name === "character")
                   ?? instance.children?.find(c => c.children?.find(c2 => c2.name === "character"))
                      ?.children?.find(c2 => c2.name === "character");

    // Edita los textos
    const simpleGroup = instance.children?.find(c => c.name === "simple");
    if (simpleGroup) {
      simpleGroup.children?.find(c => c.name === "character").characters  = entry.character;
      simpleGroup.children?.find(c => c.name === "pinyin").characters     = entry.pinyin;
      simpleGroup.children?.find(c => c.name === "translation_es").characters = entry.translation_es;
    }
  }
}