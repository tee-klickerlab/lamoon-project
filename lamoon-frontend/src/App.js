// external modules
import React from "react";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

// internal modules
import NavigationScroll from "layouts/NavigationScroll";
import Routes from "./routes";

// css
import "./assets/css/App.css";
import "./assets/scss/App.scss";

function App() {
    return (
        <StyledEngineProvider injectFirst>
            <CssBaseline />
            <NavigationScroll>
                <Routes />
            </NavigationScroll>
        </StyledEngineProvider>
    );
}

export default App;
