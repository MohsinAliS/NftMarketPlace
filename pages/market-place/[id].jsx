import React from "react";
import { useRouter, withRouter } from "next/router";
import NftItem from "../nft-item/index";
function MarketNft({ item }) {
  console.log(item);
  const router = useRouter();
  const routerdata = router.query;
  console.log(routerdata);
  // const {
  //   image_url,
  //   name,
  //   description,
  //   schema_name,
  //   token_id,
  //   asset_contract: { address },
  // } = collection;
  // const item = {
  //   coverImage: image_url,
  //   name,
  //   createdBy: "",
  //   description,
  //   schema_name,
  //   address,
  //   token_id,
  //   // collected: true,
  //   // isAuction: false,
  // };
  return (
    <div>
      <NftItem item={item} />
    </div>
  );
}

export default MarketNft;
