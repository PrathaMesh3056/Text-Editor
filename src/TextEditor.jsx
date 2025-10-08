/// TextEditor.jsx
import React, { useEffect, useState, useRef } from "react";
import StatsPanel from "./StatsPanel";

function TextEditor({ showAlert, theme }) {
  const [text, setText] = useState(() => localStorage.getItem("editorText") || "");
  const [isAiLoading, setIsAiLoading] = useState(false); // <-- New state for loading
  const fileInputRef = useRef();

  useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem("editorText", text);
    }, 700);
    return () => clearTimeout(id);
  }, [text]);

  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey || e.metaKey) {
        const key = e.key.toLowerCase();
        if (key === "u") { e.preventDefault(); toUpperCase(); }
        else if (key === "l") { e.preventDefault(); toLowerCase(); }
        else if (key === "d") { e.preventDefault(); clearText(); }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [text]); // Note: dependency array should ideally include the functions

  // --- All your existing functions (handleChange, toUpperCase, etc.) go here ---
  // They remain unchanged. For brevity, I'm omitting them from this view.
  const handleChange = (e) => setText(e.target.value);
  const toUpperCase = () => { setText((t) => { const n = t.toUpperCase(); showAlert("Converted to UPPERCASE"); return n; }); };
  const toLowerCase = () => { setText((t) => { const n = t.toLowerCase(); showAlert("Converted to lowercase"); return n; }); };
  const clearText = () => { setText(""); showAlert("Cleared text", "warning"); };
  const copyText = async () => { try { await navigator.clipboard.writeText(text); showAlert("Copied to clipboard"); } catch { showAlert("Copy failed", "danger"); } };
  const removeExtraSpaces = () => { setText((t) => { const n = t.replace(/\s+/g, " ").trim(); showAlert("Removed extra spaces"); return n; }); };
  const capitalizeWords = () => { setText((t) => { const n = t.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase()); showAlert("Capitalized each word"); return n; }); };
  const downloadTxt = () => { const blob = new Blob([text], { type: "text/plain;charset=utf-8" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "notes.txt"; a.click(); URL.revokeObjectURL(url); showAlert("Downloaded as notes.txt"); };
  const uploadTxt = (file) => { if (!file) return; const reader = new FileReader(); reader.onload = (e) => { setText(e.target.result); showAlert(`Loaded ${file.name}`); }; reader.readAsText(file); };
  const handleFileSelect = (e) => { const f = e.target.files[0]; uploadTxt(f); e.target.value = ""; };
  const speaking = async () => { if (!("speechSynthesis" in window)) { showAlert("Text-to-speech not supported", "danger"); return; } const s = new SpeechSynthesisUtterance(text || "No text to read"); window.speechSynthesis.cancel(); window.speechSynthesis.speak(s); };
  const readingTime = (txt) => { const words = txt.trim().split(/\s+/).filter(Boolean).length; const minutes = words / 200; return `${Math.ceil(minutes)} min`; };
  
  // --- New AI Handler Function ---
  const handleAiAction = async (action) => {
    if (!text.trim()) {
      showAlert("Please enter some text first", "warning");
      return;
    }
    setIsAiLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, action }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      setText(data.result);
      showAlert(`Text successfully ${action}d!`);
    } catch (error) {
      console.error("AI action failed:", error);
      showAlert("AI feature failed. Please check the console.", "danger");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h3 className="card-title">Text Editor</h3>
        <p className="text-muted small">Type or paste your text below. Shortcuts: <kbd>Ctrl+U</kbd> Uppercase, <kbd>Ctrl+L</kbd> Lowercase, <kbd>Ctrl+D</kbd> Clear</p>

        <textarea
          className="form-control mb-3"
          rows="10"
          value={text}
          onChange={handleChange}
          placeholder="Start typing..."
          style={{
            background: theme === "dark" ? "#121212" : undefined,
            color: theme === "dark" ? "#eaeaea" : undefined,
          }}
        />

        <div className="d-flex flex-wrap gap-2 mb-3">
          {/* Your existing buttons */}
          <button className="btn btn-primary" onClick={toUpperCase} disabled={isAiLoading}>UPPERCASE</button>
          <button className="btn btn-primary" onClick={toLowerCase} disabled={isAiLoading}>lowercase</button>
          <button className="btn btn-secondary" onClick={removeExtraSpaces} disabled={isAiLoading}>Remove Extra Spaces</button>
          <button className="btn btn-secondary" onClick={capitalizeWords} disabled={isAiLoading}>Capitalize Words</button>
          <button className="btn btn-success" onClick={copyText} disabled={isAiLoading}>Copy</button>
          <button className="btn btn-danger" onClick={clearText} disabled={isAiLoading}>Clear</button>
          <button className="btn btn-outline-success" onClick={downloadTxt} disabled={isAiLoading}>Download .txt</button>
          <button className="btn btn-outline-primary" onClick={() => fileInputRef.current.click()} disabled={isAiLoading}>Upload .txt</button>
          <input ref={fileInputRef} type="file" accept=".txt" onChange={handleFileSelect} style={{ display: "none" }}/>
          <button className="btn btn-outline-dark" onClick={speaking} disabled={isAiLoading}>Read Aloud</button>

          {/* ✨ New AI Buttons ✨ */}
          <button className="btn btn-info" onClick={() => handleAiAction('summarize')} disabled={isAiLoading}>
            {isAiLoading ? 'Working...' : 'Summarize'}
          </button>
          <button className="btn btn-warning" onClick={() => handleAiAction('improve')} disabled={isAiLoading}>
            {isAiLoading ? 'Working...' : 'Improve Text'}
          </button>
        </div>

        <StatsPanel text={text} readingTime={readingTime} />
        <div className="small text-muted mt-3">Auto-saved to browser localStorage</div>
      </div>
    </div>
  );
}

export default TextEditor;