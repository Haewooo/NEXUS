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