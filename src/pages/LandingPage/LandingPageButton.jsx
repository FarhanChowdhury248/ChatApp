import React from "react";
import { Button as MuiButton } from "@material-ui/core";

export const LandingPageButton = ({ text = "", ...props }) => (
  <MuiButton
    style={{
      fontSize: "1.5rem",
      background: props.disabled
        ? "#A1A1A1"
        : "linear-gradient(90deg, #09D3DF 0%, rgba(255, 255, 255, 0) 100%), #EC0DFC",
      padding: "0.5rem 2rem",
      width: "10rem",
      borderRadius: "1.5rem",
      color: "white",
      fontFamily: "Lato",
      fontWeight: "normal",
      textTransform: "none",
      letterSpacing: "0.2rem",
    }}
    {...props}
  >
    {text}
  </MuiButton>
);
