//https://eth-goerli.g.alchemy.com/v2/GcrVjbu5A8Me4tmHm8rJStfcvJvOG_en

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.1',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/GcrVjbu5A8Me4tmHm8rJStfcvJvOG_en',
      accounts: ['53dc4cad3c6eadea0a956d66fd28fdec6fd66e8117f76b97c15a0e9bfad59494'],
      allowUnlimitedContractSize: true
    },
  },
};