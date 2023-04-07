// pages/news/article/[slug].tsx
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import MarkdownArticle from '../../../components/news/MarkdownArticle';

const ArticlePage: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  // Replace this with the actual Markdown content fetched based on the slug
  const markdownContent = `
# Your Article Title

This is a sample article written in **Markdown**.

- You can use lists
- Format text as _italic_, **bold**, or ~~strikethrough~~
- Add [links](https://example.com)

Don't forget to replace this content with the actual Markdown content for the article.
  `;

  return (
    <div>
      <h1>Article: {slug}</h1>
      <MarkdownArticle markdown={markdownContent} />
    </div>
  );
};

export default ArticlePage;
