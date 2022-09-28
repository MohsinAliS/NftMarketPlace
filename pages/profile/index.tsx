/* eslint-disable react/no-unescaped-entities */
import { Tab } from "@headlessui/react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import apis from "../../services";
import NftItem from "../../components/nft-item-common";

const Profile: NextPage = () => {
  const [cTab, setCTab] = useState(0);
  const [collections, setCollections] = useState([]);
  const [loader, setLoader] = useState(false);
  const tabs = [
    { id: 0, title: "Collection(0)" },
    { id: 1, title: "Favorites (0)", disabled: true },
    { id: 2, title: "About" },
  ];

  const { account } = useWeb3React();

  useEffect(() => {
    if (account) {
      (async () => {
        console.log(account, "################");
        try {
          setLoader(true);
          const response = await apis.getProfileAssets(account); //account is parameter
          if (response.status === 200) {
            // Console.log(response.data)
            setCollections(response.data.assets);
            console.log(response.data.assets);
            setLoader(false);
          }
        } catch (e) {
          console.error("Error Occurred while fetching collections", e);
          setLoader(false);
        }
      })();
    }
  }, [account]);

  console.log(collections);

  return (
    <Fragment>
      <div className="mt-5">
        <div className="lg:grid lg:grid-cols-12 gap-4 mt-10">
          <div className="col-span-7">
            <div className="grid grid-cols-5 gap-4">
              <div>
                <Image
                  src="/assets/images/user.svg"
                  width="100%"
                  height="100%"
                  alt=""
                />
              </div>
              <div>
                <h1 className="text-3xl font-medium">@username</h1>
              </div>
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex py-10">
              <div>
                0 <p className="mt-2">Followers</p>
              </div>
              <div className="ml-5">
                0 <p className="mt-2">Following</p>
              </div>
            </div>
            <button className="mt-3 hover:bg-black hover:text-white py-2 px-4 border border-gray-700 rounded-full w-full">
              Edit profile
            </button>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "96px" }}>
        <Tab.Group>
          <Tab.List className="flex">
            {tabs.map((t) => (
              <Tab
                key={t.id}
                onClick={() => setCTab(t.id)}
                className={`mr-5 text-gray-300 ${
                  cTab === t.id ? " border-b-2 border-black text-black" : ""
                }`}
                disabled={t.disabled}
              >
                <h3 className="p-1">{t.title}</h3>
              </Tab>
            ))}
            <div className="absolute lg:right-14 -mt-9 lg:mt-0 sm:mt-0 sm:right-1 ">
              <select>
                <option value="newestFirst">Newest</option>
                <option value="highestSales">Oldest</option>
                <option value="numberOfCollectors">Lowest Price</option>
                <option value="numberOfArtworks">Highest Price</option>
              </select>
            </div>
          </Tab.List>
          <hr className="m-0" />
          <Tab.Panels>
            <Tab.Panel>
              {loader ? (
                <h1>Loading Collections</h1>
              ) : (
                <div className="mt-12 max-w-lg mx-auto grid gap-2 lg:grid-cols-3 lg:max-w-none">
                  {collections?.length > 0 ? (
                    collections.map((collection, idx) => {
                      const {
                        image_url,
                        name,
                        description,

                        token_id,
                        creator: { address: creatorAddress },
                        owner: { address: ownerAddress },
                        asset_contract: { address },
                        asset_contract: { schema_name },
                      } = collection;
                      const item = {
                        coverImage: image_url,
                        name,
                        description,
                        schema_name,
                        address,
                        token_id,
                        createdBy: creatorAddress,
                        ownBy: ownerAddress,
                        // collected: true,
                        // isAuction: false,
                      };

                      return <NftItem key={idx} item={item} />;
                    })
                  ) : (
                    <div className="mt-12 max-w-lg mx-auto grid gap-2 lg:grid-cols-3 lg:max-w-none pb-20">
                      <div className="w-full">
                        <p className="my-2">
                          Looks like there's nothing in this collection yet!
                        </p>
                        <p className="mt-5">
                          Start collecting by exploring the{" "}
                          <Link href="/market-place">
                            <a className="text-blue-500">market page</a>
                          </Link>
                          .
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Tab.Panel>
            <Tab.Panel>
              <div className="mt-12 max-w-lg mx-auto grid gap-2 lg:grid-cols-3 lg:max-w-none pb-20">
                2
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="mt-12 max-w-lg mx-auto grid gap-2 lg:grid-cols-3 lg:max-w-none pb-20">
                <div className="w-full">
                  <p className="my-2">Looks like there is nothing here yet!</p>
                  <p className="mt-5">
                    You can fill in your “About” section
                    <Link href="#">
                      <a className="text-blue-500"> here</a>
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </Fragment>
  );
};

export default Profile;
