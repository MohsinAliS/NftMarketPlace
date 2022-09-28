import loadProvider from "utils/loadProvider";
import React, { Fragment, useState } from "react";
import { Tab } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
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
const SellModal = ({
  open,
  close,
  address,
  createMarketItemFunc,
  createMarketItemFuncWithPlaceBid,
  setSalePrice,
  item,
}) => {
  const [showStartAuction, setShowStartAuction] = useState(false);
  // const [showSetListPrice, setShowSetListPrice] = useState(open);
  const [cTab, setCTab] = useState(0);
  const [inputprice, setinPutSalePrice] = useState("");
  const [inputTime, setInputTime] = useState(0);
  console.log("input", inputTime);
  console.log("inputprice", inputprice);
  console.log("type of", typeof inputTime);
  console.log("type of", typeof inputprice);
  const today = new Date().toISOString().split("T")[0];
  // const router = useRouter();
  // const routerdata = router.asPath;
  // console.log(routerdata);
  const handleSale = () => {
    // e.preventDefault();
    if (cTab === 1) {
      setSalePrice(inputprice);
      createMarketItemFuncWithPlaceBid(inputTime);
    } else {
      setSalePrice(inputprice);
      createMarketItemFunc();
    }
    // createMarketItemFunc();
  };
  const setStartAuctionHandler = (e) => {
    e.preventDefault();
    console.log(inputprice);
  };
  const setScheduleAuctionHandler = (e) => {
    e.preventDefault();
    console.log("hi");
  };

  console.log("sellmodal", open);
  // console.log("price", price);

  return (
    <Fragment>
      {/* <Row>
        <Col md="4">
 
          <Modal isOpen={open} toggle={close}>
            <div className=" modal-body p-0">
              <Card className=" bg-secondary shadow border-0">
                <CardBody className=" px-lg-5 py-lg-5">
                  <div className=" text-center text-muted mb-4">
                    <small>Or sign in with credentials</small>
                  </div>
                  <Form role="form">
                    <FormGroup className=" mb-3">
                      <InputGroup className=" input-group-alternative">
                        <Input
                          placeholder="Amount"
                          type="text"
                          onChange={(e) => setinPutSalePrice(e.target.value)}
                        ></Input>
                      </InputGroup>
                    </FormGroup>

         
                    <div className=" text-center">
                      <Button
                        className=" my-4"
                        color="primary"
                        type="button"
                        onClick={handleSale}
                      >
                        Sell Now
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </div>
          </Modal>
        </Col>
      </Row> */}

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
                  Configure your Sale
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="defaultModal"
                  // onClick={() => setShowStartAuction(false)}
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
                    <Tab.List className="flex">
                      <Tab
                        onClick={() => setCTab(0)}
                        className={`w-1/2 font-medium text-gray-300 ${
                          cTab === 0
                            ? " border-b-2 border-black text-black"
                            : ""
                        }`}
                      >
                        <h3 className="pb-1">Fixed Price List</h3>
                        {/* if  reserve change it price */}
                      </Tab>
                      <Tab
                        onClick={() => setCTab(1)}
                        className={`w-1/2 font-medium text-gray-300 ${
                          cTab === 1
                            ? " border-b-2 border-black text-black"
                            : ""
                        }`}
                      >
                        <h3 className="pb-1">Set Auction</h3>
                      </Tab>
                    </Tab.List>
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
                              type="text"
                              name="reservePrice"
                              id="reservePrice"
                              className=" block w-full p-2.5 focus:outline-none border-b-2 bg-transparent"
                              placeholder="Set Price"
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
                              An auction style pioneered by the artist{" "}
                              <span className="underline">
                                {item?.createdBy}
                              </span>
                              , the artwork will immediately be available for
                              bidding starting at the reserve price, without a
                              time limit. When the reserve is met, a 24-hour
                              timed auction will begin, with 15 minute extension
                              in the final 15 minutes.
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
                              // onClick={() => setShowStartAuction(false)}
                              onClick={close}
                              className="hover:bg-black hover:shadow-lg hover:text-white focus:ring-2 focus:outline-none font-medium rounded text-sm px-10 py-2.5 text-center uppercase "
                            >
                              Nevermind
                            </button>
                            <button
                              type="submit"
                              className="ml-auto text-white bg-black hover:shadow-lg focus:ring-2 focus:outline-none font-medium rounded text-sm px-10 py-2.5 text-center uppercase "
                              onClick={handleSale}
                            >
                              Set Price
                            </button>
                          </div>
                          {/* </form> */}
                        </div>
                      </Tab.Panel>
                      <Tab.Panel>
                        <div className="mx-auto mt-6 mb-6">
                          {/* <form
                            className="space-y-6 text-sm"
                        
                          > */}
                          {/* <div className="sm:grid sm:grid-cols-2 gap-1">
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
                            </div> */}
                          <div className="relative">
                            <input
                              type="number"
                              name="startTime"
                              id="startTime"
                              required
                              className=" block w-full p-2.5 focus:outline-none border-b-2 bg-transparent"
                              placeholder="Time Duration (Minutes)"
                              onChange={(e) => {
                                setInputTime(Number(e.target.value));
                              }}
                            />
                            <label className="absolute right-0 top-2 font-medium">
                              Minutes
                            </label>
                          </div>

                          <div className="relative">
                            <input
                              type="text"
                              name="startPrice"
                              id="startPrice"
                              className=" block w-full p-2.5 focus:outline-none border-b-2 bg-transparent"
                              placeholder="Starting Price "
                              onChange={(e) => {
                                setinPutSalePrice(e.target.value);
                              }}
                            />
                            <label className="absolute right-0 top-2 font-medium">
                              ETH
                            </label>
                            <p className="float-right mt-0 text-sm">$123</p>
                          </div>
                          <div className="p-3 pb-10 bg-yellow-50 text-sm">
                            <p className="text-black">
                              Timer will count down to the start of the auction,
                              at which point bidding will become available and
                              the timer will count down to the auction end. If
                              you select a starting price, bids must at least
                              meet it.
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
                              // onClick={() => setShowStartAuction(false)}
                              onClick={close}
                              className="hover:bg-black hover:shadow-lg hover:text-white focus:ring-2 focus:outline-none font-medium rounded text-sm px-10 py-2.5 text-center uppercase "
                            >
                              Nevermind
                            </button>
                            <button
                              type="submit"
                              onClick={handleSale}
                              className="ml-auto text-white bg-black hover:shadow-lg focus:ring-2 focus:outline-none font-medium rounded text-sm px-10 py-2.5 text-center uppercase "
                            >
                              Sell
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

      {/* {open && (
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
                  // onClick={() => setShowSetListPrice(false)}
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
                          onClick={close}
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

export default SellModal;
