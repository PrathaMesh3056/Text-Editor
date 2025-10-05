import App from "./App"
import React,{ useState } from "react";
import { Link } from "react-router-dom";
function Navbar({myStyle, mode,togglecolor,btntext}) {
  
    return(
<nav className={`navbar navbar-expand-lg navbar-${mode} bg-${mode} `}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/" style={myStyle}>Text Editor</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent"style={myStyle}>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/about">About us</Link>
        </li>
       
        {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"style={myStyle}>
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#" style={myStyle} >Action</a></li>
            
            <li><a className="dropdown-item" href="#" style={myStyle} >Another action</a></li>
            
          </ul>
        </li> */}
        
      </ul>
      <button type="button" className={"btn btn-${btntext} me-3 "}  onClick={togglecolor} style={{border:'2px solid ',borderColor:mode==='dark'?'white':'black',backgroundcolor:mode==='dark'?'#333':'#fff', transition:'all 0.3s ease'}}>{btntext}</button>
      
      
    </div>
  </div>
</nav>
    );
}
export default Navbar