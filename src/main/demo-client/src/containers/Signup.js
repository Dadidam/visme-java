import React from "react";
import { connect } from "react-redux";
import SignupForm from "containers/SignupForm";
import GuestLayout from "containers/GuestLayout";
import ProjectIndex from "components/Project/index";

const Signup = ({ user }) => {
  // redirect user to project home page
  if (user && user.id) return <ProjectIndex />;

  return (
    <GuestLayout>
      <SignupForm />
    </GuestLayout>
  );
};

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(Signup);
