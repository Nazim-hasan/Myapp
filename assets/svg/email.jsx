import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
export const EmailIcon = (props) => (
  <Svg
    width={20}
    height={18}
    viewBox="0 0 20 18"
    fill="none"
    {...props}
  >
    <Path
      opacity={0.4}
      d="M15.2399 6.69434L11.2474 9.90884C10.4919 10.5012 9.43271 10.5012 8.67715 9.90884L4.65039 6.69434"
      stroke="#4F4F4F"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.5243 1.48926H14.3489C15.6213 1.50353 16.8323 2.04143 17.7 2.9777C18.5677 3.91396 19.0162 5.16686 18.9411 6.44459V12.5547C19.0162 13.8325 18.5677 15.0853 17.7 16.0216C16.8323 16.9579 15.6213 17.4958 14.3489 17.5101H5.5243C2.79125 17.5101 0.949219 15.2866 0.949219 12.5547V6.44459C0.949219 3.71269 2.79125 1.48926 5.5243 1.48926Z"
      stroke="#4F4F4F"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
