//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {convert} from "./Convert.sol";

interface Ipbidder {
   function bid(uint256 val, address bidderAdd) external view returns(uint);
   function isBidder(address bidderAdd) external view returns(bool);
   function valueChange(uint256 tokenId, address bidAdd, uint256 value) external;
   function bidderDeposit(uint256 tokenId) payable external returns(bool); 
}

contract ContractIp is ERC721URIStorage {
    address bidcontract = 0xf24cb2fdfD344E748871d0747c67473B7D0B71F0;
    
    using Counters for Counters.Counter;
    //_tokenIds variable has the most recent minted tokenId
    Counters.Counter private _tokenIds;
    //Keeps track of the number of items sold on the marketplace
    Counters.Counter private _itemsSold;
    //owner is the contract address that created the smart contract
    address payable owner;
    //The fee charged by the marketplace to be allowed to list an NFT
    uint256 public commissionPrice = 0.005 ether;

    convert conv = new convert();

    //The structure to store info about a listed token
    struct RequestedNfts {
        uint256 tokenId;
       // address payable owner;
        address payable Nftowner;
        uint256 timestamp;        
        string status; 
        bool isRegistered;
    }

    //the event emitted when a token is successfully listed
    event TokenAcceptedNft (
        uint256 indexed tokenId,
       // address owner,
        address Nftowner,
        uint256 timestamp,       
        string status,
        bool isRegistered
    );

    uint[] public acceptedIps;
    uint[] public pendingIps;
    uint[] public rejectedIps;
    string public result;
    //This mapping maps tokenId to token info and is helpful when retrieving details about a tokenId
    mapping(uint256 => RequestedNfts) public idToListedToken;    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    uint public receivedWei;
    uint public returnedWei;

    constructor() ERC721("NFTMarketplace", "NFTM") { 
        owner = payable(msg.sender);
    }
    
    // setup royality fee that is going to be paid to artist the creator
    function updateCommissionFee(uint256 _cp) external payable onlyOwner  {
        commissionPrice = _cp; // 15 basis points = 0.15 percent
        
    }

    //The first time a token is created, it is listed here
    function createToken(string memory tokenURI) public payable returns (uint) {
        //Increment the tokenId counter, which is keeping track of the number of minted NFTs
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        //Mint the NFT with tokenId newTokenId to the address who called createToken
        _safeMint(msg.sender, newTokenId);

        //Map the tokenId to the tokenURI (which is an IPFS URL with the NFT metadata)
        _setTokenURI(newTokenId, tokenURI);
        
        string memory currentstatus = "Pending" ;
        //Helper function to update Global variables and emit an event
        //createListedToken(newTokenId, currentstatus);
          idToListedToken[newTokenId] = RequestedNfts(
            newTokenId,
         //   payable(address(this)),
            payable(msg.sender),
            block.timestamp,
            currentstatus,
            true
        );
         pendingIps.push(newTokenId);  

        //Emit the event for successful transfer. The frontend parses this message and updates the end user
        emit TokenAcceptedNft( newTokenId, msg.sender, block.timestamp, currentstatus, true);
 
        return newTokenId;
    }

    // Admin function
    function changeStatus(uint tokenId, string memory status) public onlyOwner returns(bool) {
        idToListedToken[tokenId].status = status;
        // newcount[i].count++; 
        conditionStatus(tokenId);
        return true;
    }

    function conditionStatus(uint tokenId) private {
        // uint num = newcount[i].count;
        string memory statustext = idToListedToken[tokenId].status;
        if(keccak256(abi.encodePacked(statustext)) == keccak256(abi.encodePacked('Accepted'))){
            bool val = conv.addressExistAccept(tokenId, acceptedIps);
            require((keccak256(abi.encodePacked(val)) != keccak256(abi.encodePacked(true))), 'Address already accepted');
            acceptedIps.push(tokenId);
            uint256 value1 = conv.indexOfPending(tokenId, pendingIps);
            uint256 value2 = conv.indexOfAccepted(tokenId, rejectedIps);                     
           if(value1 != tokenId && value2 != tokenId){         
                removePending(value1);  
                removeRejected(value2);
           } 
           if (value1 != tokenId){
              removePending(value1);  
            }
           else if(value2 != tokenId){
              removeRejected(value2);
            }
            else {
              result = 'not found';
           }
        } 
        else if(keccak256(abi.encodePacked(statustext)) == keccak256(abi.encodePacked('Pending'))){
            bool val = conv.addressExistPend(tokenId, pendingIps);
            require((keccak256(abi.encodePacked(val)) != keccak256(abi.encodePacked(true))), 'Address already pending');
            pendingIps.push(tokenId);
            uint256 value1 = conv.indexOfAccepted(tokenId, acceptedIps);
            uint256 value2 = conv.indexOfRejected(tokenId, rejectedIps);
            if(value1 != tokenId && value2 != tokenId){
                removeAccepted(value1); 
                removeRejected(value2);
            }
            else if(value1 != tokenId){
                removeAccepted(value1); 
            }
            else if(value2 != tokenId){
                removeRejected(value2);       
            }
                else {
                result = 'not found';
            }
           } else if(keccak256(abi.encodePacked(statustext)) == keccak256(abi.encodePacked('Rejected'))){
            bool val = conv.addressExistReject(tokenId, rejectedIps);
            require((keccak256(abi.encodePacked(val)) != keccak256(abi.encodePacked(true))), 'Address already rejected');
            rejectedIps.push(tokenId);
            uint256 value1 = conv.indexOfAccepted(tokenId, acceptedIps);
            uint256 value2 = conv.indexOfPending(tokenId, pendingIps);
                    
            if(value1 != tokenId && value2 != tokenId){
                removeAccepted(value1);            
                removePending(value2);
            }
            else if(value1 != tokenId){
                removeAccepted(value1); 
            }
            else if(value2 != tokenId){
                removePending(value2);      
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
    
    function countAcceptedIPs() view public returns (uint) { return acceptedIps.length;  }

    function countPendingIPs() view public returns (uint) { return pendingIps.length; }

    function countRejectedIPs() view public returns (uint) { return rejectedIps.length; }

    //This will return all the NFTs currently listed to be sold on the marketplace
    function getAllNFTs() public view returns (RequestedNfts[] memory) {
        uint nftCount = _tokenIds.current();
        RequestedNfts[] memory tokens = new RequestedNfts[](nftCount);
        uint currentIndex = 0;
        uint currentId;
        //at the moment currentlyListed is true for all, if it becomes false in the future we will 
        //filter out currentlyListed == false over here
        for(uint i=0;i<nftCount;i++)
        {
            currentId = i + 1;
            RequestedNfts storage currentItem = idToListedToken[currentId];
            tokens[currentIndex] = currentItem;
            currentIndex += 1;
        }
        //the array 'tokens' has the list of all NFTs in the marketplace
        return tokens;
    }

    function getMyNFTs() public view returns (RequestedNfts[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        uint currentId;
        //Important to get a count of all the NFTs that belong to the user before we can make an array for them
        for(uint i=0; i < totalItemCount; i++)
        {
            if(idToListedToken[i+1].Nftowner == msg.sender){
                itemCount += 1;
            }
        }

        //Once you have the count of relevant NFTs, create an array then store all the NFTs in it
        RequestedNfts[] memory items = new RequestedNfts[](itemCount);
        for(uint i=0; i < totalItemCount; i++) {
            if(idToListedToken[i+1].Nftowner == msg.sender) {
                currentId = i+1;
                RequestedNfts storage currentItem = idToListedToken[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function bidVal(uint256 tokenId, address bidderAddress) public view returns(uint) {
        return Ipbidder(bidcontract).bid(tokenId,bidderAddress); 
    }

    function check(address bidderAddress) public view returns(bool){
        return Ipbidder(bidcontract).isBidder(bidderAddress);
    }

    function executeSale(uint256 tokenId, address bidderAddress) public payable{
            uint256 bidValue = Ipbidder(bidcontract).bid(tokenId,bidderAddress); 
            console.log("nobody is threatning me");
            require(msg.sender == ownerOf(tokenId), "You are not the owner of the IP nft");
            require(msg.value == bidValue, "Please submit the asking price in order to complete the purchase");
            require(check(bidderAddress), "This address did not bid on this IP");
            require(ownerOf(tokenId) == msg.sender, "Your are not the owner of this token NFT");
            require(owner.balance > 0, "Not enough funds" );
           
            address seller = idToListedToken[tokenId].Nftowner;            
            idToListedToken[tokenId].isRegistered = true;
            idToListedToken[tokenId].Nftowner = payable(msg.sender);
            _itemsSold.increment();
          
            _transfer(msg.sender, bidderAddress, tokenId);           
            //uint256 comPrice = bidValue * commissionPrice;
            uint256 bidPrice = bidValue - commissionPrice;
            bidValue = commissionPrice;
            payable(owner).transfer(bidValue);
            payable(seller).transfer(bidPrice);
            Ipbidder(bidcontract).valueChange(tokenId, bidderAddress, 0);
       
        }
}