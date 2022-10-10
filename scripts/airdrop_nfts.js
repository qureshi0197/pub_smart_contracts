require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

const contract = require("../artifacts/contracts/AirdropNFTs.sol/AirdropNFTs.json");
const contractInterface = contract.abi;
let provider = ethers.provider;
const privateKey = `0x${process.env.PRIVATE_KEY}`;
const wallet = new ethers.Wallet(privateKey);
wallet.provider = provider;
const signer = wallet.connect(provider);
// console.log("signer: ", signer);
// console.log("contract address: ", process.env.CONTRACT_ADDRESS);
// console.log("contractInterface", contractInterface);
// sample addresses
// 0xC7a20d65Aa758C30dbC8cef88aED5f31bB76a9bc
// 0xcf892745F7d75ECCaC9801C3cD3C500963A35801
// 0xa445dB34018a6B279CdDB9C9E4D130760a297997

// const listOfToAddresses = [
//   "0x828ABEb7E0A5a2D016d18faBac35b466D0219b17", //MyAccount 1
//   "0x2dc78e318df5F45b05cD2CbfdCF2C53dF56ef18C", //MyAccount 2
//   "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", //MyAccount 3
//   "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", //MyAccount 4
// ];
// const listOfIds = [1, 1, 1, 1];
// const listOfAmounts = [1, 1, 1, 1];
const listOfToAddresses = [
  "0x11f72884F3FD3bF8D401F6Aa18ca9Fe5076D8Da7", //MyAccount 4
];
const listOfIds = [1];
const listOfAmounts = [1];

async function main() {
  try {
    const airdropContract = new ethers.Contract(
      process.env.AIRDROP_CONTRACT_ADDRESS,
      contractInterface,
      signer
    );

    //   bulkAirdropERC1155("mintContractAddress",[to addresses],[ids of nfts],[number of each nft to be sent]);
    await airdropContract.functions.airdropNft(
      process.env.CONTRACT_ADDRESS,
      listOfToAddresses,
      listOfIds,
      listOfAmounts
    );
    console.log("successfully airdropped NFTs");
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
