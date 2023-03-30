import type { NextPage } from "next";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div>
      <div className="w-[300px] md:w-[400px] space-y-1 mr-auto outline outline-2 outline-zinc-300 rounded-md">
        <div className="relative h-[130px] md:h-[170px]">
          <Image src="/images/city.gif" alt="city" fill />
        </div>
        <div className="p-4 space-y-5">
          <h1 className="font-black text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h1>
          <p className="text-sm text-zinc-300">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
