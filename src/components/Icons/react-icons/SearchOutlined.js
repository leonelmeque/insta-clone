import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgSearchOutlined(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Search &amp; Explore"
      className="search-outlined_svg___8-yf5"
      color="#262626"
      fill="#262626"
      height={24}
      viewBox="0 0 48 48"
      width={24}
      {...props}
    >
      <Path d="M20 40C9 40 0 31 0 20S9 0 20 0s20 9 20 20-9 20-20 20zm0-37C10.6 3 3 10.6 3 20s7.6 17 17 17 17-7.6 17-17S29.4 3 20 3z" />
      <Path d="M46.6 48.1c-.4 0-.8-.1-1.1-.4L32 34.2c-.6-.6-.6-1.5 0-2.1s1.5-.6 2.1 0l13.5 13.5c.6.6.6 1.5 0 2.1-.2.3-.6.4-1 .4z" />
    </Svg>
  );
}

export default SvgSearchOutlined;
