import React from "react";
import SiteTeaser from "../../img/site-teaser.gif";

const Intro = () => {
return (
  <section className="intro">
    <div className="intro-content">
      <h2 className="h4 start-date">
        Next game announced on Halloween
      </h2>
    </div>

    <div className="site-teaser default-spacing">
      <img src={SiteTeaser} alt="456 players, 1 winner, 11.4 eth prize" />
    </div>

  </section>
  )
}

export default Intro