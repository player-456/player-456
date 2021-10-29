import React from "react";
import Character from "../../../components/Character";
import Players from "../img/characters/Players.gif";
import Guards from "../img/characters/Guards.gif";
import Detective from "../img/characters/Detective.gif";
import Frontman from "../img/characters/Frontman.gif";
import Salesman from "../img/characters/Salesman.png";
import Vip from "../img/characters/VIPs.gif";

const Characters = () => {
return (
    <section className="characters default-spacing">
      <div className="section-content__wide">
        <h2>The Characters</h2>

        <div className="characters-grid">
          <Character
            img={Players}
            name="Players"
            desc="456 players will be minted before each round and compete against each other in our Game Hall for a prize, starting at 11.4 ETH"
          />
          <Character
            img={Guards}
            name="Guards"
            desc="42 circles, 18 triangles and 5 square guards compete at climbing the organizational ladder and winning a .123 ETH bonus"
          />
          <Character
            img={Detective}
            name="The Detective"
            desc="The Detective has periodic showdowns with The Frontman, a chance to win the .25 ETH bonus & add 1 ETH to next game's prize pool"
          />
          <Character
            img={Frontman}
            name="The Frontman"
            desc="Listening to Sinatra and sipping whiskey, The Frontman waits to take down The Detective, win the .25 ETH prize and keep the machine rolling"
          />
          <Character
            img={Vip}
            name="VIPs"
            desc="Our 6 VIPs get to bet on the games outcome from the comfort of their penthouses. They have a 1/6 chance of winning .1 ETH every game"
          />
          <Character
            img={Salesman}
            name="The Salesman"
            desc="The salesman is a player's first contact with the game. If you received his card, he thinks you have a shot at being a winning player"
          />
        </div>
      </div>
    </section>
  )
}

export default Characters;