import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg width="30" height="23" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7.01306 12.4811C7.01645 12.5488 7.00603 12.6165 6.98242 12.6801C6.95882 12.7437 6.92253 12.8018 6.87576 12.8509C6.82898 12.9 6.77271 12.9391 6.71036 12.9657C6.64801 12.9924 6.58088 13.0061 6.51306 13.0061H0.998061C0.772355 13.0064 0.553171 12.9304 0.376152 12.7903C0.199133 12.6503 0.0746907 12.4545 0.0230607 12.2348C-0.00908816 12.0844 -0.00760611 11.9288 0.0274007 11.779C0.0624075 11.6293 0.130074 11.4891 0.225561 11.3685C1.10782 10.1985 2.27842 9.27729 3.62306 8.6948C3.03272 8.15655 2.57994 7.48469 2.30266 6.73547C2.02537 5.98625 1.93164 5.1815 2.02933 4.38861C2.12701 3.59573 2.41326 2.83779 2.86411 2.17828C3.31495 1.51877 3.91726 0.976891 4.6206 0.598027C5.32393 0.219164 6.1078 0.0143455 6.90657 0.000726697C7.70534 -0.0128921 8.49574 0.165085 9.21158 0.519752C9.92741 0.874419 10.5478 1.39545 11.0209 2.03921C11.494 2.68296 11.8059 3.4307 11.9306 4.2198C11.9467 4.32591 11.9276 4.43438 11.8764 4.5287C11.8252 4.62302 11.7446 4.69802 11.6468 4.7423C10.2598 5.38352 9.08514 6.4081 8.26144 7.69515C7.43774 8.98219 6.99937 10.478 6.99806 12.0061C6.99806 12.166 6.99806 12.3236 7.01306 12.4811ZM29.7631 11.3673C28.8828 10.1986 27.7149 9.2779 26.3731 8.6948C26.9634 8.15655 27.4162 7.48469 27.6935 6.73547C27.9708 5.98625 28.0645 5.1815 27.9668 4.38861C27.8691 3.59573 27.5829 2.83779 27.132 2.17828C26.6812 1.51877 26.0789 0.976891 25.3755 0.598027C24.6722 0.219164 23.8883 0.0143455 23.0896 0.000726697C22.2908 -0.0128921 21.5004 0.165085 20.7845 0.519752C20.0687 0.874419 19.4483 1.39545 18.9752 2.03921C18.5021 2.68296 18.1902 3.4307 18.0656 4.2198C18.0495 4.32591 18.0685 4.43438 18.1197 4.5287C18.1709 4.62302 18.2515 4.69802 18.3493 4.7423C19.7363 5.38352 20.911 6.4081 21.7347 7.69515C22.5584 8.98219 22.9967 10.478 22.9981 12.0061C22.9981 12.166 22.9981 12.3236 22.9831 12.4811C22.9797 12.5488 22.9901 12.6165 23.0137 12.6801C23.0373 12.7437 23.0736 12.8018 23.1204 12.8509C23.1671 12.9 23.2234 12.9391 23.2858 12.9657C23.3481 12.9924 23.4152 13.0061 23.4831 13.0061H28.9981C29.2238 13.0064 29.4429 12.9304 29.62 12.7903C29.797 12.6503 29.9214 12.4545 29.9731 12.2348C30.0054 12.0841 30.0039 11.9282 29.9687 11.7782C29.9334 11.6281 29.8653 11.4878 29.7693 11.3673H29.7631ZM18.6381 16.7648C19.6337 16.0023 20.3655 14.9469 20.7304 13.747C21.0953 12.5471 21.075 11.2631 20.6724 10.0753C20.2698 8.88752 19.5052 7.85575 18.4859 7.12501C17.4667 6.39426 16.2441 6.00127 14.9899 6.00127C13.7358 6.00127 12.5132 6.39426 11.4939 7.12501C10.4747 7.85575 9.71003 8.88752 9.30746 10.0753C8.90488 11.2631 8.88462 12.5471 9.24951 13.747C9.61441 14.9469 10.3461 16.0023 11.3418 16.7648C9.57498 17.5303 8.09964 18.8414 7.13181 20.5061C7.04403 20.6581 6.99783 20.8305 6.99784 21.0061C6.99785 21.1817 7.04407 21.3541 7.13187 21.5061C7.21966 21.6582 7.34593 21.7844 7.49798 21.8722C7.65003 21.9599 7.8225 22.0061 7.99806 22.0061H21.9981C22.1736 22.0061 22.3461 21.9599 22.4981 21.8722C22.6502 21.7844 22.7765 21.6582 22.8643 21.5061C22.952 21.3541 22.9983 21.1817 22.9983 21.0061C22.9983 20.8305 22.9521 20.6581 22.8643 20.5061C21.8944 18.8403 20.4163 17.5291 18.6468 16.7648H18.6381Z"/>
    </Svg>
  );
};

export default Icon;
