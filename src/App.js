import React from "react";
import { DynamicImport } from "./DynamicImport";
import "./styles.css";

export default function App() {
  const [state, setState] = React.useState(false);

  const callBack = () => {
    setState(!state);
  };
  return (
    <div className="App">
      <button onClick={callBack}>Press me to load content.</button>
      {state && (
        <DynamicImport loadFile={() => import("./Component")}></DynamicImport>
      )}
    </div>
  );
}
