require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-abi-exporter");

const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

module.exports = {
  solidity: {
    version: "0.8.14",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    goerli: {
      url: ALCHEMY_API_KEY,
      accounts: [GOERLI_PRIVATE_KEY],
    },
  },

  etherscan: {
    apiKey: process.env.etherscan_API,
  },

  abiExporter: {
    path: "../Frontend/abi",
    runOnCompile: true,
    clear: true,
    only: [
      ":SuperRareMarketplace$",
      ":ApprovedTokenRegistry$",
      ":SpaceOperatorRegistry$",
      ":SuperRareBazaar$",
      ":SuperRareAuctionHouse$",
      ":ERC20$",
      ":NFTContract$",
    ],
    flat: true,
    spacing: 2,
    pretty: true,
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.etherscan_API,
  },
  mocha: {
    timeout: 100000000,
  },
};

// ERC721 Deploy here : 0xc253dF5431A7921283Fefa022E8104443F9773Bb
// ERC20 Deploy Here  0x5A5Cc4691C26628b5b8b44eA7680A140C4884F07
// MarketplaceSettings Deploy here : 0xf861EEA35aD8744Cc1059412795a662e08c36081
// Auctions888Bazaar Deploy here : 0x0af3F835D7c4d3939d6279ac3c790BD62F23C289
// ApprovedTokenRegistry Deploy here : 0xC878A62bF87A3FB079D8bC8CA0608B5dBA1D2407
// NFTContract Deploy here : 0xf92714A5EB344C29805dA8d5058faca54A5Ad894

// ===============second-time-deploy-addresses=========================

// SuperRareMarketplace 0x5979bbD4bB106e2A948BDB575E4A9682904B8A46
// ApprovedTokenRegistry 0x84dF9031CFB688291438de453b92b120001Ba72c
// SpaceOperatorRegistry 0xa34eAB6014e2Db73564190b08F297e611F33a133
// SuperRareBazaar 0x1d0Aca7BAd885ab0618EE2612A95EcC6b0a8b41d
// SuperRareAuctionHouse 0x795eE7910eC88a9Bc7820cEDb25f30cF5B251366
// ERC20 Deploy Here  0xFB9C1AFb30E1240EA04Ab4BAE91D326d41b41149
// NFTContract Deploy Here  0xf92714A5EB344C29805dA8d5058faca54A5Ad894
