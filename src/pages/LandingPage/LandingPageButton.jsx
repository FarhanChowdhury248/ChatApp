import React from "react";
import { Button as MuiButton } from "@material-ui/core";

export const LandingPageButton = ({ text = "", onClick = () => {} }) => (
  <MuiButton
    onClick={onClick}
    style={{
      fontSize: "1.5rem",
      background:
        "linear-gradient(90deg, #09D3DF 0%, rgba(255, 255, 255, 0) 100%), #EC0DFC",
      padding: "0.5rem 2rem",
      width: "10rem",
      borderRadius: "1.5rem",
      color: "white",
      fontFamily: "Lato",
      fontWeight: "normal",
      textTransform: "none",
      letterSpacing: "0.2rem",
    }}
  >
    {text}
  </MuiButton>
);
