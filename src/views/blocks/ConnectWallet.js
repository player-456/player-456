import React from "react";
import { useEffect, useState } from "react";
import Modal from "react-modal";
// import Button from "../elements/Button";
// import ProviderChooser from "../elements/ProviderChooser";

// Elements
import { metamaskLogo } from "../../util/walletLogos";
import { walletConnectLogo } from "../../util/walletLogos";


// web3 stuff
import { useWeb3React } from "@web3-react/core";
import { injected, walletLink, walletconnect } from "../../util/connectors";
import { player456Contract, getCurrentWalletConnected, connectToWallet, mintNFT } from "../../util/interactions";

Modal.setAppElement("#root");

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,.8)",
  }
}

const ConnectWallet = () => {
  // State variables
  const [walletAddress, setWallet] = useState("");
  const [balance, setBalance] = useState("");
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

  // These vars come from web3-react core
  const { active, account, library, connector, activate, deactivate, chainId } = useWeb3React();

  useEffect(async () => {
    // Regain wallet connection on page reload
    const { address, status, totalMinted } = await getCurrentWalletConnected();
    setWallet(address);
    setStatus(status);
    setTotalMinted(totalMinted);

    if(window.ethereum) {
      setHasWallet(true);
    } else {
      setHasWallet(false);
    }

    addWalletListener();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
          setTotalMinted(totalMinted);
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectToWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
    setTotalMinted(walletResponse.totalMinted);

    console.log(totalMinted);
    // Close modal:
    setWasOpen(false);
    setIsOpen(false);
  };

  const mintNow = async () => {
    // Check for address one more time
    const { address, status, totalMinted } = await getCurrentWalletConnected();
    setWallet(address);
    setStatus(status);
    setTotalMinted(totalMinted);

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
        <img src={metamaskLogo} />
        <h5>Metamask</h5>
        <p>Connect to your Metamask wallet</p>
      </div>

      <div className={`provider-chooser no-metamask ${hasWallet ? "hidden" : ""}`}>
            no metamask
      </div>
    </div>
    </Modal>

    <button className={`button button--cta ${walletAddress.length > 0 ? "" : "hidden"}`} onClick={() => {mintNow()}} id={"mintNowButton"}>
       Mint for 0.55 ETH
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