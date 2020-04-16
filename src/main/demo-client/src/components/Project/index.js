import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Empty, Badge } from "antd";
import MainLayout from "containers/MainLayout";
import ProjectList from "components/Project/ProjectList";
import AddButton from "components/Project/AddButton";
import { fetchUserProjects } from "actions/project";

class ProjectIndex extends Component {
  componentDidMount() {
    const { user, fetchUserProjects } = this.props;
    return fetchUserProjects(user.id);
  }

  renderEmptyBox() {
    return (
      <Empty>
        <AddButton />
      </Empty>
    );
  }

  render() {
    const { list } = this.props.project;

    return (
      <MainLayout>
        <h3>
          Project List&nbsp;<Badge count={list.length}></Badge>
        </h3>
        <div className="btn-padding">
          <AddButton />
        </div>
        {_.isEmpty(list) ? this.renderEmptyBox() : <ProjectList list={list} />}
      </MainLayout>
    );
  }
}

function mapStateToProps({ user, project }) {
  return { user, project };
}

export default connect(mapStateToProps, { fetchUserProjects })(ProjectIndex);
