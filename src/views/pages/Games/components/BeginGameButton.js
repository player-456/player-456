import React, { useContext } from "react";
import { PlayerContext } from "util/PlayerContext";

const BeginGameButton = (props) => {
  const [activePlayer] = useContext(PlayerContext);

  return (
    <div>
      {activePlayer.hasPlayed ? (
        <button className={`button button__cta`} id={`beginGame`} disabled>
          Player has already played
        </button>
      ) : (
        <button className={`button button__cta`} onClick={() => {props.beginGame()}} id={`beginGame`}>
          Begin game
        </button>
      )}

    </div>
    )
  }

export default BeginGameButton;