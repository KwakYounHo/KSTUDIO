import * as React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-min-noconflict/mode-markdown";
import "ace-builds/src-min-noconflict/theme-tomorrow";
import "ace-builds/src-min-noconflict/ext-language_tools";

const AceWrapper = (
  props: React.ComponentProps<typeof AceEditor>
): JSX.Element => {
  return (
    <AceEditor
      wrapEnabled
      mode="markdown"
      theme="tomorrow"
      name="MARKDOWN_EDITOR"
      tabSize={2}
      {...props}
    />
  );
};
export default AceWrapper;
