import React, { useState } from "react";
import { ReactDOM } from "react";
import Toolbox from "./Toolbox/Toolbox";
import Cursor from "./Cursor";
import Canvas from "./Canvas";
import Linemenu from "./Linemenu";

function Workspace(props) {
  const [clicked, setClicked] = useState(null);
  const [selectState, setSelectState] = useState(null);
  const [lineSelection, setLineSelection] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".leader-line")) {
      handleCloseMenu();
      if (lineSelection !== null) {
        setLineSelection(null);
        return;
      }
    }
  });

  const handleCloseMenu = () => {
    setMenuVisible(false);
  };

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
        lineSelection={lineSelection}
        setLineSelection={setLineSelection}
        menuVisible={menuVisible}
        setMenuVisible={setMenuVisible}
        menuPosition={menuPosition}
        setMenuPosition={setMenuPosition}
      />
      <Toolbox
        clickedList={[clicked, setClicked]}
        selectState={selectState}
        setSelectState={setSelectState}
        lineSelection={lineSelection}
        setLineSelection={setLineSelection}
      />
    </div>
  );
}

export default Workspace;
