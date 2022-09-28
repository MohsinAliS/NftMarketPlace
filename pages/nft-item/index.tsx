/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint no-use-before-define: 0 */ // --> OFF
import { Tab } from "@headlessui/react";
import loadProvider from "../../utils/loadProvider";
import { useWeb3React } from "@web3-react/core";
import { Contract, ethers } from "ethers";
import type { NextPage } from "next";
import { NftMeta } from "@_types/nft";
import Web3Modal, { providers } from "web3modal";
import { Fragment, useEffect, useState } from "react";
import { FunctionComponent } from "react";

import auctionAbi from "../../abi/NFTContract.json";
// import supareRareBazar from "../../abi/SuperRareBazaar.json";
import marketPlaceAbi from "../../contract-abi/marketplace.json";
import NFTcontractAbi from "../../contract-abi/NFTContract.json";
import IERC721 from "../../contract-abi/IERC721.json";
import IERC1155 from "../../contract-abi/IERC1155.json";
// import {
//   CERC20_addr,
//   SuperMarketplace_addr,
//   RareBazaar_addr,
// } from "../../abi/addresses";
import { ERC20, marketPlace, NFTContract } from "../../contract-abi/addresses";

// import {AuctionsBazaar_addr} from '../../abi/addresses'
import { NftItemData as item } from "../../content/nft-item";
import { withRouter } from "next/router";
import SellModal from "../../components/modal/SellModal";
import "bootstrap/dist/css/bootstrap.min.css";

// import { nfts } from "content/meta";

// interface WithRouterProps {
//   router: NextRouter
// }interface MyComponentProps extends WithRouterProps {}
type propTypes = {
  router: any;
};

type nftTypes = {
  coverImage: string;
  name: string;
  description: string;
  address: string;
  isAuction: boolean;
  token_id: string;
  schema_name: string;
  creator_img: string;
  owner_img: string;
};
interface Provider {
  connected: boolean;
  type: string;
}

const NftItem: FunctionComponent<propTypes> = (props) => {
  const [nft, setNft] = useState<nftTypes>({
    coverImage: "",
    name: "",
    description: "",
    address: "",
    isAuction: true,
    token_id: "",
    schema_name: "",
    creator_img: "",
    owner_img: "",
  });

  console.log("nft", nft);
  const [modalFormOpen, setModalFormOpen] = useState(false);
  console.log("modal", modalFormOpen);
  const { connector, library, account, chainId, activate, deactivate, active } =
    useWeb3React();

  const [walletAddress, setWalletAddress] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");
  const [marketOwnerAddress, setMarketOwnerAddress] = useState("");
  const [ownerMatch, setMatch] = useState(false);
  const [marketOwnerAddressMatch, setMarketOwnerAddressMatch] = useState(false);
  const [price, setPrice] = useState("");
  const [Inputprice, setInputPrice] = useState("");

  const setSalePrice = (inputprice) => {
    setInputPrice(inputprice);
  };

  const ownerCheck = async (account) => {
    try {
      let signer = await loadProvider();
      console.log("account", account);
      let wallet_Address = ethers.utils.getAddress(account);
      let owner = "";
      console.log("sadkjasbgdjasgjkas     1", nft.schema_name, "ss");
      if (nft?.schema_name == "ERC721") {
        let contract721 = new ethers.Contract(nft.address, IERC721, signer);
        console.log("sadkjasbgdjasgjkas     2", owner);
        owner = await contract721.ownerOf(nft.token_id);
        console.log("sadkjasbgdjasgjkas", owner);
      } else {
        let contract1155 = new ethers.Contract(nft.address, IERC1155, signer);
        let balance = await contract1155.balanceOf(nft.address, nft.token_id);
        if (Number(balance.toString()) > 0) {
          owner = account;
        } else {
          owner = account;
        }

        console.log("sadkjasbgdjasgjkas", balance, balance.toString(), owner);
      }

      // // console.log(
      // //   {
      // //     address: nft.address,
      // //     auctionAbi,
      // //     signer,
      // //   },
      // //   "************************(((((("
      // // );

      // // let contract = new ethers.Contract(NFTContract, NFTcontractAbi, signer);
      // // let owner = await contract.ownerOf(nft.token_id);
      if (owner == marketPlace) {
        await marketOwnerCheck(account);
      } else {
        setOwnerAddress(owner);
        setWalletAddress(wallet_Address);
      }
      // let setSellPrice = await contract()

      // console.log("owner", ownerAddress);
      // console.log("wallet", walletAddress);
      // console.log({ ownerAddress, walletAddress }, "*****************");
      // if (ownerAddress == walletAddress) {
      //   setMatch(!ownerMatch);
      // }
      if (owner === account) {
        setMatch(true);
        setPrice("");
      }
      console.log(ownerMatch);
    } catch (error) {
      console.log("Error Occurred while checking owner", error);
    }
  };

  const marketOwnerCheck = async (account) => {
    try {
      let signer = await loadProvider();
      console.log("account", account);
      let wallet_Address = ethers.utils.getAddress(account);

      let contract = new ethers.Contract(marketPlace, marketPlaceAbi, signer);
      let item = await contract.tokenItemId(nft.address, nft.token_id);
      let owner = await contract.ownerOf(item);

      let detail = await contract.getListedNFT(item);
      console.log("dededede", detail, owner);

      // let setSellPrice = await contract()
      setMarketOwnerAddress(owner);
      setPrice(ethers.utils.formatEther(detail[0][5].toString()));
      console.log(
        "sadsadasdasdasdasdas",
        ethers.utils.formatEther(detail[0][5].toString())
      );
      // console.log({ ownerAddress, walletAddress }, "*****************");
      // if (ownerAddress == walletAddress) {
      //   setMatch(!ownerMatch);
      // }

      if (owner === account) {
        console.log("SAd", owner);
        setMarketOwnerAddressMatch(true);
        setOwnerAddress(account);
      } else {
        setOwnerAddress(account);
      }
      console.log(marketOwnerAddressMatch);
      console.log("market owner match", ownerMatch);
    } catch (error) {
      console.log("Error Occurred while checking owner", error);
    }
  };

  const setSellandGet = async () => {
    // await setSellPrice();
    await createMarketItem();
  };

  // const setSellPrice = async () => {
  //   try {
  //     let signer = await loadProvider();
  //     let contract = new ethers.Contract(
  //       // RareBazaar_addr,
  //       // supareRareBazar,
  //       marketPlace,
  //       marketPlaceAbi,
  //       signer
  //     );
  //     let sellNow = await contract.setSalePrice(
  //       nft.address,
  //       nft.token_id,
  //       // CERC20_addr,
  //       ERC20,
  //       10000
  //       // SuperMarketplace_addr,
  //       // marketPlace,
  //       // [walletAddress],
  //       // [100]
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const approval = async () => {
    try {
      let signer = await loadProvider();
      let contract721 = new ethers.Contract(nft.address, IERC721, signer);
      let contract1155 = new ethers.Contract(nft.address, IERC1155, signer);
      if (nft.schema_name == "ERC721") {
        let alloawance = await contract721.isApprovedForAll(
          account,
          marketPlace
        );
        if (!alloawance) {
          let approve = await contract721.setApprovalForAll(marketPlace, true);
          let tx = await approve.wait();
          if (tx.confirmations > 0) {
            return true;
          }
        } else {
          return true;
        }
      } else {
        let alloawance = await contract1155.isApprovedForAll(
          account,
          marketPlace
        );
        if (!alloawance) {
          let approve = await contract1155.setApprovalForAll(marketPlace, true);
          let tx = await approve.wait();
          if (tx.confirmations > 0) {
            return true;
          }
        } else {
          return true;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createMarketItem = async () => {
    console.log(typeof Inputprice);
    console.log(Inputprice);
    try {
      let approve = await approval();
      console.log("createMarketItem");
      if (approve) {
        let signer = await loadProvider();
        let contract = new ethers.Contract(
          // RareBazaar_addr,
          // supareRareBazar,
          marketPlace,
          marketPlaceAbi,
          signer
        );
        let sellNow = await contract.createMarketItem(
          // nft.address,
          nft.address,
          nft.token_id,
          ethers.utils.parseEther(Inputprice.toString()),
          false,
          120,
          10
          // nft.token_id,
          // CERC20_addr,
          // ERC20,

          // SuperMarketplace_addr,
          // marketPlace,
          // [walletAddress],
          // [100]
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const createMarketItemWithPlaceBid = async (inputTime) => {
    if (inputTime === 0) {
      return;
    } else {
      let timeInSec = inputTime * 60;
      console.log("time in Sec", timeInSec);
      try {
        let approve = await approval();

        if (approve) {
          let signer = await loadProvider();
          let contract = new ethers.Contract(
            // RareBazaar_addr,
            // supareRareBazar,
            marketPlace,
            marketPlaceAbi,
            signer
          );
          let sellNow = await contract.createMarketItem(
            // nft.address,
            nft.address,
            nft.token_id,
            ethers.utils.parseEther(Inputprice),
            true,
            timeInSec,

            10
          );
          console.log(sellNow);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const BuyNft = async () => {
    try {
      let signer = await loadProvider();
      let contract = new ethers.Contract(
        // RareBazaar_addr,
        // supareRareBazar,
        marketPlace,
        marketPlaceAbi,
        signer
      );
      console.log("new account", signer);
      // let sellNow = await contract.transferNFT(
      let item = await contract.tokenItemId(nft.address, nft.token_id);
      let sellNow = await contract.createMarketSale(nft.address, item, {
        value: ethers.utils.parseEther(price),
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const getPrice = async () => {
  //   let signer = await loadProvider();
  //   let contract = new ethers.Contract(
  //     // RareBazaar_addr,
  //     marketPlace,
  //     // supareRareBazar,
  //     marketPlaceAbi,
  //     signer
  //   );
  //   try {
  //     let getPrice = await contract.getSalePrice(
  //       nft.address,
  //       nft.token_id,
  //       // SuperMarketplace_addr,
  //       marketPlace
  //     );
  //     let price = await ethers.utils.formatUnits(getPrice[2]["_hex"], "gwei");
  //     if (price == "0.0") {
  //       await setPrice([]);
  //     } else {
  //       await setPrice(price);
  //     }
  //     console.log("setPrice values :", getPrice[2]["_hex"]);
  //     console.log("After setPrice Get values :", getPrice);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    setNft(props.router.query);
    if (account) {
      // console.log({ ac: nft.address, account }, "***************");
      (async () => {
        await ownerCheck(account);

        // await getPrice();
      })();
    }
  }, [account, nft.address]);

  const HistoryTab = () => {
    return (
      <div className="mt-14">
        <h4 className="text-3xl font-semibold">History</h4>
        <img src="../assets/images/history-tab.png" alt="" />
      </div>
    );
  };
  return (
    <Fragment>
      <div className="max-w-lg mx-auto lg:grid gap-10 lg:grid-cols-12 lg:max-w-none mt-3">
        <div className="col-span-7">
          <img src={nft.coverImage} alt="" />
        </div>
        <div className="col-span-5 font-grotesk ">
          <div className="fw flex mt-5">
            <button className="mr-10 flex">
              <img src="/assets/images/icon-eye.svg" alt="views-icon" />
              <span className="ml-2 leading-4">{item.viewCount}</span>
            </button>
            <button className="mr-10 flex">
              <img src="/assets/images/icon-heart.svg" alt="loved-icon" />
              <span className="ml-2 leading-4">{item.likeCount}</span>
            </button>
          </div>
          <div className="lg:h-3/5">
            <div className=" ">
              <h2 className="text-4xl mt-14">{nft.name}</h2>
              <div className="grid gap-2 grid-cols-2 p-2">
                <div>
                  <div className="flex space-x-2 mt-1">
                    <div>
                      <img
                        src={nft.creator_img}
                        alt=""
                        className="rounded-2xl w-12 h-12 "
                      />
                    </div>
                    <div className="align-middle text-sm">
                      <p className="text-gray-500 text-sm">Artist</p>
                      {item.creator.username}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex space-x-2 mt-1">
                    <div>
                      <img
                        src={nft.owner_img}
                        alt=""
                        className="rounded-2xl w-12 h-12 "
                      />
                    </div>
                    <div className="align-middle text-sm">
                      <p className="text-gray-500 text-sm">Owner</p>
                      {item.owner.username}
                    </div>
                  </div>
                </div>
              </div>
              {/* {!nft.isAuction && ( */}
              <div>
                <hr />
                <div className="ActionContainer-sc-14ezkrc-4 fHwHJk">
                  <div className="flex align-baseline items-baseline">
                    <span className="CurrentOfferTitle-sc-14ezkrc-22 cdBhKn">
                      Current offer:
                    </span>
                    <span className="inline-flex align-baseline items-baseline">
                      <p className="text-3xl font-semibold mx-1">
                        {price !== "" ? price : null}
                      </p>
                      <p className="text-normal mx-1">ETH</p>
                      <p className="CurrentOfferUsdAmount-sc-14ezkrc-26 kjoxs">
                        ($798)
                      </p>
                    </span>
                  </div>
                  <div className=" mt-3">
                    {ownerMatch && price != "" ? (
                      <button
                        disabled
                        className="w-full bg-black text-white py-2 px-10 rounded-full font-semibold hover:shadow-xl hover:shadow-indigo-300"
                      >
                        You Own this item
                      </button>
                    ) : marketOwnerAddressMatch ? (
                      <button
                        className="w-full bg-black text-white py-2 px-10 rounded-full font-semibold hover:shadow-xl hover:shadow-indigo-300"
                        // onClick={setModalIsOpen(!modalIsOpen)}
                        // onClick={() => setModalFormOpen(true)}
                        // onClick={setSellPrice}
                        // onClick={setSellandGet}
                      >
                        You listed This Item
                      </button>
                    ) : ownerMatch ? (
                      <button
                        className="w-full bg-black text-white py-2 px-10 rounded-full font-semibold hover:shadow-xl hover:shadow-indigo-300"
                        // onClick={setModalIsOpen(!modalIsOpen)}
                        // onClick={() => setModalFormOpen(true)}
                        onClick={() => setModalFormOpen(true)}
                        // onClick={setSellPrice}
                        // onClick={setSellandGet}
                      >
                        Sell
                      </button>
                    ) : (
                      <button
                        className="w-full bg-black text-white py-2 px-10 rounded-full font-semibold hover:shadow-xl hover:shadow-indigo-300"
                        onClick={BuyNft}
                      >
                        Buy Nft
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {/* )} */}
            </div>
          </div>

          {/* {nft.isAuction && (
            <div className="bg-gray-50 p-5">
              <h6 className="text-lg">AUCTION ENDS IN</h6>
              <div className="flex">
                <div className="absolute mt-4">
                  <img
                    className="live-dot"
                    src="data:image/gif;base64,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"
                    alt="live auction dot"
                  ></img>
                </div>
                <p className="ml-7 text-5xl font-medium">00:08:08:08</p>
              </div>

              <div className=" mt-5"> */}
          {/* ownerMatch  */}
          {/* {true && (
                  <button className="w-full bg-black text-white py-2 px-10 rounded-full hover:shadow-xl hover:shadow-indigo-300 text-lg">
                    Place a bid
                  </button>
                )}
                <p className="mt-5">
                  Once a bid is placed, it cannot be withdrawn.
                </p>
              </div>
            </div>
          )} */}
        </div>
      </div>
      <div>
        <div className="lg:grid lg:grid-cols-2 gap-1 ">
          <section className="DescriptionWrapper-sc-s00q1p-0 eROBht">
            <h4 color="#000000" className="text-3xl font-semibold mb-5">
              Description
            </h4>
            <div className="grid grid-cols-10 gap-1 mb-6 font-grotesk">
              <div>
                <img
                  src={nft?.coverImage}
                  alt="In&nbsp;the&nbsp;Name&nbsp;of&nbsp;Digital&nbsp;Renaissance"
                  className="w-10 h-10"
                />
              </div>
              <div className="col-span-8">
                <p className="text-gray-400">#1 of 1 in series</p>
                <a
                  className="SeriesLink-sc-s00q1p-4 infnmP"
                  href="/series/0x22fef4cba71db38a152c0e56d418b99387a8552a"
                >
                  {item.contractName}
                </a>
              </div>
            </div>
            <div className=" font-grotesk text-lg"> {nft.description}</div>
          </section>
        </div>
        <section className="">
          <section className="mt-12">
            <h2 className="mt-12 mb-1.5 uppercase">Tags</h2>
            <div className="flex flex-wrap -ml-2 pb-3">
              {item.tags.map((tg) => (
                <a href="/search/art" key={tg}>
                  <span className="mt-1 mr-2 rounded-full border-2 border-gray-200 h-10 text-lg flex px-2 pt-1">
                    #{tg}
                  </span>
                </a>
              ))}
            </div>
          </section>
          <div className="w-1/2 mt-10">
            <h5 className="mb-3">DETAILS</h5>
            <div className="lg:grid lg:grid-cols-2 gap-1 ">
              <div className="grid grid-cols-2 gap-1">
                <p className="w-32">Medium</p>
                <p className="w-32">{item.metadata.media.mimeType}</p>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <p className="w-32">Contract Address</p>
                <a
                  href="https://etherscan.io/address/0x22fef4cba71db38a152c0e56d418b99387a8552a"
                  target="_blank"
                  rel="noreferrer"
                  className="text-right lg:text-left"
                >
                  <p className="mx-2 w-32">{nft.address}</p>
                </a>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <p className="SuperRareText-sc-9920pw-0 fTQoOh">Dimensions</p>
                <p className="text-right lg:text-left">
                  {item.metadata.media.dimensions}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <p className="SuperRareText-sc-9920pw-0 fTQoOh">
                  Token Standard
                </p>
                <p className="SuperRareText-sc-9920pw-0 hNBiA-D">
                  {nft.schema_name}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <p className="SuperRareText-sc-9920pw-0 fTQoOh">File Size</p>
                <p className="SuperRareText-sc-9920pw-0 hNBiA-D">19 MB</p>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <p className="SuperRareText-sc-9920pw-0 fTQoOh">Blockchain</p>
                <p className="SuperRareText-sc-9920pw-0 hNBiA-D">Ethereum</p>
              </div>
            </div>
          </div>
          <div className="flex mt-6">
            <a
              href="https://etherscan.io/tx/0x7a5bb92fb604a5cf5ec718a9ad80a67ef6d3c233be3763590e9a65b432729024"
              target="_blank"
              rel="noreferrer"
              className="flex"
            >
              <div className="flex">
                <img src="/assets/images/etherscan.svg" />
                <p className="ml-2">Etherscan</p>
              </div>
            </a>
            <a
              href="https://ipfs.pixura.io/ipfs/QmSY6uBscLtfe7sPx7KnG6QCbiSTGEBcr8ES4xc8YwpWR4/metadata.json"
              target="_blank"
              rel="noreferrer"
              className="flex"
            >
              <div className="flex">
                <img src="/assets/images/metadata.svg" className="ml-2" />
                <p className="ml-2">Metadata</p>
              </div>
            </a>
            <a
              href="https://ipfs.pixura.io/ipfs/QmPtKvJkB6FRiZ7So4RKT8EjwGU355cQWVqoVhDDrPNzxj/AlexisOlin-IntheNameofDigitalRenaissance.jpg"
              target="_blank"
              rel="noreferrer"
              className="flex"
            >
              <div className="flex">
                <img src="/assets/images/ipfs.svg" className="ml-2" />
                <p className="ml-2">IPFS</p>
              </div>
            </a>
          </div>
        </section>
        <HistoryTab />
        <SellModal
          open={modalFormOpen}
          close={() => setModalFormOpen(false)}
          address={nft}
          createMarketItemFunc={createMarketItem}
          createMarketItemFuncWithPlaceBid={createMarketItemWithPlaceBid}
          setSalePrice={setSalePrice}
          item={nft}
        />
        {/* <Modal modalopen={modalIsOpen} /> */}
      </div>
    </Fragment>
  );
};
export default withRouter(NftItem);
