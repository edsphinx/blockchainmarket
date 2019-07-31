pragma solidity ^0.5.0;

import "contracts/ItemFactory.sol";

/** @title BlockchainMarket. */
contract BlockchainMarket is ItemFactory {

    using SafeMath for uint;
    
    modifier checkQuantity(uint _quantity, uint _storeId, uint _itemCode) {require(_quantity <= stores[_storeId].items[_itemCode].sku, "Not sufficient quantity available"); _; }
  
    constructor() public {
        admins[owner] = true;
    }
  
    function getOrder(uint _storeId, uint _itemSku)
        public
        returns(uint quantity, uint price)
    {
        quantity = users[msg.sender].orders[_storeId][_itemSku];
        price = stores[_storeId].items[_itemSku].price;

        emit GetOrder(_storeId, _itemSku, quantity, price);
        
        return(quantity, price);
    }

    function getItem(uint _sku, uint _storeId)
        public 
        notPaused
        returns (string memory name, uint sku, uint price, string memory image) 
    {
        Item memory item = stores[_storeId].items[_sku];

        name = item.name;
        sku = item.sku;
        price = item.price;
        image = item.image;

        emit GetItem(_storeId, _sku, name, price, image);

        return (name, sku, price, image);
    }

    function getStoreTotalItems(uint _storeId)
        public
        returns(uint)
    {
        emit GetStoreTotalItem(_storeId, stores[_storeId].skuTotal);

        return stores[_storeId].skuTotal;
    }
  
    function getStoreTotal()
        public
        returns(uint)
    {
        emit GetStoreTotal(storeTotal);

        return storeTotal;
    }

    function purchaseItem(uint _sku, uint _quantity, uint _storeId)
        payable
        public
        notPaused
    {
        uint total = SafeMath.mul(stores[_storeId].items[_sku].price, _quantity);
        require(msg.value >= total, "Not enought eth sent");
        
        // emit Message(stores[_storeId].items[_sku].sku);

        stores[_storeId].items[_sku].sku = SafeMath.sub(stores[_storeId].items[_sku].sku,  _quantity);
        stores[_storeId].balance = SafeMath.add(stores[_storeId].balance, total);

        users[msg.sender].orders[_storeId][_sku] = SafeMath.add(users[msg.sender].orders[_storeId][_sku], _quantity);

        emit PurchaseItem(_storeId, _sku, _quantity);

    }

    function deleteItem(uint _sku, uint _storeId) 
        public 
        isStoreOwner(msg.sender, _storeId)
        notPaused
    {
        delete stores[_storeId].items[_sku];

        emit DeleteItem(_storeId, _sku);
    }
  
    function getStore(uint _storeId)
        public
        validStoreExistence(_storeId)
        returns(string memory, address, uint)
    {
        Store memory store = stores[_storeId];

        emit GetStore(_storeId, store.name, store.owner, store.skuTotal);

        return (store.name, store.owner, store.skuTotal);
    }
  
    function getBalance(uint _storeId)
        public
        notPaused
        returns(uint)
    {
        emit GetBalance(_storeId, stores[_storeId].balance);

        return stores[_storeId].balance;
    }

    function withdrawBalance(uint _storeId, uint _total)
        public
        payable
        notPaused
        isStoreOwner(msg.sender, _storeId)
    {
        require(_total <= stores[_storeId].balance);
        
        stores[_storeId].balance = SafeMath.sub(stores[_storeId].balance, _total);
        stores[_storeId].owner.transfer(_total);
        
        emit WithdrawBalance(_storeId, _total);
    }
  
    function withdrawAll() 
        public
        isOwner
        isPaused
    {
        owner.transfer(address(this).balance);

        emit WithdrawAll(msg.sender, address(this).balance);
    }
}