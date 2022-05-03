// external modules
const express = require("express");
const router = express.Router();

// internal modules
const validator = require("../common/validators");
const controller = require("../controllers/reportController");

// destructuring modules
const { addReportValidator, updateReportValidator, paramsValidator } =
  validator;
const { addReport, getReportList, getReport, updateReport, deleteReport } =
  controller;

router.get("/", getReportList);

router.get("/:id", paramsValidator, getReport);

router.post("/", addReportValidator, addReport);

router.put("/:id", updateReportValidator, updateReport);

router.delete("/:id", paramsValidator, deleteReport);

module.exports = router;
