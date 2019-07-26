pragma solidity ^0.5.0;

import "contracts/AccessControl.sol";

contract BlockchainMarketBase is AccessControl {

    //All the users registered
    User[] public users;

    //All the items
    Item[] public items;

    //Mapping of Owner Address to list of owned items
    mapping(address => uint256[]) userItemList;

    //Mapping of User Address to UserId
    mapping(address => uint256) addressUserId;
 
    //Mapping of UserId to UserAddress
    mapping(uint256 => address) public userRegistered;

    //Mapping of UserId to Item list
    mapping(uint256 => uint256[]) public userItems;

    struct User {
        uint256 userId;
        address userAddr;
        string userName;
    }

    struct Item {
        uint256 itemId;
        uint256 userId;
        uint256 price;
        string name;
    }
}