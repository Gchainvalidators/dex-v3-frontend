import React from "react";
import { Box, FlexProps } from "../../Box";
import Flex from "../../Box/Flex";
import Dropdown from "../../Dropdown/Dropdown";
import Link from "../../Link/Link";
import { socials } from "../config";
import useMatchBreakpoints from "../../../contexts/MatchBreakpoints/useMatchBreakpoints";

const SocialLinks: React.FC<React.PropsWithChildren<FlexProps>> = ({ ...props }) => {
  const { isMobile } = useMatchBreakpoints();

  return (
    <Flex {...props} data-theme="dark" style={{ gap: '10px' }}>
      {socials.map((social, index) => {
        const iconProps = {
          width: "18px",
          height: "18px",
          color: "black",
          style: { cursor: "pointer" },
        };
        const Icon = social.icon;
        // const mr = index < socials.length - 1 ? (isMobile ? "10px" : "10px") : 0;
        if (social.items) {
          return (
            <Box
              style={{
                width: "28px",
                height: "28px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#E4F1FF",
                borderRadius: "28px",
              }}
            >
              <Dropdown key={social.label} position="top" target={<Icon {...iconProps} />}>
                {social.items.map((item) => (
                  <Link external key={item.label} href={item.href} aria-label={item.label} color="textSubtle">
                    {item.label}
                  </Link>
                ))}
              </Dropdown>
            </Box>
          );
        }
        return (
          <Link
            external
            key={social.label}
            href={social.href}
            aria-label={social.label}
            style={{
              width: "28px",
              height: "28px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#E4F1FF",
              borderRadius: '28px',
            }}
          >
            <Icon {...iconProps} />
          </Link>
        );
      })}
    </Flex>
  );
};

export default React.memo(SocialLinks, () => true);
