import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

export default () => {
  return (
    <Button type="primary">
      <Link to="/project/add">Add New Project</Link>
    </Button>
  );
};
