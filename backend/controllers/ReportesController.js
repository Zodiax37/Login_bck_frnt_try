const ReporteModel = require("../models/ReportesModel");

async function ventasPorFecha(req, res) {
    try {
        const { fechaInicio, fechaFin } = req.query;
        const data = await ReporteModel.ventasPorFecha(req.user.rol, fechaInicio, fechaFin);
        res.json(data);
    } catch (e) {
        res.status(500).json({ message: "Error al generar reporte de ventas por fecha", error: e.message });
    }
}

async function detalleVenta(req, res) {
    try {
        const ventaId = parseInt(req.params.id);
        const data = await ReporteModel.detalleVenta(req.user.rol, ventaId);
        res.json(data);
    } catch (e) {
        res.status(500).json({ message: "Error al obtener detalle de venta", error: e.message });
    }
}

async function listadoVentas(req, res) {
    try {
        const { fechaInicio, fechaFin } = req.query;
        const data = await ReporteModel.listadoVentas(req.user.rol, fechaInicio, fechaFin);
        res.json(data);
    } catch (e) {
        res.status(500).json({ message: "Error al obtener listado de ventas", error: e.message });
    }
}

async function ventasPorMetodoPago(req, res) {
    try {
        const { fechaInicio, fechaFin, metodoPago } = req.query;
        const data = await ReporteModel.ventasPorMetodoPago(req.user.rol, fechaInicio, fechaFin, metodoPago);
        res.json(data);
    } catch (e) {
        res.status(500).json({ message: "Error al obtener ventas por método de pago", error: e.message });
    }
}

async function productosMasVendidos(req, res) {
    try {
        const { fechaInicio, fechaFin } = req.query;
        const data = await ReporteModel.productosMasVendidos(req.user.rol, fechaInicio, fechaFin);
        res.json(data);
    } catch (e) {
        res.status(500).json({ message: "Error al obtener productos más vendidos", error: e.message });
    }
}

module.exports = {
    ventasPorFecha,
    detalleVenta,
    listadoVentas,
    ventasPorMetodoPago,
    productosMasVendidos
};