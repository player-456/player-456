import React from "react";
import { useEffect, useState } from "react";


const GameOne = () => {
  const [reactionTime, setReactionTime] = useState(0);
  const [score, setScore] = useState(0);
  const [bestResult1, setBestResult1] = useState(10);
  const [bestResult2, setBestResult2] = useState(10);

  const [boxDisplay, setBoxDisplay] = useState(true);
  const [resultDisplay, setResultDisplay] = useState(true);
  const [tryagainDisplay, settryAgainDisplay] = useState(true);
  
  const [boxRadius, setBoxRadius] = useState(0);
  const [boxTop, setBoxTop] = useState(0);
  const [boxLeft, setBoxLeft] = useState(0);
  const [boxBackground, setBoxBackground] = useState(0);

  const [easyBackground, setEasyBackground] = useState(0);
  const [mediumBackground, setMediumBackground] = useState(0);
  const [hardBackground, setHardBackground] = useState(0);

  // let makeBoxOut;
      
  let createdTime;
  
  // const score=0; 
  let difficult=1; 
  // const point=100; const fault=0; 
  // const bestResult1=10; 
  // const bestResult2=10; 

  let point=50; 
  // const difficult=2; 
  
  let fault=50; 
  // const difficult=3; 

  useEffect(() => {
    let time = Math.random();
    time = time*2500;

    const makeBoxOut = setTimeout(() => {
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
      
      createdTime = Date.now();
      
    },time);

    const timeOut = setTimeout(() => {
      clearTimeout(makeBoxOut);
      setBoxDisplay(false);
      setResultDisplay(true);
      settryAgainDisplay(true);
      alert('Game Over');

      // send user scores
      fetch("player456.herokuapp.com/api/players/", {
        "method": "PUT",
        "headers": {
          // "x-rapidapi-host": "fairestdb.p.rapidapi.com",
          // "x-rapidapi-key": "apikey",
          "content-type": "application/json",
          // "accept": "application/json"
        },
        "body": JSON.stringify({
          id: '6173470832db8c26196b7e5c',
          score: score
        })
      })
      .then(response => response.json())
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err);
      });
    },15000);

    return () => {
      clearTimeout(makeBoxOut);
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
    // console.log('makebox');
    // let time = Math.random();
    // time = time*2500;
    // makeBoxOut = setTimeout(() => {
    //   console.log('timeout');
      
    //   if (Math.random()>0.5) {
    //     setBoxRadius("100px");
    //   } else {
    //     setBoxRadius("0");
    //   }
                  
    //   let top=Math.random();
    //   top=top*300;
    //   let left=Math.random();
    //   left=left*500;
      
    //   setBoxTop(top+"px");

    //   setBoxLeft(left+"px");
      
    //   setBoxBackground(getRandomColor());
      
    //   setBoxDisplay(true)
      
    //   createdTime = Date.now();
      
    // },time);
  }

  const clickBox = () => {
    console.log('clickbox');
    const clickedTime = Date.now();

    setReactionTime((clickedTime-createdTime) / 1000);
    // document.getElementById("time").innerHTML = reactionTime;
    setBoxDisplay(false);
    
    makeBox();
    
    setBestResult1(reactionTime); 
    
    if (bestResult2 > bestResult1) {
      setBestResult2(bestResult1);
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
          
    if (score === 0) {  
      setResultDisplay(true)
      settryAgainDisplay(true)
      setBoxDisplay(false)
      // setBorderDisplay(false)
    }
                          
  }
                              
  const clickEasy = () => {
    point=100;
    difficult=1;
    fault=0;

    setEasyBackground("orange");

    setMediumBackground("red");

    setHardBackground("red");

  };			

  const clickMedium = () => {
    point=100;
    difficult=2;
    fault=50; 
    
    setEasyBackground("red");
    
    setMediumBackground("orange");
    
    setHardBackground("red");
  };

  const clickHard = () => {	
    point=50;
    difficult=3;
    fault=50;			

    setEasyBackground("red");
    
    setMediumBackground("red");
    
    setHardBackground("orange");
  };

  const tryAgain = () => {
    window.location.reload();
  };

  return (
    <div>
      <div className="background">

      <div className="fixedwidth">

        {/* <h1 className="title"> Test Your reactions! </h1> */}
        
        <div className="clear"> </div>

        <div className="clear"> </div>
        
        <p className="timeBox" > Your Time: <span id="time">{reactionTime}</span>s</p>
        
        <p className="diffVary" id="easy" style={{ backgroundColor: easyBackground }} onClick={clickEasy}> EASY </p>
        
        <p className="diffVary" id="medium" style={{ backgroundColor: mediumBackground }} onClick={clickMedium}> MEDIUM </p>
        
        <p className="diffVary" id="hard" style={{ backgroundColor: hardBackground }} onClick={clickHard}> HARD </p> 
        
        <p className="scoreBox"> Score: <span id="score">{score}</span> points </p>
        

        <div className="clear"> </div>
        
        {/* { borderDisplay ? ( */}
          <div id="border" className="border">
        
                { boxDisplay ? (
                    <div id="Box" className="Box" onClick={clickBox(this)} style={{ borderRadius: boxRadius, top: boxTop, left: boxLeft, backgroundColor: boxBackground }}> </div>
                  ) : ('')
                }
              
                <div className="clear"> </div>
                
                { resultDisplay ? (
                    <p id="result" class="result"> Best time: <span id="bestResult">{bestResult2}</span>s</p>
                  ) : ('')
                }
                
                { tryagainDisplay ? (
                    <p id="tryagain" class="tryagain" onClick={tryAgain}> Try Again! </p>	
                  ) : ('')
                }
                  
          </div> 
          {/* ) : ('') */}
        {/* } */}
        
      </div>

      </div>
    </div>
  )
}

export default GameOne;
