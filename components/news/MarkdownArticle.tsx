// components/MarkdownArticle.tsx
import React, { useEffect, useState } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehype2react from 'rehype-react';

interface MarkdownArticleProps {
  markdown: string;
}

const MarkdownArticle: React.FC<MarkdownArticleProps> = ({ markdown }) => {
  const [content, setContent] = useState<React.ReactNode>(null);

  useEffect(() => {
    (async () => {
      const processor = unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeSanitize)
        .use(rehype2react, { createElement: React.createElement });

      const file = await processor.process(markdown);
      setContent(file.result as React.ReactNode);
    })();
  }, [markdown]);

  return <div>{content}</div>;
};

export default MarkdownArticle;
