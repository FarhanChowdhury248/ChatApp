import React from "react";
import { Link as RouterLink } from "react-router-dom";

export const Link = ({ children, ...props }) => (
  <RouterLink style={{ textDecoration: "none" }} {...props}>
    {children}
  </RouterLink>
);
