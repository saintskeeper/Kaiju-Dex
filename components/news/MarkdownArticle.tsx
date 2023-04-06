// components/MarkdownArticle.tsx

/* In this updated component, we're using the unified processor with remark-parse to parse the Markdown content, then remark-rehype to convert it to HTML. Finally, we use rehype-react to convert the HTML to React components. This way, the MarkdownArticle component will work with Markdown input and render it as React components.*/
// components/MarkdownArticle.tsx
import React from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react';

interface MarkdownArticleProps {
  markdown: string;
}

const MarkdownArticle: React.FC<MarkdownArticleProps> = ({ markdown }) => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeReact, { createElement: React.createElement });

  const content = processor.processSync(markdown).result;

  return <div>{content}</div>;
};

export default MarkdownArticle;
