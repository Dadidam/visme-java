import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Radio } from "antd";
import { fetchProjectList } from "actions/project";
import {
  changeProjectPagerPage,
  changeProjectPagerStart,
  changeProjectTypeFilter,
} from "actions/app";

class TypeFilter extends Component {
  fetchList = () => {
    const { app, fetchProjectList } = this.props;
    const { start, size } = app.projectPager;

    return fetchProjectList(start, size, app.typeFilter);
  };

  handleFilterChange = (e) => {
    // check if curr value !== new (do NOTHING in this case)

    console.log("radio checked", e.target.value);

    // set new type value
    this.props.changeProjectTypeFilter(e.target.value);

    // reset start to default
    this.props.changeProjectPagerStart();

    // reset page to default
    this.props.changeProjectPagerPage();

    // refetch list from server
    setTimeout(() => this.fetchList(), 250);
  };

  render() {
    return (
      <Form.Item label="Filter by Type">
        <Radio.Group
          value={this.props.app.typeFilter}
          onChange={this.handleFilterChange}
          defaultValue={null}
        >
          <Radio.Button value={null}>Show All</Radio.Button>
          <Radio.Button value={true}>Favorite Only</Radio.Button>
          <Radio.Button value={false}>Non-favorite</Radio.Button>
        </Radio.Group>
      </Form.Item>
    );
  }
}

function mapStateToProps({ app, project }) {
  return { app, project };
}

export default connect(mapStateToProps, {
  fetchProjectList,
  changeProjectPagerPage,
  changeProjectPagerStart,
  changeProjectTypeFilter,
})(TypeFilter);
