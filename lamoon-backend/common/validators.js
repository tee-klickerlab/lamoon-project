const { check, param } = require("express-validator");

const addMenu = [
  // menu is required, length is less than 100 characters.
  check("menu").trim().notEmpty().isLength({ max: 100 }),
  // cost is required, cost must be number type.
  check("cost").trim().isNumeric().withMessage("cost must be a number"),
  // sale is required, cost must be number type.
  check("sale").trim().isNumeric().withMessage("sale must be a number"),
];

const updateMenu = [
  // menu is required, length is less than 100 characters.
  check("menu").trim().notEmpty().isLength({ max: 100 }),
  // cost is required, cost must be number type.
  check("cost").trim().isNumeric().withMessage("cost must be a number"),
  // sale is required, sale must be number type.
  check("sale").trim().isNumeric().withMessage("sale must be a number"),
  // validate params, id is required, id must be number type.
  param("id").trim().isNumeric().withMessage("sale must be a number"),
];

const reqParams = [
  // validate params, id is required, id must be number type.
  param("id").trim().isNumeric().withMessage("sale must be a number"),
];

module.exports = { addMenu, updateMenu, reqParams };
