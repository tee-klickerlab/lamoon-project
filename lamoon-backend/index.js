// External Dependencies
const express = require("express");
const path = require("path");

// Internal Dependencies
const menusRouter = require("./routes/menu");
const { MENU_PATH, ORDERS_PATH, REPORT_PATH } = require("./configs/path");

const port = process.env.SERVER_PORT || 3000;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(MENU_PATH, menusRouter);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
