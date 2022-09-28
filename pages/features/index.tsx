/* eslint-disable @next/next/no-img-element */
import { Tab } from "@headlessui/react";
import type { NextPage } from "next";
import { Fragment, useState } from "react";
// import NftItem from "../../components/nft-item";
// import { NftMeta } from "../../types/nft";
import { exhibitions } from "../../content/exhibitions";

const Features: NextPage = () => {
  const [cTab, setCTab] = useState(0);
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    <Fragment>
      <div className="my-14 text-center">
        <h1 className="mb-0 text-6xl font-grotesk font-bold">Features</h1>
        <p className="mt-2">Exhibitions, projects, and special releases</p>
      </div>

      {exhibitions.map((ex, i) => (
        <div key={i} className="md:grid md:grid-cols-3 gap-8">
          <div className="flex items-start  sm:hidden">
            <div className="text-4xl font-eksell">
              {ex.startDate.split("-").pop()}
            </div>
            <div className=" pl-2 uppercase text-sm">
              {month[+ex.startDate.split("-")[1] - 1]}
            </div>
          </div>
          <div className="col-span-2">
            <img src={ex.coverImage} alt="" className="" />
          </div>
          <div className=" font-groteskMedium">
            <div className="flex items-start invisible sm:visible">
              <div className="text-4xl font-eksell">
                {ex.startDate.split("-").pop()}
              </div>
              <div className=" pl-2 uppercase text-sm">
                {month[+ex.startDate.split("-")[1] - 1]}
              </div>
            </div>
            <h1 className="text-4xl py-12 leading-10">{ex.exhibitionName}</h1>
            <div>
              <div className="pt-5 border-t border-black text-sm">
                <div className="uppercase text-xs mb-2">Featured Artists</div>
                <div className="flex flex-wrap font-grotesk">
                  {ex.featuredArtists.map((tg) => (
                    <div className="mr-1" key={tg.username}>
                      {tg.username},
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-4  font-grotesk">
                <div className="text-xs uppercase mb-3">Curators</div>
                <div className="flex flex-wrap">
                  {ex.curators.map((cu) => (
                    <div key={cu.username} className="mr-2">
                      {cu.username},
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
};
export default Features;
