import React, { Component } from "react";

class Display extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    const {output, suggestions, currentWord} = this.props;

    return (
      <div>
        <main>
          {`${output.join(" ")} ${currentWord}`}
        </main>
        <section>
          {suggestions.join(" ")}
        </section>

        {/*language=CSS*/}
        <style jsx>{`
          main {
            font-size: 3vw;
            width: 95%;
            height: 10vw;
            margin: 10px auto 0px auto;
            border: 1px solid #333;
            border-bottom: 0px;
            background: khaki;
          }
          section {
            font-size: 2vw;
            width: 95%;
            height: 20vw;
            margin: 0px auto 10px auto;
            border: 1px solid #333;
            border-top: 0px;
            background: khaki;
            overflow: auto;
          }
        `}</style>
      </div>
    );
  }
}

export default Display;
