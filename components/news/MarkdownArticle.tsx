import React, { useEffect, useState } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehype2react from "rehype-react";
import styles from "../../styles/markdown.module.css";
import parseMarkdownImages from "../../lib/Markdown/parseMarkdownImages";
import Image from "next/image";
import matter from 'gray-matter';

interface MarkdownArticleProps {
  markdown: string;
}

const MarkdownArticle: React.FC<MarkdownArticleProps> = ({ markdown }) => {
  const [content, setContent] = useState<React.ReactNode>(null);

  useEffect(() => {
    (async () => {
      const components = {
        img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
          const [width, height] = props.title
            ? props.title.split(",").map((size) => parseInt(size.trim()))
            : [undefined, undefined];

          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: width || "100%",
                  height: height || "100%",
                }}
              >
                <Image
                  src={props.src || ''}
                  alt={props.alt || ''}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
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

      const { content: markdownContent } = matter(markdown);
      const file = await processor.process(markdownContent);
      
      setContent(file.result as React.ReactNode);
    })();
  }, [markdown]);

  return <div className={styles.markdown}>{content}</div>;
};

export default MarkdownArticle;
