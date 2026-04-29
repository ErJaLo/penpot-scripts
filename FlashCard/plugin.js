const DICTIONARY = [
  { translation_es: "uno", pinyin: "yī", character: "一", categories: ["números"] },
  { translation_es: "dos", pinyin: "èr", character: "二", categories: ["números"] },
  { translation_es: "tres", pinyin: "sān", character: "三", categories: ["números"] },
  { translation_es: "cuatro", pinyin: "sì", character: "四", categories: ["números"] },
  { translation_es: "cinco", pinyin: "wǔ", character: "五", categories: ["números"] },
  { translation_es: "hermano mayor", pinyin: "gēge", character: "哥哥", categories: ["familia", "personas"] },
  { translation_es: "hermano menor", pinyin: "dìdi", character: "弟弟", categories: ["familia", "personas"] },
  { translation_es: "hermana mayor", pinyin: "jiějie", character: "姐姐", categories: ["familia", "personas"] },
  { translation_es: "hermana menor", pinyin: "mèimei", character: "妹妹", categories: ["familia", "personas"] },
  { translation_es: "yo", pinyin: "wǒ", character: "我", categories: ["pronombres", "básico"] },
  { translation_es: "tú", pinyin: "nǐ", character: "你", categories: ["pronombres", "básico"] },
  { translation_es: "él", pinyin: "tā", character: "他", categories: ["pronombres", "personas"] },
  { translation_es: "eso / aquel", pinyin: "nà", character: "那", categories: ["demostrativos", "básico"] },
];

// ── Config ──────────────────────────────────────────────────────────────────
const BOARD_W = 2560;
const BOARD_H = 1440;
const BOARD_GAP = 200;       // gap vertical entre boards de categoría
const PADDING = 60;          // padding interior del board
const CARD_GAP = 20;         // gap entre tarjetas
const COLS = 6;              // columnas del grid
const CARD_FILL_COLOR = "#f0eeeb";  // color de fondo de tarjeta (gris cálido claro)
const CARD_FILL_OPACITY = 0.85;
const BOARD_FILL_COLOR = "#1a1a2e"; // fondo del board (puedes cambiarlo)

// ── Helpers ─────────────────────────────────────────────────────────────────
function getCategories() {
  const cats = new Set();
  DICTIONARY.forEach(e => e.categories.forEach(c => cats.add(c)));
  return [...cats];
}

function getEntriesForCategory(cat) {
  return DICTIONARY.filter(e => e.categories.includes(cat));
}

function calcCardSize(count) {
  const availW = BOARD_W - PADDING * 2 - CARD_GAP * (COLS - 1);
  const cardW = Math.floor(availW / COLS);
  const rows = Math.ceil(count / COLS);
  const availH = BOARD_H - PADDING * 2 - CARD_GAP * (rows - 1);
  const cardH = Math.floor(availH / rows);
  return { cardW, cardH, rows };
}

async function createTextShape(text, x, y, w, h, fontSize, color, fontStyle) {
  const shape = penpot.createText(text);
  shape.x = x;
  shape.y = y;
  shape.width = w;
  shape.height = h;
  shape.characters = text;

  // Estilos de texto
  const styles = {
    fontSize,
    fill: { fillColor: color, fillOpacity: 1 },
    align: "center",
  };
  if (fontStyle === "serif") styles.fontFamily = "Georgia";

  try { shape.applyTextStyle(styles); } catch(e) {}

  return shape;
}

// ── Main ─────────────────────────────────────────────────────────────────────
try {
  const categories = getCategories();
  console.log("Categorías encontradas:", categories);

  let boardOffsetY = 0;

  for (const cat of categories) {
    const entries = getEntriesForCategory(cat);
    console.log(`Creando board '${cat}' con ${entries.length} entradas...`);

    const { cardW, cardH, rows } = calcCardSize(entries.length);

    // ── Board de categoría ──────────────────────────────────────────────────
    const board = penpot.createBoard();
    board.name = cat;
    board.x = 0;
    board.y = boardOffsetY;
    board.width = BOARD_W;
    board.height = BOARD_H;
    board.fills = [{ fillColor: BOARD_FILL_COLOR, fillOpacity: 1 }];
    board.borderRadius = 0;

    // ── Título de categoría (esquina superior izquierda) ───────────────────
    const titleShape = penpot.createText(cat.toUpperCase());
    titleShape.x = PADDING;
    titleShape.y = PADDING * 0.4;
    titleShape.width = 600;
    titleShape.height = 50;
    titleShape.characters = cat.toUpperCase();
    try {
      titleShape.applyTextStyle({
        fontSize: 28,
        fill: { fillColor: "#ffffff", fillOpacity: 0.3 },
        fontWeight: "500",
        align: "left",
      });
    } catch(e) {}

    // ── Tarjetas ────────────────────────────────────────────────────────────
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const col = i % COLS;
      const row = Math.floor(i / COLS);

      const cardX = PADDING + col * (cardW + CARD_GAP);
      const cardY = PADDING + row * (cardH + CARD_GAP);

      // Fondo de tarjeta
      const card = penpot.createBoard();
      card.name = entry.character;
      card.x = cardX;
      card.y = cardY;
      card.width = cardW;
      card.height = cardH;
      card.fills = [{ fillColor: CARD_FILL_COLOR, fillOpacity: CARD_FILL_OPACITY }];
      card.borderRadius = 16;

      // Carácter (grande, centrado, parte superior)
      const charSize = Math.min(Math.floor(cardH * 0.45), Math.floor(cardW * 0.6));
      const charShape = penpot.createText(entry.character);
      charShape.x = cardX;
      charShape.y = cardY + cardH * 0.12;
      charShape.width = cardW;
      charShape.height = charSize;
      charShape.characters = entry.character;
      try {
        charShape.applyTextStyle({
          fontSize: charSize,
          fill: { fillColor: "#111111", fillOpacity: 1 },
          align: "center",
          fontFamily: "Noto Serif SC",
        });
      } catch(e) {
        try { charShape.applyTextStyle({ fontSize: charSize, fill: { fillColor: "#111111", fillOpacity: 1 }, align: "center" }); } catch(e2) {}
      }

      // Pinyin
      const pinyinSize = Math.max(14, Math.floor(cardH * 0.07));
      const pinyinShape = penpot.createText(entry.pinyin);
      pinyinShape.x = cardX;
      pinyinShape.y = cardY + cardH * 0.62;
      pinyinShape.width = cardW;
      pinyinShape.height = pinyinSize * 2;
      pinyinShape.characters = entry.pinyin;
      try { pinyinShape.applyTextStyle({ fontSize: pinyinSize, fill: { fillColor: "#444444", fillOpacity: 1 }, align: "center" }); } catch(e) {}

      // Separador (rectángulo fino)
      const sep = penpot.createRectangle();
      sep.x = cardX + cardW * 0.35;
      sep.y = cardY + cardH * 0.76;
      sep.width = cardW * 0.3;
      sep.height = 1;
      sep.fills = [{ fillColor: "#999999", fillOpacity: 0.5 }];

      // Traducción
      const transSize = Math.max(12, Math.floor(cardH * 0.062));
      const transShape = penpot.createText(entry.translation_es);
      transShape.x = cardX;
      transShape.y = cardY + cardH * 0.8;
      transShape.width = cardW;
      transShape.height = transSize * 2;
      transShape.characters = entry.translation_es;
      try { transShape.applyTextStyle({ fontSize: transSize, fill: { fillColor: "#444444", fillOpacity: 1 }, align: "center" }); } catch(e) {}
    }

    boardOffsetY += BOARD_H + BOARD_GAP;
    console.log(`✓ Board '${cat}' creado`);
  }

  console.log("✓ Todos los boards creados");

} catch(e) {
  console.error("[FATAL]", e.message, e.stack);
}