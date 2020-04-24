import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Empty, Badge } from "antd";
import ProjectList from "components/Project/ProjectList";
import AddButton from "components/Project/AddButton";
import { fetchProjectList } from "actions/project";

class ProjectIndex extends Component {
  componentDidMount() {
    return this.props.fetchProjectList();
  }

  renderEmptyBox() {
    return (
      <Empty
        description={
          <span>
            No added projects. Wanna <Link to="/project/add">add one</Link>?
          </span>
        }
      />
    );
  }

  render() {
    const { list } = this.props.project;

    return (
      <div>
        <h3>
          Project List&nbsp;<Badge count={list.length}></Badge>
        </h3>
        <div className="btn-padding">
          <AddButton />
        </div>
        {_.isEmpty(list) ? this.renderEmptyBox() : <ProjectList list={list} />}
      </div>
    );
  }
}

function mapStateToProps({ project }) {
  return { project };
}

export default connect(mapStateToProps, { fetchProjectList })(ProjectIndex);
