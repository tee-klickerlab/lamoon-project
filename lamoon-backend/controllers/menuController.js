// external modules
const { validationResult } = require("express-validator");

// internal modules
const db = require("../database/database");
const functions = require("../common/functions");
const responses = require("../common/response");
const queries = require("../common/queries");
const statics = require("../configs/static");
const validators = require("../common/validators");

// destructuring modules
const { STATUS, TABLE, RESPONSE_CODE } = statics;
const { validateRequest } = validators;
const { payload, createResponse } = responses;
const { isEmpty, noMatchingRow, noAffectingRow } = functions;
const { getQuery, getByIdQuery, addQuery, editQuery, deleteQuery } = queries;

// constant value
const { SUCCESS_CODE, ERROR_CODE, NOT_FOUND_CODE } = RESPONSE_CODE;
const { SUCCESS_STATUS, ERROR_STATUS } = STATUS;
const { MENU_TABLE } = TABLE;

addMenu = function (req, res) {
  // validate request
  const { error, isError } = validateRequest(validationResult(req));

  if (isError) {
    return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, error));
  }

  // get request data
  const dataSet = req.body;

  // SQL insert new menu
  db.query(addQuery(MENU_TABLE), dataSet, (err, result) => {
    if (err) {
      return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, err));
    } else {
      return createResponse(res, SUCCESS_CODE, payload(SUCCESS_STATUS, result));
    }
  });
};

getMenuList = function (req, res) {
  // SQL get menu list
  db.query(getQuery(MENU_TABLE), (err, result) => {
    if (err) {
      return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, err));
    } else {
      return createResponse(res, SUCCESS_CODE, payload(SUCCESS_STATUS, result));
    }
  });
};

getMenuById = function (req, res) {
  // validate request
  const { error, isError } = validateRequest(validationResult(req));

  if (isError) {
    return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, error));
  }

  // get request data
  const id = req.params.id;

  // SQL get menu by ID
  db.query(getByIdQuery(MENU_TABLE), id, (err, result) => {
    if (err) {
      return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, err));
    } else {
      if (isEmpty(result)) {
        return createResponse(res, NOT_FOUND_CODE, payload(ERROR_STATUS));
      }
      return createResponse(res, SUCCESS_CODE, payload(SUCCESS_STATUS, result));
    }
  });
};

updateMenu = function (req, res) {
  // validate request
  const { error, isError } = validateRequest(validationResult(req));

  if (isError) {
    return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, error));
  }

  // get request data
  const dataSet = req.body;
  const id = req.params.id;

  // SQL update menu by ID
  db.query(editQuery(MENU_TABLE), [dataSet, id], (err, result) => {
    if (err) {
      return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, err));
    } else {
      if (noMatchingRow(result)) {
        return createResponse(res, NOT_FOUND_CODE, payload(ERROR_STATUS));
      }
      return createResponse(res, SUCCESS_CODE, payload(SUCCESS_STATUS, result));
    }
  });
};

deleteMenu = function (req, res) {
  // validate request
  const { error, isError } = validateRequest(validationResult(req));

  if (isError) {
    return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, error));
  }

  // get request data
  const id = req.params.id;

  // SQL delete menu by ID
  db.query(deleteQuery(MENU_TABLE), id, (err, result) => {
    if (err) {
      return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, err));
    } else {
      if (noAffectingRow(result)) {
        return createResponse(res, NOT_FOUND_CODE, payload(ERROR_STATUS));
      }
      return createResponse(res, SUCCESS_CODE, payload(SUCCESS_STATUS, result));
    }
  });
};

module.exports = { addMenu, getMenuList, getMenuById, updateMenu, deleteMenu };
