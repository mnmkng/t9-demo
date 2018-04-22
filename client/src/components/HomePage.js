import React, { Component } from "react";
import { AutoComplete } from "antd";

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

  render() {
    const { dataSource } = this.state;
    return (
        <div style={{width: "400px", margin: "auto", "paddingTop": "100px", "paddingBottom": "100px" }}>
          <AutoComplete
            dataSource={dataSource}
            style={{ width: 400 }}
            onSearch={this.handleSearch}
            placeholder="Type some numbers..."
          />
        </div>
    );
  }
}

export default Complete;
