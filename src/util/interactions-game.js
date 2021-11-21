import {supportedChains} from "./chains";

require("dotenv").config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const requestedChain = process.env.REACT_APP_CURRENT_NETWORK;
const contractABI = require("./contract-abi.json");
const contractAddress = "0x1B1b7833ffC8F568f8D82BCddAe533107f65cb9F";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);


export const playerInfo = {
  playerBalance: "'",
  playerAddress: "",
  playerChain: "",
  numTokensOwned: "",
  tokensOwned: []
}

export const gameInfo = {
  price: .055,
  chainId: null,
  networkId: null,
  mm_id: null,
  chainName: ""
}

function setGameChainInfo() {
  for(let i = 0; i < supportedChains.length; i++) {
    if(supportedChains[i].chain_id === parseInt(requestedChain)) {
      gameInfo.chainId = supportedChains[i].chain_id;
      gameInfo.networkId = supportedChains[i].network_id;
      gameInfo.mm_id = supportedChains[i].mm_id.trim();
      gameInfo.chainName = supportedChains[i].name;
    }
  }
}
setGameChainInfo();

export const connectToWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      // Set player info
      // checkForPlayerTokens(addressArray[0]);
      setPlayerAddress(addressArray[0]);
      setPlayerChain();
      setNumTokensOwned(addressArray[0]);


      if (window.ethereum.networkVersion !== gameInfo.networkId) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain", params: [{
              chainId: gameInfo.mm_id
            }]
          })
        } finally {
          window.location.reload();
        }
      }

      return {
        address: addressArray[0],
        totalMinted: await player456Contract.methods.totalSupply().call(),
        playerBalance: playerInfo.playerBalance,
        playerChain: playerInfo.playerChain,
        numTokensOwned: playerInfo.numTokensOwned,
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    if (window.ethereum.networkVersion !== gameInfo.networkId) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain", params: [{
            chainId: gameInfo.mm_id
          }]
        })
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        // Set player info
        // setPlayerBalance(addressArray[0]);
        setPlayerAddress(addressArray[0]);
        setPlayerChain();
        setNumTokensOwned(addressArray[0]);

        return {
          address: addressArray[0],
          totalMinted: await player456Contract.methods.totalSupply().call(),
          playerBalance: playerInfo.playerBalance,
          playerChain: playerInfo.playerChain,
          numTokensOwned: playerInfo.numTokensOwned,
        };
      } else {
        return {
          address: "",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
    };
  }
};

function setPlayerAddress(address) {
  playerInfo.playerAddress = address;
}

function setPlayerChain() {
  playerInfo.playerChain = window.ethereum.networkVersion;
}

async function setNumTokensOwned(address) {
  playerInfo.numTokensOwned = await player456Contract.methods.balanceOf(address).call();
}

const player456Contract = new web3.eth.Contract(
  contractABI,
  contractAddress
)

export const checkForPlayerTokens = async(address) => {
  // Number of tokens player owns
  const numTokensOwned = await player456Contract.methods.balanceOf(address).call();
  console.log("numtokensowned: " + numTokensOwned);

  if(numTokensOwned < 1) {
    return false;
  } else {
    const tokensOwned = {};

    for(let i = 0; i < numTokensOwned; i++) {
      tokensOwned[i] = await player456Contract.methods.tokenOfOwnerByIndex(address, i).call();
    }
    return tokensOwned;
  }

  // const tokensOwned = {};

  // if(parseInt(numTokensOwned) === 0) {
  //   return false;
  // } else if(parseInt(numTokensOwned) === 1) {
  //   tokensOwned[0] = await player456Contract.methods.tokenOfOwnerByIndex(address, 0).call();
  //   return tokensOwned;
  // } else {
  //   for(let i = 0; i < numTokensOwned; i++) {
  //     tokensOwned[i] = await player456Contract.methods.tokenOfOwnerByIndex(address, i).call();
  //   }
  //   return tokensOwned;

  // }
}

export const updatePlayerDatabase = async(playerID, playerScore) => {
  // const URL = `https://player456.herokuapp.com/api/players/${playerID}`;
  const URL = `http://localhost:9000/update/${playerID}`;

  fetch(URL, {
    mode: "cors",
    method: 'POST', // The method
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      "id": playerID,
      "hasPlayed": false,
      "scoreGame1": playerScore,
    })
  })
  .then((response) => response.json())
  .then((response) => {
    alert(response.message)
  })
  .catch(err => {
    console.log(err);

    var msg = 'The CORS policy for this site does not ' +
    'allow access from the specified Origin.'

    alert(msg);
  });
}
