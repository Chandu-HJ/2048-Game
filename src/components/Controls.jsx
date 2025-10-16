import React from 'react';
import './styles/Controls.css';

function Controls({ restartGame, draftSize, setDraftSize, applySize }) {
  return (
    <div className="controls">
      <button onClick={() => restartGame()} className="button">Restart</button>
      <button onClick={() => restartGame()} className="new-game-button">New Game</button>
      <div className="config">
        <label className="config-label">
          Board Size (any positive number):
          <input
            type="number"
            min="1"
            value={draftSize}
            onChange={(e) => setDraftSize(parseInt(e.target.value) || 4)}
            className="config-input"
          />
        </label>
        <button onClick={applySize} className="button">Apply Size</button>
      </div>
    </div>
  );
}

export default Controls;