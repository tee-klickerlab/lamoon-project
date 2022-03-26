import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  BottomNavigation,
  BottomNavigationAction as BottomNavigationActionRaw,
} from "@mui/material";
import CalculateIcon from "@mui/icons-material/Calculate";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import { routes } from "config";

const BottomNavigationAction = styled(BottomNavigationActionRaw)({
  "& .MuiBottomNavigationAction-label": {
    fontFamily: "inherit",
  },
  fontFamily: "inherit",
  maxWidth: "none",
});

export default function LamoonNavigationBar(props) {
  const [navigationState, setNavigation] = useState(1);
  const { statistic, calculate, management } = routes;

  const navigationList = [
    {
      to: statistic,
      label: "สถิติ",
      icon: <EqualizerIcon />,
    },
    {
      to: calculate,
      label: "คำนวณ",
      icon: <CalculateIcon />,
    },
    {
      to: management,
      label: "จัดการเมนู",
      icon: <MenuBookIcon />,
    },
  ];

  return (
    <BottomNavigation
      sx={{ position: "fixed", bottom: 0, width: "100%" }}
      showLabels
      value={navigationState}
      onChange={(event, newValue) => {
        setNavigation(newValue);
      }}
    >
      {navigationList.map((row, index) => {
        const generateKey = `navigate-${index}`;
        // for 1st phase
        const disableButton = row.label === "สถิติ";

        return (
          <BottomNavigationAction
            disabled={disableButton}
            key={generateKey}
            component={Link}
            {...row}
          />
        );
      })}
    </BottomNavigation>
  );
}
