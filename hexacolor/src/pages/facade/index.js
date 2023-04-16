import React from "react";
import "./styles.css";
import PageHeader from "../../components/PageHeader/index";
import { CiPlay1 } from "react-icons/ci";
import { HiOutlineBookOpen } from "react-icons/hi";
import { MdSportsScore } from "react-icons/md";
import hexaAnimation from "../../assets/images/hexaAnimation.gif";
import { Link } from "react-router-dom";

const Facade = () => {
  const highScore = JSON.parse(localStorage.getItem("highScore") || 0);

  return (
    <div id="page-facade">
      <PageHeader
        title="Você acha que pode identificar todas as cores pelo código hexadecimal? Prove jogando nosso emocionante jogo! "
        visibleIconBack={false}
      >
        <main>
          <article className="page-facade-container">
            <div className={"container-img"}>
              <img className={"answer-img"} src={hexaAnimation} />
            </div>
            <div className="hight-score-container">
              <MdSportsScore size={35} color={`var(--tertiary-color)`} />
              <strong>Recorde atual: {highScore} pts</strong>
            </div>
            <div className="container-button">
              <div className="button-init-container">
                <Link to="/game">
                  <CiPlay1 size={40} className="button-container-img" />
                  INICIAR
                </Link>
              </div>
              <div className="button-tips-container">
                <Link to="/instruction">
                  <HiOutlineBookOpen
                    size={40}
                    className="button-container-img"
                  />
                  INSTRUÇÕES
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
