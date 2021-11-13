import React, { useCallback } from "react";
import { useEffect, useState, useRef, useContext } from "react";
import { PlayerContext } from "util/PlayerContext";
import { updatePlayerDatabase } from "util/interactions-game";


const GameOne = (props) => {
  // This is the ID of the current player so we can pass it to the DB later
  const [activePlayer, setActivePlayer] = useContext(PlayerContext);

  const [reactionTime, setReactionTime] = useState(0);
  const [score, setScore] = useState(0);
  const [bestReactionTime, setBestReactionTime] = useState(15);

  const [boxDisplay, setBoxDisplay] = useState(false);
  const [resultDisplay, setResultDisplay] = useState(false);

  const [boxRadius, setBoxRadius] = useState(0);
  const [boxTop, setBoxTop] = useState(0);
  const [boxLeft, setBoxLeft] = useState(0);
  const [boxBackground, setBoxBackground] = useState(0);

  const [createdTime, setCreatedTime] = useState(0);
  const difficult = 1;
  const point= 50;
  const fault = 50;

  const makeBoxOutRef = useRef(null);
  const scoreRef = useRef(score);
  const gameContainerRef = useRef(null);
  scoreRef.current = score;

  // let makeBoxOut;
  const makeBox = useCallback(async () => {
    console.log('makebox');
    let time = Math.random();
    time = time*2500;

    makeBoxOutRef.current = setTimeout(() => {
      if (Math.random()>0.5) {
        setBoxRadius("100px");
      } else {
        setBoxRadius("0");
      }

      let top=Math.random();
      top=top*300;
      let left=Math.random();
      left=left*500;

      setBoxTop(top+"px");

      setBoxLeft(left+"px");

      setBoxBackground(getRandomColor());

      setBoxDisplay(true)

      setCreatedTime(Date.now());

    },time);
  }, []);

  useEffect(() => {
    makeBox();
    gameContainerRef.current.scrollIntoView();

    const timeOut = setTimeout(() => {
      clearTimeout(makeBoxOutRef.current);
      setResultDisplay(true);
      setBoxDisplay(false);
      alert('Game Over');

      //  Moved this to interactions-game.js

      // Here's the calculation for the total score; need to figure out best reaction time first.
      // Note: do we want to average their reaction time instead?
      // const totalScore = scoreRef.current / (.5 * bestReactionTime);
      updatePlayerDatabase(activePlayer.playerID, scoreRef.current);

      // Set player as "has played" on global Context
      setActivePlayer({hasPlayed: true});
    },5000);

    return () => {
      clearTimeout(makeBoxOutRef.current);
      clearTimeout(timeOut);
    };

  }, [activePlayer.playerID, makeBox, setActivePlayer]);

  const getRandomColor = () => {
    const letters="0123456789ABCDEF".split('');
    let color="#";
    for (let i=0; i < 6; i++){
      color+=letters[Math.round(Math.random()*15)];
    }
    return color;
  }

  const clickBox = () => {
    console.log('clickbox');
    const clickedTime = Date.now();
    console.log((clickedTime-createdTime) / 1000);

    setReactionTime((clickedTime-createdTime) / 1000);
    // document.getElementById("time").innerHTML = reactionTime;
    setBoxDisplay(false);

    console.log(reactionTime)
    console.log(bestReactionTime)

    if (reactionTime && (bestReactionTime >= reactionTime)) {
      setBestReactionTime(reactionTime);
    }

    if ((difficult === 1 && reactionTime > 4) || (difficult === 2 && (reactionTime > 2 && reactionTime < 3))) {
      setScore(score);
    } else if (difficult === 2 && reactionTime > 3) {
      setScore(score - fault);
    } else if(difficult === 3 && reactionTime > 1) {
      setScore(score - fault);
    } else{
      setScore(score + point);
    }

    makeBox();
  }

  return (
    <div ref={gameContainerRef}>
      <button className="button button__cta" onClick={() => {props.endGame()}}>End Game</button>
      <div className="background">

      <div className="fixedwidth">

        <div className="clear"> </div>

        <div className="clear"> </div>

        <div className="clear"> </div>

        <div id="border" className="border">

              { boxDisplay ? (
                  <div id="Box" className="Box" onClick={clickBox} style={{ borderRadius: boxRadius, top: boxTop, left: boxLeft, backgroundColor: boxBackground }}> </div>
                ) : ('')
              }

              <div className="clear"> </div>

              { resultDisplay ? (
                  <p id="result" className="result"> Best time: <span id="bestResult">{bestReactionTime}</span>s</p>
                ) : ('')
              }

        </div>

        <p className="timeBox">Your Time: <span id="time">{reactionTime}</span>s</p>

        <p className="scoreBox">Your score: <span id="score">{score}</span> points </p>

      </div>

      </div>
    </div>
  )
}

export default GameOne;
