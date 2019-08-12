pragma solidity ^0.5.0;

import "contracts/StoreFactory.sol";

/// @title ItemFactory is the Contract to handle new items
/// @author Oscar Eduardo Fonseca Gomez
/// @notice This is a core contract for the logic of the new items
/// @dev The contract should be included in BlockchainMarket Contract
contract ItemFactory is StoreFactory {

    // event NewItem(uint256 itemId, uint256 indexed userId, string _itemName, uint256 price);

    /// @author Oscar E. Fonseca
    /// @notice Create a new item in the Store
    /// @dev only available when contract is not paused and is called by the store owner
    /// @param _itemName The name of the item
    /// @param _itemPrice The price of the item
    /// @param _itemSKU The sku of the item
    /// @param _storeId The Id of the store
    /// @param _imageHash The string hash of the phot of the item
    /// @return the total of items in the store
    function newItem(string memory _itemName, uint _itemPrice, uint _itemSKU, uint _storeId, string memory _imageHash)
        public 
        notPaused
        validNameLength(_itemName, 35)
        isStoreOwner(msg.sender, _storeId)
        returns (uint)
    {
        skuTotal = SafeMath.add(skuTotal, 1);
        // increase  items total
        uint total = stores[_storeId].skuTotal;

        stores[_storeId].items[total].name = _itemName;
        stores[_storeId].items[total].price = _itemPrice;
        stores[_storeId].items[total].sku = _itemSKU;
        stores[_storeId].items[total].image = _imageHash;

        // increase items total in Stores
        stores[_storeId].skuTotal = SafeMath.add(total, 1);

        // emit NewItem(_itemSKU, _storeId, _itemName, _itemPrice );

        return skuTotal;
    }
}

