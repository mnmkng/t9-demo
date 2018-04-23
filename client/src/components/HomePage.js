import React, { Component } from "react";
import { AutoComplete } from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {getSuggestions} from "../services/apiCalls"

class Complete extends Component {
  state = {
    dataSource: []
  };

  handleSearch = async value => {

    const data = await getSuggestions("demo", value);

    this.setState({
      dataSource: data
    });
  };

  renderMessage = () => {
    if (!this.props.authenticated) {
      return (
        <p style={{marginTop: "20px"}}>
          To use the T9 with a real UglyPhone 9000, please <Link to="/signin">Sign In</Link> or <Link to="/signup">Sign Up</Link>
        </p>
      )
    }
  };

  render() {
    const { dataSource } = this.state;
    return (
        <div style={{width: "500px", margin: "auto", "paddingTop": "100px", "paddingBottom": "100px" }}>

          <h1>This is a T9 simulator demo!</h1>

          <AutoComplete
            dataSource={dataSource}
            style={{ width: 450 }}
            onSearch={this.handleSearch}
            placeholder="Type some numbers..."
          />

          {this.renderMessage()}

        </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Complete);
