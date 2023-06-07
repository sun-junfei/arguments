import React, { useState } from "react";
import { ReactDOM } from "react";
import Toolbox from "./Toolbox/Toolbox";
import Cursor from "./Cursor";
import Canvas from "./Canvas";

function Workspace(props) {
  const [clicked, setClicked] = useState(null);
  const [selectState, setSelectState] = useState(null);

  return (
    <div
      className={`${clicked != null ? "add_mode" : ""} ${
        selectState ? "selected_workspace" : ""
      }`}
    >
      {clicked != null && <Cursor clicked={clicked} />}
      <Canvas
        clickedList={[clicked, setClicked]}
        selectState={selectState}
        setSelectState={setSelectState}
      />
      <Toolbox
        clickedList={[clicked, setClicked]}
        selectState={selectState}
        setSelectState={setSelectState}
      />
    </div>
  );
}

export default Workspace;
