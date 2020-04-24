import React from "react";
import { withRouter } from "react-router-dom";
import Routes from "Routes";
import MainLayout from "containers/MainLayout";
import "./App.css";

function App() {
  return (
    <MainLayout>
      <Routes />
    </MainLayout>
  );
}

export default withRouter(App);
