require('dotenv').config({ path: __dirname + '/../.env' });
require("@nomiclabs/hardhat-ethers");

const { API_URL, METAMASK_ACCOUNT_PRIVATE_KEY } = process.env;

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      timeout: 10000000,
      forking: {
        url: API_URL,
        blockNumber: 612845
      }
    },
    ropsten: {
      url: API_URL,
      accounts: [`0x${METAMASK_ACCOUNT_PRIVATE_KEY}`],
      timeout: 10000000
    }
  },
  solidity: {
    version: "0.8.11",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}