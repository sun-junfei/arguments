import { func } from "prop-types";
import React from "react";

const Linemenu = (props) => {
  function handleClickDelete() {
    props.updateLine(props.lineSelection, props.deleteLine);
  }

  function switchMode(lineSelection, item) {
    return {
      index: item.index,

      isGranted: item.isGranted,
      X: item.X,
      Y: item.Y,
      fromList: item.fromList.map((from) => {
        if (from.source === lineSelection.source) {
          return {
            ...from,
            mode: from.mode === "for" ? "against" : "for",
          };
        }
        return from;
      }),
    };
  }

  function handleClickMode() {
    props.updateLine(props.lineSelection, switchMode);
  }

  function switchSuffice(lineSelection, item) {
    return {
      index: item.index,

      isGranted: item.isGranted,
      X: item.X,
      Y: item.Y,
      fromList: item.fromList.map((from) => {
        if (from.source === lineSelection.source) {
          return {
            ...from,
            isSufficient: from.isSufficient ? false : true,
          };
        }
        return from;
      }),
    };
  }

  function handleClickSuffice() {
    props.updateLine(props.lineSelection, switchSuffice);
  }

  function handleClickWith() {}

  return (
    <div
      class="list-group"
      style={{
        position: "fixed",
        top: props.yPos,
        left: props.xPos,
        zIndex: 9999,
        fontSize: 12,
      }}
    >
      {props.lineSelection.mode !== "neutral" && (
        <div
          class="list-group-item list-group-item-action"
          onClick={handleClickSuffice}
        >
          {`set as ${
            props.lineSelection.isSufficient ? "not sufficient" : "sufficient"
          }`}
        </div>
      )}
      {props.lineSelection.mode !== "neutral" && (
        <div
          class="list-group-item list-group-item-action"
          onClick={handleClickMode}
        >
          {`set as ${
            props.lineSelection.mode === "for" ? "against" : "supports"
          }`}
        </div>
      )}
      {props.lineSelection.mode !== "neutral" &&
        !props.lineSelection.isSufficient && (
          <div
            class="list-group-item list-group-item-action"
            onClick={handleClickWith}
          >
            {`${
              props.lineSelection.sufficientWith.length === 0
                ? "set as sufficient with ..."
                : "drop sufficient with"
            }`}
          </div>
        )}
      <div
        class="list-group-item list-group-item-action"
        onClick={handleClickDelete}
      >
        delete
      </div>
    </div>
  );
};

export default Linemenu;
