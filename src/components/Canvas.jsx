import React, { useState } from "react";
import Draggable, { DraggableCore } from "react-draggable";
import Defbox from "./Inputbox/Defbox";

function Canvas(props) {
  return (
    <Draggable>
      <div className="canvas">
        <Defbox />
      </div>
    </Draggable>
  );
}

export default Canvas;
