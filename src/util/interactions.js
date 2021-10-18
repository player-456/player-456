require("dotenv").config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const contractABI = require("./contract-abi.json");
const contractAddress = "0x681b0227E558628Cb1AeeDA1F308Aa8BB9b7Cd37";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

let playerBalance;

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
      // Get player's balance
      getPlayerBalance(addressArray[0]);

      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
        totalMinted: await player456Contract.methods.totalSupply().call()
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        // Get player's balance
        getPlayerBalance(addressArray[0]);

        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
          totalMinted: await player456Contract.methods.totalSupply().call()
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
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
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};


async function getPlayerBalance(playerAddress) {
  web3.eth.getBalance(playerAddress, function (err, ret) {
    console.log("balance from playerBalance func: " + ret / Math.pow(10, 18))
    const balance = (ret / Math.pow(10, 18)).toFixed(4)

    playerBalance = balance;
  })
}


async function addressLookup() {

}

async function loadContract() {
  return new web3.eth.Contract(contractABI, contractAddress);
}

export const mintNFT = async (playerAddress) => {
  const totSupply = await player456Contract.methods.totalSupply().call();
  const currentBalance = playerBalance;

  console.log("network: " + window.ethereum.networkVersion);
  console.log("total Supply: " + totSupply);

  const price = .055 * 10 ** 18;
  const currentAddress = playerAddress;

  // we need:
  // 1. from address
  // 2. eth price - .055 * 10 ** 18

  console.log("C: " + currentBalance + ", p: " + price);
  if(currentBalance < price) {

    document.getElementById("mintingError").innerHTML = "You do not have enough ETH!";
    document.getElementById("mintingError").classList.remove("hidden");
    console.log("not enough eth");

    return;
  }
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