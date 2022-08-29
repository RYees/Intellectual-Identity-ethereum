// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract IP {
    address public owner;
    struct Count{
        uint count;
    }

    mapping (address =>Count) newcount;
    
     enum Status {
        Pending,
        Accepted,
        Rejected
    }

    struct IParameter {
        string IPname;
        string fullname;
        string country;
        string addressplace;    
        string symbol;   
        string timestamp;
        Status[] status; 
    }

    struct bid {
        address bidder;
        uint256 value;
    }
    mapping (address => IParameter) public property;
    mapping (address => bid) bidip;

    constructor() payable {
        owner = payable(msg.sender);
    }

    address[] public intelProperty;
        
    mapping (uint => uint) bal;

    function setIP(address _address, string memory _IPname, string memory _fullname, string memory _country, string memory _addressplace, string memory _symbol,Status a) public {
        property[_address].IPname = _IPname;
        property[_address].fullname = _fullname;
        property[_address].country = _country;
        property[_address].addressplace = _addressplace;
        property[_address].symbol = _symbol;
        property[_address].status.push(a);
        //status = Status.Pending;
        newcount[_address].count = 0;
        intelProperty.push(_address);
    }
    
    function chageStatus(address player, Status val) public returns(bool sucess) {
        require(msg.sender == owner);
        property[player].status.push(val);
        newcount[player].count++; 
        return true;
    }

    function getStatus(address player) public view returns(Status status) {
        return property[player].status[newcount[player].count];
    }

    function getAllIP() view public returns (address[] memory) {
        return intelProperty;
    }

    function getIP(address _address) public view returns (string memory, string memory, string memory, string memory, string memory) {
        return (property[_address].IPname, property[_address].fullname, property[_address].country, property[_address].addressplace, property[_address].symbol);
    }

    function countIP() view public returns (uint) {
        return intelProperty.length;
    }
}