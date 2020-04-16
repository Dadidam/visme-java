import React from "react";
import MainLayout from "containers/MainLayout";
import ProjectForm from "containers/ProjectForm";

const ProjectAdd = ({ history }) => {
  return (
    <MainLayout>
      <ProjectForm history={history} />
    </MainLayout>
  );
};

export default ProjectAdd;
