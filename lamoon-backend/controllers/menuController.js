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
const { MENU_TABLE, MENU_PRICE_TABLE } = TABLE;

addMenu = function (req, res) {
  // validate request
  const { error, isError } = validateRequest(validationResult(req));

  if (isError) {
    return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, error));
  }

  // get request data
  const { name, cost, sale } = req.body;
  const dataSetMenus = {
    MenuName: name,
    IsActive: true,
  };
  const dataSetMenuPrices = (_id) => ({
    Cost: cost,
    Sale: sale,
    IsActive: true,
    MenuID: _id,
  });

  const menuQuery = `INSERT INTO ${MENU_TABLE} SET ?`;

  const menuPriceQuery = `INSERT INTO ${MENU_PRICE_TABLE} SET ?`;

  // SQL insert new menu
  db.query(menuQuery, dataSetMenus, (err, result) => {
    if (err) {
      return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, err));
    } else {
      db.query(
        menuPriceQuery,
        dataSetMenuPrices(result.insertId),
        (err, result) => {
          if (err) {
            return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, err));
          } else {
            return createResponse(
              res,
              SUCCESS_CODE,
              payload(SUCCESS_STATUS, result)
            );
          }
        }
      );
    }
  });
};

getMenuList = function (req, res) {
  // SQL get menu list
  const query = `SELECT * FROM ${MENU_TABLE} JOIN ${MENU_PRICE_TABLE} ON ${MENU_TABLE}.MenuID = ${MENU_PRICE_TABLE}.MenuID AND ${MENU_PRICE_TABLE}.IsActive = 1`;

  db.query(query, (err, result) => {
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

  const query = `
    SELECT * 
    FROM ${MENU_TABLE} 
    JOIN ${MENU_PRICE_TABLE} 
    ON ${MENU_TABLE}.MenuID = ${MENU_PRICE_TABLE}.MenuID AND ${MENU_PRICE_TABLE}.IsActive = 1
    WHERE ${MENU_TABLE}.MenuID = ?
    `;

  // SQL get menu by ID
  db.query(query, id, (err, result) => {
    if (err) {
      return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, err));
    } else {
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
  const { name, cost, sale } = req.body;
  const id = req.params.id;

  const updateQuery = `UPDATE ${MENU_TABLE} JOIN ${MENU_PRICE_TABLE} ON ${MENU_TABLE}.MenuID = ${MENU_PRICE_TABLE}.MenuID AND ${MENU_PRICE_TABLE}.IsActive = 1 AND ${MENU_TABLE}.MenuID = ${id} SET MenuName = "${name}", ${MENU_PRICE_TABLE}.IsActive = false`;
  const newPriceQuery = `INSERT INTO ${MENU_PRICE_TABLE} SET ?`;

  const dataSet = {
    Cost: cost,
    Sale: sale,
    IsActive: true,
    MenuID: id,
  };

  // SQL update menu by ID
  db.query(updateQuery, (err, result) => {
    if (err) {
      return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, err));
    } else {
      db.query(newPriceQuery, dataSet, (err, result) => {
        if (err) {
          return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, err));
        } else {
          return createResponse(
            res,
            SUCCESS_CODE,
            payload(SUCCESS_STATUS, result)
          );
        }
      });
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

  const query = `UPDATE ${MENU_TABLE} JOIN ${MENU_PRICE_TABLE} ON ${MENU_TABLE}.MenuID = ${MENU_PRICE_TABLE}.MenuID AND ${MENU_PRICE_TABLE}.IsActive = 1 AND ${MENU_TABLE}.MenuID = ${id} SET ${MENU_TABLE}.IsActive = false, ${MENU_PRICE_TABLE}.IsActive = false`;

  // SQL delete menu by ID
  db.query(query, (err, result) => {
    if (err) {
      return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, err));
    } else {
      return createResponse(res, SUCCESS_CODE, payload(SUCCESS_STATUS, result));
    }
  });
};

module.exports = { addMenu, getMenuList, getMenuById, updateMenu, deleteMenu };
