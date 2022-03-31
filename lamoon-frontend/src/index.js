// external modules
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

// internal modules
import App from "./App";
import reportWebVitals from "./utils/reportWebVitals";
import * as serviceWorker from "./utils/serviceWorker";
import BaseProvider from "contexts/baseContext";

// css
import "./assets/css/index.css";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <BaseProvider>
                <App />
            </BaseProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
