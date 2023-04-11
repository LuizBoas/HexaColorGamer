import React, { useState, useEffect } from "react";
import "./styles.css";

const COLORS = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#FFFFFF",
  "#000000",
];

const ColorGame = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [currentGame, setCurrentGame] = useState([]);
  const [currentColor, setCurrentColor] = useState("");
  const [answerOptions, setAnswerOptions] = useState([]);
  const [gameState, setGameState] = useState("init");
  const [countdown, setCountdown] = useState(30);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    if (gameState === "playing") {
      const timer = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      if (countdown === 0) {
        endGame();
      }
      return () => clearTimeout(timer);
    }
  }, [gameState, countdown]);

  const startGame = () => {
    setScore(0);
    setCurrentGame([]);
    setGameState("playing");
    setCurrentColor(generateColor());
    setAnswerOptions(generateAnswerOptions());
  };

  const endGame = () => {
    setGameState("gameover");
    setAnswered(true);
    setHighScore((prevHighScore) => Math.max(prevHighScore, score));
  };

  const generateColor = () => {
    const index = Math.floor(Math.random() * COLORS.length);
    return COLORS[index];
  };

  const generateAnswerOptions = () => {
    debugger;
    const options = [];
    for (let i = 0; i < 3; i++) {
      let option = generateColor();
      while (option === currentColor || options.includes(option)) {
        option = generateColor();
      }
      options.push(option);
    }
    options.push(currentColor);
    return shuffle(options);
  };

  const shuffle = (array) => {
    const shuffled = array.sort(() => Math.random() - 0.5);
    return shuffled;
  };

  const checkAnswer = (option) => {
    if (!answered) {
      setAnswered(true);
      if (option === currentColor) {
        setScore((prevScore) => prevScore + 5);
        setCurrentGame((prevGame) => [
          ...prevGame,
          { color: currentColor, isCorrect: true },
        ]);
        setCurrentColor(generateColor());
        setAnswerOptions(generateAnswerOptions());
        setCountdown(30);
        setAnswered(false);
      } else {
        setScore((prevScore) => Math.max(prevScore - 1, 0));
        setCurrentGame((prevGame) => [
          ...prevGame,
          { color: option, isCorrect: false },
        ]);
        endGame();
      }
    }
  };

  const restartGame = () => {
    setGameState("init");
    setCountdown(30);
    setCurrentGame([]);
  };

  const resetData = () => {
    setHighScore(0);
    setCurrentGame([]);
  };

  return (
    <div>
      <h1>Color Game</h1>
      <p>Score: {score}</p>
      <p>High Score: {highScore}</p>
      <div className="color-grid">
        {currentGame.map((color, index) => (
          <div
            key={index}
            className={`color-box ${color.isCorrect ? "correct" : "incorrect"}`}
            style={{ backgroundColor: color.color }}
          />
        ))}
      </div>
      {gameState === "init" && (
        <button className="start-button" onClick={startGame}>
          Start Game
        </button>
      )}
      {gameState === "playing" && (
        <div>
          <p>What color is:</p>
          <h2>{currentColor}</h2>
          <div className="answer-options">
            {answerOptions.map((option, index) => (
              <button key={index} onClick={() => checkAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
          <p>Time Left: {countdown}s</p>
        </div>
      )}
      {gameState === "gameover" && (
        <div>
          <h2>Game Over!</h2>
          <p>Your score: {score}</p>
          <button className="restart-button" onClick={restartGame}>
            Restart Game
          </button>
          <button className="reset-button" onClick={resetData}>
            Reset Data
          </button>
        </div>
      )}
    </div>
  );
};

export default ColorGame;
