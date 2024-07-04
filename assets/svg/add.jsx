import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const AddIcon = (props) => (
  <Svg
    width={63}
    height={63}
    viewBox="0 0 63 63"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle
      cx={31.1641}
      cy={31.5781}
      r={29.5}
      fill="#4CAF50"
      stroke="white"
      strokeWidth={3}
    />
    <Path
      d="M31.1641 23.5781V39.5781M39.1641 31.5781H23.1641"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default AddIcon;
