const dotenv = require("dotenv");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

require("hardhat-deploy");

dotenv.config();

module.exports = {
  solidity: "0.8.11",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.RINKEBY_PRIVATE_KEY],
      gas: 2100000,
      gasPrice: 8000000000,
    },
  },
  etherscan: {
    apiKey: process.env.MAINNET_ETHERSCAN_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
