import React from 'react';
import './styles/Board.css';

function Board({ board, size, tileSize, boardWidth, gap }) {
  return (
    <div
      className="board"
      style={{
        gridTemplateColumns: `repeat(${size}, ${tileSize}px)`,
        gap: `${gap}px`,
        width: `${boardWidth}px`,
        height: `${boardWidth}px`,
        '--tile-size': `${tileSize}px`,
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((value, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`tile tile-${value || 0}`}
            style={{ width: `${tileSize}px`, height: `${tileSize}px` }}
          >
            {value !== 0 ? value : ''}
          </div>
        ))
      )}
    </div>
  );
}

export default Board;