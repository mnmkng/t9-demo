import React, { Component } from "react";
import "./Display.css";

class Display extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    const {output, currentWord, suggestions, currentDigits} = this.props;

    return (
      <div>
        <div className="phone-display-output">
          {`${output.join(" ")} ${currentWord}`}
        </div>
        <div className="phone-display-suggestions">
          {suggestions.length ? suggestions.join(" ") : currentDigits}
        </div>
      </div>
    );
  }
}

export default Display;
