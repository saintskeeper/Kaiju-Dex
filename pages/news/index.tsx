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
### The Kaiju Renaissance
Artists spotlight and community initiatives
`;

const markdownContent3 = `
### Season 3 out of this world
L3's story continues
`;

function ArticleComponent(props: any) {
  return (
    <>
      <Link href={props.link} className="cursor-pointer flex w-[250px] ">
        <div className="space-y-1 mr-auto outline outline-2 outline-zinc-300 rounded-md hover:scale-105 duration-200 flex flex-col">
          <div className="relative h-[250px] w-[250px]">
            {props.new && (
              <Image
                src={"/images/new_icon.png"}
                alt="new"
                className="absolute top-2 left-2 z-10 "
                width={50}
                height={50}
              />
            )}
            <Image
              src={props.image}
              alt="article preview"
              fill
              className="rounded-md"
            />
          </div>
          <div className="px-2 py-2 mx-auto text-center w-[250px]">
            <MarkdownArticle markdown={props.data} />
          </div>
        </div>
      </Link>
    </>
  );
}

const Home: NextPage = () => {
  return (
    <div className="flex space-x-10">
      <ArticleComponent
        image={"/images/article3/cute-space-kaiju.png"}
        data={markdownContent3}
        link={"/news/articles/article3"}
        new
      />
      <ArticleComponent
        image={"/images/article2/kaijudex-mini-kaiju.png"}
        data={markdownContent2}
        link={"/news/articles/article2"}
      />
      <ArticleComponent
        image={"/images/Article-1-cover.png"}
        link={"/news/articles/article1"}
        data={markdownContent}
      />
    </div>
  );
};

export default Home;
