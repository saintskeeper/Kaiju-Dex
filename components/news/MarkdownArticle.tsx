// components/MarkdownArticle.tsx
import React from 'react';
import { useRemarkSync } from 'react-remark';

interface MarkdownArticleProps {
  markdown: string;
}

const MarkdownArticle: React.FC<MarkdownArticleProps> = ({ markdown }) => {
  const content = useRemarkSync(markdown);

  return <div>{content}</div>;
};

export default MarkdownArticle;
