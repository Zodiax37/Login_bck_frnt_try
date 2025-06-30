const express = require("express");
const router = express.Router();
const ReporteController = require("../controllers/ReportesController");
const auth = require("../middlewares/auth");

router.get("/ventas-por-fecha", auth, ReporteController.ventasPorFecha);
router.get("/detalle-venta/:id", auth, ReporteController.detalleVenta);
router.get("/listado", auth, ReporteController.listadoVentas);
router.get("/por-metodo", auth, ReporteController.ventasPorMetodoPago);
router.get("/mas-vendidos", auth, ReporteController.productosMasVendidos);

module.exports = router;
