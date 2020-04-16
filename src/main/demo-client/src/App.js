import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Routes from "./Routes";
import "./App.css";

function App() {
  return <Routes />;
}

export default withRouter(connect(null)(App));
