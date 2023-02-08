import { useMemo, useCallback } from "react";
import { createEditor, Descendant, Transforms, Editor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { RenderElementProps } from "slate-react";

const initialValue: Descendant[] = [
  {
    type: "other",
    children: [
      { text: "This is editable plain text, just like a <textarea>!" },
    ],
  },
  {
    type: "code",
    children: [
      { text: "This is editable plain text, just like a <textarea>!" },
    ],
  },
  {
    type: "ddd",
    children: [{ text: "" }],
  },
];

const PlainTextExample = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  return (
    <Slate editor={editor} value={initialValue}>
      <Editable
        placeholder="Enter some plain text..."
        renderElement={renderElement}
        onKeyDown={(event) => {
          if (event.key === "`" && event.ctrlKey) {
            // Prevent the "`" from being inserted by default.
            event.preventDefault();
            // Otherwise, set the currently selected blocks type to "code".
            Transforms.setNodes<any>(
              editor,
              { type: "code" },
              { match: (n: any) => Editor.isBlock(editor, n) }
            );
          }
        }}
      />
    </Slate>
  );
};

const CodeElement = (props: RenderElementProps) => {
  return (
    <span {...{ ...props.attributes, "data-slate-inline": true }}>
      <span style={{ color: "red" }}>{props.children}</span>
    </span>
  );
};

const DefaultElement = (props: RenderElementProps) => {
  return <span {...props.attributes}>{props.children}</span>;
};

export default PlainTextExample;
