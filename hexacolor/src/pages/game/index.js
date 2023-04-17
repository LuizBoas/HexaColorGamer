import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";

import "./styles.css";
import PageHeader from "../../components/PageHeader/index";
import hexaAnswerBlack from "../../assets/images/hexaAnswerBlack.png";
import hexaAnswerWhite from "../../assets/images/hexaAnswerWhite.png";
import { COLORS } from "../../constants/colors.js";

import {
  MdSportsScore,
  MdOutlineTimerOff,
  MdOutlineCleaningServices,
} from "react-icons/md";
import { GiArcheryTarget } from "react-icons/gi";
import { BiTimer } from "react-icons/bi";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { TbReload } from "react-icons/tb";

// Pagina que faz toda lógica do gamer ele tem três estados o estado de init,
// o playing e o endgamer
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
  //armazena a largura inicial da barra em porcentagem
  const [barWidth, setBarWidth] = useState(100);

  // Atualiza o tempo restante do jogo a cada segundo e verifica se o jogo acabou.
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
      if (countdown === limitSec && countdown >= 10) {
        checkAnswer("limiteSec");
        setLimitSec(limitSec - 10);
      }
      if (countdown === limitSec && countdown < 10) {
        checkAnswer("limiteSec");
        setLimitSec(0);
      }

      return () => clearTimeout(timer);
    }
  }, [gameState, countdown]);

  // Configura o layout da lista de cores para sempre rolar para a direita.
  useLayoutEffect(() => {
    const colorGrid = colorGridRef.current;
    const totalWidth = colorGrid.scrollWidth;
    const viewWidth = colorGrid.clientWidth;
    colorGrid.scrollLeft = totalWidth - viewWidth;
  }, [currentGame]);

  // calcula a largura atual da barra com base no tempo restante.
  useEffect(() => {
    const percentTimeLeft = (countdown - limitSec) / 10; // porcentagem de tempo restante
    const newBarWidth = percentTimeLeft * 100; // largura em porcentagem
    setBarWidth(newBarWidth);
  }, [countdown]);

  // Gera a cor de contraste com base na cor de fundo para que o texto seja legível.
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

  // Estabelecer quando o gamer acaba se o recorde será alterado ou não
  const endGame = () => {
    setGameState("endgamer");
    setHighScore((prevHighScore) => Math.max(prevHighScore, score));
    localStorage.setItem(
      "highScore",
      JSON.stringify(Math.max(highScore, score))
    );
  };

  // Gera três opções de resposta: uma cor correta e duas cores aleatórias.
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

  // Embaralha um array.
  const shuffle = (array) => {
    const shuffled = array.sort(() => Math.random() - 0.5);
    return shuffled;
  };

  // verifica se a opção escolhida pelo usuário está correta e atualiza a pontuação, as cores, e a largura da barra.
  const checkAnswer = (option) => {
    if (countdown < 10) {
      setLimitSec(0);
    } else {
      setLimitSec(countdown - 10);
    }
    let newColor = generateColor(true);
    while (
      currentGame.some((game) => game.color === newColor) ||
      newColor === currentColor
    ) {
      newColor = generateColor(true);
    }
    setCurrentColor(newColor);

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

  // A função resetData é responsável por redefinir o valor do highScore armazenado no localStorage para 0
  const resetData = () => {
    localStorage.setItem("highScore", JSON.stringify(0));
  };

  // A função getIsCorrectIcon recebe um objeto color como argumento e retorna um ícone
  // a partir da color está correta em relaçao a pergunta feita.
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
        return (
          <MdOutlineTimerOff
            color={color.colorContrast}
            size={40}
            className="icon-check-is-correct"
          />
        );
      default:
        return (
          <AiOutlineClose
            color={color.colorContrast}
            size={40}
            className="icon-check-is-correct"
          />
        );
    }
  };

  const findColorName = (colorHexadecimal) => {
    for (const key in COLORS) {
      if (COLORS[key] === colorHexadecimal) {
        return key;
      }
    }
    return null;
  };

  return (
    <div id="init-gamer" className="container">
      <PageHeader title="" visibleIconBack={true}>
        <main>
          <article className="page-gamer-container">
            <header className="header-icons">
              <div>
                <GiArcheryTarget size={40} color={`var(--color-primary)`} />
                <strong>{score} pts</strong>
              </div>
              <div>
                <BiTimer size={45} color={`var(--color-primary)`} />
                <strong>{countdown}s</strong>
              </div>
              <div>
                <MdSportsScore size={40} color={`var(--color-primary)`} />
                <strong>{highScore} pts</strong>
              </div>
            </header>

            <div className="container-color-grid">
              {currentGame.length === 0 && (
                <div className="color-grid-placeholder"></div>
              )}
              <div className="color-grid" ref={colorGridRef}>
                {currentGame.map((color, index) => (
                  <div
                    key={index}
                    className="color-box"
                    style={{ backgroundColor: color.color }}
                    title={findColorName(color.color)}
                  >
                    {getIsCorrectIcon(color)}
                    {color.isCorrect === true && (
                      <div>
                        <p
                          style={{ color: generateColorConstrast(color.color) }}
                        >
                          {color.color}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div>
              {gameState === "playing" && (
                <div>
                  <div
                    className={"container-answer-img"}
                    style={{
                      backgroundColor: currentColor,
                      position: "relative",
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
                    <div
                      className="countdown-bar-container"
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                      }}
                    >
                      <div
                        className="countdown-bar"
                        style={{
                          width: `${barWidth}%`,
                        }}
                      ></div>
                    </div>
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
                <div className="container-end-gamer-text">
                  <h1>Tempo esgotado!</h1>
                  {score === highScore && (
                    <p>
                      <b>
                        Parabéns você bateu o recorde!
                        <br /> Em apenas 30 segundos, você conseguiu fazer{" "}
                        {score} pontos!
                      </b>
                      <br />
                      Você agora é o novo campeão! Sua determinação valeu a pena
                      e você bateu o recorde anterior.Continue praticando e
                      supere a si mesmo agora!
                    </p>
                  )}
                  {highScore > score &&
                    highScore - score <= 10 &&
                    score > 0 && (
                      <p>
                        <b>
                          Impressionante! <br /> Em apenas 30 segundos, você
                          conseguiu fazer {score} pontos!
                        </b>
                        <br />
                        Você está melhorando cada vez mais! Faltou apenas{" "}
                        {highScore - score} pontos para atingir o recorde atual.
                        Continue assim e logo alcançará o recorde.
                      </p>
                    )}
                  {((highScore > score && highScore - score > 10) ||
                    score < 0) && (
                    <p>
                      <b>
                        Em apenas 30 segundos, você conseguiu fazer {score}{" "}
                        pontos!
                      </b>
                      <br />
                      Não desista! A prática leva à perfeição e tenho certeza de
                      que você pode superar essa pontuação.
                    </p>
                  )}
                </div>
              )}

              <div className="container-button-foot">
                <button
                  className="button-foot"
                  onClick={() => {
                    setGameState("init");
                  }}
                >
                  <TbReload size={31} className="button-foot-icon" />
                  Reiniciar
                </button>

                {gameState === "endgamer" && (
                  <Link to="/" className="button-foot" onClick={resetData}>
                    <MdOutlineCleaningServices
                      size={31}
                      className="button-foot-icon"
                    />
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
