// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract IP {
    address public owner;

    struct Count{
       uint count;
    }
    
    mapping (uint => Count) newcount;
    
    enum Status {
        Pending,
        Accepted,
        Rejected
    }

    struct IParameter {
       // uint id;
        address user;
        string IPname;
        string fullname;
        string country;
        string addressplace;    
        string symbol;   
        uint256 timestamp;        
        Status[] status; 
        bool isRegistered;
    }

    uint public ipCount;  

    struct bid {
        address bidder;
        uint256 value;
        mapping (address => IParameter) ipara;
    }

    mapping (uint => IParameter) public property;
    
    mapping (uint => bid) bidip;
    //mapping(address => mapping (address => bid)) public allowance;
    
 
    constructor() {
        owner = msg.sender;
        ipCount = 0;
     
   }

    address[] public intelProperty;
        
    address[] public bidProperty;
  
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    
     function setIP(address _address, string memory _IPname, string memory _fullname, string memory _country, string memory _addressplace, string memory _symbol) public {
        Status a = Status.Pending;
        property[ipCount].user = _address;
        property[ipCount].IPname = _IPname;
        property[ipCount].fullname = _fullname;
        property[ipCount].country = _country;
        property[ipCount].addressplace = _addressplace;
        property[ipCount].symbol = _symbol;
        property[ipCount].timestamp = block.timestamp;
        property[ipCount].status.push(a);
        newcount[ipCount].count = 0;
        property[ipCount].isRegistered = true;
 
        ipCount++;     
    }

    function getMember() public view returns ( string[] memory, string[] memory, string[] memory, string[] memory, string[] memory, Status[] memory){    
        //uint[] memory id = new uint[](ipCount);
        //address[] memory user = new address[](ipCount);
        string[] memory IPname = new string[](ipCount);
        string[] memory fullname = new string[](ipCount);
        string[] memory country = new string[](ipCount);
        string[] memory addressplace = new string[](ipCount);
        string[] memory symbol = new string[](ipCount);
        //uint256[] memory timestamp = new uint256[](ipCount);
        Status[] memory status = new Status[](ipCount);
         
        for (uint i = 0; i < ipCount; i++) {
            uint num = newcount[i].count;
            IParameter storage parameter = property[i];
            //id[i] = parameter.id;
           // user[i] = parameter.user;
            IPname[i] = parameter.IPname;
            fullname[i] = parameter.fullname;
            country[i] = parameter.country;
            addressplace[i] = parameter.addressplace;
            symbol[i] = parameter.symbol;
            //timestamp[i] = parameter.timestamp;
            status[i] = parameter.status[num];
        }
        return (IPname, fullname, country, addressplace, symbol, status);
    }
   
    function changeStatus(uint i, Status val) public onlyOwner returns(bool) {
        property[i].status.push(val);
        newcount[i].count++; 
        return true;
    }
    
    function getStatus(uint i) public view returns(Status status) {
        //console.log(property[_address].status[newcount[_address].count]);
        return property[i].status[newcount[i].count];
    }
    
    function getAllIP() view public returns (address[] memory) {
        return intelProperty;
    }

    function getIP(uint i) public view returns (string memory, string memory, string memory, string memory, string memory, uint256, Status status) {
        uint num = newcount[i].count;
        IParameter memory u = property[i];
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

    function getAllbids() view public returns (address[] memory) {
        return bidProperty;
    }

}

contract IPbidder {
    bidder[] bids;
    uint public bidCount;
    struct IPowner {
        //address IPowneradddress;
        string ownerIPname;
        uint bidValue;
        address bidderAddress;
    }
    
    constructor(){
        bidCount = 0;
    }
    struct bidder{
        mapping(address => IPowner[]) ipowner;
    }
    //mapping(address => IPowner[]) ipowner;
    
    function setIPbidder(address _address, string memory _ownerIPname, uint _bidvalue, address _bidderaddress) public {         
        bidder storage r = bids.push();
        r.ipowner[_address].push(IPowner(_ownerIPname, _bidvalue, _bidderaddress));      
        bidCount++;
    }
    
    //mapping(address => IPowner[]) ipowner;
    //address[] public ys;
    mapping(address => mapping(string => mapping(uint => IPowner))) public ips;

   
     function setIPbidder(address _address, uint _id, string memory _ownerIPname, uint _bidvalue, address _bidderaddress) public {         
    //     // bidder storage r = bids.push();
    //   ipowner[_address].push(IPowner(_ownerIPname, _bidvalue, _bidderaddress));      
         ips[_address][_ownerIPname][_id] = IPowner(_ownerIPname, _bidvalue, _bidderaddress);
    //     employeeAccts.push(_address);
    }
    

    function getbidderinfo(address _address, uint i) public view returns(IPowner[] memory){
        return (bids[i].ipowner[_address]);
    }

    function countJars() view public returns (uint) {
        return bids.length;
    }

    function bidLoop(address _address) public view returns (IPowner[] memory) {
         IPowner[] memory ipss = new IPowner[](bidCount);
        for (uint i = 0; i < bidCount; i++) {             
             bidder storage parameter = bids[i];
            // IPowner storage lBid = parameter.ipowner[_address];
             ipss = parameter.ipowner[_address];
             
             //jarnam[i] = parameter.jarname;  
            //   Cookie storage lBid = parameter.cookies[_address];
            //   cook[_address] = lBid;  
            // ips = parameter.ipowner[_address];        
        }
        return(ipss);
     }

}
