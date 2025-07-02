const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const PreventaController = require("../controllers/PreventaController");


router.post("/", auth, PreventaController.crearPreventa);
router.post("/agregar", auth, PreventaController.agregarProducto);
router.post("/quitar", auth, PreventaController.quitarProducto);

router.post("/cancelar/:preventaId", auth, PreventaController.eliminarPreventa);
router.get("/:preventaId", auth, PreventaController.listarProductos);

// Primero la ruta específica SIN parámetro
router.get("/ventas", auth, PreventaController.listarVentas);

// Luego la ruta con parámetro
router.get("/ventas/:usuarioId", auth, PreventaController.listartVentasPorUser);


router.get("/pendientes/:usuarioId", auth, PreventaController.listarPreventasPendientes);
router.post("/confirmar", auth, PreventaController.confirmarVenta);

module.exports = router;
