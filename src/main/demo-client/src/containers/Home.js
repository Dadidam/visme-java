import React from "react";
import { connect } from "react-redux";
import LoginForm from "./LoginForm";
import GuestLayout from "./GuestLayout";
import ProjectIndex from "components/Project/index";

const Home = ({ user }) => {
  if (!user || user.authError || !user.id)
    return (
      <GuestLayout>
        <LoginForm />
      </GuestLayout>
    );

  // if (!user.id) return "Loading...";

  return <ProjectIndex />;
};

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(Home);
