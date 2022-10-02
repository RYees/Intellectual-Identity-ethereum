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

    it('storing a intellectual property in the blockchain', async function () {
      await Employer.setIP('0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2', 'skkns','mary joe', 'India', 'street12', 'https://skku.com');
      await Employer.setIP('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4', 'kkns','joe', 'Gojam', 'street912', 'https://su.com');
    });
    
    // it('getting all registered intelletual property', async function () {      
    //   expect((await Employer.getAllRegisteredIps()).toString()).to.equal('0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,0x5B38Da6a701c568545dCfcB03FcB875f56beddC4,skkns,kkns,mary joe,joe,India,Gojam,street12,street912,https://skku.com,https://su.com,1664724609,1664724610,0,0');
    // });


    // it('getting all registered intelletual property', async function () {  
    //   const getAllIps = await Employer.getAllRegisteredIps();
    //   const expectedNumber = '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,0x5B38Da6a701c568545dCfcB03FcB875f56beddC4,skkns,kkns,mary joe,joe,India,Gojam,street12,street912,https://skku.com,https://su.com,1664724663,1664724664,0,0';

    //   const expectedValue = [['0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2','0x5B38Da6a701c568545dCfcB03FcB875f56beddC4'],['skkns','kkns'],['mary joe','joe'],['India','Gojam'],['street12','street912'],['https://skku.com','https://su.com'],[1664724663,1664724664],[0,0]];

    //   assert.equal(getAllIps.toString(), expectedNumber);   
    // });

  
    it('store and getting pending ID values', async function () {      
      expect((await Employer.getPendingIP()).toString()).to.equal('0,1');
      expect((await Employer.getAcceptIP()).toString()).to.equal('');
      expect((await Employer.getRejectIP()).toString()).to.equal('');
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
 
      const accept = await Employer.getAcceptIP();
      const pend = await Employer.getPendingIP();
      const reject = await Employer.getRejectIP();
      assert.equal(accept.toString(), '0');
      assert.equal(pend.toString(),'1');
      assert.equal(reject.toString(),'');
    }); 

    it('retrieve returns of counts when status changed to rejected', async function () {
      await Employer.changeStatus(0,2);  
      expect((await Employer.countAcceptedIPs()).toNumber()).to.equal(0);
      expect((await Employer.countPendingIPs()).toNumber()).to.equal(1);
      expect((await Employer.countRejectedIPs()).toNumber()).to.equal(1);

      const accept = await Employer.getAcceptIP();
      const pend = await Employer.getPendingIP();
      const reject = await Employer.getRejectIP();
      assert.equal(accept.toString(), '');
      assert.equal(pend.toString(),'1');
      assert.equal(reject.toString(),'0');
    }); 

    it('retrieve returns of counts when status changed to pending', async function () {
      await Employer.changeStatus(0,0);  
      expect((await Employer.countAcceptedIPs()).toNumber()).to.equal(0);
      expect((await Employer.countPendingIPs()).toNumber()).to.equal(2);
      expect((await Employer.countRejectedIPs()).toNumber()).to.equal(0);

      const accept = await Employer.getAcceptIP();
      const pend = await Employer.getPendingIP();
      const reject = await Employer.getRejectIP();
      assert.equal(accept.toString(), '');
      assert.equal(pend.toString(),'1,0');
      assert.equal(reject.toString(),'');
    }); 



    // Bidder Tesing 

    it('store, get and total counts of bidders of an intellectual property owner', async function () {

      await Employer.setIPbidder1('0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2', 'skkns', 1000, '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4'); 

      expect((await Employer.getbidderinfo('0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2')).toString()).to.equal('skkns,1000,0x5B38Da6a701c568545dCfcB03FcB875f56beddC4');

      expect((await Employer.countBids('0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2')).toString()).to.equal('1');
 
    }); 



    // Nfts testing

    it('create nft for accepted intellectual property', async function () {

      await Employer.changeStatus(0,1); 
      await Employer.mintnft(0, '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2', 'https://skku.com');
      
    }); 

    it('get nft name, symbol and owner of an Nft intellectual property owner', async function () {
      
      expect((await Employer.nameOfnft()).toString()).to.equal('IpItem');
      expect((await Employer.symbolOfnft()).toString()).to.equal('IpMt');
      expect((await Employer.ownerOfnft(1)).toString()).to.equal('0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2');

    }); 
  
  
  
  
  });