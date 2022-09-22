import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Fragment } from "react";
import Navbar from "../components/ui/Navbar";
import Modal from "../components/modal/SellModal";
import BaseLayout from "../components/ui/layout/BaseLayout";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "../utils/web3Library";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Navbar />
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </Web3ReactProvider>
    </Fragment>
  );
}

export default MyApp;
