let BlockchainMarket = artifacts.require("./BlockchainMarket.sol");
let Store = artifacts.require("./Store.sol");

module.exports = function (deployer) {
    deployer.then( 
        async () => {
            //Deploy the BlockchainMarket Contract
            const blockchainMarket = await deployer.deploy(BlockchainMarket);

            //Deploy the Store Contract
            //const store = await deployer.deploy(Store);

            //Setup the BlockchainMarket Contract Address
            //await store.setBlockchainMarketBaseContractAddress(blockchainMarket.address);

            //Unpause the contracts
            //await store.unpause();
            await blockchainMarket.unpause();
        }
    )
}