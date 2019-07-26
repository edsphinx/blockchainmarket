pragma solidity ^0.5.0;

//import "contracts/SafeMath.sol";
//import "node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";
//import "contracts/Utilities.sol";
import "contracts/UserFactory.sol";

contract BlockchainMarket is UserFactory {

    function isBlockchainMarket() external pure returns (bool) {
        return true;
    }
    
    function getItemIds(uint256 _userId)
        external
        view
        returns (uint[] memory)
    {
        return userItems[_userId];
    }

    function getItemIdsByAdd(address _seller)
        external
        view
        returns (uint[] memory)
    {
        return userItemList[_seller];
    }

    function getItem(uint256 _itemId)
        external
        view
        returns (uint256, uint256, uint256, string memory)
    {
        require(_itemId < items.length, "Id of Item out of range");
        Item memory item = items[_itemId];
        return (
            item.itemId,
            item.userId,
            item.price,
            item.name
        );
    }

    function getUserId(address _userAddr)
        external
        view
        returns (uint)
    {
        return addressUserId[_userAddr];
    }

    function getUserIds()
        external
        view
        returns (uint[])
    {
        return UsersIds;
    }

    function getUser(uint256 _userId)
        external
        view
        returns (uint256, address, string memory)
    {
        require(_userId < users.length, "Id of User out of range");
        User memory user = users[_userId];
        return (
            user.userId,
            user.userAddr,
            user.userName
        );
    }

    // address payable public owner;

    // bytes32[] public userList;

    // event LogUserSignUp(address user, bool _signedup); //User set default as buyer have to apply to become authorized seller
    // event LogAdminApproved(address newAdmin, bool isApproved);
    // event LogSellerApproved(address newSeller, address approvedBy, bool isApproved);
    // event LogSellerAddedItem(address _sellerAdrr, bool isAdded);
    // event LogItemPurchased(address _buyerAddr, bool isPurchased);
    // event LogItemTransfered(address _sellerAddr, address _buyerAddr, bool isTransfered);

    // modifier isOwner(){require(msg.sender==owner, "Only Owner is authorized to do this"); _;}

    // modifier isCorrectUserType(UserTypes _userType){
    //     require(users[msg.sender].userType == uint256(_userType), "El usuario ya tiene permiso de Administrador");
    //     _;
    // }

    // modifier isSignedUp(address _userAddr){
    //     require(users[_userAddr].UserAddr != address(0x0), "User not signed up");
    //     _;
    // }

    // modifier isNotSignedUp(address _userAddr){
    //     require(users[_userAddr].UserAddr == address(0x0), "User already registered");
    //     _;
    // }

    // modifier isNotSetAlready(address _userAddr, UserTypes _userType){
    //     require(users[_userAddr].userType != uint256(_userType), "El usuario ya tiene el permiso solicitado");
    //     _;
    // }

    // modifier isItemCreated(string memory _itemId) {
    //     require(keccak256(bytes(items[_itemId].itemId)) == keccak256(bytes(_itemId)), "Item exists already");
    //     _;
    // }

    // modifier isItemAvailable(string memory _itemId) {

    //     for(uint i = 0; i < itemsList.length; i++) {
    //         require(keccak256(bytes(itemsList[i])) == keccak256(bytes(_itemId)), "Item don't exist");
    //     }
    //     _;
    // }


    //Start Functions
    // function userSignUp(address _userAddr, string memory _userName)
    //     public
    //     isNotSignedUp(_userAddr)
    // {
    //     users[_userAddr].UserAddr = _userAddr;
    //     users[_userAddr].userName = _userName;
    //     userAddr.push(_userAddr);
    //     emit LogUserSignUp(_userAddr, true);
    // }

    // function approveAdmin(address newAdmin)
    //     public
    //     isOwner
    //     isCorrectUserType(UserTypes.ADMIN)
    //     isSignedUp(newAdmin)
    //     isNotSetAlready(newAdmin, UserTypes.ADMIN)
    // {
    //     users[newAdmin].userType = uint256(UserTypes.ADMIN);
    //     admins[newAdmin] = users[newAdmin];
    //     emit LogAdminApproved(newAdmin, true);
    // }

    // function approveSeller(address _userAddr)
    //     public
    //     isOwner
    //     isCorrectUserType(UserTypes.BUYER)
    //     isSignedUp(_userAddr)
    //     isNotSetAlready(_userAddr, UserTypes.SELLER)
    // {
    //     users[_userAddr].userType = uint256(UserTypes.SELLER);
    //     sellers[_userAddr] = users[_userAddr];
    //     emit LogSellerApproved(_userAddr, msg.sender, true);
    // }

    // function sellerAddItem(address _sellerAddr, string memory _itemId, string memory _itemName, uint _price)
    //     public
    //     isItemCreated(_itemId)
    // {
    //     address payable _newAddr = address(uint160(_sellerAddr));
    //     items[_itemId].itemId = _itemId;
    //     items[_itemId].itemName = _itemName;
    //     items[_itemId].price = _price;
    //     items[_itemId].purchased = false;
    //     items[_itemId].ownerHistoric.push(_sellerAddr);

    //     itemsList.push(_itemId);
    //     users[_sellerAddr].userItems.push(_itemId);
    //     itemOwner[_itemId] = _newAddr;
    //     emit LogSellerAddedItem(_sellerAddr, true);
    // }

    // function userPurchaseItem(address _buyerAddr, string memory _itemId)
    //     public
    //     payable
    //     isItemAvailable(_itemId)
    // {
    //     require(!items[_itemId].purchased, "");

    //     address payable _newAddr = address(uint160(_buyerAddr));

    //     itemOwner[_itemId].transfer(msg.value);
    //     itemOwner[_itemId] = _newAddr;
    //     items[_itemId].purchased = true;
    //     items[_itemId].ownerHistoric.push(_buyerAddr);
    //     users[_buyerAddr].userItems.push(_itemId);

    //     emit LogItemPurchased(_buyerAddr, true);
    // }

    // function itemTransferOwner(address _sellerAddr, address _buyerAddr, string memory _itemId)
    //     public
    //     isSignedUp(_buyerAddr)
    // {
    //     address payable _newAddr = address(uint160(_buyerAddr));

    //     require(itemOwner[_itemId] == _sellerAddr, "Item don't belongs to Seller");
    //     itemOwner[_itemId] = _newAddr;
    //     users[_buyerAddr].userItems.push(_itemId);
    //     items[_itemId].ownerHistoric.push(_buyerAddr);

    //     emit LogItemTransfered(_sellerAddr, _buyerAddr, true);
    // }

    // function getItemOwnerHistory(string memory _itemId)
    //     public
    //     view
    //     returns (uint, address[] memory )
    // {
    //     return (items[_itemId].ownerHistoric.length, items[_itemId].ownerHistoric);
    // }

    // function getSellerItems(address _sellerAddr)
    //     public
    //     view
    //     returns (uint, string[] memory, string[] memory, uint[] memory, address[] memory)
    // {
    //     uint length = users[_sellerAddr].userItems.length;
    //     string[] memory itemName = new string[](length);
    //     uint[] memory itemPrice = new uint[](length);
    //     address[] memory _itemOwner = new address[](length);

    //     for(uint i = 0; i < length; i++) {
    //         itemName[i] = items[users[_sellerAddr].userItems[i]].itemName;
    //         itemPrice[i] = items[users[_sellerAddr].userItems[i]].price;
    //         _itemOwner[i] = itemOwner[users[_sellerAddr].userItems[i]];
    //     }

    //     return (length, users[_sellerAddr].userItems, itemName, itemPrice, _itemOwner);
    // }

    // function getAllUser()
    //     public
    //     view
    //     returns (bytes32[] memory)
    // {
    //     //bytes32[] memory _users;
    //     //_users.push("User ONE");
    //     // for (uint i = 0; i < userAddr.length; i++) {
    //     //     _users[i] = users[userAddr[i]].userName;
    //     // }

    //     return userList;
    // }

    // function getAllItems()
    //     public
    //     view
    //     returns (uint, string[] memory, string[] memory, uint[] memory, address[] memory)
    // {
    //     uint length = itemsList.length;
    //     string[] memory itemName = new string[](length);
    //     uint[] memory itemPrice = new uint[](length);
    //     address[] memory _itemOwner = new address[](length);

    //     for(uint i = 0; i < length; i++) {
    //         itemName[i] = items[itemsList[i]].itemName;
    //         itemPrice[i] = items[itemsList[i]].price;
    //         _itemOwner[i] = itemOwner[itemsList[i]];
    //     }

    //     return (length, itemsList, itemName, itemPrice, _itemOwner);
    // }

    // function getPrice(string memory itemId)
    //     public
    //     view
    //     returns (uint)
    // {
    //     return items[itemId].price;
    // }

    // function getBalance(address _userAddr)
    //     public
    //     view
    //     returns (uint)
    // {
    //     return _userAddr.balance;
    // }

    // function getUsername(address _userAddr)
    //     public
    //     view
    //     returns (string memory)
    // {
    //     return users[_userAddr].userName;
    // }
}