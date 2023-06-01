import React from "react";
import { ReactDOM } from "react";
import Toolelement from "./Toolelement";

function Toolbox(props) {
  return (
    <div class="toolbox_sidebar">
      <div class="logo_content">
        <div class="logo">
          <div class="logo_name">Add Components</div>
          <i class="bx bx-menu"></i>
        </div>
      </div>
      <ul class="nav_list">
        <Toolelement
          btnClass={"btn-outline-primary"}
          divClass={"def"}
          content={"Definition"}
          tipContent={"Used to make a definition for a specific term"}
        />
        <Toolelement
          btnClass={"btn-outline-success"}
          divClass={"prop"}
          content={"Proposition"}
          tipContent={
            "Make a proposition that takes a statement which will be proven to be correct, this can be any proposition from the general thesis to a subargument"
          }
        />
        <Toolelement
          btnClass={"btn-outline-info"}
          divClass={"evid"}
          content={"Evidence"}
          tipContent={
            "A piece of evidence used to support a proposition in the proof"
          }
        />
        <Toolelement
          btnClass={"btn-outline-danger"}
          divClass={"con"}
          content={"Counter Argument"}
          tipContent={
            "A counter argument to a proposition that has been raised"
          }
        />
        <Toolelement
          btnClass={"btn-outline-warning"}
          divClass={"note"}
          content={"Side Note"}
          tipContent={
            "Some side note to address some contents that is worth mentioning but will break the flow of reasoning if put into the normal proof"
          }
        />
      </ul>
    </div>
  );
}

export default Toolbox;
