const mintCall = async (account) => {
  try {
    let signer = loadProvider();
    let wallet_Address = ethers.utils.getAddress(account);
    console.log("signer", signer);
    console.log("wallet_address", wallet_Address);
  } catch (error) {
    console.log("Error Occurred while checking owner", error);
  }
};

mintCall();

describe("This Is MarketPlace", function () {
  let NFT = "0x3b357D020A33daEF58856aC54d35aCe307a903b5";

  it("Deploy Contract", async function () {
    let per1 = await ethers.getSigners(
      "54c08eb316633a28f563562aee44f0563bfe65a97c346ed5c514a45c6e811df4"
    );

    //call mint function first time to owner side & its work owner mint NFT
    it("call Mint Function first time & addr1(owner) call it", async function () {
      let mintToken = await NFT.safeMint(
        per1.address,
        "https://gateway.pinata.cloud/ipfs/Qmaf6TBXVQ5mFiDHyWE8J6apftETrgZnqFtK9RFqX8DRLS"
      );
      balance = await NFT.balanceOf(per1.address);
      console.log("after Mint NFT: ", balance.toString());
    });
  });
});
