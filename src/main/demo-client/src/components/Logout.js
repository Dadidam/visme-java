import React from "react";
import { Menu } from "antd";
import { connect } from "react-redux";
import { logoutUser } from "actions/user";

const Logout = ({ logoutUser }) => {
  return (
    <Menu.Item key="2" onClick={logoutUser}>
      Logout
    </Menu.Item>
  );
};

export default connect(null, { logoutUser })(Logout);
