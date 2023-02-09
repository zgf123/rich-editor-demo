import type { FC } from "react";
import { Button } from "antd";
import "antd/dist/reset.css";
import "./App.css";

// import SlateEditor from "./slate/SlateEditor";
// import TagEditor from "./slate/TagEditor";
// import ParseHtml from "./slate/ParseHtml";
import RichText from "./slate/RichText";

const App: FC = () => (
  <div className="App">
    <Button type="primary">Button</Button>
    <div
      style={{
        width: 800,
        height: 600,
        margin: "20px auto",
        backgroundColor: "#fafafa",
        padding: "10px",
      }}
    >
      <RichText />
      {/* <ParseHtml /> */}
      {/* <TagEditor /> */}
      {/* <SlateEditor /> */}
    </div>
  </div>
);

export default App;
