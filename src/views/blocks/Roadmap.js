import React from "react";

const Roadmap = () => {
return (
    <section className="roadmap default-spacing">
      <h2>The Roadmap</h2>

      <div className="roadmap-grid">
        <div className="roadmap-grid--item">
          <h3>Game 1</h3>
          <ul className="roadmap-list">
            <li>456 players minted & recruited by The Salesman</li>
            <li>6 games played out on Discord and our website</li>
            <li>1 surviving player wins the <em>11.4 ETH prize</em></li>
            <li>VIPs, guards, detective & frontman are minted</li>
          </ul>
        </div>

        <div className="roadmap-grid--item">
          <h3>Game 2</h3>
          <ul className="roadmap-list">
            <li>New batch of 456 players play for a <em>13.68 ETH prize</em></li>
            <li>Guards and VIPs get their chance at a prize</li>
            <li>1st showdown: The Frontman vs The Detective</li>
            <li>A new character introduced on Discord</li>
          </ul>
        </div>

        <div className="roadmap-grid--item">
          <h3>Games 3-10 </h3>
          <ul className="roadmap-list">
            <li>New 456-players games 1 week after last game ends</li>
            <li>2 games for eliminated players at the 5 & 10 week marks</li>
            <li>Guards earn additional prizes by moderating Discord</li>
            <li>VIPs, Frontman & Detective have scheduled games</li>
          </ul>
        </div>

        <div className="roadmap-grid--item">
          <h3>After the Games</h3>
          <ul className="roadmap-list">
            <li>After all 4,560 players play, the game is burned forever</li>
            <li>Holders can exchange their NFT for a new game project</li>
            <li>Tier 1 (winning players & special characters) get new NFT</li>
            <li>Tier 2 (eliminated players & guards) whitelisted for NFT</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Roadmap;