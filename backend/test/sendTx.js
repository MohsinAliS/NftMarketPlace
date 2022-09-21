const Web3 = require("web3");
const Provider = require("@truffle/hdwallet-provider");
const MyContract = require("../artifacts/contracts/NFTContract.sol/NFTContract.json");
const address = "0xC9B56Ad4050c1C3B0E434D6382F6B184a9FcEc7D";
const privateKey =
  "54c08eb316633a28f563562aee44f0563bfe65a97c346ed5c514a45c6e811df4";

const init3 = async () => {
  const provider = new Provider(
    privateKey,
    "https://eth-goerli.g.alchemy.com/v2/-mkwmQ1lbYq1Lk6Y2LIZf1_0QO6PdPYV"
  );
  const web3 = new Web3(provider);
  const networkId = await web3.eth.net.getId();
  const myContract = new web3.eth.Contract(
    MyContract.abi,
    (MyContract.network = "0xf92714A5EB344C29805dA8d5058faca54A5Ad894")
  );

  const receipt = await myContract.methods
    .safeMint(
      address,
      `https://gateway.pinata.cloud/ipfs/Qmaf6TBXVQ5mFiDHyWE8J6apftETrgZnqFtK9RFqX8DRLS`
    )
    .send({
      from: address,
    });
  //   console.log(`Transaction hash: ${receipt.transactionHash}`);
  //   console.log(
  //     `New data value: ${await myContract.methods.balanceOF(address).call()}`
  //   );
};

init3();
