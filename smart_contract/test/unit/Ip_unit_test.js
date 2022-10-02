const { assert, expect } = require('chai');

var chai = require('chai');

describe('IP Unit Test', function () {
    before(async function () {
      IP = await ethers.getContractFactory('IP');
      IPs = await IP.deploy();
      await IPs.deployed();
    });

    // beforeEach(async function () {
    //   await IP.setIP('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4', 'skkns','mary joe', 'India', 'street12', 'https://skku.com');
    //   await IP.setIP('0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2', 'skkns','mary joe', 'India', 'street12', 'https://skku.com');
    // })
    
  it('storing a value', async function () {
    // await IP.setIP('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4', 'skkns','mary joe', 'India', 'street12', 'https://skku.com');
     await IPs.setIP('0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2', 'skkns','mary joe', 'India', 'street12', 'https://skku.com');
  });
  
  // it('get array value', async function () {
  //   //expect((await IP.getPendingIP()).toNumber()).to.equal(0);
  //   await IPs.setIP('0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2', 'skkns','mary joe', 'India', 'street12', 'https://skku.com');
  //   expect((await IPs.getPendingIP()).toNumber()).to.equal(0);
  // });

  // it('get a IP value', async function () {
  //    expect((await IP.getIP(0)).toString()).to.equal('skkns,mary joe,India,street12,https://skku.com');
  // });

  // it('change status', async function () {
  //   //await IP.changeStatus(0,1);
  //   //expect(await IP.changeStatus(0,1)).to.be.true;
  //   const expectedNumber = true;
  //   assert.equal(IP.changeStatus(0,1), expectedNumber)  
    
  // }); 

  // it('check status', async function () {
  //   expect((await IP.getStatus(0)).toNumber()).to.equal(0);
  // }); 
  
  it('retrieve returns a pending count of previously stored', async function () {
    await IPs.setIP('0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2', 'skkns','mary joe', 'India', 'street12', 'https://skku.com');  
    expect((await IPs.countPendingIPs()).toNumber()).to.equal(0);
  }); 

  it('retrieve returns a accepted count of previously stored', async function () {
    await IPs.changeStatus(0,1);  
    expect((await IPs.countAcceptedIPs()).toNumber()).to.equal(0);
  }); 

  it('retrieve returns a rejected count of previously stored', async function () {
    expect((await IPs.countRejectedIPs()).toNumber()).to.equal(0);
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

    
    it('retrieve returns a pending count of previously stored', async function () {
      await IPs.setIPbidder1('0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2', 'skkns', 1000, '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4') 
      expect((await IPs.getbidderinfo('0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2')).toString()).to.equal('0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2');
    }); 
    
  });
  
 