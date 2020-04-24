import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Empty, Badge, Skeleton } from "antd";
import MainLayout from "containers/MainLayout";
import UserList from "components/UserManagement/UserList";
import UserAddButton from "components/UserManagement/UserAddButton";
import { fetchAllUsers } from "actions/user";

class ProjectIndex extends Component {
  componentDidMount() {
    return this.props.fetchAllUsers();
  }

  renderEmptyBox() {
    return (
      <Empty
        description={
          <span>
            No active users. Wanna <Link to="/user/add">add one</Link>?
          </span>
        }
      />
    );
  }

  renderContent() {
    const { user } = this.props;

    if (!user) return <Skeleton active />;

    const list = user.list;

    return _.isEmpty(list) ? this.renderEmptyBox() : <UserList list={list} />;
  }

  renderBadge() {
    const { user } = this.props;

    if (!user || !user.list || !user.list.length) return null;

    return <Badge count={user.list.length}></Badge>;
  }

  render() {
    return (
      <MainLayout history={this.props.history}>
        <h3>User Management&nbsp;{this.renderBadge()}</h3>
        <div className="btn-padding">
          <UserAddButton />
        </div>
        {this.renderContent()}
      </MainLayout>
    );
  }
}

function mapStateToProps({ user, project }) {
  return { user, project };
}

export default connect(mapStateToProps, { fetchAllUsers })(ProjectIndex);
