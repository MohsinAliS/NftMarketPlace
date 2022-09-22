/* eslint-disable react/no-unescaped-entities */
import type {NextPage} from "next";
import {Fragment, useEffect, useState} from "react";
import {useWeb3React} from "@web3-react/core";
import {connectWallet} from '../../utils/connectWallet'
import {useEagerConnect, useInactiveListener} from "../../hooks/useEagerConnect"
import {useRouter} from "next/router";

const SignIn: NextPage = () => {
    const { activate,  active } = useWeb3React();

    const [message, setMessage] = useState('');
    const router = useRouter();

    useEagerConnect(setMessage)
    useInactiveListener();
    console.log(message);

    useEffect(() => {
        if (active) {
            router.push('/profile')
        }
    }, [active]);


    return (
        <Fragment>
            <div className="text-center align-middle">
                {/* <Row>
          <Col sm={{ span: 6, offset: 3 }}>
            <h2>Welcome! Let's begin with your wallet.</h2>
            <Button
              onClick={connect}
              variant="dark"
              size="md"
              className="mt-3 mb-3 text-upper pd-1 btn-block">
              Select A Wallet
            </Button>
            <a as={Link} to="#" className="text-dark clickable">
              First time setting up a wallet?
            </a>
          </Col>
        </Row> */}

                <div className="sm:grid sm:grid-cols-6 sm:gap-4">
                    <div className="col-start-2 col-span-4">
                        <h2 className=" text-lg mt-12">
                            Welcome! Let's begin with your wallet.
                        </h2>
                        {
                            active
                                ? (
                                    <button
                                        className="mt-3 mb-3 uppercase btn-block bg-black text-white rounded p-3 hover:shadow-lg"
                                        onClick={() => connectWallet(activate, setMessage)}
                                    > Wallet is Connected </button>
                                ) :
                                <button
                                    className="mt-3 mb-3 uppercase btn-block bg-black text-white rounded p-3 hover:shadow-lg"
                                    onClick={() => connectWallet(activate, setMessage)}>Select A Wallet</button>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
export default SignIn;
