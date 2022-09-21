const ethers = require("ethers");
require("dotenv").config({ path: __dirname + "/./../.env" });

const API_URL = process.env.ALCHEMY_API_KEY;
const PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;
const CONTRACT_ADDRESS = "0xf92714A5EB344C29805dA8d5058faca54A5Ad894";
const CONTRACT_ABI = require("../../Frontend/abi/NFTContract.json");

let customHttpProvider = new ethers.providers.JsonRpcProvider(API_URL);

async function minting(address, string) {
  let wallet = new ethers.Wallet(PRIVATE_KEY, customHttpProvider);

  let signer = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

  const mint = await signer.safeMint(address, string);

  console.log("Tx is Successfull");
}

minting(
  "0xC9B56Ad4050c1C3B0E434D6382F6B184a9FcEc7D",
  `https://gateway.pinata.cloud/ipfs/Qmaf6TBXVQ5mFiDHyWE8J6apftETrgZnqFtK9RFqX8DRLS`
);
