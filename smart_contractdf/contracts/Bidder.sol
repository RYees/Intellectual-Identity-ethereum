//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.1;


contract IPbidder {
    //bidder[] bids;
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
    
    // struct bidder{
    //     mapping(address => mapping(uint => IPowner[])) ipowner;
    // }
    mapping(address => IPowner[]) public ipowner;
    //mapping(address => IPowner[]) ipowner;
    
    function setIPbidder1(address _address, string memory _ownerIPname, uint _bidvalue, address _bidderaddress) public {         
        //bidder storage r = bids.push();
        //r.ipowner[_address][bidCount].push(IPowner(_ownerIPname, _bidvalue, _bidderaddress));      
        ipowner[_address].push(IPowner(_ownerIPname, _bidvalue, _bidderaddress));
        bidCount++;
    }
    
    //mapping(address => IPowner[]) ipowner;
    //address[] public ys;
    mapping(address => mapping(string => mapping(uint => IPowner))) public ips;

   
    function setIPbidder2(address _address, uint _id, string memory _ownerIPname, uint _bidvalue, address _bidderaddress) public {         
    //     // bidder storage r = bids.push();
    //   ipowner[_address].push(IPowner(_ownerIPname, _bidvalue, _bidderaddress));      
         ips[_address][_ownerIPname][_id] = IPowner(_ownerIPname, _bidvalue, _bidderaddress);
    //     employeeAccts.push(_address);
    }
    
    function getbidderinfo(address _address) public view returns(IPowner[] memory){
        return ipowner[_address];
    }

    function countBids() view public returns (uint) {
        //return bids.length;
    }

    // function bidLoop(address _address) public view returns (IPowner[] memory) {
    //      IPowner[] memory ipss = new IPowner[](bidCount);
    //     for (uint i = 0; i < bidCount; i++) {             
    //         // bidder storage parameter = bids[i];
    //         //IPowner storage lBid = parameter.ipowner[_address];
    //         IPowner storage ips = ipowner[i];
    //         ipss[i] = ips.ipowner[_address];
             
    //          //jarnam[i] = parameter.jarname;  
    //         //   Cookie storage lBid = parameter.cookies[_address];
    //         //   cook[_address] = lBid;  
    //         // ips = parameter.ipowner[_address];        
    //     }
    //     return(ips);
    //  }

}
