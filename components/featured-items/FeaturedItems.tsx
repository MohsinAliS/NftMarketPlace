/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { Fragment } from "react";
// import "./featured-item.scss";

const FeaturedItems = (props) => {
  return (
    <Fragment>
      <div
        id="featured-section"
        className="max-w-lg mx-auto grid gap-2 lg:grid-cols-2 lg:max-w-none mt-3">
        <div className="sm:mx-auto text-center sm:text-left">
          <h1 className="text-5xl sm:text-7xl font-eksell mt-10">
            Collect <br />
            digital art
          </h1>
          <p className="text-lg font-grotesk sm:text-xl">
            Buy and sell NFTs from the world’s top artists
          </p>
          <button className="invisible bg-black text-white py-5 px-10 mt-14 rounded uppercase font-bold md:visible hover:shadow-xl hover:shadow-indigo-300">
            Start Collecting
          </button>
        </div>
        <div className="mt-2 mb-2">
          <div className="flex w-full">
            {/* <h3 className="text-sm font-medium">FEATURED ART</h3> */}
            {/* <p>FEATURED ART</p> */}
            <div className="object-fill mx-auto sm:ml-1">
              <Link href="/nft-item">
                <a>
                  <img
                    src="/assets/images/lady-with-cap.png"
                    alt=""
                    className="rounded shadow-2xl sm:w-60"
                  />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-10">
        <button className=" mx-auto visible bg-black text-white py-5 px-10 rounded uppercase font-bold md:invisible hover:shadow-xl hover:shadow-indigo-300">
          Start Collecting
        </button>
      </div>
    </Fragment>
  );
};

export default FeaturedItems;

// <div className="relative pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
//   <div className="absolute inset-0">
//     <div className="bg-white h-1/3 sm:h-2/3" />
//   </div>
//   <div className="relative">
//     <div className="text-center">
//       <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
//         888 NFT Market
//       </h2>
//       <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
//         Mint a NFT to get unlimited ownership forever!
//       </p>
//     </div>
//   </div>
// </div>
