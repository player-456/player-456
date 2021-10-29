import React from "react";
import TeamMember from "../../../components/TeamMember";
import DiscordIcon from "../img/discord-icon.png";
import TwitterIcon from "../img/twitter-icon.png";
import Clarina from "../img/team/clarina-site-ready.gif"
import Larissa from "../img/team/larissa-site-ready.gif"
import Meir from "../img/team/meir-site-ready.gif"
import Stevan from "../img/team/stevan-site-ready.gif"
import Subi from "../img/team/subi-site-ready.gif"
import Gabe from "../img/team/gabe-site-ready.gif"

const Team = () => {
return (
    <section className="team default-spacing">
      <div className="section-content__wide">
        <h2>The Team</h2>

        <div className="team-grid">
          <TeamMember
            img={Clarina}
            linkUrl="https://twitter.com/LittleTomato444"
            linkText="clarina"
            title="Art"
          />
          <TeamMember
            img={Larissa}
            linkUrl="https://twitter.com/ItsLarissaWith1"
            linkText="larissa"
            title="Games"
          />
          <TeamMember
            img={Stevan}
            linkUrl="https://twitter.com/stevyhacker"
            linkText="stevan"
            title="Blockchain"
          />
          <TeamMember
            img={Gabe}
            linkUrl="https://twitter.com/orzo__tweets"
            linkText="gabe"
            title="Frontend"
          />
          <TeamMember
            img={Subi}
            linkUrl="https://www.linkedin.com/in/subimurugan"
            linkText="subi"
            title="Backend"
          />
          <TeamMember
            img={Meir}
            linkUrl="https://twitter.com/iota0xf"
            linkText="meir"
            title="Ops"
          />
        </div>

        <div className="team-content">
          <p>We know there's money involved in this game, and when you choose to get one of the 456 NFTs you're placing a lot trust in us. <em>That's why we've chosen to lift our anonymity</em>, clarify our roadmap and show people the thought behind this project. Feel free to ask any of us anything, we're part of the community.</p>

          <p>This may hurt the mysterious nature of our game. We're ok with that.</p>
          <br />
        </div>

        <div className="social-links">
          <a href="https://twitter.com/beplayer456" target="_blank" rel="noreferrer">
            <img src={TwitterIcon} alt="twitter.com/beplayer456" />
          </a>

          <a href="https://discord.com/invite/aT9eUcuX53" target="_blank" rel="noreferrer">
            <img src={DiscordIcon} alt="discord.com/invite/aT9eUcuX53" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Team;