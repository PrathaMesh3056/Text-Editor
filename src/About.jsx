// About.jsx
import React from "react";

function About() {
  return (
    <div className="container my-3">
      <div className="card shadow-sm">
        <div className="card-body">
          <h1 className="card-title">About Synapse Editor</h1>
          <p className="card-text">
            Synapse Editor is a lightweight but powerful text editor built with React and Bootstrap.
            It has practical text utilities like transformations, copy, import/export, autosave, text-to-speech,
            and reading stats — designed to keep your workflow fast and distraction-free.
          </p>

          <h5>Purpose</h5>
          <p>
            This app was built to demonstrate useful text manipulation features for learning and productivity.
            You can also adapt it for note-taking, writing drafts, or content prepping for blogs.
          </p>

          <h5>Automation Note</h5>
          <p>
            You can automate this project in many different ways — scheduled backups, cloud sync, or
            integration with AI for rewriting and summaries. I automated it here as a fun AI/ML learning project,
            but the architecture supports many other automations.
          </p>

          <h5>Contact & Contribution</h5>
          <p className="mb-0">Fork the repo, open an issue, or submit a PR. Happy coding!</p>
        </div>
      </div>
    </div>
  );
}

export default About;
