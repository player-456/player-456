import React from "react";
import ReactDOM from 'react-dom';

import { useEffect, useState, useRef } from "react";


class GameOne extends React.Component {
  constructor(props) {
    super(props);

    //creating ref
    this.boxRef = React.createRef();
    this.easyRef = React.createRef();
    this.mediumRef = React.createRef();
    this.hardRef = React.createRef();
    this.tryagainRef = React.createRef();
    this.resultRef = React.createRef();
    this.borderRef = React.createRef();

    this.state = {
      reactionTime: "",
      score: 0,
      bestResult1: 10,
      bestResult2: 10
    }
  };

  render() {
    // const [reactionTime, setReactionTime] = useState("");
    // const [score, setScore] = useState(0);
    // const [bestResult1, setBestResult1] = useState(10);
    // const [bestResult2, setBestResult2] = useState(10);
  
    const styleObject = {
      background: {
        backgroundColor: "#191970",
        marginTop: "-30px",
        height: "1000px",
      },
    
      fixedwidth: {
        width: "1200px",
        margin: "0 auto",
      },
  
      title: {
        margin: 0, 
        padding: "20px 5px 10px 25px",
        marginLeft: "400px",
        marginTop: "30px",
        color: "#00008B",
        borderStyle: "solid",
        borderColor: "white",
        borderWidth: "5px",
        width: "320px",
        backgroundColor: "black", 
        position: "relative", 
        fontSize: "160%"
      },
        
      titleButton: {
      margin: 0, 
      margin: "10px 0px 0px 420px",
      },
        
      clear: {
      clear: "both",
      },
          
      diffVary: {
      margin: 0,
      margin: "30px 0px 0px 15px",
      borderStyle: "solid",
      borderColor: "black",
      fontWeight: "bold",
      color: "#8000ff",
      width: "90px",
      height: "40px",
      padding: "25px 20px 0px 40px",
      },
            
      // .diffVary:hover {
      //  background-color:black;
      // },
            
      timeBox: {
      margin: 0,
      margin: "15px -50px 30px 30px",
      float: "right",
      borderStyle: "ridge",
      width: "200px",
      height: "40px",
      padding: "20px 10px 0px 20px",
      backgroundColor: "#8000ff",
      fontWeight: "bold",
      position: "relative",
      },
          
      scoreBox: {
      margin: 0,
      marginTop: "-100px",
      float: "right",
      borderStyle: "ridge",
      borderColor: "yellow",
      width: "150px",
      height: "40px",
      padding: "20px 10px 0px 20px",
      backgroundColor: "#8000ff",
      fontWeight: "bold",
      },
          
      result: {
        padding: 0,
        fontWeight: "bold",
        fontSize: "400%",
        width: "700px",
        height: "80px",
        borderRadius: "5px",
        borderColor: "darkgold",
        borderStyle: "solid",
        backgroundColor: "white",
        textAlign: "center", 
        padding: "20px 20px 20px 15px",
        margin: "300px 300px 0px 10px",
        position: "static",
        display: "none",
      }  	,
          
      tryagain: {
        fontWeight: "bold",
        fontSize: "300%",
        width: "400px",
        height: "80px",
        borderRadius: "5px",
        borderColor: "black",
        borderStyle: "solid",
        backgroundColor: "lightyellow",
        color: "orangered",
        textAlign: "center",
        padding: "15px 10px 0px 5px",
        margin: "20px 0 0 150px",
        position: "relative",
        display: "none",
      }	,
            
      Box: {
        width: "200px",
        height: "200px",
        borderStyle: "solid",
        position: "relative",
        display: "none",
      },
      
      border: {
        width: "750px",
        height: "500px",
        borderWidth: "10px",
        borderStyle: "solid",
        backgroundColor: "#CC0000",
        margin: "-260px 0px 0px 200px",
      }
    };
    
    function getRandomColor() {
      const letters="0123456789ABCDEF".split('');
      let color="#";
      for (let i=0; i < 6; i++){
        color+=letters[Math.round(Math.random()*15)]; 
      }
      return color;
    }
                  
    let makeBoxOut;
      
    setTimeout(function() {
      clearTimeout(makeBoxOut);
      // this.boxRef.current.style.display="none";
      // result.current.style.display="block";
      // tryAgain.current.style.display="block"; 
      // alert('Game Over');
    
    },15000);
  
    let clickedTime; 
    let createdTime;
    // let reactionTime;
    
    // const score=0; 
    const difficult=1; 
    // const point=100; const fault=0; 
    // const bestResult1=10; 
    // const bestResult2=10; 
  
    const point=50; 
    // const difficult=2; 
    
    const fault=50; 
    // const difficult=3; 
    
    function makeBox() {
      let time = Math.random();
      time = time*2500;
      makeBoxOut = setTimeout(function() {

        console.log(this.boxRef);
        if (Math.random()>0.5) {
          this.boxRef.current.style.borderRadius="100px";
        } else {
          this.boxRef.current.style.borderRadius="0"; 
        }
                    
        let top=Math.random();
        top=top*300;
        let left=Math.random();
        left=left*500; 
        
        this.boxRef.current.style.top=top+"px";
        
        this.boxRef.current.style.left=left+"px";
        
        this.boxRef.current.style.backgroundColor=getRandomColor();
        
        this.boxRef.current.style.display="block";
        
        createdTime = Date.now();
        
      },time);
    }
  
    function clickBox() {
      clickedTime = Date.now(); 	
      this.setState({
        reactionTime: (clickedTime-createdTime) / 1000
      });

      // document.getElementById("time").innerHTML = reactionTime;
      this.boxRef.current.style.display="none";
      
      makeBox();
      
      this.setState({
        bestResult1: this.state.reactionTime
      }); 
      
      if (this.state.bestResult2 > this.state.bestResult1) {
        this.setState({
          bestResult2: this.state.bestResult1
        });
      }
      
      if ((difficult === 1 && this.state.reactionTime > 4) || (difficult == 2 && (this.state.reactionTime > 2 && this.state.reactionTime < 3))) {
        this.setState({
          score: this.state.score
        });
      } else if (difficult === 2 && this.state.reactionTime > 3) {
        this.setState({
          score: this.state.score - fault
        });
      } else if(difficult === 3 && this.state.reactionTime > 1) {
        this.setState({
          score: this.state.score - fault
        });
      } else{
        this.setState({
          score: this.state.score + point
        });
      }
            
      if (this.state.score === 0) {  
        this.resultRef.current.style.display="block";
        
        this.tryagainRef.current.style.display="block"; 
        
        this.this.boxRefRef.current.style.display="none"; 
        
        this.borderRef.current.style.display="none";
      }
                            
    }
                                
    function clickEasy() {
      point=100;
      difficult=1;
      fault=0;
  
      this.easyRef.current.style.backgroundColor="orange";
  
      this.mediumRef.current.style.backgroundColor="red";
  
      this.hardRef.current.style.backgroundColor="red";
  
    };
  
    function clickMedium() {
      point=100;
      difficult=2;
      fault=50; 
      
      this.easyRef.current.style.backgroundColor="red";
      
      this.mediumRef.current.style.backgroundColor="orange";
      
      this.hardRef.current.style.backgroundColor="red";
    };
  
    function clickHard() {	
      point=50;
      difficult=3;
      fault=50;			
  
      this.easyRef.current.style.backgroundColor="red";
      
      this.mediumRef.current.style.backgroundColor="red";
      
      this.hardRef.current.style.backgroundColor="orange";
    };

    makeBox();
    
    function tryAgain() {
      makeBox();
    };
  
    return (
      <div>
        <div style={styleObject.background}>
  
        <div style={styleObject.fixedwidth}>
  
          {/* <h1 style={styleObject.title}> Test Your reactions! </h1> */}
          
          <div style={styleObject.clear}> </div>
  
          <div style={styleObject.clear}> </div>
          
          <p class="timeBox" style={styleObject.timeBox}> Your Time: <span id="time">{this.state.reactionTime}</span>s</p>
          
          <p class="diffVary" id="easy" ref={this.easyRef} style={styleObject.diffVary} onClick={clickEasy}> EASY </p>
          
          <p class="diffVary" id="medium" ref={this.mediumRef} style={styleObject.diffVary} onClick={clickMedium}> MEDIUM </p>
          
          <p class="diffVary" id="hard" ref={this.hardRef} style={styleObject.diffVary} onClick={clickHard}> HARD </p> 
          
          <p class="scoreBox" style={styleObject.scoreBox}> Score: <span id="score">{this.state.score}</span> points </p>
          
  
          <div style={styleObject.clear}> </div>
          
          <div id="border" ref={this.borderRef} style={styleObject.border}>
          
              <div id="Box" ref={this.boxRef} style={styleObject.Box} onClick={clickBox(this)} > </div>
            
              <div style={styleObject.clear}> </div>
              
              <p id="result" ref={this.resultRef} style={styleObject.result}> Best time: <span id="bestResult">{this.state.bestResult2}</span>s</p>
              
              <p id="tryagain" ref={this.tryagainRef} style={styleObject.tryagain} onClick={tryAgain}> Try Again! </p>	
                            
          </div> 
          
        </div>
  
        </div>
      </div>
    )
  }
}

export default GameOne;
