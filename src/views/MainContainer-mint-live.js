import React from "react";

// Blocks
import Divider from "./elements/SectionDivider";
import Header from "./blocks/Header";
// import Intro from "./blocks/Intro";
import Rules from "./blocks/Rules";
import Characters from "./blocks/Characters";
import Roadmap from "./blocks/Roadmap";
import Faq from "./blocks/Faq";
import Team from "./blocks/Team";
import Footer from "./blocks/Footer";
import ConnectWallet from "./blocks/ConnectWallet";

import SiteTeaser from "../img/site-teaser.gif";


const MainContainerMintLive = () => {

  // Return the UI
  return (
      <main className="wrapper">
        <Header />
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
        <Divider />
        <Rules />
        <Divider />
        <Characters />
        <Divider />
        <Roadmap />
        <Divider />
        <Faq />
        <Divider />
        <Team />
        <Divider />
        <Footer />
      </main>
    )
  }

export default MainContainerMintLive;