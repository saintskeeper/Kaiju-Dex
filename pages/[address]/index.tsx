import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Discord, Twitter } from "styled-icons/bootstrap";
import { Crown } from "styled-icons/boxicons-regular";
import { Code } from "@styled-icons/fa-solid/Code";
import { Link2 } from "styled-icons/evaicons-solid";
import { useAccount, useEnsName } from "wagmi";

const Home: NextPage = () => {
  const { address } = useAccount();
  const {
    data: ens,
    isError: ensError,
    isLoading: ensLoading,
  } = useEnsName({ address: address });
  return (
    <div className="space-y-5">
      <div className="bg-[#24242494] rounded-lg p-3 flex-col space-y-5">
        <div className="flex flex-col place-items-center md:flex-row space-x-5">
          <Image
            height="200"
            width="200"
            src="/images/demo.gif"
            className="rounded-xl my-auto"
            alt="demo"
          />
          <div className="py-2 space-y-3 flex flex-col relative">
            <div className="flex place-items-center space-x-3">
              <Code className="w-6 h-6" />
              <p className="text-2xl font-bold tracking-wider">
                {ensLoading ? "..." : ensError ? address?.slice(0, 5) : ens}
              </p>
            </div>

            <div className="flex space-x-3">
              <Link
                href={"www.etherscan.com/" + address}
                className="flex space-x-2 outline outline-1 outline-zinc-500 bg-zinc-700 place-items-center rounded-lg py-1 px-2 place-content-center hover:invert duration-200"
              >
                <Link2 className="w-3 h-3" />
                <p>Etherscan</p>
              </Link>
              <Link
                href={"www.twitter.com/haruxe.eth"}
                className="flex space-x-2 outline outline-1 outline-zinc-500 bg-zinc-700 place-items-center rounded-lg py-1 px-2 place-content-center hover:invert duration-200"
              >
                <Twitter className="w-3 h-3" />
                <p>Twitter</p>
              </Link>
              <Link
                href={""}
                className="flex space-x-2 outline outline-1 outline-zinc-500 bg-zinc-700 place-items-center rounded-lg py-1 px-2 place-content-center hover:invert duration-200"
              >
                <Discord className="w-3 h-3" />
                <p>Discord</p>
              </Link>
            </div>
            <p className="text-md text-gray-400 tracking-wide">
              Proud member of the KaijuKingz community and an ethical
              hacker/whitehat. I use my expertise in cybersecurity to help
              protect the community and keep us all safe from bad actors. With a
              passion for cutting-edge technology and a strong commitment to
              ethical principles, I'm always looking for ways to improve the
              security of the NFT space and keep KaijuKingz ahead of the game.
              Whether it's identifying vulnerabilities, implementing new
              security protocols, or educating others on best practices, I'm
              always working hard to ensure that the community can thrive and
              grow without worrying about security threats. So if you're looking
              for a dedicated cybersecurity expert who's always looking out for
              the greater good, look no further. (GLPT carry)
            </p>
            <div className="flex space-x-2 ">
              <Crown className="w-5" />
              <p className=" text-md text-gray-200 tracking-wider">
                Since 03.22.22
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#24242494] rounded-lg p-3 ">
        <h1 className="text-2xl font-bold">What I Offer:</h1>
      </div>
    </div>
  );
};

export default Home;
