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
       //ERC721("MyNFT", "NFT") 
        ipCount = 0;
        setIP(0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2, "egg1", "stol1", "eth1", "leb", "sym");
        setIP(0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db, "egg2", "stol2", "eth2", "leb", "sym"); 
        setIP(0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB, "egg3", "stol3", "eth3", "leb", "sym");

        // states[Status.Pending] = "ForSale";
        // states[Status.Accepted] = "SellerDelisted";
        // states[Status.Rejected] = "BuyerCancelled";
    }

    address[] public acceptedIps;
    address[] public pendingIps;
    address[] public rejectedIps;
        
    address[] public bidProperty;
  
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    
    // function addIp(address _address, string memory _IPname, string memory _fullname, string memory _country, string memory _addressplace, string memory _symbol,Status a) public {
    //     property[ipCount] = IParameter(
    //          ipCount,
    //         _address,
    //         _IPname,
    //         _fullname, 
    //         _country, 
    //         _addressplace, 
    //         _symbol,
    //         block.timestamp,
    //         true,
    //         a);
    //     ipCount++;
    // }

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
        // property[ipCount].status.push(a);
        // property[ipCount] = IParameter(
        //     //  ipCount,
        //      _address,
        //      _IPname,
        //      _fullname,
        //      _country,
        //      _addressplace,
        //      _symbol,
        //      block.timestamp,
        //      true
        // );
        ipCount++;
        
       // intelProperty.push(_address);
    }

    // function get(uint _memberId) public view returns(IParameter memory) {
    //     return property[_memberId];
    // }

    function getMember() public view returns ( address[] memory, string[] memory, string[] memory, string[] memory, string[] memory, string[] memory, uint256[] memory, Status[] memory){    
        //uint[] memory id = new uint[](ipCount);
        address[] memory user = new address[](ipCount);
        string[] memory IPname = new string[](ipCount);
        string[] memory fullname = new string[](ipCount);
        string[] memory country = new string[](ipCount);
        string[] memory addressplace = new string[](ipCount);
        string[] memory symbol = new string[](ipCount);
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
            symbol[i] = parameter.symbol;
            timestamp[i] = parameter.timestamp;
            status[i] = parameter.status[num];
        }
        return (user, IPname, fullname, country, addressplace, symbol, timestamp, status);
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
            acceptedIps.push(property[i].user);
            console.log("Address added");
            string memory value1 = indexOfPending(property[i].user);
            string memory value2 = indexOfRejected(property[i].user);
                      
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
            pendingIps.push(property[i].user);
            string memory value1 = indexOfAccepted(property[i].user);
            string memory value2 = indexOfRejected(property[i].user);
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
            rejectedIps.push(property[i].user);
            string memory value1 = indexOfAccepted(property[i].user);
            string memory value2 = indexOfPending(property[i].user);
                    
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
    
        function indexOfAccepted(address searchFor) private view returns (string memory) {
    for (uint i = 0; i < acceptedIps.length; i++) {
        if (keccak256(abi.encodePacked(acceptedIps[i])) == keccak256(abi.encodePacked(searchFor))) {
            string memory v = conv.uintToStr(i);
            return v;
        }
    }  
        return 'not found';
        }

    function indexOfPending(address searchFor) private view returns (string memory) {
    for (uint i = 0; i < pendingIps.length; i++) {
        if (keccak256(abi.encodePacked(pendingIps[i])) == keccak256(abi.encodePacked(searchFor))) {
            string memory v = conv.uintToStr(i);
            return v;
        }
    }   
        return 'not found'; // not found
    }

    function indexOfRejected(address searchFor) private view returns (string memory) {
    for (uint256 i = 0; i < rejectedIps.length; i++) {
        if (keccak256(abi.encodePacked(rejectedIps[i])) == keccak256(abi.encodePacked(searchFor))) {
            string memory v = conv.uintToStr(i);
            return v;
        }
    }  
     // console.log("not found");
       return 'not found'; // not found
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

    function mintnft(address player, string memory tokenURI) public returns (uint256){
        return nft.mintIpItem(player, tokenURI);
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

    // function block_call() public view returns (uint256){
    //     return block.number; 
    // }

    // function Time() public view returns (uint256){
    //     return block.timestamp; 
    // }




    // // ********* Bidding functions ********** // //

    function setIPbidder(address _address, string memory _ownerIPname, uint _bidvalue, address _bidderaddress) public{
         return bidder.setIPbidder(_address, _ownerIPname, _bidvalue, _bidderaddress);
    }

}

