import React from "react";
import { useEffect, useState } from "react";

// Elements

// web3 stuff
import { useWeb3React } from "@web3-react/core";
import { injected, walletconnect } from "../../util/connectors";
import { player456Contract, connectWallet, getCurrentWalletConnected } from "../../util/interactions";

const Button = (props) => {
  // State vars
  const [status, setStatus] = useState("");

  // These vars come from web3-react core
  const { active, account, library, connector, activate, deactivate } = useWeb3React();

  async function connectToWallet(e) {
    console.log("ji" + e.target.id);
    if (window.ethereum) {
      try {
        if(e.target.id == "metamask") {
          await activate(injected)
        // } else if (e.target.id == "walletlink") {
        //   await activate(walletLink)
        } else if (e.target.id == "walletconnect") {
          await activate(walletconnect)
        }
        console.log("account: " + account)
        const obj = {
          status: "Ready to mint",
        }
        return obj;
      } catch (err) {
        return {
          status: "Error: " + err.message,
        };
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

  const walletPressed = async (e) => {
    const walletResponse = await connectToWallet(e);
    setStatus(walletResponse.status);
  }

  return (
      <button className={props.classes} onClick={walletPressed} id={props.buttonId}>
        <img src={props.logo} />
        {props.title}
        {props.desc}
      </button>
    )
}

export default Button;