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
const { noAffectingRow } = functions;
const { deleteQuery } = queries;

// constant value
const { SUCCESS_CODE, ERROR_CODE, NOT_FOUND_CODE } = RESPONSE_CODE;
const { SUCCESS_STATUS, ERROR_STATUS } = STATUS;
const { REPORT_TABLE, ORDER_TABLE, ORDER_ITEM_TABLE } = TABLE;

addReport = function (req, res) {
  // validate request
  const { error, isError } = validateRequest(validationResult(req));

  if (isError) {
    return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, error));
  }

  let dataSet = {
    ReportName: req.body.name,
  };

  let query = `INSERT INTO ${REPORT_TABLE} SET ?`;

  db.query(query, dataSet, (err, result) => {
    if (err) {
      return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, err));
    } else {
      return createResponse(res, SUCCESS_CODE, payload(SUCCESS_STATUS, result));
    }
  });

  //   example duplicate ReportName
  //   {
  //     "status": "error",
  //     "payload": {
  //         "code": "ER_DUP_ENTRY",
  //         "errno": 1062,
  //         "sqlMessage": "Duplicate entry '01/08/2538' for key 'reports.ReportName_UNIQUE'",
  //         "sqlState": "23000",
  //         "index": 0,
  //         "sql": "INSERT INTO Reports SET `ReportName` = '01/08/2538'"
  //     }
  // }
};

getReportList = function (req, res) {
  let query = `SELECT * FROM ${REPORT_TABLE} ORDER BY ReportID ASC`;

  // SQL get report list
  db.query(query, (err, result) => {
    if (err) {
      return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, err));
    } else {
      return createResponse(res, SUCCESS_CODE, payload(SUCCESS_STATUS, result));
    }
  });
};

const formatResult = (result) => {
  let { ReportID, ReportName, Total } = result[0];
  let formatted = {
    ReportID,
    ReportName,
    Total,
    Orders: [],
  };

  result.forEach((row, index) => {
    let {
      OrderID,
      OrderName,
      Remark,
      MenuID,
      MenuPriceID,
      Amount,
      IsDone,
      MenuName,
      Cost,
      Sale,
    } = row;
    let orderIndex = formatted.Orders.findIndex(
      (order) => order.OrderID === OrderID
    );

    if (orderIndex > -1) {
      formatted.Orders[orderIndex].Menus.push({
        MenuID,
        MenuName,
        MenuPriceID,
        Cost,
        Sale,
        Amount,
        IsDone,
      });
    } else {
      formatted.Orders.push({
        OrderID,
        OrderName,
        Remark,
        Menus: [{ MenuID, MenuName, MenuPriceID, Cost, Sale, Amount, IsDone }],
      });
    }
  });

  return formatted;
};

getReport = function (req, res) {
  // validate request
  const { error, isError } = validateRequest(validationResult(req));

  if (isError) {
    return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, error));
  }

  // get request data
  const id = req.params.id;

  let existQuery = `SELECT * FROM ${REPORT_TABLE} WHERE ReportID = ${id}`;

  let joinQuery = `
    SELECT r.ReportID, r.ReportName, r.Total, o.OrderID, o.OrderName, o.ReportID, o.Remark, oi.*, m.MenuName, mp.Cost, mp.Sale
    FROM Reports r
    JOIN Orders o ON r.ReportID = ${id} AND r.ReportID = o.ReportID AND o.IsActive = 1
    JOIN OrderItems oi ON oi.OrderID = o.OrderID AND oi.IsActive = 1
    JOIN Menus m ON oi.MenuID = m.MenuID
    JOIN MenuPrices mp ON mp.MenuPriceID = oi.MenuPriceID
	  ORDER BY o.OrderName;
  `;

  // SQL get report by ID
  db.query(existQuery, (err, result) => {
    if (err) {
      return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, err));
    } else {
      if (result.length > 0) {
        db.query(joinQuery, (_err, _result) => {
          if (_err) {
            return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, _err));
          } else {
            if (_result.length > 0) {
              return createResponse(
                res,
                SUCCESS_CODE,
                payload(SUCCESS_STATUS, formatResult(_result))
              );
            } else {
              return createResponse(
                res,
                SUCCESS_CODE,
                payload(SUCCESS_STATUS, result)
              );
            }
          }
        });
      } else {
        return createResponse(
          res,
          ERROR_CODE,
          payload(ERROR_STATUS, "error: report id is not exist")
        );
      }
    }
  });
};

updateReport = function (req, res) {
  // validate request
  const { error, isError } = validateRequest(validationResult(req));

  if (isError) {
    return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, error));
  }

  const { name: ReportName, total: Total } = req.body;
  const id = req.params.id;
  let dataSet = {
    ReportName,
    Total,
  };

  let query = `UPDATE ${REPORT_TABLE} SET ? WHERE ReportID = ?`;

  db.query(query, [dataSet, id], (err, result) => {
    if (err) {
      createResponse(res, ERROR_CODE, payload(ERROR_STATUS, err));
    } else {
      createResponse(res, SUCCESS_CODE, payload(SUCCESS_STATUS, result));
    }
  });
};

deleteReport = function (req, res) {
  // validate request
  const { error, isError } = validateRequest(validationResult(req));

  if (isError) {
    return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, error));
  }

  let query = `UPDATE Reports r
             LEFT JOIN Orders o ON r.ReportID = o.ReportID
             LEFT JOIN OrderItems oi ON o.OrderID = oi.OrderID
             SET r.IsActive = 0, o.IsActive = 0, oi.IsActive = 0
             WHERE r.ReportID = ?`;

  // get request data
  const id = req.params.id;

  // SQL delete report by ID
  db.query(query, id, (err, result) => {
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

module.exports = {
  addReport,
  getReportList,
  getReport,
  updateReport,
  deleteReport,
};
