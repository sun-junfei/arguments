import React, { createContext, useState, useEffect, useRef } from "react";

const useMousePosition = () => {
  const [position, setPosition] = useState({
    clientX: 0,
    clientY: 0,
  });

  const updatePosition = (event) => {
    const { pageX, pageY, clientX, clientY } = event;

    setPosition({
      clientX,
      clientY,
    });
  };

  useEffect(() => {
    document.addEventListener("mousemove", updatePosition, false);
    document.addEventListener("mouseenter", updatePosition, false);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseenter", updatePosition);
    };
  }, []);

  return position;
};

// Updates the height of a <textarea> when the value changes.
const useAutosizeTextArea = (boxRef, textAreaRef, value, className) => {
  useEffect(() => {
    if (textAreaRef) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.style.height = "0px";

      const scrollHeight = textAreaRef.scrollHeight;

      let boxHeight;

      if (className === "single_box") {
        boxHeight = scrollHeight + 13;
      } else {
        boxHeight = scrollHeight + 40;
      }

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.style.height = scrollHeight + "px";
      boxRef.style.height = boxHeight + "px";
    }
  }, [textAreaRef, value]);
};

/* for resize auto adjustment */

const useWidthResizeObserver = (ref, callback) => {
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        callback(width);
      }
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref, callback]);
};

const useAutosizeTextAreaResize = (textRef, boxRef, textAreaRef, className) => {
  const [isAdjustingHeight, setIsAdjustingHeight] = useState(false);

  useWidthResizeObserver(textRef, (width) => {
    // Perform actions triggered by width changes
    if (textAreaRef && !isAdjustingHeight) {
      setIsAdjustingHeight(true);

      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;

      let boxHeight;

      if (className === "single_box") {
        boxHeight = scrollHeight + 13;
      } else {
        boxHeight = scrollHeight + 40;
      }

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will produce an incorrect value.
      textAreaRef.style.height = scrollHeight + "px";
      boxRef.style.height = boxHeight + "px";

      setIsAdjustingHeight(false);
    }
  });
};

const useAutosizeInput = (termboxRef, inputRef, value) => {
  useEffect(() => {
    if (inputRef) {
      // We need to reset the width momentarily to get the correct scrollHeight for the textarea
      const prevInputWidth = inputRef.offsetWidth;
      inputRef.style.width = "0px";
      const scrollWidth = inputRef.scrollWidth;
      const changeWidth = scrollWidth - prevInputWidth;

      const termBoxWidth = termboxRef.offsetWitdh + changeWidth;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      inputRef.style.width = scrollWidth + "px";
      termboxRef.style.width = termBoxWidth + "px";
    }
  }, [inputRef, value]);
};

function handleAbleLogic(item, boxDict) {
  if (item.isGranted) {
    return true;
  } else {
    for (var i = 0; i < item.fromList.length; i++) {
      const from = item.fromList[i];
      if (
        from.mode === "for" &&
        from.isSufficient &&
        handleAbleLogic(boxDict[from.source], boxDict)
      ) {
        return true;
      } else if (
        from.mode === "against" &&
        from.isSufficient &&
        handleAbleLogic(boxDict[from.source], boxDict)
      ) {
        return false;
      }
    }
  }
}

export {
  useMousePosition,
  useAutosizeTextArea,
  useAutosizeInput,
  useAutosizeTextAreaResize,
  handleAbleLogic,
};
