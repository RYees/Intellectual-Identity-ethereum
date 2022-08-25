// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.1;

contract IP {
    address public owner;
    struct IParameter {
        string IPname;
        string fullname;
        string country;
        string addressplace;    
        string symbol;   
        string timestamp;
    }

    struct bid {
        address bidder;
        uint256 value;
    }
    mapping (address => IParameter) property;
    mapping (address => bid) bidip;

    constructor() payable {
        owner = payable(msg.sender);
    }

}