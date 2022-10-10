const hre = require("hardhat");

async function main() {
  const factory = await ethers.getContractFactory("AirdropNFTs");
  const [owner] = await ethers.getSigners();
  // provider = ethers.getDefaultProvider();

  // balance = await provider.getBalance(owner.address);
  // pro = await provider.connect(owner.address);
  // console.log("owner: ", owner);
  // console.log("Balance: ",balance.toString()); // 0
  const contract = await factory.deploy();

  await contract.deployed();

  console.log("Contract deployed to:", contract.address);
  console.log("Contract deployed by: ", owner.address, "\n\n");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
