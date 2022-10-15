// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract IpItem is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
//0x832fb0de2c2698b9343f8e98b6e9e5fe1cd22451ab4ec549e50bbdfa8e44fe56
    constructor() ERC721
    ("IpItem", 
    "IpMt") {}

    function mintIpItem(address player, string memory tokenURI)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 approvedIpItemId = _tokenIds.current();
        _mint(player, approvedIpItemId);
        _setTokenURI(approvedIpItemId, tokenURI);

        return approvedIpItemId;
    }
}
