const { check, param } = require("express-validator");

const paramsValidator = [
  // validate params, id is required, id must be number type.
  param("id").trim().isNumeric().withMessage("id must be a number"),
];

const addMenuValidator = [
  // menu is required, length is less than 100 characters.
  check("name").trim().notEmpty().isLength({ max: 100 }),
  // cost is required, cost must be number type.
  check("cost").trim().isNumeric().withMessage("cost must be a number"),
  // sale is required, cost must be number type.
  check("sale").trim().isNumeric().withMessage("sale must be a number"),
];

const updateMenuValidator = addMenuValidator.concat(paramsValidator);

const addReportValidator = [
  // report is required, length is less than 100 characters.
  check("name").trim().notEmpty().isLength({ max: 100 }),
];

const updateReportValidator = [
  // menu is required, length is less than 100 characters.
  check("name").trim().notEmpty().isLength({ max: 100 }),
  // total is required, total must be number type.
  check("total").trim().isNumeric().withMessage("total must be a number"),
].concat(paramsValidator);

const addOrderValidator = [
  // order is required, length is below 100 characters.
  check("name").trim().notEmpty().isLength({ max: 100 }),
  // report ID is required, report ID must be number type.
  check("reportID").trim().isNumeric().withMessage("reportID must be a number"),
  // menuItem is required
  check("menuItems").notEmpty(),
];

const updateOrderValidator = [...paramsValidator];

const validateRequest = (validateResult) => ({
  error: validateResult.array(),
  isError: !validateResult.isEmpty(),
});

module.exports = {
  paramsValidator,
  addMenuValidator,
  updateMenuValidator,
  addReportValidator,
  updateReportValidator,
  addOrderValidator,
  updateOrderValidator,
  validateRequest,
};
