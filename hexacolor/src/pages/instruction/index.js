import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";
import PageHeader from "../../components/PageHeader/index";
import hexaAnimation from "../../assets/images/hexaAnimationInstruction.gif";
import { BsArrowLeftSquare } from "react-icons/bs";

// Esse componente renderiza a página de instução do gamer
const Instruction = () => {
  return (
    <div id="page-instruction">
      <PageHeader title="" visibleIconBack={true}>
        <main>
          <article className="page-instruction-container">
            <div className={"container-background-img"}>
              <img className={"background-img"} src={hexaAnimation} />
            </div>
            <div className="text-container">
              <h1>Como o jogo funciona?</h1>
              <p>
                Bem-vindo ao nosso jogo de cores!{" "}
                <b>
                  O objetivo é acertar o máximo de cores possível em 30
                  segundos.
                </b>
                <br />
                Quando o jogo começar, uma cor aleatória aparecerá e você terá{" "}
                <b>10 segundos</b> para escolher a opção correta (que será
                exibida em hexadecimal). Existirão duas opções incorretas e uma
                correta, portanto escolha com sabedoria! Se você não responder a
                tempo, <b>perderá 2 pontos</b>. Se você responder a tempo, mas
                escolher a opção errada, <b>perderá 1 ponto</b>. Mas se você
                responder a tempo e escolher a opção correta,{" "}
                <b>ganhará 5 pontos!</b>
                <br />
                Ao longo do jogo, as cores irão mudar e você terá que ser rápido
                para escolher a opção correta. Pro fim, Você também poderá ver
                um histórico das cores referentes à partida atual, que dirá
                quais você acertou e quais errou.
              </p>
            </div>
            <div className="container-button-instruction">
              <Link to="/">
                <BsArrowLeftSquare size={40} className="button-container-img" />
                Tela Inicial
              </Link>
            </div>
          </article>
        </main>
      </PageHeader>
    </div>
  );
};

export default Instruction;
