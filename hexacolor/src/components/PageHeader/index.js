import React from "react";
import Logo from "../../assets/images/logo.png";

import "./styles.css";

const PageHeader = ({ title, children }) => {
  return (
    <header className="page-header">
      <div className="top-bar-container">
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
