// external modules
const { validationResult } = require("express-validator");

// internal modules
const db = require("../database/database");
const {
  createResponse,
  createError,
  isEmpty,
  noMatchingRow,
  noAffectingRow,
} = require("../common/functions");
const { STATUS_SUCCESS, STATUS_ERROR } = require("../configs/static");

addReport = function (req, res) {
  // validate request
  const errorReq = validationResult(req);

  if (!errorReq.isEmpty()) {
    return res.status(400).json(createResponse(STATUS_ERROR, errorReq.array()));
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

  db.query(
    `SELECT * FROM reports WHERE name LIKE ?`,
    `%${req.body.name}%`,
    (err, result) => {
      if (err) {
        return err;
      } else {
        const duplicateNameCount = result.length;
        const isDuplicateName = duplicateNameCount !== 0;

        // get request data
        const dataSet = {
          ...req.body,
          menu_id: req.body.menu_id.toString(),
          name: isDuplicateName
            ? `${req.body.name} (${duplicateNameCount + 1})`
            : req.body.name,
        };

        return (
          // SQL insert new report
          db.query("INSERT INTO reports SET ?", dataSet, (err, result) => {
            if (err) {
              return res.status(400).json(createResponse(STATUS_ERROR, err));
            } else {
              return res
                .status(200)
                .json(createResponse(STATUS_SUCCESS, result));
            }
          })
        );
      }
    }
  );
};

getReportList = function (req, res) {
  // SQL get report list
  db.query("SELECT * FROM reports ORDER BY id asc", (err, result) => {
    if (err) {
      return res.status(400).json(createResponse(STATUS_ERROR, err));
    } else {
      return res.status(200).json(createResponse(STATUS_SUCCESS, result));
    }
  });
};

getReport = function (req, res) {
  // validate request
  const errorReq = validationResult(req);

  if (!errorReq.isEmpty()) {
    return res.status(400).json(createResponse(STATUS_ERROR, errorReq.array()));
  }

  // get request data
  const id = req.params.id;

  // SQL get report by ID
  db.query(
    `SELECT * FROM reports WHERE id = ${id} ORDER BY id asc`,
    (err, result) => {
      if (err) {
        return res.status(400).json(createResponse(STATUS_ERROR, err));
      } else {
        if (isEmpty(result)) {
          return res
            .status(400)
            .json(createResponse(STATUS_ERROR, createError));
        }
        return res.status(200).json(createResponse(STATUS_SUCCESS, result));
      }
    }
  );
};

updateReport = function (req, res) {
  // validate request
  const errorReq = validationResult(req);

  if (!errorReq.isEmpty()) {
    return res.status(400).json(createResponse(STATUS_ERROR, errorReq.array()));
  }

  db.query(
    `SELECT * FROM reports WHERE name LIKE ?`,
    `%${req.body.name}%`,
    (err, result) => {
      if (err) {
        return err;
      } else {
        const duplicateNameCount = result.length;
        const isDuplicateName = duplicateNameCount !== 0;

        // get request data
        const dataSet = {
          ...req.body,
          menu_id: req.body.menu_id.toString(),
          name: isDuplicateName
            ? `${req.body.name} (${duplicateNameCount + 1})`
            : req.body.name,
        };
        const id = req.params.id;

        // console.log(dataSet, result);
        // return res.send("test");

        return (
          // SQL update report by ID
          db.query(
            `UPDATE reports SET ? WHERE id = ${id}`,
            dataSet,
            (err, result) => {
              if (err) {
                return res.status(400).json(createResponse(STATUS_ERROR, err));
              } else {
                if (noMatchingRow(result)) {
                  return res
                    .status(400)
                    .json(createResponse(STATUS_ERROR, createError));
                }
                return res
                  .status(200)
                  .json(createResponse(STATUS_SUCCESS, result));
              }
            }
          )
        );
      }
    }
  );
};

deleteReport = function (req, res) {
  // validate request
  const errorReq = validationResult(req);

  if (!errorReq.isEmpty()) {
    return res.status(400).json(createResponse(STATUS_ERROR, errorReq.array()));
  }

  // get request data
  const id = req.params.id;

  // SQL delete report by ID
  db.query(`DELETE FROM reports WHERE id = ${id}`, (err, result) => {
    if (err) {
      return res.status(400).json(createResponse(STATUS_ERROR, err));
    } else {
      if (noAffectingRow(result)) {
        return res.status(400).json(createResponse(STATUS_ERROR, createError));
      }
      return res.status(200).json(createResponse(STATUS_SUCCESS, result));
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
