// external modules
const express = require("express");
const router = express.Router();

// internal modules
const validator = require("../common/validators");
const controller = require("../controllers/menuController");

// destructuring modules
const { addMenuValidator, updateMenuValidator, paramsValidator } = validator;
const { addMenu, getMenuList, getMenuById, updateMenu, deleteMenu } =
  controller;

router.get("/", getMenuList);

router.get("/:id", paramsValidator, getMenuById);

router.post("/", addMenuValidator, addMenu);

router.put("/:id", updateMenuValidator, updateMenu);

router.delete("/:id", paramsValidator, deleteMenu);

module.exports = router;
