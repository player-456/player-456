// import React from "react";

// const GameOne = (props) => {
// return (
//   <div>
//     <h3>Hello form Game 1</h3>
//     <button className="button button__cta" onClick={()=>{props.endGame();}}>End game</button>
//   </div>
//   )
// }

// export default GameOne;


import React from "react";
import { useEffect, useState, useRef } from "react";


const GameOne = (props) => {
  const [reactionTime, setReactionTime] = useState(0);
  const [score, setScore] = useState(0);
  const [bestReactionTime, setBestReactionTime] = useState(0);

  const [boxDisplay, setBoxDisplay] = useState(false);
  const [resultDisplay, setResultDisplay] = useState(false);
  
  const [boxRadius, setBoxRadius] = useState(0);
  const [boxTop, setBoxTop] = useState(0);
  const [boxLeft, setBoxLeft] = useState(0);
  const [boxBackground, setBoxBackground] = useState(0);

  const [createdTime, setCreatedTime] = useState(0);
  const [difficult, setDifficult] = useState(1);
  const [point, setPoint] = useState(50);
  const [fault, setFault] = useState(50);

  const makeBoxOutRef = useRef(null);
  const scoreRef = useRef(score);
  scoreRef.current = score;

  // let makeBoxOut;

  useEffect(() => {
    makeBox();

    console.log(props.playerId)

    fetch("http://player456.herokuapp.com/api/players", {   
        "method": 'GET', // The method
        "headers": { 
          "content-type": "application/x-www-form-urlencoded",
        }
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
      })
      .catch(err => {
        console.log(err);
      });

    const timeOut = setTimeout(() => {
      clearTimeout(makeBoxOutRef.current);
      setResultDisplay(true);
      setBoxDisplay(false);
      alert('Game Over');

      console.log(scoreRef.current)

      fetch("http://player456.herokuapp.com/api/players/1", {
        "method": 'POST', // The method
        "headers": { 
          "content-type": "application/json",
        },
        "body": JSON.stringify({
          "score": scoreRef.current
        })
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        alert(response.message)
      })
      .catch(err => {
        console.log(err);
      });
    },15000);

    return () => {
      clearTimeout(makeBoxOutRef.current);
      clearTimeout(timeOut);
    };

  }, []);

  const getRandomColor = () => {
    const letters="0123456789ABCDEF".split('');
    let color="#";
    for (let i=0; i < 6; i++){
      color+=letters[Math.round(Math.random()*15)]; 
    }
    return color;
  }
  
  const makeBox = () => {
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

    if ((difficult === 1 && reactionTime > 4) || (difficult == 2 && (reactionTime > 2 && reactionTime < 3))) {
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
    <div>
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

        <p className="timeBox" > Your Time: <span id="time">{reactionTime}</span>s</p>

        <p className="scoreBox"> Score: <span id="score">{score}</span> points </p>

      </div>

      </div>
    </div>
  )
}

export default GameOne;
