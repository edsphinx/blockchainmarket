pragma solidity ^0.5.0;

import "contracts/AccessControl.sol";

/// @title BlockchainMarketBase is the Base Contract to define structs, mappings and users access
/// @author Oscar Eduardo Fonseca Gomez
/// @notice This is a base contract for the global declarations
/// @dev The contract should be included in StoreFactory Contract
contract BlockchainMarketBase is AccessControl {

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