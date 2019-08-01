pragma solidity ^0.5.0;

import "contracts/StoreFactory.sol";

contract ItemFactory is StoreFactory {

    // event NewItem(uint256 itemId, uint256 indexed userId, string _itemName, uint256 price);

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

