"use client";

import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import Prism from "prismjs";
import { mangle } from "marked-mangle";
import { gfmHeadingId } from "marked-gfm-heading-id";
import * as React from "react";

import "prismjs/components/prism-bash";
import "prismjs/components/prism-c";
import "prismjs/components/prism-java";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-vim";
import "prismjs/components/prism-yaml";
import "prismjs/themes/prism.min.css";

import parser from "node-html-parser";

import "@/app/blog/common/viewRenderer.css";

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

type Props = React.ComponentProps<"div"> & {
  content: string;
};

const MarkdownRenderer = ({
  content,
  className,
  ...props
}: Props): JSX.Element => {
  const html = marked(content);
  const parsedContent = parser(html);

  React.useEffect(() => {
    const codeBlock = document.querySelectorAll("#MarkdownRenderer pre code");
    codeBlock.forEach((element) => {
      const match = element.className.match(/language-(\w+)/);
      if (match) {
        const design = document.createElement("div");
        design.innerHTML = `<p class="code_language">${match[1]}</p>`;
        element.parentNode?.insertBefore(design, element);
      }
    });
  }, [content]);

  return (
    <div
      id={"MarkdownRenderer"}
      className={className}
      dangerouslySetInnerHTML={{ __html: parsedContent.innerHTML }}
    />
  );
};
export default MarkdownRenderer;
