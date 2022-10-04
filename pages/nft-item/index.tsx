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
import { Fragment, useEffect, useRef, useState } from "react";
import { FunctionComponent } from "react";


// import auctionAbi from "../../abi/NFTContract.json";
// import supareRareBazar from "../../abi/SuperRareBazaar.json";
import marketPlaceAbi from "../../contract-abi/marketplace.json";
import auctionAbi from "../../contract-abi/Auction.json";
import IERC721 from "../../contract-abi/IERC721.json";
import IERC1155 from "../../contract-abi/IERC1155.json";
// import {
//   CERC20_addr,
//   SuperMarketplace_addr,
//   RareBazaar_addr,
// } from "../../abi/addresses";
import {  marketPlace, NFTContract, Auctions } from "../../contract-abi/addresses";

// import {AuctionsBazaar_addr} from '../../abi/addresses'
import { NftItemData as item } from "../../content/nft-item";
import { withRouter } from "next/router";
import SellModal from "../../components/modal/SellModal";
import SellModal2 from "../../components/modal/SellModal2";

import "bootstrap/dist/css/bootstrap.min.css";
import Countdown from "react-countdown";

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

  console.log("nftcdfsd", nft.isAuction);
  const [modalFormOpen, setModalFormOpen] = useState(false);
  const [modalFormOpen2, setModalFormOpen2] = useState(false);

  console.log("modal", modalFormOpen);
  const { connector, library, account, chainId, activate, deactivate, active } =
    useWeb3React();
    const Ref = useRef(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");
  const [marketOwnerAddress, setMarketOwnerAddress] = useState("");
  const [AuctionTime, setAuctionTime] = useState(0);
const [gethighestBidder,setHigestBidder] = useState("")
const [gethighestBid,setHigestBid] = useState<any>("")
const [auctionStatus,setAuctionStatus] = useState(false)
  const [ownerMatch, setMatch] = useState(false);
  const [marketOwnerAddressMatch, setMarketOwnerAddressMatch] = useState(false);
  const [price, setPrice] = useState("");
  const [Inputprice, setInputPrice] = useState("");
  const [check,setCheck] = useState(false)

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

      if (owner == marketPlace) {
        await marketOwnerCheck(account);
      } else {
        setOwnerAddress(owner);
        setWalletAddress(wallet_Address);
      }
  
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
      console.log("dededede", detail[0][3], owner);

      setMarketOwnerAddress(owner);
      setPrice(ethers.utils.formatEther(detail[0][5].toString()));
      console.log(
        "sadsadasdasdasdasdas",
        ethers.utils.formatEther(detail[0][5].toString())
      );
 

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
          nft.address,
          nft.token_id,
          ethers.utils.parseEther(Inputprice.toString()),
          false,
          0,
          10
         
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


  const gettingAuction = async() => {
    try {
      let signer = await loadProvider();
      let contract = new ethers.Contract(
        marketPlace,
        marketPlaceAbi,
        signer
      );
      let item = await contract.tokenItemId(nft.address, nft.token_id); 
      let Auc = new ethers.Contract(Auctions, auctionAbi, signer);
      let lastItem = await Auc.getLastTime(item.toString())
      let time = Number(lastItem.toString())

      setAuctionTime(time)

    }catch(err) {
      console.log("Error", err)
    }
  }

  const highestBidder = async() => {
    try {
      let signer = await loadProvider();
      let Auc = new ethers.Contract(Auctions, auctionAbi, signer);
      let contract = new ethers.Contract(
        marketPlace,
        marketPlaceAbi,
        signer
      );
      let item = await contract.tokenItemId(nft.address, nft.token_id); 
      let bidder = await Auc.getHighestBidder(item.toString())
      console.log("BID",bidder.toString())
      setHigestBidder(bidder)

    }catch(err) {
      console.log("Error", err)
    }
  }

  const highestBid = async() => {
    try {
      let signer = await loadProvider();
      let Auc = new ethers.Contract(Auctions, auctionAbi, signer);
      let contract = new ethers.Contract(
        marketPlace,
        marketPlaceAbi,
        signer
      );
      let item = await contract.tokenItemId(nft.address, nft.token_id); 
      let bid = await Auc.getHighestBid(item.toString())
       console.log("bid",item.toString())
      setHigestBid(ethers.utils.formatEther(bid))
      

    }catch(err) {
      console.log("Error", err)
    }
  }
  const auctionTime = async() => {
    try {
      let signer = await loadProvider();
      let Auc = new ethers.Contract(Auctions, auctionAbi, signer);
      let contract = new ethers.Contract(
        marketPlace,
        marketPlaceAbi,
        signer
      );
      let item = await contract.tokenItemId(nft.address, nft.token_id); 
      let response = await Auc.canSell(item.toString())
      console.log("RESSSS",response)
      setAuctionStatus(response)


    }catch(err) {
      console.log("Error", err)
    }
  }


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
      setPrice("")
    } catch (error) {
      console.log(error);
    }
  };


  const checkingAuction = async() => {
    try{
      let signer = await loadProvider();
      // let Auc = new ethers.Contract(Auctions, auctionAbi, signer);
      let contract = new ethers.Contract(
        marketPlace,
        marketPlaceAbi,
        signer
      );
      let item = await contract.tokenItemId(nft.address, nft.token_id); 
      let response = await contract.getListedNFT(item.toString())
     
      setCheck(response[0][7])  
      console.log("CHECK",response[0][7])
    }catch(err) {
      console.log(err)
    }
  
  }

  
  useEffect(() => {
    setNft(props.router.query);
    if (account) {
  
      (async () => {
        await ownerCheck(account);
        await checkingAuction();
        await highestBidder();
        await highestBid();
     
        
      })();
  
    }
    gettingAuction()
  
   
    auctionTime()
   
    //  checkingAuction()
  }, [account, nft.address]);



  const HistoryTab = () => {
    return (
      <div className="mt-14">
        <h4 className="text-3xl font-semibold">History</h4>
        <img src="../assets/images/history-tab.png" alt="" />
      </div>
    );
  };

  const AuctionWatch = () => {
   setModalFormOpen2(true)
    console.log("Hello from Watch Function")
  }

  const GetNFT =async () => {
   try {
    let signer = await loadProvider();
    let Market = new ethers.Contract(marketPlace, marketPlaceAbi, signer);
    let item = await Market.tokenItemId(nft.address, nft.token_id);
    let getItem = await Market.createMarketSale(
      nft.address,
      item.toString(),
      {value: ethers.utils.parseEther("0")}
    );
    console.log("Suceess",getItem)
    setPrice("")
   }catch(err) {
    console.log("err",err)
   }
  }
  

  const cancel = async() => {
    try {
      let signer = await loadProvider();
      let Market = new ethers.Contract(marketPlace, marketPlaceAbi, signer);
      let item = await Market.tokenItemId(nft.address, nft.token_id);
      let cancelItem = await Market.cancelListed(
        item.toString()
      );
      console.log("Suceess",cancelItem)
      setPrice("")
     }catch(err) {
      console.log("err",err)
     }
  }
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
            <div className="">
              <h2 className="text-4xl mt-14">{nft.name}</h2>
             
              <div>
                {
                  AuctionTime > 0 && auctionStatus == false ?  <Countdown date={AuctionTime * 1000}  /> : ""
                }
               
                </div>
                <div>
                 
                { gethighestBidder != "0x0000000000000000000000000000000000000000" && auctionStatus == false ?  `Highest Bidder:  ${gethighestBidder}` : ""
                 
                }
               
                </div>
              
                <div>
                 
                 { gethighestBid > 0  && auctionStatus == false ?  
                   `Highest Bid:  ${gethighestBid} ETH` : "" 
                 }
                
                 </div>
                 <div>
                  {
                   !ownerMatch && auctionStatus == true ? `Highest Bidder:  ${gethighestBidder}` : ""
                  }
                 </div>
                 <div>
                  {
                    !ownerMatch && auctionStatus == true ? `Highest Bid:  ${gethighestBid}` : ""
                  }
                 </div>
              
             
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
                        {!ownerMatch && gethighestBid > price ? gethighestBid : price}
                      
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
                        onClick={auctionStatus == false && gethighestBidder == "0x0000000000000000000000000000000000000000" ?  cancel : ()=> console.log("Hello")}
                      >
                      {auctionStatus == false  && gethighestBidder == "0x0000000000000000000000000000000000000000" ?  "Cancel Listing" : "You Listed this item"}
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
                        onClick={ check == true && auctionStatus == false ? AuctionWatch  :gethighestBidder == account && auctionStatus == true ? GetNFT : check == false ?  BuyNft : ()=>console.log("Hello!") }
                      >
                       {check == true && auctionStatus == false ?  "Place a Bid"  : gethighestBidder == account && auctionStatus == true ?   "Get NFT" : check == false ?   "Buy NFT" : "Auction has ended!" }
                      </button>
                    )}
                   
                  </div>
                </div>
              </div>
              {/* )} */}
            </div>
          
          </div>
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
      <SellModal2
         open={modalFormOpen2}
         close={() => setModalFormOpen2(false)}
         item={nft}
      />
        {/* <Modal modalopen={modalIsOpen} /> */}
      </div>
    </Fragment>
  );
};
export default withRouter(NftItem);
