import React from "react";

const Button = (props) => {

  return (
      <button className={props.classes} onClick={props.buttonPressed} id={props.buttonId}>
        {props.icon ? `<img className="button--icon" src=${props.icon} />` : ""}
        {props.buttonValue}
      </button>
    )
}

export default Button;