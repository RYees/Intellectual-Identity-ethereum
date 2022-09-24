//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract convert {

    function st2num(string memory numString) public pure returns(uint) {
          uint  val=0;
          bytes   memory stringBytes = bytes(numString);
          for (uint  i =  0; i<stringBytes.length; i++) {
              uint exp = stringBytes.length - i;
              bytes1 ival = stringBytes[i];
              uint8 uval = uint8(ival);
            uint jval = uval - uint(0x30);
    
            val +=  (uint(jval) * (10**(exp-1))); 
          }
          return val;
    }

    function uintToStr(uint _i) public pure returns (string memory _stringValue) {
       string memory res = Strings.toString(_i);
       return res;
    }

    function addressExistAccept(uint searchFor, uint[] memory acceptedIps) public pure returns (bool) {
    for (uint i = 0; i < acceptedIps.length; i++) {
        if (keccak256(abi.encodePacked(acceptedIps[i])) == keccak256(abi.encodePacked(searchFor))) {
              return true;
         }
    }  
        return false;
    }

    function addressExistPend(uint searchFor, uint[] memory pendingIps) public pure returns (bool) {
    for (uint i = 0; i < pendingIps.length; i++) {
        if (keccak256(abi.encodePacked(pendingIps[i])) == keccak256(abi.encodePacked(searchFor))) {
            return true;
        }
    }   
        return false; // not found
    }

    function addressExistReject(uint searchFor, uint[] memory rejectedIps) public pure returns (bool) {
    for (uint256 i = 0; i < rejectedIps.length; i++) {
        if (keccak256(abi.encodePacked(rejectedIps[i])) == keccak256(abi.encodePacked(searchFor))) {
            return true;
        }
    } 
        return false;
    }
       
    function indexOfAccepted(uint searchFor, uint[] memory acceptedIps) public pure returns (string memory) {
    for (uint i = 0; i < acceptedIps.length; i++) {
        if (keccak256(abi.encodePacked(acceptedIps[i])) == keccak256(abi.encodePacked(searchFor))) {
            string memory v = uintToStr(i);
            return v;
         }
    }  
        return 'not found';
    }
  
    function indexOfPending(uint searchFor, uint[] memory pendingIps) public pure returns (string memory) {
    for (uint i = 0; i < pendingIps.length; i++) {
        if (keccak256(abi.encodePacked(pendingIps[i])) == keccak256(abi.encodePacked(searchFor))) {
            string memory v = uintToStr(i);
            return v;
        }
    }   
        return 'not found'; // not found
    }

    function indexOfRejected(uint searchFor, uint[] memory rejectedIps) public pure returns (string memory) {
    for (uint256 i = 0; i < rejectedIps.length; i++) {
        if (keccak256(abi.encodePacked(rejectedIps[i])) == keccak256(abi.encodePacked(searchFor))) {
            string memory v = uintToStr(i);
            return v;
        }
    }  
        return 'not found'; // not found
    }
}