export const initializeBoard = (size = 4) => {
  const board = Array.from({ length: size }, () => Array(size).fill(0));
  addRandomTile(board);
  addRandomTile(board);
  return board;
};

const addRandomTile = (board) => {
  const empty = [];
  board.forEach((row, i) => row.forEach((val, j) => { if (val === 0) empty.push([i, j]); }));
  if (empty.length > 0) {
    const [i, j] = empty[Math.floor(Math.random() * empty.length)];
    board[i][j] = Math.random() < 0.5 ? 2 : 4;
  }
  return board;
};

const mergeRowLeft = (row) => {
  const nonZero = row.filter((x) => x !== 0);
  const merged = [];
  let score = 0;
  let i = 0;
  while (i < nonZero.length) {
    if (i < nonZero.length - 1 && nonZero[i] === nonZero[i + 1]) {
      const newVal = nonZero[i] * 2;
      merged.push(newVal);
      score += newVal;
      i += 2;
    } else {
      merged.push(nonZero[i]);
      i++;
    }
  }
  const newRow = [...merged, ...Array(row.length - merged.length).fill(0)];
  return { newRow, score };
};

const performMoveLeft = (board) => {
  let totalScore = 0;
  let changed = false;
  const newBoard = board.map((row) => {
    const { newRow, score } = mergeRowLeft(row);
    totalScore += score;
    if (JSON.stringify(newRow) !== JSON.stringify(row)) changed = true;
    return newRow;
  });
  return { newBoard, score: totalScore, changed };
};

const transpose = (board) => {
  return board[0].map((_, colIndex) => board.map((row) => row[colIndex]));
};

const reverseRows = (board) => {
  return board.map((row) => row.slice().reverse());
};

export const performMove = (board, direction) => {
  let tempBoard = board.map((row) => [...row]); // Deep copy
  switch (direction) {
    case 'right':
      tempBoard = reverseRows(tempBoard);
      break;
    case 'up':
      tempBoard = transpose(tempBoard);
      break;
    case 'down':
      tempBoard = reverseRows(transpose(tempBoard));
      break;
    default: // left
      break;
  }
  const { newBoard: moved, score, changed } = performMoveLeft(tempBoard);
  let finalBoard = moved;
  switch (direction) {
    case 'right':
      finalBoard = reverseRows(moved);
      break;
    case 'up':
      finalBoard = transpose(moved);
      break;
    case 'down':
      finalBoard = transpose(reverseRows(moved));
      break;
    default:
      break;
  }
  return { newBoard: finalBoard, score, changed };
};

export const move = (board, direction) => {
  const { newBoard, score, changed } = performMove(board, direction);
  if (changed) {
    addRandomTile(newBoard);
  }
  return { newBoard, score, changed };
};

export const isGameOver = (board) => {
  return !['up', 'down', 'left', 'right'].some((dir) => {
    const { changed } = performMove(board, dir);
    return changed;
  });
};

export const hasWon = (board) => board.flat().includes(2048);