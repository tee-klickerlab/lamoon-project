// external modules
const express = require("express");
const router = express.Router();

// internal modules
const validator = require("../common/validators");
const controller = require("../controllers/reportController");

const {
  addReport: postValidator,
  reqParams: paramValidator,
  updateReport: updateValidator,
} = validator;
const { addReport, getReportList, getReport, updateReport, deleteReport } =
  controller;

router.get("/", getReportList);

router.get("/:id", paramValidator, getReport);

router.post("/", postValidator, addReport);

router.put("/:id", updateValidator, updateReport);

router.delete("/:id", paramValidator, deleteReport);

module.exports = router;
