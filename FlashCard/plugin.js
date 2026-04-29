const board = penpot.createBoard();
console.log("board fns:", Object.keys(board).filter(k => typeof board[k] === 'function'));
console.log("board keys:", Object.keys(board));