import React, { useState } from "react";
import { ReactDOM } from "react";
import Toolbox from "./Toolbox/Toolbox";
import Cursor from "./Cursor";
import Canvas from "./Canvas";

function Workspace(props) {
  const [clicked, setClicked] = useState(null);

  return (
    <div className={clicked != null ? "add_mode" : ""}>
      {clicked != null && <Cursor clicked={clicked} />}
      <Canvas />
      <Toolbox clickedList={[clicked, setClicked]} />
    </div>
  );
}

export default Workspace;
