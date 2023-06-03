import { useRef, useState, useEffect } from "react";
import Draggable, { DraggableCore } from "react-draggable";

import { useAutosizeTextArea, useAutosizeInput } from "../Util";

function Defbox(props) {
  const [textvalue, setTextValue] = useState("");
  const textAreaRef = useRef(null);
  const defBoxRef = useRef(null);
  const inputRef = useRef(null);
  const termBoxRef = useRef(null);
  const [inputvalue, setInputValue] = useState("");

  const [isExpanded, setIsExpanded] = useState(true);

  useAutosizeTextArea(defBoxRef.current, textAreaRef.current, textvalue); // update textarea height

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

  return (
    <Draggable cancel=".defbox .term_box .input_box, .defbox .term_box .expand_box, .defbox .content_box .def_textarea">
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
            className={`col-6 term_box ${isExpanded ? "expanded_term" : ""} `}
            ref={termBoxRef}
          >
            <div class="row term_row_box">
              <div class="col-3 label_box">
                <label className="term_label" for={props.index + "_term_input"}>
                  Def:
                </label>
              </div>
              <div class="col-8 input_box">
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
              <div class="col-1 expand_box">
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

        <div class="row">
          <div
            className={`content_box ${isExpanded ? "" : "retracted_content"}`}
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
        </div>
      </div>
    </Draggable>
  );
}

export default Defbox;
