import React from "react";
import { TextField, InputAdornment } from "@material-ui/core";

export const Textfield = ({
  text,
  setText,
  textSize = "2rem",
  placeholder = "",
  icon = null,
}) => (
  <TextField
    value={text}
    onChange={(e) => setText(e.target.value)}
    placeholder={placeholder}
    InputProps={{
      style: {
        fontSize: textSize,
        color: "#888888",
      },
      startAdornment: icon ? (
        <InputAdornment position="start">{icon}</InputAdornment>
      ) : null,
    }}
  />
);
