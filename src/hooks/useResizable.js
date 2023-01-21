import { useState, useEffect } from "react";

const useResizable = (ref) => {
  const [resizable, setResizable] = useState(false);
  const [componentWidth, setComponentWidth] = useState();
  const [componentHeight, setComponentHeight] = useState();

  const activateResize = (e) => {
    const { clientX, clientY } = e;
    setResizable(true);
    setComponentWidth(clientX - ref.current.offsetLeft);
    setComponentHeight(clientY - ref.current.offsetTop);
  };

  useEffect(() => {
    if (ref.current) {
      setComponentWidth(ref.current.offsetWidth);
      setComponentHeight(ref.current.offsetHeight);
    }
  }, [ref]);

  const onMouseMove = (e) => {
    const { clientX, clientY } = e;
    if (resizable) {
      let newWidth = clientX - ref.current.offsetLeft;
      let newHeight = clientY - ref.current.offsetTop;
      // check if the new size will overlap with any other element
      let overlapping = false;
      let surroundingElements = document.querySelectorAll(
        ".surrounding-element"
      );
      surroundingElements.forEach((el) => {
        if (
          ref.current.offsetLeft + newWidth > el.offsetLeft &&
          ref.current.offsetTop + newHeight > el.offsetTop &&
          ref.current.offsetLeft < el.offsetLeft + el.offsetWidth &&
          ref.current.offsetTop < el.offsetTop + el.offsetHeight
        ) {
          overlapping = true;
        }
      });
      // if not overlapping, set the new size
      if (!overlapping) {
        setComponentWidth(newWidth);
        setComponentHeight(newHeight);
      }
    }
  };

  const onMouseUp = (e) => {
    setResizable(false);
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [resizable]);

  return [resizable, componentWidth, componentHeight, activateResize];
};

export default useResizable;