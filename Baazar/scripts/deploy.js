// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.

//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const SuperRareMarketplace = await hre.ethers.getContractFactory(
    "SuperRareMarketplace"
  );
  const SuperMarketplace = await SuperRareMarketplace.deploy();
  await SuperMarketplace.deployed();
  console.log("SuperRareMarketplace", SuperMarketplace.address);

  // const MarketplaceSettings = await hre.ethers.getContractFactory("MarketplaceSettings");
  // const MarketplaceSetting = await MarketplaceSettings.deploy();
  // await MarketplaceSetting.deployed();
  // console.log(
  //   "MarketplaceSettings",MarketplaceSetting.address
  // );

  const ApprovedTokenRegistry = await hre.ethers.getContractFactory(
    "ApprovedTokenRegistry"
  );
  const ApprovedTokenRegis = await ApprovedTokenRegistry.deploy();
  await ApprovedTokenRegis.deployed();
  console.log("ApprovedTokenRegistry", ApprovedTokenRegis.address);

  const SpaceOperatorRegistry = await hre.ethers.getContractFactory(
    "SpaceOperatorRegistry"
  );
  const SpaceOperatorRegis = await SpaceOperatorRegistry.deploy();
  await SpaceOperatorRegis.deployed();
  console.log("SpaceOperatorRegistry", SpaceOperatorRegis.address);

  const SuperRareBazaar = await hre.ethers.getContractFactory(
    "SuperRareBazaar"
  );
  const RareBazaar = await SuperRareBazaar.deploy();
  await RareBazaar.deployed();
  console.log("SuperRareBazaar", RareBazaar.address);

  const SuperRareAuctionHouse = await hre.ethers.getContractFactory(
    "SuperRareAuctionHouse"
  );
  const SuperAuctionHouse = await SuperRareAuctionHouse.deploy();
  await SuperAuctionHouse.deployed();
  console.log("SuperRareAuctionHouse", SuperAuctionHouse.address);

  const ERC20 = await hre.ethers.getContractFactory("ERC20");
  const CERC20 = await ERC20.deploy(
    "msg.sender",
    "1000000000000000000000000000"
  );
  await CERC20.deployed();
  console.log("ERC20 Deploy Here ", CERC20.address);

  const NFTContract = await hre.ethers.getContractFactory("NFTContract");
  const NFTContracts = await NFTContract.deploy();
  await NFTContracts.deployed();
  console.log("NFTContract Deploy Here ", NFTContracts.address);

  saveFrontendFiles(
    SuperMarketplace,
    ApprovedTokenRegis,
    SpaceOperatorRegis,
    RareBazaar,
    SuperAuctionHouse,
    CERC20,
    NFTContract
  );
}
function saveFrontendFiles(
  SuperMarketplace,
  ApprovedTokenRegis,
  SpaceOperatorRegis,
  RareBazaar,
  SuperAuctionHouse,
  CERC20,
  NFTContracts
) {
  const contractsDir = "../../NFTmarketplace/abi";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  let config = `
     export const SuperMarketplace_addr = "${SuperMarketplace.address}"
     export const ApprovedTokenRegis_addr = "${ApprovedTokenRegis.address}"
     export const SpaceOperatorRegis_addr = "${SpaceOperatorRegis.address}"
     export const RareBazaar_addr = "${RareBazaar.address}"
     export const SuperAuctionHouse_addr = "${SuperAuctionHouse.address}"
     export const CERC20_addr = "${CERC20.address}"
     export const NFTContracts_addr = "${NFTContracts.address}"

    `;

  let data = JSON.stringify(config);
  fs.writeFileSync(contractsDir + "/addresses.js", JSON.parse(data));
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
