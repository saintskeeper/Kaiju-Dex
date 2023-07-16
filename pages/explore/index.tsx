import type { NextPage } from "next";

function FeatureModal(props: any) {
  return (
    <div className="flex-col space-y-5 mb-10 ml-12 w-[70%]">
      <div>
        <h1 className="text-md font-bold tracking-wider ml-2">{props.title}</h1>
      </div>
      <div className="flex flex-col scroll-smooth space-y-3">
        {props.children}
      </div>
    </div>
  );
}

const Profile = () => {
  return (
    <div className="bg-[#7c7b7b2c] hover:bg-[#7c7b7b52] cursor-pointer rounded-md duration-150 p-5 flex flex-col">
      <div className="flex ml-5 space-x-5">
        <div className="w-[5rem] h-[5rem] relative bg-zinc-400 animate-pulse rounded-md" />
        <div className="mt-3">
          <h1 className="text-2xl font-bold">haruxe.eth</h1>
          <h1 className="text-md text-zinc-400">Whitehat Hacker</h1>
        </div>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <div className="flex w-full">
      <div className="rounded-2xl flex-row flex w-full shadow-xl">
        <div className="flex flex-col ">
          <h1 className="font-bold text-xl flex mb-10">Filters</h1>
          <div className="flex flex-col space-y-3">
            <h1 className="text-zinc-400 font-bold text-md tracking-wider">
              SKILLSET
            </h1>
            <div className="space-y-2 text-sm text-zinc-300">
              <h1 className="text-[#9161A6] cursor-pointer">All (153)</h1>
              <h1 className="hover:text-[#9161A6] cursor-pointer">
                Artist (42)
              </h1>
              <h1 className="hover:text-[#9161A6] cursor-pointer">
                Engineer (12)
              </h1>
              <h1 className="hover:text-[#9161A6] cursor-pointer">
                Community Manager (55)
              </h1>
              <h1 className="hover:text-[#9161A6] cursor-pointer">
                Security (8)
              </h1>
            </div>
          </div>
        </div>
        <div className="h-full bg-zinc-600 w-[1px] ml-10" />
      </div>
    </div>
  );
};

export default Home;
