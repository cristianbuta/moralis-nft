const { expect } = require("chai");
const { ethers } = require("hardhat");

let deployedMoralisNFT;
let deployedEscrowMoralisNFT;

describe("Testing Deployments", function () {

  it("Deploys MoralisNFT", async function () {
    const MoralisNFT = await ethers.getContractFactory("MoralisNFT");
    const moralisNFT = await MoralisNFT.deploy();
    await moralisNFT.deployed();
    expect(moralisNFT.address);
    console.log('Deployed MoralisNFT', moralisNFT.address)

    deployedMoralisNFT = moralisNFT;
  });

  it("Deploys EscrowMoralisNFT", async function () {
    const EscrowMoralisNFT = await ethers.getContractFactory("EscrowMoralisNFT");
    const escrowMoralisNFT = await EscrowMoralisNFT.deploy();
    await escrowMoralisNFT.deployed();
    expect(escrowMoralisNFT.address);
    console.log('Deployed Escrow', escrowMoralisNFT.address)
    deployedEscrowMoralisNFT = escrowMoralisNFT;
  });
});

// describe('Testing MoralisNFT', function() {
  
//   it("Mints NFT", async function() {
//     deployedMoralisNFT
//   })
// })