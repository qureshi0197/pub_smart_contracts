require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
const contract = require("../artifacts/contracts/MintNFT.sol/MintNFT.json");
const contractInterface = contract.abi;
let provider = ethers.provider;
console.log("Provider: ", provider);
// const privateKey = `0x${process.env.PRIVATE_KEY}`;
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
// console.log("Wallet: ", wallet);
wallet.provider = provider;
const signer = wallet.connect(provider);
// console.log("signer: ", signer);
// console.log("contract address: ", process.env.CONTRACT_ADDRESS);
// console.log("contractInterface", contractInterface);

// console.log("nft: ", nft);

const id = 1; // id of the nft to be minted
const amount = 2500; // number of times nft should be minted

async function main() {
  try {
    const mintContract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS,
      contractInterface,
      signer
    );
    // console.log("Waiting for confirmation...");
    // console.log("mintContract: ", mintContract);
    await mintContract.functions.mint(id, amount);
    // console.log("successfully batch minted NFTs for current batch");
  } catch (error) {
    console.log("Error:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
