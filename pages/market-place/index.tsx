/* eslint-disable @next/next/no-img-element */
import { Tab } from "@headlessui/react";
import { NftMeta } from "@_types/nft";
import { Contract, ethers } from "ethers";
import type { NextPage } from "next";
import marketPlaceAbi from "../../contract-abi/marketplace.json";
import { ERC20, marketPlace, NFTContract } from "../../contract-abi/addresses";
import { useWeb3React } from "@web3-react/core";
import { Fragment, useState, useEffect } from "react";
import loadProvider from "../../utils/loadProvider";
import apis from "../../services/index";
import NftItem from "../../components/nft-item-common";
import Link from "next/link";
// import { nfts } from "../../content/meta";

const MarketPlace: NextPage = () => {
  const [cTab, setCTab] = useState(0);
  const tabs = [
    { id: 0, title: "All (683)" },
    { id: 1, title: "Live Auctions (3)" },
    { id: 2, title: "New Additions (11)" },
  ];
  const [assets, setAssets] = useState([]);
  const [loader, setLoader] = useState(false);
  console.log("assets",assets)
  const { connector, library, account, chainId, activate, deactivate, active } =
    useWeb3React();
  const fetchMarket = async () => {
    let signer = await loadProvider();
    let contract = new ethers.Contract(
      // RareBazaar_addr,
      // supareRareBazar,
      marketPlace,
      marketPlaceAbi,
      signer
    );
    setLoader(true);
    let response = await apis.getProfileAssets(marketPlace);
    // let response = await contract.fetchMarketItems();
    // let nftAddress = response[1][1];
    setAssets(response.data.assets);
    //  console.log(response.data.assets);
    console.log("Checing", response.data.assets);
  };

  // const getURI = async (nftAddress, type) => {
  //   let signer = await loadProvider();
  //   let contract = new ethers.Contract(
  //     // RareBazaar_addr,
  //     // supareRareBazar,
  //     marketPlace,
  //     marketPlaceAbi,
  //     signer
  //   );
  //   try {
  //     if (type === 0) {
  //       return await
  //     } else {

  //     }
  //   } catch (error) {
  //     console.log("getURI", error);
  //   }
  // };
  useEffect(() => {
    console.log(account, "################");
    if (account) {
      (async () => {
        try {
          fetchMarket();
          // let sellNow = await contract.transferNFT(
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
            token_id,
            creator: { address: creatorAddress },
            owner: { address: ownerAddress },
            asset_contract: { address },
            asset_contract: { schema_name },
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
              {/* <Link
                href={{ pathname: "/nft-item", query: marketNftItem}}
                as={`/market-place/${marketNftItem.token_id}`}
              > */}

              <NftItem item={marketNftItem} />

              {/* </Link> */}
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};
export default MarketPlace;
