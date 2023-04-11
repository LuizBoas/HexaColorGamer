import React, { useState, useEffect } from "react";
import "./styles.css";
import { COLORS } from "../../constants/colors.js";

const ColorGame = () => {
  //armazena a pontuação atual do jogador
  const [score, setScore] = useState(0);
  //armazena a maior pontuação já alcançada
  const [highScore, setHighScore] = useState(0);
  //armazena um array de objetos com as cores selecionadas e se a seleção foi correta ou não
  const [currentGame, setCurrentGame] = useState([]);
  //armazena a cor atual que o usuário precisa adivinhar
  const [currentColor, setCurrentColor] = useState("");
  //armazena as opções de resposta que são geradas aleatoriamente
  const [answerOptions, setAnswerOptions] = useState([]);
  //armazena o estado atual do jogo
  const [gameState, setGameState] = useState("init");
  //armazena o tempo restante para o jogo
  const [countdown, setCountdown] = useState(30);

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
    setCurrentColor(generateColor(true));
  };

  const endGame = () => {
    setGameState("gameover");
    setHighScore((prevHighScore) => Math.max(prevHighScore, score));
  };

  const generateColor = (booleanAnswerOptions) => {
    debugger;

    const index = Math.floor(Math.random() * Object.values(COLORS).length);
    if (booleanAnswerOptions) {
      setAnswerOptions(generateAnswerOptions(Object.values(COLORS)[index]));
    }
    return Object.values(COLORS)[index];
  };

  const generateAnswerOptions = (currentColorSelect) => {
    debugger;
    const options = [];
    for (let i = 0; i < 3; i++) {
      let option = generateColor();
      while (option === currentColorSelect || options.includes(option)) {
        option = generateColor();
      }
      options.push(option);
    }
    options.push(currentColorSelect);
    return shuffle(options);
  };

  const shuffle = (array) => {
    const shuffled = array.sort(() => Math.random() - 0.5);
    return shuffled;
  };

  const checkAnswer = (option) => {
    debugger;
    if (option === currentColor) {
      setScore((prevScore) => prevScore + 5);
      setCurrentGame((prevGame) => [
        ...prevGame,
        { color: currentColor, isCorrect: true },
      ]);
      setCurrentColor(generateColor(true));
      setCountdown(30);
    } else {
      setScore((prevScore) => Math.max(prevScore - 1, 0));
      setCurrentGame((prevGame) => [
        ...prevGame,
        { color: option, isCorrect: false },
      ]);
      endGame();
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
