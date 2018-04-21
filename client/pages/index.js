import React, { Component } from "react";
import { AutoComplete } from "antd";
import Layout from "../components/Layout";

import getSuggestions from "../services/getSuggestions"

function onSelect(value) {
  console.log("onSelect", value);
}

class Complete extends Component {
  state = {
    dataSource: []
  };

  handleSearch = async value => {

    const data = await getSuggestions(value);
    console.log(data);

    this.setState({
      dataSource: data
    });
  };

  render() {
    const { dataSource } = this.state;
    return (
      <Layout>
        <div style={{width: "400px", margin: "auto", "paddingTop": "100px", "paddingBottom": "100px" }}>
          <AutoComplete
            dataSource={dataSource}
            style={{ width: 400 }}
            onSelect={onSelect}
            onSearch={this.handleSearch}
            placeholder="Type some numbers..."
          />
        </div>
      </Layout>
    );
  }
}

export default Complete;
