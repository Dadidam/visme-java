import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Alert } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  UserOutlined,
  UsergroupAddOutlined,
  FolderOpenOutlined,
  HeartTwoTone,
} from "@ant-design/icons";
import Logo from "containers/Logo";

const { Header, Content, Footer } = Layout;

class MainLayout extends Component {
  state = {
    current: "Users",
  };

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  };

  renderErrorBanner = () => {
    if (this.props.app.connectionFailed) {
      return (
        <Alert
          message="Error"
          description="Connection to the API server failed."
          type="error"
          showIcon
        />
      );
    }
  };

  render() {
    const { current } = this.state;

    return (
      <Layout className="layout">
        <Header>
          <Menu
            onClick={this.handleClick}
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[current]}
          >
            <Menu.Item key="Users">
              <Link to="/">
                <UsergroupAddOutlined />
                Users
              </Link>
            </Menu.Item>
            <Menu.Item key="Projects">
              <Link to="/projects">
                <FolderOpenOutlined />
                Projects
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <UserOutlined />
              &nbsp;&nbsp;&nbsp; admin@visme.co
            </Breadcrumb.Item>
            <Breadcrumb.Item>{current}</Breadcrumb.Item>
          </Breadcrumb>
          <div>{this.renderErrorBanner()}</div>
          <div className="site-layout-content">{this.props.children}</div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <Logo />
          <p>Visme-Tools Demo ©2020 Created by Ilia Vorontcov</p>
          <p>
            <HeartTwoTone twoToneColor="#eb2f96" /> powered by React/Redux and
            Ant Design <HeartTwoTone twoToneColor="#eb2f96" />
          </p>
        </Footer>
      </Layout>
    );
  }
}

function mapStateToProps({ app }) {
  return { app };
}

export default connect(mapStateToProps)(MainLayout);
