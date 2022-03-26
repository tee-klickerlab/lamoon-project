import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { capitalize } from "lodash";

import { config } from "config";
import colors from "assets/scss/_themes-vars.module.scss";

const ApplicationName = ({ children, ...other }) => (
  <div className="application-name" {...other}>
    {children}
  </div>
);

const LamoonAppBar = styled(AppBar)({
  backgroundColor: colors.appBar,
});

export default function LamoonApplicationBar() {
  const APPLICATION_NAME = capitalize(config.appName);

  return (
    <LamoonAppBar>
      <Toolbar>
        <ApplicationName>{APPLICATION_NAME}</ApplicationName>
      </Toolbar>
    </LamoonAppBar>
  );
}
