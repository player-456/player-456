import React from "react";

const Button = (props) => {
return (
    <button className={props.classes} onClick={props.onclick} id={props.buttonId}>{props.value}</button>
  )
}

export default Button;