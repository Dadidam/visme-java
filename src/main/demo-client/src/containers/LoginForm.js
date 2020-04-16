import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Input, Button, Space } from "antd";
import ErrorBanner from "containers/ErrorBanner";
import { authUser } from "actions/user";
import Logo from "./Logo";

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
};

const LoginForm = ({ authUser, user }) => {
  const onFinish = values => {
    console.log("Success:", values);
    authUser(values);
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  const renderErrorMessage = () => {
    if (user && user.authError)
      return <ErrorBanner message="Incorrect email/password" />;
  };

  return (
    <div className="login-form">
      <Logo />
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {renderErrorMessage()}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input correct email!"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!"
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <div>
            <Button type="primary" htmlType="submit">
              Login &rarr;
            </Button>
            <Space />
            <Button type="link">
              <Link to="/signup">Create Account</Link>
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps, { authUser })(LoginForm);
