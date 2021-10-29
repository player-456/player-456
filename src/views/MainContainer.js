import React from "react";

import Divider from "./components/SectionDivider";
import Header from "./pages/Home/components/Header";
import Intro from "./pages/Home/components/Intro";
import Rules from "./pages/Home/components/Rules";
import Characters from "./pages/Home/components/Characters";
import Roadmap from "./pages/Home/components/Roadmap";
import Faq from "./pages/Home/components/Faq";
import Team from "./pages/Home/components/Team";
import Footer from "./pages/Home/components/Footer";

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