pragma solidity ^0.5.0;

import "contracts/BlockchainMarketBase.sol";

contract ItemFactory is BlockchainMarketBase {

    event ItemAdded(uint256 itemId, uint256 indexed userId, string _name, uint256 price);

    function addItem(uint256 _userId, string memory _itemName, uint256 _itemPrice)
        public
        payable
        notPaused
        returns (uint256)
    {
        uint256 itemId = items.length;

        address _user = msg.sender;

        items.push(Item(itemId, _userId, _itemPrice, _itemName));

        userItemList[_user].push(itemId);

        userItems[_userId].push(itemId);

        emit ItemAdded(itemId, _userId, _itemName, _itemPrice);

        return itemId;
    }
}