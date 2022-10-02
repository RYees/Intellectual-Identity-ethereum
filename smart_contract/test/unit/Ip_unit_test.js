const { expect, assert } = require('chai');

var chai = require('chai');

describe('Employer Unit Test', function () {
    before(async function () {
      Employer = await ethers.getContractFactory('Employer');
      Employer = await Employer.deploy();
      await Employer.deployed();
    });

    // beforeEach(async function () {      
    //   await Employer.setIP('0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2', 'skkns','mary joe', 'India', 'street12', 'https://skku.com');
    //   await Employer.setIP('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4', 'kkns','joe', 'Gojam', 'street912', 'https://su.com');
    // })

    it('store and get bidder value', async function () {
      await Employer.setIPbidder1('0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2', 'skkns', 1000, '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4'); 
      expect((await Employer.getbidderinfo('0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2')).toString()).to.equal('skkns,1000,0x5B38Da6a701c568545dCfcB03FcB875f56beddC4');
    }); 



    it('storing a intellectual property in the blockchain', async function () {
      // await IP.setIP('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4', 'skkns','mary joe', 'India', 'street12', 'https://skku.com');
       await Employer.setIP('0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2', 'skkns','mary joe', 'India', 'street12', 'https://skku.com');
    });
    
    it('store and getting pending ID values', async function () {
      await Employer.setIP('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4', 'kkns','joe', 'Gojam', 'street912', 'https://su.com');
      expect((await Employer.getPendingIP()).toString()).to.equal('0,1');
    });
  
    it('get a single intellectual property value', async function () {
       expect((await Employer.getIP(0)).toString()).to.equal('skkns,mary joe,India,street12,https://skku.com');
    });
  
    it('check status of a single intellectual property', async function () {
      expect((await Employer.getStatus(0)).toString()).to.equal('0');
    }); 
    
    it('retrieve returns counts of previously stored', async function () {
      expect((await Employer.countPendingIPs()).toNumber()).to.equal(2);
      expect((await Employer.countAcceptedIPs()).toNumber()).to.equal(0);
      expect((await Employer.countRejectedIPs()).toNumber()).to.equal(0);
    }); 
  
    it('retrieve returns of counts when status changed to accepted', async function () {
      await Employer.changeStatus(0,1);  
      expect((await Employer.countAcceptedIPs()).toNumber()).to.equal(1);
      expect((await Employer.countPendingIPs()).toNumber()).to.equal(1);
      expect((await Employer.countRejectedIPs()).toNumber()).to.equal(0);
    }); 

    it('retrieve returns of counts when status changed to rejected', async function () {
      await Employer.changeStatus(0,2);  
      expect((await Employer.countAcceptedIPs()).toNumber()).to.equal(0);
      expect((await Employer.countPendingIPs()).toNumber()).to.equal(1);
      expect((await Employer.countRejectedIPs()).toNumber()).to.equal(1);
    }); 

    it('retrieve returns of counts when status changed to pending', async function () {
      await Employer.changeStatus(0,0);  
      expect((await Employer.countAcceptedIPs()).toNumber()).to.equal(0);
      expect((await Employer.countPendingIPs()).toNumber()).to.equal(2);
      expect((await Employer.countRejectedIPs()).toNumber()).to.equal(0);
    }); 
  
  
  });