// components/MarkdownArticle.tsx
import React, { useEffect, useState } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehype2react from "rehype-react";
import styles from "../../styles/markdown.module.css";
import Image from "next/image";
import parseMarkdownImages from "../../lib/Markdown/parseMarkdownImages";

interface MarkdownArticleProps {
  markdown: string;
}

const MarkdownArticle: React.FC<MarkdownArticleProps> = ({ markdown }) => {
  const [content, setContent] = useState<React.ReactNode>(null);

  useEffect(() => {
    (async () => {
      const components = {
        // @ts-ignore
        img: (props) => {
          const width = parseInt(props.width) || 200;
          const height = parseInt(props.height) || 200;
          return (
            <Image
              {...props}
              width={width}
              height={height}
            />
          );
        },
      };

      const processor = unified()
        .use(remarkParse)
        .use(parseMarkdownImages)
        // @ts-ignore
        .use(remarkRehype)
        .use(rehypeSanitize)
        .use(rehype2react, { createElement: React.createElement, components });

      const file = await processor.process(markdown);
      setContent(file.result as React.ReactNode);
    })();
  }, [markdown]);

  return <div className={styles.markdown}>{content}</div>;
};

export default MarkdownArticle;
