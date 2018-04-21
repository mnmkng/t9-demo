import { Col } from "antd";

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
      <div onClick={handleClick}>{idToChar[id]}</div>
      {/*language=CSS*/}
      <style jsx>{`
        div {
          display: inline-block;
          border: 1px solid #333;
          border-radius: 5px;
          text-align: center;
          width: 90%;
          height: 90%;
          line-height: 5vw;
          margin: 2%;
          font-size: 2vw;
          text-decoration: none;
          color: inherit;
          background: rgba(255, 255, 255, 0.7);
          transition: all 0.3s ease-in-out;
        }
        div:hover {
          box-shadow: inset 0 0 2px rgba(0, 0, 0, 1);
        }
      `}</style>
    </Col>
  );
};

export default Button;
