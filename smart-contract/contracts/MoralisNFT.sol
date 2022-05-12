//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MoralisNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct nftState {
        uint256 price;
        bool sellable;
        address owner;
    }

    mapping(uint256 => nftState) public tokensState;

    constructor() ERC721("MoralisCoin", "MC") {}

    function mintNFT(
        address recipient,
        string memory tokenURI,
        bool sellable,
        uint256 price
    ) public onlyOwner returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        if (sellable) {
            require(price != 0, "Price must be different than 0.");
            tokensState[newItemId] = nftState(price, sellable, msg.sender);
        }

        return newItemId;
    }

    function buyNFT(
        address payable from,
        uint256 tokenId,
        uint256 amount
    ) public payable {
        require(tokensState[tokenId].sellable == true, "Token is not sellable");
        from.transfer(amount);
        approve(msg.sender, tokenId);
        transferFrom(from, tokensState[tokenId].owner, tokenId);
    }

    function setNFTStatus(
        uint256 price,
        bool sellable,
        uint256 tokenId
    ) public {
        require(
            msg.sender != tokensState[tokenId].owner,
            "NFT status can only be changed by the owner"
        );
        tokensState[tokenId].price = price;
        tokensState[tokenId].sellable = sellable;
    }
}
