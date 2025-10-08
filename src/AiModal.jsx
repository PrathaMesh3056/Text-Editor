import React from 'react';

function parseSuggestions(content) {
  if (!content) return [];
  const options = content.split(/\*\*(Option \d+)/g).filter(s => s.trim());
  if (options.length > 1) {
    let suggestions = [];
    for(let i=0; i < options.length; i+=2) {
        suggestions.push(options[i] + options[i+1]);
    }
    return suggestions.map(s => s.replace(/:\*\*/, '').trim());
  }
  return []; // Not in the expected "Option" format
}


function AiModal({ show, onHide, title, content, onSelect, action }) {
  if (!show) return null;

  const suggestions = parseSuggestions(content);
  const isCitation = action === 'formatCitation' && (content.includes('APA:') || content.includes('MLA:'));

  const renderContent = () => {
    if (isCitation) {
      const citations = content.split(/(APA:|MLA:|Chicago:)/g).filter(s => s.trim());
      let formattedCitations = [];
      for(let i=0; i < citations.length; i+=2){
          formattedCitations.push(
              <div key={i} className="citation-block">
                  <strong>{citations[i]}</strong>
                  <p className="mb-0">{citations[i+1].trim()}</p>
              </div>
          )
      }
      return formattedCitations;
    }

    if (suggestions.length > 0) {
      return suggestions.map((suggestion, index) => (
        <div key={index} className="card mb-3">
          <div className="card-body">
            <p style={{ whiteSpace: 'pre-wrap' }}>{suggestion}</p>
            <button className="btn btn-primary btn-sm" onClick={() => onSelect(suggestion)}>
              Use this text
            </button>
          </div>
        </div>
      ));
    }

    // Fallback for single summary or unparsed content
    return <p style={{ whiteSpace: 'pre-wrap' }}>{content}</p>;
  };

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
            <div className="modal-body">{renderContent()}</div>
            <div className="modal-footer">
               {!isCitation && suggestions.length === 0 &&
                <button className="btn btn-primary" onClick={() => onSelect(content)}>Use This Text</button>
               }
              <button type="button" className="btn btn-secondary" onClick={onHide}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AiModal;
