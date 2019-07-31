pragma solidity ^0.5.0;

import "contracts/BlockchainMarketBase.sol";
import "contracts/BlockchainMarketInterface.sol";

contract UserFactory is BlockchainMarketBase {

    BlockchainMarketInterface internal blockchainMarket;

    // event NewUserSignUp(uint256 userId, address indexed userAddr, string userName);

    // f   external
    //     notPaused
    //     returns (uint256)
    // {
    //     uint256 userId = users.length;
    //     address newUser = msg.sender;

    //     Useunction signUp(string calldata _userName)
    //  rsIds.push(userId);

    //     users.push(User(userId, newUser, _userName));

    //     userRegistered[userId] = newUser;

    //     addressUserId[newUser] = userId;

    //     addRole(newUser, ROLE_STORE_OWNER);

    //     emit NewUserSignUp(userId, newUser, _userName);

    //     return userId;
    // }
}