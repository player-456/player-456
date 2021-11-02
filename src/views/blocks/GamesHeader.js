import React from "react";
import { NavLink } from "react-router-dom";
import LogoSm from "../../img/player-456-logo-sm.png"
import TwitterIcon from "../../img/twitter-icon.png";
import DiscordIcon from "../../img/discord-icon.png";
import OpenSeaIcon from "../../img/opensea-icon.png";

const GamesHeader = () => {
return (
    <header className="games-header">
      <nav className="main-nav">
        <NavLink to="/" className="main-logo-link">
          <h1 className="main-logo-sm">
            <img src={LogoSm} alt="Player 456" />
          </h1>
        </NavLink>
        <ul>
          <li>
            <NavLink to="/games" className="main-nav-link">Games</NavLink>
          </li>
          <li>
            <NavLink to="/players" className="main-nav-link">Players</NavLink>
          </li>
          <li>
            <NavLink to="/rules" className="main-nav-link">Rules</NavLink>
          </li>
        </ul>
      </nav>

      <nav className="social-nav">
        <ul>
          <li><a href="https://twitter.com/beplayer456"><img src={TwitterIcon} className="social-nav--icon" alt="Player 456 on Twitter" /></a></li>
          <li><a href="https://discord.com/invite/aT9eUcuX53"><img src={DiscordIcon} className="social-nav--icon" alt="Player 456 on Discord" /></a></li>
          <li><a href="https://www.opensea.io"><img src={OpenSeaIcon} className="social-nav--icon" alt="Player 456 on OpenSea" /></a></li>
        </ul>
      </nav>
    </header>
  )
}

export default GamesHeader;