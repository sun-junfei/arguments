import { useRef, useState, useEffect } from "react";
import Draggable, { DraggableCore } from "react-draggable";

import {
  useAutosizeTextArea,
  useAutosizeInput,
  useAutosizeTextAreaResize,
} from "../Util";

function Generalbox(props) {
  const [toList, setToList] = useState([]);
  const [fromList, setFromList] = useState([]);
  const [isAbled, setIsAbled] = useState(true);
  // const [isGranted, setIsGranted] = useState(true);

  const [textvalue, setTextValue] = useState("");
  const textAreaRef = useRef(null);
  const generalBoxRef = useRef(null);
  const inputRef = useRef(null);
  const termBoxRef = useRef(null);
  const textRef = useRef(null);
  const [inputvalue, setInputValue] = useState("");

  const [isExpanded, setIsExpanded] = useState(true);

  /* these are for operation info */
  function handleGrantClick() {
    props.handleList((prevItem) => {
      var to_return = [];

      for (var i = 0; i < prevItem.length; i++) {
        if (prevItem[i].index !== props.index) {
          to_return.push(prevItem[i]);
        } else {
          to_return.push({
            index: prevItem[i].index,
            isAbled: prevItem[i].isAbled,
            isGranted: prevItem[i].isGranted ? false : true,
            X: prevItem[i].X,
            Y: prevItem[i].Y,
            toList: prevItem[i].toList,
            fromList: prevItem[i].fromList,
          });
        }
      }

      return to_return;
    });
  }

  /* other states control */
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

  const handleDrag = (e, ui) => {
    const { x, y } = ui;
    props.handleList((prevItem) => {
      var to_return = [];

      for (var i = 0; i < prevItem.length; i++) {
        if (prevItem[i].index !== props.index) {
          to_return.push(prevItem[i]);
        } else {
          to_return.push({
            index: prevItem[i].index,
            isAbled: prevItem[i].isAbled,
            isGranted: prevItem[i].isGranted,
            X: x,
            Y: y,
            toList: prevItem[i].toList,
            fromList: prevItem[i].fromList,
          });
        }
      }

      return to_return;
    });
  };

  /* determine buttonType for different boxes */
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

  /* Delete this Box */

  function handleDeleteClick() {
    props.handleDelete(props.id, props.handleList);
  }

  return (
    <Draggable
      // onDrag={handleDrag}
      className="general_drag"
      cancel=".general_box .term_box .label_box, .general_box .term_box .input_box, .general_box .term_box .expand_box .btn, .general_box .content_box .general_textarea"
    >
      <div
        className={`${props.singleClass}box general_box ${
          isExpanded ? "" : "retracted_box"
        }`}
        ref={generalBoxRef}
        style={{
          position: "absolute",
          top: props.positionY,
          left: props.positionX,
        }}
      >
        <div class="row">
          <div
            className={`term_box ${isExpanded ? "expanded_term" : ""} `}
            ref={termBoxRef}
          >
            <div class="row term_row_box">
              <div class="col-auto label_box">
                <label
                  className="term_label btn-group dropup"
                  for={props.index + "_term_input"}
                >
                  <button
                    type="button"
                    class={`btn btn-${buttonType} dropdown-toggle`}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >{`${props.singleClass} ${props.index}:`}</button>
                  <ul class="dropdown-menu">
                    <li>
                      <div class="dropdown-item">For</div>
                    </li>
                    <li>
                      <div class="dropdown-item">Against</div>
                    </li>
                    <li>
                      <div class="dropdown-item" onClick={handleGrantClick}>
                        {props.isGranted
                          ? "set not for granted"
                          : "set for granted"}
                      </div>
                    </li>
                    <li>
                      <div class="dropdown-item" onClick={handleDeleteClick}>
                        Delete
                      </div>
                    </li>
                  </ul>
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
