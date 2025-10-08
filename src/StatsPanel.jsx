// StatsPanel.jsx
import React from "react";

function StatsPanel({ text, readingTime }) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const chars = text.length;
  const sentences = (text.match(/[.!?]+/g) || []).length;

  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center mt-2">
      <div>
        <strong>Words:</strong> {words} &nbsp; | &nbsp;
        <strong>Characters:</strong> {chars} &nbsp; | &nbsp;
        <strong>Sentences:</strong> {sentences}
      </div>
      <div className="text-end text-muted">
        <small>Est. read: {readingTime(text)}</small>
      </div>
    </div>
  );
}

export default StatsPanel;
