pragma solidity ^0.5.0;

interface BlockchainMarketInterface {

    function signUp(string calldata _userName) external returns (uint256);

    function isBlockchainMarket() external pure returns (bool);
}