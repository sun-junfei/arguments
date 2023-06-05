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
      return prevItems.filter((item, item_index) => {
        return item_index !== index;
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
          initX: newPos.x,
          initY: newPos.y,
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
              key={id}
              id={id}
              positionX={def.initX}
              positionY={def.initY}
              index={def.index}
              isAbled={def.isAbled}
              isGranted={def.isGranted}
              singleClass={"Def"}
              fullClass={"Definition"}
              handleDelete={deleteList}
              handleList={setDefList}
            />
          );
        })}

        {propList.map((prop, id) => {
          return (
            <Generalbox
              key={id}
              id={id}
              positionX={prop.initX}
              positionY={prop.initY}
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
              key={id}
              id={id}
              positionX={just.initX}
              positionY={just.initY}
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
              key={id}
              id={id}
              positionX={con.initX}
              positionY={con.initY}
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
              key={id}
              id={id}
              positionX={note.initX}
              positionY={note.initY}
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
