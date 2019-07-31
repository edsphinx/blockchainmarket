pragma solidity ^0.5.0;

import "contracts/BlockchainMarketBase.sol";

contract StoreFactory is BlockchainMarketBase {

    event NewStore(string _storeName, address _storeOwner, uint _skuTotal);
    
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