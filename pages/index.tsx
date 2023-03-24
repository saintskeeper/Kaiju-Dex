// commenting out unused libraries
//import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Image from "next/image";
//import Link from "next/link";
//import { PersonFill, Wallet } from "styled-icons/bootstrap";
//import { SearchAlt } from "styled-icons/boxicons-regular";
import { RightArrow } from "styled-icons/boxicons-solid";
//import { CatchingPokemon, Settings } from "styled-icons/material-twotone";

function FeatureModal(props: any) {
  return (
    <div className="bg-[#2e3031] rounded-lg p-3 flex-col space-y-5 font-bold font-mono">
      <div>
        <h1 className="font-mono text-xl font-bold tracking-wider uppercase">
          {props.title}
        </h1>
      </div>
      <div className="flex space-x-5">{props.children}</div>
    </div>
  );
}

const Profile = () => {
  return (
    <div className="relative">
      <Image
        height="200"
        width="200"
        src="/images/demo.gif"
        className="rounded-xl"
        alt="demo"
      />
      <div className="z-10 absolute bottom-0 flex w-full p-1 space-x-1 h-12 text-sm">
        <div className="flex backdrop-blur-lg bg-[#0000009f] rounded-xl w-full py-1 px-2">
          <h1 className="mx-auto my-auto">ETH</h1>
        </div>
        <div className="flex backdrop-blur-md bg-[#ac26e09f] rounded-xl w-full py-1 px-2 place-content-center space-x-2 hover:scale-105 cursor-pointer active:scale-95 duration-100">
          <h1 className="my-auto">INFO</h1>
          <RightArrow className="w-3" />
        </div>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <FeatureModal title="Featured">
        <Profile />
        <Profile />
      </FeatureModal>
      <FeatureModal title="Pixel Art">
        <Profile />
        <Profile />
      </FeatureModal>
      <FeatureModal title="Engineers">
        <Profile />
        <Profile />
      </FeatureModal>
      <FeatureModal title="Artists">
        <Profile />
        <Profile />
      </FeatureModal>
    </>
  );
};

export default Home;
