import React from "react";
import { Link } from "react-router-dom";

// import Button from "../elements/Button";
import SiteTeaser from "../../img/site-teaser.gif";


import Divider from "../elements/SectionDivider";
import Header from "../blocks/Header";
import ConnectWallet from "../blocks/ConnectWallet";
import Rules from "../blocks/Rules";
import Characters from "../blocks/Characters";
import Roadmap from "../blocks/Roadmap";
import Faq from "../blocks/Faq";
import Team from "../blocks/Team";
import Footer from "../blocks/Footer";

const HomePage = () => {
return (
  <main className="wrapper">
    <Header />
    <section>
      <div className="intro intro-content">
        <h2 className="h4 start-date">
          Games will begin soon
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

export default HomePage;