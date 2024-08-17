import * as React from "react";
import Svg, { Path, Ellipse, SvgProps } from "react-native-svg";
export const LockIcon = (props: SvgProps) => (
  <Svg
    width={19}
    height={21}
    viewBox="0 0 19 21"
    fill="none"
    {...props}
  >
    <Path
      d="M5.30293 7H4.50293C2.29379 7 0.50293 8.79086 0.50293 11V16.5C0.50293 18.7091 2.29379 20.5 4.50293 20.5H14.5029C16.7121 20.5 18.5029 18.7091 18.5029 16.5V11C18.5029 8.79086 16.7121 7 14.5029 7H13.7029M5.30293 7V4.7C5.30293 2.3804 7.18333 0.5 9.50293 0.5V0.5C11.8225 0.5 13.7029 2.3804 13.7029 4.7V7M5.30293 7H13.7029"
      stroke="#4F4F4F"
    />
    <Ellipse cx={9.50293} cy={13.75} rx={3} ry={2.5} stroke="#4F4F4F" />
  </Svg>
);
