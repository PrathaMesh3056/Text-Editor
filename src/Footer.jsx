// Footer.jsx
import React from "react";

function Footer() {
  return (
    <footer className="text-center py-3 mt-4">
      <div className="container">
        <small className="text-muted">© {new Date().getFullYear()} Synapse Editor • Built with ❤️</small>
      </div>
    </footer>
  );
}

export default Footer;
