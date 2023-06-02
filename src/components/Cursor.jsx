import React from "react";
import { useMousePosition } from "./Util";

function Cursor(props) {
  const { clientX, clientY } = useMousePosition();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <span
        width={50}
        height={50}
        viewBox="0 0 50 50"
        style={{
          position: "absolute",
          left: clientX,
          top: clientY,
          transform: "translate(-50%, -50%)",
        }}
      >
        {(() => {
          switch (props.clicked) {
            case "def":
              return (
                <span class="badge rounded-pill text-bg-primary def_badge">
                  Def:
                </span>
              );
            case "prop":
              return <span class="badge text-bg-success">Prop</span>;
            case "evi":
              return <span class="badge text-bg-info">Evi</span>;
            case "con":
              return <span class="badge text-bg-danger">Con</span>;
            case "note":
              return <span class="badge text-bg-warning">Note</span>;
            default:
              return <p>Default content</p>;
          }
        })()}
      </span>
    </div>
  );
}

export default Cursor;
