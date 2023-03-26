import type { NextPage } from "next";
import Image from "next/image";
import { Crown } from "styled-icons/boxicons-regular";
import { useAccount, useEnsName } from "wagmi";

const Home: NextPage = () => {
  const { address } = useAccount();
  const {
    data: ens,
    isError: ensError,
    isLoading: ensLoading,
  } = useEnsName({ address: address });
  return (
    <>
      <div className="bg-[#2e3031] rounded-lg p-3 flex-col space-y-5 font-bold">
        <div className="flex space-x-5">
          <Image
            height="200"
            width="200"
            src="/images/demo.gif"
            className="rounded-xl"
            alt="demo"
          />
          <div className="py-2 space-y-3 flex flex-col relative">
            <p className="text-xl font-bold tracking-wider uppercase">
              {ensLoading ? "..." : ensError ? address?.slice(0, 5) : ens}
            </p>
            <p className="text-md text-gray-400 tracking-wider">
              This is my bio! <br /> YOO!
            </p>
            <div className="flex space-x-2 absolute bottom-0">
              <Crown className="w-5" />
              <p className=" text-md text-gray-200 tracking-wider">03.22.22</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#2e3031] rounded-lg p-3 flex-col space-y-5 font-bold "></div>
    </>
  );
};

export default Home;
