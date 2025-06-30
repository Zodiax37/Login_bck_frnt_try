const express = require("express")
const router = express.Router();

const auth = require("../middlewares/auth")

const UsuarioController = require("../controllers/UsuarioController")

router.get("/", auth, UsuarioController.getAll)
router.get("/:id", auth, UsuarioController.getById)
router.post("/", auth, UsuarioController.create)
router.put("/:id", auth, UsuarioController.update)
router.delete("/:id", auth, UsuarioController.erase_delete)

module.exports = router
