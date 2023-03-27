//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.1;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {convert} from "./Convert.sol";

contract ContractIp is ERC721URIStorage {

    using Counters for Counters.Counter;
    //_tokenIds variable has the most recent minted tokenId
    Counters.Counter private _tokenIds;
    //Keeps track of the number of items sold on the marketplace
    Counters.Counter private _itemsSold;
    //owner is the contract address that created the smart contract
    address payable owner;
    //The fee charged by the marketplace to be allowed to list an NFT
    uint256 listPrice = 1000 wei;

    convert conv = new convert();
    //The structure to store info about a listed token
    struct RequestedNfts {
        uint256 tokenId;
        address payable owner;
        address payable Nftowner;
        uint256 timestamp;        
        string status; 
        bool isRegistered;
    }

    //the event emitted when a token is successfully listed
    event TokenAcceptedNft (
        uint256 indexed tokenId,
        address owner,
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
    struct Bidders {
        uint received;
        uint returned;
        uint clientListPointer;
    }
    mapping(address => Bidders) public biddersList;
    mapping(uint256 => Bidders) public bids;
    address[] public bidderList;
    event LogReceivedFunds(address sender, uint amount);
    event LogReturnedFunds(address recipient, uint amount);
   

    constructor() ERC721("NFTMarketplace", "NFTM") { owner = payable(msg.sender);     }
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
        createListedToken(newTokenId, currentstatus);
 
        return newTokenId;
    }

    function createListedToken(uint256 tokenId, string memory status) private {
        //Make sure the sender sent enough ETH to pay for listing
       // require(msg.value == listPrice, "Hopefully sending the correct price");
        //Just sanity check
       // require(price > 0, "Make sure the price isn't negative");

        //Update the mapping of tokenId's to Token details, useful for retrieval functions
        idToListedToken[tokenId] = RequestedNfts(
            tokenId,
            payable(address(this)),
            payable(msg.sender),
            block.timestamp,
            status,
            true
        );
          pendingIps.push(tokenId);  
               
        _transfer(msg.sender, address(this), tokenId);
        //Emit the event for successful transfer. The frontend parses this message and updates the end user
        emit TokenAcceptedNft(
            tokenId,
            address(this),
            msg.sender,
            block.timestamp,
            status,
            true
        );
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
            if(idToListedToken[i+1].owner == msg.sender || idToListedToken[i+1].Nftowner == msg.sender){
                itemCount += 1;
            }
        }

        //Once you have the count of relevant NFTs, create an array then store all the NFTs in it
        RequestedNfts[] memory items = new RequestedNfts[](itemCount);
        for(uint i=0; i < totalItemCount; i++) {
            if(idToListedToken[i+1].owner == msg.sender || idToListedToken[i+1].Nftowner == msg.sender) {
                currentId = i+1;
                RequestedNfts storage currentItem = idToListedToken[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function executeSale(uint256 tokenId, address bidderAddress) public payable {
        uint256 bidValue = biddersList[bidderAddress].received;
        //uint price = idToListedToken[tokenId].price;
        address seller = idToListedToken[tokenId].Nftowner;
        //require(msg.value == price, "Please submit the asking price in order to complete the purchase");
        idToListedToken[tokenId].isRegistered = true;
        idToListedToken[tokenId].Nftowner = payable(msg.sender);
        _itemsSold.increment();
        _transfer(address(this), msg.sender, tokenId);
        approve(address(this), tokenId);
        payable(owner).transfer(listPrice);
        payable(seller).transfer(bidValue);
    }

    function getBidderCount() public view returns(uint bidderCount) {    return bidderList.length;  }

    function isBidder (address bidder) public view returns(bool isIndeed) {
        if(bidderList.length==0) return false;
        return bidderList[biddersList[bidder].clientListPointer] == bidder;
    }
    function bidderDeposit(uint256 tokenId) payable public returns(bool success) {
        require(keccak256(abi.encodePacked(idToListedToken[tokenId].status)) == keccak256(abi.encodePacked('Accepted')), "Nft token has to be approved to make a bid.");
        // push new client, update existing
        if(!isBidder(msg.sender)) {
            bidderList.push(msg.sender);
            uint count = bidderList.length-1;
            // bids[tokenId].push(Bidders(msg.value,0,count));
            bids[tokenId] = Bidders(msg.value,0,count);
            biddersList[msg.sender].clientListPointer = bidderList.length-1;
        }
        // track cumulative receipts per client
        biddersList[msg.sender].received += msg.value;
        receivedWei += msg.value;
        emit LogReceivedFunds(msg.sender, msg.value);
        return true;
    }

    function refundDeposit(uint amountToWithdraw) public returns(bool success) {
        // if not a bidder, then throw;
        if(!isBidder(msg.sender)) revert();
        // owed = moneyReceived - moneyAlreadyReturned;
        uint netOwed = biddersList[msg.sender].received - biddersList[msg.sender].returned;
        // cannot ask for more than is owed
        if(amountToWithdraw > netOwed) revert();
        // keep track of money returned
        // to this client (user)
        biddersList[msg.sender].returned += amountToWithdraw;
        // and overall (contract)
        returnedWei += amountToWithdraw;
        emit LogReturnedFunds(msg.sender, amountToWithdraw);
        if (amountToWithdraw > netOwed) {
            //pendingReturns[msg.sender] = 0;
            payable(msg.sender).transfer(amountToWithdraw);
        }
        //if(!msg.sender.send(amountToWithdraw)) revert();
        return true;
    }
}