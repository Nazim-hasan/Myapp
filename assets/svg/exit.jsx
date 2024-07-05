import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
const ExitIcon = (props) => (
  <Svg
    width={37}
    height={37}
    viewBox="0 0 37 37"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect x={0.925781} y={0.5} width={36} height={36} rx={3} fill="#FFE4E3" />
    <Path
      d="M16.9258 9.5L16.2632 9.73384C13.6845 10.644 12.3951 11.0991 11.6604 12.1374C10.9258 13.1758 10.9258 14.5431 10.9258 17.2778V19.7222C10.9258 22.4569 10.9258 23.8242 11.6604 24.8626C12.3951 25.9009 13.6845 26.356 16.2632 27.2662L16.9258 27.5"
      stroke="#FF3B30"
      strokeLinecap="round"
    />
    <Path
      d="M26.9258 18.5H16.9258M26.9258 18.5C26.9258 17.7998 24.9315 16.4915 24.4258 16M26.9258 18.5C26.9258 19.2002 24.9315 20.5085 24.4258 21"
      stroke="#FF3B30"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default ExitIcon;
