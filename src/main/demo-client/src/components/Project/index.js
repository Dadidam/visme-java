import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Empty, Badge } from "antd";
import ProjectList from "components/Project/ProjectList";
import AddButton from "components/Project/AddButton";
import ProjectPager from "components/Project/ProjectPager";
import TypeFilter from "components/Project/TypeFilter";
import { fetchProjectList } from "actions/project";

class ProjectIndex extends Component {
  componentDidMount() {
    const { app, fetchProjectList } = this.props;
    const { start, size } = app.projectPager;

    return fetchProjectList(start, size);
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

  renderList(list) {
    return (
      <div>
        <ProjectList list={list} />
        <ProjectPager />
      </div>
    );
  }

  renderBadge = () => {
    const { project } = this.props;

    if (!project || !project.pagination) return null;

    return <Badge count={project.pagination.total} />;
  };

  render() {
    const { list } = this.props.project;

    return (
      <div>
        <h3>
          Project List&nbsp;
          {this.renderBadge()}
        </h3>
        <div className="btn-padding">
          <AddButton />
        </div>
        <TypeFilter />
        {_.isEmpty(list) ? this.renderEmptyBox() : this.renderList(list)}
      </div>
    );
  }
}

function mapStateToProps({ app, project }) {
  return { app, project };
}

export default connect(mapStateToProps, { fetchProjectList })(ProjectIndex);
