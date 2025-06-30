const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const PreventaController = require("../controllers/PreventaController");


router.post("/", auth, PreventaController.crearPreventa);
router.post("/agregar", auth, PreventaController.agregarProducto);
router.post("/quitar", auth, PreventaController.quitarProducto);
router.get("/:preventaId", auth, PreventaController.listarProductos);
router.get("/pendientes/:usuarioId", auth, PreventaController.listarPreventasPendientes);
router.post("/confirmar", auth, PreventaController.confirmarVenta);

module.exports = router;
