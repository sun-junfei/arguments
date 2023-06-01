import React, { useState } from "react";
import { ReactDOM } from "react";
import Toolelement from "./Toolelement";

function Toolbox(props) {
  /* this state is for dealing with expanding or retracting the sidebar */
  const [isExpanded, setIsExpanded] = useState(false);

  /* this will be called by the menu button*/
  function handleOnClick() {
    if (isExpanded) {
      setIsExpanded(false);
    } else if (!isExpanded) {
      setIsExpanded(true);
    }
  }

  return (
    <div className={`toolbox_sidebar ${isExpanded ? "expanded" : ""}`}>
      <div class="logo_content">
        <div class="logo">
          <button type="button" class="btn btn-dark" onClick={handleOnClick}>
            <i class="bx bx-menu"></i>
          </button>
          {isExpanded && <div class="logo_name">Add Components</div>}
        </div>
      </div>
      <ul class="nav_list">
        <Toolelement
          btnClass={"btn-outline-primary"}
          divClass={"def"}
          content={"Definition"}
          abrieviated={"Def"}
          tipContent={"Used to make a definition for a specific term"}
          isExpanded={isExpanded}
          clickedList={props.clickedList}
        />
        <Toolelement
          btnClass={"btn-outline-success"}
          divClass={"prop"}
          content={"Proposition"}
          abrieviated={"Prop"}
          tipContent={
            "Make a proposition that takes a statement which will be proven to be correct, this can be any proposition from the general thesis to a subargument"
          }
          isExpanded={isExpanded}
          clickedList={props.clickedList}
        />
        <Toolelement
          btnClass={"btn-outline-info"}
          divClass={"evi"}
          content={"Evidence"}
          abrieviated={"Evi"}
          tipContent={
            "A piece of evidence used to support a proposition in the proof"
          }
          isExpanded={isExpanded}
          clickedList={props.clickedList}
        />
        <Toolelement
          btnClass={"btn-outline-danger"}
          divClass={"con"}
          content={"Counter Argument"}
          abrieviated={"Con"}
          tipContent={
            "A counter argument to a proposition that has been raised"
          }
          isExpanded={isExpanded}
          clickedList={props.clickedList}
        />
        <Toolelement
          btnClass={"btn-outline-warning"}
          divClass={"note"}
          content={"Side Note"}
          abrieviated={"Note"}
          tipContent={
            "Some side note to address some contents that is worth mentioning but will break the flow of reasoning if put into the normal proof"
          }
          isExpanded={isExpanded}
          clickedList={props.clickedList}
        />
      </ul>
    </div>
  );
}

export default Toolbox;
