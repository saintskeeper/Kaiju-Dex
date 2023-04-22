// pages/news/index.tsx
import type { NextPage } from "next";
import Image from "next/image";
import ArticleCard from "../../components/news/ArticleCard";

const markdownContent = `
### Wen Kaiju Dex?
Kaiju Creators wanted
`;

const markdownContent2 = `
### The Kaiju Renaissance
Artists spotlight and community initiatives
`;

const Home: NextPage = () => {
  return (
    <div className="flex space-x-10">
      <ArticleCard
        image={"/images/article2/kaijudex-mini-kaiju.png"}
        data={markdownContent2}
        link={"/news/articles/article2"}
        isNew
      />
      <ArticleCard
        image={"/images/Article-1-cover.png"}
        link={"/news/articles/article1"}
        data={markdownContent}
      />
    </div>
  );
};

export default Home;
