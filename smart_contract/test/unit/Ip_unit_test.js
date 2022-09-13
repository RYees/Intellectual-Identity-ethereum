const { expect } = require('chai');

var chai = require('chai');

describe('IP Unit Test', function () {
    before(async function () {
      IP = await ethers.getContractFactory('IP');
      IP = await IP.deploy();
      await IP.deployed();
    });

    beforeEach(async function () {
      await IP.setIP('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4', 'skkns','mary joe', 'Indis', 'mos12', 'SK');
    })

    // it('registering an Ip details', async function () {
    //   //  await Employer.setEmployee('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4', 'emp1','34.09', '98.43', '20', '3','4');
    //   expect((await IP.getMember()).toString()).to.equal('skkns','mary joe', 'Indis', 'mos12', 'SK', 0);
    //   //expect((await Employer.getEmployee('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4')).toString()).to.equal('34.09', '98.43', '3:30');
    // });
    
    beforeEach(async function () {
        await IP.changeStatus(0,1);
    })

    it('retrieve returns a Ip status', async function () {
    //  await Employer.setEmployee('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4', '34.09', '98.43', '3:30');
     expect((await IP.getStatus(1)).toString()).to.equal(1);
    }); 

    // it('retrieve returns a count of previously stored', async function () {
    //   //  await Employer.setEmployee('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4', '34.09', '98.43', '3:30');
    //    expect((await Employer. countEmployees()).toNumber()).to.equal(3);
    // }); 
    

    // // it('calling the location contract', async function () {
    // //   await Employer.contractCondition('0x5B38Da6a701c568545dCfcB03FcB875f56beddC4', '10','3');
    // // });

    // it('calling the contract balance', async function () {
    //  // expect(await Employer.getBalance()).to.be.within(0);
    //   expect((await Employer. getBalance()).toNumber()).to.equal(0); 
    // });
  });