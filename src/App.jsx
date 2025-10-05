import Navbar from './navbar.jsx';
import TextArea from './TextArea.jsx';
import React, { useState } from 'react';
import Alert from './alert.jsx';
import About from './About.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);

  const showalert = (message, type) => {
    setAlert({ mssg: message, type: type });
    setTimeout(() => setAlert(null), 3000);
  };

  const [myStyle, setMyStyle] = useState({
    color: 'black',
    backgroundColor: 'white',
  });

  const [btntext, setBtntext] = useState('Enable Dark Mode');

  const togglecolor = () => {
    if (mode === 'light') {
      setMode('dark');
      setMyStyle({ color: 'white', backgroundColor: 'black' });
      document.body.style.backgroundColor = 'black';
      document.body.style.color = 'white';
      showalert('Dark mode enabled', 'success');
      setBtntext('Enable Light Mode');
    } else {
      setMode('light');
      setMyStyle({ color: 'black', backgroundColor: 'white' });
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
      showalert('Light mode enabled', 'success');
      setBtntext('Enable Dark Mode');
    }
  };

  return (
    <Router>
      <Navbar myStyle={myStyle} mode={mode} togglecolor={togglecolor} btntext={btntext} />
      <Alert alert={alert} />
      <div className='container'>
        <Routes>
          <Route path="/" element={<TextArea />} />

          <Route path="/about" element={<About />} />
          <Route path="/home" element={<TextArea />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
