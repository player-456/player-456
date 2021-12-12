import React, { useEffect, useState } from "react";
// import { PlayerContext } from "../../util/PlayerContext";
import VerifyPlayer from "../blocks/verifyPlayer";
import Header from "../blocks/GamesHeader";
import GameTimer from "../blocks/GameTimer";
import GameOne from "../blocks/SeasonOne/01.GameOne";

const GamesPage = () => {
  // const [activePlayer, setActivePlayer] = useContext(PlayerContext);
  const [gameActive, setGameActive] = useState(true);

  const toggleGameActive = () => {
    setGameActive(!gameActive);
  }

  useEffect(() => {
  }, [])

  const beginGame = () => {
    // This hides the "verify" window, reveals game window
    toggleGameActive();
  }

  const endGame = () => {
    // record score
    // set "hasPlayed" to true"
    toggleGameActive();
  }

return (
      <main className="wrapper">
        <div className="content-container">
          <Header />
          <GameTimer parent="games" />

          <section className="game-section desktop-only" id="gameSection">
            <div className="game-description">
              <h2>Round 1: Test reaction</h2>
              <p>Click on the circle or square created as fast as you can! Difficulties are constied. </p>
              <p>you can only play once. Once you lose, your score will be recorded.</p>
            </div>

            <div className="game-container">
              { gameActive ? (
                <div className="game" id="gameContainer">
                  <GameOne endGame={endGame} />
                </div>
              ) : (
                <VerifyPlayer beginGame={beginGame} />
              )}
            </div>

          </section>

          <div className="switch-to-desktop">
            We're sorry, but the games are not availble on mobile devices. Please switch to a desktop or laptop computer.
          </div>

        </div>
      </main>
  )
}

export default GamesPage;