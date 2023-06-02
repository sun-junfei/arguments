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

  /* handle clicked state */
  function handleOnClick() {
    props.clickedList[1](props.divClass);
    console.log(props.clickedList[0]);
  }

  return (
    <li>
      <div
        className={`${props.divClass}${
          isHovered && props.isExpanded ? "_hovered" : ""
        }`}
      >
        <button
          type="button"
          className={`btn ${props.btnClass} component_btn`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleOnClick}
        >
          {props.isExpanded ? props.content : props.abrieviated}
        </button>

        {props.isExpanded && (
          <span className={`tooltip ${props.divClass}_tooltip`}>
            {props.tipContent}
          </span>
        )}
      </div>
    </li>
  );
}

export default Toolelement;
