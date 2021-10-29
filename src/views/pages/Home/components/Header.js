import React from "react";
import mainLogo from "../img/456-logo.gif";

const Header = () => {
return (
    <header>
      <h1 alt="Player 456">
        <img src={mainLogo} className="logo" alt="Player 456 logo" role="presentation" />
      </h1>
    </header>
  )
}

export default Header;