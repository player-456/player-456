import React from "react";
import { useEffect, useState } from "react";

// Elements
import Button from "./elements/Button";
import SiteTeaser from "../img/site-teaser.gif";

// Blocks
import Divider from "./elements/SectionDivider";
import Header from "./blocks/Header";
// import Intro from "./blocks/Intro";
import Rules from "./blocks/Rules";
import Characters from "./blocks/Characters";
import Roadmap from "./blocks/Roadmap";
import Faq from "./blocks/Faq";
import Team from "./blocks/Team";
import Footer from "./blocks/Footer";

import { player456Contract, connectWallet, getCurrentWalletConnected } from "../util/interactions";

const MainContainer = () => {
  // State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  useEffect(async () => {
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address);
    setStatus(status);

    addWalletListener();
  })

  function addWalletListener() { //TODO: implement
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if(accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("Write a message above");
        } else {
          setWallet("");
          setStatus("Connect to Metamask.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>You must install Metamask, a virtual Ethereum wallet, in your browser.</a>
        </p>
      );
    }
  }

  const connectToWallet = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  }

  // Return the UI
  return (
      <main className="wrapper">
        <Header />
        <section>
          <div className="intro intro-content">
            <h2 className="h4 start-date">
              Games starting October 24
            </h2>

            <div className="main-cta-container">
              <button className={`button button--cta ${walletAddress.length > 0 ? "hidden" : ""}`} id="connectToWalletButton" onClick={connectToWallet}>
                <span>Connect Wallet</span>
              </button>

              <button className={`button button--cta ${walletAddress.length > 0 ? "" : "hidden"}`} id="mintNFT">
                Mint
              </button>


              <p className="walletAddress">
              {walletAddress.length > 0 ? (
                "Connected: " +
                String(walletAddress).substring(0, 4) +
                "..." +
                String(walletAddress).substring(38)
              ) : (
                <span></span>
              )}
              </p>
            </div>
          </div>

          <div className="site-teaser default-spacing">
            <img src={SiteTeaser} alt="456 players, 1 winner, 11.4 eth prize" />
          </div>

        </section>
        <Divider />
        <Rules />
        <Divider />
        <Characters />
        <Divider />
        <Roadmap />
        <Divider />
        <Faq />
        <Divider />
        <Team />
        <Divider />
        <Footer />
      </main>
    )
  }

export default MainContainer;

// class MainContainer extends React.Component {
//   componentDidMount() {
//     // javascripts
//   }

//   render() {
//     return (
//       <main className="wrapper">
//         <Header />
//         <Intro />
//         <Divider />
//         <Rules />
//         <Divider />
//         <Characters />
//         <Divider />
//         <Roadmap />
//         <Divider />
//         <Faq />
//         <Divider />
//         <Team />
//         <Divider />
//         <Footer />
//       </main>
//     )
//   }
// }

// export default MainContainer;