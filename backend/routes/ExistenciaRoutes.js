const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth")


const ExistenciaController = require("../controllers/ExistenciaController")

router.get("/", auth, ExistenciaController.getAll)
router.get("/:id", auth, ExistenciaController.getById)
router.post("/", auth, ExistenciaController.createMovimiento)

module.exports=router

