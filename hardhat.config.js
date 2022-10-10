require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { API_URL, PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "matic",
  networks: {
    mumbai: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    matic: {
      url: "https://polygon-mainnet.g.alchemy.com/v2/tDq9iU4BH3fEusvjSlbuOHiJhSuBHM_1",
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
