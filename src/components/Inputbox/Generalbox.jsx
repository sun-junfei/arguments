import { useRef, useState, useEffect } from "react";
import Draggable, { DraggableCore } from "react-draggable";

import {
  useAutosizeTextArea,
  useAutosizeInput,
  useAutosizeTextAreaResize,
} from "../Util";

function Generalbox(props) {
  const [textvalue, setTextValue] = useState("");
  const textAreaRef = useRef(null);
  const generalBoxRef = useRef(null);
  const inputRef = useRef(null);
  const termBoxRef = useRef(null);
  const textRef = useRef(null);
  const [inputvalue, setInputValue] = useState("");

  const [isExpanded, setIsExpanded] = useState(true);

  useAutosizeTextArea(
    generalBoxRef.current,
    textAreaRef.current,
    textvalue,
    "defbox"
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

  useAutosizeTextAreaResize(
    textRef,
    generalBoxRef.current,
    textAreaRef.current,
    "defbox"
  );

  let buttonType;

  switch (props.singleClass) {
    case "Def":
      buttonType = "primary";
      break;
    case "Prop":
      buttonType = "success";
      break;
    case "Just":
      buttonType = "info";
      break;
    case "Con":
      buttonType = "danger";
      break;
    case "Note":
      buttonType = "warning";
      break;
    default:
      break;
  }

  return (
    <Draggable
      className="general_drag"
      cancel=".general_box .term_box .input_box, .general_box .term_box .expand_box, .general_box .content_box"
    >
      <div
        className={`${props.singleClass}box general_box`}
        ref={generalBoxRef}
        style={{
          position: "absolute",
          top: props.positionY,
          left: props.positionX,
        }}
        key={props.index}
      >
        <div class="row">
          <div
            className={`term_box ${isExpanded ? "expanded_term" : ""} `}
            ref={termBoxRef}
          >
            <div class="row term_row_box">
              <div class="col-auto label_box">
                <label className="term_label" for={props.index + "_term_input"}>
                  {`${props.singleClass} ${props.index}:`}
                </label>
              </div>
              {props.singleClass === "Def" && (
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
              )}

              <div class="col-auto expand_box">
                <button
                  type="button"
                  class={`btn btn-${buttonType}`}
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
          <div
            className={`col-auto content_box ${
              isExpanded ? "" : "retracted_content"
            }`}
            ref={textRef}
          >
            <textarea
              id="general_text"
              className={`general_textarea ${props.singleClass}_textarea`}
              onChange={handleTextChange}
              ref={textAreaRef}
              placeholder={`Enter the ${props.fullClass}`}
              rows={1}
              value={textvalue}
            />
          </div>
        </div>
      </div>
    </Draggable>
  );
}

export default Generalbox;
