//https://eth-goerli.g.alchemy.com/v2/GcrVjbu5A8Me4tmHm8rJStfcvJvOG_en

require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

module.exports = {
  solidity: '0.8.1',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/GcrVjbu5A8Me4tmHm8rJStfcvJvOG_en',
      accounts: [process.env.PRIVATE_KEY],
      allowUnlimitedContractSize: true
    },
  },
};