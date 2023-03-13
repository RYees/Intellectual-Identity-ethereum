//https://eth-goerli.g.alchemy.com/v2/GcrVjbu5A8Me4tmHm8rJStfcvJvOG_en

require('@nomiclabs/hardhat-waffle');
require('dotenv').config({path: '/.env'});
const { SECRET_KEY } = process.env;

module.exports = {
  solidity: '0.8.1',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/GcrVjbu5A8Me4tmHm8rJStfcvJvOG_en',
      accounts: [`0x${SECRET_KEY}`],
      allowUnlimitedContractSize: true
    },
  },
};