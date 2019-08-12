pragma solidity ^0.5.0;

import "contracts/ItemFactory.sol";

/// @title BlockchainMarket the root contract for business logic
/// @author Oscar Eduardo Fonseca Gomez
/// @notice This is a core contract for the business logic of a marketplace for digital items using Ethereum
/// @dev The contract is paused at start and is unpaused in deployment
contract BlockchainMarket is ItemFactory {

    using SafeMath for uint;

    // event GetOrder(uint _storeId, uint _sku, uint _quantity, uint _price);
    // event GetItem(uint _storeId, uint _sku, string _name, uint _price, string _image);
    // event GetStoreTotalItem(uint _storeId, uint _total);
    // event GetStoreTotal(uint _total);
    // event GetStore(uint _storeId, string _name, address _owner, uint _skuTotal);
    // event GetBalance(uint _storeId, uint _balance);
    // event WithdrawBalance(uint _storeId, uint _total);
    event PurchaseItem(uint _storeId, uint _sku, uint _quantity);
    event DeleteItem(uint _storeId, uint _sku);
    event WithdrawAll(address _owner, uint _balance);

    modifier checkQuantity(uint _quantity, uint _storeId, uint _itemCode)
        {require(_quantity <= stores[_storeId].items[_itemCode].sku, "Not sufficient quantity available"); _;}

    constructor()
        public
    {
        admins[owner] = true;
    }

    /// @author Oscar E. Fonseca
    /// @notice Get the Order details: quantity and price
    /// @dev The function is view and only read order details
    /// @param _storeId The Id of the store
    /// @param _itemSku The id of the item
    /// @return quantity of items in the order requested
    /// @return price of items in the order requested
    function getOrder(uint _storeId, uint _itemSku)
        public
        view
        returns(uint quantity, uint price)
    {
        quantity = users[msg.sender].orders[_storeId][_itemSku];
        price = stores[_storeId].items[_itemSku].price;

        // emit GetOrder(_storeId, _itemSku, quantity, price);

        return(quantity, price);
    }

    /// @author Oscar E. Fonseca
    /// @notice Get the Item details: name, sku, price, and hash string of the image
    /// @dev The function is view and only read item details
    /// @param _sku The id of the item
    /// @param _storeId The Id of the store
    /// @return name of the item
    /// @return sku of the item
    /// @return price of the item
    /// @return image as string hash of the item photo
    function getItem(uint _sku, uint _storeId)
        public
        view
        notPaused
        returns (string memory name, uint sku, uint price, string memory image)
    {
        Item memory item = stores[_storeId].items[_sku];

        name = item.name;
        sku = item.sku;
        price = item.price;
        image = item.image;

        // emit GetItem(_storeId, _sku, name, price, image);

        return (name, sku, price, image);
    }

    /// @author Oscar E. Fonseca
    /// @notice Get the Item's count
    /// @dev The function is view and only read total of items
    /// @param _storeId The Id of the store
    /// @return the total of items in the store requested
    function getStoreTotalItems(uint _storeId)
        public
        view
        returns(uint)
    {
        // emit GetStoreTotalItem(_storeId, stores[_storeId].skuTotal);

        return stores[_storeId].skuTotal;
    }

    /// @author Oscar E. Fonseca
    /// @notice Get the Store's count
    /// @dev The function is view and only read total of stores
    /// @return the total of stores in the blockchain market
    function getStoreTotal()
        public
        view
        returns(uint)
    {
        // emit GetStoreTotal(storeTotal);

        return storeTotal;
    }

    /// @author Oscar E. Fonseca
    /// @notice Method for purchasing item from store
    /// @dev The function is payable and contract should not be paused
    /// @param _sku The id of the item to be purchased
    /// @param _quantity The quantity of the item to be purchased
    /// @param _storeId The Id of the store where the item is going to be purchased
    function purchaseItem(uint _sku, uint _quantity, uint _storeId)
        public
        payable
        notPaused
    {
        uint total = SafeMath.mul(stores[_storeId].items[_sku].price, _quantity);
        require(msg.value >= total, "Not enought eth sent");

        // emit Message(stores[_storeId].items[_sku].sku);

        stores[_storeId].items[_sku].sku = SafeMath.sub(stores[_storeId].items[_sku].sku,  _quantity);
        stores[_storeId].balance = SafeMath.add(stores[_storeId].balance, total);

        users[msg.sender].orders[_storeId][_sku] = SafeMath.add(users[msg.sender].orders[_storeId][_sku], _quantity);

        // emit PurchaseItem(_storeId, _sku, _quantity);

    }

    /// @author Oscar E. Fonseca
    /// @notice Delete a item in a Store
    /// @dev The method only available for the owner of the store
    /// @param _sku The id of the item to be deleted
    /// @param _storeId The Id of the store
    function deleteItem(uint _sku, uint _storeId)
        public
        isStoreOwner(msg.sender, _storeId)
        notPaused
    {
        delete stores[_storeId].items[_sku];

        // emit DeleteItem(_storeId, _sku);
    }

    /// @author Oscar E. Fonseca
    /// @notice Get the Store details
    /// @dev the methods only available if store exists
    /// @param _storeId The Id of the store
    /// @return the name of the store
    /// @return the owner of the store
    /// @return the total of items in the store
    function getStore(uint _storeId)
        public
        view
        validStoreExistence(_storeId)
        returns(string memory, address, uint)
    {
        Store memory store = stores[_storeId];

        // emit GetStore(_storeId, store.name, store.owner, store.skuTotal);

        return (store.name, store.owner, store.skuTotal);
    }

    /// @author Oscar E. Fonseca
    /// @notice Get the Balance available of the Store
    /// @dev Reads the available wei collected from the store sales
    /// @param _storeId The Id of the store
    /// @return the total of wei available
    function getBalance(uint _storeId)
        public
        view
        notPaused
        returns(uint)
    {
        // emit GetBalance(_storeId, stores[_storeId].balance);

        return stores[_storeId].balance;
    }

    /// @author Oscar E. Fonseca
    /// @notice Withdraw the provided balance from the store if is avaiable
    /// @dev only the onwer is able to withdraw
    /// @param _storeId The Id of the store
    function withdrawBalance(uint _storeId, uint _total)
        public
        payable
        notPaused
        isStoreOwner(msg.sender, _storeId)
    {
        require(_total <= stores[_storeId].balance);

        stores[_storeId].owner.transfer(_total);
        stores[_storeId].balance = SafeMath.sub(stores[_storeId].balance, _total);

        // emit WithdrawBalance(_storeId, _total);
    }

    /// @author Oscar E. Fonseca
    /// @notice Withdraw the total available balance from the store
    /// @dev only the onwer is able to withdraw
    function withdrawAll()
        public
        isOwner
        isPaused
    {
        owner.transfer(address(this).balance);

        // emit WithdrawAll(msg.sender, address(this).balance);
    }
}