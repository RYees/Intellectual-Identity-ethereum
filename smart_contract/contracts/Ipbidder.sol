// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.1;


contract Ipbidder {
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

    function valueChange(uint256 tokenId, address bidAdd, uint256 value) public{
        bid[tokenId][bidAdd] = value;
    }

    function isBidder (address bidder) public view returns(bool isIndeed) {
        if(bidderList.length==0) return false;
        return bidderList[biddersList[bidder].clientListPointer] == bidder;
    }
    function bidderDeposit(uint256 tokenId) payable public returns(bool success) {
        //require(keccak256(abi.encodePacked(idToListedToken[tokenId].status)) == keccak256(abi.encodePacked('Accepted')), "Nft token has to be approved to make a bid.");
        require(msg.value > 0, "Your bidding value must be greater than zero, try again.");
        bid[tokenId][payable(msg.sender)] += msg.value;
        bidderList.push(msg.sender);
        uint count = bidderList.length-1;
        bids[tokenId] = Bidders(msg.value,0,count);
        biddersList[msg.sender].clientListPointer = bidderList.length-1;
        emit LogReceivedFunds(msg.sender, msg.value);
        return true;
    }

    function refundDeposit(uint amountToWithdraw,uint256 tokenId) public payable returns(bool success) {
        // if not a bidder, then throw;
        //if(!isBidder(msg.sender)) revert();
        require(bid[tokenId][msg.sender] != 0, "You didn't bid on this item");
        require(bid[tokenId][msg.sender] >= amountToWithdraw, "Amount is greater than what you have or you already withdrawn all of your deposit");

        uint256 value = bid[tokenId][msg.sender];
        emit LogReturnedFunds(msg.sender, amountToWithdraw);
        if (amountToWithdraw <= value) {
            payable(msg.sender).transfer(amountToWithdraw);
            bid[tokenId][msg.sender] = bid[tokenId][msg.sender] - amountToWithdraw;
        }
        return true;
    }
   
}