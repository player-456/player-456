import React from "react";
import { Link } from "react-router-dom";

// import Button from "../elements/Button";
import SiteTeaser from "../../../img/site-teaser.gif";


import Divider from "../../components/SectionDivider";
import Header from "./components/Header";
// import Intro from "./components/Intro";
import Rules from "./components/Rules";
import Characters from "./components/Characters";
import Roadmap from "./components/Roadmap";
import Faq from "./components/Faq";
import Team from "./components/Team";
import Footer from "./components/Footer";

const HomePage = () => {
return (
  <main className="wrapper">
    <Header />
    <section>
      <div className="intro intro-content">
        <h2 className="h4 start-date">
          Games have begun
        </h2>
        <Link to="/games" className="button button__cta">Launch Game</Link>

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