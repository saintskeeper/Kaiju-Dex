// components/MarkdownArticle.tsx
import React, { useEffect, useState } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehype2react from "rehype-react";
import styles from "../../styles/markdown.module.css";
import parseMarkdownImages from "../../lib/Markdown/parseMarkdownImages";
import Image from "next/image";

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
          // Extract width and height from the title attribute
          const [width, height] = props.title
            ? // @ts-ignore
              props.title.split(",").map((size) => parseInt(size.trim()))
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
                  src={props.src}
                  alt={props.alt}
                  fill
                  style={{ objectFit: "contain" }}
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

      const file = await processor.process(markdown);
      setContent(file.result as React.ReactNode);
    })();
  }, [markdown]);

  return <div className={styles.markdown}>{content}</div>;
};

export default MarkdownArticle;
