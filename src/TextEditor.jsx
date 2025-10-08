import React, { useEffect, useState, useRef } from "react";
import StatsPanel from "./StatsPanel";
import AiModal from "./AiModal";

function TextEditor({ showAlert, theme }) {
  const [text, setText] = useState(() => localStorage.getItem("editorText") || "");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalAction, setModalAction] = useState('');
  const fileInputRef = useRef();

  // --- Utility Functions (including NEW ones) ---

  const toTitleCase = () => {
    setText(t => {
      const newText = t.replace(/\w\S*/g, (word) =>
        word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
      );
      showAlert("Converted to Title Case");
      return newText;
    });
  };

  const toSentenceCase = () => {
    setText(t => {
      const newText = t.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
      showAlert("Converted to Sentence Case");
      return newText;
    });
  };

  const findSource = () => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
      const url = `https://scholar.google.com/scholar?q=${encodeURIComponent(selectedText)}`;
      window.open(url, '_blank');
      showAlert("Searching for source on Google Scholar");
    } else {
      showAlert("Please highlight some text to find a source", "warning");
    }
  };

  // --- All your existing functions ---
  useEffect(() => { const id = setTimeout(() => { localStorage.setItem("editorText", text); }, 700); return () => clearTimeout(id); }, [text]);
  const handleChange = (e) => setText(e.target.value);
  const toUpperCase = () => { setText((t) => { const n = t.toUpperCase(); showAlert("Converted to UPPERCASE"); return n; }); };
  const toLowerCase = () => { setText((t) => { const n = t.toLowerCase(); showAlert("Converted to lowercase"); return n; }); };
  const clearText = () => { setText(""); showAlert("Cleared text", "warning"); };
  const copyText = async () => { try { await navigator.clipboard.writeText(text); showAlert("Copied to clipboard"); } catch { showAlert("Copy failed", "danger"); } };
  const removeExtraSpaces = () => { setText((t) => { const n = t.replace(/\s+/g, " ").trim(); showAlert("Removed extra spaces"); return n; }); };
  const downloadTxt = () => { const blob = new Blob([text], { type: "text/plain;charset=utf-8" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "notes.txt"; a.click(); URL.revokeObjectURL(url); showAlert("Downloaded as notes.txt"); };
  const uploadTxt = (file) => { if (!file) return; const reader = new FileReader(); reader.onload = (e) => { setText(e.target.result); showAlert(`Loaded ${file.name}`); }; reader.readAsText(file); };
  const handleFileSelect = (e) => { const f = e.target.files[0]; uploadTxt(f); e.target.value = ""; };
  const speaking = async () => { if (!("speechSynthesis" in window)) { showAlert("Text-to-speech not supported", "danger"); return; } const s = new SpeechSynthesisUtterance(text || "No text to read"); window.speechSynthesis.cancel(); window.speechSynthesis.speak(s); };
  const readingTime = (txt) => { const words = txt.trim().split(/\s+/).filter(Boolean).length; const minutes = words / 200; return `${Math.ceil(minutes)} min`; };

  // --- Updated AI Handler Function ---
  const handleAiAction = async (action) => {
    if (!text.trim()) {
      showAlert("Please enter some text first", "warning");
      return;
    }
    setIsAiLoading(true);
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${apiUrl}/api/generate`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text, action }), });
      if (!response.ok) throw new Error(`API error: ${response.statusText}`);
      const data = await response.json();
      
      const titleMap = {
          improve: 'AI Improvement Suggestions',
          summarize: 'AI Summary',
          formatCitation: 'AI Generated Citations'
      };
      
      setModalTitle(titleMap[action] || 'AI Suggestions');
      setModalAction(action); // Let the modal know which action it's for
      setModalContent(data.result);
      setShowAiModal(true);

    } catch (error) {
      console.error("AI action failed:", error);
      showAlert("AI feature failed. Please check the console.", "danger");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    setText(suggestion);
    setShowAiModal(false);
    showAlert("AI suggestion applied!");
  };

  return (
    <>
      <AiModal show={showAiModal} onHide={() => setShowAiModal(false)} title={modalTitle} content={modalContent} onSelect={handleSuggestionSelect} action={modalAction}/>
      <div className="card shadow-lg">
        <div className="card-body p-4 p-sm-5">
            <div className="d-flex align-items-center gap-3 mb-2">
                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10.4 12.6a2 2 0 1 1 3 3L8.8 21H7v-1.8l3.4-5.6Z"/></svg>
                <h3 className="card-title display-6 fw-bolder mb-0">Text Editor</h3>
            </div>
          <p className="text-muted mb-4">Your versatile text utility tool.</p>
          <textarea
            className="form-control editor-textarea mb-4"
            rows="12"
            value={text}
            onChange={handleChange}
            placeholder="Start writing..."
            style={{
              background: theme === "dark" ? "#2a2a2a" : "#f9fafb",
              color: theme === "dark" ? "#eaeaea" : "#1f2937",
            }}
          />
          
          <div className="d-grid gap-4">
              <div>
                  <div className="button-group-label">Case & Style</div>
                  <div className="d-flex flex-wrap gap-2">
                      <button className="btn btn-primary fw-semibold" onClick={toUpperCase} disabled={isAiLoading}>UPPERCASE</button>
                      <button className="btn btn-primary fw-semibold" onClick={toLowerCase} disabled={isAiLoading}>lowercase</button>
                      <button className="btn btn-secondary" onClick={toTitleCase} disabled={isAiLoading}>Title Case</button>
                      <button className="btn btn-secondary" onClick={toSentenceCase} disabled={isAiLoading}>Sentence case</button>
                  </div>
              </div>
              <div>
                  <div className="button-group-label">Editing</div>
                  <div className="d-flex flex-wrap gap-2">
                      <button className="btn btn-secondary" onClick={removeExtraSpaces} disabled={isAiLoading}>Fix Spacing</button>
                      <button className="btn btn-success fw-semibold" onClick={copyText} disabled={isAiLoading}>Copy</button>
                      <button className="btn btn-danger fw-semibold" onClick={clearText} disabled={isAiLoading}>Clear</button>
                  </div>
              </div>
              <div>
                  <div className="button-group-label">File & Speech</div>
                  <div className="d-flex flex-wrap gap-2">
                      <button className="btn btn-outline-secondary" onClick={downloadTxt} disabled={isAiLoading}>Download .txt</button>
                      <button className="btn btn-outline-secondary" onClick={() => fileInputRef.current.click()} disabled={isAiLoading}>Upload .txt</button>
                      <input ref={fileInputRef} type="file" accept=".txt" onChange={handleFileSelect} style={{ display: "none" }}/>
                      <button className="btn btn-outline-secondary" onClick={speaking} disabled={isAiLoading}>Read Aloud</button>
                  </div>
              </div>
              <div>
                  <div className="button-group-label">AI & Research</div>
                  <div className="d-flex flex-wrap gap-2">
                      <button className="btn btn-ai fw-semibold " onClick={() => handleAiAction('summarize')} disabled={isAiLoading}>{isAiLoading ? 'Working...' : 'Summarize'}</button>
                      <button className="btn btn-ai fw-semibold" onClick={() => handleAiAction('improve')} disabled={isAiLoading}>{isAiLoading ? 'Working...' : 'Improve Text'}</button>
                      <button className="btn btn-ai fw-semibold" onClick={() => handleAiAction('formatCitation')} disabled={isAiLoading}>{isAiLoading ? 'Working...' : 'Format Citation'}</button>
                      <button className="btn btn-outline-ai fw-semibold" onClick={findSource} disabled={isAiLoading}>Find Source</button>
                  </div>
              </div>
          </div>
          <hr className="my-4"/>
          <StatsPanel text={text} readingTime={readingTime} />
        </div>
      </div>
    </>
  );
}

export default TextEditor;
