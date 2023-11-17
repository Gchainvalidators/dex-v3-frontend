import { InputHTMLAttributes } from "react";
import styled from "styled-components";
import Text from "../Text/Text";

interface SliderLabelProps {
  progress: string;
}

interface StyledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isMax: boolean;
}

interface DisabledProp {
  disabled?: boolean;
}

const getCursorStyle = ({ disabled = false }: DisabledProp) => {
  return disabled ? "not-allowed" : "cursor";
};

const bunnyHeadMax = `"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARsSURBVHgBrVZfTFtVGP/1tpTbluKl/wfruAVkHZWtW4KK0djoFo3GyING/JNQFx/0ifFkpjPW+KDGmDE12+IL24tLZmLwyZFlQTQqk0wgC9DJBpcNBqyU3lJ6e0t7b73nIrUQCmj2S27O6fnO+X7n/M73faca/Ac0vHzMX253+0mfdlRyP4VeHVK6/FZrNNgB/G+8164zPRAqr/QwheNZMQmdwXxOljMfKWTc/yJoevvTLvOumuBWc0Q+gvjMzeDIxZPnN9q0Wy186uPvPiwtqziGbaCjTaDLLS0VdY19c0M/c4U2qtiiQOgCCzkXwg5BSCye/V1Kl9kRQToaaSEaF0MRG+t//XhwRwSKpT0rCuuckXbtK0ZoqvQEtiVgAy8FDBYXm8svFmCjKTiyPII+JxyZmCrJGlLKJecdanUHtiWoCbS2kdbA2NXfOtqIJtMK9lSU4ffxKTxfa8nPjXGjsNNbCbEBJObF+HyQ9MWCnbmMJTj/xfv48dvT8Lmr8mPvPvMIWnzVeNqaU2XKSRJXlIBETrn7wRBdsHOCjCLR1OwcTpw4jsMP70dTnRtWfgIfHLJCujeJzq8+h92oVza0gPRSdB2BrtC5GIv0Gi0uZm33a0QkG+dFCUefCyDg9QKShItvvaDaPjvbixqbEY21HmjH45AzK/7NCBhZTPVSlJYtNCbmpmB2VatEfHQEmJiAXyGIzq9KZ3Xa8WQgANblwvd/XEcJOTFtXOdDzWSlHJwR49GA2fWvjURJLpvJR4vezKDe7YZNm4EwPYexa4Pw+LzwsyxYmw0//HUPMcoESqenc8j18dwop56eSENptJPYBCT8SCSpRY0Q/jkC753dePYVD3wP2TCbymAmu4Bf7yYwHEnmNyby0VO/nXxHLTEUyVgUwcZK+LjQjAbNQSSuVOPy18vovsDjmxsJjCRWc4U4J5uhGWubWmqIRE7/Ey7IUqtiJHWd3kiiHFn9kuM3UC/VwSpYIKcp6FJloEsFTDpESNrVlJQVSdWTxxfCS9Pj+4xW+5B29tqVsMPXXEHpSjQ5WWI0VElYo9G4yERpJc1LaZHee8uCmqSiv2DCwhIHhnZCQ2kgKRItUSnELVnVOYk8nd7EZ4XE8GBXqJXnwrx6ybODvf01R15zLd66Pq83mB/NpgVRXFq85Axn2MPD++jdMTv0i2kYJCMfTkToSC6Jm3EOlOLUs+wExyaQiE2rEvFTY/16i6Vnpr+nf6PMJP755vYvJ0kdIgONA2YciNSthhutgZBMooQqzS+IpG/DSXtwqfYqJswzvMHiQHRs4NRo9+lO/POUFmayOqDIk3+VOGY2b7yLCSjRtu5+aK1ZbY0JqqN8156OXz5586DAL55DwTu96ZP5WMeZTiUS2nOyDO+wCUL0Nkxlu3Ao2pCfI2QTSMspzlrqwtGr9R4UQdE3WfkHESyzVb5ocrKMsHCHTy7OTS339TB7rd42rUFJvHmLp5s7yzXZj/gHIpeHcL9QVVVFag2z0/l/A09YyLEjveAzAAAAAElFTkSuQmCC"`;
const bunnyHeadMain = `"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARsSURBVHgBrVZfTFtVGP/1tpTbluKl/wfruAVkHZWtW4KK0djoFo3GyING/JNQFx/0ifFkpjPW+KDGmDE12+IL24tLZmLwyZFlQTQqk0wgC9DJBpcNBqyU3lJ6e0t7b73nIrUQCmj2S27O6fnO+X7n/M73faca/Ac0vHzMX253+0mfdlRyP4VeHVK6/FZrNNgB/G+8164zPRAqr/QwheNZMQmdwXxOljMfKWTc/yJoevvTLvOumuBWc0Q+gvjMzeDIxZPnN9q0Wy186uPvPiwtqziGbaCjTaDLLS0VdY19c0M/c4U2qtiiQOgCCzkXwg5BSCye/V1Kl9kRQToaaSEaF0MRG+t//XhwRwSKpT0rCuuckXbtK0ZoqvQEtiVgAy8FDBYXm8svFmCjKTiyPII+JxyZmCrJGlLKJecdanUHtiWoCbS2kdbA2NXfOtqIJtMK9lSU4ffxKTxfa8nPjXGjsNNbCbEBJObF+HyQ9MWCnbmMJTj/xfv48dvT8Lmr8mPvPvMIWnzVeNqaU2XKSRJXlIBETrn7wRBdsHOCjCLR1OwcTpw4jsMP70dTnRtWfgIfHLJCujeJzq8+h92oVza0gPRSdB2BrtC5GIv0Gi0uZm33a0QkG+dFCUefCyDg9QKShItvvaDaPjvbixqbEY21HmjH45AzK/7NCBhZTPVSlJYtNCbmpmB2VatEfHQEmJiAXyGIzq9KZ3Xa8WQgANblwvd/XEcJOTFtXOdDzWSlHJwR49GA2fWvjURJLpvJR4vezKDe7YZNm4EwPYexa4Pw+LzwsyxYmw0//HUPMcoESqenc8j18dwop56eSENptJPYBCT8SCSpRY0Q/jkC753dePYVD3wP2TCbymAmu4Bf7yYwHEnmNyby0VO/nXxHLTEUyVgUwcZK+LjQjAbNQSSuVOPy18vovsDjmxsJjCRWc4U4J5uhGWubWmqIRE7/Ey7IUqtiJHWd3kiiHFn9kuM3UC/VwSpYIKcp6FJloEsFTDpESNrVlJQVSdWTxxfCS9Pj+4xW+5B29tqVsMPXXEHpSjQ5WWI0VElYo9G4yERpJc1LaZHee8uCmqSiv2DCwhIHhnZCQ2kgKRItUSnELVnVOYk8nd7EZ4XE8GBXqJXnwrx6ybODvf01R15zLd66Pq83mB/NpgVRXFq85Axn2MPD++jdMTv0i2kYJCMfTkToSC6Jm3EOlOLUs+wExyaQiE2rEvFTY/16i6Vnpr+nf6PMJP755vYvJ0kdIgONA2YciNSthhutgZBMooQqzS+IpG/DSXtwqfYqJswzvMHiQHRs4NRo9+lO/POUFmayOqDIk3+VOGY2b7yLCSjRtu5+aK1ZbY0JqqN8156OXz5586DAL55DwTu96ZP5WMeZTiUS2nOyDO+wCUL0Nkxlu3Ao2pCfI2QTSMspzlrqwtGr9R4UQdE3WfkHESyzVb5ocrKMsHCHTy7OTS339TB7rd42rUFJvHmLp5s7yzXZj/gHIpeHcL9QVVVFag2z0/l/A09YyLEjveAzAAAAAElFTkSuQmCC"`;
const bunnyButt = `"data:image/svg+xml,%3Csvg width='15' height='32' viewBox='0 0 15 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.58803 20.8649C7.72935 21.3629 8.02539 24.0334 8.76388 26.7895C9.50238 29.5456 10.5812 32.0062 12.4399 31.5082C14.2986 31.0102 15.2334 28.0099 14.4949 25.2538C13.7564 22.4978 11.4467 20.3669 9.58803 20.8649Z' fill='%230098A1'/%3E%3Cpath d='M1 24.4516C1 20.8885 3.88849 18 7.45161 18H15V28H4.54839C2.58867 28 1 26.4113 1 24.4516Z' fill='%231FC7D4'/%3E%3Cpath d='M6.11115 17.2246C6.79693 18.4124 5.77784 19.3343 4.52793 20.0559C3.27802 20.7776 1.97011 21.1992 1.28433 20.0114C0.598546 18.8236 1.1635 17.1151 2.41341 16.3935C3.66332 15.6718 5.42537 16.0368 6.11115 17.2246Z' fill='%2353DEE9'/%3E%3Cpath d='M1.64665 23.6601C0.285995 25.0207 1.87759 27.1854 3.89519 29.203C5.91279 31.2206 8.07743 32.8122 9.43808 31.4515C10.7987 30.0909 10.1082 27.0252 8.09058 25.0076C6.07298 22.99 3.0073 22.2994 1.64665 23.6601Z' fill='%231FC7D4'/%3E%3C/svg%3E"`;

const getBaseThumbStyles = ({ isMax, disabled }: StyledInputProps) => `
  -webkit-appearance: none;
  background-image: url(${isMax ? bunnyHeadMax : bunnyHeadMain});
  background-color: transparent;
  background-repeat: no-repeat;
  box-shadow: none;
  border: 0;
  cursor: ${getCursorStyle};
  width: 24px;
  height: 24px;
  filter: ${disabled ? "grayscale(100%)" : "none"};
  transform: translate(-2px, -2px);
  transition: 200ms transform;
  &:hover {
    transform: ${disabled ? "scale(1) translate(-2px, -2px)" : "scale(1.1) translate(-3px, -3px)"};
  }
`;

export const SliderLabelContainer = styled.div`
  bottom: 0;
  position: absolute;
  left: 14px;
  width: calc(100% - 30px);
`;

export const SliderLabel = styled(Text)<SliderLabelProps>`
  bottom: 0;
  font-size: 12px;
  left: ${({ progress }) => progress};
  position: absolute;
  text-align: center;
  min-width: 24px; // Slider thumb size
`;

export const BunnyButt = styled.div<DisabledProp>`
  background: url(${bunnyButt}) no-repeat;
  height: 32px;
  filter: ${({ disabled }) => (disabled ? "grayscale(100%)" : "none")};
  position: absolute;
  width: 15px;
`;

export const BunnySlider = styled.div`
  position: absolute;
  left: 14px;
  width: calc(100% - 14px);
`;

export const StyledInput = styled.input<StyledInputProps>`
  cursor: ${getCursorStyle};
  height: 32px;
  position: relative;
  ::-webkit-slider-thumb {
    ${getBaseThumbStyles}
  }
  ::-moz-range-thumb {
    ${getBaseThumbStyles}
  }
  ::-ms-thumb {
    ${getBaseThumbStyles}
  }
`;

export const BarBackground = styled.div<DisabledProp>`
  background-color: ${({ theme, disabled }) => theme.colors[disabled ? "textDisabled" : "inputSecondary"]};
  height: 2px;
  position: absolute;
  top: 18px;
  width: 100%;
`;

export const BarProgress = styled.div<DisabledProp>`
  background-color: ${({ theme }) => theme.colors.primary};
  filter: ${({ disabled }) => (disabled ? "grayscale(100%)" : "none")};
  height: 10px;
  position: absolute;
  top: 18px;
`;
