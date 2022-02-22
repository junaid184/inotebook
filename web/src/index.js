import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import NoteState from "./context/notes/noteState";
ReactDOM.render(
  <React.StrictMode>
    <NoteState>
      <Router>
        <App />
      </Router>
    </NoteState>
  </React.StrictMode>,
  document.getElementById("root")
);
