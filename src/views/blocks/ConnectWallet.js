import React from "react";
import { useEffect, useState } from "react";
import Modal from "react-modal";
// import Button from "../elements/Button";
// import ProviderChooser from "../elements/ProviderChooser";

// Elements
import { metamaskLogo } from "../../util/walletLogos";
// import { walletConnectLogo } from "../../util/walletLogos";


// web3 stuff
// import { useWeb3React } from "@web3-react/core";
// import { injected, walletLink, walletconnect } from "../../util/connectors";
import { gameInfo, getCurrentWalletConnected, connectToWallet, mintNFT } from "../../util/interactions";

Modal.setAppElement("#root");

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,.8)",
  }
}

const ConnectWallet = () => {
  // State variables
  const [walletAddress, setWallet] = useState("");
  const [playerEthBalance, setplayerEthBalance] = useState("");
  const [playerChain, setPlayerChain] = useState("");
  const [hasWallet, setHasWallet] = useState("");
  const [status, setStatus] = useState("");
  const [totalMinted, setTotalMinted] = useState("");

  const [modalIsOpen, setIsOpen] = useState(false);
  const [wasOpen, setWasOpen] = useState(false);

  function afterOpenModal() {
    setTimeout(() => {
      setWasOpen(true);
    }, 0);
  }

  function afterClose() {
    setTimeout(() => {
      setWasOpen(false);
    }, 0);
  }

  /**
   * Makes sure they have enough funds
   * @param {*} balance Player's ETH balance
   */
  function playerHasFunds(balance) {
    const mintButtonElem = document.getElementById("mintNowButton"),
          mintErrorElem = document.getElementById("mintingError");

    if(balance < gameInfo.price) {
      mintButtonElem.innerHTML = "Insufficient funds"
      mintButtonElem.setAttribute("disabled", true);

      mintErrorElem.innerHTML = "Minting cost is 0.055 ETH + gas fees"
      mintErrorElem.classList.remove("hidden");
    } else {
      mintButtonElem.innerHTML = "Mint for 0.055 ETH"
      mintButtonElem.removeAttribute("disabled");

      mintErrorElem.innerHTML = ""
      mintErrorElem.classList.add("hidden");
    }
  }

  /**
   * Resets state variables and realoads window
   */
   function reset() {
      window.location.reload();
      setTotalMinted("");
      setplayerEthBalance("");
      setPlayerChain("");
    }

  // These vars come from web3-react core
  // const { active, account, library, connector, activate, deactivate, chainId } = useWeb3React();

  useEffect(async () => {
    // Regain wallet connection on page reload
    const { address, totalMinted, playerBalance, playerChain } = await getCurrentWalletConnected();
    setWallet(address);
    setStatus(status);
    setTotalMinted(totalMinted);
    setplayerEthBalance(playerBalance);
    setPlayerChain(playerChain);

    if(window.ethereum) {
      setHasWallet(true);
      playerHasFunds(playerBalance);
    } else {
      setHasWallet(false);
    }

    // Wallet listener
    addWalletListener();

  }, []);

  async function addWalletListener() {
    if (window.ethereum) {
      const { address, totalMinted, playerBalance, playerChain } = await getCurrentWalletConnected();
      window.ethereum.on("accountsChanged", (accounts) => {
        setWallet(accounts);
        setStatus(status);
        setTotalMinted(totalMinted);
        setplayerEthBalance(playerBalance);
        setPlayerChain(playerChain);
      });

      playerHasFunds(playerBalance);

      window.ethereum.on("chainChanged", () => {
        reset();
      })

      window.ethereum.on("accountsChanged", () => {
        reset();
      })

      window.ethereum.on("disconnect", () => {
        reset();
      })
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`} rel="noreferrer">
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  /**
   * Connects user's wallet
   */
  const connectWalletPressed = async () => {
    const { address, totalMinted, playerBalance, playerChain } = await connectToWallet();
    setWallet(address);
    setTotalMinted(totalMinted);
    setplayerEthBalance(playerBalance);
    setPlayerChain(playerChain);

    playerHasFunds(playerBalance);
    // Close modal:
    setWasOpen(false);
    setIsOpen(false);
  };

  /**
   * Triggers mint
   */
  const mintNow = async () => {
    console.log("Minting with address " + walletAddress);
    mintNFT(walletAddress);
  }

return (
  <div className="main-cta-container">
    <button className={`button button--cta ${walletAddress.length > 0 ? "hidden" : ""}`} onClick={() => setIsOpen(true)}>
      Connect wallet
    </button>

    <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        className="modal--content"
        closeTimeoutMS={500}
        onAfterOpen={afterOpenModal}
        onAfterClose={afterClose}
        style={modalStyles}
      >
    <div className="provider-chooser-container">
      <div className={`provider-chooser no-metamask ${hasWallet ? "" : "hidden"}`}
           onClick={() => {
              connectWalletPressed()
            }}
           id={"metamask"}>
        <img src={metamaskLogo} alt="MetaMask" />
        <h5>Metamask</h5>
        <p>Connect to your Metamask wallet</p>
      </div>

      <div className={`provider-chooser no-metamask ${hasWallet ? "hidden" : ""}`}>
            no metamask
      </div>
    </div>
    </Modal>

    <button
      className={`button button--cta ${walletAddress.length > 0 ? "" : "hidden"}`}
      onClick={() => {mintNow()}}
      id={"mintNowButton"}
    >
      Mint for 0.055 ETH
    </button>

    <p className="alert alert__error hidden" id="mintingError">
    </p>

    <p className="total-minted">
      Minted: {totalMinted ? (totalMinted) : ("???")} / 456
    </p>

    <p className="wallet-address">
    {walletAddress.length > 0 ? (
      "Connected: " +
      String(walletAddress).substring(0, 4) +
      "..." +
      String(walletAddress).substring(38) +
      ""
    ) : (
      "Not connected"
    )}
    </p>

    {/* <button className="button" onClick={disconnect}>Disconnect</button> */}
  </div>
  )
}

export default ConnectWallet;