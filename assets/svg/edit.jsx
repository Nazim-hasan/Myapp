import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
const EditIcon = (props) => (
  <Svg
    width={31}
    height={31}
    viewBox="0 0 31 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect
      x={1.24971}
      y={0.8}
      width={29.4}
      height={29.4}
      rx={5.7}
      stroke="#00A746"
      strokeWidth={0.6}
    />
    <Path
      d="M22.2426 11.7997C22.6331 11.4092 22.6331 10.776 22.2426 10.3855L21.0642 9.20711C20.6737 8.81658 20.0405 8.81658 19.65 9.20711L10.17 18.6871C10.0498 18.8073 9.96224 18.9561 9.91556 19.1195L9.44421 20.7693C9.22868 21.5236 9.9261 22.221 10.6805 22.0055L12.3302 21.5342C12.4936 21.4875 12.6424 21.3999 12.7626 21.2797L22.2426 11.7997ZM18.283 10.5741L20.8756 13.1667L18.283 10.5741ZM9.98674 18.8704L12.5793 21.463L9.98674 18.8704Z"
      fill="#00A746"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default EditIcon;
