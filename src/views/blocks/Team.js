import React from "react";
import TeamMember from "../elements/TeamMember";
import Placeholder from "../../img/team/Placeholder.png";
import DiscordIcon from "../../img/discord-icon.png";
import TwitterIcon from "../../img/twitter-icon.png";

const Team = () => {
return (
    <section className="team default-spacing">
      <div className="section-content__wide">
        <h2>The Team</h2>

        <div className="team-grid">
          <TeamMember
            img={Placeholder}
            linkUrl="#"
            linkText="@clarina"
            title="Art"
          />
          <TeamMember
            img={Placeholder}
            linkUrl="https://twitter.com/ItsLarissaWith1"
            linkText="@larissa"
            title="Games"
          />
          <TeamMember
            img={Placeholder}
            linkUrl="https://twitter.com/stevyhacker"
            linkText="@stevan"
            title="Blockchain"
          />
          <TeamMember
            img={Placeholder}
            linkUrl="https://twitter.com/orzo__tweets"
            linkText="@gabe"
            title="Site"
          />
          <TeamMember
            img={Placeholder}
            linkUrl="https://twitter.com/iota0xf"
            linkText="@meir"
            title="Ops"
          />
        </div>

        <div className="team-content">
          <p>We know there's money involved in this game, and when you choose to get one of the 456 NFTs you're placing a lot trust in us. That's why we've chosen to lift our anonymity, clarify our roadmap and show people the thought behind this project. Feel free to ask any of us anything, we're part of the community.</p>

          <p>This may hurt the mysterious nature of our game. <em>We're ok with that.</em></p>
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