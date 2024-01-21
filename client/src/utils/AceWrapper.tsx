import AceEditor from "react-ace";

import "ace-builds/src-min-noconflict/mode-markdown";
import "ace-builds/src-min-noconflict/theme-tomorrow";
import "ace-builds/src-min-noconflict/ext-language_tools";

type Props = React.ComponentProps<typeof AceEditor> & {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
};

const AceWrapper = (props: Props): JSX.Element => {
  return (
    <AceEditor
      wrapEnabled
      mode="markdown"
      theme="tomorrow"
      name="MARKDOWN_EDITOR"
      tabSize={2}
      defaultValue={props.content}
      onChange={(value) => {
        props.setContent(value);
      }}
      {...props}
    />
  );
};
export default AceWrapper;
