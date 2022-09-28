/* eslint-disable @next/next/no-img-element */
/* eslint no-use-before-define: 0 */ // --> OFF
import { useRouter } from "next/router";

import { Tab } from "@headlessui/react";
import Link from "next/link";
import { Fragment, FunctionComponent, useState } from "react";
import styles from "../../styles/Home.module.css";

type NftItemProps = {
  item: any;
};

export async function getStaticProps(context) {
  console.log(context, "**************"); // return { movieId: 'Mortal Kombat' }
  return {
    props: {
      data: context.query,
    }, // will be passed to the page component as props
  };
}

const NftItem: FunctionComponent<NftItemProps> = ({ item }) => {
  const [showControlMenu, setShowControlMenu] = useState(false);
  const [showStartAuction, setShowStartAuction] = useState(false);
  const [showSetListPrice, setShowSetListPrice] = useState(false);

  const [cTab, setCTab] = useState(0);
  const today = new Date().toISOString().split("T")[0];
  const router = useRouter();
  const routerdata = router.asPath;
  console.log(routerdata);
  const controlMenuHandler = (e) => {
    e.stopPropagation();
    setShowControlMenu(!showControlMenu);
  };
  const setStartAuctionHandler = (e) => {
    e.preventDefault();
    console.log("hi");
  };
  const setScheduleAuctionHandler = (e) => {
    e.preventDefault();
    console.log("hi");
  };

  return (
    <Fragment>
      <a onClick={() => setShowControlMenu(false)}>
        <div className="max-w-xs border-slate-100 border-2 mx-auto">
          <div className="flex-shrink-0 hover:cursor-pointer ">
            <Link
              href={{ pathname: "/nft-item", query: item }}
              as={`${routerdata}/nft-item/${item.token_id}`}
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
                <p className="text-gray-500 text-sm">List price</p>
                <p className="">5.45 Eth</p>
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
                    {item.ownBy.split("").slice(0, 5).join("")}...
                    {item.ownBy
                      .split("")
                      .slice(Math.max(item.ownBy.length - 4, 0))
                      .join("")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>

      {showStartAuction && (
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
                    <form
                      className="space-y-6 text-sm"
                      onSubmit={setStartAuctionHandler}
                    >
                      <div className="relative">
                        <input
                          type="number"
                          name="listPrice"
                          id="listPrice"
                          className=" block w-full p-2.5 focus:outline-none border-b-2 bg-transparent"
                          placeholder="List Price"
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
      )}
    </Fragment>
  );
};

export default NftItem;
