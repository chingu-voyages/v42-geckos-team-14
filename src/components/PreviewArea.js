import React, { useEffect, useRef, useContext } from "react";
import Context from "./Context";
import useDraggable from "../hooks/useDraggable";

function PreviewArea(props) {
  const { components } = useContext(Context);
  const { htmlCodeTemplate } = useContext(Context);
  const { showTab } = useContext(Context);
  const { setPreviewAreaBoundaries } = useContext(Context);
  const previewAreaRef = useRef(null);
  const { handleDragOver, handleDragDrop } = useDraggable();

  function checkPreviewBoundaries() {
    const preview = previewAreaRef.current;
    setPreviewAreaBoundaries({
      left: preview.offsetLeft,
      right: preview.offsetLeft + preview.offsetWidth,
      top: preview.offsetTop,
      bottom: preview.offsetTop + preview.offsetHeight,
      middleY: preview.offsetTop + preview.offsetHeight / 2,
      middleX: preview.offsetLeft + preview.offsetWidth / 2,
    });
  }

  useEffect(() => {
    checkPreviewBoundaries();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", checkPreviewBoundaries);
    return () => {
      window.removeEventListener("resize", checkPreviewBoundaries);
    };
  }, []);

  const renderComponents = components.map((component) => component);

  if (showTab === "web")
    return (
      <section className="showTab workArea">
        <div
          className="previewArea"
          ref={previewAreaRef}
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDragDrop(e)}
        >
          {renderComponents}
        </div>
      </section>
    );

  if (showTab === "code")
    return (
      <section className="showTab workArea">
        <pre id="generatedCode">{htmlCodeTemplate}</pre>
      </section>
    );
}

export default PreviewArea;
