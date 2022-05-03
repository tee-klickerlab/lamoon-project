import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  BottomNavigation,
  BottomNavigationAction as BottomNavigationActionRaw,
} from "@mui/material";
// import CalculateIcon from "@mui/icons-material/Calculate";
import EqualizerIcon from "@mui/icons-material/Equalizer";
// import MenuBookIcon from "@mui/icons-material/MenuBook";

import MenuIcon from "assets/icons/menu";
import MenuActiveIcon from "assets/icons/menu2";
import CalculateIcon from "assets/icons/dolar";

import { routes } from "config";

import colors from "assets/scss/_themes-vars.module.scss";

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
      icon: (
        <CalculateIcon
          fill={navigationState === 1 ? colors.appBar : colors.textLight}
        />
      ),
    },
    {
      to: management,
      label: "จัดการเมนู",
      icon: navigationState === 2 ? <MenuActiveIcon /> : <MenuIcon />,
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
            style={{
              color:
                navigationState === index ? colors.appBar : colors.textMain,
            }}
            key={generateKey}
            component={Link}
            {...row}
          />
        );
      })}
    </BottomNavigation>
  );
}
