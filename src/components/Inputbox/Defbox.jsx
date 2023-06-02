import { useRef, useState, useEffect } from "react";

import { useAutosizeTextArea } from "../Util";

function Defbox(props) {
  const [value, setValue] = useState("");
  const textAreaRef = useRef(null);
  const defBoxRef = useRef(null);

  useAutosizeTextArea(defBoxRef.current, textAreaRef.current, value);

  const handleChange = (evt) => {
    const val = evt.target?.value;

    setValue(val);
  };

  return (
    <div
      className="defbox"
      ref={defBoxRef}
      style={{
        position: "absolute",
        top: props.positionY,
        left: props.positionX,
      }}
    >
      <div class="row">
        <div class="col-4 def_badge_box">
          <span class="badge rounded-pill text-bg-primary def_badge">Def:</span>
        </div>
        <div class="col-8 term_box">
          <input
            type="text"
            className="term_input"
            placeholder="Term to define"
          />
        </div>
      </div>
      <div class="row content_box">
        <textarea
          id="definition_text"
          className="def_textarea"
          onChange={handleChange}
          ref={textAreaRef}
          placeholder="Definition"
          rows={1}
          value={value}
        />
      </div>
    </div>
  );
}

export default Defbox;
