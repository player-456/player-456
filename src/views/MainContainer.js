import React from "react";

// Blocks
import Divider from "./elements/SectionDivider";
import Header from "./blocks/Header";
import Intro from "./blocks/Intro";
import Rules from "./blocks/Rules";
import Characters from "./blocks/Characters";
import Roadmap from "./blocks/Roadmap";
import Faq from "./blocks/Faq";
import Team from "./blocks/Team";
import Footer from "./blocks/Footer";


const MainContainer = () => {

  // Return the UI
  return (
      <main className="wrapper">
        <Header />
        <Intro />
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