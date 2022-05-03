// external modules
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

// internal modules
import App from "./App";
import reportWebVitals from "./utils/reportWebVitals";
import * as serviceWorker from "./utils/serviceWorker";
import BaseProvider from "contexts/baseContext";
import store from "reduxes";

// css
import "./assets/css/index.css";

ReactDOM.render(
  <BrowserRouter>
    <BaseProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </BaseProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
