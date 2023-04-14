// pages/news/index.tsx
import type { NextPage } from "next";
import Image from "next/image";
import MarkdownArticle from "../../components/news/MarkdownArticle";
import Link from "next/link";

const markdownContent = `
### Wen Kaiju Dex?
Kaiju Creators wanted
`;

const markdownContent2 = `
### Builders Be Building
Artists spotlight community initiatives!
`;

const Home: NextPage = () => {
  return (
    <div >
      <Link
        href="/news/articles/article2"
        className="cursor-pointer flex w-[600px] md:w-[600px] "
      >
        <div className="space-y-1 mr-auto outline outline-2 outline-zinc-300 rounded-md hover:scale-105 duration-200 flex flex-col">
          <div className="relative h-[250px] w-[250px]">
            <Image
              src="/images/article2/Kaiju-Dev-High-Quality-01.png"
              alt="kaijudev"
              fill
              className="rounded-md"
            />
          </div>
          <div className="p-5 space-y-5 ">
            <MarkdownArticle markdown={markdownContent2} />
          </div>
        </div>
      </Link>
      <Link
        href="/news/articles/article1"
        className="cursor-pointer flex w-[600px] md:w-[600px] "
      >
        <div className="space-y-1 mr-auto outline outline-2 outline-zinc-300 rounded-md hover:scale-105 duration-200 flex flex-col">
          <div className="relative h-[250px] w-[250px]">
            <Image
              src="/images/Article-1-cover.png"
              alt="kaijudev"
              fill
              className="rounded-md"
            />
          </div>
          <div className="p-5 space-y-5 ">
            <MarkdownArticle markdown={markdownContent} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Home;
