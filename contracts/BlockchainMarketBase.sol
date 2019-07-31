pragma solidity ^0.5.0;

import "contracts/AccessControl.sol";

contract BlockchainMarketBase is AccessControl {

    event GetOrder(uint _storeId, uint _sku, uint _quantity, uint _price);
    event GetItem(uint _storeId, uint _sku, string _name, uint _price, string _image);
    event GetStoreTotalItem(uint _storeId, uint _total);
    event GetStoreTotal(uint _total);
    event PurchaseItem(uint _storeId, uint _sku, uint _quantity);
    event DeleteItem(uint _storeId, uint _sku);
    event GetStore(uint _storeId, string _name, address _owner, uint _skuTotal);
    event GetBalance(uint _storeId, uint _balance);
    event WithdrawBalance(uint _storeId, uint _total);
    event WithdrawAll(address _owner, uint _balance);

    uint skuTotal = 0;

    uint storeTotal = 0;

    //Mapping of Store Ids with Stores Struct
    mapping(uint => Store) public stores;

    //Mapping of address of users
    mapping(address => User) public users;

    //Make sure names aren't too big
    modifier validNameLength(string memory _storeName, uint stringLimit) { require(bytes(_storeName).length <= stringLimit, "Max characters are 35 for name of store"); _; }

    // Checks if store exists or not
    modifier validStoreExistence(uint _storeID) {require(_storeID <= storeTotal, "Invalid StoreID provided"); _; }

    //Check the Owner of the Store
    modifier isStoreOwner(address _storeOwner, uint _storeId) { require(_storeOwner == stores[_storeId].owner); _; }

    /*
    * Structures Defition
    */ 
    struct User{
        string name;
        mapping(uint => mapping(uint => uint)) orders;
    }

    struct Store {
        address payable owner;
        string name;
        uint skuTotal;
        uint balance;
        mapping (uint=>Item) items;
    }

    struct Item {
        uint sku;
        string name;
        uint price;
        string image;
    }

    struct Order {
        uint quantity;
        uint price;
    }

}