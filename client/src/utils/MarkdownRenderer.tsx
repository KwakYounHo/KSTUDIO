import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import Prism from "prismjs";
import { mangle } from "marked-mangle";
import { gfmHeadingId } from "marked-gfm-heading-id";

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

import "@/app/blog/view/[slug]/viewRenderer.css";

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

  return (
    <div
      id={props.id}
      className={className}
      dangerouslySetInnerHTML={{ __html: parsedContent.innerHTML }}
    />
  );
};
export default MarkdownRenderer;
