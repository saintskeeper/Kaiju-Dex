// pages/news/index.tsx
import type { NextPage } from "next";
import Image from "next/image";
import MarkdownArticle from "../../components/news/MarkdownArticle";
import Link from "next/link";

const markdownContent = `
# When Kaiju Dex?
Kaiju Creators wanted
`;

const Home: NextPage = () => {
  return (
    <div>
      <Link
        href="/news/articles/article1"
        className="cursor-pointer flex w-[300px] md:w-[400px] "
      >
        <div className="space-y-1 mr-auto outline outline-2 outline-zinc-300 rounded-md hover:scale-105 duration-200">
          <div className="relative h-[130px] md:h-[170px]">
            <Image
              src="/images/city.gif"
              alt="city"
              fill
              className="rounded-md"
            />
          </div>
          <div className="p-4 space-y-5 ">
            <MarkdownArticle markdown={markdownContent} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Home;
