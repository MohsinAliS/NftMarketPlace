/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { Fragment } from "react";
import FeaturedItems from "../components/featured-items/FeaturedItems";

const Home: NextPage = () => {
  return (
    <Fragment>
      <FeaturedItems />
      <div className="max-w-lg mx-auto grid gap-2 lg:grid-cols-4 lg:max-w-none mt-5 bg-black text-white p-12  -ml-10 -mr-10 font-grotesk">
        <div className="border-l-2 pl-4 mb-8">
          <h4 className="text-2xl mb-2 leading-6 w-4/5">
            The future of art collecting
          </h4>
          <p className="leading-5">
            Browse and build your collection of the world’s most cutting-edge
            digital art
          </p>
        </div>
        <div className="border-l-2 pl-4 mb-8">
          <h4 className="text-2xl mb-2 leading-6 w-4/5">
            Pioneering art market royalties
          </h4>
          <p className="leading-5">
            Artists receive continuous royalties for all secondary sales on
            their artworks – forever
          </p>
        </div>
        <div className="border-l-2 pl-4 mb-8">
          <h4 className="text-2xl mb-2 w-4/5">Built for longevity</h4>
          <p className="leading-5">
            All transactions happen on-chain, creating a tamper-proof record of
            each artwork’s history
          </p>
        </div>
        <div className="">
          <a
            className="border-2 border-white p-2 rounded mt-auto hover:bg-white hover:text-black"
            href="/about"
          >
            Learn more
          </a>
        </div>
      </div>

      <div className="mt-12 mb-5">
        <div className="max-w-lg mx-auto grid gap-2 sm:grid-cols-2 lg:max-w-none sm:w-4/5">
          <div className="text-sm font-medium  text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
              <li className="w-1/2">
                <a className="inline-block p-4 text-lg text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500 uppercase">
                  following
                </a>
              </li>

              <li className="w-1/2 border-b-4">
                <a
                  href="#"
                  className="inline-block p-4  text-lg rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 uppercase"
                >
                  For you
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <img
                src="/assets/images/lady-with-cap.png"
                alt=""
                className="rounded shadow-2xl"
              />
            </div>
          </div>
          <div className="p-2 mx-auto">
            <div className="TitleWrapper-sc-s3eox6-1 kwsOsr">
              <img
                src="data:image/gif;base64,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"
                alt="live-indicator"
              />
              <p className="Title-sc-s3eox6-2 UUVLa">Live Auctions</p>
              <img
                src="/assets/images/lady-with-cap.png"
                alt=""
                className="rounded shadow-2xl w-40"
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
