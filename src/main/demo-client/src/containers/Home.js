import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="text-center">
    <h1>HOMEPAGE</h1>
    <h3>Login Form</h3>
    <Link to="/signup" className="App-link">
      Create New Account
    </Link>
  </div>
);
