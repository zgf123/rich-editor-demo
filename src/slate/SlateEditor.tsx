import { useMemo, useCallback } from "react";
import { createEditor, Transforms, Editor, Text, Node } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { RenderElementProps } from "slate-react";

// Define our own custom set of helpers.
const CustomEditor = {
  toggleBoldMark(editor: any) {
    const matchNodes: any = Editor.nodes(editor, {
      match: (n: any) => n.bold === true,
      universal: true,
    });
    const [match] = matchNodes;
    const isActive = !!match;
    Transforms.setNodes(
      editor,
      { bold: isActive ? undefined : true },
      { match: (n: any) => Text.isText(n), split: true }
    );
  },

  toggleCodeBlock(editor: any) {
    const matchNodes: any = Editor.nodes(editor, {
      match: (n: any) => n.type === "code",
    });
    const [match] = matchNodes;
    const isActive = !!match;
    Transforms.setNodes(
      editor,
      { type: isActive ? undefined : "code" },
      { match: (n: any) => Editor.isBlock(editor, n), mode: "all" }
    );
  },
};

// Define a serializing function that takes a value and returns a string.
const serialize = (value: any) => {
  return (
    value
      // Return the string content of each paragraph in the value's children.
      .map((n: any) => Node.string(n))
      // Join them all with line breaks denoting paragraphs.
      .join("\n")
  );
};

// Define a deserializing function that takes a string and returns a value.
const deserialize = (string: any) => {
  // Return a value array of children derived by splitting the string.
  return string.split("\n").map((line: any) => {
    return {
      children: [{ text: line }],
    };
  });
};

const PlainTextExample = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const initialValue = useMemo(() => {
    /* const localContent = localStorage.getItem("content");
    const content = localContent ? JSON.parse(localContent) : undefined;
    return (
      content || [
        {
          type: "paragraph",
          children: [{ text: "A line of text in a paragraph." }],
        },
      ]
    ); */
    return deserialize(localStorage.getItem("content")) || "";
  }, []);

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Slate
      editor={editor}
      value={initialValue}
      onChange={(value) => {
        const isAstChange = editor.operations.some((op) => {
          console.log(op);
          return "set_selection" !== op.type;
        });
        if (isAstChange) {
          // Save the value to Local Storage.
          // const content = JSON.stringify(value);
          localStorage.setItem("content", serialize(value));
        }
      }}
    >
      <div>
        <button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleBoldMark(editor);
          }}
        >
          Bold
        </button>
        <button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleCodeBlock(editor);
          }}
        >
          Code Block
        </button>
      </div>
      <Editable
        placeholder="Enter some plain text..."
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          if (!event.ctrlKey) return;
          switch (event.key) {
            case "`": {
              event.preventDefault();
              CustomEditor.toggleCodeBlock(editor);
              break;
            }

            case "b": {
              event.preventDefault();
              CustomEditor.toggleBoldMark(editor);
              break;
            }
          }
        }}
      />
    </Slate>
  );
};

const CodeElement = (props: RenderElementProps) => {
  return (
    <pre {...props.attributes}>
      <code style={{ color: "red" }}>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props: RenderElementProps) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const Leaf = (props: any) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
    >
      {props.children}
    </span>
  );
};

export default PlainTextExample;
