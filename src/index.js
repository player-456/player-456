import React from "react";
import ReactDOM from "react-dom";

import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'

import MainContainer from "./views/MainContainer";

// Styles
import "./sass/App.scss";

function getLibrary(provider) {
  return new Web3(provider);
}

ReactDOM.render(
    <Web3ReactProvider getLibrary={getLibrary}>
      <MainContainer />
      </Web3ReactProvider>,
  document.getElementById("root")
)