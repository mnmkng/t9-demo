import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
const { Header: AntHeader } = Layout;

class Header extends Component {
  renderAuthLinks = () => {
    if (this.props.authenticated) {
      return (
        <Menu.Item key="3">
          <Link to="/signout">Sign Out</Link>
        </Menu.Item>
      );
    } else {
      return [
        <Menu.Item key="3">
          <Link to="/signin">Sign In</Link>
        </Menu.Item>,

        <Menu.Item key="4">
          <Link to="/signup">Sign Up</Link>
        </Menu.Item>
      ];
    }
  };

  render() {

    return (
      <AntHeader style={{ background: "#fff" }}>
        <Menu mode="horizontal" style={{ lineHeight: "64px" }}>
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>

          <Menu.Item key="2">
            <Link to="/phone">Phone</Link>
          </Menu.Item>
          {this.renderAuthLinks()}
        </Menu>
      </AntHeader>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
