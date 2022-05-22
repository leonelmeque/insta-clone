import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgHomeFilled(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Home"
      className="home-filled_svg___8-yf5"
      color="#262626"
      fill="#262626"
      height={24}
      viewBox="0 0 48 48"
      width={24}
      {...props}
    >
      <Path d="M45.5 48H30.1c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2.1-4.6-4.6-4.6s-4.6 2.1-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.6-.6 2.1 0l21.5 21.5c.3.3.4.7.4 1.1v23.5c.1.8-.6 1.5-1.4 1.5z" />
    </Svg>
  );
}

export default SvgHomeFilled;