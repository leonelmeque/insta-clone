import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgStoryAdd(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Plus icon"
      className="story-add_svg___8-yf5"
      color="#0095f6"
      fill="#0095f6"
      height={16}
      viewBox="0 0 48 48"
      width={16}
      {...props}
    >
      <Path
        d="M24 0C10.8 0 0 10.7 0 24s10.7 24 24 24 24-10.7 24-24S37.3 0 24 0zm12.3 25.5H25.5v10.7c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5V25.5H11.8c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h10.7V11.7c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v10.7h10.7c.8 0 1.5.7 1.5 1.5s-.6 1.6-1.4 1.6z"
        fill="#0095F6"
      />
    </Svg>
  );
}

export default SvgStoryAdd;
