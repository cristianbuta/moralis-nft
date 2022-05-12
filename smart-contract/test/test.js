const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Moralis NFT", function () {
  it("Mint nft", async function () {
    const MoralisNFT = await ethers.getContractFactory("MoralisNFT");
    const moralisNFT = await MoralisNFT.deploy();
    await moralisNFT.deployed();
  });
});
