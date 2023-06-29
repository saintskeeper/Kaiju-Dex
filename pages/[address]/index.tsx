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
    imagePath="/images/profiles/walt-ghibli.png"
    altText="demo"
    etherscanUrl={`https://etherscan.io`}
    twitterUrl="https://twitter.com/Walt_eng"
    discordUrl="https://discord.gg/kaiju-kingz"
    memberSince="Since 09.01.22"
    description="I started out my journey with KaijuKingz near the peak of the last bull run and in the last year it has been evident which projects have pulled away from the rest and continued to build through the downturn. Like many, I started my Web 3 journey in the pursuit of monetary gains but slowly saw the vast opportunities to learn, to create, to shape, and to build anything Web 3 related. So with the advice of don't think, just do I found myself exploring and finding what I can bring to the table and this led me to KaijuDex. The increasing adoption of blockchain, and then Defi, and the emergence of AI apps means that the norm is being disrupted. With the experiences I've had in finance and running businesses, my gut tells me that there is a need to pivot. By utilsiing my skills in research, accounting, budgeting, and executing projects I can start to lay the path of my Web 3 brand & career. I look forward to building with you and having some fun along the way."
    offer=""
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
    <ProfileCard
      username="Hokin"
      address={address || ''}
      ens={ens || ''}
      ensLoading={ensLoading}
      ensError={ensError}
      imagePath="/images/profiles/hokin.jpg"
      altText="demo"
      etherscanUrl={``}
      twitterUrl="https://twitter.com/hokin26"
      discordUrl="https://discord.gg/kaiju-kingz"
      memberSince="Since 03.22.22"
      description="Proud member of the KaijuKingz community and an ethical hacker/whitehat. I use my expertise in cybersecurity to help protect the community and keep us all safe from bad actors. With a passion for cutting-edge technology and a strong commitment to ethical principles, I&apos;m always looking for ways to improve the security of the NFT space and keep KaijuKingz ahead of the game. Whether its identifying vulnerabilities, implementing new security protocols, or educating others on best practices, Im always working hard to ensure that the community can thrive and grow without worrying about security threats. So if you&apos;re looking for a dedicated cybersecurity expert whos always looking out for the greater good, look no further. (GLPT carry)"
      offer="As a software developer, I offer a range of services that can help businesses and organizations ensure the security and reliability of their blockchain-based applications. My main focus is on being a whitehat/auditor and identifying vulnerabilities in Solidity EVM smart contracts to prevent any malicious activity. In addition to my auditing skills, I&apos;m also an experienced web developer who can create amazing websites from scratch and integrate full-stack NFT projects with ease. Whether you need a simple static website or a complex e-commerce platform, I can build it for you. So, if you&apos;re looking for someone who can help you ensure the security of your blockchain-based apps or create an amazing website or NFT project, don&apos;t hesitate to reach out. I&apos;m always up for a new challenge and ready to help you bring your ideas to life. Contact me on Discord or Twitter for a quote. (GLPT GIGACHAD)"
    />
    </div>
  );
};

export default Home;
