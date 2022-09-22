/* eslint-disable @next/next/no-img-element */
import { Tab } from "@headlessui/react";
import { NftMeta } from "@_types/nft";
import type { NextPage } from "next";
import { Fragment, useEffect, useState } from "react";
import NftItem from "../../components/nft-item-common";
// import { NftMeta } from "../../types/nft";
import {
  seriesDataAll,
  seriesDataLive,
  seriesDataNewAdditions,
} from "../../content/series-data.js";
type NftItemProps = {
  item: NftMeta;
};

const Series: NextPage = () => {
  const [cTab, setCTab] = useState(0);
  const tabs = [
    { id: 0, title: "All (683)" },
    { id: 1, title: "Live Auctions (3)" },
    { id: 2, title: "New Additions (11)" },
  ];
  return (
    <Fragment>
      <div className="my-14">
        <h1 className="mb-0 text-6xl font-grotesk font-bold">Series</h1>
        <p className="mt-2">
          Unique artworks, powered by custom smart contracts.
        </p>
      </div>

      <Tab.Group>
        <Tab.List className="flex">
          {tabs.map((t) => (
            <Tab
              key={t.id}
              onClick={() => setCTab(t.id)}
              className={`mr-5 text-gray-300 ${
                cTab === t.id ? " border-b-2 border-black text-black" : ""
              }`}>
              <h3 className="p-1">{t.title}</h3>
            </Tab>
          ))}
          <div className="absolute lg:right-14 -mt-9 lg:mt-0 sm:mt-0 sm:right-1 ">
            Sort by:
            <select>
              <option value="newestFirst">Newest First</option>
              <option value="highestSales">Highest Sales</option>
              <option value="numberOfCollectors">Number of Collectors</option>
              <option value="numberOfArtworks">Number of Artworks</option>
              <option value="priceFloorHighest">Price Floor (Highest)</option>
              <option value="priceFloorLowest">Price Floor (Lowest)</option>
              <option value="mostViewed">Most Viewed</option>
            </select>
          </div>
        </Tab.List>
        <hr className="m-0" />
        <Tab.Panels>
          <Tab.Panel>
            <div className="mt-12 max-w-lg mx-auto grid gap-2 lg:grid-cols-3 lg:max-w-none">
              {seriesDataAll.map((nft) => (
                <div
                  key={nft.image}
                  className="flex flex-col overflow-hidden mb-10 sm:mb-5">
                  <NftItem item={nft} />
                </div>
              ))}
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="mt-12 max-w-lg mx-auto grid gap-2 lg:grid-cols-3 lg:max-w-none">
              {seriesDataLive.map((nft) => (
                <div
                  key={nft.image}
                  className="flex flex-col overflow-hidden mb-10 sm:mb-5">
                  <NftItem item={nft} />
                </div>
              ))}
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="mt-12 max-w-lg mx-auto grid gap-2 lg:grid-cols-3 lg:max-w-none">
              {seriesDataNewAdditions.map((nft) => (
                <div
                  key={nft.image}
                  className="flex flex-col overflow-hidden mb-10 sm:mb-5">
                  <NftItem item={nft} />
                </div>
              ))}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </Fragment>
  );
};
export default Series;
