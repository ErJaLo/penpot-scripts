const board = penpot.createBoard();
console.log("width descriptor:", JSON.stringify(Object.getOwnPropertyDescriptor(board, 'width')));
console.log("x descriptor:", JSON.stringify(Object.getOwnPropertyDescriptor(board, 'x')));
console.log("name descriptor:", JSON.stringify(Object.getOwnPropertyDescriptor(board, 'name')));

// Intentar setear x e y (sabemos que funcionan desde antes)
board.x = 100;
board.y = 100;
console.log("x después:", board.x);

// Intentar setear width directamente
try {
  board.width = 500;
  console.log("width seteado:", board.width);
} catch(e) {
  console.error("width error:", e.message);
}