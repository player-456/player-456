import {supportedChains} from "./chains";

require("dotenv").config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const requestedChain = process.env.REACT_APP_CURRENT_NETWORK;
const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;
const axios = require('axios');
const contractABI = require("./contract-abi.json");
const contractAddress = "0x1B1b7833ffC8F568f8D82BCddAe533107f65cb9F";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

export const playerInfo = {
  playerBalance: "'",
  playerAddress: "",
  playerChain: "",
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
      setPlayerBalance(addressArray[0]);
      setPlayerAddress(addressArray[0]);
      setPlayerChain();

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
        playerChain: playerInfo.playerChain
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
        setPlayerBalance(addressArray[0]);
        setPlayerAddress(addressArray[0]);
        setPlayerChain();

        return {
          address: addressArray[0],
          totalMinted: await player456Contract.methods.totalSupply().call(),
          playerBalance: playerInfo.playerBalance,
          playerChain: playerInfo.playerChain
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

// Runs when first connected, and on page reload
async function setPlayerBalance(address) {
  web3.eth.getBalance(address, function (err, ret) {
    const balance = (ret / Math.pow(10, 18)).toFixed(4)

    playerInfo.playerBalance = balance;
  })
}

function setPlayerAddress(address) {
  playerInfo.playerAddress = address;
}

function setPlayerChain() {
  playerInfo.playerChain = window.ethereum.networkVersion;
}

export const pinJSONToIPFS = async(JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    // making axios POST request to Pinata
    return axios
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
           return {
               success: true,
               pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
};

const player456Contract = new web3.eth.Contract(
  contractABI,
  contractAddress
)

export const mintNFT = async (numberOfPlayers) => {
  const totSupply = await player456Contract.methods.totalSupply().call();
  const playersRemaining = 456 - await player456Contract.methods.totalSupply().call();
  const currentBalance = playerInfo.playerBalance;
  const fromAddress = playerInfo.playerAddress;
  const mintPrice = gameInfo.price * 10 ** 18;

  // Make sure we're not sold out! (move this)
  // if(totSupply >= 456) {
  //   document.getElementById("mintNowButton").setAttribute('disabled', true);
  //   document.getElementById("mintingError").innerText = "Sold out!";
  //   return;
  // }

  // Make sure their balance can cover transaction
  if(currentBalance < numberOfPlayers * gameInfo.price) {
    document.getElementById("mintNowButton").innerText = "Insuficient funds";
    document.getElementById("mintingError").innerText = `You need ${numberOfPlayers * gameInfo.price} ETH + gas fees`;
    return;
  }

  // Make sure there are enough tokens left
  if(numberOfPlayers > playersRemaining) {
    document.getElementById("mintNowButton").innerText = "Too many players"
    document.getElementById("mintingError").innerText = "There aren't that many player remaining";
    return;
  }

  console.log("network: " + window.ethereum.networkVersion);
  console.log("total Supply: " + totSupply);


  const tokenURI = {};

  // Create all the Meta data files in a loop
  for (let i = 0; i < numberOfPlayers; i++) {
     // Create metadata
    const metadata = {
      image: "https://stupefied-pike-2518e3.netlify.app/static/media/Players.395e3186.gif",
      description: "Pass to participate in Game 1",
      name: "Player",
      attributes: {
        rand: Math.random()
      }
    }

    // Call Pinata
    const pinataResponse = await pinJSONToIPFS(metadata);
    if (!pinataResponse.success) {
      return {
        success: false,
        status: "Something went wrong while uploading tokenURI"
      }
    }

    tokenURI[i] = pinataResponse.pinataUrl;

    console.log('i: ' + i + "uri: " + tokenURI[i]);
  }


  // TO DO: Update when new contract is up
  const mintClaim = await new Promise((resolve, reject) => {
      player456Contract.methods
          .mintPlayer(numberOfPlayers)
          .send(
              { from: fromAddress,
                value: (numberOfPlayers * mintPrice).toString(),
                tokenURI: tokenURI
               },
              function (error, transactionHash) {
                  if (transactionHash) resolve(transactionHash)
                  else reject()
              })
  })

  if (!mintClaim) return

  document.getElementById("mintNowButton").innerText = "Minting..."

  let checkTx = setInterval(async function () {
      const tx = await web3.eth.getTransactionReceipt(mintClaim)
      if (tx) {
          clearInterval(checkTx)
          document.getElementById("mintNowButton").innerText = "Minting successful";
          document.getElementById("totalMintedSpan").innerHTML = await player456Contract.methods.totalSupply().call();

          setTimeout(function() {
            document.getElementById("mintNowButton").innerText = "Mint for 0.055 ETH";
          }, 5000);

          return {
            success: true
          }
      }
  }, 10 * 1000)
}
