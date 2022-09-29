//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.1;
import "hardhat/console.sol";
import "./IP_Nfts.sol";
import "./Bidder.sol";
import {convert} from "./Convert.sol";

contract IP {

    IpItem nft = new IpItem();
    IPbidder bidder = new IPbidder();
    convert conv = new convert();

    address public owner;
    string public result;

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
        string allIpInfoURL;   
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
        bidCount = 0;
    }

    uint[] public acceptedIps;
    uint[] public pendingIps;
    uint[] public rejectedIps;
        
    address[] public bidProperty;
  
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    
    function setIP(address _address, string memory _IPname, string memory _fullname, string memory _country, string memory _addressplace, string memory _allIpInfoURL) public {
        Status a = Status.Pending;
        property[ipCount].user = _address;
        property[ipCount].IPname = _IPname;
        property[ipCount].fullname = _fullname;
        property[ipCount].country = _country;
        property[ipCount].addressplace = _addressplace;
        property[ipCount].allIpInfoURL = _allIpInfoURL;
        property[ipCount].timestamp = block.timestamp;
        property[ipCount].status.push(a);
        newcount[ipCount].count = 0;
        property[ipCount].isRegistered = true;

        pendingIps.push(ipCount);    
        ipCount++;
    }

    // function get(uint _memberId) public view returns(IParameter memory) {
    //     return pendingIps[_memberId];
    // }

    function getMember() public view returns ( address[] memory, string[] memory, string[] memory, string[] memory, string[] memory, string[] memory, uint256[] memory, Status[] memory){    
        //uint[] memory id = new uint[](ipCount);
        address[] memory user = new address[](ipCount);
        string[] memory IPname = new string[](ipCount);
        string[] memory fullname = new string[](ipCount);
        string[] memory country = new string[](ipCount);
        string[] memory addressplace = new string[](ipCount);
        string[] memory allIpInfoURL = new string[](ipCount);
        uint256[] memory timestamp = new uint256[](ipCount);
        Status[] memory status = new Status[](ipCount);
         
        for (uint i = 0; i < ipCount; i++) {
            uint num = newcount[i].count;
            IParameter storage parameter = property[i];
            //id[i] = parameter.id;
            user[i] = parameter.user;
            IPname[i] = parameter.IPname;
            fullname[i] = parameter.fullname;
            country[i] = parameter.country;
            addressplace[i] = parameter.addressplace;
            allIpInfoURL[i] = parameter.allIpInfoURL;
            timestamp[i] = parameter.timestamp;
            status[i] = parameter.status[num];
        }
        return (user, IPname, fullname, country, addressplace, allIpInfoURL, timestamp, status);
    }
   
    function changeStatus(uint i, Status val) public onlyOwner returns(bool) {
        property[i].status.push(val);
        //console.log(property[i].status[num]);
        newcount[i].count++; 
        conditionStatus(i);
        return true;
    }
     
     function conditionStatus(uint i) public {
        uint num = newcount[i].count;
        if(property[i].status[num] == Status.Accepted){
            bool val = conv.addressExistAccept(i, acceptedIps);
            require((keccak256(abi.encodePacked(val)) != keccak256(abi.encodePacked(true))), 'Address already accepted');
            acceptedIps.push(i);
            // console.log("Address added");
            string memory value1 = conv.indexOfPending(i, pendingIps);
            string memory value2 = conv.indexOfRejected(i, rejectedIps);
                      
           if(keccak256(abi.encodePacked(value1)) != keccak256(abi.encodePacked('not found')) 
           && keccak256(abi.encodePacked(value2)) != keccak256(abi.encodePacked('not found'))){
              uint v1 = conv.st2num(value1);
              uint v2 = conv.st2num(value2);
                removePending(v1);  
                removeRejected(v2);
           }
           else if(keccak256(abi.encodePacked(value1)) != keccak256(abi.encodePacked('not found'))){
              uint v1 = conv.st2num(value1);
              removePending(v1);  
            }
           else if(keccak256(abi.encodePacked(value2)) != keccak256(abi.encodePacked('not found'))){
              uint v2 = conv.st2num(value2);
              removeRejected(v2);
            }
            else {
               console.log('not found');
               result = 'not found';
           }
            
            //removeRejected(value2);
        } 
        else if(property[i].status[num] == Status.Pending){
            bool val = conv.addressExistPend(i, pendingIps);
            require((keccak256(abi.encodePacked(val)) != keccak256(abi.encodePacked(true))), 'Address already pending');
            pendingIps.push(i);
            string memory value1 = conv.indexOfAccepted(i, acceptedIps);
            string memory value2 = conv.indexOfRejected(i, rejectedIps);
            if(keccak256(abi.encodePacked(value1)) != keccak256(abi.encodePacked('not found')) 
           && keccak256(abi.encodePacked(value2)) != keccak256(abi.encodePacked('not found'))){
              uint v1 = conv.st2num(value1);
              uint v2 = conv.st2num(value2);
                removeAccepted(v1); 
                removeRejected(v2);
           }
           else if(keccak256(abi.encodePacked(value1)) != keccak256(abi.encodePacked('not found'))){
              uint v1 = conv.st2num(value1);
              removeAccepted(v1); 
              console.log('momo1');
              result = 'one'; 
           }
           else if(keccak256(abi.encodePacked(value2)) != keccak256(abi.encodePacked('not found'))){
              uint v2 = conv.st2num(value2);
              removeRejected(v2);       
           }
            else {
               console.log('not found');
               result = 'not found';
           }
           } else if(property[i].status[num] == Status.Rejected){
            bool val = conv.addressExistReject(i, rejectedIps);
            require((keccak256(abi.encodePacked(val)) != keccak256(abi.encodePacked(true))), 'Address already rejected');
            rejectedIps.push(i);
            string memory value1 = conv.indexOfAccepted(i, acceptedIps);
            string memory value2 = conv.indexOfPending(i, pendingIps);
                    
            if(keccak256(abi.encodePacked(value1)) != keccak256(abi.encodePacked('not found')) 
            && keccak256(abi.encodePacked(value2)) != keccak256(abi.encodePacked('not found'))){
              uint v1 = conv.st2num(value1);
              uint v2 = conv.st2num(value2);
                removeAccepted(v1);            
                removePending(v2);
           }
           else if(keccak256(abi.encodePacked(value1)) != keccak256(abi.encodePacked('not found'))){
              uint v1 = conv.st2num(value1);
              removeAccepted(v1); 
           }
           else if(keccak256(abi.encodePacked(value2)) != keccak256(abi.encodePacked('not found'))){
              uint v2 = conv.st2num(value2);
              removePending(v2);      
           }
            else {
               console.log('not found');
               result = 'not found';
           }
        }   
    }    

    function removeAccepted(uint _index) public {
        require(_index < acceptedIps.length, "index out of bound");
        for (uint i = _index; i < acceptedIps.length - 1; i++){
            acceptedIps[i] = acceptedIps[i+1];
        }
        acceptedIps.pop();
    }

    function removePending(uint _index) public {
        require(_index < pendingIps.length, "index out of bound");
        for (uint i = _index; i < pendingIps.length - 1; i++){
            pendingIps[i] = pendingIps[i+1];
        }
        pendingIps.pop();
    }

    function removeRejected(uint _index) public {
        require(_index < rejectedIps.length, "index out of bound");
        for (uint i = _index; i < rejectedIps.length - 1; i++){
            rejectedIps[i] = rejectedIps[i+1];
        }
        rejectedIps.pop();
    }
    
    function getStatus(uint i) public view returns(Status status) {
        return property[i].status[newcount[i].count];
    }
    
    function getAcceptIP() view public returns (uint[] memory) {
        console.log(acceptedIps.length);
        return acceptedIps;
    }

    function getPendingIP() view public returns (uint[] memory) {
        console.log(pendingIps.length);
        return pendingIps;
    }

    function getRejectIP() view public returns (uint[] memory) {
        console.log(rejectedIps.length);
        return rejectedIps;
    }

    function getIP(uint i) public view returns (string memory, string memory, string memory, string memory, string memory, uint256, Status status) {
        uint num = newcount[i].count;
        IParameter memory u = property[i];
        return (
            u.IPname, 
            u.fullname,
            u.country,
            u.addressplace, 
            u.allIpInfoURL,
            u.timestamp, 
            u.status[num]
            );
    }

    function countAcceptedIPs() view public returns (uint) {
        return acceptedIps.length;
    }

    function countPendingIPs() view public returns (uint) {
        return pendingIps.length;
    }

    function countRejectedIPs() view public returns (uint) {
        return rejectedIps.length;
    }



    // // ********* Nft functions ********** // //

    function mintnft(uint index, address owneradd, string memory tokenURI) external returns(uint256) {
        bool val = conv.addressExistAccept(index, acceptedIps);
        require((keccak256(abi.encodePacked(val)) == keccak256(abi.encodePacked(true))), 'Address not accepted');
        return nft.mintIpItem(owneradd, tokenURI);
    }
    
    function nameOfnft() view public returns (string memory){
        return nft.name();
    }

    function ownerOfnft(uint256 tokenId) view public returns (address){
        return nft.ownerOf(tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public {
        return nft.safeTransferFrom(from, to, tokenId, data);
    }




    // // ********* Bidding functions ********** // //
    uint public bidCount;
    struct IPowner {
        string ownerIPname; 
        uint bidValue;
        address bidderAddress;
    }
    mapping(address => IPowner[]) public ipowner;

    function setIPbidder1(address _address, string memory _ownerIPname, uint _bidvalue, address _bidderaddress) public {             
        ipowner[_address].push(IPowner(_ownerIPname, _bidvalue, _bidderaddress));
        bidCount++;
    }
     
    function getbidderinfo(address _address) public view returns(IPowner[] memory){
        return ipowner[_address];
    }

    function countBids(address _address) view public returns (uint) {
        return ipowner[_address].length;
    }

}

