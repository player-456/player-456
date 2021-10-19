import {supportedChains} from "./chains";

require("dotenv").config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const requestedChain = process.env.REACT_APP_CURRENT_NETWORK;
const contractABI = require("./contract-abi.json");
const contractAddress = "0x681b0227E558628Cb1AeeDA1F308Aa8BB9b7Cd37";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const playerInfo = {
  playerBalance: "'",
  playerAddress: "",
  playerChain: "",
}

export const gameInfo = {
  price: .055,
  chainId: null,
  networkId: null,
  mm_id: "",
  chainName: ""
}

function setGameChainInfo() {
  for(let i = 0; i < supportedChains.length; i++) {
    if(supportedChains[i].chain_id == requestedChain) {
      gameInfo.chainId = supportedChains[i].chain_id;
      gameInfo.networkId = supportedChains[i].network_id;
      gameInfo.mm_id = supportedChains[i].mm_id;
      gameInfo.chainName = supportedChains[i].name;
    }
  }
}
setGameChainInfo();


export const player456Contract = new web3.eth.Contract(
  contractABI,
  contractAddress
)

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


export const mintNFT = async () => {
  const totSupply = await player456Contract.methods.totalSupply().call();
  const currentBalance = playerInfo.playerBalance;

  console.log("network: " + window.ethereum.networkVersion);
  console.log("total Supply: " + totSupply);

  // we need:
  // 1. from address
  const fromAddress = playerInfo.playerAddress;
  // 2. eth price - .055 * 10 ** 18
  const mintPrice = gameInfo.price * 10 ** 18;
  const toAddress = contractAddress;

  // 3. how many to mint
  // 4.
}

// export const mintNFT = async (url, name, description) => {
//   if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
//     return {
//       success: false,
//       status: "❗Please make sure all fields are completed before minting.",
//     };
//   }

//   //make metadata
//   const metadata = new Object();
//   metadata.name = name;
//   metadata.image = url;
//   metadata.description = description;

//   const pinataResponse = await pinJSONToIPFS(metadata);
//   if (!pinataResponse.success) {
//     return {
//       success: false,
//       status: "😢 Something went wrong while uploading your tokenURI.",
//     };
//   }
//   const tokenURI = pinataResponse.pinataUrl;

//   window.contract = await new web3.eth.Contract(contractABI, contractAddress);

//   const transactionParameters = {
//     to: contractAddress, // Required except during contract publications.
//     from: window.ethereum.selectedAddress, // must match user's active address.
//     data: window.contract.methods
//       .mintNFT(window.ethereum.selectedAddress, tokenURI)
//       .encodeABI(),
//   };

//   try {
//     const txHash = await window.ethereum.request({
//       method: "eth_sendTransaction",
//       params: [transactionParameters],
//     });
//     return {
//       success: true,
//       status:
//         "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
//         txHash,
//     };
//   } catch (error) {
//     return {
//       success: false,
//       status: "😥 Something went wrong: " + error.message,
//     };
//   }
// };