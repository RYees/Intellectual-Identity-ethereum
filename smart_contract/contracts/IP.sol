//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.1;
import "hardhat/console.sol";
import "./IP_Nfts.sol";
import "./Bidder.sol";
import {convert} from "./Convert.sol";

contract IP {
    IpItem nft = new IpItem();
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

    mapping (uint => IParameter) public property;
    
    constructor() {
        owner = msg.sender; 
        ipCount = 0;
        bidCount = 0;
    }

    uint[] public acceptedIps;
    uint[] public pendingIps;
    uint[] public rejectedIps;
  
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

    function AllIps() public view returns (IParameter[] memory){
        IParameter[] memory rec = new IParameter[](ipCount);
        for (uint i = 0; i < ipCount; i++) {
            rec[i] =  property[i];
        }
        return rec;
    }
     
    function changeStatus(uint i, Status val) public onlyOwner returns(bool) {
        property[i].status.push(val);
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
              result = 'not found';
           }
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
              result = 'one'; 
           }
           else if(keccak256(abi.encodePacked(value2)) != keccak256(abi.encodePacked('not found'))){
              uint v2 = conv.st2num(value2);
              removeRejected(v2);       
           }
            else {
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

    function getIP(uint i) public view returns (string memory, string memory, string memory, string memory, string memory) {
        IParameter memory u = property[i];
        return (
            u.IPname, 
            u.fullname,
            u.country,
            u.addressplace, 
            u.allIpInfoURL
        );
    }


    function getPendingIP() view public returns (uint[] memory) {
        return pendingIps;
    }

    function getAcceptIP() view public returns (uint[] memory) {
        return acceptedIps;
    }

    function getRejectIP() view public returns (uint[] memory) {
        return rejectedIps;
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
        require((keccak256(abi.encodePacked(val)) == keccak256(abi.encodePacked(true))), 'Intellectual property not accepted');
        return nft.mintIpItem(owneradd, tokenURI);
    }
    
    function nameOfnft() view public returns (string memory){
        return nft.name();
    }

    function symbolOfnft() view public returns (string memory){
        return nft.symbol();
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

