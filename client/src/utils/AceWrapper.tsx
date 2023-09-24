import * as React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-min-noconflict/mode-markdown";
import "ace-builds/src-min-noconflict/theme-github";
import "ace-builds/src-min-noconflict/ext-language_tools";

const AceWrapper = (
  props: React.ComponentProps<typeof AceEditor>
): JSX.Element => {
  return (
    <AceEditor
      mode="markdown"
      theme="github"
      name="MARKDOWN_EDITOR"
      {...props}
    />
  );
};
export default AceWrapper;
