import type { FC } from "react";
import { Button } from "antd";
import "antd/dist/reset.css";
import "./App.css";

import SlateEditor from "./slate/SlateEditor";

const App: FC = () => (
  <div className="App">
    <Button type="primary">Button</Button>
    <div
      style={{
        width: 800,
        height: 600,
        margin: "20px auto",
        backgroundColor: "#f2f2f2",
        padding: "10px",
      }}
    >
      <SlateEditor />
    </div>
  </div>
);

export default App;
