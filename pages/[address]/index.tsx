import type { NextPage } from 'next';
import { useAccount, useEnsName } from 'wagmi';
import ProfileCard from '../../components/profiles/ProfileCard';

const Home: NextPage = () => {
  const { address } = useAccount();
  const {
    data: ens,
    isError: ensError,
    isLoading: ensLoading,
  } = useEnsName({ address: address });

  return (
    <div>
    <ProfileCard
    username="Walt-"
    address={address || ''}
    ens={ens || ''}
    ensLoading={ensLoading}
    ensError={ensError}
    imagePath="/images/profiles/Animated-Walt-Final-Transform.gif"
    altText="demo"
    etherscanUrl={`https://etherscan.io`}
    twitterUrl="https://twitter.com/Walt_eng"
    discordUrl="https://discord.gg/kaiju-kingz"
    memberSince="Since 09.01.22"
    description="Last September, I stumbled upon the Kaiju Kings, a warm and welcoming community that instantly felt like home. As a developer, I found the ecosystem to be incredibly robust, providing an excellent environment for collaboration and growth, especially during this Crypto Winter. I've been affectionately dubbed the Ice King within the community, thanks to my unique Augmented Kaiju #2295, which I'm particularly proud of.
    If you ever want to chat about technology, development, or just life in general, don't hesitate to reach out on Discord! I'm always eager to connect with fellow enthusiasts and share knowledge and ideas, or simply enjoy a good conversation. Let's continue to nurture this wonderful community and build together."
    offer="Throughout my career, I've been deeply involved in core infrastructure and large-scale systems. Recently, I've embarked on a thrilling journey into the world of Web3, focusing mainly on running blockchains at scale using Kubernetes. It's quite a surprising twist that I've found myself working on Next's front end and components, but I'm loving every moment of it! I wholeheartedly believe that crypto is the future, and I'm passionate about securing and automating blockchains. If you ever need assistance with cloud automation or large-scale systems, please don't hesitate to reach out. Lately, I've been spending most of my time working with AWS and GCP, so I'm well-equipped to help you navigate the cloud environment"
  />
    <ProfileCard
      username="Haruxe"
      address={address || ''}
      ens={ens || ''}
      ensLoading={ensLoading}
      ensError={ensError}
      imagePath="/images/profiles/Haruxe.png"
      altText="demo"
      etherscanUrl={`https://etherscan.io/address/0x60FF4545C6e674fD182990F7A66143002Fa3A03C`}
      twitterUrl="https://www.twitter.com/haruxeETH"
      discordUrl="https://discord.gg/kaiju-kingz"
      memberSince="Since 03.22.22"
      description="Proud member of the KaijuKingz community and an ethical hacker/whitehat. I use my expertise in cybersecurity to help protect the community and keep us all safe from bad actors. With a passion for cutting-edge technology and a strong commitment to ethical principles, I&apos;m always looking for ways to improve the security of the NFT space and keep KaijuKingz ahead of the game. Whether its identifying vulnerabilities, implementing new security protocols, or educating others on best practices, Im always working hard to ensure that the community can thrive and grow without worrying about security threats. So if you&apos;re looking for a dedicated cybersecurity expert whos always looking out for the greater good, look no further. (GLPT carry)"
      offer="As a software developer, I offer a range of services that can help businesses and organizations ensure the security and reliability of their blockchain-based applications. My main focus is on being a whitehat/auditor and identifying vulnerabilities in Solidity EVM smart contracts to prevent any malicious activity. In addition to my auditing skills, I&apos;m also an experienced web developer who can create amazing websites from scratch and integrate full-stack NFT projects with ease. Whether you need a simple static website or a complex e-commerce platform, I can build it for you. So, if you&apos;re looking for someone who can help you ensure the security of your blockchain-based apps or create an amazing website or NFT project, don&apos;t hesitate to reach out. I&apos;m always up for a new challenge and ready to help you bring your ideas to life. Contact me on Discord or Twitter for a quote. (GLPT GIGACHAD)"
    />
    </div>
  );
};

export default Home;
