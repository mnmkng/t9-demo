import React, { Component } from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

class SignOut extends Component {
  componentDidMount() {
    this.props.signoutUser();
  }

  render() {
    return (
      <div style={{ padding: "30px", background: "#fff" }}>
        <Card
          title="Sign Out Successful"
          bordered={true}
          style={{ width: 300, background: "#fff" }}
        >
          <p>Come back soon!</p>
          <Link to="/">Go back home</Link>
        </Card>
      </div>
    );
  }
}

export default connect(null, actions)(SignOut);
