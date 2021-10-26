const { check, param } = require("express-validator");

const paramsValidator = [
  // validate params, id is required, id must be number type.
  param("id").trim().isNumeric().withMessage("id must be a number"),
];

const addMenuValidator = [
  // menu is required, length is less than 100 characters.
  check("menu").trim().notEmpty().isLength({ max: 100 }),
  // cost is required, cost must be number type.
  check("cost").trim().isNumeric().withMessage("cost must be a number"),
  // sale is required, cost must be number type.
  check("sale").trim().isNumeric().withMessage("sale must be a number"),
];

const updateMenuValidator = addMenuValidator.concat(paramsValidator);

const addReportValidator = [
  // menu is required, length is less than 100 characters.
  check("name").trim().notEmpty().isLength({ max: 100 }),
  // sum_cost is required, sum_cost must be number type.
  check("sum_cost").trim().isNumeric().withMessage("sum_cost must be a number"),
  // sum_sale is required, sum_sale must be number type.
  check("sum_sale").trim().isNumeric().withMessage("sum_sale must be a number"),
  // menu_id is required, menu_id must be array of number.
  check("menu_id.*").isNumeric().withMessage("menu_id must be array of number"),
];

const updateReportValidator = addReportValidator.concat(paramsValidator);

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
  validateRequest,
};
