//https://eth-goerli.g.alchemy.com/v2/GcrVjbu5A8Me4tmHm8rJStfcvJvOG_en

require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

module.exports = {
  solidity: '0.8.1',
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {      
      url: process.env.SEPOLIA_API_URL,
      accounts: [process.env.SEPOLIA_ACCOUNT_PRIVATE_KEY],
      allowUnlimitedContractSize: true
    },
  },
};