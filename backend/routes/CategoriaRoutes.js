const express = require("express")
const router = express.Router();

const auth = require("../middlewares/auth")

const CategoriaController = require("../controllers/CategoriaController")

router.get("/", auth, CategoriaController.getAll)
router.get("/:id", auth, CategoriaController.getById)
router.post("/", auth, CategoriaController.create)
router.put("/:id", auth, CategoriaController.update)
router.delete("/:id", auth, CategoriaController.erase_delete)

module.exports = router
