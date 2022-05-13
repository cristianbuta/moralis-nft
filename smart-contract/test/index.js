const { expect } = require("chai");
const { ethers } = require("hardhat");

let deployedMoralisNFT;
let deployedEscrowMoralisNFT;


const signer = ethers.provider.getSigner();
let signerAddress;

describe('Testing Deployments', async () => {

  it("Deploys EscrowMoralisNFT", async () => {
    const EscrowMoralisNFT = await ethers.getContractFactory("EscrowMoralisNFT");
    const escrowMoralisNFT = await EscrowMoralisNFT.deploy();
    await escrowMoralisNFT.deployed();
    expect(escrowMoralisNFT.address);
    deployedEscrowMoralisNFT = escrowMoralisNFT;
  });

  it("Deploys MoralisNFT", async () => {
    const MoralisNFT = await ethers.getContractFactory("MoralisNFT");
    const moralisNFT = await MoralisNFT.deploy();
    await moralisNFT.deployed();

    await moralisNFT.setApprovalForAll(deployedEscrowMoralisNFT.address, true)

    expect(moralisNFT.address);
    deployedMoralisNFT = moralisNFT;

  });

})

describe('Testing MoralisNFT', () => {

  it("Mints NFT", async () => {
    const tokenURI = 'https://google.com';
    signerAddress = await signer.getAddress();
    await deployedMoralisNFT.mintNFT(signerAddress, tokenURI);

    const balance = await deployedMoralisNFT.balanceOf(signerAddress);

    expect(balance.eq(ethers.BigNumber.from(1))).to.equal(true)
  })

})

describe('Testing EscrowMoralisNFT', async () => {

  it("Propose NFT for selling", async () => {
    await deployedEscrowMoralisNFT.sellNFT(deployedMoralisNFT.address, 1, 500);
    const escrowState = await deployedEscrowMoralisNFT.escrowState(1);
    expect(escrowState.seller).to.equal(signerAddress);
  })

  it("Buys NFT", async () => {
    const { interface, address } = deployedEscrowMoralisNFT;
    const signers = await ethers.getSigners();
    const buyerAddress = await signers[2].getAddress();
    const buyerContract = new ethers.Contract(address, interface, signers[2])

    await buyerContract.buyNFT(1, deployedMoralisNFT.address, { value: ethers.utils.parseEther("500") });
    const nftOwner = await deployedMoralisNFT.ownerOf(1);

    expect(nftOwner).to.equal(buyerAddress);
  })
});