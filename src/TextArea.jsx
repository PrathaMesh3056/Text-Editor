import React from 'react';
import { useState } from 'react';
function TextArea({myStyle}) {
  const [text, setText] = useState('');
  const [preview, setPreview] = useState('');

  const handleUpClick = () => {
    setText(text.toUpperCase());
   
  };

  const handleLoClick = () => {
    setText(text.toLowerCase());
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const handlePreview = () => {
    setPreview(text);
  };

  return (
    <>
      <div className="container" style={myStyle}>
        <textarea
          className="form-control mt-4"
          value={text}
          onChange={handleOnChange}
          id="myBox"
          rows="4"
          style={{border:'2px solid black'}}
        ></textarea>
        <button type="button" className="btn btn-success mt-3 mx-2" onClick={handleUpClick}>
          Convert To UPPERCASE
        </button>
        <button type="button" className="btn btn-primary mt-3 mx-2" onClick={handleLoClick}>
          Convert To lowercase
        </button>
        <button type="button" className="btn btn-danger mt-3 mx-2" onClick={() => setText('')}>
          Clear Text
        </button>

        <div>
          <h2 className="mt-4">Your Text Summary</h2>
          <p>{text.trim() === '' ? 0 : text.trim().split(/\s+/).length} words, {text.length} characters</p>
          <p>{0.008 * text.split(' ').length} Minutes to read</p>
          <button type="button" className="btn btn-primary mt-3 mx-2" onClick={handlePreview}>
            Preview
          </button>
          <p>{preview}</p>
        </div>
      </div>
    </>
  );
}

export default TextArea;
