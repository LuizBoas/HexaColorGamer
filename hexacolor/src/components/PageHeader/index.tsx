import React, { ReactNode } from "react";
import logoImg from "../../assets/images/logo.png";

import "./styles.css";
import { useNavigate } from "react-router-dom";

const PageHeader = ({ title }) => {
  const navigate = useNavigate();

  return (
    <header className="page-header">
      <div className="top-bar-container">
        <button type="button" onClick={() => navigate(-1)}></button>
        <img src={logoImg} alt="GeekList" />
      </div>

      <div className="header-content">
        <strong>{title}</strong>
      </div>
    </header>
  );
};

export default PageHeader;
