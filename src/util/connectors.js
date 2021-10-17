import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
})

const walletLink = new WalletLinkConnector({
  url: 'https://eth-ropsten.alchemyapi.io/v2/TziqSmPyxfTYZf_2qDiWQJqCAm-UK_wL',
  appName: 'Player 456'
})

export { injected, walletLink }