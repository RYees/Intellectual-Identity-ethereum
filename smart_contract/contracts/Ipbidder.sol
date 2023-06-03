// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.1;


contract Ipbidder {
    uint public bidCount;
    struct IPownerBidders {
        uint256 tokenID;
        address owneraddress;
        string ownerIPname;
        uint bidValue;
        address bidderAddress;
    }
    mapping(uint256 => IPownerBidders) public ipbidders;

    struct Bidders {
        uint received;
        uint returned;
        uint clientListPointer;
    }
    mapping(address => Bidders) public biddersList;
    mapping(uint256 => Bidders) public bids;
    mapping(uint256 => mapping(address => uint256)) public bid;
    address[] public bidderList;

    
    event LogReceivedFunds(address sender, uint amount);
    event LogReturnedFunds(address recipient, uint amount);
    
    constructor(){
        bidCount = 1;
    }

    function valueChange(uint256 tokenId, address bidAdd, uint256 value) public{
        bid[tokenId][bidAdd] = value;
    }

    function isBidder (address bidder) public view returns(bool isIndeed) {
        if(bidderList.length==0) return false;
        return bidderList[biddersList[bidder].clientListPointer] == bidder;
    }
    function bidderDeposit(uint256 tokenId, address _owneraddress, string memory _ownerIPname) payable public returns(bool success) {
        //require(keccak256(abi.encodePacked(idToListedToken[tokenId].status)) == keccak256(abi.encodePacked('Accepted')), "Nft token has to be approved to make a bid.");
        require(msg.value > 0, "Your bidding value must be greater than zero, try again.");
              
        bid[tokenId][payable(msg.sender)] += msg.value;
        ipbidders[tokenId] = IPownerBidders(                                                
                                                tokenId,
                                                _owneraddress,
                                                _ownerIPname,  
                                                bid[tokenId][payable(msg.sender)], 
                                                msg.sender
                                            );
        bidCount++;
        bidderList.push(msg.sender);
        uint count = bidderList.length-1;
        bids[tokenId] = Bidders(msg.value,0,count);
        biddersList[msg.sender].clientListPointer = bidderList.length-1;
        emit LogReceivedFunds(msg.sender, msg.value);
        return true;
    }

    function refundDeposit(uint amountToWithdraw, uint256 tokenId) public payable returns(bool success) {
        // if not a bidder, then throw;
        if(!isBidder(msg.sender)) revert();
        require(bid[tokenId][msg.sender] != 0, "You didn't bid on this item");
        require(bid[tokenId][msg.sender] >= amountToWithdraw, "Amount is greater than what you have or you already withdrawn all of your deposit");

        uint256 value = bid[tokenId][msg.sender];
        emit LogReturnedFunds(msg.sender, amountToWithdraw);
        if (amountToWithdraw <= value) {
            payable(msg.sender).transfer(amountToWithdraw);
            bid[tokenId][msg.sender] = bid[tokenId][msg.sender] - amountToWithdraw;
            ipbidders[tokenId].bidValue = bid[tokenId][msg.sender];
        }
        return true;
    }
    function getMyBidders() public view returns (IPownerBidders[] memory) {
        uint itemCount = 0;
        uint currentIndex = 0;
        uint currentId;
        //Important to get a count of all the NFTs that belong to the user before we can make an array for them
        for(uint i=0; i < bidCount; i++)
        {
            if(ipbidders[i+1].owneraddress == msg.sender){
                itemCount += 1;
            }
        }

        //Once you have the count of relevant NFTs, create an array then store all the NFTs in it
        IPownerBidders[] memory items = new IPownerBidders[](itemCount);
        for(uint i=0; i < bidCount; i++) {
            if(ipbidders[i+1].owneraddress == msg.sender) {
                currentId = i+1;
                IPownerBidders storage currentItem = ipbidders[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
   
}