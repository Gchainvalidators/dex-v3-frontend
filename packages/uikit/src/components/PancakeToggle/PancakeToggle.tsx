import React from "react";
import { PancakeStack, PancakeInput, PancakeLabel } from "./StyledPancakeToggle";
import { PancakeToggleProps, scales } from "./types";
import { Titi } from "../Titi";

const PancakeToggle: React.FC<React.PropsWithChildren<PancakeToggleProps>> = ({
  checked,
  scale = scales.LG,
  ...props
}) => (
  <PancakeStack scale={scale}>
    <PancakeInput id={props.id || "pancake-toggle"} scale={scale} type="checkbox" checked={checked} {...props} />
    <PancakeLabel scale={scale} checked={checked} htmlFor={props.id || "pancake-toggle"}>
      <div className="pancakes">
        <Titi width={'32px'} height={'32px'} />
        {/* <div className="pancake" />
        <div className="pancake" />
        <div className="pancake" />
        <div className="butter" /> */}
      </div>
    </PancakeLabel>
  </PancakeStack>
);

export default PancakeToggle;
