const ProductoModel = require("../models/ProductoModel")

async function getAll(req,res){
    try {
        const data = await ProductoModel.getProductos();
        console.log(data);
        
        res.json(data)
    } catch (e) {
        res.status(500).json({message:"Error al cargar los productos"}, e)
    }
}

async function getById(req,res){
    try {
        const id = parseInt(req.params.id)
        const data = await ProductoModel.getProducto(id)
        data? res.json(data) : res.status(404).json({message: "Producto no encontrado"})
        
    } catch (e) {
        res.status(500).json({message:"Error al traer el producto"}, e)
        
    }
}

async function create(req, res){
    try {
        await ProductoModel.postProducto(req.body)
        res.status(201).json({message:"Producto Creado Correctamente"})
    } catch (e) {
                res.status(500).json({message:"Error al Crear producto"}, e)

    }
}


async function update(req, res) {
    try {
        const id  = parseInt(req.params.id)
        await ProductoModel.updateProducto(id, req.body)
        res.json({message:"Producto Actualizado"})
    } catch (e) {
        res.status(500).json({message:"Error al actualizar el producto"}, e)

    }
}


async function erase_delete(req, res) {
    try {
        const id = parseInt(req.params.id)
        await ProductoModel.deleteProducto(id)
        res.json({message:"Producto eliminado"})
    } catch (e) {
        res.status(500).json({message:"Error al eliminar producto"}, e)

    }
    
}

module.exports={getAll, getById,create, update, erase_delete}