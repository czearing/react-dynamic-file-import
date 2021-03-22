import React from "react";
import { useUnmount } from "./useUnmount";

export const DynamicImport = ({ children, loadFile }) => {
  const componentRef = React.useRef();
  const [componentState, setComponentState] = React.useState({
    Component: null
  });
  const { Component } = componentState;

  const importFile = React.useCallback(async () => {
    try {
      const { default: file } = await loadFile();
      componentRef?.current && setComponentState({ Component: file });
      console.log("File was successfuly loaded!");
    } catch (err) {
      console.log("File was not loaded.");
    }
  }, [loadFile]);

  React.useEffect(() => {
    importFile();
  }, [importFile]);

  useUnmount(() => {
    setComponentState({
      Component: null
    });

    console.log("Cleaning up component import");
  });

  return (
    <span ref={componentRef}>
      {Component ? <Component>{children}</Component> : <div>{children}</div>}
    </span>
  );
};
