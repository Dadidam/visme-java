import React from "react";
import { connect } from "react-redux";
import { Empty, Button } from "antd";
import MainLayout from "containers/MainLayout";

export const ProjectIndex = ({ user }) => {
  return (
    <MainLayout>
      <h3>Projects</h3>
      <Empty>
        <Button type="primary">Add Project Now</Button>
      </Empty>
    </MainLayout>
  );
};

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(ProjectIndex);
