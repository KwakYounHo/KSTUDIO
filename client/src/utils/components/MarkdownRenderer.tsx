import * as React from "react";
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import Prism from "prismjs";
import { mangle } from "marked-mangle";
import { gfmHeadingId } from "marked-gfm-heading-id";

import parser from "node-html-parser";

type Props = React.ComponentProps<"div"> & {
  content: string;
};

marked.use(
  mangle(),
  gfmHeadingId(),
  markedHighlight({
    highlight(code: string, lang: string): string {
      if (Prism.languages[lang]) {
        return Prism.highlight(code, Prism.languages[lang], lang);
      } else {
        return code;
      }
    },
  })
);

const MarkdownRenderer: React.FC<Props> = ({
  content,
  className,
  ...Props
}) => {

  const html = marked(content);
  const parsedContent = parser(html);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: parsedContent.innerHTML }}
    />
  );
};
export default MarkdownRenderer;
