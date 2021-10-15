import React from "react";
import Divider from "../elements/SectionDivider";
import Header from "./Header";
import Intro from "./Intro";
import Rules from "./Rules";
import Characters from "./Characters";
import Roadmap from "./Roadmap";
import Faq from "./Faq";
import Team from "./Team";
import Footer from "./Footer";

class MainContainer extends React.Component {
  componentDidMount() {
    // javascripts
  }

  render() {
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
}

export default MainContainer;