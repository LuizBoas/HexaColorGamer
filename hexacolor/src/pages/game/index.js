import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import "./styles.css";
import { COLORS } from "../../constants/colors.js";
import PageHeader from "../../components/PageHeader/index";
import { MdSportsScore, MdOutlineTimerOff } from "react-icons/md";
import { GiArcheryTarget } from "react-icons/gi";
import { BiTimer } from "react-icons/bi";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import backgroundImage from "../../assets/images/capa.png";
import hexaAnswerBlack from "../../assets/images/hexaAnswerBlack.png";
import hexaAnswerWhite from "../../assets/images/hexaAnswerWhite.png";
import { Link } from "react-router-dom";

const Game = () => {
  //armazena a pontuação atual do jogador
  const [score, setScore] = useState(0);
  //armazena a maior pontuação já alcançada
  const [highScore, setHighScore] = useState(
    JSON.parse(localStorage.getItem("highScore") || 0)
  );
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
  //armazena o tempo restante de 10 segundos que o usuário tem pra responder
  const [limitSec, setLimitSec] = useState(20);
  //armazena a referência para o elemento DOM da div que contém a lista de cores
  const colorGridRef = useRef(null);

  useEffect(() => {
    if (gameState === "init") {
      setCurrentColor(generateColor(true));
      setCurrentGame([]);
      setGameState("playing");
      setCountdown(30);
      setLimitSec(20);
      setScore(0);
    }
    if (gameState === "playing") {
      const timer = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      if (countdown === 0) {
        endGame();
      }
      if (countdown === limitSec) {
        checkAnswer("limiteSec");
        setLimitSec(limitSec - 10);
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

  const generateColorConstrast = (corFundo) => {
    const luminosity =
      (0.2126 * parseInt(corFundo.substring(1, 3), 16) +
        0.7152 * parseInt(corFundo.substring(3, 5), 16) +
        0.0722 * parseInt(corFundo.substring(5, 7), 16)) /
      255;
    if (luminosity < 0.5) {
      return "#ffffff"; // cor branca para fundos escuros
    } else {
      return "#000000"; // cor preta para fundos claros
    }
  };

  const endGame = () => {
    setGameState("endgamer");
    setHighScore((prevHighScore) => Math.max(prevHighScore, score));
    localStorage.setItem(
      "highScore",
      JSON.stringify(Math.max(highScore, score))
    );
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
    setLimitSec(countdown - 10);
    setCurrentColor(generateColor(true));
    if (option === currentColor) {
      setScore((prevScore) => prevScore + 5);
      setCurrentGame((prevGame) => [
        ...prevGame,
        {
          color: currentColor,
          isCorrect: true,
          colorContrast: generateColorConstrast(currentColor),
        },
      ]);
    } else if (option === "limiteSec") {
      setScore((prevScore) => prevScore - 2);
      setCurrentGame((prevGame) => [
        ...prevGame,
        {
          color: currentColor,
          isCorrect: "limiteSec",
          colorContrast: generateColorConstrast(currentColor),
        },
      ]);
    } else {
      setScore((prevScore) => prevScore - 1);
      setCurrentGame((prevGame) => [
        ...prevGame,
        {
          color: currentColor,
          isCorrect: false,
          colorContrast: generateColorConstrast(currentColor),
        },
      ]);
    }
  };

  const resetData = () => {
    localStorage.setItem("highScore", JSON.stringify(0));
  };

  const getIsCorrectIcon = (color) => {
    switch (color.isCorrect) {
      case true:
        return (
          <AiOutlineCheck
            color={color.colorContrast}
            size={40}
            className="icon-check-is-correct"
          />
        );
      case "limiteSec":
        debugger;
        return (
          <MdOutlineTimerOff
            color={color.colorContrast}
            size={40}
            className="icon-check-is-correct"
          />
        );
      default:
        debugger;
        return (
          <AiOutlineClose
            color={color.colorContrast}
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
      <PageHeader title="" visibleIconBack={true}>
        <main>
          <article className="page-gamer-container">
            <header className="header-icons">
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
                  {getIsCorrectIcon(color)}
                </div>
              ))}
            </div>

            <div>
              {gameState === "playing" && (
                <div>
                  <div
                    className={"container-answer-img"}
                    style={{
                      backgroundColor: currentColor,
                    }}
                  >
                    <img
                      className={"answer-img"}
                      src={
                        generateColorConstrast(currentColor) === "#000000"
                          ? hexaAnswerBlack
                          : hexaAnswerWhite
                      }
                    />
                  </div>
                  <div className="answer-options">
                    {answerOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => checkAnswer(option)}
                        onMouseOver={(event) => {
                          event.target.style.backgroundColor = currentColor;
                          event.target.style.color =
                            generateColorConstrast(currentColor);
                        }}
                        onMouseOut={(event) => {
                          event.target.style.backgroundColor = "transparent";
                          event.target.style.color = "#333";
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {gameState === "endgamer" && (
                <div>
                  <h2>Game Over!</h2>
                  <p>Your score: {score}</p>
                </div>
              )}

              <div className="container-button-foot">
                <button
                  className="button-foot"
                  onClick={() => {
                    setGameState("init");
                  }}
                >
                  Reiniciar
                </button>

                {gameState === "endgamer" && (
                  <Link to="/" className="button-foot" onClick={resetData}>
                    Limpar dados
                  </Link>
                )}
              </div>
            </div>
          </article>
        </main>
      </PageHeader>
    </div>
  );
};

export default Game;
