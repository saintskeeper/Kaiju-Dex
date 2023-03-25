import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { WagmiConfig, createClient } from "wagmi";
import { configureChains, mainnet } from "@wagmi/core";
import { publicProvider } from "@wagmi/core/providers/public";
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { News, SearchAlt } from "styled-icons/boxicons-regular";
import { CatchingPokemon, Explore } from "styled-icons/material-twotone";
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

function MyApp({ Component, pageProps }: AppProps) {
  const { isConnected } = useAccount();
  return (
    <div className="bg-[#19191a]">
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
          theme={midnightTheme({
            accentColor: "#7b3fe4",
            accentColorForeground: "white",
            borderRadius: "large",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          <div className="place-items-center max-w-[1400px] mx-auto">
            <div className="flex-col flex">
              <div className="bg-[#19191a] fixed w-full flex-row max-w-[1400px] mx-auto text-white p-2 flex space-x-5">
                <div className="flex mr-auto">
                  <Link
                    href="/"
                    className="flex place-items-center text-[#832FA5] space-x-1 hover:scale-105 cursor-pointer active:scale-95 duration-100"
                  >
                    <CatchingPokemon className="w-5 my-auto animate-spin fill-[#b073c9] " />
                    <div className="text-xl font-black tracking-widest text-[#b073c9]">
                      KAIJUDEX
                    </div>
                  </Link>
                  <div className=" py-3 px-5 hover:bg-[#1a1b1fab] cursor-pointer duration-150 rounded-lg">
                    <Link
                      href="/explore"
                      className="flex space-x-2 place-content-center"
                    >
                      <Explore className="w-4" />
                      <div className="">Explore</div>
                    </Link>
                  </div>
                  <div className=" py-3 px-5 hover:bg-[#1a1b1fab] cursor-pointer duration-150 rounded-lg">
                    <Link
                      href="/news"
                      className="flex space-x-2 place-content-center"
                    >
                      <News className="w-5" />
                      <div className="">News</div>
                    </Link>
                  </div>
                  <div className="w-[20rem] bg-[#2e3031] h-8 rounded-lg py-1 px-3 flex my-auto">
                    <SearchAlt className="w-5 my-auto" />
                    <input
                      type={"text"}
                      placeholder="Search"
                      className="w-[85%] mx-auto flex bg-transparent border-none outline-none font-sans text-sm"
                    />
                  </div>
                </div>
                <div className="flex space-x-3 my-auto">
                  {/* <div className="bg-[#0e0f11] hover:scale-110 p-2 rounded-full flex hover:cursor-pointer duration-100 active:scale-95">
                    <Link
                      href={"/settings"}
                      className="w-5 h-5  mx-auto my-auto flex"
                    >
                      <Settings />
                    </Link>
                  </div>
                  <div className="bg-[#0e0f11] hover:scale-110 p-2 rounded-full flex hover:cursor-pointer duration-100 active:scale-95">
                    <Link
                      href={"/" + address}
                      className="w-5 h-5  mx-auto my-auto flex"
                    >
                      <PersonFill />
                    </Link>
                  </div> */}
                  <ConnectButton showBalance={false} />
                </div>
              </div>
            </div>
            <div className="mb-[5rem]" />
            <Component {...pageProps} />
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default MyApp;
