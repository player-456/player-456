import React from "react";
import ReactDOM from "react-dom";

import MainContainer from "./views/MainContainer";

// Styles
import "./sass/App.scss";

ReactDOM.render(
  <React.StrictMode>
    <MainContainer />
  </React.StrictMode>,
  document.getElementById("root")
)