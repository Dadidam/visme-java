import React from "react";
import SignupForm from "containers/SignupForm";
import MainLayout from "containers/MainLayout";

export default ({ history }) => {
  return (
    <MainLayout history={history}>
      <SignupForm />
    </MainLayout>
  );
};
