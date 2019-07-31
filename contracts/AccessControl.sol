pragma solidity ^0.5.0;

import "contracts/rbac/RBAC.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract AccessControl is RBAC {

    using SafeMath for uint256;

    address payable internal owner;

    constructor() public {
        paused = true; //Start paused and will change after migration
        owner = msg.sender;
        addRole(owner, ROLE_SYS_ADMIN);
        addRole(owner, ROLE_STORE_OWNER);
    }
    
    /*
    *   Event Section
    */
    //Event emitted when contract is upgraded
    event ContractUpgrade(address newContract);

    //Event emiited when a new Admin is set
    event AdminAdded(address _newAdmin);

    //Event emmited when the Admin privileges are removed form an Admin
    event AdminRemoved(address _oldAdmin);
    
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

    //Mapping of Address that are admins
    mapping(address => bool) public admins;

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
    modifier isOwner() { require(msg.sender==owner, "Only Owner has access"); _; }

    modifier isAdmin() { checkRole(msg.sender, ROLE_SYS_ADMIN); _; }

    modifier notPaused() { require(!paused, "Already Paused"); _; }

    modifier isPaused() { require(paused, "Is not paused"); _; }

    function transferOwnership(address payable _newOwner)
        public
        isOwner
    {
        require(_newOwner != address(0), "Address can't be empty");
        owner = _newOwner;
        addRole(owner, ROLE_SYS_ADMIN);
        addRole(owner, ROLE_STORE_OWNER);
    }

    //For marking contract as upgraded
    function setNetAddress(address _newAddr)
        external
        isAdmin
        isPaused
    {
        newContractAddress = _newAddr;
        emit ContractUpgrade(_newAddr);
    }

    function setAdmin(address _newAdmin)
        public
        notPaused
        isOwner
    {
        admins[_newAdmin] = true;
        emit AdminAdded(_newAdmin);
    }

    function removeAdmin(address _oldAdmin)
        public
        isOwner
        notPaused
    {
        admins[_oldAdmin] = false;
        emit AdminAdded(_oldAdmin);
    }

    //Only the admin can trigger and emergency pause
    function pause()
        public
        isAdmin
        notPaused
    {
        paused = true;
        emit ContractPaused();
    }

    //Only the admin can resume the system
    function unpause()
        public
        isAdmin
        isPaused
    {
        paused = false;
        emit ContractUnpaused();
    }

}