pragma solidity ^0.5.0;

// import "contracts/ItemFactory.sol";
import "contracts/UserFactory.sol";
// import "contracts/StoreFactory.sol";

contract Store is UserFactory {

    /**
    * @notice emitted when contract address is set
    **/
    event NewContractAdded(address contractAddr);

    /**
    * @notice Set the address of the BlockchainMarket Contract
    **/
    function setBlockchainMarketBaseContractAddress(address _address)
        external
        isAdmin
    {
        BlockchainMarketInterface candidateContract = BlockchainMarketInterface(_address);

        //Verification of correct address
        require(candidateContract.isBlockchainMarket(),"Wrong Address Provided");

        //Set the new contract address
        blockchainMarket = candidateContract;

        emit NewContractAdded(_address);
    }

}