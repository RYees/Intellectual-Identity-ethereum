const main = async () => {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the accounts", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const IPFactory = await hre.ethers.getContractFactory("Ipbidder");
    const IPBidder = await IPFactory.deploy();
    await IPBidder.deployed();
  
    console.log("Transactions deployed to: ", IPBidder.address);
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