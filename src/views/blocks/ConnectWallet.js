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
    console.log(document.getElementById('metamask'));
    // const {address, status} = await getCurrentWalletConnected();

    if(account) {
      setWallet(account);
    }
    setStatus(status);

    if(window.ethereum) {
      setHasWallet(true);
    } else {
      setHasWallet(false);
    }

    addWalletListener();
  }, []);

  const walletPressed = async() => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if(addressArray.length > 0) {
          console.log(addressArray[0])
          return {
            address: addressArray[0],
          }
        } else {
          return {
            address: ""
          }
        }
      } catch (err) {
        return {
          address: "",
          status: "Error: " + err.message,
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

  async function disconnect() {
    try {
      await deactivate()
    } catch(ex) {
      console.log(ex);
    }
  }

return (
  <div className="main-cta-container">
    <button className={"button button--cta"} onClick={() => setIsOpen(true)}>
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
             activate(injected)
             walletPressed()
            }}
           id={"metamask"}>
        <img src={metamaskLogo} />
        <h5>Metamask</h5>
        <p>Connect to your Metamask wallet</p>
      </div>

      <div className={`provider-chooser no-metamask ${hasWallet ? "hidden" : ""}`}>
            no metamask
      </div>

      <div className={"provider-chooser"}
           onClick={() => {
             activate(walletconnect)
             walletPressed()
            }}
           id={"walletconnect"}>
        <img src={walletConnectLogo} />
        <h5>WalletConnect</h5>
        <p>Scan with WalletConnect to connect</p>
      </div>
    </div>
    </Modal>


    <p className="walletAddress">
    {walletAddress.length > 0 ? (
      "Connected: " +
      String(walletAddress).substring(0, 4) +
      "..." +
      String(walletAddress).substring(38) +
      ""
    ) : (
      <span></span>
    )}
    </p>

    <button className="walletAddress" onClick={disconnect}>Disconnect</button>
  </div>
  )
}

export default ConnectWallet;