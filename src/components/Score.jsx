import React from 'react';
import './styles/Score.css';

function Score({ score }) {
  return <p className="score">Score: {score}</p>;
}

export default Score;