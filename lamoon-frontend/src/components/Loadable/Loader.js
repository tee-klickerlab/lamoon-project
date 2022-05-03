// external modules
import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

// styles component
const LoaderWrapper = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1301,
  width: "100%",
});

export default function Loader() {
  return (
    <LoaderWrapper>
      <LinearProgress color="primary" />
    </LoaderWrapper>
  );
}
