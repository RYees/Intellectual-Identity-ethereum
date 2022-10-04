const { expect, assert } = require('chai');

var chai = require('chai');

describe('Ip Unit Test', function () {
    before(async function () {
      Ip = await ethers.getContractFactory('IP');
      Ip = await Ip.deploy();
      await Ip.deployed();
    });

    // beforeEach(async function () {      
    //   await Ip.setIP('0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2', 'skkns','mary joe', 'India', 'street12', 'https://skku.com');
    //   await Ip.setIP('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4', 'kkns','joe', 'Gojam', 'street912', 'https://su.com');
    // })

    it('storing a intellectual property in the blockchain', async function () {
      await Ip.setIP('0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2', 'skkns','mary joe', 'India', 'street12', 'https://skku.com');
      await Ip.setIP('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4', 'kkns','joe', 'Gojam', 'street912', 'https://su.com');
    });
    
    // it('getting all registered intelletual property', async function () {      
    //   expect((await Ip.getAllRegisteredIps()).toString()).to.equal('0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,0x5B38Da6a701c568545dCfcB03FcB875f56beddC4,skkns,kkns,mary joe,joe,India,Gojam,street12,street912,https://skku.com,https://su.com,1664724609,1664724610,0,0');
    // });


    // it('getting all registered intelletual property', async function () {  
    //   const getAllIps = await Ip.getAllRegisteredIps();
    //   const expectedNumber = '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,0x5B38Da6a701c568545dCfcB03FcB875f56beddC4,skkns,kkns,mary joe,joe,India,Gojam,street12,street912,https://skku.com,https://su.com,1664724663,1664724664,0,0';

    //   const expectedValue = [['0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2','0x5B38Da6a701c568545dCfcB03FcB875f56beddC4'],['skkns','kkns'],['mary joe','joe'],['India','Gojam'],['street12','street912'],['https://skku.com','https://su.com'],[1664724663,1664724664],[0,0]];

    //   assert.equal(getAllIps.toString(), expectedNumber);   
    // });

  
    it('store and getting pending ID values', async function () {      
      expect((await Ip.getPendingIP()).toString()).to.equal('0,1');
      expect((await Ip.getAcceptIP()).toString()).to.equal('');
      expect((await Ip.getRejectIP()).toString()).to.equal('');
    });
  
    it('get a single intellectual property value', async function () {
       expect((await Ip.getIP(0)).toString()).to.equal('skkns,mary joe,India,street12,https://skku.com');
    });
  
    it('check status of a single intellectual property', async function () {
      expect((await Ip.getStatus(0)).toString()).to.equal('0');
    }); 
    
    it('retrieve returns counts of previously stored', async function () {
      expect((await Ip.countPendingIPs()).toNumber()).to.equal(2);
      expect((await Ip.countAcceptedIPs()).toNumber()).to.equal(0);
      expect((await Ip.countRejectedIPs()).toNumber()).to.equal(0);
    }); 
  
    it('retrieve returns of counts when status changed to accepted', async function () {
      await Ip.changeStatus(0,1);  
      expect((await Ip.countAcceptedIPs()).toNumber()).to.equal(1);
      expect((await Ip.countPendingIPs()).toNumber()).to.equal(1);
      expect((await Ip.countRejectedIPs()).toNumber()).to.equal(0);
 
      const accept = await Ip.getAcceptIP();
      const pend = await Ip.getPendingIP();
      const reject = await Ip.getRejectIP();
      assert.equal(accept.toString(), '0');
      assert.equal(pend.toString(),'1');
      assert.equal(reject.toString(),'');
    }); 

    it('retrieve returns of counts when status changed to rejected', async function () {
      await Ip.changeStatus(0,2);  
      expect((await Ip.countAcceptedIPs()).toNumber()).to.equal(0);
      expect((await Ip.countPendingIPs()).toNumber()).to.equal(1);
      expect((await Ip.countRejectedIPs()).toNumber()).to.equal(1);

      const accept = await Ip.getAcceptIP();
      const pend = await Ip.getPendingIP();
      const reject = await Ip.getRejectIP();
      assert.equal(accept.toString(), '');
      assert.equal(pend.toString(),'1');
      assert.equal(reject.toString(),'0');
    }); 

    it('retrieve returns of counts when status changed to pending', async function () {
      await Ip.changeStatus(0,0);  
      expect((await Ip.countAcceptedIPs()).toNumber()).to.equal(0);
      expect((await Ip.countPendingIPs()).toNumber()).to.equal(2);
      expect((await Ip.countRejectedIPs()).toNumber()).to.equal(0);

      const accept = await Ip.getAcceptIP();
      const pend = await Ip.getPendingIP();
      const reject = await Ip.getRejectIP();
      assert.equal(accept.toString(), '');
      assert.equal(pend.toString(),'1,0');
      assert.equal(reject.toString(),'');
    }); 



    // Bidder Tesing 

    it('store, get and total counts of bidders of an intellectual property owner', async function () {

      await Ip.setIPbidder1('0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2', 'skkns', 1000, '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4'); 

      expect((await Ip.getbidderinfo('0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2')).toString()).to.equal('skkns,1000,0x5B38Da6a701c568545dCfcB03FcB875f56beddC4');

      expect((await Ip.countBids('0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2')).toString()).to.equal('1');
 
    }); 



    // Nfts testing

    it('create nft for accepted intellectual property', async function () {

      await Ip.changeStatus(0,1); 
      await Ip.mintnft(0, '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2', 'https://skku.com');
      
    }); 

    it('get nft name, symbol and owner of an Nft intellectual property owner', async function () {
      
      expect((await Ip.nameOfnft()).toString()).to.equal('IpItem');
      expect((await Ip.symbolOfnft()).toString()).to.equal('IpMt');
      expect((await Ip.ownerOfnft(1)).toString()).to.equal('0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2');

    }); 
  
  
  
  
  });