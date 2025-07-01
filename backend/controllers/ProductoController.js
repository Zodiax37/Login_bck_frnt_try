const ProductoModel = require("../models/ProductoModel")

async function getAll(req, res) {
    try {
        // const role = 'lector';  // Por ahora prueba así
        const data = await ProductoModel.getProductos(req.user.rol);
        res.json(data);
    } catch (e) {
        console.log("error", e);
        console.log(req.user.rol);
        
        res.status(500).json({ message: 'Error al cargar productos', error: e.message });
    }
}



async function getById(req, res) {
    try {
        const id = parseInt(req.params.id)
        const data = await ProductoModel.getProducto(req.user.rol, id)
        data ? res.json(data) : res.status(404).json({ message: "Producto no encontrado" })

    } catch (e) {
        res.status(500).json({ message: "Error al traer el producto", error: e.message })

    }
}

async function create(req, res) {
    try {
        await ProductoModel.postProducto(req.user.rol, req.body)
        res.status(201).json({ message: "Producto Creado Correctamente" })
    } catch (e) {
        res.status(500).json({ message: "Error al Crear producto", error: e.message })

    }
}


async function update(req, res) {
    try {
        const id = parseInt(req.params.id)
        await ProductoModel.updateProducto(req.user.rol, id, req.body)
        res.json({ message: "Producto Actualizado" })
    } catch (e) {
        res.status(500).json({ message: "Error al actualizar el producto", error: e.message })

    }
}


async function erase_delete(req, res) {
    try {
        const id = parseInt(req.params.id)
        await ProductoModel.deleteProducto(req.user.rol, id)
        res.json({ message: "Producto eliminado" })
    } catch (e) {
        res.status(500).json({ message: "Error al eliminar producto", error: e.message })

    }

}

module.exports = { getAll, getById, create, update, erase_delete }