import React, { useState, useRef, useMemo } from "react";
import Draggable, { DraggableCore } from "react-draggable";
import Generalbox from "./Inputbox/Generalbox";
import LeaderLine from "react-leader-line";
import Singlebox from "./Inputbox/Singlebox";
import { click } from "@testing-library/user-event/dist/click";
import { useEffect } from "react";
import { hover } from "@testing-library/user-event/dist/hover";

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

  const [selectState, setSelectState] = useState(null);

  const lines = useRef([]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Function to update the mouse position

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

  /* leaderline building */

  useEffect(() => {
    if (selectState !== null) {
      const line = new LeaderLine(
        // Start point (can be an element or coordinates)
        document.getElementById(selectState.source),
        // End point (initialize with initial position)

        document.getElementById("for_seek"),
        // Optional configuration options
        {
          color: selectState.mode === "for" ? "#00DFA2" : "#FF0060",
          dash: { animation: true },
          size: 2,
        }
      );

      const handleMouseMove = (event) => {
        const { clientX, clientY } = event;
        setMousePosition({
          x: clientX - canvasRef.current.getBoundingClientRect().left,
          y: clientY - canvasRef.current.getBoundingClientRect().top,
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        line.remove();
      };
    }
  }, [mousePosition, selectState]);

  useEffect(() => {
    function buildLeaderLines(boxList, prefix) {
      const newLines = [];
      if (boxList) {
        boxList.forEach((item) => {
          item.fromList.forEach((from) => {
            const lineOptions = {
              color: from.mode === "for" ? "#00DFA2" : "#FF0060",
              size: 2.5,
              middleLabel: from.mode === "for" ? "supports" : "against",
            };
            const line = new LeaderLine(
              document.getElementById(from.source),
              document.getElementById(prefix + item.index),
              lineOptions
            );

            newLines.push(line);
          });
        });
      }
      return newLines;
    }

    lines.current = [
      ...buildLeaderLines(defList, "Def "),
      ...buildLeaderLines(propList, "Prop "),
      ...buildLeaderLines(justList, "Just "),
      ...buildLeaderLines(conList, "Con "),
      ...buildLeaderLines(noteList, "Note "),
    ];

    return () => {
      lines.current.forEach((line) => line.remove());
    };
  }, [defList, propList, justList, conList, noteList]);

  function handleCanvasDrag() {
    lines.current.map((line) => {
      line.position();
    });
  }

  return (
    <Draggable
      onDrag={handleCanvasDrag}
      cancel=".general_box .term_box, .general_box .content_box"
    >
      <div className="canvas" onClick={handleOnClick} ref={canvasRef}>
        <div
          id="for_seek"
          style={{
            position: "absolute",
            left: mousePosition.x,
            top: mousePosition.y,
          }}
        ></div>
        {defList.map((def, id) => {
          return (
            <div>
              <Generalbox
                key={def.index}
                id={`Def ${def.index}`}
                positionX={def.X}
                positionY={def.Y}
                index={def.index}
                isAbled={def.isAbled}
                isGranted={def.isGranted}
                singleClass={"Def"}
                fullClass={"Definition"}
                handleDelete={deleteList}
                handleList={setDefList}
                selectState={selectState}
                setSelectState={setSelectState}
                lines={lines}
              />
            </div>
          );
        })}

        {propList.map((prop, id) => {
          return (
            <div>
              <Generalbox
                key={prop.index}
                id={`Prop ${prop.index}`}
                positionX={prop.X}
                positionY={prop.Y}
                index={prop.index}
                isAbled={prop.isAbled}
                isGranted={prop.isGranted}
                singleClass={"Prop"}
                fullClass={"Proposition"}
                handleDelete={deleteList}
                handleList={setPropList}
                selectState={selectState}
                setSelectState={setSelectState}
                lines={lines}
              />
            </div>
          );
        })}
        {justList.map((just, id) => {
          return (
            <Generalbox
              key={just.index}
              id={`Just ${just.index}`}
              positionX={just.X}
              positionY={just.Y}
              index={just.index}
              isAbled={just.isAbled}
              isGranted={just.isGranted}
              singleClass={"Just"}
              fullClass={"Justification"}
              handleDelete={deleteList}
              handleList={setJustList}
              selectState={selectState}
              setSelectState={setSelectState}
              lines={lines}
            />
          );
        })}

        {conList.map((con, id) => {
          return (
            <Generalbox
              key={con.index}
              id={`Con ${con.index}`}
              positionX={con.X}
              positionY={con.Y}
              index={con.index}
              isAbled={con.isAbled}
              isGranted={con.isGranted}
              singleClass={"Con"}
              fullClass={"Counter Argument"}
              handleDelete={deleteList}
              handleList={setConList}
              selectState={selectState}
              setSelectState={setSelectState}
              lines={lines}
            />
          );
        })}

        {noteList.map((note, id) => {
          return (
            <Generalbox
              key={note.index}
              id={`Note ${note.index}`}
              positionX={note.X}
              positionY={note.Y}
              index={note.index}
              isAbled={note.isAbled}
              isGranted={note.isGranted}
              singleClass={"Note"}
              fullClass={"Side Note"}
              handleDelete={deleteList}
              handleList={setNoteList}
              selectState={selectState}
              setSelectState={setSelectState}
              lines={lines}
            />
          );
        })}
      </div>
    </Draggable>
  );
}

export default Canvas;
