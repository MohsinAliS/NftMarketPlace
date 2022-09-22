/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {Fragment, useEffect, useState} from "react";
import styles from "../../styles/Home.module.css";
import {useWeb3React} from "@web3-react/core";
import {useEagerConnect, useInactiveListener} from "../../hooks/useEagerConnect";
import {connectWallet} from "../../utils/connectWallet";

export default function NavBar() {
  const { active } = useWeb3React();
  const [navbar, setNavbar] = useState(false);
  const [menuState, setMenuState] = useState({
    open: false,
    title: null,
  });

  useEffect(() => {}, [active]);

  const links = [
    {
      title: "Art",
      url: "/",
      subMenu: [
        { title: "Market", url: "/market-place" },
        { title: "Series", url: "/series" },
        { title: "Features", url: "/features" },
      ],
    },
    { title: "Community", url: "/" },
    { title: "Magazine", url: "/" },
    { title: "Shop", url: "/" },
    !active ? {
      title: "Sign In", url: "sign-in", fontClass: "font-medium"
    } : {
      title: "User",
      url: "/",
      imageUrl: "/assets/images/user.svg",
      isImgOnly: true,
      subMenu: [
        { title: "Profile", url: "/profile" },
        { title: "Dashboard", url: "/dashboard" },
        { title: "Settings", url: "/settings" },
        { title: "Sign Out", url: "/sign-in" },
      ],
    }
  ];

  const navbarClickHandler = () => {
    setNavbar(!navbar);
    setMenuState({
      open: false,
      title: null,
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    const { title } = event.currentTarget;
    setMenuState({
      open: !(menuState.open && title === menuState.title),
      title: title,
    });
  };

  return (
    <nav className="w-full bg-white">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link href="/">
              <a className="inline-flex items-center p-2 mr-4 ">
                <span className="text-xl tracking-wide">NFT Market</span>
              </a>
            </Link>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={navbarClickHandler}>
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}>
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              {links.map((m, i) => (
                <div key={m.title} className="py-2">
                  {!m.subMenu && (
                    <Link href={m.url}>
                      <a
                        href={m.url}
                        className={`hover:cursor-pointer hover:bg-gray-100 p-1 hover:rounded ${m.fontClass}`}>
                        {m.title}
                      </a>
                    </Link>
                  )}

                  {m.subMenu && (
                    <Link href="">
                      <li
                        key={m.title}
                        className="text-gray-600 hover:text-blue-600"
                        onClick={handleClick}
                        title={m.title}>
                        {m.isImgOnly ? (
                          <img
                            src={m.imageUrl}
                            alt=""
                            className="cursor-pointer hover:bg-gray-100 p-1 hover:rounded"
                          />
                        ) : (
                          <a
                            href={m.url}
                            className={`hover:cursor-pointer hover:bg-gray-100 p-1 hover:rounded ${m.fontClass}`}>
                            {m.title}
                          </a>
                        )}

                        {m.subMenu && (
                          <ul
                            className={` ${
                              m.title === menuState.title && menuState.open
                                ? ""
                                : "hidden"
                            } ${styles.gVUzae} ${
                              i == links.length - 1 ? "right-3" : ""
                            } `}>
                            {m.subMenu?.map((sm) => (
                              <Link href={sm.url} key={sm.title}>
                                <a>
                                  <li className="p-1 hover:bg-gray-100 hover:rounded">
                                    {sm.title}
                                  </li>
                                </a>
                              </Link>
                            ))}
                          </ul>
                        )}
                      </li>
                    </Link>
                  )}
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
