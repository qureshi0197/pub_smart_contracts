// require("dotenv").config();
// require("@nomiclabs/hardhat-ethers");

// const { ethers } = require("hardhat");
// const contract = require("../artifacts/contracts/PolygonERC1155.sol/PolygonERC1155.json");
// const contractInterface = contract.abi;
// let provider = ethers.provider;
// const privateKey = `0x${process.env.PRIVATE_KEY}`;
// const wallet = new ethers.Wallet(privateKey);
// wallet.provider = provider;
// const signer = wallet.connect(provider);


// const id = 1; // id of the nft to be minted
// const amount = 100; // number of times nft should be minted

// async function main() {
//   try {
//     const mintContract = new ethers.Contract(
//       process.env.CONTRACT_ADDRESS,
//       contractInterface,
//       signer
//     );
    
//     const gas = await mintContract.estimateGas.mint(id, amount);
//     console.log("Gas required for batch minting: ", gas);

//     const block = await ethers.provider.getBlock("latest");
//     console.log("block gasLimit:", block.gasLimit);

//     const finalGas = block.gasLimit * gas;
//     console.log("Final Gas: ", finalGas);

//     const finalGasInEthers = ethers.utils.formatEther(finalGas);
//     console.log("Gas In Ethers: ", finalGasInEthers);
    
//     const gasPrice = ethers.utils.parseUnits("8", "gwei");

//     console.log("gas cost estimation = " + gas * gasPrice + " wei");
//     // console.log(
//     //   "gas cost estimation = " +
//     //     ethers.utils.parseUnits((gas * gasPrice).toString(), "matic") +
//     //     " matic"
//     // );
    
    
//   } catch (error) {
//     console.log("error occurred while calling deployed contract:", error);
//   }
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });

