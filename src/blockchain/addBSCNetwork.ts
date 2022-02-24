async function addBSCNetwork(ethereum: any) {
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x61" }],
    });
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    //@ts-ignore
    if (switchError?.code === 4902) {
      try {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x61",
              chainName: "Smart Chain-Testnet",
              nativeCurrency: {
                name: "BNB",
                symbol: "BNB", // 2-6 characters long
                decimals: 18,
              },
              rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
              blockExplorerUrls: ["https://testnet.bscscan.com"],
            },
          ],
        });
      } catch (addError) {
        // handle "add" error
      }
    }
    // handle other "switch" errors
    else {
      alert("Network Switch Denied");
    }
  }
}
export default addBSCNetwork;
