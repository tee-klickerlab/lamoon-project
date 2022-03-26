// External Dependencies
const express = require("express");
const path = require("path");

// Internal Dependencies
const menuRouter = require("./routes/menu");
const reportRouter = require("./routes/report");
const orderRouter = require("./routes/order");
const { MENU_PATH, ORDERS_PATH, REPORT_PATH } = require("./configs/path");

const port = process.env.SERVER_PORT || 3000;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(MENU_PATH, menuRouter);
app.use(REPORT_PATH, reportRouter);
app.use(ORDERS_PATH, orderRouter);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
