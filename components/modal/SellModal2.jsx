import loadProvider from "utils/loadProvider";
import React, { Fragment, useState } from "react";
import { Tab } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Auctions, marketPlace } from "contract-abi/addresses";
import auctionAbi from "../../contract-abi/Auction.json";
import marketPlaceAbi from "../../contract-abi/marketplace.json";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Modal,
  Row,
  Col,
} from "reactstrap";
import styles from "../../styles/Home.module.css";
import { type } from "os";
import { ethers } from "ethers";
const SellModal2 = ({
  open,
  close,
  item,
}) => {

  const [value, setValue] = useState(0);



  const Bid =async () => {
 try{
  let signer = await loadProvider();
  let Auc = new ethers.Contract(Auctions, auctionAbi, signer);
  let contract = new ethers.Contract(
    marketPlace,
    marketPlaceAbi,
    signer
  );
  let items = await contract.tokenItemId(item.address, item.token_id);
  let bid = await Auc.bid(items.toString(),  {value: ethers.utils.parseEther(value)})
  console.log("BID",bid)
  setValue("")
 }catch(err) {
  console.log("ERROR OF FAILED BID",err)
 }

  }

  return (
    <Fragment>

      {open && (
        <div
          id="defaultModal"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center bg-gray-600 bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-4xl h-full md:h-auto mx-auto ">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 bg-gradient-to-t from-gray-100 ">
              <div className="flex justify-between items-start p-4 rounded-t mb-5">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mx-auto mt-4">
                  Enter Your Bid
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="defaultModal"
                  onClick={close}
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
               
                    <hr className="m-0" />
                    <Tab.Panels>
                      <Tab.Panel>
                        <div className="mx-auto mt-6 mb-6">
                          {/* <form
                            className="space-y-6 text-sm"
                            // onSubmit={handleSale}
                          > */}
                          <div className="relative">
                            <input
                              type="number"
                              name="reservePrice"
                              id="reservePrice"
                              className=" block w-full p-2.5 focus:outline-none border-b-2 bg-transparent"
                              placeholder="Enter your Bid"
                                onChange={(e)=>setValue(e.target.value)}
                                value={value}
                              required
                            />
                            <label className="absolute right-0 top-2 font-medium">
                              ETH
                            </label>
                            <p className="float-right mt-0 text-sm">$123</p>
                          </div>

                          <div className="p-3 pb-10 bg-yellow-50 text-sm">
                           
                          </div>
                          <div className="flex pt-3">
                            <button
                              type="button"
                             
                              onClick={close}
                              className="hover:bg-black hover:shadow-lg hover:text-white focus:ring-2 focus:outline-none font-medium rounded text-sm px-10 py-2.5 text-center uppercase "
                            >
                              Nevermind
                            </button>
                            <button
                              type="submit"
                              className="ml-auto text-white bg-black hover:shadow-lg focus:ring-2 focus:outline-none font-medium rounded text-sm px-10 py-2.5 text-center uppercase "
                             
                             
                              onClick={Bid}
                            >
                              Confirm
                            </button>
                          </div>
                          {/* </form> */}
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

    </Fragment>
  );
};

export default SellModal2;
