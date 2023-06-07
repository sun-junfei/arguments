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
  const dropdownRef = useRef(null);
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
            fromList: prevItem[i].fromList,
          });
        }
      }

      return to_return;
    });
  }

  function handleBoxDrag() {
    props.lines.current.map((line) => {
      line.position();
    });
  }

  function handleClickFor() {
    var button = document.getElementById(props.id + "button");
    button.click();
    props.setSelectState({ mode: "for", source: props.id });
  }

  function handleClickAgainst() {
    var button = document.getElementById(props.id + "button");
    button.click();
    props.setSelectState({ mode: "against", source: props.id });
  }

  function handleSelectClick() {
    if (props.selectState !== null) {
      var alreadyExist = false;
      for (var i = 0; i < props.fromList.length; i++) {
        if (props.selectState.source === props.fromList[i].source) {
          alreadyExist = true;
          break;
        }
      }

      if (!alreadyExist && props.selectState.source !== props.id) {
        props.handleList((prevItem) => {
          var to_return = [];

          for (var i = 0; i < prevItem.length; i++) {
            if (prevItem[i].index !== props.index) {
              to_return.push(prevItem[i]);
            } else {
              if (!prevItem[i].fromList.includes(props.selectState.source)) {
                to_return.push({
                  index: prevItem[i].index,
                  isAbled: prevItem[i].isAbled, // need to change
                  isGranted: false,
                  X: prevItem[i].X,
                  Y: prevItem[i].Y,
                  fromList: [...prevItem[i].fromList, props.selectState],
                });
              } else {
                to_return.push(prevItem[i]);
              }
            }
          }

          return to_return;
        });
      }
      props.setSelectState(null);
    }
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
    props.handleDelete(props.index, props.handleList);
  }

  return (
    <Draggable
      onDrag={handleBoxDrag}
      className="general_drag"
      cancel={`.general_box .term_box .label_box, .general_box .term_box .input_box, .general_box .term_box .expand_box .btn, .general_box .content_box, ${
        props.selectState && ".general_box .term_box"
      }`}
    >
      <div
        className={`${props.singleClass}box general_box ${
          isExpanded ? "expanded_box" : "retracted_box"
        } ${props.selectState !== null ? "selected_box" : ""}${
          props.selectState !== null &&
          props.selectState.source !== props.id &&
          ![
            ...props.fromList.map((from) => {
              return from.source;
            }),
          ].includes(props.selectState.source)
            ? "_selectable"
            : ""
        }`}
        id={`general_${props.id}`}
        ref={generalBoxRef}
        style={{
          position: "absolute",
          top: props.positionY,
          left: props.positionX,
        }}
        onClick={handleSelectClick}
      >
        <div class="row">
          <div
            className={`term_box ${
              isExpanded ? "expanded_term" : "retracted_term"
            } ${
              props.selectState &&
              props.selectState.source !== props.id &&
              ![
                ...props.fromList.map((from) => {
                  return from.source;
                }),
              ].includes(props.selectState.source) &&
              "selected_term"
            } `}
            ref={termBoxRef}
            id={`${props.singleClass} ${props.index}`}
          >
            <div class="row term_row_box">
              <div class="col-auto label_box">
                <label
                  className="term_label btn-group dropup"
                  for={props.index + "_term_input"}
                >
                  <button
                    id={props.id + "button"}
                    type="button"
                    class={`btn btn-${buttonType} dropdown-toggle`}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    disabled={props.selectState !== null}
                    ref={dropdownRef}
                  >{`${props.singleClass} ${props.index}:`}</button>
                  <ul class="dropdown-menu operation_menu">
                    {props.singleClass !== "Def" && (
                      <li>
                        <div class="dropdown-item" onClick={handleClickFor}>
                          For
                        </div>
                      </li>
                    )}
                    {props.singleClass !== "Def" && (
                      <li>
                        <div class="dropdown-item" onClick={handleClickAgainst}>
                          Against
                        </div>
                      </li>
                    )}
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
                  disabled={props.selectState !== null}
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
            onClick={handleSelectClick}
          >
            <textarea
              id="general_text"
              className={`general_textarea ${props.singleClass}_textarea ${
                props.selectState && "selected_textarea"
              }`}
              onChange={handleTextChange}
              ref={textAreaRef}
              placeholder={`Enter the ${props.fullClass}`}
              rows={1}
              value={textvalue}
              disabled={props.selectState}
            />
          </div>
        </div>
      </div>
    </Draggable>
  );
}

export default Generalbox;
