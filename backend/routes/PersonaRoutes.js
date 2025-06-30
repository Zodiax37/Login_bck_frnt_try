const express = require("express")
const router = express.Router();

const auth = require("../middlewares/auth")

const PersonaController = require("../controllers/PersonaController")

router.get("/", auth, PersonaController.getAll)
router.get("/:id", auth, PersonaController.getById)
router.post("/", auth, PersonaController.create)
router.put("/:id", auth, PersonaController.update)
router.delete("/:id", auth, PersonaController.erase_delete)

module.exports = router
