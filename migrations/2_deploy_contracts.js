let BlockchainMarket = artifacts.require("./BlockchainMarket.sol");

module.exports = function (deployer) {
    deployer.deploy(BlockchainMarket);
}