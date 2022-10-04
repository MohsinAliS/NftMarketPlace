/* eslint-disable @next/next/no-img-element */
/* eslint no-use-before-define: 0 */ // --> OFF
import { useRouter } from "next/router";

import { Tab } from "@headlessui/react";
import Link from "next/link";
import { Fragment, FunctionComponent, useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import loadProvider from "utils/loadProvider";
import { marketPlace } from "contract-abi/addresses";
import marketPlaceAbi from "../../contract-abi/marketplace.json";
import { ethers } from "ethers";
import IERC721 from "../../contract-abi/IERC721.json";
import IERC1155 from "../../contract-abi/IERC1155.json";
import { useWeb3React } from "@web3-react/core";
type NftItemProps = {
  item: any;
};

// export async function getStaticProps(context) {
//   console.log(context, "**************"); // return { movieId: 'Mortal Kombat' }
//   return {
//     props: {
//       data: context.query,
//     }, // will be passed to the page component as props
//   };
//   console.log("context", context);
// }

const NftItem: FunctionComponent<NftItemProps> = ({
  item,
  // open,
  // close,
  // createMarketItemFunc,
  // setSalePrice,
}) => {
  const [showControlMenu, setShowControlMenu] = useState(false);
  const [showStartAuction, setShowStartAuction] = useState(false);
  const [showSetListPrice, setShowSetListPrice] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [marketOwnerAddress, setMarketOwnerAddress] = useState("");
   const [price, setprice] = useState("");
   const [ownerMatch, setMatch] = useState(false);
   const [Price, setPrice] = useState("");
   const [ownerAddress, setOwnerAddress] = useState("");
   const [marketOwnerAddressMatch, setMarketOwnerAddressMatch] = useState(false);
  // const [cTab, setCTab] = useState(0);
  const today = new Date().toISOString().split("T")[0];
  const router = useRouter();
  const routerdata = router.asPath;
  console.log("item",item);
  const { connector, library, account, chainId, activate, deactivate, active } =
    useWeb3React();
  const controlMenuHandler = (e) => {
    e.stopPropagation();
    setShowControlMenu(!showControlMenu);
  };
  
  const ownerCheck = async (account) => {
    try {
      let signer = await loadProvider();
      console.log("account", account);
      let wallet_Address = ethers.utils.getAddress(account);
      let owner = "";
      console.log("sadkjasbgdjasgjkas     1", item.schema_name, "ss");
      if (item?.schema_name == "ERC721") {
        let contract721 = new ethers.Contract(item.address, IERC721, signer);
        console.log("sadkjasbgdjasgjkas     2", owner);
        owner = await contract721.ownerOf(item.token_id);
        console.log("sadkjasbgdjasgjkas", owner);
      } else {
        let contract1155 = new ethers.Contract(item.address, IERC1155, signer);
        let balance = await contract1155.balanceOf(item.address, item.token_id);
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
      let Item = await contract.tokenItemId(item.address, item.token_id);
      let owner = await contract.ownerOf(Item);

      let detail = await contract.getListedNFT(Item);
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
  // const priceOfItem = async() => {
  //   try{
  //     let signer = await loadProvider();
  //     // let Auc = new ethers.Contract(Auctions, auctionAbi, signer);
  //     let contract = new ethers.Contract(
  //       marketPlace,
  //       marketPlaceAbi,
  //       signer
  //     );
  //      let temp = await contract.tokenItemId(item?.address, item?.token_id);
  //     const res = await contract.getListedNFT(temp.toString())
  //     console.log("THIS",res[0][5].toString())
  //     setprice(ethers.utils.formatEther(res[0][5].toString()))
  //   }catch(err){
  //     console.log(err)
  //   } 
  
  // }

  useEffect(()=>{
    if (account) {
  
      (async () => {
        await ownerCheck(account);
        
      })();
  
    }
    // priceOfItem()
  },[])

  return (
    <Fragment>
      <a onClick={() => setShowControlMenu(false)}>
        <div className="max-w-xs border-slate-100 border-2 mx-auto">
          <div className="flex-shrink-0 hover:cursor-pointer ">
            <Link
              href={{ pathname: "/nft-item", query: item }}
              as={`${routerdata}/${item.address}/${item.token_id}`}
            >
              <img
                className={`h-80 w-full object-cover`}
                src={item?.coverImage}
                alt={item?.name}
              />
            </Link>
          </div>

          <div className="flex-1 bg-white p-4 flex flex-col justify-between">
            <div className="flex-1 ">
              <div className="block mt-1 ">
                <p className="text-xl font-semibold text-gray-900">
                  {/* <Link href={{ pathname: "/nft-item", query: item }}> */}
                  {item?.name}
                  {/* </Link> */}
                  {item.collected && (
                    <div className="relative">
                      <button
                        className="p-1 ellipsis-v float-right hover:bg-gray-100"
                        onClick={controlMenuHandler}
                      ></button>

                      {showControlMenu && (
                        <ul
                          className={`rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full  ${styles.controlMenu}`}
                        >
                          <a onClick={() => setShowSetListPrice(true)}>
                            <li
                              className={`w-full hover:cursor-pointer hover:bg-gray-100 p-1 hover:rounded py-2`}
                            >
                              Set a list price
                            </li>
                          </a>
                          <a onClick={() => setShowStartAuction(true)}>
                            <li
                              className={`w-full hover:cursor-pointer hover:bg-gray-100 p-1 hover:rounded py-2`}
                            >
                              Start an auction
                            </li>
                          </a>
                          <a>
                            <li
                              className={`w-full hover:cursor-pointer hover:bg-gray-100 p-1 hover:rounded py-2`}
                            >
                              Transfer
                            </li>
                          </a>
                        </ul>
                      )}
                    </div>
                  )}
                </p>
                <p className="text-gray-500 text-sm mt-2">List price</p>
                <p className="mt-2 mb-2">{`${!ownerMatch ? Price : "0.0" } ETH`} </p>
              </div>
            </div>
            <hr />
            <div className="grid gap-2 grid-cols-2 p-2">
              <div>
                <p className="text-gray-500 text-sm">Artist</p>
                <div className="flex space-x-2 mt-1">
                  <div>
                    <img
                      src="../assets/images/profile.jpg"
                      alt=""
                      className="rounded-2xl w-8 h-8 "
                    />
                  </div>
                  <div className="align-middle text-sm">
                    {item.createdBy.split("").slice(0, 5).join("")}...
                    {item.createdBy
                      .split("")
                      .slice(Math.max(item.createdBy.length - 4, 0))
                      .join("")}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Owner</p>
                <div className="flex space-x-2 mt-1">
                  <div>
                    <img
                      src="../assets/images/profile.jpg"
                      alt=""
                      className="rounded-2xl w-8 h-8 "
                    />
                  </div>
                  <div className="align-middle text-sm">
                    {" "}
                    {ownerAddress.split("").slice(0, 5).join("")}...
                    {ownerAddress
                      .split("")
                      .slice(Math.max(ownerAddress.length - 4, 0))
                      .join("")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>

      {/* {showStartAuction && (
        <div
          id="defaultModal"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center bg-gray-600 bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-4xl h-full md:h-auto mx-auto ">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 bg-gradient-to-t from-gray-100 ">
              <div className="flex justify-between items-start p-4 rounded-t mb-5">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mx-auto mt-4">
                  Configure your auction
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="defaultModal"
                  onClick={() => setShowStartAuction(false)}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="lg:grid lg:grid-cols-10 sm:grid sm:grid-cols-10 gap-2 px-4">
                <div className="col-span-3">
                  <img
                    className={`h-40 mx-auto object-cover rounded`}
                    src={item?.coverImage}
                    alt={item?.name}
                  />
                  <p className="text-center text-sm py-5">{item?.name}</p>
                </div>
                <div className="col-span-7">
                  <Tab.Group>
                    <Tab.List className="flex">
                      <Tab
                        onClick={() => setCTab(0)}
                        className={`w-1/2 font-medium text-gray-300 ${
                          cTab === 0
                            ? " border-b-2 border-black text-black"
                            : ""
                        }`}
                      >
                        <h3 className="pb-1">RESERVE</h3>
                      </Tab>
                      <Tab
                        onClick={() => setCTab(1)}
                        className={`w-1/2 font-medium text-gray-300 ${
                          cTab === 1
                            ? " border-b-2 border-black text-black"
                            : ""
                        }`}
                      >
                        <h3 className="pb-1">SCHEDULED</h3>
                      </Tab>
                    </Tab.List>
                    <hr className="m-0" />
                    <Tab.Panels>
                      <Tab.Panel>
                        <div className="mx-auto mt-6 mb-6">
                          <form
                            className="space-y-6 text-sm"
                            onSubmit={setStartAuctionHandler}
                          >
                            <div className="relative">
                              <input
                                type="number"
                                name="reservePrice"
                                id="reservePrice"
                                className=" block w-full p-2.5 focus:outline-none border-b-2 bg-transparent"
                                placeholder="Reserve Price"
                                required
                              />
                              <label className="absolute right-0 top-2 font-medium">
                                ETH
                              </label>
                              <p className="float-right mt-0 text-sm">$123</p>
                            </div>

                            <div className="p-3 pb-10 bg-yellow-50 text-sm">
                              <p className="text-black">
                                An auction style pioneered by the artist{" "}
                                <span className="underline">
                                  {item?.createdBy}
                                </span>
                                , the artwork will immediately be available for
                                bidding starting at the reserve price, without a
                                time limit. When the reserve is met, a 24-hour
                                timed auction will begin, with 15 minute
                                extension in the final 15 minutes.
                              </p>
                              <p className="float-right mt-2">
                                <Link href={"#"}>
                                  <a className="p-1 hover:bg-blue-100 flex">
                                    Learn how auctions work
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                      />
                                    </svg>
                                  </a>
                                </Link>
                              </p>
                            </div>
                            <div className="flex pt-3">
                              <button
                                type="button"
                                onClick={() => setShowStartAuction(false)}
                                className="hover:bg-black hover:shadow-lg hover:text-white focus:ring-2 focus:outline-none font-medium rounded text-sm px-10 py-2.5 text-center uppercase "
                              >
                                Nevermind
                              </button>
                              <button
                                type="submit"
                                className="ml-auto text-white bg-black hover:shadow-lg focus:ring-2 focus:outline-none font-medium rounded text-sm px-10 py-2.5 text-center uppercase "
                              >
                                Set Reserve
                              </button>
                            </div>
                          </form>
                        </div>
                      </Tab.Panel>
                      <Tab.Panel>
                        <div className="mx-auto mt-6 mb-6">
                          <form
                            className="space-y-6 text-sm"
                            onSubmit={setScheduleAuctionHandler}
                          >
                            <div className="sm:grid sm:grid-cols-2 gap-1">
                              <div>
                                <label htmlFor="startDate" className="pl-2.5">
                                  Start Date
                                </label>
                                <input
                                  type="date"
                                  name="startDate"
                                  id="startDate"
                                  className="block w-full p-2.5 focus:outline-none border-b-2 bg-transparent"
                                  placeholder="Start Date"
                                  required
                                  min={today}
                                />
                              </div>
                              <div>
                                <label htmlFor="endDate" className="pl-2.5">
                                  End Date
                                </label>
                                <input
                                  type="date"
                                  name="endDate"
                                  id="endDate"
                                  className="block w-full p-2.5 focus:outline-none border-b-2 bg-transparent"
                                  placeholder="End Date"
                                  required
                                  min={today}
                                />
                              </div>
                            </div>
                            <div className="sm:grid sm:grid-cols-2 gap-1">
                              <div>
                                <label htmlFor="startTime" className="pl-2.5">
                                  Start Time
                                </label>
                                <input
                                  type="time"
                                  name="startTime"
                                  id="startTime"
                                  className="block w-full p-2.5 focus:outline-none border-b-2 bg-transparent"
                                  placeholder="Start Time"
                                  required
                                />
                              </div>
                              <div>
                                <label htmlFor="endTime" className="pl-2.5">
                                  End Time
                                </label>
                                <input
                                  type="time"
                                  name="endTime"
                                  id="endTime"
                                  className="block w-full p-2.5 focus:outline-none border-b-2 bg-transparent"
                                  placeholder="End Time"
                                  required
                                />
                              </div>
                            </div>

                            <div className="relative">
                              <input
                                type="number"
                                name="startPrice"
                                id="startPrice"
                                className=" block w-full p-2.5 focus:outline-none border-b-2 bg-transparent"
                                placeholder="Starting Price (optional)"
                              />
                              <label className="absolute right-0 top-2 font-medium">
                                ETH
                              </label>
                              <p className="float-right mt-0 text-sm">$123</p>
                            </div>
                            <div className="p-3 pb-10 bg-yellow-50 text-sm">
                              <p className="text-black">
                                Timer will count down to the start of the
                                auction, at which point bidding will become
                                available and the timer will count down to the
                                auction end. If you select a starting price,
                                bids must at least meet it.
                              </p>
                              <p className="text-red-700">
                                The length of a scheduled auction can be set for
                                between 1-7 days.
                              </p>
                              <p className="float-right mt-2">
                                <Link href={"#"}>
                                  <a className="p-1 hover:bg-blue-100 flex">
                                    Learn how auctions work
                                    <i className="">
                                      <img
                                        src="../assets/images/chevron-right.svg"
                                        alt=""
                                      />
                                    </i>
                                  </a>
                                </Link>
                              </p>
                            </div>
                            <div className="flex pt-3">
                              <button
                                type="button"
                                onClick={() => setShowStartAuction(false)}
                                className="hover:bg-black hover:shadow-lg hover:text-white focus:ring-2 focus:outline-none font-medium rounded text-sm px-10 py-2.5 text-center uppercase "
                              >
                                Nevermind
                              </button>
                              <button
                                type="submit"
                                className="ml-auto text-white bg-black hover:shadow-lg focus:ring-2 focus:outline-none font-medium rounded text-sm px-10 py-2.5 text-center uppercase "
                              >
                                Schedule
                              </button>
                            </div>
                          </form>
                        </div>
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSetListPrice && (
        <div
          id="defaultModal"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center bg-gray-600 bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-4xl h-full md:h-auto mx-auto ">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 bg-gradient-to-t from-gray-100 ">
              <div className="flex justify-between items-start p-4 rounded-t mb-5">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mx-auto mt-4">
                  Set List Price
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="defaultModal"
                  onClick={() => setShowSetListPrice(false)}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="lg:grid lg:grid-cols-10 sm:grid sm:grid-cols-10 gap-2 px-4">
                <div className="col-span-3">
                  <img
                    className={`h-40 mx-auto object-cover rounded`}
                    src={item?.coverImage}
                    alt={item?.name}
                  />
                  <p className="text-center text-sm py-5">{item?.name}</p>
                </div>
                <div className="col-span-7">
                  <div className="mx-auto mt-6 mb-6">
                    <form className="space-y-6 text-sm" onSubmit={handleSale}>
                      <div className="relative">
                        <input
                          type="text"
                          name="listPrice"
                          id="listPrice"
                          className=" block w-full p-2.5 focus:outline-none border-b-2 bg-transparent"
                          placeholder="List Price"
                          onChange={(e) => {
                            setinPutSalePrice(e.target.value);
                          }}
                          required
                        />
                        <label className="absolute right-0 top-2 font-medium">
                          ETH
                        </label>
                        <p className="float-right mt-0 text-sm">$123</p>
                      </div>

                      <div className="p-3 pb-10 bg-yellow-50 text-sm">
                        <p className="text-black">
                          In addition to being able to set a "Buy Now" list
                          price, you can set list price here.
                        </p>
                      </div>
                      <div className="flex pt-3">
                        <button
                          type="button"
                          onClick={() => setShowSetListPrice(false)}
                          className="hover:bg-black hover:shadow-lg hover:text-white focus:ring-2 focus:outline-none font-medium rounded text-sm px-10 py-2.5 text-center uppercase "
                        >
                          Nevermind
                        </button>
                        <button
                          type="submit"
                          className="ml-auto text-white bg-black hover:shadow-lg focus:ring-2 focus:outline-none font-medium rounded text-sm px-10 py-2.5 text-center uppercase "
                        >
                          Set List Price
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </Fragment>
  );
};

export default NftItem;
