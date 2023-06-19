import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Discord, Twitter } from "styled-icons/bootstrap";
import { Crown } from "styled-icons/boxicons-regular";
import { Link2 } from "styled-icons/evaicons-solid";

interface ProfileCardProps {
  address: string;
  ens: string;
  ensLoading: boolean;
  ensError: boolean;
  imagePath: string;
  altText: string;
  etherscanUrl: string;
  twitterUrl: string;
  discordUrl: string;
  memberSince: string;
  description: string;
  offer: string;
  username: string;
}

const ProfileCard: FC<ProfileCardProps> = ({
  address,
  ens,
  ensLoading,
  ensError,
  imagePath,
  altText,
  etherscanUrl,
  twitterUrl,
  discordUrl,
  memberSince,
  description,
  offer,
  username,
}) => {
  return (
    <div className="space-y-5">
      <div className="rounded-lg flex-col space-y-5 ">
        <div className="flex flex-col place-items-start space-y-5">
          <div className="h-[2px] bg-zinc-400" />
          <Image
            height="150"
            width="150"
            src={imagePath}
            className="rounded-md self-center"
            alt={altText}
          />
          <div className="py-2 space-y-5 flex flex-col relative">
            <div className="flex place-items-center space-x-3">
              <p className="text-3xl font-bold tracking-wider text-black dark:text-white">
                {username}
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                href={etherscanUrl}
                className="flex space-x-2 outline outline-1 outline-zinc-500 bg-zinc-700 place-items-center rounded-lg py-1 px-2 place-content-center hover:invert duration-200"
              >
                <Link2 className="w-3 h-3" />
                <p>Etherscan</p>
              </Link>
              <Link
                href={twitterUrl}
                className="flex space-x-2 outline outline-1 outline-zinc-500 bg-zinc-700 place-items-center rounded-lg py-1 px-2 place-content-center hover:invert duration-200"
              >
                <Twitter className="w-3 h-3" />
                <p>Twitter</p>
              </Link>

              <Link
                href={discordUrl}
                className="flex space-x-2 outline outline-1 outline-zinc-500 bg-zinc-700 place-items-center rounded-lg py-1 px-2 place-content-center hover:invert duration-200"
              >
                <Discord className="w-3 h-3" />
                <p>Discord</p>
              </Link>
            </div>
            <p className="text-md text-gray-400 tracking-wide">{description}</p>
          </div>
        </div>
      </div>
      <div>
        <div className="rounded-lg space-y-4">
          <h1 className="text-2xl font-bold text-black dark:text-white">
            What I Offer:
          </h1>
          <p className="text-md text-gray-400 tracking-wide">{offer}</p>
          <div className="flex space-x-2 ">
            <Crown className="w-5 fill-black dark:fill-white" />
            <p className="text-md text-black dark:text-gray-200 tracking-wider">
              {memberSince}
            </p>
          </div>
          <div className="h-[2px] bg-zinc-700" />
          <div className="rounded-lg space-y-4" />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
