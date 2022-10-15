const main = async () => {
  const IPFactory = await hre.ethers.getContractFactory("IP");
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