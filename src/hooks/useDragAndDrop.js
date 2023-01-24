import { useEffect, useRef, useState, useContext } from "react";
import useCursorPosition from "./useCursorPosition";
import Context from "../components/Context";

function useDragAndDrop(startPosition) {
  const { previewAreaBoundaries } = useContext(Context);
  
  const currentComponentRef = useRef(null);
  const [isComponentMove, setIsComponentMove] = useState(false);
  const [componentPosition, setComponentPosition] = useState(startPosition);
  const [componentOffsetSnap, setComponentOffsetSnap] = useState(startPosition);
  const [componentOffset, setComponentOffset] = useState({});
  const [componentInPreviewArea, setComponentInPreviewArea] = useState(false);
  const { cursorPosition, cursorPosSnap } = useCursorPosition();

  useEffect(() => {
    window.addEventListener("mouseup", () => {
      setIsComponentMove(false);
      currentComponentRef.current = null;
    });

    return () => {
      window.removeEventListener("mouseup", () => {
        setIsComponentMove(false);
        currentComponentRef.current = null;
      });
    };
  }, []);

  useEffect(() => {
    function setStartPosition(event) {
      const top = event.target.offsetTop;
      const left = event.target.offsetLeft;

      setComponentOffsetSnap({
        top: top,
        left: left,
      });
    }

    window.addEventListener("mousedown", (event) => {
      setStartPosition(event);

      currentComponentRef.current = event.target;
    });

    return () => {
      window.removeEventListener("mousedown", (event) => {
        setStartPosition(event);
        currentComponentRef.current = event.target;
      });
    };
  }, []);

  useEffect(() => {
    function currentComponentOffset(component) {
      const top = component.offsetTop;
      const right = component.offsetLeft + component.offsetWidth;
      const bottom = component.offsetTop + component.offsetHeight;
      const left = component.offsetLeft;

      setComponentOffset({
        top: top,
        right: right,
        bottom: bottom,
        left: left,
      });
    }

    window.addEventListener("mousemove", () => {
      currentComponentRef.current &&
        currentComponentOffset(currentComponentRef.current);
    });

    return () => {
      window.removeEventListener("mousemove", () => {
        currentComponentRef.current &&
          currentComponentOffset(currentComponentRef.current);
      });
    };
  }, []);

  function changePosition() {
    if (!isComponentMove) return;
    const top =
    cursorPosition.top - (cursorPosSnap.top - componentOffsetSnap.top);
    const left =
    cursorPosition.left - (cursorPosSnap.left - componentOffsetSnap.left);
    console.log(top, left);

    if (outPreviewArea(previewAreaBoundaries) === false) {
      // console.log("Condition 1");
      setComponentInPreviewArea(true);
      setComponentPosition({
        top: top,
        left: left,
      });
    } else if (!componentInPreviewArea) {
      // console.log("Condition 2");
      setComponentPosition({
        top: top,
        left: left,
      });
    }
  }

  function outPreviewArea(areaBoundaries) {
    //  return areaBoundaries.top < componentOffset.top ||
    //   areaBoundaries.right < componentOffset.right ||
    //   areaBoundaries.bottom < componentOffset.bottom ||
    //   areaBoundaries.left > componentOffset.left;

    if (!areaBoundaries) return;

    if (
      areaBoundaries.top >= componentOffset.top ||
      areaBoundaries.right <= componentOffset.right ||
      areaBoundaries.bottom <= componentOffset.bottom ||
      areaBoundaries.left >= componentOffset.left
    ) {
      // console.log("Component OUT of preview area  - true");
      return true;
    } else {
      // console.log("Component IN preview area - false");
      return false;
    }
  }

  useEffect(() => {
    startPosition && isComponentMove && changePosition();
  }, [cursorPosition]);

  return {
    isComponentMove,
    setIsComponentMove,
    componentPosition,
    setComponentPosition,
  };
}

export default useDragAndDrop;
