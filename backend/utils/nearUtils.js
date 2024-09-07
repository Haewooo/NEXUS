// backend/utils/nearUtils.js
import { connect, keyStores, WalletConnection } from 'near-api-js';

const nearConfig = {
  networkId: 'default',
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: 'https://rpc.mainnet.near.org',
  walletUrl: 'https://wallet.near.org',
  helperUrl: 'https://helper.mainnet.near.org',
  explorerUrl: 'https://explorer.mainnet.near.org',
};

export async function initNEAR() {
    try {
     
      const near = await connect(nearConfig);
      const walletConnection = new WalletConnection(near, null);
  
      if (!walletConnection.isSignedIn()) {
   
        walletConnection.requestSignIn('near-ai-nexus.testnet');
      } else {
        
        const accountId = walletConnection.getAccountId();
        console.log(`Logged in as: ${accountId}`);
    
        return accountId;
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Failed to connect to NEAR Wallet. Please try again.');
    }
  }
