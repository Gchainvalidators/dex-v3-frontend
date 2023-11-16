import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 28 28" fill="none" {...props}>
      <path
        d="M14 25.532C13.8576 25.532 13.7247 25.5417 13.5919 25.5513L8.02034 8.27515L14.019 0L19.9797 8.27515L14.4081 25.5513C14.2753 25.532 14.1329 25.532 14 25.532ZM7.18508 10.5496L1.4522 8.91393L0.31322 14.421L11.1525 26.3256C11.5607 26.074 12.0068 25.8804 12.4719 25.7449L7.18508 10.5496ZM0 16.3567L2.16407 23.5382L9.38712 28C9.57695 27.7193 9.78576 27.458 10.0231 27.216L0 16.3567ZM27.6868 14.421L26.5478 8.91393L20.8149 10.5496L15.5376 25.7449C16.0027 25.8804 16.4488 26.074 16.857 26.3256L27.6868 14.421ZM28 16.3567L17.9769 27.216C18.2142 27.458 18.4231 27.7193 18.6129 28L25.8359 23.5382L28 16.3567Z"
        fill="url(#paint0_linear_2_51)"
      />
      <defs>
        <linearGradient id="paint0_linear_2_51" x1="14" y1="27.9998" x2="14" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#25AEF2" />
          <stop offset="1" stopColor="#014EE9" />
        </linearGradient>
      </defs>
    </Svg>
  );
};

export default Icon;
