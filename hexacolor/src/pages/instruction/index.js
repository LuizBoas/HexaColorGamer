import React from "react";
import "./styles.css";
import PageHeader from "../../components/PageHeader/index";
import { HiOutlineBookOpen } from "react-icons/hi";
import hexaAnimation from "../../assets/images/hexaAnimationInstruction.gif";
import { Link } from "react-router-dom";

const Facade = () => {
  return (
    <div id="page-facade">
      <PageHeader
        title="Você acha que pode identificar todas as cores pelo código hexadecimal? Prove jogando nosso emocionante jogo! "
        visibleIconBack={true}
      >
        <main>
          <article className="page-facade-container">
            <div className={"container-img"}>
              <img className={"answer-img"} src={hexaAnimation} />
            </div>
            <div className="text-container">
              <h1>Como o jogo funciona?</h1>
              <p>
                O jogo consiste em acertar o máximo possível de cores em 30s.
                Quando o jogo iniciar, uma cor aleatória irá aparecer e para ela
                deverá aparecer 3 opções de resposta (obrigatoriamente em
                hexadecimal). Sendo duas incorretas (geradas aleatoriamente), é
                uma correta. A cada rodada, uma nova cor aparece, e o jogador
                terá 10s para responder e resultar em ganho ou perda de
                pontuação:
              </p>

              <ul>
                <li>Se o jogador não responder a tempo, ele perde 2 pontos.</li>
                <li>
                  Se o jogador responder a tempo, mas errado, perderá 1 ponto.
                </li>
                <li>
                  Se o jogador responder a tempo e corretamente, ganhará 5
                  pontos.
                </li>
              </ul>
            </div>
            <div className="container-button">
              <div className="button-tips-container">
                <Link to="/">
                  <HiOutlineBookOpen
                    size={40}
                    className="button-container-img"
                  />
                  TELA INICIAL
                </Link>
              </div>
            </div>
          </article>
        </main>
      </PageHeader>
    </div>
  );
};

export default Facade;
