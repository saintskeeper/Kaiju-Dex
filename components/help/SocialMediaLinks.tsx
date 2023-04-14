// components/SocialMediaLinks.tsx
import React from "react";
import { useRouter } from "next/router";

interface SocialMediaLinksProps {
  username: string;
  platform: "twitter" | "discord";
  className?: string;
}

const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({
  username,
  platform,
  className,
}) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(`https://www.${platform}.com/${username}`);
  };

  return (
    <a
      href={`https://www.${platform}.com/${username}`}
      className={className}
      onClick={handleClick}
      target={"_blank"}
      rel="noopener noreferrer"
    >
      {username}
    </a>
  );
};

export default SocialMediaLinks;
