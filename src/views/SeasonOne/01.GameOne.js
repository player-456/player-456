import React from "react";

const GameOne = (props) => {
return (
  <div>
    <h3>Hello form Game 1</h3>
    <button className="button button__cta" onClick={()=>{props.endGame();}}>End game</button>
  </div>
  )
}

export default GameOne;
