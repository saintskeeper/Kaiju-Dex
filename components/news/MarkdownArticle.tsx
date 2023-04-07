// components/MarkdownArticle.tsx
import React, { useEffect, useState } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehype2react from 'rehype-react';
import styles from '../../styles/markdown.module.css';
import Image from 'next/image';

interface MarkdownArticleProps {
  markdown: string;
}

const components = {
  img: (props: any) => {
    const width = props['width'] || 200;
    const height = props['height'] || 200;
    return <Image src={props.src} alt={props.alt} width={width} height={height} />;
  },
};

const MarkdownArticle: React.FC<MarkdownArticleProps> = ({ markdown }) => {
  const [content, setContent] = useState<React.ReactNode>(null);

  useEffect(() => {
    (async () => {
      const processor = unified()
        .use(remarkParse)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeSanitize)
        .use(rehype2react, { createElement: React.createElement, components });

      const file = await processor.process(markdown);
      setContent(file.result as React.ReactNode);
    })();
  }, [markdown]);

  return <div className={styles.markdown}>{content}</div>;
};

export default MarkdownArticle;
