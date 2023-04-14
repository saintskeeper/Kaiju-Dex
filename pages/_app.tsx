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
import { News, Paperclip, SearchAlt } from "styled-icons/boxicons-regular";
import {
  CatchingPokemon,
  DocumentScanner,
} from "styled-icons/material-twotone";
import { useAccount } from "wagmi";
import { PersonFill, Question } from "styled-icons/bootstrap";
import Image from "next/image";

// custom components
// Firebase analytics
import usePageViewTracking from "../components/analytics/Analytics";
import { useRouter } from "next/router";
import Metadata from "../components/meta/metadata";
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
  // analytics
  const router = useRouter();
  const pageName = router.route;
  usePageViewTracking(pageName);

  const { isConnected, address } = useAccount();
  return (
    <div className="">
      <Metadata />
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          theme={darkTheme({
            accentColor: "#6544c9",
            accentColorForeground: "white",
            borderRadius: "large",
            fontStack: "system",
            overlayBlur: "small",
          })}
          modalSize="compact"
          avatar={() => (
            <Image
              src="/images/placeholderpfp.png"
              alt="pfp"
              width="100"
              height="100"
              className="blur-[1px]"
            />
          )}
        >
          <div className="place-items-center mx-auto max-w-[1500px]">
            <div className="relative hidden md:flex">
              <div className="fixed h-[100vh] flex-row text-white flex space-x-5 z-20">
                <div className="flex flex-col text-md bg-[#1F2027] border-r border-zinc-700 p-4 place-items-left place-content-left pr-12">
                  <Link
                    href="/"
                    className="flex flex-col place-items-center text-[#6544c9] cursor-pointer my-[50px]"
                  >
                    <div className="flex space-x-2 ">
                      {/* <CatchingPokemon className="w-8 my-auto fill-[#6544c9] rotate-12" /> */}
                      <Image
                        className="w-8 my-auto rounded-full"
                        src="/images/icons/KaijuDex-02.png"
                        alt="logo"
                        width="50"
                        height="50"
                      />
                      <div className="text-3xl font-black ">KAIJUDEX</div>
                    </div>
                    <p className="font-bold text-xs ml-auto text-zinc-500">
                      v0.1.0
                    </p>
                  </Link>
                  <div className="mt-10 flex flex-col space-y-4 text-md text-zinc-600 font-bold">
                    <div className="p-5 active:bg-[#6544c9] hover:bg-[#393D45] cursor-pointer duration-150 rounded-2xl w-full hover:shadow-xl">
                      <Link
                        href="/news"
                        className="flex space-x-4 place-items-center place-content-left"
                      >
                        <News className="w-9 fill-zinc-400" />
                        <div className="text-zinc-400">News</div>
                      </Link>
                    </div>
                    <div className="p-5 active:bg-[#6544c9] hover:bg-[#393D45] cursor-pointer duration-150 rounded-2xl w-full hover:shadow-xl">
                      <Link
                        href={"/profile"}
                        className="flex space-x-4 place-items-center place-content-left"
                      >
                        <PersonFill className="w-9 fill-zinc-400" />
                        <div className="text-zinc-400">Profile</div>
                      </Link>
                    </div>
                    <div className="p-5 active:bg-[#6544c9] hover:bg-[#393D45] cursor-pointer duration-150 rounded-2xl w-full hover:shadow-xl">
                      <Link
                        href="https://docs.kaijudex.app/"
                        className="flex space-x-4 place-items-center place-content-left"
                      >
                        <Paperclip className="w-9 fill-zinc-400" />
                        <div className="text-zinc-400">Docs</div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:ml-[270px] px-5 md:px-12 py-10 flex flex-col space-y-10">
              <div className="flex space-x-5 place-items-center">
                <Link
                  href="/"
                  className="flex md:hidden flex-col place-items-center text-[#6544c9]cursor-pointer mr-auto px-5"
                >
                  <div className="flex space-x-1 ">
                    <CatchingPokemon className="w-5 my-auto fill-[#6544c9] rotate-12" />
                    <div className="text-xl font-black ">KAIJUDEX</div>
                  </div>
                  <p className="font-bold text-xs ml-auto text-zinc-500">
                    DEV BUILD
                  </p>
                </Link>
                <div className="md:hidden flex space-x-4">
                  <div className="p-3 active:bg-[#6544c9] hover:bg-[#393D45] cursor-pointer duration-150 rounded-2xl hover:shadow-xl">
                    <Link
                      href="/news"
                      className="flex space-x-4 place-items-center place-content-left"
                    >
                      <News className="w-7 fill-zinc-400" />
                    </Link>
                  </div>
                  <div className="p-3 active:bg-[#6544c9] hover:bg-[#393D45] cursor-pointer duration-150 rounded-2xl hover:shadow-xl">
                    <Link
                      href={"/profile"}
                      className="flex space-x-4 place-items-center place-content-left"
                    >
                      <PersonFill className="w-7 fill-zinc-400" />
                    </Link>
                  </div>
                  <div className="p-3 active:bg-[#6544c9] hover:bg-[#393D45] cursor-pointer duration-150 rounded-2xl hover:shadow-xl">
                    <Link
                      href="https://docs.kaijudex.app/"
                      className="flex space-x-4 place-items-center place-content-left"
                    >
                      <Paperclip className="w-7 fill-zinc-400" />
                    </Link>
                  </div>
                </div>
                {/* <div className="w-[20rem] bg-[#1A1B1F] h-11 rounded-lg py-1 px-3 flex my-auto shadow-xl">
                  <SearchAlt className="w-5 my-auto" />
                  <input
                    type={"text"}
                    placeholder="Search"
                    className="w-[85%] mx-auto flex bg-transparent border-none outline-none text-sm"
                  />
                </div> */}
                {/* <ConnectButton showBalance={false} /> */}
              </div>
              <div className="mb-5" />
              <Component {...pageProps} />
            </div>
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default MyApp;
