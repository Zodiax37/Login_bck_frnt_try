const express = require("express");
const router = express.Router();


const ProveedorController = require("../controllers/ProveedorController")

router.get("/", ProveedorController.getAll)
router.get("/:id", ProveedorController.getById)
router.post("/", ProveedorController.create)
router.put("/:id", ProveedorController.update)
router.delete("/:id", ProveedorController.inactive)

module.exports=router

