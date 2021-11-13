import React, { useEffect, useState, useContext, useCallback } from "react";
import Modal from "react-modal";
import { PlayerContext } from "../../../../util/PlayerContext";
import { metamaskLogo } from "../../../../util/walletLogos";
import { getCurrentWalletConnected, connectToWallet, checkForPlayerTokens } from "../../../../util/interactions-game.js";
import BeginGameButton from "../components/BeginGameButton";
// import { parse } from "uuid";

Modal.setAppElement("#root");

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,.8)",
  }
}

const VerifyPlayer = (props) => {
  // State variables
  const [walletAddress, setWallet] = useState("");
  const [hasWallet, setHasWallet] = useState("");
  const [status, setStatus] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [numTokensOwned, setNumTokensOwned] = useState("");
  const [tokenList, setTokenList] = useState({});
  const [activePlayer, setActivePlayer] = useContext(PlayerContext);

  const updateWallet = (value) => {
    setWallet(value);
  }

  const updateHasWallet = (value) => {
    setHasWallet(value);
  }

  const updateStatus = (value) => {
    setStatus(value);
  }

  const updateNumTokensOwned = (obj) => {
    setNumTokensOwned(obj);
  }

  const updateTokenList = (arr) => {
    setTokenList(arr);
  }

  // const playerHasPlayed = useCallback((value) => {
  //   setActivePlayer({hasPlayed: value});
  // }, [setActivePlayer]);

  // const playerIsEliminated = useCallback((value) => {
  //   setActivePlayer({isEliminated: value});
  // }, [setActivePlayer]);

  const verifyTokens = useCallback(async (address) => {
    // Check for tokens in player's wallet
    const playerTokens = await checkForPlayerTokens(address);
    // console.log("from verifyTokens: ", playerTokens);
    setTokenList(playerTokens);

     // connect to DB
    const fetchPlayerData = async(activePlayer) => {
      // const URL = `https://player456.herokuapp.com/api/players/${activePlayer}`
      const URL = `http://localhost:9000/players/${activePlayer}`; // <- local db

      try {
        const response = await fetch(URL, {
          mode: 'cors',
          method: 'GET'
        });
        const json = await response.json();
        // set this data to the player context
        setActivePlayer({
          playerID: activePlayer,
          hasPlayed: json.hasPlayed
        })
      } catch (error) {
        console.log("Error: ", error);
      }
    }

    // If player only has one token, we're ready to play
    if(parseInt(Object.keys(playerTokens).length) === 1) {
      // const playerData = await fetchPlayerData(tokenList[0])
      // console.log("from fetch: ", playerData);
      fetchPlayerData(playerTokens[0]);
    }


  // get data
    // Hide begin button, show game window
  }, [setActivePlayer])

  useEffect(() => {
    // Regain wallet connection on page reload
    async function fetchData() {
      const { address, numTokensOwned } = await getCurrentWalletConnected();
      updateWallet(address);
      updateNumTokensOwned(numTokensOwned);

      if(address.length > 0){
        verifyTokens(address);
      }

      if(window.ethereum) {
        updateHasWallet(true)
      } else {
        updateHasWallet(false);
      }
    }

    fetchData();

     /**
     * Resets state variables and realoads window
     */
    function reset() {
      window.location.reload();
      updateNumTokensOwned("");
      updateTokenList({});
      setActivePlayer({playerID: ""});
    }


    async function addWalletListener() {
      if (window.ethereum) {
        window.ethereum.on("accountsChanged", (accounts) => {
          updateWallet(accounts);
          updateStatus(status);
          updateNumTokensOwned(numTokensOwned);

          if(accounts.length > 0){
            verifyTokens(accounts);
          }
        });

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
        updateStatus(
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
  }, [status, numTokensOwned, verifyTokens, setActivePlayer]);


  /**
   * Connects user's wallet
   */
  const connectWalletPressed = async () => {
    const { address, numTokensOwned } = await connectToWallet();
    setWallet(address);
    setNumTokensOwned(numTokensOwned);

    verifyTokens(address);

    // Close modal:
    setIsOpen(false);
  };


  const renderPlayerSelectButtons = () => {
    let playerSelectButtons = [];

    if(tokenList) {
      for(let i = 0; i < Object.keys(tokenList).length; i++) {
        playerSelectButtons.push(
          <button className="button button__cta" onClick={() =>{choosePlayer(tokenList[i]);}} key={i}>Player {tokenList[i]}</button>
        )
      }
    } else {
      console.log('no tokens yet');
      playerSelectButtons.push(<p>No tokens found!</p>)
    }

    return playerSelectButtons;
  }

  const choosePlayer = (playerNumber) => {
    // TODO
    // connect to API, set wallet, see if player has been played or been eliminated
    // Hide selector section
    document.getElementById("choosePlayerContainer").classList.add("hidden");

    // Set active player ID
    setActivePlayer({playerID: playerNumber});
    console.log("ap: ", activePlayer);
  }

  const switchPlayer = () => {
    // setActivePlayer("");
    setActivePlayer({playerID: ""});
    document.getElementById("choosePlayerContainer").classList.remove("hidden");
  }

return (
  <div className="connect-wallet-container" id="verifyPlayerContainer">
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

    <div className={`${walletAddress.length > 0 ? "begin-game-button-container" : "begin-game-button-container hidden"}`}>

      {/* Has already played */}
      {/* <div className={`${!props.hasPlayed ? "begin-game-cta" : "begin-game-cta hidden"}`} id={`beginGameButtonContainer`}>
        <p>Welcome, Player {activePlayer.playerID}</p>
        <button className={`button button__cta`} id={`beginGame`} disabled>
          Player has already played
        </button>

        <button className={`button button__link ${parseInt(numTokensOwned) > 1 ? "" : "hidden"}`} onClick={() => {switchPlayer();}} id={`changePlayerButton`}>Choose a different player</button>
      </div> */}


      {/* No tokens */}
      <div className={`${parseInt(numTokensOwned) === 0 ? "begin-game-cta" : "begin-game-cta hidden"}`}>
        <span>No players found</span>
      </div>

      {/* Several tokens: */}
      <div className={`${parseInt(numTokensOwned) && !activePlayer.playerID ? "choose-account-cta" : "choose-account-cta hidden"}`} id={`choosePlayerContainer`}>
        <p>Choose a player:</p>
        <div className="choose-account-grid">
          {renderPlayerSelectButtons()}
        </div>
      </div>

      {/* Only one token OR acive player set: */}
      <div className={`${activePlayer.playerID ? "begin-game-cta" : "begin-game-cta hidden"}`} id={`beginGameButtonContainer`}>
        <p>Welcome, Player {activePlayer.playerID}</p>

        <BeginGameButton beginGame={props.beginGame} />

        <button className={`button button__link ${parseInt(numTokensOwned) > 1 ? "" : "hidden"}`} onClick={() => {switchPlayer();}} id={`changePlayerButton`}>Choose a different player</button>
      </div>

    </div>
{/*
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
    </div> */}


    {/* <button className="button" onClick={disconnect}>Disconnect</button> */}
  </div>
  )
}

export default VerifyPlayer;



