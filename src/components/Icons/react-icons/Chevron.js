import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgChevron(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Back"
      className="chevron_svg___8-yf5"
      color="#262626"
      fill="#262626"
      height={24}
      viewBox="0 0 48 48"
      width={24}
      {...props}
    >
      <Path d="M40 33.5c-.4 0-.8-.1-1.1-.4L24 18.1l-14.9 15c-.6.6-1.5.6-2.1 0s-.6-1.5 0-2.1l16-16c.6-.6 1.5-.6 2.1 0l16 16c.6.6.6 1.5 0 2.1-.3.3-.7.4-1.1.4z" />
    </Svg>
  );
}

export default SvgChevron;
