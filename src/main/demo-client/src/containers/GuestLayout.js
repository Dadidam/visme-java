import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

export default ({ children }) => (
  <Layout>
    <Content className="App-header">{children}</Content>
  </Layout>
);
