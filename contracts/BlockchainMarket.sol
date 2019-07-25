pragma solidity ^0.5.0;

//import "contracts/SafeMath.sol";
import "node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "contracts/Utilities.sol";

contract BlockchainMarket is Utilities {

    address payable public owner;
    enum UserTypes {BUYER, ADMIN, SELLER }

    /*
    struct Admin {
        address adminAddr;
        bytes32 username;
        bytes32 password;
    }

    struct Seller {
        address sellerAddr;
        bytes32 username;
        bytes32 password;
        bytes32[] sellerItems;
    }

    struct Buyer {
        address buyerAddr;
        bytes32 username;
        bytes32 password;
        bytes32[] buyerItems;
    }
    */

    //Enhanced to one struct
    struct User {
        address UserAddr;
        uint userType;
        bytes32 userName;
        bytes32 passWord;
        bytes32[] userItems;
    }

    struct Item {
        bytes32 itemId;
        bytes32 itemName;
        uint price;
        bool purchased;
        address[] ownerHistoric;
    }

    mapping(address => User) users;
    mapping(address => User) admins;
    mapping(address => User) sellers;
    // mapping(address => Buyer) buyers;
    mapping(bytes32 => Item) items;
    mapping(bytes32 => address payable) itemOwner;

    address[] userAddr;
    bytes32[] public itemsList;

    event LogUserSignUp(address user, bool _signedup); //User set default as buyer have to apply to become authorized seller
    event LogAdminApproved(address newAdmin, bool isApproved);
    event LogSellerApproved(address newSeller, address approvedBy, bool isApproved);
    event LogSellerAddedItem(address _sellerAdrr, bool isAdded);
    event LogItemPurchased(address _buyerAddr, bool isPurchased);
    event LogItemTransfered(address _sellerAddr, address _buyerAddr, bool isTransfered);

    modifier isOwner(){require(msg.sender==owner, "Only Owner is authorized to do this"); _;}

    // modifier isAdmin(){
    //     for(uint i = 0; i < userAddr.length; i++) {
    //         if (userAddr[i] == msg.sender) {
    //             require(users[msg.sender].userType == uint256(UserTypes.ADMIN), "El usuario ya tiene permiso de Administrador");
    //         }
    //     }
    //     _;
    // }

    // modifier isBuyer(){
    //     for(uint i = 0; i < userAddr.length; i++) {
    //         if (userAddr[i] == msg.sender) {
    //             require(users[msg.sender].userType == uint256(UserTypes.BUYER), "El usuario ya tiene permiso de Administrador");
    //         }
    //     }
    //     _;
    // }


    // modifier isSeller()){
    //     for(uint i = 0; i < userAddr.length; i++) {
    //         if (userAddr[i] == msg.sender) {
    //             require(users[msg.sender].userType == uint256(UserTypes.SELLER), "El usuario ya tiene permiso de Administrador");
    //         }
    //     }
    //     _;
    // }
    //Merge 3 modifiers in one
    modifier isCorrectUserType(UserTypes _userType){
        for(uint i = 0; i < userAddr.length; i++) {
            if (userAddr[i] == msg.sender) {
                require(users[msg.sender].userType == uint256(_userType), "El usuario ya tiene permiso de Administrador");
            }
        }
        _;
    }

    modifier isSignedUp(address _userAddr){
        for(uint i = 0; i < userAddr.length; i++) {
            require (userAddr[i] == _userAddr, "User already registered");
        }
        _;
    }

    modifier isNotSignedUp(address _userAddr){
        for(uint i = 0; i < userAddr.length; i++) {
            require (userAddr[i] != _userAddr, "User already registered");
        }
        _;
    }

    // modifier isNotAdminAlready(address _userAddr){
    //     for(uint i = 0; i < userAddr.length; i++) {
    //         if (userAddr[i] == _userAddr) {
    //             require(users[userAddr[i]].userType != uint256(UserTypes.ADMIN), "El usuario ya tiene permiso de Administrador");
    //         }
    //     }
    //     _;
    // }

    // modifier isNotSellerAlready(address _userAddr){
    //     for(uint i = 0; i < userAddr.length; i++) {
    //         if (userAddr[i] == _userAddr) {
    //             require(users[userAddr[i]].userType != uint256(UserTypes.SELLER), "El usuario ya tiene permiso de Vendedor");
    //         }
    //     }
    //     _;
    // }
    //Merged the modifiers in the next one
    modifier isNotSetAlready(address _userAddr, UserTypes _userType){
        for(uint i = 0; i < userAddr.length; i++) {
            if (userAddr[i] == _userAddr) {
                require(users[_userAddr].userType != uint256(_userType), "El usuario ya tiene el permiso solicitado");
            }
        }
        _;
    }

    modifier isItemCreated(string memory _itemId) {
        for(uint i = 0; i < itemsList.length; i++) {
            require(itemsList[i] != stringToBytes32(_itemId), "Item exists already");
        }
        _;
    }

    modifier isItemAvailable(string memory _itemId) {
        for(uint i = 0; i < itemsList.length; i++) {
            require(itemsList[i] == stringToBytes32(_itemId), "Item don't exist");
        }
        _;
    }


    //Start Functions
    function userSignUp(address _userAddr, string memory _userName, string memory _passWord)
        public
        isNotSignedUp(_userAddr)
    {
        users[_userAddr].UserAddr = _userAddr;
        users[_userAddr].userName = stringToBytes32(_userName);
        users[_userAddr].passWord = stringToBytes32(_passWord);
        userAddr.push(_userAddr);
        emit LogUserSignUp(_userAddr, true);
    }

    function approveAdmin(address newAdmin)
        public
        isOwner
        isCorrectUserType(UserTypes.ADMIN)
        isSignedUp(newAdmin)
        isNotSetAlready(newAdmin, UserTypes.ADMIN)
    {
        users[newAdmin].userType = uint256(UserTypes.ADMIN);
        admins[newAdmin] = users[newAdmin];
        emit LogAdminApproved(newAdmin, true);
    }

    function approveSeller(address _userAddr)
        public
        isOwner
        isCorrectUserType(UserTypes.BUYER)
        isSignedUp(_userAddr)
        isNotSetAlready(_userAddr, UserTypes.SELLER)
    {
        users[_userAddr].userType = uint256(UserTypes.SELLER);
        sellers[_userAddr] = users[_userAddr];
        emit LogSellerApproved(_userAddr, msg.sender, true);
    }

    function sellerAddItem(address _sellerAddr, string memory _itemId, string memory _itemName, uint _price)
        public
        isItemCreated(_itemId)
    {
        bytes32 newId = stringToBytes32(_itemId);
        address payable _newAddr = address(uint160(_sellerAddr));
        items[newId].itemId = newId;
        items[newId].itemName = stringToBytes32(_itemName);
        items[newId].price = _price;
        items[newId].purchased = false;
        items[newId].ownerHistoric.push(_sellerAddr);

        itemsList.push(newId);
        users[_sellerAddr].userItems.push(newId);
        itemOwner[newId] = _newAddr;
        emit LogSellerAddedItem(_sellerAddr, true);
    }

    function userPurchaseItem(address _buyerAddr, string memory _itemId)
        public
        payable
        isItemAvailable(_itemId)
    {
        bytes32 newId = stringToBytes32(_itemId);
        require(!items[newId].purchased, "");

        address payable _newAddr = address(uint160(_buyerAddr));

        itemOwner[newId].transfer(msg.value);
        itemOwner[newId] = _newAddr;
        items[newId].purchased = true;
        items[newId].ownerHistoric.push(_buyerAddr);
        users[_buyerAddr].userItems.push(newId);

        emit LogItemPurchased(_buyerAddr, true);
    }

    function itemTransferOwner(address _sellerAddr, address _buyerAddr, string memory _itemId)
        public
        isSignedUp(_buyerAddr)
    {
        bytes32 newId = stringToBytes32(_itemId);
        address payable _newAddr = address(uint160(_buyerAddr));

        require(itemOwner[newId] == _sellerAddr, "Item don't belongs to Seller");
        itemOwner[newId] = _newAddr;
        users[_buyerAddr].userItems.push(newId);
        items[newId].ownerHistoric.push(_buyerAddr);

        emit LogItemTransfered(_sellerAddr, _buyerAddr, true);
    }

    function getItemOwnerHistory(string memory _itemId)
        public
        view
        returns (uint, address[] memory )
    {
        bytes32 newId = stringToBytes32(_itemId);
        return (items[newId].ownerHistoric.length, items[newId].ownerHistoric);
    }

    function getSellerItems(address _sellerAddr)
        public
        view
        returns (uint, bytes32[] memory, bytes32[] memory, uint[] memory, address[] memory)
    {
        uint length = users[_sellerAddr].userItems.length;
        bytes32[] memory itemName = new bytes32[](length);
        uint[] memory itemPrice = new uint[](length);
        address[] memory _itemOwner = new address[](length);

        for(uint i = 0; i < length; i++) {
            itemName[i] = items[users[_sellerAddr].userItems[i]].itemName;
            itemPrice[i] = items[users[_sellerAddr].userItems[i]].price;
            _itemOwner[i] = itemOwner[users[_sellerAddr].userItems[i]];
        }

        return (length, users[_sellerAddr].userItems, itemName, itemPrice, _itemOwner);
    }

    function getAllUser()
        public
        view
        returns (bytes32[] memory)
    {
        bytes32[] memory _users;
        _users[0] = stringToBytes32("No Users");
        for (uint i = 0; i < userAddr.length; i++) {
            _users[i] = users[userAddr[i]].userName;
        }

        return _users;
    }

    function getAllItems()
        public
        view
        returns (uint, bytes32[] memory, bytes32[] memory, uint[] memory, address[] memory)
    {
        uint length = itemsList.length;
        bytes32[] memory itemName = new bytes32[](length);
        uint[] memory itemPrice = new uint[](length);
        address[] memory _itemOwner = new address[](length);

        for(uint i = 0; i < length; i++) {
            itemName[i] = items[itemsList[i]].itemName;
            itemPrice[i] = items[itemsList[i]].price;
            _itemOwner[i] = itemOwner[itemsList[i]];
        }

        return (length, itemsList, itemName, itemPrice, _itemOwner);
    }

    function getPrice(string memory itemId)
        public
        view
        returns (uint)
    {
        return items[stringToBytes32(itemId)].price;
    }

    function getBalance(address _userAddr)
        public
        view
        returns (uint)
    {
        return _userAddr.balance;
    }

    function getUsername(address _userAddr)
        public
        view
        returns (bytes32)
    {
        return users[_userAddr].userName;
    }
}