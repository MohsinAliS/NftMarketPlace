/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Link from "next/link";
import { FunctionComponent } from "react";
import { NftMeta } from "../../types/nft";
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
  createdBy: string;
  ownBy: string;
  asset_contract: string;
};
type NftItemProps = {
  item: nftTypes;
};
const NftItem: FunctionComponent<NftItemProps> = ({ item }) => {
  console.log(
    "first 5 elements",
    item.createdBy.split("").slice(0, 5).join("")
  );
  console.log(
    "last 5 elements",
    item.createdBy
      .split("")
      .slice(Math.max(item.createdBy.length - 4, 0))
      .join("")
  );

  return (
    // <Link href="/nft-item">
    //   <a>
    <div className="max-w-xs border-slate-100 border-2 mx-auto">
      <div className="flex-shrink-0">
        <img
          className={`h-80 w-full object-cover`}
          src={item.coverImage}
          alt="New NFT"
        />
      </div>
      <div className="flex-1 bg-white p-4 flex flex-col justify-between">
        <div className="flex-1">
          <div className="block mt-1">
            <p className="text-xl font-semibold text-gray-900">{item.name}</p>
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
                {/* {item.ownBy} */}
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
    //   </a>
    // </Link>
  );
};

export default NftItem;
