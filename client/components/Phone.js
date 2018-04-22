import React, { Component } from "react";
import { Row } from "antd";

import Button from "./Button";
import Display from "./Display";
import getSuggestions from "../services/getSuggestions";

class Phone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDigits: "",
      suggestions: [],
      output: [],
      currentWord: "",
      selectedSuggestionIdx: 0
    };
  }

  onDigitClick = async id => {
    const suggestions = await getSuggestions("english", this.state.currentDigits + id);
    this.setState(({ currentDigits }) => {
      return {
        currentDigits: currentDigits + id,
        suggestions: suggestions || [],
        currentWord: suggestions[0] || ""
      };
    });
  };

  onUpClick = () => {
    this.setState(({ selectedSuggestionIdx, suggestions }) => {
      if (!suggestions.length) return;

      selectedSuggestionIdx =
        selectedSuggestionIdx >= suggestions.length - 1
          ? suggestions.length - 1
          : selectedSuggestionIdx + 1;
      return {
        currentWord: suggestions[selectedSuggestionIdx],
        selectedSuggestionIdx
      };
    });
  };

  onDownClick = () => {
    this.setState(({ selectedSuggestionIdx, suggestions }) => {
      if (!suggestions.length) return;

      selectedSuggestionIdx = selectedSuggestionIdx
        ? selectedSuggestionIdx - 1
        : selectedSuggestionIdx;

      return {
        currentWord: suggestions[selectedSuggestionIdx],
        selectedSuggestionIdx
      };
    });
  };

  onOkClick = () => {
    this.setState(({ output, currentWord }) => {
      if (!currentWord.length) return;

      return {
        output: [...output, currentWord],
        currentWord: "",
        currentDigits: "",
        suggestions: [],
        selectedSuggestionIdx: 0
      };
    });
  };

  onDelClick = async () => {
    let { currentDigits } = this.state;

    if (currentDigits) {
      let newDigits = currentDigits.slice(0, -1);
      const suggestions = await getSuggestions("english", newDigits);

      this.setState(({ currentDigits }) => {
        if (!currentDigits === newDigits) {
          newDigits = currentDigits;
        }

        return {
          suggestions: suggestions || [],
          currentDigits: newDigits,
          currentWord: suggestions[0] || "",
          selectedSuggestionIdx: 0
        };
      });
    } else {
      this.setState(({ output }) => {
        return {
          output: output.slice(0, -1)
        };
      });
    }
  };

  render() {
    const { suggestions, output, currentWord } = this.state;

    return (
      <div>
        <main>
          <Row>
            <Display
              suggestions={suggestions}
              output={output}
              currentWord={currentWord}
            />
          </Row>
          <Row>
            <Button id="up" onClick={this.onUpClick} colSpan={6} />
            <Button id="down" onClick={this.onDownClick} colSpan={6} />
            <Button id="ok" onClick={this.onOkClick} colSpan={6} />
            <Button id="del" onClick={this.onDelClick} colSpan={6} />
          </Row>
          <Row>
            <Button id="1" onClick={this.onDigitClick} />
            <Button id="2" onClick={this.onDigitClick} />
            <Button id="3" onClick={this.onDigitClick} />
          </Row>
          <Row>
            <Button id="4" onClick={this.onDigitClick} />
            <Button id="5" onClick={this.onDigitClick} />
            <Button id="6" onClick={this.onDigitClick} />
          </Row>
          <Row>
            <Button id="7" onClick={this.onDigitClick} />
            <Button id="8" onClick={this.onDigitClick} />
            <Button id="9" onClick={this.onDigitClick} />
          </Row>
          <Row>
            <Button id="*" onClick={this.onDigitClick} />
            <Button id="0" onClick={this.onDigitClick} />
            <Button id="#" onClick={this.onDigitClick} />
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
        `}</style>
      </div>
    );
  }
}

export default Phone;
