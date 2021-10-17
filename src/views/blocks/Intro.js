import React from "react";
import ConnectWallet from "./ConnectWallet";
import SiteTeaser from "../../img/site-teaser.gif";

const Intro = () => {
return (
  <section>
    <div className="intro intro-content">
      <h2 className="h4 start-date">
        Games starting October 24
      </h2>

      <ConnectWallet />
    </div>

    <div className="site-teaser default-spacing">
      <img src={SiteTeaser} alt="456 players, 1 winner, 11.4 eth prize" />
    </div>

  </section>
  )
}

export default Intro