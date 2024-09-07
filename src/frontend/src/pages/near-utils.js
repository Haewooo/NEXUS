import { connect, keyStores, WalletConnection } from 'near-api-js';

export async function initNear() {
  const nearConfig = {
    networkId: "testnet",
    keyStore: new keyStores.BrowserLocalStorageKeyStore(), 
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
  };

  const near = await connect(nearConfig);
  const wallet = new WalletConnection(near, null);

  return { near, wallet };
}
