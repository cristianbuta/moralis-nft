const { ethers } = require("hardhat");

async function main() {
  const MoralisNFT = await ethers.getContractFactory("MoralisNFT")
  const EscrowMoralisNFT = await ethers.getContractFactory("EscrowMoralisNFT")

  const moralisNFT = await MoralisNFT.deploy()
  const escrowMoralisNFT = await EscrowMoralisNFT.deploy()

  await escrowMoralisNFT.deployed()
  await moralisNFT.deployed()

  await moralisNFT.setApprovalForAll(escrowMoralisNFT.address, true) //approve escrow to transfer Token Ownerships

  console.log("MoralisNFT Contract deployed to address:", moralisNFT.address)
  console.log("EscrowMoralisNFT Contract deployed to address:", escrowMoralisNFT.address)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
