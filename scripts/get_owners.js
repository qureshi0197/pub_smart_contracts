// Setup: npm install alchemy-sdk
const { Alchemy } = require("alchemy-sdk");
require("dotenv").config();

const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: "polygon-mumbai",
};
const alchemy = new Alchemy(config);

const main = async () => {
  // Get all NFTs for owner
  // const nfts = await alchemy.nft.getNftsForOwner(
  //   "0x2fc532642cAb3Eec214076960BeCB63ce875b4da"
  // );

  const owners = await alchemy.nft.getOwnersForNft(
    process.env.CONTRACT_ADDRESS,
    1
  );
  // Print owners
  console.log(owners);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
