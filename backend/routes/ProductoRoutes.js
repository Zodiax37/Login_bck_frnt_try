const express = require("express");
const router = express.Router();


const ProductoController = require("../controllers/ProductoController")
const auth = require('../middlewares/auth')


router.get("/", auth, ProductoController.getAll)
router.get("/:id", auth, ProductoController.getById)
router.post("/", auth, ProductoController.create)
router.put("/:id", auth, ProductoController.update)
router.delete("/:id", auth, ProductoController.erase_delete)

module.exports = router

