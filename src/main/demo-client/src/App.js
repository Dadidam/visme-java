import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Routes from "./Routes";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes />
      </header>
      <footer>Created with love by Ilia Vorontcov</footer>
    </div>
  );
}

export default withRouter(connect(null)(App));
