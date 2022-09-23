/* eslint-disable @next/next/no-img-element */
import { Tab } from "@headlessui/react";
import { NftMeta } from "@_types/nft";
import { useWeb3React } from "@web3-react/core";
import type { NextPage } from "next";
import { Fragment, useState, useEffect } from "react";
import apis from "../../services/index";
import NftItem from "../../components/nft-item";
import Link from "next/link";
import { nfts } from "../../content/meta";

const MarketPlace: NextPage = () => {
  const [cTab, setCTab] = useState(0);
  const tabs = [
    { id: 0, title: "All (683)" },
    { id: 1, title: "Live Auctions (3)" },
    { id: 2, title: "New Additions (11)" },
  ];
  const [assets, setAssets] = useState([]);
  const [loader, setLoader] = useState(false);
  const { account } = useWeb3React();
  useEffect(() => {
    console.log(account, "################");
    if (account) {
      (async () => {
        try {
          setLoader(true);
          let response = await apis.getNfts();
          setAssets(response.data.assets);
          console.log(response.data.assets);
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, [account]);

  return (
    <Fragment>
      <div className="my-14">
        <h1 className="mb-0 text-6xl font-grotesk font-bold">Market</h1>
        <p className="mt-2">Explore and collect rare digital art.</p>
      </div>

      <div className="flex">
        <div className="ml-2 pb-2 border-b-2 border-black">
          <select className="w-24">
            <option value="artWork">Art Work</option>
          </select>
        </div>
        <div className="ml-8 pb-2 border-b-2 border-black">
          <select className="w-24">
            <option value="RecentlyActive">Artists</option>
          </select>
        </div>
        <div className="invisible lg:visible ml-2 pb-2 right-10 absolute">
          <div className="flex">
            <div className="text-sm text-gray-400 pt-1 mr-2">
              40,350 Results
            </div>
            <select className="border-b-2 border-black">
              <option value="RecentlyActive">Recently Active</option>
              <option value="EndingSoon">Ending Soon</option>
              <option value="LowestPrice">Lowest Price</option>
              <option value="HighestPrice">Highest Price</option>
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-12 max-w-lg mx-auto grid gap-2 lg:grid-cols-3 lg:max-w-none">
        {assets.map((nft, idx) => {
          const {
            image_url,
            name,
            description,
            schema_name,
            token_id,
            creator: { address: creatorAddress },
            owner: { address: ownerAddress },
            asset_contract: { address },
          } = nft;
          const marketNftItem = {
            coverImage: image_url,
            name,
            createdBy: creatorAddress,
            ownBy: ownerAddress,
            description,
            schema_name,
            address,
            token_id,
          };

          return (
            <div
              key={idx}
              className="flex flex-col overflow-hidden mb-10 sm:mb-5"
            >
              <Link
                href="/nft-item"
                // as={`/market-place/${marketNftItem.token_id}`}
              >
                <a>
                  <NftItem item={marketNftItem} />
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};
export default MarketPlace;
