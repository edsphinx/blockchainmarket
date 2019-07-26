pragma solidity ^0.5.0;

import "contracts/rbac/RBAC.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract AccessControl is RBAC {

    using SafeMath for uint256;

    constructor() public {
        paused = true; //Start paused and will change after migration
        addRole(msg.sender, ROLE_SYS_ADMIN);
        addRole(msg.sender, ROLE_STORE_OWNER);
    }
    
    /*
    *   Event Section
    */
    //Event emitted when contract is upgraded
    event ContractUpgrade(address newContract);

    //Event emitted when contract is paused
    event ContractPaused();

    //Event emitted when contract is unpaused
    event ContractUnpaused();

    /*
    *   Variables Section
    */
    //State variable to determine is contract is paused
    bool public paused = false;

    //For broken contract and upgrade required
    address public newContractAddress;

    /*
    *   Role Section
    */
    //Role for the System Administrator
    string public constant ROLE_SYS_ADMIN = "role/sys-admin";

    //Role for the Owners of Store
    string public constant ROLE_STORE_OWNER = "role/store-owner";

    /*
    *   Modifiers Section
    */
    modifier isAdmin() { checkRole(msg.sender, ROLE_SYS_ADMIN); _; }

    modifier notPaused() { require(!paused, "Already Paused"); _; }

    modifier isPaused() { require(paused, "Is not paused"); _; }

    //For marking contract as upgraded
    function setNetAddress(address _newAddr)
        external
        isAdmin
        isPaused
    {
        newContractAddress = _newAddr;
        emit ContractUpgrade(_newAddr);
    }

    function pause()
        public
        isAdmin
        notPaused
    {
        paused = true;
        emit ContractPaused();
    }

    function unpause()
        public
        isAdmin
        isPaused
    {
        paused = false;
        emit ContractUnpaused();
    }

}