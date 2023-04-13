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
  return (
    <div
      id="init-gamer"
      className="container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <PageHeader title="Você acha que pode identificar todas as cores pelo código hexadecimal? Prove jogando nosso emocionante jogo! ">
        <main>
          <article className="init-gamer-container">
            <div>
              <div className="init-button-container">
                <button onClick={startGame}>
                  <BsBoxArrowInRight
                    size={40}
                    className="button-container-img"
                  />
                  INICIAR
                </button>
              </div>
            </div>
          </article>
        </main>
      </PageHeader>
    </div>
  );
};

export default InitGamer;
