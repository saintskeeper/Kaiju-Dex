import Link from "next/link";
import { CatchingPokemon, Explore } from "styled-icons/material-twotone";

const Sidebar = () => {
  return (
    <div className="bg-[#202124] border border-l-0 border-y-0 border-[#1d1e20] w-[300px] hidden md:flex md:flex-col h-screen text-white p-5 space-y-5">
      <div className="flex space-x-2 mb-10">
        <CatchingPokemon className="w-7 animate-spin" />
        <Link href="/">
          <a className="font-mono text-2xl font-bold tracking-wider hover:scale-105 cursor-pointer active:scale-95 duration-100">
            KAIJUDEX
          </a>
        </Link>
      </div>
      <div className="font-sans font-bold flex space-x-2 place-content-center mx-auto py-3 px-5 w-full bg-[#1A1B1F] cursor-pointer duration-100 rounded-full">
        <Explore className="w-5" />
        <h1 className="">Explore</h1>
      </div>
      <div className="font-sans font-bold flex space-x-2 place-content-center mx-auto py-3 px-5 w-full bg-[#1A1B1F] cursor-pointer duration-100 rounded-full">
        <Explore className="w-5" />
        <Link href="/newsletter">
          <a className="font-sans font-bold">News Letter</a>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
