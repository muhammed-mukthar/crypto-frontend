import { InjectedConnector } from "@web3-react/injected-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 4, 97, 56],
  // supportedChainIds: [1, 56, 5],
});
