import React from "react";
import { Col } from "antd";
import "./Button.css";

// This would probably make more sense
// to be passed down as a "content" prop
// if more modularity is desirable.
const idToChar = {
  1: "1",
  2: "2 ABC",
  3: "3 DEF",
  4: "4 GHI",
  5: "5 JKL",
  6: "6 MNO",
  7: "7 PQRS",
  8: "8 TUV",
  9: "9 WXYZ",
  0: "0 _",
  up: "⬆️",
  down: "⬇️",
  ok: "✅",
  del: "❌",
  "*": "*",
  "#": "#"
};

const Button = ({ id, onClick, colSpan }) => {
  const handleClick = () => {
    onClick(id);
  };

  const span = colSpan ? colSpan : 8;

  return (
    <Col span={span}>
      <div onClick={handleClick} className="phone-button">{idToChar[id]}</div>
    </Col>
  );
};

export default Button;
