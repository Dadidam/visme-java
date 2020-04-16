import React from "react";
import { Alert } from "antd";

const ErrorBanner = ({ message }) => (
  <div className="error-banner">
    <Alert type="error" message={message} banner closable />
  </div>
);

export default ErrorBanner;
