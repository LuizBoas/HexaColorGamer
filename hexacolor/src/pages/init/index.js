import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import "./styles.css";
import { COLORS } from "../../constants/colors.js";
import PageHeader from "../../components/PageHeader/index";
import { BsBoxArrowInRight } from "react-icons/bs";
import { MdSportsScore, MdOutlineTimerOff } from "react-icons/md";
import { GiArcheryTarget } from "react-icons/gi";
import { BiTimer } from "react-icons/bi";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import backgroundImage from "../../assets/images/capa.png";

const InitGamer = () => {
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
  //armazena a referência para o elemento DOM da div que contém a lista de cores
  const colorGridRef = useRef(null);

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

  useLayoutEffect(() => {
    const colorGrid = colorGridRef.current;
    const totalWidth = colorGrid.scrollWidth;
    const viewWidth = colorGrid.clientWidth;
    colorGrid.scrollLeft = totalWidth - viewWidth;
  }, [currentGame]);

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
    const index = Math.floor(Math.random() * Object.values(COLORS).length);
    if (booleanAnswerOptions) {
      setAnswerOptions(generateAnswerOptions(Object.values(COLORS)[index]));
    }
    return Object.values(COLORS)[index];
  };

  const generateAnswerOptions = (currentColorSelect) => {
    const options = [];
    for (let i = 0; i < 2; i++) {
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

  const getIsCorrectIcon = (iscorrect) => {
    switch (iscorrect) {
      case true:
        return (
          <AiOutlineCheck
            color="white"
            size={40}
            className="icon-check-is-correct"
          />
        );
      case "teste":
        return (
          <MdOutlineTimerOff
            color="white"
            size={40}
            className="icon-check-is-correct"
          />
        );
      default:
        return (
          <AiOutlineClose
            color="white"
            size={40}
            className="icon-check-is-correct"
          />
        );
    }
  };

  return (
    <div
      id="init-gamer"
      className="container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <PageHeader title="Você acha que pode identificar todas as cores pelo código hexadecimal? Prove jogando nosso emocionante jogo! ">
        <main>
          <article className="init-gamer-container">
            <header>
              <div className="header-score">
                <GiArcheryTarget size={40} color={`var(--color-primary)`} />
                <strong>{score} pts</strong>
              </div>
              <div className="header-time">
                <BiTimer size={45} color={`var(--color-primary)`} />
                <strong>{countdown}s</strong>
              </div>
              <div className="header-hight-score">
                <MdSportsScore size={40} color={`var(--color-primary)`} />
                <strong>{highScore} pts</strong>
              </div>
            </header>
            <div className="color-grid" ref={colorGridRef}>
              {currentGame.map((color, index) => (
                <div
                  key={index}
                  className="color-box"
                  style={{ backgroundColor: color.color }}
                >
                  {getIsCorrectIcon(color.isCorrect)}
                </div>
              ))}
            </div>
            <div>
              {gameState === "init" && (
                <div className="init-button-container">
                  <button onClick={startGame}>
                    <BsBoxArrowInRight
                      size={40}
                      className="button-container-img"
                    />
                    INICIAR
                  </button>
                </div>
              )}
              {gameState === "playing" && (
                <div>
                  <p>Que cor é essa:</p>
                  <div style={{ backgroundColor: currentColor }}>
                    <h1>dsdasdsa</h1>
                  </div>
                  <h2>{currentColor}</h2>
                  <div className="answer-options">
                    {answerOptions.map((option, index) => (
                      <button key={index} onClick={() => checkAnswer(option)}>
                        {option}
                      </button>
                    ))}
                  </div>
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
          </article>
        </main>
      </PageHeader>
    </div>
  );
};

export default InitGamer;
