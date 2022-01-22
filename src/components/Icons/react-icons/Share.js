import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgShare(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Share Post"
      className="share_svg___8-yf5"
      color="#262626"
      fill="#262626"
      height={24}
      viewBox="0 0 48 48"
      width={24}
      {...props}
    >
      <Path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z" />
    </Svg>
  );
}

export default SvgShare;
