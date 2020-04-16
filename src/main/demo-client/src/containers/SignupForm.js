import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Input, Button, Space } from "antd";
import ErrorBanner from "containers/ErrorBanner";
import { signupUser } from "actions/user";
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

const SignupForm = ({ signupUser, user }) => {
  const onFinish = values => {
    console.log("Success:", values);
    signupUser(values);
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  const renderErrorMessage = () => {
    if (user && user.signupError)
      return (
        <ErrorBanner message="Can't create a new user record with passed args" />
      );
  };

  return (
    <div className="signup-form">
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
          label="Full Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your full name"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input correct email"
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
              message: "Please input your password"
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <div>
            <Space>
              <Button type="link">
                <Link to="/">&larr; Back to Home</Link>
              </Button>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Space>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps, { signupUser })(SignupForm);
