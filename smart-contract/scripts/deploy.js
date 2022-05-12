const { ethers } = require("hardhat");

async function main() {
  const MoralisNFT = await ethers.getContractFactory("MoralisNFT")

  const moralistNFT = await MoralisNFT.deploy()
  await moralistNFT.deployed()
  console.log("Contract deployed to address:", moralistNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
