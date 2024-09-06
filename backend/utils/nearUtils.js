const { connect, WalletConnection } = require("near-api-js");

async function initNear() {
    const near = await connect({
        networkId: "default",
        keyStore: new keyStores.BrowserLocalStorageKeyStore(),
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org"
    });

    const wallet = new WalletConnection(near);
    return wallet;
}

export async function loginWithNEAR() {
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