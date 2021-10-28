import React from "react";
import { useEffect, useState } from "react";
import Modal from "react-modal";
// import Button from "../elements/Button";
// import ProviderChooser from "../elements/ProviderChooser";
import { ReactComponent as IncreaseIcon } from "../../img/icon-increase.svg";
import { ReactComponent as DecreaseIcon } from "../../img/icon-decrease.svg";

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
  const [hasWallet, setHasWallet] = useState("");
  const [status, setStatus] = useState("");
  const [totalMinted, setTotalMinted] = useState("");
  const [mintAmount, setMintAmount] = useState(1);

  const [modalIsOpen, setIsOpen] = useState(false);

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
    }

  // These vars come from web3-react core
  // const { active, account, library, connector, activate, deactivate, chainId } = useWeb3React();

  useEffect(() => {
    // Regain wallet connection on page reload
    async function fetchData() {
      const { address, totalMinted, playerBalance } = await getCurrentWalletConnected();
      setWallet(address);
      setStatus(status);
      setTotalMinted(totalMinted);

      if(window.ethereum) {
        setHasWallet(true);
        playerHasFunds(playerBalance);
      } else {
        setHasWallet(false);
      }
    }

    fetchData();

    async function addWalletListener() {
      if (window.ethereum) {
        const { totalMinted, playerBalance } = await getCurrentWalletConnected();
        window.ethereum.on("accountsChanged", (accounts) => {
          setWallet(accounts);
          setStatus(status);
          setTotalMinted(totalMinted);
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
    addWalletListener();
  }, [status]);


  /**
   * Connects user's wallet
   */
  const connectWalletPressed = async () => {
    const { address, totalMinted, playerBalance } = await connectToWallet();
    setWallet(address);
    setTotalMinted(totalMinted);

    playerHasFunds(playerBalance);
    // Close modal:
    setIsOpen(false);
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 10) {
      newMintAmount = 10;
    }
    setMintAmount(newMintAmount);
  };

  /**
   * Triggers mint
   */
  const mintNow = async () => {
    console.log("Minting with address " + walletAddress);
    const numPlayersToMint = mintAmount;
    mintNFT(numPlayersToMint);
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

    <div className={`${walletAddress.length > 0 ? "" : "hidden"}`}>

      <div className="number-to-mint-container">
        <label htmlFor="numPlayersToMintButton">Number to mint (max 10):</label>
        <div className="stepper-control">
          <button className="button__stepper" onClick={(e) => {
            e.preventDefault();
            decrementMintAmount();
          }}><DecreaseIcon /></button>

          <p className="number-to-mint" id="numberToMintInput">{mintAmount}</p>

          <button className="button__stepper" onClick={(e) => {
            e.preventDefault();
            incrementMintAmount();
          }}><IncreaseIcon /></button>
        </div>
      </div>

      <button
        className={`button button--cta`}
        onClick={() => {mintNow()}}
        id={"mintNowButton"}
      >
        Mint for 0.055 ETH
      </button>

      <p className="alert alert__error hidden" id="mintingError">
      </p>

      <p className="total-minted">
        Minted: <span id="totalMintedSpan">{totalMinted ? (totalMinted) : ("???")}</span> / 456
      </p>
    </div>

    <div className="wallet-address">
      <p>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 4) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        ""
      )}
      </p>
    </div>


    {/* <button className="button" onClick={disconnect}>Disconnect</button> */}
  </div>
  )
}

export default ConnectWallet;