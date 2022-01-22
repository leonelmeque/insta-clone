import * as React from "react";
import Svg, { Circle } from "react-native-svg";

function SvgMoreHorizontal(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="More options"
      className="more-horizontal_svg___8-yf5"
      color="#262626"
      fill="#262626"
      height={24}
      width={24}
      {...props}
    >
      <Circle cx={12} cy={12} r={1.5} />
      <Circle cx={6.5} cy={12} r={1.5} />
      <Circle cx={17.5} cy={12} r={1.5} />
    </Svg>
  );
}

export default SvgMoreHorizontal;
