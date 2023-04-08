// pages/news/article/[slug].tsx
import { GetStaticProps, GetStaticPaths } from "next";
import fs from "fs";
import path from "path";
import type { NextPage } from "next";
import MarkdownArticle from "../../../components/news/MarkdownArticle";

interface ArticlePageProps {
  markdownContent: string;
}

const ArticlePage: NextPage<ArticlePageProps> = ({ markdownContent }) => {
  return (
    <div>
      <MarkdownArticle markdown={markdownContent} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as { slug: string };
  const filePath = path.join(process.cwd(), "data", "articles", `${slug}.md`);
  const markdownContent = fs.readFileSync(filePath, "utf8");

  return {
    props: {
      markdownContent,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articleDirectory = path.join(process.cwd(), "data", "articles");
  const filenames = fs.readdirSync(articleDirectory);
  const slugs = filenames.map((filename) => filename.replace(/\.md$/, ""));

  const paths = slugs.map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default ArticlePage;
