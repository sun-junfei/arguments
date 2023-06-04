import React, { useState, useRef } from "react";
import Draggable, { DraggableCore } from "react-draggable";
import Defbox from "./Inputbox/Defbox";
import Singlebox from "./Inputbox/Singlebox";
import { click } from "@testing-library/user-event/dist/click";

function Canvas(props) {
  const [defPosList, setDefPosList] = useState([]);
  const [propPosList, setPropPosList] = useState([]);
  const canvasRef = useRef(null);

  function addDefPosList(newDefPos) {
    setDefPosList((prevDefPos) => {
      return [...prevDefPos, newDefPos];
    });
  }
  function addPropPosList(newPropPos) {
    setPropPosList((prevPropPos) => {
      return [...prevPropPos, newPropPos];
    });
  }

  const handleOnClick = (event) => {
    const canvasRect = canvasRef.current.getBoundingClientRect();
    /* the numerical values corresponds to half of the badge width and height */
    const posX = event.clientX - canvasRect.left - 41.328;
    const posY = event.clientY - canvasRect.top - 13.6665;

    const newPosition = { x: posX, y: posY };

    switch (props.clickedList[0]) {
      case "def":
        addDefPosList(newPosition);
        props.clickedList[1](null);
        break;
      case "prop":
        addPropPosList(newPosition);
        props.clickedList[1](null);
        break;
      case "evi":
        return <span class="badge text-bg-info">Evi</span>;
      case "con":
        return <span class="badge text-bg-danger">Con</span>;
      case "note":
        return <span class="badge text-bg-warning">Note</span>;
      default:
        return <p>Default content</p>;
    }
  };

  return (
    <Draggable cancel=".defbox .term_box, .defbox .content_box, .single_box .label_box, .single_box .expand_box, .single_box .content_box">
      <div className="canvas" onClick={handleOnClick} ref={canvasRef}>
        {defPosList.map((defPos, index) => {
          return (
            <Defbox positionX={defPos.x} positionY={defPos.y} index={index} />
          );
        })}

        {propPosList.map((propPos, index) => {
          return (
            <Singlebox
              positionX={propPos.x}
              positionY={propPos.y}
              index={index}
              singleClass={"Prop"}
            />
          );
        })}
      </div>
    </Draggable>
  );
}

export default Canvas;
