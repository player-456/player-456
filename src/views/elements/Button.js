import React from "react";

const Button = (props) => {
return (
    <button className={props.classes}>{props.value}</button>
  )
}

export default Button;