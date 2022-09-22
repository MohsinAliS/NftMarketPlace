import React from "react";
import { useRouter } from "next/router";
import NftItem from "../nft-item/index";
function MarketNft() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <NftItem />
    </div>
  );
}

export default MarketNft;
