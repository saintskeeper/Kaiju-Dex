import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Image from "next/image";
import { PersonFill, Wallet } from "styled-icons/bootstrap";
import { SearchAlt } from "styled-icons/boxicons-regular";
import { CatchingPokemon, Settings } from "styled-icons/material-twotone";

const Home: NextPage = () => {
  return (
    <div className="flex">
      <div className="bg-[#2e3031] w-[300px] h-screen text-white p-5">
        <div className="flex space-x-2">
          <CatchingPokemon className="w-7 animate-spin" />
          <h1 className="font-mono text-2xl font-bold tracking-wider">
            KAIJUDEX
          </h1>
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

          <div className="bg-[#2e3031] hover:scale-110 h-8 w-8 rounded-full flex hover:cursor-pointer hover:bg-[#3e4141] duration-200">
            <Settings className="w-5 mx-auto my-auto" />
          </div>
          <ConnectButton />
        </div>
        <div className="bg-[#2e3031] rounded-lg p-3 flex-col space-y-5">
          <div>
            <h1 className="font-mono text-xl font-bold tracking-wider">
              FEATURED
            </h1>
          </div>
          <div className="flex">
            <div className="relative">
              <Image
                height="200"
                width="200"
                src="/images/demo.gif"
                className="rounded-xl"
                alt="demo"
              />
              <div className="z-10 absolute bottom-0 flex w-full p-1 space-x-1 h-10">
                <div className="flex backdrop-blur-lg bg-[#0000009f] rounded-xl w-full py-1 px-2"></div>
                <div className="flex backdrop-blur-lg bg-[#0000009f] rounded-xl w-full py-1 px-2"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#2e3031] rounded-lg p-3 flex-col space-y-5">
          <div>
            <h1 className="font-mono text-xl font-bold tracking-wider">
              ENGINEERS
            </h1>
          </div>
          <div className="flex">
            <div className="relative">
              <Image
                height="200"
                width="200"
                src="/images/demo.gif"
                className="rounded-xl"
                alt="demo"
              />
              <div className="z-10 absolute bottom-0 flex w-full p-1 space-x-1 h-10">
                <div className="flex backdrop-blur-lg bg-[#0000009f] rounded-xl w-full py-1 px-2"></div>
                <div className="flex backdrop-blur-lg bg-[#0000009f] rounded-xl w-full py-1 px-2"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#2e3031] rounded-lg p-3 flex-col space-y-5">
          <div>
            <h1 className="font-mono text-xl font-bold tracking-wider">
              ARTISTS
            </h1>
          </div>
          <div className="flex space-x-5">
            <div className="relative">
              <Image
                height="200"
                width="200"
                src="/images/demo.gif"
                className="rounded-xl"
                alt="demo"
              />
              <div className="z-10 absolute bottom-0 flex w-full p-1 space-x-1 h-10">
                <div className="flex backdrop-blur-lg bg-[#0000009f] rounded-xl w-full py-1 px-2"></div>
                <div className="flex backdrop-blur-lg bg-[#0000009f] rounded-xl w-full py-1 px-2"></div>
              </div>
            </div>
            <div className="relative">
              <Image
                height="200"
                width="200"
                src="/images/demo.gif"
                className="rounded-xl"
                alt="demo"
              />
              <div className="z-10 absolute bottom-0 flex w-full p-1 space-x-1 h-10">
                <div className="flex backdrop-blur-lg bg-[#0000009f] rounded-xl w-full py-1 px-2"></div>
                <div className="flex backdrop-blur-lg bg-[#0000009f] rounded-xl w-full py-1 px-2"></div>
              </div>
            </div>
            <div className="relative">
              <Image
                height="200"
                width="200"
                src="/images/demo.gif"
                className="rounded-xl"
                alt="demo"
              />
              <div className="z-10 absolute bottom-0 flex w-full p-1 space-x-1 h-10">
                <div className="flex backdrop-blur-lg bg-[#0000009f] rounded-xl w-full py-1 px-2"></div>
                <div className="flex backdrop-blur-lg bg-[#0000009f] rounded-xl w-full py-1 px-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
