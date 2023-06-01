import React, { useState } from "react";
import { ReactDOM } from "react";

function Toolelement(props) {
  /* this state is to handle the style change when hovered */
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  return (
    <li>
      <div className={`${props.divClass}${isHovered ? "_hovered" : ""}`}>
        <button
          type="button"
          className={`btn ${props.btnClass} component_btn`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {props.content}
        </button>
        <span className={`tooltip ${props.divClass}_tooltip`}>
          {props.tipContent}
        </span>
      </div>
    </li>
  );
}

export default Toolelement;
