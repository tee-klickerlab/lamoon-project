// external modules
const express = require("express");
const router = express.Router();

// internal modules
const validator = require("../common/validators");
const controller = require("../controllers/orderController");

// destructuring modules
const { addOrderValidator, updateOrderValidator, paramsValidator } = validator;
const { addOrder, updateOrder, deleteOrder } = controller;

router.post("/", addOrderValidator, addOrder);

router.put("/:id", updateOrderValidator, updateOrder);

router.delete("/:id", paramsValidator, deleteOrder);

module.exports = router;
