const express = require("express");
const router = express.Router();


const ProductoController = require("../controllers/ProductoController")

router.get("/", ProductoController.getAll)
router.get("/:id", ProductoController.getById)
router.post("/", ProductoController.create)
router.put("/:id", ProductoController.update)
router.delete("/:id", ProductoController.erase_delete)

module.exports=router

