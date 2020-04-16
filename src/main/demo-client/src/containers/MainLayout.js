import React from "react";
import { connect } from "react-redux";
import { Layout, Menu, Breadcrumb } from "antd";
import { UserOutlined, HeartTwoTone } from "@ant-design/icons";
import { logoutUser } from "actions/user";
import Logo from "containers/Logo";

const { Header, Content, Footer } = Layout;

const MainLayout = ({ children, user, logoutUser }) => (
  <Layout className="layout">
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">Projects</Menu.Item>
        <Menu.Item key="2" onClick={logoutUser}>
          Logout
        </Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: "0 50px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <UserOutlined />
          &nbsp;&nbsp;&nbsp;
          {user.name}
        </Breadcrumb.Item>
        <Breadcrumb.Item>Projects</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">{children}</div>
    </Content>
    <Footer style={{ textAlign: "center" }}>
      <Logo />
      <p>Visme-Tools Demo ©2020 Created by Ilia Vorontcov</p>
      <p>
        <HeartTwoTone twoToneColor="#eb2f96" /> powered by React/Redux and Ant
        Design <HeartTwoTone twoToneColor="#eb2f96" />
      </p>
    </Footer>
  </Layout>
);

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps, { logoutUser })(MainLayout);
