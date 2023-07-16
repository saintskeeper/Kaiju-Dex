import RSS from 'rss';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'; // you need to install this package
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';

async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(markdown);
  return result.toString();
}

export async function generateRSSFeed() {
  const feed = new RSS({
    title: "KaijuDex News",
    description: "Description for your site",
    feed_url: "https://kaijudex.app/rss.xml",
    site_url: "https://kaijudex.app/",
    language: "en",
  });

  const articleDirectory = path.join(process.cwd(), "data", "articles");
  const filenames = fs.readdirSync(articleDirectory);
  const slugs = filenames.map((filename) => filename.replace(/\.md$/, ""));

  for (const slug of slugs) {
    const filePath = path.join(articleDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    
    const htmlContent = await markdownToHtml(content);

    feed.item({
      title: data.title,
      guid: `https://kaijudex.app/news/articles/${slug}`,
      url: `https://kaijudex.app/news/articles/${slug}`,
      description: htmlContent,
      date: data.date ? new Date(data.date) : new Date(),
    });
  }

  return feed.xml();
}
