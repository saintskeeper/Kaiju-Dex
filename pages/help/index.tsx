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
      <div className="bg-[#242832] rounded-lg p-12 space-y-4">
        <div className="md:text-lg text-md">
          Welcome to Kaiju-Dex! We&apos;re thrilled to have you here, and we
          want to thank you for checking it out.
          <br />
          <br />
          As you may have noticed, we&apos;re still early in development and are
          constantly working to improve the functionality and features of our
          platform. We appreciate your support during this phase and are excited
          to keep bringing new and exciting updates to our community.
          <br />
          <br />
          If you have any questions or feedback about the site, please
          don&apos;t hesitate to reach out to{" "}
          <a
            href="https://www.twitter.com/haruxeETH"
            className="text-blue-400 hover:text-blue-300 duration-200"
            target={"_blank"}
          >
            haruxeETH
          </a>{" "}
          on Twitter. We&apos;re always happy to hear from our users and will do
          our best to address any concerns or suggestions you may have.
        </div>
      </div>
    </div>
  );
};

export default Home;
