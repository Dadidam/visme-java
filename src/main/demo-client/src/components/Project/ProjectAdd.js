import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Input, Button, Space, Checkbox, Select } from "antd";
import ErrorBanner from "containers/ErrorBanner";
import { addProject } from "actions/project";
import { fetchAllUsers } from "actions/user";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 12
  }
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 12
  }
};

class ProjectAdd extends Component {
  componentDidMount() {
    // if user list is empty - fetch users
    if (this.isEmptyList()) {
      this.props.fetchAllUsers();
    }
  }

  isEmptyList = () => {
    const { user } = this.props;

    return Boolean(!user || !user.list || _.isEmpty(user.list));
  };

  onFinish = values => {
    const { history, addProject } = this.props;

    addProject(values).then(() => history.push("/projects"));
  };

  onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  renderErrorMessage = () => {
    const { project } = this.props;

    if (project && project.signupError)
      return (
        <ErrorBanner message="Can't create a new project with passed args" />
      );
  };

  renderSelectorOptions = () => {
    if (this.isEmptyList()) return null;

    return this.props.user.list.map(user => {
      return (
        <Option value={user.id} key={user.id}>
          {user.name}
        </Option>
      );
    });
  };

  render() {
    return (
      <div className="signup-form">
        <h3>Add New Project</h3>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true
          }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          {this.renderErrorMessage()}
          <Form.Item
            label="Project Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please provide your project title"
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="userId"
            label="Project Owner"
            rules={[
              {
                required: true,
                message: "Please select a user from the list"
              }
            ]}
          >
            <Select
              placeholder="Select an option who own this project"
              allowClear
              disabled={this.isEmptyList()}
            >
              {this.renderSelectorOptions()}
            </Select>
          </Form.Item>

          <Form.Item {...tailLayout} name="type" valuePropName="checked">
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
  }
}

function mapStateToProps({ user, project }) {
  return { user, project };
}

export default connect(mapStateToProps, { addProject, fetchAllUsers })(
  ProjectAdd
);
