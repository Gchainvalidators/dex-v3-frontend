import * as React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 18 16" fill="none" {...props}>
      <path
        d="M0.35953 7.71717L4.55404 9.30465L6.11201 14.5556C6.23185 14.9219 6.59138 15.044 6.83107 14.7998L9.10809 12.846C9.34778 12.6017 9.70731 12.6017 9.94699 12.846L14.1415 15.8988C14.3812 16.1431 14.8606 15.8988 14.8606 15.6546L17.9765 0.634525C18.0963 0.268182 17.7368 -0.0981614 17.3773 0.0239531L0.35953 6.74025C-0.119843 6.86236 -0.119843 7.47294 0.35953 7.71717ZM5.87232 8.44985L14.0217 3.32104C14.1415 3.19893 14.2614 3.44316 14.1415 3.56527L7.43028 9.91523C7.1906 10.1595 7.07075 10.4037 6.95091 10.77L6.71122 12.4796C6.71122 12.7239 6.35169 12.7239 6.35169 12.4796L5.51279 9.30465C5.39295 9.06042 5.51279 8.57197 5.87232 8.44985Z"
      />
    </Svg>
  );
};

export default Icon;