import React, { useState, useRef, useMemo } from "react";
import Draggable, { DraggableCore } from "react-draggable";
import Generalbox from "./Inputbox/Generalbox";
import LeaderLine from "react-leader-line";
import Singlebox from "./Inputbox/Singlebox";
import { click } from "@testing-library/user-event/dist/click";
import { useEffect } from "react";
import { hover } from "@testing-library/user-event/dist/hover";
import Linemenu from "./Linemenu";
import { handleAbleLogic } from "./Util";

function Canvas(props) {
  const [defCount, setDefCount] = useState(1);

  const [propCount, setPropCount] = useState(1);

  const [justCount, setJustCount] = useState(1);

  const [conCount, setConCount] = useState(1);

  const [noteCount, setNoteCount] = useState(1);

  const [boxDict, setBoxDict] = useState({});

  const lines = useRef([]);
  const lineSelectionRef = useRef(props.lineSelection);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Function to update the mouse position

  const canvasRef = useRef(null);

  function deleteDict(id, boxDict, setBoxDict) {
    setBoxDict((prevItems) => {
      var to_return = {};

      for (const key in boxDict) {
        if (key !== id) {
          to_return[key] = prevItems[key];
        }
      }

      return to_return;
    });
  }

  function addDict(newPos, key, count, setCount) {
    setBoxDict(() => {
      return {
        ...boxDict,
        [key]: {
          index: count,
          isGranted: true,
          X: newPos.x,
          Y: newPos.y,
          fromList: [],
        },
      };
    });

    setCount(count + 1);
  }

  const handleOnClick = (event) => {
    /* in lineSelection, set the selectState to null */

    /* exists selectState, set the line select to null*/
    if (props.selectState !== null) {
      props.setSelectState(null);
      return;
    }

    /* create new box */
    const canvasRect = canvasRef.current.getBoundingClientRect();
    /* the numerical values corresponds to half of the badge width and height */
    const posX = event.clientX - canvasRect.left - 41.328;
    const posY = event.clientY - canvasRect.top - 13.6665;

    const newPosition = { x: posX, y: posY };

    switch (props.clickedList[0]) {
      case "def":
        addDict(newPosition, "Def " + defCount, defCount, setDefCount);
        props.clickedList[1](null);
        break;
      case "prop":
        addDict(newPosition, "Prop " + propCount, propCount, setPropCount);
        props.clickedList[1](null);
        break;
      case "just":
        addDict(newPosition, "Just " + justCount, justCount, setJustCount);
        props.clickedList[1](null);
        break;
      case "con":
        addDict(newPosition, "Con " + conCount, conCount, setConCount);
        props.clickedList[1](null);
        break;
      case "note":
        addDict(newPosition, "Note " + noteCount, noteCount, setNoteCount);
        props.clickedList[1](null);
        break;
      default:
        return <p>Default content</p>;
    }
  };

  /* leaderline building */

  useEffect(() => {
    if (props.selectState !== null) {
      let line_color;
      if (props.selectState.mode === "for") {
        line_color = "#00DFA2";
      } else if (props.selectState.mode === "against") {
        line_color = "#FF0060";
      } else {
        line_color = "#080202";
      }

      const line = new LeaderLine(
        // Start point (can be an element or coordinates)
        document.getElementById(props.selectState.source),
        // End point (initialize with initial position)

        document.getElementById("for_seek"),
        // Optional configuration options
        {
          color: line_color,
          dash: { animation: true },
          size: 4,
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
  }, [mousePosition, props.selectState]);

  useEffect(() => {
    function buildLeaderLines(boxDict) {
      const newLines = [];
      for (const key in boxDict) {
        boxDict[key].fromList.forEach((from) => {
          let line_color;
          let middle_content;
          if (from.mode === "for") {
            line_color = "#00DFA2";
            middle_content = "supports";
          } else if (from.mode === "against") {
            line_color = "#FF0060";
            middle_content = "against";
          } else {
            line_color = "#080202";
            middle_content = "for";
          }
          const lineOptions = {
            color: line_color,
            size: from.isSufficient ? 6 : 4,
            middleLabel: middle_content,
            startLabel: LeaderLine.pathLabel(
              from.isSufficient ? "(sufficient)" : ""
            ),
            outline:
              props.lineSelection !== null &&
              props.lineSelection.source === from.source &&
              props.lineSelection.to === key,
            outlineColor: "#2ca4fa",
            outlineSize: 0.5,
            endPlugOutline:
              props.lineSelection !== null &&
              props.lineSelection.source === from.source &&
              props.lineSelection.to === key,
          };
          var line = new LeaderLine(
            document.getElementById(from.source),
            document.getElementById(key),
            lineOptions
          );

          document
            .querySelector(".leader-line:last-of-type")
            .addEventListener("click", function () {
              props.setLineSelection({
                source: from.source,
                to: key,
                sufficientWith: from.sufficientWith,
              });
            });

          document
            .querySelector(".leader-line:last-of-type")
            .addEventListener("contextmenu", function (event) {
              handleLineMenu(event);
              props.setLineSelection({
                source: from.source,
                to: key,
                mode: from.mode,
                sufficientWith: from.sufficientWith,
                isSufficient: from.isSufficient,
              });
            });

          newLines.push(line);
        });
      }
      return newLines;
    }

    lines.current = buildLeaderLines(boxDict);

    return () => {
      lines.current.forEach((line) => line.remove());
    };
  }, [boxDict, props.lineSelection]);

  function handleCanvasDrag() {
    lines.current.map((line) => {
      line.position();
    });
  }

  const handleLineMenu = (event) => {
    event.preventDefault(); // Prevent the default menu from appearing
    // Handle the right-click event here
    props.setMenuVisible(true);

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const posX = event.clientX - canvasRect.left;
    const posY = event.clientY - canvasRect.top;
    props.setMenuPosition({ x: posX, y: posY });
  };

  /* for relation deletion */
  useEffect(() => {
    lineSelectionRef.current = props.lineSelection;
  }, [props.lineSelection]);

  function updateLine(lineSelection, update) {
    if (lineSelection !== null) {
      setBoxDict((prevItem) => {
        var to_return = {};
        for (const key in prevItem) {
          if (key !== lineSelection.to) {
            to_return[key] = prevItem[key];
          } else {
            to_return[key] = update(lineSelection, prevItem[key]);
          }
        }

        return to_return;
      });
    }
  }

  function deleteLine(lineSelection, item) {
    return {
      index: item.index,
      isGranted: item.isGranted,
      X: item.X,
      Y: item.Y,
      fromList: item.fromList.filter(
        (from) => from.source !== lineSelection.source
      ),
    };
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Delete" && lineSelectionRef.current !== null) {
      updateLine(lineSelectionRef.current, deleteLine);
      props.setLineSelection(null);
    }
  });

  return (
    <Draggable
      onDrag={handleCanvasDrag}
      cancel={
        ".general_box .term_box, .general_box .content_box, .canvas_selected, .general_box .disabled_cover"
      }
    >
      <div
        className={`canvas ${props.selectState && "canvas_selected"}`}
        onClick={handleOnClick}
        ref={canvasRef}
      >
        {props.menuVisible && (
          <Linemenu
            xPos={props.menuPosition.x}
            yPos={props.menuPosition.y}
            lineSelection={props.lineSelection}
            updateLine={updateLine}
            deleteLine={deleteLine}
            boxDict={boxDict}
            setBoxDict={setBoxDict}
          />
        )}
        <div
          id="for_seek"
          style={{
            position: "absolute",
            left: mousePosition.x,
            top: mousePosition.y,
          }}
        ></div>
        {boxDict &&
          Object.keys(boxDict).map((key) => {
            // eslint-disable-next-line no-lone-blocks
            {
              if (key.startsWith("Def")) {
                const def = boxDict[key];
                return (
                  <Generalbox
                    key={def.index}
                    id={key}
                    positionX={def.X}
                    positionY={def.Y}
                    index={def.index}
                    isGranted={def.isGranted}
                    isAbled={handleAbleLogic(def, boxDict)}
                    fromList={def.fromList}
                    singleClass={"Def"}
                    fullClass={"Definition"}
                    handleDelete={deleteDict}
                    boxDict={boxDict}
                    setBoxDict={setBoxDict}
                    selectState={props.selectState}
                    setSelectState={props.setSelectState}
                    lines={lines}
                  />
                );
              } else if (key.startsWith("Prop")) {
                const prop = boxDict[key];
                return (
                  <Generalbox
                    key={prop.index}
                    id={key}
                    positionX={prop.X}
                    positionY={prop.Y}
                    index={prop.index}
                    isGranted={prop.isGranted}
                    isAbled={handleAbleLogic(prop, boxDict)}
                    fromList={prop.fromList}
                    singleClass={"Prop"}
                    fullClass={"Proposition"}
                    handleDelete={deleteDict}
                    boxDict={boxDict}
                    setBoxDict={setBoxDict}
                    selectState={props.selectState}
                    setSelectState={props.setSelectState}
                    lines={lines}
                  />
                );
              } else if (key.startsWith("Just")) {
                const just = boxDict[key];
                return (
                  <Generalbox
                    key={just.index}
                    id={key}
                    positionX={just.X}
                    positionY={just.Y}
                    index={just.index}
                    isGranted={just.isGranted}
                    isAbled={handleAbleLogic(just, boxDict)}
                    fromList={just.fromList}
                    singleClass={"Just"}
                    fullClass={"Justification"}
                    handleDelete={deleteDict}
                    boxDict={boxDict}
                    setBoxDict={setBoxDict}
                    selectState={props.selectState}
                    setSelectState={props.setSelectState}
                    lines={lines}
                  />
                );
              } else if (key.startsWith("Con")) {
                const con = boxDict[key];
                return (
                  <Generalbox
                    key={con.index}
                    id={key}
                    positionX={con.X}
                    positionY={con.Y}
                    index={con.index}
                    isGranted={con.isGranted}
                    isAbled={handleAbleLogic(con, boxDict)}
                    fromList={con.fromList}
                    singleClass={"Con"}
                    fullClass={"Counter Argument"}
                    handleDelete={deleteDict}
                    boxDict={boxDict}
                    setBoxDict={setBoxDict}
                    selectState={props.selectState}
                    setSelectState={props.setSelectState}
                    lines={lines}
                  />
                );
              } else if (key.startsWith("Note")) {
                const note = boxDict[key];
                return (
                  <Generalbox
                    key={note.index}
                    id={key}
                    positionX={note.X}
                    positionY={note.Y}
                    index={note.index}
                    isGranted={note.isGranted}
                    isAbled={handleAbleLogic(note, boxDict)}
                    fromList={note.fromList}
                    singleClass={"Note"}
                    fullClass={"Side Note"}
                    handleDelete={deleteDict}
                    boxDict={boxDict}
                    setBoxDict={setBoxDict}
                    selectState={props.selectState}
                    setSelectState={props.setSelectState}
                    lines={lines}
                  />
                );
              }
            }
          })}
      </div>
    </Draggable>
  );
}

export default Canvas;
