import React from "react";

// Blocks
import Divider from "./components/SectionDivider";
import Header from "./pages/Home/components/Header";
// import Intro from "./pages/Home/components/Intro";
import Rules from "./pages/Home/components/Rules";
import Characters from "./pages/Home/components/Characters";
import Roadmap from "./pages/Home/components/Roadmap";
import Faq from "./pages/Home/components/Faq";
import Team from "./pages/Home/components/Team";
import Footer from "./pages/Home/components/Footer";
import ConnectWallet from "./pages/Home/components/ConnectWallet";

import SiteTeaser from "../img/site-teaser.gif";


const MainContainer = () => {

  // Return the UI
  return (
      <main className="wrapper">
        <Header />
        <section>
          <div className="intro intro-content">
            <h2 className="h4 start-date">
              Games starting November 5
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

export default MainContainer;