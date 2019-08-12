pragma solidity ^0.5.0;

import "contracts/BlockchainMarketBase.sol";

/// @title StoreFactory is the Contract to handle new Stores
/// @author Oscar Eduardo Fonseca Gomez
/// @notice This is a core contract for the logic of the new stores
/// @dev The contract should be included in ItemFactory Contract
contract StoreFactory is BlockchainMarketBase {

    event NewStore(string _storeName, address _storeOwner, uint _skuTotal);
    
    /// @author Oscar E. Fonseca
    /// @notice Create a new item in the Store
    /// @dev only available when contract is not paused and is called by the store owner
    /// @param _storeName The name of the store
    /// @param _storeOwner The address of the owner
    /// @param _storeSkuTotal The total skus of the store
    /// @return the total of stores in the BlockchainMarket
    function newStore(string memory _storeName, address payable _storeOwner, uint _storeSkuTotal)
        public
        notPaused
        validNameLength(_storeName, 35)
        returns (uint)
    {
        //Asign the new store values to the stores object in the mapping
        stores[storeTotal].name = _storeName;
        stores[storeTotal].owner = _storeOwner;
        stores[storeTotal].skuTotal = _storeSkuTotal;

        //Increment the count of stores
        storeTotal = SafeMath.add(storeTotal, 1);

        //Send an event with the name of the new store
        emit NewStore(_storeName, _storeOwner, _storeSkuTotal);

        //Return the new store count
        return storeTotal;
    }
}