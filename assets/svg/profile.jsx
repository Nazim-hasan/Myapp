import * as React from "react";
import Svg, { Path } from "react-native-svg";
const ProfileIcon = (props) => (
  <Svg
    width={14}
    height={15}
    viewBox="0 0 14 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M3.34899 3.39391C3.34899 5.22202 4.83668 6.7097 6.66478 6.7097C8.49289 6.7097 9.98057 5.22202 9.98057 3.39391C9.98057 1.56581 8.49289 0.078125 6.66478 0.078125C4.83668 0.078125 3.34899 1.56581 3.34899 3.39391ZM12.5595 14.0781H13.2964V13.3413C13.2964 10.4978 10.9819 8.18339 8.13847 8.18339H5.1911C2.34689 8.18339 0.0332031 10.4978 0.0332031 13.3413V14.0781H12.5595Z"
      fill="#868D7E"
    />
  </Svg>
);
export default ProfileIcon;
