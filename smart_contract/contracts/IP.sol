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
        uint256 timestamp;
        bool isRegistered;
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

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
 
    function setIP(address _address, string memory _IPname, string memory _fullname, string memory _country, string memory _addressplace, string memory _symbol,Status a) public {
        property[_address].IPname = _IPname;
        property[_address].fullname = _fullname;
        property[_address].country = _country;
        property[_address].addressplace = _addressplace;
        property[_address].symbol = _symbol;
        property[_address].timestamp = block.timestamp;
        property[_address].status.push(a);
        newcount[_address].count = 0;
        property[_address].isRegistered = true;
        intelProperty.push(_address);
    }
   
    function changeStatus(address _address, Status val) public onlyOwner returns(bool) {
        property[_address].status.push(val);
        newcount[_address].count++; 
        return true;
    }

    function getStatus(address _address) public view returns(Status status) {
        return property[_address].status[newcount[_address].count];
    }

    function getAllIP() view public returns (address[] memory) {
        return intelProperty;
    }

    function getIP(address _address) public view returns (string memory, string memory, string memory, string memory, string memory, uint256, Status status) {
        uint num = newcount[_address].count;
        IParameter memory u = property[_address];
        return (
            u.IPname, 
            u.fullname,
            u.country,
            u.addressplace, 
            u.symbol,
            u.timestamp, 
            u.status[num]
            );
    }

    function countIP() view public returns (uint) {
        return intelProperty.length;
    }
}