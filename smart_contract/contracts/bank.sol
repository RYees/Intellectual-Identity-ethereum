// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.1;

contract Bank{       

    address public owner;
    uint public receivedWei;
    uint public returnedWei;

    // simple storage pattern descibed here: https://ethereum.stackexchange.com/questions/13167/are-there-well-solved-and-simple-storage-patterns-for-solidity

    struct Client {
        uint received;
        uint returned;
        uint clientListPointer;
    }

    mapping(address => Client) public clientStructs;
    address[] public clientList;

    event LogReceivedFunds(address sender, uint amount);
    event LogReturnedFunds(address recipient, uint amount);

    constructor() {
        owner = msg.sender;
    }

    function getClientCount()
        public 
        constant
        returns(uint clientCount)
    {
        return clientList.length;
    }

    function isClient(address client)
        public
        constant
        returns(bool isIndeed)
    {
        if(clientList.length==0) return false;
        return clientList[clientStructs[client].clientListPointer]==client;
    }

    function pay() payable 
        public
        returns(bool success)
    {
        // push new client, update existing
        if(!isClient(msg.sender)) {
            clientStructs[msg.sender].clientListPointer = clientList.push(msg.sender)-1;
        }
        // track cumulative receipts per client
        clientStructs[msg.sender].received += msg.value;
        receivedWei += msg.value;
        emit LogReceivedFunds(msg.sender, msg.value);
        return true;
    }

    function payMeBack(uint amountToWithdraw) 
        public
        returns(bool success)
    {
        // if not a client, then throw;
        if(!isClient(msg.sender)) revert();

        // owed = moneyReceived - moneyAlreadyReturned;
        uint netOwed = clientStructs[msg.sender].received - clientStructs[msg.sender].returned;

        // cannot ask for more than is owed
        if(amountToWithdraw > netOwed) revert();

        // safe-send pattern

        // keep track of money returned
        // to this client (user)
        clientStructs[msg.sender].returned += amountToWithdraw;

        // and overall (contract)
        returnedWei += amountToWithdraw;
        emit LogReturnedFunds(msg.sender, amountToWithdraw);
        if(!msg.sender.send(amountToWithdraw)) revert();
        return true;
    }
}