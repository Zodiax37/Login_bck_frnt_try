const express = require("express");
const router = express.Router();


const ExistenciaController = require("../controllers/ExistenciaController")

router.get("/", ExistenciaController.getAll)
router.get("/:id", ExistenciaController.getById)
router.post("/", ExistenciaController.create)
router.put("/:id", ExistenciaController.update)
router.delete("/:id", ExistenciaController.erase_delete)

module.exports=router

