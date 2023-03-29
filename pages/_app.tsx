import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { WagmiConfig, createClient } from "wagmi";
import { configureChains, mainnet } from "@wagmi/core";
import { publicProvider } from "@wagmi/core/providers/public";
import {
  RainbowKitProvider,
  darkTheme,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import "@rainbow-me/rainbowkit/styles.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { News, SearchAlt } from "styled-icons/boxicons-regular";
import { CatchingPokemon, Explore } from "styled-icons/material-twotone";
import { useAccount } from "wagmi";
import {
  PersonFill,
  Question,
  QuestionCircleFill,
} from "styled-icons/bootstrap";

// custom components

const { provider, chains } = configureChains([mainnet], [publicProvider()]);

const connectors = connectorsForWallets([
  {
    groupName: "Currently Supported",
    wallets: [metaMaskWallet({ chains })],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  const { isConnected, address } = useAccount();
  return (
    <div className="">
      <Head>
        <meta property="og:title" content="WKaijuDex" key="ogtitle" />
        <meta
          property="og:description"
          content="Find the perfect match for your artistry or engineering skills with Kaiju-Dex: The ultimate platform for the KaijuKingz community."
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
            accentColor: "#832FA5",
            accentColorForeground: "white",
            borderRadius: "large",
            fontStack: "system",
            overlayBlur: "small",
          })}
          modalSize="compact"
        >
          <div className="place-items-center max-w-[1400px] mx-auto">
            <div className="flex-col flex">
              <div className="fixed w-full bg-[#46464611] backdrop-blur-3xl flex-row max-w-[1400px] mx-auto text-white p-2 flex space-x-5">
                <div className="flex mr-auto space-x-5 text-md">
                  <Link
                    href="/"
                    className="flex place-items-center text-[#832FA5] space-x-1 cursor-pointer "
                  >
                    <CatchingPokemon className="w-4 md:w-5 my-auto hover:animate-spin fill-[#b073c9] " />
                    <div className="text-xl font-black tracking-widest text-[#b073c9]">
                      KAIJUDEX
                    </div>
                  </Link>
                  <div className="bg-zinc-700 w-[2px] h-1/2 my-auto" />
                  <div className=" py-2 px-3 my-auto hover:bg-zinc-800 cursor-pointer duration-150 rounded-lg md:visible invisible">
                    <Link
                      href="/explore"
                      className="flex space-x-2 place-content-center"
                    >
                      <Explore className="w-3 md:w-4" />
                      <div className="">Explore</div>
                    </Link>
                  </div>
                  <div className=" py-2 px-3 my-auto hover:bg-zinc-800 cursor-pointer duration-150 rounded-lg md:visible invisible">
                    <Link
                      href="/news"
                      className="flex space-x-2 place-content-center"
                    >
                      <News className="w-3 md:w-4" />
                      <div className="">News</div>
                    </Link>
                  </div>
                  <div className="w-[20rem] bg-zinc-800 h-8 rounded-lg py-1 px-3 flex my-auto md:visible invisible">
                    <SearchAlt className="w-5 my-auto" />
                    <input
                      type={"text"}
                      placeholder="Search"
                      className="w-[85%] mx-auto flex bg-transparent border-none outline-none text-sm"
                    />
                  </div>
                </div>
                <div className="flex space-x-3 my-auto md:visible invisible text-md">
                  <div className="bg-zinc-800 hover:scale-110 p-2 place-items-center rounded-lg flex hover:cursor-pointer duration-100 active:scale-95">
                    <Link href={"/help"} className="w-5 h-5  flex">
                      <QuestionCircleFill />
                    </Link>
                  </div>
                  <div className="bg-zinc-800 hover:scale-110 p-2 place-items-center rounded-lg flex hover:cursor-pointer duration-100 active:scale-95">
                    <Link href={"/" + address} className="w-5 h-5 flex">
                      <PersonFill />
                    </Link>
                  </div>

                  <ConnectButton showBalance={false} />
                </div>
              </div>
            </div>
            <div className="mb-[5rem]" />
            <div className="p-4">
              <Component {...pageProps} />
            </div>
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default MyApp;
