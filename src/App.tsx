import React from "react";
import type { FC } from "react";
import { Button } from "antd";
import "antd/dist/reset.css";
import "./App.css";

import SlateEditor from "./slate/SlateEditor";

const App: FC = () => (
  <div className="App">
    <Button type="primary">Button</Button>
    <SlateEditor />
  </div>
);

export default App;
