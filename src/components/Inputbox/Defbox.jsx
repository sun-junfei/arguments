import { useRef, useState, useEffect } from "react";
import Draggable, { DraggableCore } from "react-draggable";
import { Resizable } from "react-resizable";

import { useAutosizeTextArea, useAutosizeInput } from "../Util";

function Defbox(props) {
  const [textvalue, setTextValue] = useState("");
  const textAreaRef = useRef(null);
  const defBoxRef = useRef(null);
  const inputRef = useRef(null);
  const termBoxRef = useRef(null);
  const [inputvalue, setInputValue] = useState("");
  const [textWidth, setTextWidth] = useState(400);

  const [isExpanded, setIsExpanded] = useState(true);

  useAutosizeTextArea(
    defBoxRef.current,
    textAreaRef.current,
    textvalue,
    "defbox",
    textWidth
  ); // update textarea height

  const handleTextChange = (evt) => {
    const val = evt.target?.value;

    setTextValue(val);
  };

  useAutosizeInput(termBoxRef.current, inputRef.current, inputvalue); // update input width

  const handleInputChange = (evt) => {
    const val = evt.target?.value;

    setInputValue(val);
  };

  function handleOnClick() {
    if (isExpanded) {
      setIsExpanded(false);
    } else if (!isExpanded) {
      setIsExpanded(true);
    }
  }

  const handleResize = (event, { size }) => {
    setTextWidth(size.width);
  };

  return (
    <Draggable
      className="def_drag"
      cancel=".defbox .term_box .input_box, .defbox .term_box .expand_box, .defbox .content_box"
    >
      <div
        className="defbox"
        ref={defBoxRef}
        style={{
          position: "absolute",
          top: props.positionY,
          left: props.positionX,
        }}
        id={props.index + "_def_box"}
      >
        <div class="row">
          <div
            className={`term_box ${isExpanded ? "expanded_term" : ""} `}
            ref={termBoxRef}
          >
            <div class="row term_row_box">
              <div class="col-auto label_box">
                <label className="term_label" for={props.index + "_term_input"}>
                  {`Def ${props.index}:`}
                </label>
              </div>
              <div class="col-auto input_box">
                <input
                  type="text"
                  ref={inputRef}
                  id={props.index + "_term_input"}
                  className="term_input"
                  placeholder="Term to define"
                  onChange={handleInputChange}
                  value={inputvalue}
                  spellCheck="false"
                />
              </div>
              <div class="col-auto expand_box">
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={handleOnClick}
                >
                  {isExpanded ? (
                    <i class="bx bx-collapse-vertical"></i>
                  ) : (
                    <i class="bx bx-expand-vertical"></i>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="row content_row_box">
          <Resizable
            width={textWidth} // initial width
            onResize={handleResize}
            handleComponent={{ bottomRight: <div className="resize-handle" /> }}
          >
            <div
              className={`col-auto content_box ${
                isExpanded ? "" : "retracted_content"
              }`}
              style={{ width: textWidth }}
            >
              <textarea
                id="definition_text"
                className="def_textarea"
                onChange={handleTextChange}
                ref={textAreaRef}
                placeholder="Definition"
                rows={1}
                value={textvalue}
              />
            </div>
          </Resizable>
        </div>
      </div>
    </Draggable>
  );
}

export default Defbox;
