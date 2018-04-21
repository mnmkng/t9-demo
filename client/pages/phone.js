import React, { Component } from "react";
import { Row } from "antd";

import Layout from "../components/Layout";
import Button from "../components/Button";


class Phone extends Component {

  constructor (props) {
    super(props);
    this.state = {
      display: []
    }
  }

  onButtonClick = (id) => {
    this.setState((prevState) => ({
      display: [...prevState.display, id]
    }))
  };

  render() {
    return (
      <Layout>
        <main>
          <Row>
            <div>{this.state.display.join(" ")}</div>
          </Row>
          <Row>
            <Button id="up" onClick={this.onButtonClick}/>
            <Button id="down" onClick={this.onButtonClick}/>
            <Button id="ok" onClick={this.onButtonClick}/>
          </Row>
          <Row>
            <Button id="1" onClick={this.onButtonClick}/>
            <Button id="2" onClick={this.onButtonClick}/>
            <Button id="3" onClick={this.onButtonClick}/>
          </Row>
          <Row>
            <Button id="4" onClick={this.onButtonClick}/>
            <Button id="5" onClick={this.onButtonClick}/>
            <Button id="6" onClick={this.onButtonClick}/>
          </Row>
          <Row>
            <Button id="7" onClick={this.onButtonClick}/>
            <Button id="8" onClick={this.onButtonClick}/>
            <Button id="9" onClick={this.onButtonClick}/>
          </Row>
          <Row>
            <Button id="*" onClick={this.onButtonClick}/>
            <Button id="0" onClick={this.onButtonClick}/>
            <Button id="#" onClick={this.onButtonClick}/>
          </Row>
        </main>
        {/*language=CSS*/}
        <style jsx>{`
          main {
            text-align: center;
            width: 48vw;
            max-width: 500px;
            margin: 50px auto;
            border: 1px solid #333;
            border-radius: 10px;
            background: steelblue;
            padding: 20px;
          }
          div {
            font-size: 3vw;
            width: 95%;
            height: 20vw;
            margin: 10px auto;
            border: 1px solid #333;
            background: khaki;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Phone;
