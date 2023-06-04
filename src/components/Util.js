import React, { createContext, useState, useEffect } from "react";

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
const useAutosizeTextArea = (boxRef, textAreaRef, value, className, width) => {
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
  }, [textAreaRef, value, width]);
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

export { useMousePosition, useAutosizeTextArea, useAutosizeInput };
