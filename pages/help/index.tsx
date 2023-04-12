import type { NextPage } from "next";
import { useAccount, useEnsName } from "wagmi";
import SocialMediaLinks from "../../components/help/SocialMediaLinks";

const Home: NextPage = () => {
  const { address } = useAccount();
  const {
    data: ens,
    isError: ensError,
    isLoading: ensLoading,
  } = useEnsName({ address: address });


  return (
    <div className="space-y-5">
      <div className="rounded-lg space-y-4">
        <div className="text-md text-gray-400 tracking-wide">
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
          <SocialMediaLinks
            username="WallyTheGuru"
            platform="twitter"
            className="text-blue-400 hover:text-blue-300 duration-200"
          />{" "}
          or{" "}
          <SocialMediaLinks
            username="haruxeETH"
            platform="twitter"
            className="text-blue-400 hover:text-blue-300 duration-200"
          />{" "}
          on Twitter. We&apos;re always happy to hear from our users and will do
          our best to address any concerns or suggestions you may have.
      </div>
      </div>
    </div>
  );
};




export default Home;
