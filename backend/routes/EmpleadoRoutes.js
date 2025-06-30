const express = require("express")
const router = express.Router();

const auth = require("../middlewares/auth")

const EmpleadoController = require("../controllers/EmpleadoController")

router.get("/", auth, EmpleadoController.getAll)
router.get("/:id", auth, EmpleadoController.getById)
router.post("/", auth, EmpleadoController.create)
router.put("/:id", auth, EmpleadoController.update)
router.delete("/:id", auth, EmpleadoController.erase_delete)

module.exports = router