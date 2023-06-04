import React, { useState, useRef } from "react";
import Draggable, { DraggableCore } from "react-draggable";
import Generalbox from "./Inputbox/Generalbox";
import Singlebox from "./Inputbox/Singlebox";
import { click } from "@testing-library/user-event/dist/click";

function Canvas(props) {
  const [defPosList, setDefPosList] = useState([]);
  const [propPosList, setPropPosList] = useState([]);
  const [justPosList, setJustPosList] = useState([]);
  const [conPosList, setConPosList] = useState([]);
  const [notePosList, setNotePosList] = useState([]);
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

  function addJustPosList(newJustPos) {
    setJustPosList((prevJustPos) => {
      return [...prevJustPos, newJustPos];
    });
  }

  function addConPosList(newConPos) {
    setConPosList((prevConPos) => {
      return [...prevConPos, newConPos];
    });
  }

  function addNotePosList(newNotePos) {
    setNotePosList((prevNotePos) => {
      return [...prevNotePos, newNotePos];
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
      case "just":
        addJustPosList(newPosition);
        props.clickedList[1](null);
        break;
      case "con":
        addConPosList(newPosition);
        props.clickedList[1](null);
        break;
      case "note":
        addNotePosList(newPosition);
        props.clickedList[1](null);
        break;
      default:
        return <p>Default content</p>;
    }
  };

  return (
    <Draggable cancel=".general_box .term_box, .general_box .content_box">
      <div className="canvas" onClick={handleOnClick} ref={canvasRef}>
        {defPosList.map((defPos, index) => {
          return (
            <Generalbox
              positionX={defPos.x}
              positionY={defPos.y}
              index={index}
              singleClass={"Def"}
              fullClass={"Definition"}
            />
          );
        })}

        {propPosList.map((propPos, index) => {
          return (
            <Generalbox
              positionX={propPos.x}
              positionY={propPos.y}
              index={index}
              singleClass={"Prop"}
              fullClass={"Proposition"}
            />
          );
        })}

        {justPosList.map((propPos, index) => {
          return (
            <Generalbox
              positionX={propPos.x}
              positionY={propPos.y}
              index={index}
              singleClass={"Just"}
              fullClass={"Justification"}
            />
          );
        })}

        {conPosList.map((propPos, index) => {
          return (
            <Generalbox
              positionX={propPos.x}
              positionY={propPos.y}
              index={index}
              singleClass={"Con"}
              fullClass={"Counter Argument"}
            />
          );
        })}

        {notePosList.map((propPos, index) => {
          return (
            <Generalbox
              positionX={propPos.x}
              positionY={propPos.y}
              index={index}
              singleClass={"Note"}
              fullClass={"Side Note"}
            />
          );
        })}
      </div>
    </Draggable>
  );
}

export default Canvas;
