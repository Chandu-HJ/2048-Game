import React from 'react';
import './styles/GameMessages.css';

function GameMessages({ won, gameOver }) {
  return (
    <>
      {won && <p className="message win">🎉 You Won!</p>}
      {gameOver && <p className="message game-over">💀 Game Over!</p>}
    </>
  );
}

export default GameMessages;