// external modules
const express = require("express");
const router = express.Router();

// internal modules
const validator = require("../common/validators");
const controller = require("../controllers/menuController");

const {
  addMenu: addValidator,
  updateMenu: updateValidator,
  reqParams: paramValidator,
} = validator;
const { addMenu, getMenuList, getMenuById, updateMenu, deleteMenu } =
  controller;

router.get("/", getMenuList);

router.get("/:id", paramValidator, getMenuById);

router.post("/", addValidator, addMenu);

router.put("/:id", updateValidator, updateMenu);

router.delete("/:id", paramValidator, (s = deleteMenu));

module.exports = router;
