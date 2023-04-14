import React from "react";
import Logo from "../../assets/images/logo.png";

import { AiOutlineRollback } from "react-icons/ai";

import "./styles.css";
import { useNavigate } from "react-router-dom";

const PageHeader = ({ title, visibleIconBack, children }) => {
  const navigate = useNavigate();

  const logoContainerStyle = {
    paddingTop: visibleIconBack ? "0" : "5%",
  };

  return (
    <header className="page-header">
      {visibleIconBack && (
        <div className="button-back-container">
          <button type="button" onClick={() => navigate(-1)}>
            <AiOutlineRollback
              size={48}
              className={"top-bar-container-icon-back"}
            />
          </button>
        </div>
      )}
      <div className="logo-container" style={logoContainerStyle}>
        <img src={Logo} alt="HexaColor" />
      </div>

      <div className="header-content">
        <strong>{title}</strong>

        {children}
      </div>
    </header>
  );
};

export default PageHeader;
