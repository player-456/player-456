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
import { player456Contract, connectWallet, getCurrentWalletConnected } from "../../util/interactions";

Modal.setAppElement("#root");

const ConnectWallet = () => {
  // State variables
  const [walletAddress, setWallet] = useState("");
  const [hasWallet, setHasWallet] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("");

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  // These vars come from web3-react core
  const { active, account, library, connector, activate, deactivate } = useWeb3React();

  useEffect(async () => {
    console.log(document.getElementById('metamask'));
    // const {address, status} = await getCurrentWalletConnected();

    if(account) {
      setWallet(account);
    }
    setStatus(status);

    // addWalletListener();
  }, []);

  const walletPressed = async(e) => {
    console.log("hi " + e.currentTarget.id);
    if (window.ethereum) {
      if(e.target.id == "metamask") {
        try {
          await activate(injected)
          const obj = {
            status: "Ready to mint"
          }
          return obj;
        } catch (err) {
          return console.log(err);
        }

      } else if(e.target.id == "walletconnect") {
        try {
          await activate(walletconnect)
          const obj = {
            status: "Ready to mint"
          }
          return obj;
        } catch (err) {
          return console.log(err);
        }
      }
    } else {
      return {
        status: (
          <span>
            <p>
                You must install a wallet to continue!. We recommend using <a target="_blank" href={"https://metamask.io/download.html"}>MetaMask</a>.
            </p>
          </span>
        )
      }
    }
  }

  // const walletPressed = async (e) => {
  //   const walletResponse = await connectToWallet(e);
  //   setStatus(walletResponse.status);
  // }


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
      setHasWallet(false);
    }
  }

return (
  <div className="main-cta-container">
    {/* <button className={`button button--cta`} onClick={openModal}>
      Connect wallet
    </button>

    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      contentLabel="Modal"
      overlayClassName="modal--overlay"
      className="modal--content"
    > */}
        {/* <div className="provider-chooser-container">
          <ProviderChooser
            classes="provider-chooser"
            buttonId="metamask"
            logo={metamaskLogo}
            title="Metamask"
            desc="Connect to your Metamask wallet"
          />
          <ProviderChooser
            classes="provider-chooser"
            buttonId="walletconnect"
            logo={walletConnectLogo}
            title="WalletConnect"
            desc="Scan with WalletConnect to connect"
          />
        </div> */}
    {/* </Modal> */}
    <div className="provider-chooser-container">
      <div className={"provider-chooser"} onClick={walletPressed} id={"metamask"}>
        <img src={metamaskLogo} />
        <h5>Metamask</h5>
        <p>Connect to your Metamask wallet</p>
      </div>

      <div className={"provider-chooser"} onClick={walletPressed} id={"walletconnect"}>
        <img src={walletConnectLogo} />
        <h5>WalletConnect</h5>
        <p>Scan with WalletConnect to connect</p>
      </div>
    </div>

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
  )
}

export default ConnectWallet;