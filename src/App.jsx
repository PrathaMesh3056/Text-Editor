// App.jsx
import React, { useState } from "react";
import Navbar from "./Navbar";
import TextEditor from "./TextEditor";
import About from "./About";
import Alert from "./Alert";
import Footer from "./Footer";

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  const [alert, setAlert] = useState(null);
  const [page, setPage] = useState("editor"); // "editor" or "about"

  const showAlert = (mssg, type = "success") => {
    setAlert({ mssg, type });
    setTimeout(() => setAlert(null), 2500);
  };

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    showAlert(`Theme set to ${newTheme}`, "info");
  };

  // apply theme class on body
  React.useEffect(() => {
    document.body.className = "";
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <>
      <Navbar onNavigate={setPage} currentPage={page} theme={theme} onThemeChange={toggleTheme} />
      <div className="container my-4">
        <Alert alert={alert} />
        {page === "editor" ? (
          <TextEditor showAlert={showAlert} theme={theme} />
        ) : (
          <About />
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
