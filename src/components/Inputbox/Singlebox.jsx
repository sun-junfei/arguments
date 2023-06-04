import { useRef, useState } from "react";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";

import { useAutosizeTextArea } from "../Util";

function Singlebox(props) {
  const [textvalue, setTextValue] = useState("");
  const textAreaRef = useRef(null);
  const singleBoxRef = useRef(null);

  const [isExpanded, setIsExpanded] = useState(true);
  const [textWidth, setTextWidth] = useState(350);

  let buttonType;

  switch (props.singleClass) {
    case "Prop":
      buttonType = "success";
      break;
    case "evi":
      buttonType = "info";
      break;
    case "con":
      buttonType = "danger";
      break;
    case "note":
      buttonType = "warning";
      break;
    default:
      break;
  }

  useAutosizeTextArea(
    singleBoxRef.current,
    textAreaRef.current,
    textvalue,
    "single_box",
    textWidth
  ); // update textarea height

  const handleTextChange = (evt) => {
    const val = evt.target?.value;

    setTextValue(val);
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
      className="single_drag"
      cancel=".single_box .expand_box .btn, .single_box .content_row_box .single_textarea"
    >
      <div
        className={`${props.singleClass}box single_box flex-nowrap`}
        ref={singleBoxRef}
        style={{
          position: "absolute",
          top: props.positionY,
          left: props.positionX,
        }}
        id={props.index + `_${props.singleClass}_box`}
      >
        <div class="row" style={{ display: "flex", flexWrap: "nowrap" }}>
          <div class="col-auto expand_box">
            <button
              type="button"
              className={`btn btn-${buttonType}`}
              onClick={handleOnClick}
            >
              {isExpanded ? (
                <i class="bx bx-collapse-horizontal"></i>
              ) : (
                <i class="bx bx-expand-horizontal"></i>
              )}
            </button>
          </div>

          <div class="col-auto label_box">
            <label className="term_label">
              {`${props.singleClass} ${props.index}`}
            </label>
          </div>

          <div class="col-auto content_row_box">
            <div
              className={`content_box ${isExpanded ? "" : "retracted_content"}`}
            >
              <Resizable
                width={textWidth} // initial width
                onResize={handleResize}
              >
                <textarea
                  id="single_text"
                  className={`single_textarea ${
                    isExpanded ? "" : "retracted_textarea"
                  }`}
                  onChange={handleTextChange}
                  ref={textAreaRef}
                  placeholder={`Enter your ${props.singleClass}`}
                  rows={1}
                  value={textvalue}
                />
              </Resizable>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
}

export default Singlebox;
