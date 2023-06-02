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
const useAutosizeTextArea = (defBoxRef, textAreaRef, value) => {
  useEffect(() => {
    if (textAreaRef) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;
      const defBoxHeight = scrollHeight + 40;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.style.height = scrollHeight + "px";
      defBoxRef.style.height = defBoxHeight + "px";
    }
  }, [textAreaRef, value]);
};

const useAutosizeInput = (termboxRef, inputRef, value) => {
  useEffect(() => {
    if (inputRef) {
      // We need to reset the width momentarily to get the correct scrollHeight for the textarea
      inputRef.style.width = "0px";
      const scrollWidth = inputRef.scrollWidth;
      inputRef.style.width = "95%";
      const termBoxWidth = scrollWidth * 2;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      termboxRef.style.width = termBoxWidth + "px";
    }
  }, [inputRef, value]);
};

export { useMousePosition, useAutosizeTextArea, useAutosizeInput };
