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

addMenu = function (req, res) {
  // validate request
  const errorReq = validationResult(req);

  if (!errorReq.isEmpty()) {
    return res.status(400).json(createResponse(STATUS_ERROR, errorReq.array()));
  }

  // get request data
  const dataSet = req.body;

  // SQL insert new menu
  db.query("INSERT INTO menus SET ?", dataSet, (err, result) => {
    if (err) {
      return res.status(400).json(createResponse(STATUS_ERROR, err));
    } else {
      return res.status(200).json(createResponse(STATUS_SUCCESS, result));
    }
  });
};

getMenuList = function (req, res) {
  // SQL get menu list
  db.query("SELECT * FROM menus ORDER BY id asc", (err, result) => {
    if (err) {
      return res.status(400).json(createResponse(STATUS_ERROR, err));
    } else {
      return res.status(200).json(createResponse(STATUS_SUCCESS, result));
    }
  });
};

getMenuById = function (req, res) {
  // validate request
  const errorReq = validationResult(req);

  if (!errorReq.isEmpty()) {
    return res.status(400).json(createResponse(STATUS_ERROR, errorReq.array()));
  }

  // get request data
  const id = req.params.id;

  // SQL get menu by ID
  db.query(
    `SELECT * FROM menus WHERE id = ${id} ORDER BY id asc`,
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

updateMenu = function (req, res) {
  // validate request
  const errorReq = validationResult(req);

  if (!errorReq.isEmpty()) {
    return res.status(400).json(createResponse(STATUS_ERROR, errorReq.array()));
  }

  // get request data
  const dataSet = req.body;
  const id = req.params.id;

  // SQL update menu by ID
  db.query(`UPDATE menus SET ? WHERE id = ${id}`, dataSet, (err, result) => {
    if (err) {
      return res.status(400).json(createResponse(STATUS_ERROR, err));
    } else {
      if (noMatchingRow(result)) {
        return res.status(400).json(createResponse(STATUS_ERROR, createError));
      }
      return res.status(200).json(createResponse(STATUS_SUCCESS, result));
    }
  });
};

deleteMenu = function (req, res) {
  // validate request
  const errorReq = validationResult(req);

  if (!errorReq.isEmpty()) {
    return res.status(400).json(createResponse(STATUS_ERROR, errorReq.array()));
  }

  // get request data
  const id = req.params.id;

  // SQL delete menu by ID
  db.query(`DELETE FROM menus WHERE id = ${id}`, (err, result) => {
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

module.exports = { addMenu, getMenuList, getMenuById, updateMenu, deleteMenu };
