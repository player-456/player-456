import React, { useState } from "react";
import Countdown, { zeroPad } from "react-countdown";

// Random component
const Completionist = () => <span className="time-left">The round has ended</span>;

// Renderer callback with condition
const gamesRenderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    document.getElementById("gameSection").classList.add("hidden");
    //Disable ability to connect
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <div className="game-timer">
        <h2>Round ends in</h2>
        <span className="time-left">
          {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      </div>
    );
  }
};

const playersRenderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    document.getElementById("gameSection").classList.add("hidden");
    //Disable ability to connect
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <div className="game-timer">
        <h4>
          Time to end of round: {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </h4>
      </div>
    );
  }
};

// const roundEndTime = Date.UTC(2021, 9, 29, 10, 18) + 86400000;
const roundEndTime = Date.now() + 86400000;

const GameTimer = (props) => {
  // can be Games page or Players page
  const [parent] = useState(props.parent);

  return (

      <div className="game-timer">
        {parent === "games" ? (
           <Countdown date={roundEndTime} renderer={gamesRenderer} />
        ) : (
          <Countdown date={roundEndTime} renderer={playersRenderer} />
        )}

      </div>
    )
  }

export default GameTimer;