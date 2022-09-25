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
        setIPbidder1(0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,"ipone",1000,0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db);
        setIPbidder1(0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,"iptwo",2000,0x617F2E2fD72FD9D5503197092aC168c91465E7f2);
        setIPbidder1(0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB,"ipthree",3000,0x17F6AD8Ef982297579C203069C1DbfFE4348c372);
        setIPbidder1(0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB,"ipfour",4000,0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678);
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
