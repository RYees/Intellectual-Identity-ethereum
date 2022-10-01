const { assert, expect } = require('chai');

var chai = require('chai');

describe('IP Unit Test', function () {
    before(async function () {
      IP = await ethers.getContractFactory('IP');
      IP = await IP.deploy();
      await IP.deployed();
    });

    // beforeEach(async function () {
    //   await IP.setIP('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4', 'skkns','mary joe', 'India', 'street12', 'https://skku.com');
    //   await IP.setIP('0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2', 'skkns','mary joe', 'India', 'street12', 'https://skku.com');
    // })
    
  it('storing a value', async function () {
     await IP.setIP('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4', 'skkns','mary joe', 'India', 'street12', 'https://skku.com');
     //await IP.setIP('0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2', 'skkns','mary joe', 'India', 'street12', 'https://skku.com');
  });
    
  it('get a IP value', async function () {
     expect((await IP.getIP(0)).toString()).to.equal('skkns,mary joe,India,street12,https://skku.com');
  });
  
  it('retrieve returns a pending count of previously stored', async function () {
      expect((await IP.countPendingIPs()).toNumber()).to.equal(0);
  }); 

  it('retrieve returns a accepted count of previously stored', async function () {
      expect((await IP.countAcceptedIPs()).toNumber()).to.equal(0);
  }); 

  it('retrieve returns a rejected count of previously stored', async function () {
    expect((await IP.countRejectedIPs()).toNumber()).to.equal(0);
  }); 
   
    // it('Verifies the blogger ', async function () {

    //   await IP.setIP('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4', 'skkns','mary joe', 'India', 'street12', 'https://skku.com');
     
      // const bloggerCount = await IP.countPendingIPs()

      // const expectedNumber = 0

      // assert.equal(bloggerCount.toString(), expectedNumber)

   // })

    // it('Verifies the blogger number count to be 1', async function () {

    //       const bloggerCount = await IP.countPendingIPs()
    
    //       const expectedNumber = '1'
    
    //       assert.equal(bloggerCount.toString(), expectedNumber)   
    
    //     })

 
    
  });
  
 