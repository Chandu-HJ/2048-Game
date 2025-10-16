import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Board from './components/Board';
import Controls from './components/Controls';
import GameMessages from './components/GameMessages';
import Instructions from './components/Instructions';
import Score from './components/Score';
import { initializeBoard, move, hasWon, isGameOver } from './utils/GameLogic';

function App() {
  const [size, setSize] = useState(4);
  const [draftSize, setDraftSize] = useState(4);
  const [board, setBoard] = useState(() => initializeBoard(4));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const maxBoardWidth = 600; // Maximum board width to guide tile sizing
  const minTileSize = 30; // Minimum tile size for readability
  const maxTileSize = 100; // Maximum tile size
  const gap = 8; // Gap between tiles in px

  // Calculate tileSize accounting for gaps
  let calculatedTileSize = (maxBoardWidth - (size - 1) * gap) / size;
  const tileSize = Math.max(minTileSize, Math.min(maxTileSize, calculatedTileSize || minTileSize));
  const boardWidth = size * tileSize + (size - 1) * gap;

  // Prevent default arrow key behavior to avoid screen shake
  const handleKeyDown = useCallback(
    (event) => {
      const directions = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
      };
      const direction = directions[event.key];
      if (direction && !gameOver && !won) {
        event.preventDefault(); // Prevent browser scrolling
        const { newBoard, score: moveScore, changed } = move(board, direction);
        if (changed) {
          setBoard(newBoard);
          setScore((prev) => prev + moveScore);
          if (hasWon(newBoard)) {
            setWon(true);
          } else if (isGameOver(newBoard)) {
            setGameOver(true);
          }
        }
      }
    },
    [board, gameOver, won]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const restartGame = (newSize = size) => {
    setSize(newSize);
    setBoard(initializeBoard(newSize));
    setScore(0);
    setGameOver(false);
    setWon(false);
  };

  const applySize = () => {
    const newSize = Math.max(1, parseInt(draftSize) || 4); // Allow any positive integer
    setDraftSize(newSize);
    restartGame(newSize);
  };

  return (
    <div className="app">
      <h1 className="heading">2048 Game</h1>
      <Score score={score} />
      <Board board={board} size={size} tileSize={tileSize} boardWidth={boardWidth} gap={gap} />
      <GameMessages won={won} gameOver={gameOver} />
      <Controls
        restartGame={restartGame}
        draftSize={draftSize}
        setDraftSize={setDraftSize}
        applySize={applySize}
      />
      <Instructions />
    </div>
  );
}

export default App;