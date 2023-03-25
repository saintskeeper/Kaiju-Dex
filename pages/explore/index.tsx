import type { NextPage } from "next";
import { RightArrow } from "styled-icons/boxicons-solid";

function FeatureModal(props: any) {
  return (
    <div className="bg-[#2e3031] rounded-lg p-3 flex-col space-y-5 font-bold">
      <div>
        <h1 className="text-xl font-bold tracking-wider uppercase">
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
      <div className="w-[180px] h-[180px] bg-[#7c7b7b4f] rounded-xl animate-pulse duration-500"></div>
      <div className="z-10 absolute bottom-0 flex w-full p-1 space-x-1 h-12 text-sm">
        <div className="flex backdrop-blur-lg bg-[#0000009f] rounded-xl w-full py-1 px-2">
          <div className="mx-auto my-auto"> ETH</div>
        </div>
        <div className="flex backdrop-blur-md bg-[#ac26e09f] rounded-xl w-full py-1 px-2 place-content-center space-x-2 hover:scale-105 cursor-pointer active:scale-95 duration-100">
          <div className="my-auto">INFO</div>
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
      </FeatureModal>
    </>
  );
};

export default Home;
