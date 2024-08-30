import { connect, keyStores, WalletConnection } from 'near-api-js';

const nearConfig = {
  networkId: 'default',
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: 'https://rpc.mainnet.near.org',
  walletUrl: 'https://wallet.near.org',
  helperUrl: 'https://helper.mainnet.near.org',
  explorerUrl: 'https://explorer.mainnet.near.org',
};

export async function initNear() {
  const near = await connect(nearConfig);
  const walletConnection = new WalletConnection(near, null);
  return walletConnection;
}