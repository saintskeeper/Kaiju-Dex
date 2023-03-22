import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { WagmiConfig, createClient, useBalance } from "wagmi";
import { configureChains, mainnet } from "@wagmi/core";
import { publicProvider } from "@wagmi/core/providers/public";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { PersonFill } from "styled-icons/bootstrap";
import { SearchAlt } from "styled-icons/boxicons-regular";
import {
  CatchingPokemon,
  Explore,
  Settings,
} from "styled-icons/material-twotone";
import { useAccount } from "wagmi";

const { provider, chains } = configureChains([mainnet], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "KaijuDex",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const kaijuContract = "0x...";
const scientistContract = "0x...";
const mutantContract = "0x...";

function MyApp({ Component, pageProps }: AppProps) {
  const { address, connector, isConnected } = useAccount();
  return (
    <div className="bg-[#262829]">
      <Head>
        <meta property="og:title" content="WKaijuDex" key="ogtitle" />
        <meta
          property="og:description"
          content="Finding work for Kingz"
          key="ogdesc"
        />
        <meta property="og:image" content="" key="ogimage" />
        <title>KaijuDex</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          theme={darkTheme({
            accentColor: "#7b3fe4",
            accentColorForeground: "white",
            borderRadius: "large",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          <div className="place-items-center max-w-[1400px] mx-auto">
            <div className="flex">
              <div className="bg-[#202124] border border-l-0 border-y-0 border-[#1d1e20] w-[300px] hidden md:flex md:flex-col h-screen text-white p-5 space-y-5">
                <div className="flex space-x-2 mb-10">
                  <CatchingPokemon className="w-7 animate-spin" />
                  <Link href="/">
                    <h1 className="font-mono text-2xl font-bold tracking-wider hover:scale-105 cursor-pointer active:scale-95 duration-100">
                      KAIJUDEX
                    </h1>
                  </Link>
                </div>
                <div className="font-sans font-bold flex space-x-2 place-content-center mx-auto py-3 px-5 w-full bg-[#1A1B1F] cursor-pointer duration-100 rounded-full">
                  <Explore className="w-5" />
                  <h1 className="">Explore</h1>
                </div>
              </div>
              <div className="bg-[#202124] w-full h-screen text-white p-5 space-y-5">
                <div className="flex space-x-3 place-items-center">
                  <div className="w-[20rem] bg-[#2e3031] h-8 rounded-full py-1 px-3 mr-auto flex">
                    <SearchAlt className="w-5 my-auto" />
                    <input
                      type={"text"}
                      placeholder="Search"
                      className="w-[85%] mx-auto flex bg-transparent border-none outline-none font-sans text-sm"
                    ></input>
                  </div>
                  <div className="bg-[#1A1B1F] hover:scale-110 p-2 font-sans font-bold rounded-full flex hover:cursor-pointer duration-100 active:scale-95 place-content-center space-x-1">
                    <Settings className="w-5 mx-auto my-auto" />
                  </div>
                  <div className="bg-[#1A1B1F] hover:scale-110 p-2 font-sans font-bold rounded-full flex hover:cursor-pointer duration-100 active:scale-95 place-content-center space-x-1">
                    <Link
                      href={"/" + address}
                      className="w-5 mx-auto my-auto flex"
                    >
                      <PersonFill />
                    </Link>
                  </div>
                  <ConnectButton showBalance={false} />
                </div>
                {isConnected ? (
                  <Component {...pageProps} />
                ) : (
                  <h1 className="font-mono text-xl">
                    Connect Wallet For Access
                  </h1>
                )}
              </div>
            </div>
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default MyApp;
