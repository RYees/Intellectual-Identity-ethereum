const main = async () => {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the accounts", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const IPFactory = await hre.ethers.getContractFactory("ContractIp");
    const IPContract = await IPFactory.deploy();
    await IPContract.deployed();
  
    console.log("Transactions deployed to: ", IPContract.address);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  runMain();




// //  const main = async () => {
// //   const IPFactory = await hre.ethers.getContractFactory("ContractIp");
// //   const IPContract = await IPFactory.deploy();

// //   await IPContract.deployed();

// //   console.log("Transactions deployed to: ", IPContract.address);
// // };

// // const runMain = async () => {
// //   try {
// //     await main();
// //     process.exit(0);
// //   } catch (error) {
// //     console.error(error);
// //     process.exit(1);
// //   }
// // };

// // runMain();
