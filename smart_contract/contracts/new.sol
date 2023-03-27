// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract IpItem is ERC721URIStorage {
    using Counters for Counters.Counter;
    //_tokenIds variable has the most recent minted tokenId
    Counters.Counter private _tokenIds;
    //Keeps track of the number of items sold on the marketplace
    Counters.Counter private _itemsSold;
    //owner is the contract address that created the smart contract
    address payable contractowner;
    //The fee charged by the marketplace to be allowed to list an NFT
    uint256 contractFee = 0.01 ether;
    //0x832fb0de2c2698b9343f8e98b6e9e5fe1cd22451ab4ec549e50bbdfa8e44fe56
    constructor() ERC721
    ("IpItem", 
    "IpMt") {}

    //The structure to store info about a listed token
    struct ListedToken {
        uint256 tokenId;
        address payable owner;
        address payable Nftowner;
        // uint256 price;
        bool currentlyListed;
    }

    //the event emitted when a token is successfully listed
    event TokenListedSuccess (
        uint256 indexed tokenId,
        address owner,
        address seller,
        // uint256 price,
        bool currentlyListed
    );

    uint public bidCount;
    struct Bidders {
        string ownerIPname;
        uint256 tokenId;
        uint bidValue;
        address bidderAddress;
    }
    

    //This mapping maps tokenId to token info and is helpful when retrieving details about a tokenId
    mapping(uint256 => ListedToken) private idToListedToken;

    //This mapping maps tokenId to the bidders info
    mapping(uint256 => Bidders) private idToBidders;
    
    //This mapping maps Nftowners address with bidders
    mapping(address => Bidders[]) public ipowner;

    function setbidders(uint256 tokenId, address _address, string memory _ownerIPname, uint _bidvalue, address _bidderaddress) public {             
        idToBidders[tokenId].push(Bidders(_ownerIPname, _bidvalue, _bidderaddress));
        ipowner[_address].push(Bidders(_ownerIPname, _bidvalue, _bidderaddress));
        bidCount++;
    }
    //
    function getbidderbytokenid(uint256 _tokenId) public view returns(IPowner[] memory){
        return idToBidders[_tokenId];
    }

    function countBidsbytokenid(uint256 _tokenId) view public returns (uint) {
        return idToBidders[_tokenId].length;
    }
    //
    function getbidderbyaddress(address _address) public view returns(IPowner[] memory){
        return ipowner[_address];
    }

    function countBidsbyaddress(address _address) view public returns (uint) {
        return ipowner[_address].length;
    }

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

      //The first time a token is created, it is listed here
    function createToken(string memory tokenURI) public payable returns (uint) {
        //Increment the tokenId counter, which is keeping track of the number of minted NFTs
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        //Mint the NFT with tokenId newTokenId to the address who called createToken
        _safeMint(msg.sender, newTokenId);

        //Map the tokenId to the tokenURI (which is an IPFS URL with the NFT metadata)
        _setTokenURI(newTokenId, tokenURI);
        //Helper function to update Global variables and emit an event
        //createListedToken(newTokenId, price);

        return newTokenId;
    }

    function getCurrentToken() public view returns (uint256) {
        return _tokenIds.current();
    }

    function executeSale(uint256 tokenId) public payable {
        //uint price = idToListedToken[tokenId].price;
        address Nftowner = idToListedToken[tokenId].Nftowner;
        //require(msg.value == price, "Please submit the asking price in order to complete the purchase");

        //update the details of the token
        idToListedToken[tokenId].currentlyListed = true;
        idToListedToken[tokenId].Nftowner = payable(msg.sender);
        _itemsSold.increment();

        //Actually transfer the token to the new owner
        _transfer(address(this), msg.sender, tokenId);
        //approve the marketplace to sell NFTs on your behalf
        approve(address(this), tokenId);

        //Transfer the listing fee to the marketplace creator
        payable(contractowner).transfer(contractFee);
        //Transfer the proceeds from the sale to the seller of the NFT
        payable(Nftowner).transfer(msg.value);
    }
}
