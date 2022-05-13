// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract EscrowMoralisNFT {
    struct seller {
        address seller;
        uint256 tokenId;
        uint256 price;
    }

    mapping(uint256 => seller) public escrowState;

    constructor() {}

    function sellNFT(
        address nftContractAddress,
        uint256 tokenId,
        uint256 price
    )
        public
        onlyOwnerForContract(nftContractAddress, tokenId)
        onlyWithPrice(price)
    {
        IERC721(nftContractAddress).approve(address(this), tokenId);
        escrowState[tokenId] = seller(msg.sender, tokenId, price);
    }

    function buyNFT(uint256 tokenId, address nftContractAddress)
        public
        payable
        onlyForSale(tokenId)
        onlyMatchingPrice(msg.value, escrowState[tokenId].price)
    {
        address buyer = msg.sender;
        address payable fromSeller = payable(escrowState[tokenId].seller);
        fromSeller.transfer(msg.value);
        IERC721(nftContractAddress).safeTransferFrom(
            escrowState[tokenId].seller,
            buyer,
            tokenId
        );
        delete escrowState[tokenId];
    }

    function cancelSale(uint256 tokenId)
        public
        onlyForSale(tokenId)
        onlyOwner(tokenId)
    {
        delete escrowState[tokenId];
    }

    modifier onlyOwner(uint256 tokenId) {
        require(
            escrowState[tokenId].seller == msg.sender,
            "Only owner can cancel sale"
        );
        _;
    }

    modifier onlyOwnerForContract(address nftContractAddress, uint256 tokenId) {
        address tokenOwner = IERC721(nftContractAddress).ownerOf(tokenId);
        require(tokenOwner == msg.sender, "Only nft owner can deposit");
        _;
    }

    modifier onlyWithPrice(uint256 price) {
        require(price > 0, "Only with price bigger than 0");
        _;
    }

    modifier onlyMatchingPrice(uint256 value, uint256 price) {
        require(value >= price, "Only with matching price");
        _;
    }

    modifier onlyForSale(uint256 tokenId) {
        require(escrowState[tokenId].price > 0, "Only nfts that are for sale");
        _;
    }
}
