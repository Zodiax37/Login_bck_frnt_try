
const PreventaModel = require("../models/PreventaModel");

async function crearPreventa(req, res) {
    try {
        const preventaId = await PreventaModel.crearPreventa(req.user.rol, req.user.id);
        res.status(201).json({ preventaId });
    } catch (e) {
        res.status(500).json({ message: "Error al crear preventa", error: e.message });
    }
}

async function agregarProducto(req, res) {
    try {
        const { preventaId, productoId, cantidad } = req.body;
        await PreventaModel.agregarProducto(req.user.rol, preventaId, productoId, cantidad);
        res.json({ message: "Producto agregado a preventa" });
    } catch (e) {

        console.error('Error en agregarProducto:', e);
        res.status(500).json({ message: "Error al agregar producto", error: e.message });
    }
}

async function quitarProducto(req, res) {
    try {
        const { preventaId, productoId } = req.body;
        await PreventaModel.quitarProducto(req.user.rol, preventaId, productoId);
        res.json({ message: "Producto quitado de preventa" });
    } catch (e) {
        res.status(500).json({ message: "Error al quitar producto", error: e.message });
    }
}

async function listarProductos(req, res) {
    try {
        const preventaId = parseInt(req.params.preventaId);
        const productos = await PreventaModel.listarProductos(req.user.rol, preventaId);
        res.json(productos);
    } catch (e) {
        res.status(500).json({ message: "Error al listar productos", error: e.message });
    }
}

async function listarPreventasPendientes(req, res) {
    try {
        const userId = parseInt(req.params.usuarioId);
        const productos = await PreventaModel.listarPreventasPendientes(req.user.rol, userId);
        res.json(productos);
    } catch (e) {
        res.status(500).json({ message: "Error al listar productos", error: e.message });
    }
}




async function listarVentas(req, res) {
    try {
        const userId = req.usuarioId; // <--- usar el usuario autenticado
        const ventas = await PreventaModel.getVentasGlobal(req.user.rol, userId);
        console.log(ventas);
        console.log(userId);

        res.json(ventas);
    } catch (e) {
        console.log(e);

        res.status(500).json({ message: "Error al listar todas las ventas", error: e.message });
    }
}


async function listartVentasPorUser(req, res) {
    try {
        const userId = parseInt(req.params.usuarioId);
        const ventas = await PreventaModel.getVentasPorUser(req.user.rol, userId);
        res.json(ventas);
    } catch (e) {
        res.status(500).json({ message: "Error al listar ventas por usuario", error: e.message });
    }
}

async function eliminarPreventa(req, res) {
    try {
        const preventaId = parseInt(req.params.preventaId); // ✅ de req.params, no body
        await PreventaModel.deletePreventa(req.user.rol, preventaId);
        res.json({ message: "Preventa eliminada correctamente" });
    } catch (e) {
        res.status(500).json({ message: "Error al eliminar Preventa/Carrito", error: e.message });
    }
}




async function confirmarVenta(req, res) {
    try {
        const datos = {
            ...req.body,
            UsuarioId: req.user.id
        };

        const notificaciones = await PreventaModel.confirmarVenta(req.user.rol, datos);

        console.log("🟡 Notificaciones generadas:", notificaciones);

        res.json({
            message: "Venta confirmada exitosamente",
            notificaciones
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error al confirmar venta", error: e.message });
    }
}


module.exports = {
    crearPreventa,
    agregarProducto,
    quitarProducto,
    listarProductos,
    confirmarVenta,
    listarPreventasPendientes,
    listarVentas,
    listartVentasPorUser, eliminarPreventa
};
