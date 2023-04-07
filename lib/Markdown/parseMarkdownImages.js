// lib/parseMarkdownImages.js
function parseMarkdownImages() {
  return (tree) => {
    tree.children.forEach((node, index) => {
      if (node.type === 'paragraph') {
        node.children.forEach((child, childIndex) => {
          if (child.type === 'image') {
            const srcParts = child.url.split('|');
            if (srcParts.length === 3) {
              child.url = srcParts[0];
              child.width = srcParts[1];
              child.height = srcParts[2];
            }
          }
        });
      }
    });
  };
}

module.exports = parseMarkdownImages;
