import React, { Component } from "react";
import { connect } from "react-redux";
import { Pagination } from "antd";
import { fetchProjectList } from "actions/project";
import {
  changeProjectPagerPage,
  changeProjectPagerSize,
  changeProjectPagerStart,
} from "actions/app";

class ProjectPager extends Component {
  fetchList = () => {
    const { app, fetchProjectList } = this.props;
    const { start, size } = app.projectPager;

    return fetchProjectList(start, size, app.typeFilter);
  };

  onSizeChange = (current, size) => {
    // set new page size
    this.props.changeProjectPagerSize(size);

    // reset start to default
    this.props.changeProjectPagerStart();

    // reset page to default
    this.props.changeProjectPagerPage();

    // refetch list from server
    setTimeout(() => this.fetchList(), 250);
  };

  onPageChange = (page, pageSize) => {
    const { size } = this.props.app.projectPager;
    const offset = page * size - size;

    this.props.changeProjectPagerPage(page);
    this.props.changeProjectPagerStart(offset);

    setTimeout(() => this.fetchList(), 250);
  };

  render() {
    const { app, project } = this.props;

    return (
      <Pagination
        total={project.pagination.total}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        showSizeChanger={true}
        pageSizeOptions={["2", "5", "10"]}
        pageSize={app.projectPager.size}
        current={app.projectPager.page}
        defaultCurrent={1}
        defaultPageSize={2}
        onChange={this.onPageChange}
        onShowSizeChange={this.onSizeChange}
        style={{ marginTop: 25 }}
      />
    );
  }
}

function mapStateToProps({ app, project }) {
  return { app, project };
}

export default connect(mapStateToProps, {
  fetchProjectList,
  changeProjectPagerPage,
  changeProjectPagerSize,
  changeProjectPagerStart,
})(ProjectPager);
