const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth")


const ProveedorController = require("../controllers/ProveedorController")

router.get("/", auth, ProveedorController.getAll)
router.get("/:id", auth,ProveedorController.getById)
router.post("/", auth,ProveedorController.create)
router.put("/:id",auth, ProveedorController.update)
router.delete("/:id", auth,ProveedorController.inactive)

module.exports=router

