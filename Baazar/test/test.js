const { expect } = require("chai");
const { ethers } = require("hardhat");
describe("Deploy the Smart Contracts :",  function ()  {

    let Auctions888Bazaar
    let AuctionsBazaar
    let ERC721
    let MERC721
    let MarketplaceSettings
    let Marketplace
    let ApprovedTokenRegistry
    let TokenApprovedRegistry
    let ERC20
    let CERC20


    it("Should deploy all smart contracts", async function () {

        [_,per1,per2,per3] = await ethers.getSigners()
        //Mian SmartContract 
        Auctions888Bazaar = await ethers.getContractFactory("Auctions888Bazaar");
        AuctionsBazaar =await Auctions888Bazaar.deploy();
        await AuctionsBazaar.deployed();
        console.log("AuctionsBazaar Deploy here :",AuctionsBazaar.address);

        // ERC721 = await hre.ethers.getContractFactory("ERC721");
        // MERC721 = await ERC721.deploy();
        // await MERC721.deployed();
        // console.log("ERC721 Deploy here :",MERC721.address);

        ERC20 = await hre.ethers.getContractFactory("ERC20");
        CERC20 = await ERC20.deploy("msg.sender","1000000000000000000000000000");
        await CERC20.deployed();
        console.log(
          "ERC20 Deploy Here ",CERC20.address
        );

        // MarketplaceSettings = await hre.ethers.getContractFactory("MarketplaceSettings");
        // Marketplace = await MarketplaceSettings.deploy();
        // await Marketplace.deployed();
        // console.log("MarketplaceSettings Deploy here :",Marketplace.address);

        // ApprovedTokenRegistry = await hre.ethers.getContractFactory("ApprovedTokenRegistry");
        // TokenApprovedRegistry = await ApprovedTokenRegistry.deploy();
        // await TokenApprovedRegistry.deployed();
        // console.log("ApprovedTokenRegistry Deploy here :",TokenApprovedRegistry.address);
    
    it("No Call the Function OF Auction888Baazar",)
     let setSalePrice = await AuctionsBazaar.setSalePrice(_.address,1,per1.address,20,per2.address,[per],["100"]);
        console.log("this is function setSalePrice ",setSalePrice);
    
    
    
    });
});    