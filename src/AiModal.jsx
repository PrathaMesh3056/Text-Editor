// src/AiModal.jsx
import React from 'react';

// A simple function to parse the AI's output into selectable options
function parseSuggestions(content) {
  if (!content) return [];
  // Splits the text by "**Option" and filters out any empty results
  return content.split(/\*\*Option/g).slice(1).map(s => `**Option${s.trim()}`);
}

function AiModal({ show, onHide, title, content, onSelect }) {
  const suggestions = parseSuggestions(content);

  // We use Bootstrap's modal classes, but manage the display with React state
  if (!show) {
    return null;
  }

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="btn-close" onClick={onHide}></button>
            </div>
            <div className="modal-body">
              {suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                  <div key={index} className="card mb-3">
                    <div className="card-body">
                      {/* Using pre-wrap to preserve formatting from the AI */}
                      <p style={{ whiteSpace: 'pre-wrap' }}>{suggestion}</p>
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => onSelect(suggestion)}
                      >
                        Use this text
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                // Show the raw content if it can't be parsed into options
                <p style={{ whiteSpace: 'pre-wrap' }}>{content}</p>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onHide}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AiModal;