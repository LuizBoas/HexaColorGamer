import React from "react";
import "./styles.css";
import PageHeader from "../../components/PageHeader/index";
import { BsBoxArrowInRight } from "react-icons/bs";
import backgroundImage from "../../assets/images/capa.png";
import { Link } from "react-router-dom";

const Facade = () => {
  return (
    <div
      id="page-facade"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <PageHeader
        title="Você acha que pode identificar todas as cores pelo código hexadecimal? Prove jogando nosso emocionante jogo! "
        visibleIconBack={false}
      >
        <main>
          <article className="page-facade-container">
            <div className="button-init-container">
              <Link to="/game">
                <BsBoxArrowInRight size={40} className="button-container-img" />
                INICIAR
              </Link>
            </div>
          </article>
        </main>
      </PageHeader>
    </div>
  );
};

export default Facade;
