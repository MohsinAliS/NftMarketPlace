/* eslint-disable @next/next/no-img-element */
import { Tab } from "@headlessui/react";
import { NextPage } from "next";
import { Fragment, useState } from "react";
import styles from "../../styles/Home.module.css";

const Dashboard: NextPage = () => {
  const [cTab, setCTab] = useState(0);
  const tabs = [
    { id: 0, title: "INCOMING" },
    { id: 1, title: "OUTGOING" },
  ];
  const ToolTip = () => {
    return (
      <img
        alt="tooltip"
        title="Distributed at the end of the each month "
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAANRJREFUOBGtlU0OgkAMhdHozsPpgkt5D/cehAuQuOYCutf3gTWoZUqaaVIg8346zJShafzYa7hVXpS98v5OnhkDg7MqTmLdlM8g4cBdjK2QszIy+sXRoP2LjJmZo/0Kpm5g9v55fRY3WjOrXiqGx7hR7FiJCGYR8dqdmEdjF+5z0wJt8qK3ospr8X4jM5r2UCorDB4RzfTh9s+kzV0xHHJSVzVg2LlQbrDD8JrTuqrRq3pjU6rqp2dzr3o4YMp6ZkzRoF0MXj86LGjw8ICdV2CjUr+AF6jAxh7otNGBAAAAAElFTkSuQmCC"
        style={{
          width: "10px",
          marginLeft: " 8px",
          position: "relative",
          top: "3px",
        }}
      />
    );
  };
  const items = [
    { title: "TOTAL # SALES", value: "0" },
    { title: "TOTAL SALES VALUE", value: "0 ETH" },
    { title: "ARTISTS COLLECTED", value: "0" },
    { title: "TOTAL # COLLECTED", value: "0" },
    { title: "TOTAL COLLECTED VALUE", value: "0 ETH" },
    { title: "COLLECTOR ROYALTIES EARNED", value: "0 ETH" },
    {
      title: "UNCLAIMED COLLECTOR ROYALTIES",
      value: "0 ETH",
      isToolTip: true,
      btnClaim: true,
    },
  ];

  return (
    <Fragment>
      <div>
        <div className="lg:grid lg:grid-cols-6 lg:gap-2 lg:pr-6 lg:pt-20 lg:pl-6">
          <div className="col-start-1 col-end-2">
            <div className="flex p-2">
              <h2 className="text-4xl font-grostek font-light">
                0.000<span>Ξ</span>
              </h2>
              <span className="pl-6 -mt-1 font-grotesk text-lg">$0</span>
            </div>
          </div>
          <div className="col-end-8 col-span-2 mt-5 lg:mt-0">
            <div
              className="flex mx-auto "
              style={{ justifyContent: "space-between", width: "160px" }}>
              <div className="flex flex-col items-center">
                <div className="mb-1.5">
                  <img src={"/assets/images/receive.svg"} alt="" />
                </div>
                <span className="text-xs">RECEIVE</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="mb-1.5">
                  <img src={"/assets/images/send.svg"} alt="" />
                </div>
                <span className="text-xs">SEND</span>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:grid lg:grid-cols-6 lg:gap-2 lg:pr-6 lg:pt-5 lg:pl-6">
          <div className="col-start-1 col-end-2">
            <div className="flex p-2">
              <h2 className="text-4xl font-grostek font-light">0 $RARE</h2>
            </div>
          </div>
          <div className="col-end-8 col-span-2 mt-5 lg:mt-0">
            <div
              className="flex mx-auto "
              style={{ justifyContent: "space-between", width: "160px" }}>
              <div className="flex flex-col items-center">
                <div className="mb-1.5">
                  <img src={"/assets/images/receive.svg"} alt="" />
                </div>
                <span className="text-xs">RECEIVE</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="mb-1.5">
                  <img src={"/assets/images/send.svg"} alt="" />
                </div>
                <span className="text-xs">SEND</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-6 pl-4 pr-0 lg:pt-16 lg:px-4">
        <div className="lg:grid lg:grid-cols-3 sm:grid sm:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              className={`flex flex-col items-start  mb-8 px-8 rounded ${styles.shadow1}`}
              style={{
                minHeight: "130px",
              }}>
              <div className="flex items-baseline">
                <p className="mt-8 mb-4 uppercase text-xs tracking-wider">
                  {item.title}
                </p>
                {item.isToolTip ? <ToolTip /> : ""}
              </div>

              <div className="mb-8 flex w-full items-center">
                <p className="text-3xl">{item.value}</p>
                {item.btnClaim ? (
                  <div className="mr-0 ml-auto w-fit ">
                    <button
                      disabled={true}
                      className="bg-gray-200 p-1 rounded text-sm border-2 border-gray-300">
                      Claim
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-4 pt-16 mx-auto">
        <h2 className="mb-8 text-3xl">Offers</h2>
        <Tab.Group>
          <Tab.List className="grid grid-cols-2">
            {tabs.map((t) => (
              <Tab
                key={t.id}
                onClick={() => setCTab(t.id)}
                className={`mr-5 text-gray-300  text-xl font-medium ${
                  cTab === t.id ? " border-b-2 border-black text-black" : ""
                }`}>
                <h3 className="p-1">{t.title}</h3>
              </Tab>
            ))}
          </Tab.List>
          <hr className="m-0" />
          <Tab.Panels>
            <Tab.Panel>
              <div className="w-full">
                <p
                  className="text-2xl text-center"
                  style={{ marginTop: "120px", marginBottom: "120px" }}>
                  No active offers
                </p>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="w-full">
                <p
                  className="text-2xl text-center"
                  style={{ marginTop: "120px", marginBottom: "120px" }}>
                  No active offers
                </p>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </Fragment>
  );
};

export default Dashboard;
