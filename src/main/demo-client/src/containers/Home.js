import React from "react";
import { connect } from "react-redux";
import LoginForm from "./LoginForm";
import GuestLayout from "./GuestLayout";
// import Logout from "components/Logout";
import ProjectIndex from "components/Project/index";

export const Home = ({ user }) => {
  if (!user || user.authError)
    return (
      <GuestLayout>
        <LoginForm />
      </GuestLayout>
    );

  return <ProjectIndex />;

  // return (
  //   <div>
  //     <b>Welcome, {user.name}!</b> <Logout />
  //     <hr />
  //     <h3>Your Projects</h3>
  //   </div>
  // );
};

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(Home);
