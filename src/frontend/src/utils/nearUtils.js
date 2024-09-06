/*import { connect, keyStores, WalletConnection } from 'near-api-js';
import { BrowserLocalStorageKeyStore } from '@near-js/keystores-browser';

const nearConfig = {
  networkId: 'testnet',
  keyStore: new BrowserLocalStorageKeyStore(), // Corrected import
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://explorer.testnet.near.org',
};

export async function initNear() {
  const near = await connect(nearConfig);
  const walletConnection = new WalletConnection(near);
  return walletConnection;
}
*/