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
const {
  isEmpty,
  isDuplicate,
  noMatchingRow,
  noAffectingRow,
  getArrayLength,
  incrementCount,
} = functions;
const {
  addQuery,
  editQuery,
  deleteQuery,
  getQuery,
  getByIdQuery,
  getDuplicateQuery,
} = queries;

// constant value
const { SUCCESS_CODE, ERROR_CODE, NOT_FOUND_CODE } = RESPONSE_CODE;
const { SUCCESS_STATUS, ERROR_STATUS } = STATUS;
const { REPORT_TABLE } = TABLE;

addReport = function (req, res) {
  // validate request
  const { error, isError } = validateRequest(validationResult(req));

  if (isError) {
    return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, error));
  }

  // check menu by id
  // const totalMenuReq = req.body.menu_id.length;

  // db.query("SELECT * FROM menus WHERE id IN (1,3,8)", (err, result) => {
  //   if (err) {
  //     return res.status(400).json(createResponse(STATUS_ERROR, err));
  //   } else {
  //     const totalMenuQuery = result.length;
  //     const isTotalMenuNotMatch = totalMenuReq !== totalMenuQuery;

  //     if (isTotalMenuNotMatch) {
  //       return res
  //         .status(400)
  //         .json(createResponse(STATUS_ERROR, "Menu id is not match"));
  //     }
  //   }
  // });

  const { body } = req;
  const keywordName = `%${body.name}%`;

  db.query(getDuplicateQuery(REPORT_TABLE), keywordName, (err, result) => {
    if (err) {
      return err;
    } else {
      const menuId = body.menu_id.toString();
      const duplicateNameCount = getArrayLength(result);

      // get request data
      const dataSet = {
        ...body,
        menu_id: menuId,
        name: isDuplicate(duplicateNameCount)
          ? `${body.name} (${incrementCount(duplicateNameCount)})`
          : body.name,
      };

      return (
        // SQL insert new report
        db.query(addQuery(REPORT_TABLE), dataSet, (err, result) => {
          if (err) {
            return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, err));
          } else {
            return createResponse(
              res,
              SUCCESS_CODE,
              payload(SUCCESS_STATUS, result)
            );
          }
        })
      );
    }
  });
};

getReportList = function (req, res) {
  // SQL get report list
  db.query(getQuery(REPORT_TABLE), (err, result) => {
    if (err) {
      return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, err));
    } else {
      return createResponse(res, SUCCESS_CODE, payload(SUCCESS_STATUS, result));
    }
  });
};

getReport = function (req, res) {
  // validate request
  const { error, isError } = validateRequest(validationResult(req));

  if (isError) {
    return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, error));
  }

  // get request data
  const id = req.params.id;

  // SQL get report by ID
  db.query(getByIdQuery(REPORT_TABLE), id, (err, result) => {
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

updateReport = function (req, res) {
  // validate request
  const { error, isError } = validateRequest(validationResult(req));

  if (isError) {
    return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, error));
  }

  const { body, params } = req;
  const keywordName = `%${body.name}%`;

  db.query(getDuplicateQuery(REPORT_TABLE), keywordName, (err, result) => {
    if (err) {
      return err;
    } else {
      const menuId = body.menu_id.toString();
      const duplicateNameCount = getArrayLength(result);

      // get request data
      const id = params.id;
      const dataSet = {
        ...body,
        menu_id: menuId,
        name: isDuplicate(duplicateNameCount)
          ? `${body.name} (${incrementCount(duplicateNameCount)})`
          : body.name,
      };

      return (
        // SQL update report by ID
        db.query(editQuery(REPORT_TABLE), [dataSet, id], (err, result) => {
          if (err) {
            return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, err));
          } else {
            if (noMatchingRow(result)) {
              return createResponse(res, NOT_FOUND_CODE, payload(ERROR_STATUS));
            }
            return createResponse(
              res,
              SUCCESS_CODE,
              payload(SUCCESS_STATUS, result)
            );
          }
        })
      );
    }
  });
};

deleteReport = function (req, res) {
  // validate request
  const { error, isError } = validateRequest(validationResult(req));

  if (isError) {
    return createResponse(res, ERROR_CODE, payload(ERROR_STATUS, error));
  }

  // get request data
  const id = req.params.id;

  // SQL delete report by ID
  db.query(deleteQuery(REPORT_TABLE), id, (err, result) => {
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
