import React, { useState, createContext } from "react";

export const PlayerContext = createContext();

export const PlayerProvider = props => {
  const [activePlayer, setActivePlayer] = useState({
    playerID: "",
    hasPlayed: false,
    isEliminated: false
  });

  return (
    <PlayerContext.Provider value={[activePlayer, setActivePlayer]}>
      {props.children}
    </PlayerContext.Provider>
  );
}