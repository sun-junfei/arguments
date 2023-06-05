import React, { useState, useRef } from "react";
import Draggable, { DraggableCore } from "react-draggable";
import Generalbox from "./Inputbox/Generalbox";
import LeaderLine from "react-leader-line";
import Singlebox from "./Inputbox/Singlebox";
import { click } from "@testing-library/user-event/dist/click";

function Canvas(props) {
  const [defCount, setDefCount] = useState(1);
  const [defList, setDefList] = useState([]);

  const [propCount, setPropCount] = useState(1);
  const [propList, setPropList] = useState([]);

  const [justCount, setJustCount] = useState(1);
  const [justList, setJustList] = useState([]);

  const [conCount, setConCount] = useState(1);
  const [conList, setConList] = useState([]);

  const [noteCount, setNoteCount] = useState(1);
  const [noteList, setNoteList] = useState([]);

  const [relationList, setRelationList] = useState([]);

  const canvasRef = useRef(null);

  function deleteList(index, setList) {
    setList((prevItems) => {
      return prevItems.filter((item) => {
        return item.index !== index;
      });
    });
  }

  function addList(newPos, setList, count, setCount) {
    setList((prevDev) => {
      return [
        ...prevDev,
        {
          index: count,
          isAbled: true,
          isGranted: true,
          X: newPos.x,
          Y: newPos.y,
          toList: [],
          fromList: [],
        },
      ];
    });

    setCount(count + 1);
  }

  const handleOnClick = (event) => {
    const canvasRect = canvasRef.current.getBoundingClientRect();
    /* the numerical values corresponds to half of the badge width and height */
    const posX = event.clientX - canvasRect.left - 41.328;
    const posY = event.clientY - canvasRect.top - 13.6665;

    const newPosition = { x: posX, y: posY };

    switch (props.clickedList[0]) {
      case "def":
        addList(newPosition, setDefList, defCount, setDefCount);
        props.clickedList[1](null);
        break;
      case "prop":
        addList(newPosition, setPropList, propCount, setPropCount);
        props.clickedList[1](null);
        break;
      case "just":
        addList(newPosition, setJustList, justCount, setJustCount);
        props.clickedList[1](null);
        break;
      case "con":
        addList(newPosition, setConList, conCount, setConCount);
        props.clickedList[1](null);
        break;
      case "note":
        addList(newPosition, setNoteList, noteCount, setNoteCount);
        props.clickedList[1](null);
        break;
      default:
        return <p>Default content</p>;
    }
  };

  return (
    <Draggable cancel=".general_box .term_box, .general_box .content_box">
      <div className="canvas" onClick={handleOnClick} ref={canvasRef}>
        {defList.map((def, id) => {
          return (
            <Generalbox
              key={def.index}
              id={id}
              positionX={def.X}
              positionY={def.Y}
              index={def.index}
              isAbled={def.isAbled}
              isGranted={def.isGranted}
              singleClass={"Def"}
              fullClass={"Definition"}
              handleDelete={deleteList}
              handleList={setDefList}
              List={defList}
            />
          );
        })}

        {propList.map((prop, id) => {
          return (
            <Generalbox
              key={prop.index}
              id={id}
              positionX={prop.X}
              positionY={prop.Y}
              index={prop.index}
              isAbled={prop.isAbled}
              isGranted={prop.isGranted}
              singleClass={"Prop"}
              fullClass={"Proposition"}
              handleDelete={deleteList}
              handleList={setPropList}
            />
          );
        })}
        {justList.map((just, id) => {
          return (
            <Generalbox
              key={just.index}
              id={id}
              positionX={just.X}
              positionY={just.Y}
              index={just.index}
              isAbled={just.isAbled}
              isGranted={just.isGranted}
              singleClass={"Just"}
              fullClass={"Justification"}
              handleDelete={deleteList}
              handleList={setJustList}
            />
          );
        })}

        {conList.map((con, id) => {
          return (
            <Generalbox
              key={con.index}
              id={id}
              positionX={con.X}
              positionY={con.Y}
              index={con.index}
              isAbled={con.isAbled}
              isGranted={con.isGranted}
              singleClass={"Con"}
              fullClass={"Counter Argument"}
              handleDelete={deleteList}
              handleList={setConList}
            />
          );
        })}

        {noteList.map((note, id) => {
          return (
            <Generalbox
              key={note.index}
              id={id}
              positionX={note.X}
              positionY={note.Y}
              index={note.index}
              isAbled={note.isAbled}
              isGranted={note.isGranted}
              singleClass={"Note"}
              fullClass={"Side Note"}
              handleDelete={deleteList}
              handleList={setNoteList}
            />
          );
        })}
      </div>
    </Draggable>
  );
}

export default Canvas;
