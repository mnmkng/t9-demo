import React, {Component} from "react";
import { Card } from 'antd';
import {connect} from "react-redux";
import * as actions from "../actions"

class SignOut extends Component {

  componentDidMount() {
    this.props.signoutUser();
  }

  render() {
    return (
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Card title="Sign Out Successful" bordered={true} style={{ width: 300 }}>
          <p>Come back soon!</p>
        </Card>
      </div>
    )
  }

}

export default connect(null, actions)(SignOut);
