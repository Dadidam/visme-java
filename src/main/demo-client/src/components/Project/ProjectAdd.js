import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Input, Button, Space, Checkbox } from "antd";
import ErrorBanner from "containers/ErrorBanner";
import { addProject } from "actions/project";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 12,
  },
};

const ProjectAdd = ({ addProject, project, user, history }) => {
  const onFinish = (values) => {
    console.log("Success:", values);
    addProject(values, user.id).then(() => history.push("/projects"));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const renderErrorMessage = () => {
    if (project && project.signupError)
      return (
        <ErrorBanner message="Can't create a new project with passed args" />
      );
  };

  return (
    <div className="signup-form">
      <h3>Add New Project</h3>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {renderErrorMessage()}
        <Form.Item
          label="Project Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please provide your project title",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout} name="isFavorite" valuePropName="checked">
          <Checkbox>Add this Project to your Favorite list</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <div>
            <Space>
              <Button type="link">
                <Link to="/projects">&larr; Back to Project List</Link>
              </Button>
              <Button type="primary" htmlType="submit">
                Add Project
              </Button>
            </Space>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

function mapStateToProps({ user, project }) {
  return { user, project };
}

export default connect(mapStateToProps, { addProject })(ProjectAdd);
