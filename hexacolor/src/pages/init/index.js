import React, { useState, useEffect } from "react";

function Init() {
  const [colors, setColors] = useState([]);
  const [currentColor, setCurrentColor] = useState("");
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [currentGame, setCurrentGame] = useState([]);

  useEffect(() => {
    generateNewColor();
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setScore(score - 2);
      generateNewColor();
    }
  }, [timeLeft]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score]);

  function generateNewColor() {
    const newColor = getRandomColor();
    setCurrentColor(newColor);
    const newOptions = getOptions(newColor);
    setOptions(newOptions);
    setTimeLeft(10);
    setGameOver(false);
    setCurrentGame([]);
    setScore(0);
  }

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function getOptions(correctColor) {
    const options = [correctColor];
    while (options.length < 3) {
      const newOption = getRandomColor();
      if (!options.includes(newOption)) {
        options.push(newOption);
      }
    }
    shuffleArray(options);
    return options;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function handleClick(option) {
    if (option === currentColor) {
      setScore(score + 5);
      setCurrentGame((prev) => [
        ...prev,
        { color: currentColor, correct: true, time: 10 - timeLeft },
      ]);
      generateNewColor();
    } else {
      setScore(score - 1);
      setCurrentGame((prev) => [
        ...prev,
        { color: option, correct: false, time: 10 - timeLeft },
      ]);
      if (score > highScore) {
        setHighScore(score);
      }
      setGameOver(true);
    }
  }

  useEffect(() => {
    if (!gameOver) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, gameOver]);

  return (
    <div className="App">
      <div className="game">
        <div className="header">
          <div className="score">
            <div className="label">SCORE</div>
            <div className="value">{score}</div>
          </div>
          <div className="high-score">
            <div className="label">HIGH SCORE</div>
            <div className="value">{highScore}</div>
          </div>
        </div>
        <div className="options">
          {options.map((option, index) => (
            <div
              className={`option ${
                gameOver && option === currentColor ? "correct" : ""
              }`}
              key={index}
              onClick={() => handleClick(option)}
              style={{ backgroundColor: option }}
            ></div>
          ))}
        </div>
        <div className="timer">{timeLeft}s</div>
        <div className="current-game">
          <div className="label">CURRENT/LATEST GAME</div>
          <div className="game-list">
            {currentGame.map((game, index) => (
              <div
                className={`game-item ${
                  game.correct ? "correct" : "incorrect"
                }`}
                key={index}
                style={{
                  backgroundColor: game.color,
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {game.correct ? "+" : "-"}
                <div className="time">{game.time}s</div>
              </div>
            ))}
          </div>
        </div>
        <div className="new-game">
          <button onClick={generateNewColor}>New Game</button>
        </div>
      </div>
    </div>
  );
}

export default Init;
