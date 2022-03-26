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
const { ORDER_TABLE, ORDER_ITEM_TABLE } = TABLE;

addOrder = function (req, res) {
  // validate request
  const { error, isError } = validateRequest(validationResult(req));

  if (isError) {
    return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, error));
  }

  // get request data
  const { name, reportID, remark, menuItems } = req.body;
  let dataSet = {
    OrderName: name,
    ReportID: reportID,
  };

  if (remark) dataSet = { ...dataSet, Remark: remark };

  const createData = (orderID) => {
    let menuSet = "";
    let length = menuItems.length;

    for (i = 0; i < menuItems.length; i++) {
      let row = menuItems[i];

      menuSet = menuSet.concat(
        `(${orderID}, ${row.menuID}, ${row.menuPriceID}, ${row.amount})`
      );

      if (i + 1 < length) menuSet = menuSet.concat(", ");
    }

    return menuSet;
  };

  const orderQuery = `INSERT INTO ${ORDER_TABLE} SET ?`;

  const orderItemQuery = (orderID) => `INSERT INTO ${ORDER_ITEM_TABLE}
                                            (OrderID, MenuID, MenuPriceID, Amount)
                                       VALUES
                                            ${createData(orderID)}`;

  // SQL insert new menu
  db.query(orderQuery, dataSet, (err, result) => {
    if (err) {
      return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, err));
    } else {
      db.query(orderItemQuery(result.insertId), (err, result) => {
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

updateOrder = function (req, res) {
  // validate request
  const { error, isError } = validateRequest(validationResult(req));

  if (isError) {
    return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, error));
  }

  // get request data
  const { name, remark, menuItems, updateDone, isDone } = req.body;
  const id = req.params.id; // updateDone = true -> id = orderItemID, updateDone = false -> id = orderID
  let sql;

  if (updateDone) {
    sql = `UPDATE OrderItems oi SET oi.IsDone = ${isDone} WHERE oi.OrderItemID = ${id}`;
  } else {
    let cases = "";
    let where = "";

    for (i = 0; i < menuItems.length; i++) {
      let row = menuItems[i];
      cases = cases + `when oi.MenuID = ${row.menuID} then ${row.amount}\n`;
      where =
        where + `'${row.menuID}' ${i + 1 === menuItems.length ? "" : "+"}`;
    }

    sql = `UPDATE Orders o
                JOIN OrderItems oi 
                ON o.OrderID = oi.OrderID AND o.OrderID = ${id}
                SET 
                o.OrderName = "${name}",
                o.Remark = "${remark}",
                oi.Amount = (
                    case ${cases} end
                )`;
  }

  // SQL update menu by ID
  db.query(sql, (err, result) => {
    if (err) {
      return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, err));
    } else {
      return createResponse(res, SUCCESS_CODE, payload(SUCCESS_STATUS, result));
    }
  });
};

deleteOrder = function (req, res) {
  // validate request
  const { error, isError } = validateRequest(validationResult(req));

  if (isError) {
    return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, error));
  }

  // get request data
  const id = req.params.id;

  const query = `UPDATE Orders o 
                LEFT JOIN OrderItems oi ON o.OrderID = oi.OrderID
                SET o.IsActive = false, oi.IsActive = false
                WHERE o.OrderID = ${id}`;

  // SQL delete menu by ID
  db.query(query, (err, result) => {
    if (err) {
      return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, err));
    } else {
      return createResponse(res, SUCCESS_CODE, payload(SUCCESS_STATUS, result));
    }
  });
};

module.exports = { addOrder, updateOrder, deleteOrder };
