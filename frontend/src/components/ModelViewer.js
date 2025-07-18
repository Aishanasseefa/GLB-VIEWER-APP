import React from "react";
import "@google/model-viewer";

export default function ModelViewer({ modelUrl }) {
  return (
    <model-viewer
      src={modelUrl}
      alt="3D model"
      auto-rotate
      camera-controls
      style={{ width: "400px", height: "400px" }}
    ></model-viewer>
  );
}
