const express = require("express")
const router = express.Router();

const CategoriaController = require("../controllers/CategoriaController")

router.get("/", CategoriaController.getAll)
router.get("/:id", CategoriaController.getById)
router.post("/", CategoriaController.create)
router.put("/:id", CategoriaController.update)
router.delete("/:id", CategoriaController.erase_delete)

module.exports=router
